"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { QuoteCalculation } from "@/types/product";

// Helpers
async function getUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ------------------------------------------------------
// WISHLIST ACTIONS
// ------------------------------------------------------

export async function toggleWishlist(productId: string) {
  try {
    const user = await getUser();
    if (!user) return { success: false, error: "Please log in to use the wishlist" };

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId: user.id },
        include: { items: true },
      });
    }

    const existingItem = wishlist.items.find((i: any) => i.productId === productId);

    if (existingItem) {
      await prisma.wishlistItem.delete({
        where: { id: existingItem.id },
      });
    } else {
      await prisma.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId,
        },
      });
    }

    revalidatePath("/products/[slug]", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update wishlist" };
  }
}

// ------------------------------------------------------
// CART ACTIONS
// ------------------------------------------------------

export async function addToCart(productId: string, quantity: number, variantId?: string) {
  try {
    const user = await getUser();
    if (!user) return { success: false, error: "Please log in to add to cart" };

    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: true },
      });
    }

    const existingItem = cart.items.find(
      (i: any) => i.productId === productId && (i.variantId === variantId || (!i.variantId && !variantId))
    );

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
        },
      });
    }

    revalidatePath("/products/[slug]", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to add to cart" };
  }
}

// ------------------------------------------------------
// QUOTE ACTIONS
// ------------------------------------------------------

export async function submitQuoteRequest(data: {
  productId: string;
  quantity: number;
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  requiredDeliveryDate?: string;
  notes?: string;
  customizationIds: string[];
  quoteCalculation: QuoteCalculation;
}) {
  try {
    const user = await getUser();
    
    // Generate unique quote number
    const quoteNumber = `STR-Q-${Math.floor(100000 + Math.random() * 900000)}`;
    
    const quote = await prisma.quoteRequest.create({
      data: {
        quoteNumber,
        userId: user?.id,
        fullName: data.fullName,
        workEmail: data.workEmail,
        companyName: data.companyName,
        phone: data.phone,
        numberOfRecipients: data.quantity,
        quantity: data.quantity,
        productId: data.productId,
        requiredDeliveryDate: data.requiredDeliveryDate ? new Date(data.requiredDeliveryDate) : null,
        additionalRequirements: data.notes,
        brandingRequired: data.customizationIds.length > 0,
        status: "NEW",
        items: {
          create: [{
            productId: data.productId,
            description: "Product Quote Request",
            quantity: data.quantity,
            unitPrice: data.quoteCalculation.tierUnitPrice,
            totalPrice: data.quoteCalculation.estimatedTotal,
            brandingOption: data.customizationIds.join(","),
          }]
        }
      }
    });

    return { success: true, quoteNumber };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit quote request" };
  }
}

// ------------------------------------------------------
// REVIEW ACTIONS
// ------------------------------------------------------

export async function submitReview(productId: string, rating: number, content?: string, title?: string) {
  try {
    const user = await getUser();
    if (!user) return { success: false, error: "Please log in to submit a review" };

    await prisma.review.create({
      data: {
        productId,
        userId: user.id,
        rating,
        title,
        content,
        isVerified: true,
      }
    });

    const allReviews = await prisma.review.findMany({
      where: { productId }
    });
    
    const totalRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    const avgRating = totalRating / allReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: avgRating,
        reviewCount: allReviews.length,
      }
    });

    revalidatePath("/products/[slug]", "page");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit review" };
  }
}

// ------------------------------------------------------
// LIKE ACTIONS
// ------------------------------------------------------

export async function toggleLike(productId: string) {
  try {
    const user = await getUser();
    if (!user) return { success: false, error: "Please log in to like this product" };

    const existingLike = await prisma.productLike.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId,
        }
      }
    });

    let updated;
    if (existingLike) {
      // Remove like
      await prisma.productLike.delete({
        where: { id: existingLike.id }
      });
      updated = await prisma.product.update({
        where: { id: productId },
        data: { likes: { decrement: 1 } },
        select: { likes: true }
      });
    } else {
      // Add like
      await prisma.productLike.create({
        data: {
          userId: user.id,
          productId,
        }
      });
      updated = await prisma.product.update({
        where: { id: productId },
        data: { likes: { increment: 1 } },
        select: { likes: true }
      });
    }
    
    revalidatePath("/products/[slug]", "page");
    return { success: true, likes: updated.likes, isLiked: !existingLike };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to like product" };
  }
}
