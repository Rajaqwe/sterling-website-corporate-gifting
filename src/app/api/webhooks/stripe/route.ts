import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma/client';
import { Prisma } from '@/generated/prisma';
import { assertEnv } from '@/lib/env';

// Secrets are fetched lazily at runtime so Next.js build doesn't crash
function getStripeClient() {
  return new Stripe(assertEnv('STRIPE_SECRET_KEY'), {
    // @ts-expect-error - The literal type changed but we need this version
    apiVersion: '2026-08-26.dahlia',
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      const stripe = getStripeClient();
      const webhookSecret = assertEnv('STRIPE_WEBHOOK_SECRET');
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Webhook signature verification failed: ', errorMessage);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const orderId = session.metadata?.orderId;
      const eventId = event.id;
      
      if (!orderId) {
        return NextResponse.json({ received: true, message: 'No orderId in metadata' });
      }

      try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          // --- Idempotency check (P0-4) ---
          await tx.paymentWebhookEvent.create({
            data: {
              provider: "STRIPE",
              eventId: eventId,
            }
          });

          // --- Validate Order and Amount (P0-5) ---
          const order = await tx.order.findUnique({
            where: { id: orderId }
          });

          if (!order) {
            throw new Error(`Order ${orderId} not found`);
          }

          if (order.status === "PROCESSING" || order.status === "DELIVERED") {
            return; // Already processed
          }

          if (order.status === "CANCELLED") {
             throw new Error(`Order ${orderId} is cancelled`);
          }

          const receivedAmount = (session.amount_total ?? 0) / 100;
          const expectedTotal = Number(order.total);
          
          if (Math.abs(expectedTotal - receivedAmount) > 0.01) {
             throw new Error(`Amount mismatch. Expected ${expectedTotal}, got ${receivedAmount}`);
          }

          // Update Order and Payment status in the database
          await tx.payment.upsert({
            where: { providerPaymentId: session.payment_intent as string },
            update: { 
              status: 'PAID',
              paidAt: new Date(),
              amount: receivedAmount,
              currency: session.currency ?? 'INR',
              orderId,
            },
            create: {
              orderId,
              provider: 'STRIPE',
              providerPaymentId: session.payment_intent as string,
              amount: receivedAmount,
              currency: session.currency ?? 'INR',
              status: 'PAID',
              paidAt: new Date(),
            }
          });
          
          await tx.order.update({
            where: { id: orderId },
            data: { status: 'PROCESSING' }
          });
        });
      } catch (err: unknown) {
        const error = err as any; // Typecast for Prisma error code check
        if (error?.code === 'P2002') {
           console.log(`[Webhook] Ignoring duplicate Stripe event ${eventId}`);
           return NextResponse.json({ received: true, message: "Duplicate event ignored" });
        }
        console.error("[Webhook] Business validation failed:", error instanceof Error ? error.message : "Unknown error");
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 400 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
