import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma/client";
import { Prisma } from "@/generated/prisma";
import { assertEnv } from "@/lib/env";
import { Money } from "@/lib/money";

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
            where: { id: orderId },
            include: { items: true } // Need items for inventory decrement
          });

          if (!order) {
            throw new Error(`Order ${orderId} not found`);
          }

          // Stock is decremented exactly once per order: either here when the
          // order is still PENDING (payment-driven), or by transitionOrder()
          // when an admin confirms it first. Any non-PENDING status means
          // inventory was already handled — record the payment and stop.
          const isStillPending = order.status === "PENDING";

          if (order.status === "CANCELLED" || order.status === "REFUNDED") {
            throw new Error(`Order ${orderId} is ${order.status.toLowerCase()}`);
          }

          // Verify amount matches closely
          const expectedTotalMoney = Money.fromDecimal(order.total);
          const receivedAmountMoney = Money.fromDecimal(receivedAmount);
          if (expectedTotalMoney.toPaise() !== receivedAmountMoney.toPaise()) {
             throw new Error(`Amount mismatch. Expected ${expectedTotalMoney.toDecimal()}, got ${receivedAmountMoney.toDecimal()}`);
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

          // Update the order status (only when still awaiting payment so we
          // never override a state an admin already transitioned to)
          if (isStillPending) {
            await tx.order.update({
              where: { id: orderId },
              data: { status: "PROCESSING" }
            });

            // Mark QuoteRequest as COMPLETED if order was created from a quote (P0 Commerce Integrity)
            if (order.quoteId) {
              await tx.quoteRequest.update({
                where: { id: order.quoteId },
                data: { status: "COMPLETED" }
              });
            }

            // Decrement Inventory (P0 Commerce Integrity: Payment-confirmed decrementing)
            for (const item of order.items) {
              const variantId = (item.variantSnapshot as any)?.id;
              if (variantId) {
                const res = await tx.productVariant.updateMany({
                  where: { id: variantId, stockQuantity: { gte: item.quantity } },
                  data: { stockQuantity: { decrement: item.quantity } }
                });
                if (res.count === 0) {
                  throw new Error(`Insufficient stock for variant ${variantId}`);
                }
              } else {
                const res = await tx.product.updateMany({
                  where: { id: item.productId, stockQuantity: { gte: item.quantity } },
                  data: { stockQuantity: { decrement: item.quantity } }
                });
                if (res.count === 0) {
                  throw new Error(`Insufficient stock for product ${item.productId}`);
                }
              }
            }

            // Clear matching items from user's cart (P0 Cart lifecycle)
            const cart = await tx.cart.findUnique({
              where: { userId: order.userId }
            });

            if (cart) {
              for (const item of order.items) {
                const variantId = (item.variantSnapshot as any)?.id || null;
                await tx.cartItem.deleteMany({
                  where: {
                    cartId: cart.id,
                    productId: item.productId,
                    variantId: variantId,
                  }
                });
              }
            }
          }
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
