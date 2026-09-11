"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { assertEnv } from "@/lib/env";
import { TaxService } from "@/lib/pricing/TaxService";
import { Money } from "@/lib/money";
import { getLineItemPrice } from "@/lib/pricing/line-item";
import { shippingSchema } from "@/lib/validations/shipping";
import crypto from "crypto";

export async function createOrderFromCart(shippingData: any, idempotencyKey?: string) {
  try {
    const validatedShipping = shippingSchema.parse(shippingData);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: "Please log in to checkout" };
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              include: { bulkPricingTiers: true }
            }
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return { success: false, error: "Your cart is empty" };
    }

    const variantIdsForTotal = cart.items.map(item => item.variantId).filter(Boolean) as string[];
    let cartVariantsMap = new Map();
    if (variantIdsForTotal.length > 0) {
      const variants = await prisma.productVariant.findMany({
        where: { id: { in: variantIdsForTotal } }
      });
      cartVariantsMap = new Map(variants.map(v => [v.id, v]));
    }

    for (const item of cart.items) {
      if (item.product.status !== 'ACTIVE') {
        return { success: false, error: `Product ${item.product.name} is no longer active.` };
      }
      if (item.quantity < item.product.minimumOrderQuantity) {
        return { success: false, error: `Minimum order quantity for ${item.product.name} is ${item.product.minimumOrderQuantity}.` };
      }
      if (item.variantId) {
        const variant = cartVariantsMap.get(item.variantId);
        if (!variant) {
          return { success: false, error: `Variant for ${item.product.name} is no longer available.` };
        }
        // Validate that the variant actually belongs to this product (IDOR prevention)
        if (variant.productId !== item.productId) {
          return { success: false, error: `Invalid variant for product ${item.product.name}.` };
        }
        if (!variant.isActive) {
          return { success: false, error: `Variant ${variant.name} is no longer active.` };
        }
        if (variant.stockQuantity !== null && variant.stockQuantity < item.quantity) {
          return { success: false, error: `Not enough stock for ${item.product.name} - ${variant.name}. Only ${variant.stockQuantity} available.` };
        }
      } else {
        if (item.product.stockQuantity < item.quantity) {
          return { success: false, error: `Not enough stock for ${item.product.name}. Only ${item.product.stockQuantity} available.` };
        }
      }
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      const variant = item.variantId ? cartVariantsMap.get(item.variantId) : null;
      const price = getLineItemPrice({
        quantity: item.quantity,
        productId: item.productId,
        variantId: item.variantId,
        product: item.product,
        variant: variant
      });
      return acc + (item.quantity * Number(price));
    }, 0);

    const year = new Date().getFullYear();
    const orderNumber = `ORD-${year}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    
    if (idempotencyKey) {
      const existingOrder = await prisma.order.findFirst({
        where: { idempotencyKey, userId: user.id }
      });
      if (existingOrder) {
        return { success: true, orderId: existingOrder.id };
      }
    }
    
    const order = await prisma.$transaction(async (tx) => {
      const addressData = {
        fullName: validatedShipping.fullName,
        phone: validatedShipping.phone,
        addressLine1: validatedShipping.addressLine1,
        addressLine2: validatedShipping.addressLine2,
        city: validatedShipping.city,
        state: validatedShipping.state,
        postalCode: validatedShipping.postalCode,
        country: validatedShipping.country || 'India',
        userId: user.id
      };

      const shippingAddress = await tx.address.create({
        data: { ...addressData, type: 'SHIPPING' }
      });

      const billingAddress = await tx.address.create({
        data: { ...addressData, type: 'BILLING' }
      });

      const subtotalMoney = Money.fromDecimal(totalAmount);
      const taxCalc = TaxService.calculateGST(subtotalMoney);

      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: user.id,
          status: "PENDING",
          subtotal: taxCalc.subtotal.toDecimal(),
          tax: taxCalc.taxAmount.toDecimal(),
          shippingCost: 0,
          total: taxCalc.total.toDecimal(),
          shippingAddressId: shippingAddress.id,
          billingAddressId: billingAddress.id,
          idempotencyKey,
        }
      });

      const variantIds = cart.items.map(item => item.variantId).filter(Boolean) as string[];
      let variantsMap = new Map();
      if (variantIds.length > 0) {
        const variants = await tx.productVariant.findMany({
          where: { id: { in: variantIds } }
        });
        variantsMap = new Map(variants.map(v => [v.id, v]));
      }

      await tx.orderItem.createMany({
        data: cart.items.map(item => {
          const variant = item.variantId ? variantsMap.get(item.variantId) : null;
          const unitPrice = getLineItemPrice({
            quantity: item.quantity,
            productId: item.productId,
            variantId: item.variantId,
            product: item.product,
            variant: variant
          });
          
          return {
            orderId: newOrder.id,
            productId: item.productId,
            productName: variant ? `${item.product.name} - ${variant.name}` : item.product.name,
            sku: variant?.sku || item.product.sku,
            quantity: item.quantity,
            unitPrice: unitPrice,
            totalPrice: item.quantity * unitPrice,
            variantSnapshot: variant ? {
              id: variant.id,
              name: variant.name,
              sku: variant.sku,
              price: variant.price?.toString(),
            } : undefined,
            taxSnapshot: {
              gstIncluded: true,
              amount: TaxService.calculateGST(Money.fromDecimal(item.quantity * unitPrice)).taxAmount.toDecimal(),
            },
            brandingSnapshot: undefined, // Branding options not yet captured in Cart
          };
        })
      });

      // Inventory decrement is deferred to payment webhook confirmation
      // to avoid reserving stock for unpaid/abandoned orders (P0 Commerce Integrity).

      // Cart items are no longer deleted here. They will be removed upon successful payment webhook.

      return newOrder;
    });

    return { success: true, orderId: order.id };
  } catch (err: any) {
    // Concurrent submission with the same idempotency key: the loser hits the
    // unique constraint — return the winner's order instead of failing.
    if (err?.code === 'P2002' && idempotencyKey) {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const existingOrder = await prisma.order.findFirst({
          where: { idempotencyKey, userId: user.id }
        });
        if (existingOrder) {
          return { success: true, orderId: existingOrder.id };
        }
      }
    }
    console.error("Checkout Error:", err);
    // Never surface raw provider/DB error strings to the client
    return { success: false, error: "An error occurred during checkout. Please try again." };
  }
}
