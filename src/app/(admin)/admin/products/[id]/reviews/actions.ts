'use server'

import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/permissions";

type ReviewInput = { userId: string, rating: number, title?: string, content?: string, isVerified: boolean };

function validateReviewInput(data: ReviewInput) {
  if (!data.userId) return "Missing user.";
  if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) return "Rating must be an integer between 1 and 5.";
  if (data.title && data.title.length > 150) return "Title is too long.";
  if (data.content && data.content.length > 2000) return "Content is too long.";
  return null;
}

async function recomputeProductRating(tx: any, productId: string) {
  const reviews = await tx.review.findMany({
    where: { productId },
    select: { rating: true },
  });
  const reviewCount = reviews.length;
  const avgRating = reviewCount > 0 ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewCount : 0;

  await tx.product.update({
    where: { id: productId },
    data: {
      rating: avgRating,
      reviewCount,
    },
  });
}

export async function addReview(productId: string, data: ReviewInput) {
  await requirePermission('reviews.manage');

  const validationError = validateReviewInput(data);
  if (validationError) return { success: false, error: validationError };
  if (!productId) return { success: false, error: "Missing product." };

  await prisma.$transaction(async (tx) => {
    await tx.review.create({
      data: {
        productId,
        userId: data.userId,
        rating: data.rating,
        title: data.title,
        content: data.content,
        isVerified: data.isVerified,
      },
    });

    await recomputeProductRating(tx, productId);
  });

  revalidatePath(`/admin/products/${productId}/reviews`);
  return { success: true };
}

export async function updateReview(reviewId: string, data: { rating: number, title?: string, content?: string, isVerified: boolean }) {
  await requirePermission('reviews.manage');

  const validationError = validateReviewInput(data as ReviewInput);
  if (validationError) return { success: false, error: validationError };
  if (!reviewId) return { success: false, error: "Missing review." };

  const productId = await prisma.$transaction(async (tx) => {
    const review = await tx.review.update({
      where: { id: reviewId },
      data: {
        rating: data.rating,
        title: data.title,
        content: data.content,
        isVerified: data.isVerified,
      },
      select: { productId: true },
    });

    await recomputeProductRating(tx, review.productId);
    return review.productId;
  });

  revalidatePath(`/admin/products/${productId}/reviews`);
  return { success: true };
}

export async function deleteReview(reviewId: string) {
  await requirePermission('reviews.manage');

  if (!reviewId) return { success: false, error: "Missing review." };

  const productId = await prisma.$transaction(async (tx) => {
    const review = await tx.review.delete({
      where: { id: reviewId },
      select: { productId: true },
    });

    await recomputeProductRating(tx, review.productId);
    return review.productId;
  });

  revalidatePath(`/admin/products/${productId}/reviews`);
  return { success: true };
}
