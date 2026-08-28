import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma/client";
import { Prisma } from "@/generated/prisma";
import { assertEnv } from "@/lib/env";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Fail fast — never use an empty secret (would accept any forged payload)
    const secret = assertEnv('RAZORPAY_WEBHOOK_SECRET');

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature);
    const signatureBuffer = Buffer.from(signature);

    if (expectedBuffer.length !== signatureBuffer.length) {
      return NextResponse.json({ error: "Invalid signature length" }, { status: 400 });
    }

    // Use constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
      const paymentData = event.payload.payment.entity;
      const orderId = paymentData.notes?.orderId;
      const eventId = req.headers.get("x-razorpay-event-id") || paymentData.id; // Fallback to payment ID if header is missing
      
      if (!orderId) {
         return NextResponse.json({ error: "No orderId found in payment notes" }, { status: 400 });
      }

      const receivedAmount = Number(paymentData.amount) / 100;
      const receivedCurrency = paymentData.currency;

      try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
          // --- Idempotency check (P0-4) ---
          // Prevent processing the exact same webhook event twice
          await tx.paymentWebhookEvent.create({
            data: {
              provider: "RAZORPAY",
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
            // Already paid/processed
            return;
          }

          if (order.status === "CANCELLED") {
            throw new Error(`Order ${orderId} is cancelled`);
          }

          // Verify amount matches closely (allowing minor float differences, but Razorpay deals in integers/paisa so exact matching is better)
          const expectedTotal = Number(order.total);
          if (Math.abs(expectedTotal - receivedAmount) > 0.01) {
             throw new Error(`Amount mismatch. Expected ${expectedTotal}, got ${receivedAmount}`);
          }
          
          if (receivedCurrency !== 'INR') { // Assuming INR base, adjust if needed
             throw new Error(`Currency mismatch. Expected INR, got ${receivedCurrency}`);
          }

          // Record the payment
          await tx.payment.create({
            data: {
              orderId,
              provider: "RAZORPAY",
              providerPaymentId: paymentData.id,
              providerOrderId: paymentData.order_id,
              amount: receivedAmount,
              currency: receivedCurrency,
              status: "PAID",
              method: paymentData.method,
              paidAt: new Date(paymentData.created_at * 1000),
              metadata: paymentData,
            }
          });

          // Update the order status
          await tx.order.update({
            where: { id: orderId },
            data: { status: "PROCESSING" }
          });
        });
      } catch (err: unknown) {
        const error = err as any; // Typecast for Prisma error code check
        // Handle idempotent replay gracefully
        if (error?.code === 'P2002') {
           console.log(`[Webhook] Ignoring duplicate Razorpay event ${eventId}`);
           return NextResponse.json({ status: "ok", message: "Duplicate event ignored" });
        }
        
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[Webhook] Business validation failed:", errorMessage);
        // We still return 200 so Razorpay stops retrying a permanently invalid payment,
        // but we don't process it. In a real system, you might flag this for manual review.
        return NextResponse.json({ status: "error", message: errorMessage }, { status: 400 });
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: unknown) {
    console.error("Razorpay webhook error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
