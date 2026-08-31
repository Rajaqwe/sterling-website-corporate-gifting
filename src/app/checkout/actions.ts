"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { Prisma } from "@prisma/client";
import { assertEnv } from "@/lib/env";
import { TaxService } from "@/lib/pricing/TaxService";
import { Money } from "@/lib/money";
import crypto from "crypto";
export async function createOrderFromCart(shippingData: any) {
  try {
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
            product: true
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

    const totalAmount = cart.items.reduce((acc, item) => {
      const variant = item.variantId ? cartVariantsMap.get(item.variantId) : null;
      const price = variant?.price || item.product.price;
      return acc + (item.quantity * Number(price));
    }, 0);

    const year = new Date().getFullYear();
    const orderNumber = `ORD-${year}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    
    const order = await prisma.$transaction(async (tx) => {
      const addressData = {
        fullName: shippingData.fullName,
        phone: shippingData.phone,
        addressLine1: shippingData.addressLine1,
        addressLine2: shippingData.addressLine2,
        city: shippingData.city,
        state: shippingData.state,
        postalCode: shippingData.postalCode,
        country: shippingData.country || 'India',
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
          
          return {
            orderId: newOrder.id,
            productId: item.productId,
            productName: variant ? `${item.product.name} - ${variant.name}` : item.product.name,
            sku: variant?.sku || item.product.sku,
            quantity: item.quantity,
            unitPrice: variant?.price || item.product.price,
            totalPrice: item.quantity * Number(variant?.price || item.product.price),
            variantSnapshot: variant ? {
              id: variant.id,
              name: variant.name,
              sku: variant.sku,
              price: variant.price?.toString(),
            } : undefined,
          };
        })
      });

      // Inventory protection
      for (const item of cart.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stockQuantity: { decrement: item.quantity } }
          });
        } else {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQuantity: { decrement: item.quantity } }
          });
        }
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    return { success: true, orderId: order.id };
  } catch (err: any) {
    console.error("Checkout Error:", err);
    return { success: false, error: err.message || "An error occurred during checkout" };
  }
}
