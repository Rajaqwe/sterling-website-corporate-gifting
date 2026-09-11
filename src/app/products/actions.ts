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
  const supabase = await createClient();
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

export async function addToCart(
  productId: string, 
  quantity: number, 
  variantId?: string,
  configuration?: any // ProductConfiguration
) {
  try {
    const user = await getUser();

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

    let currentStock = product.stockQuantity;
    if (variantId) {
      const variant = product.variants.find((v: any) => v.id === variantId);
      if (!variant || !variant.isActive) {
        return { success: false, error: "Selected variant is not available" };
      }
      if (variant.stockQuantity !== null && variant.stockQuantity !== undefined) {
        currentStock = variant.stockQuantity;
      }
    }

    const { cookies } = await import("next/headers");
    let sessionId = (await cookies()).get("guest_cart_session")?.value;
    
    let cartQuery: any = user ? { userId: user.id } : undefined;
    if (!user) {
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        (await cookies()).set("guest_cart_session", sessionId, { maxAge: 60 * 60 * 24 * 30 });
      }
      cartQuery = { sessionId };
    }

    let cart = await prisma.cart.findUnique({
      where: user ? { userId: user.id } : { sessionId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: user ? { userId: user.id } : { sessionId },
        include: { items: true },
      });
    }

    // Cart merge logic P0-4: Items merge ONLY if product, variant, and configuration exactly match.
    // To compare configurations, we stringify them (after ensuring predictable key order if needed, but for now JSON.stringify of the object is used).
    const isConfigEqual = (c1: any, c2: any) => {
      if (!c1 && !c2) return true;
      if (!c1 || !c2) return false;
      return JSON.stringify(c1) === JSON.stringify(c2);
    };

    const existingItem = cart.items.find(
      (i: any) => 
        i.productId === productId && 
        (i.variantId === variantId || (!i.variantId && !variantId)) &&
        isConfigEqual(i.configuration, configuration)
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
          configuration: configuration ? JSON.parse(JSON.stringify(configuration)) : null,
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
  variantId?: string;
  fileUrl?: string;
  fileName?: string;
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
      data.customizationIds,
      data.variantId
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
        fileUrl: data.fileUrl,
        fileName: data.fileName,
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
          status: { in: ['DELIVERED'] },
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

    let isLiked = false;
    let updated;

    await prisma.$transaction(async (tx) => {
      const existingLike = await tx.productLike.findUnique({
        where: {
          userId_productId: {
            userId: user.id,
            productId,
          }
        }
      });

      if (existingLike) {
        // Remove like
        await tx.productLike.delete({
          where: { id: existingLike.id }
        });
        updated = await tx.product.update({
          where: { id: productId },
          data: { likes: { decrement: 1 } },
          select: { likes: true }
        });
        isLiked = false;
      } else {
        // Add like
        await tx.productLike.create({
          data: {
            userId: user.id,
            productId,
          }
        });
        updated = await tx.product.update({
          where: { id: productId },
          data: { likes: { increment: 1 } },
          select: { likes: true }
        });
        isLiked = true;
      }
    });
    
    revalidatePath("/products/[slug]", "page");
    return { success: true, likes: updated!.likes, isLiked };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to like product" };
  }
}
