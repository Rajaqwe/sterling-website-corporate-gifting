'use server'

import { prisma } from '@/lib/prisma/client'
import { revalidatePath } from 'next/cache'
import { OrderStatus } from '@/generated/prisma'
import { getAuthUser } from '@/lib/auth/server'
import { TaxService } from '@/lib/pricing/TaxService'
import { Money } from '@/lib/money'
import { shippingSchema } from '@/lib/validations/shipping'
import crypto from 'crypto'

export async function createOrderFromQuote(
  quoteId: string,
  shippingData: {
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
  },
  paymentMethod: string = 'card'
) {
  try {
    const parsedShipping = shippingSchema.safeParse(shippingData);
    if (!parsedShipping.success) {
      const firstIssue = parsedShipping.error.issues[0];
      return { success: false, error: firstIssue ? `${firstIssue.path.join('.')}: ${firstIssue.message}` : "Invalid shipping details." };
    }
    const validatedShipping = parsedShipping.data;

    const parsedPaymentMethod = paymentMethod === 'po' ? 'po' : 'card';

    const auth = await getAuthUser();
    if (!auth) {
      return { success: false, error: "Unauthorized" }
    }
    const user = auth.supabaseUser;

    const isAdmin = auth.user.role === 'ADMIN' || auth.user.role === 'SUPER_ADMIN';

    // 1. Fetch the approved quote
    const quote = await prisma.quoteRequest.findUnique({
      where: { id: quoteId },
      include: {
        items: {
          select: {
            id: true,
            quoteId: true,
            productId: true,
            description: true,
            quantity: true,
            unitPrice: true,
            totalPrice: true,
            brandingOption: true,
            notes: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });

    if (!quote || quote.status !== 'APPROVED') {
      return { success: false, error: "Quote not found or not approved." };
    }
    
    // Security check: Only the quote owner or an admin can convert it to an order
    if (quote.userId !== user.id && !isAdmin) {
      return { success: false, error: "Unauthorized to process this quote." };
    }

    // --- Idempotency check (P0-3) ---
    // If an order already exists for this quote, return it (safe replay)
    // Order.quoteId is @unique in the schema, so this is also enforced at DB level
    const existingOrder = await prisma.order.findUnique({
      where: { quoteId: quoteId }
    });

    if (existingOrder) {
      return { success: true, orderId: existingOrder.id, message: "Order already exists for this quote." };
    }

    // --- Race-safe order number (P1-1) ---
    // Use crypto-random suffix instead of count() + 1 which races under concurrency
    const year = new Date().getFullYear();
    const orderNumber = `ORD-${year}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // --- Atomic order creation (P0-3) ---
    // Wrap everything in a transaction so partial failures don't leave orphaned records
    const order = await prisma.$transaction(async (tx: any) => {
      // Create addresses from validated fields only (never spread raw client data)
      const addressData = {
        fullName: validatedShipping.fullName,
        phone: validatedShipping.phone,
        addressLine1: validatedShipping.addressLine1,
        addressLine2: validatedShipping.addressLine2,
        city: validatedShipping.city,
        state: validatedShipping.state,
        postalCode: validatedShipping.postalCode,
        country: validatedShipping.country || 'India',
        userId: user.id,
      };

      const shippingAddress = await tx.address.create({
        data: { ...addressData, type: 'SHIPPING' }
      });

      const billingAddress = await tx.address.create({
        data: { ...addressData, type: 'BILLING' }
      });

      // Calculate totals from quote items (server-authoritative)
      const subtotalMoney = quote.items.reduce((acc: Money, item: any) => acc.add(Money.fromDecimal(item.totalPrice)), Money.fromInteger(0));
      const taxCalc = TaxService.calculateGST(subtotalMoney);
      const shippingCost = Money.fromInteger(0);
      const total = taxCalc.total.add(shippingCost);

      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          quoteId: quote.id,
          status: OrderStatus.PENDING,
          subtotal: taxCalc.subtotal.toDecimal(),
          tax: taxCalc.taxAmount.toDecimal(),
          shippingCost: shippingCost.toDecimal(),
          total: total.toDecimal(),
          shippingAddressId: shippingAddress.id,
          billingAddressId: billingAddress.id,
        }
      });

      // Create order items from quote items (skip items with no linked product)
      const productItems = quote.items.filter((item: any) => item.productId);
      if (productItems.length > 0) {
        await tx.orderItem.createMany({
          data: productItems.map((item: any) => ({
            orderId: newOrder.id,
            productId: item.productId,
            productName: item.description,
            sku: "Q-ITEM",
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            brandingOption: item.brandingOption,
          }))
        });
      }

      // Mark quote as completed if payment method is 'po'. For 'card', it will be marked completed via Razorpay webhook.
      if (parsedPaymentMethod === 'po') {
        await tx.quoteRequest.update({
          where: { id: quoteId },
          data: { status: 'COMPLETED' }
        });
        await tx.auditLog.create({
          data: {
            actorId: user.id,
            action: 'QUOTE_STATUS_CHANGED',
            resource: 'Quote',
            resourceId: quoteId,
            metadata: { from: quote.status, to: 'COMPLETED', notes: 'Converted to order (PO payment)' }
          }
        });
      }

      return newOrder;
    });

    revalidatePath('/dashboard/orders');
    return { success: true, orderId: order.id };
  } catch (error: any) {
    // Handle unique constraint violation (concurrent duplicate submission)
    if (error?.code === 'P2002') {
      // Another request already created the order — fetch and return it
      const existingOrder = await prisma.order.findUnique({
        where: { quoteId: quoteId }
      });
      if (existingOrder) {
        return { success: true, orderId: existingOrder.id, message: "Order already exists for this quote." };
      }
    }
    console.error("Failed to convert quote to order:", error);
    return { success: false, error: "Failed to process checkout." };
  }
}
