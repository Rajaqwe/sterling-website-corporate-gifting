'use server'

import { prisma } from '@/lib/prisma/client'
import { revalidatePath } from 'next/cache'
import { OrderStatus } from '@/generated/prisma'
import { createClient } from '@/lib/supabase/server'
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
  }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: "Unauthorized" }
    }
    
    const isAdmin = user.app_metadata?.role === 'ADMIN' || user.app_metadata?.role === 'SUPER_ADMIN';

    // 1. Fetch the approved quote
    const quote = await prisma.quoteRequest.findUnique({
      where: { id: quoteId },
      include: { items: true }
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
      // Create addresses
      const shippingAddress = await tx.address.create({
        data: { ...shippingData, type: 'SHIPPING', userId: user.id }
      });

      const billingAddress = await tx.address.create({
        data: { ...shippingData, type: 'BILLING', userId: user.id }
      });

      // Calculate totals from quote items (server-authoritative)
      const subtotal = quote.items.reduce((acc: number, item: any) => acc + Number(item.totalPrice), 0);
      const tax = subtotal * 0.18; // 18% GST
      const shippingCost = 0;
      const total = subtotal + tax + shippingCost;

      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          quoteId: quote.id,
          status: OrderStatus.PENDING,
          subtotal,
          tax,
          shippingCost,
          total,
          shippingAddressId: shippingAddress.id,
          billingAddressId: billingAddress.id,
        }
      });

      // Create order items from quote items
      if (quote.items && quote.items.length > 0) {
        await tx.orderItem.createMany({
          data: quote.items.map((item: any) => ({
            orderId: newOrder.id,
            productId: item.productId!,
            productName: item.description,
            sku: "Q-ITEM",
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            brandingOption: item.brandingOption,
          }))
        });
      }

      // Mark quote as completed to prevent re-conversion
      await tx.quoteRequest.update({
        where: { id: quoteId },
        data: { status: 'COMPLETED' }
      });

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
