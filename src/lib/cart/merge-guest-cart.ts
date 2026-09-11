import { prisma } from "@/lib/prisma/client";
import { cookies } from "next/headers";

// Server-only module: NOT a "use server" file, so this can never be invoked
// directly from the browser. Only call sites that already verified the
// session (login, OAuth callback) may pass the userId to merge into.
export async function mergeGuestCart(userId: string) {
  try {
    const sessionId = (await cookies()).get("guest_cart_session")?.value;
    if (!sessionId) return { success: true };

    const guestCart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true }
    });

    if (!guestCart || guestCart.items.length === 0) {
      // Nothing to merge, just clear the cookie
      (await cookies()).delete("guest_cart_session");
      return { success: true };
    }

    await prisma.$transaction(async (tx) => {
      let userCart = await tx.cart.findUnique({
        where: { userId },
        include: { items: true }
      });

      if (!userCart) {
        userCart = await tx.cart.create({
          data: { userId },
          include: { items: true }
        });
      }

      for (const guestItem of guestCart.items) {
        const existingItem = userCart.items.find(
          i => i.productId === guestItem.productId && i.variantId === guestItem.variantId
        );

        if (existingItem) {
          await tx.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + guestItem.quantity }
          });
        } else {
          await tx.cartItem.create({
            data: {
              cartId: userCart.id,
              productId: guestItem.productId,
              variantId: guestItem.variantId,
              quantity: guestItem.quantity
            }
          });
        }
      }

      // Delete guest cart
      await tx.cart.delete({
        where: { id: guestCart.id }
      });
    });

    (await cookies()).delete("guest_cart_session");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to merge guest cart:", error);
    return { success: false, error: error.message };
  }
}
