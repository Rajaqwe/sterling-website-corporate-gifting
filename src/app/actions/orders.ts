'use server'

import { prisma } from '@/lib/prisma/client'
import { revalidatePath } from 'next/cache'
import { OrderStatus } from '@prisma/client'
import { requireUser } from '@/lib/auth/server'

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
    const auth = await requireUser();
    const isAdmin = auth.user.role === 'ADMIN' || auth.user.role === 'SUPER_ADMIN';

    // 1. Fetch the approved quote
    const quote = await prisma.quoteRequest.findUnique({
      where: { id: quoteId },
      include: { items: true }
    });

    if (!quote || quote.status !== 'APPROVED') {
      return { success: false, error: "Quote not found or not approved." };
    }
    
    // Security check: Only the quote owner or an admin can convert it to an order
    if (quote.userId !== auth.user.id && !isAdmin) {
      return { success: false, error: "Unauthorized to process this quote." };
    }

    // Generate a unique order number (e.g., ORD-YYYY-XXXX)
    const year = new Date().getFullYear();
    const count = await prisma.order.count();
    const orderNumber = `ORD-${year}-${String(count + 1).padStart(4, '0')}`;

    // 2. Create addresses
    const shippingAddress = await prisma.address.create({
      data: { ...shippingData, type: 'SHIPPING', userId: auth.user.id }
    });

    // Assume billing is same for simplicity in this flow, or captured separately
    const billingAddress = await prisma.address.create({
      data: { ...shippingData, type: 'BILLING', userId: auth.user.id }
    });

    // 3. Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: auth.user.id,
        quoteId: quote.id,
        status: OrderStatus.PENDING,
        subtotal: quote.items.reduce((acc, item) => acc + Number(item.totalPrice), 0),
        tax: 0, // Calculate appropriate tax
        shippingCost: 0,
        total: quote.items.reduce((acc, item) => acc + Number(item.totalPrice), 0),
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
      }
    });

    // 4. Create order items based on quote items
    if (quote.items && quote.items.length > 0) {
      await prisma.orderItem.createMany({
        data: quote.items.map(item => ({
          orderId: order.id,
          productId: item.productId!,
          productName: item.description,
          sku: "Q-ITEM", // Fallback or pull from actual product
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          brandingOption: item.brandingOption,
        }))
      });
    }

    revalidatePath('/dashboard/orders');
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to convert quote to order:", error);
    return { success: false, error: "Failed to process checkout." };
  }
}
