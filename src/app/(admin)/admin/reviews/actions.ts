'use server';

import { requirePermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export async function approveReview(reviewId: string) {
 const user = await requirePermission('reviews.manage');
 try {
 await prisma.review.update({
 where: { id: reviewId },
 data: { isVerified: true }
 });
 
 await prisma.auditLog.create({
 data: {
 actorId: user.id,
 action: 'REVIEW_APPROVED',
 resource: 'Review',
 resourceId: reviewId
 }
 });

 revalidatePath("/admin/reviews");
 return { success: true };
 } catch (error) {
 return { error: "Failed to approve review" };
 }
}

export async function rejectReview(reviewId: string) {
 const user = await requirePermission('reviews.manage');
 try {
 await prisma.review.delete({
 where: { id: reviewId }
 });

 await prisma.auditLog.create({
 data: {
 actorId: user.id,
 action: 'REVIEW_REJECTED',
 resource: 'Review',
 resourceId: reviewId
 }
 });

 revalidatePath("/admin/reviews");
 return { success: true };
 } catch (error) {
 return { error: "Failed to reject review" };
 }
}
