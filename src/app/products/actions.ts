/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { calculateServerProductTotal } from "@/lib/pricing/server";
import crypto from "crypto";

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

    // --- Server-side validation (P1-9) ---
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { success: false, error: "Quantity must be a positive integer" };
    }
    if (quantity > 10000) {
      return { success: false, error: "Quantity exceeds maximum allowed (10,000)" };
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { variants: true },
    });

    if (!product || product.status !== 'ACTIVE') {
      return { success: false, error: "Product is not available" };
    }

    if (quantity < product.minimumOrderQuantity) {
      return { success: false, error: `Minimum order quantity is ${product.minimumOrderQuantity}` };
    }

    // Validate variant belongs to this product
    if (variantId) {
      const variant = product.variants.find((v: any) => v.id === variantId);
      if (!variant || !variant.isActive) {
        return { success: false, error: "Selected variant is not available" };
      }
    }

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
  // quoteCalculation is intentionally NOT accepted — server calculates all pricing
}) {
  try {
    const user = await getUser();

    // --- Server-side validation (P1-9) ---
    if (!Number.isInteger(data.quantity) || data.quantity < 1) {
      return { success: false, error: "Quantity must be a positive integer" };
    }

    // --- Server-authoritative pricing (P0-1) ---
    // NEVER trust client-supplied tierUnitPrice or estimatedTotal
    const pricing = await calculateServerProductTotal(
      data.productId,
      data.quantity,
      data.customizationIds
    );

    // Generate collision-resistant quote number (P1-1)
    const quoteNumber = `STR-Q-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    
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
            description: pricing.product.name,
            quantity: data.quantity,
            unitPrice: pricing.tierUnitPrice,       // SERVER-calculated
            totalPrice: pricing.total,              // SERVER-calculated
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

    // --- Rating validation (P0-2) ---
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return { success: false, error: "Rating must be an integer between 1 and 5" };
    }

    // --- Purchase verification (P0-2) ---
    // Check that the user has a qualifying completed/delivered order containing this product
    const qualifyingOrder = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId: user.id,
          status: { in: ['DELIVERED', 'COMPLETED' as any] },
        },
      },
    });

    const isVerified = !!qualifyingOrder;

    // --- Atomic review creation + aggregate update (P1-11) ---
    await prisma.$transaction(async (tx: any) => {
      // Create review — @@unique([productId, userId]) prevents duplicates at DB level
      await tx.review.create({
        data: {
          productId,
          userId: user.id,
          rating,
          title,
          content,
          isVerified,  // Only true when purchase is server-confirmed
        }
      });

      // Concurrency-safe aggregate update using DB aggregation inside transaction
      const agg = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: { rating: true },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          rating: agg._avg.rating ?? 0,
          reviewCount: agg._count.rating,
        }
      });
    });

    revalidatePath("/products/[slug]", "page");
    return { success: true };
  } catch (err: any) {
    // Handle duplicate review (unique constraint violation)
    if (err?.code === 'P2002') {
      return { success: false, error: "You have already reviewed this product" };
    }
    return { success: false, error: err.message || "Failed to submit review" };
  }
}

// ------------------------------------------------------
// LIKE ACTIONS
// ------------------------------------------------------

/** Discriminated-union result so callers can narrow on success without 'boolean | undefined' errors. */
type ToggleLikeResult =
  | { success: true; likes: number; isLiked: boolean }
  | { success: false; error: string };

export async function toggleLike(productId: string): Promise<ToggleLikeResult> {
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
