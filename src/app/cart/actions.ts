"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { getLineItemPrice } from "@/lib/pricing/line-item";
import { cookies } from "next/headers";

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCartItems() {
  try {
    const user = await getUser();
    let sessionId = (await cookies()).get("guest_cart_session")?.value;

    if (!user && !sessionId) {
      return { success: true, items: [] };
    }

    const cart = await prisma.cart.findUnique({
      where: user ? { userId: user.id } : { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: true,
                media: { orderBy: { sortOrder: 'asc' } },
              }
            }
          }
        }
      }
    });

    if (!cart) return { success: true, items: [] };

    // Need to parse media json and serialize Decimal fields
    const serializedItems = cart.items.map((item: any) => {
      let media = item.product.media;
      if (media && typeof media === 'string') {
        try {
          media = JSON.parse(media);
        } catch(e) {}
      }

      const variant = item.variantId ? item.product.variants?.find((v: any) => v.id === item.variantId) : null;
      const unitPrice = getLineItemPrice({
        quantity: item.quantity,
        productId: item.productId,
        variantId: item.variantId,
        product: item.product,
        variant: variant,
      });

      return {
        ...item,
        unitPrice,
        product: {
          ...item.product,
          media,
          price: item.product.price?.toString() || "0",
          compareAtPrice: item.product.compareAtPrice?.toString() || null,
          weight: item.product.weight?.toString() || null,
          rating: item.product.rating?.toString() || null,
          variants: item.product.variants?.map((v: any) => ({
            ...v,
            price: v.price?.toString() || null,
            weight: v.weight?.toString() || null,
          })) || []
        }
      };
    });

    return { success: true, items: serializedItems };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function removeCartItem(itemId: string) {
  try {
    const user = await getUser();
    let sessionId = (await cookies()).get("guest_cart_session")?.value;

    if (!user && !sessionId) return { success: false, error: "Not logged in" };

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true }
    });

    if (!item) {
      return { success: false, error: "Not found" };
    }
    
    if (user && item.cart.userId !== user.id) {
       return { success: false, error: "Unauthorized" };
    }
    
    if (!user && item.cart.sessionId !== sessionId) {
       return { success: false, error: "Unauthorized" };
    }

    await prisma.cartItem.delete({
      where: { id: itemId }
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  try {
    const user = await getUser();
    let sessionId = (await cookies()).get("guest_cart_session")?.value;

    if (!user && !sessionId) return { success: false, error: "Not logged in" };

    if (!Number.isInteger(quantity) || quantity < 1) {
      return { success: false, error: "Quantity must be a positive integer" };
    }

    if (quantity > 10000) {
      return { success: false, error: "Quantity exceeds the maximum allowed (10,000)" };
    }

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { 
        cart: true,
        product: {
          include: { variants: true }
        }
      }
    });

    if (!item) {
      return { success: false, error: "Not found" };
    }
    
    if (user && item.cart.userId !== user.id) {
       return { success: false, error: "Unauthorized" };
    }
    
    if (!user && item.cart.sessionId !== sessionId) {
       return { success: false, error: "Unauthorized" };
    }
    
    let currentStock = item.product.stockQuantity;
    if (item.variantId) {
      const variant = item.product.variants.find((v: any) => v.id === item.variantId);
      if (variant && variant.stockQuantity !== null && variant.stockQuantity !== undefined) {
        currentStock = variant.stockQuantity;
      }
    }
    
    if (currentStock < quantity) {
      return { success: false, error: `Only ${currentStock} units available in stock` };
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// mergeGuestCart was moved to src/lib/cart/merge-guest-cart.ts — an exported
// "use server" function here would be callable by anyone with an arbitrary
// userId (cart-pollution IDOR). Login and the OAuth callback import it from
// the server-only module instead.
