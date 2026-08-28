"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

async function getUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCartItems() {
  try {
    const user = await getUser();
    if (!user) return { success: false, error: "Not logged in" };

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                variants: true,
              }
            }
          }
        }
      }
    });

    if (!cart) return { success: true, items: [] };

    // Need to parse media json
    const items = cart.items.map((item: any) => {
      if (item.product.media && typeof item.product.media === 'string') {
        try {
          item.product.media = JSON.parse(item.product.media);
        } catch(e) {}
      }
      return item;
    });

    return { success: true, items };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function removeCartItem(itemId: string) {
  try {
    const user = await getUser();
    if (!user) return { success: false, error: "Not logged in" };

    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true }
    });

    if (!item || item.cart.userId !== user.id) {
      return { success: false, error: "Not found or unauthorized" };
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
