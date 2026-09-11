'use server';

import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const adjustSchema = z.object({
 variantId: z.string().min(1),
 delta: z.number().int(),
 reason: z.string().min(1, "Reason is required").max(500),
});

export async function adjustInventory(variantId: string, delta: number, reason: string) {
 const admin = await requirePermission('inventory.adjust');

 const parsed = adjustSchema.safeParse({ variantId, delta, reason });
 if (!parsed.success) {
 return { error: "Validation failed." };
 }

 try {
 const variant = await prisma.productVariant.findUnique({
 where: { id: variantId },
 select: { stockQuantity: true, name: true }
 });

 if (!variant) return { error: "Variant not found." };

 const currentStock = variant.stockQuantity ?? 0;
 const newStock = currentStock + delta;

 if (newStock < 0) {
 return { error: `Cannot reduce stock below 0. Current stock: ${currentStock}` };
 }

 await prisma.productVariant.update({
 where: { id: variantId },
 data: { stockQuantity: newStock }
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'INVENTORY_ADJUSTED',
 resource: 'ProductVariant',
 resourceId: variantId,
 metadata: {
 delta,
 before: currentStock,
 after: newStock,
 reason
 }
 }
 });

 revalidatePath('/admin/inventory');
 return { success: true, newStock };
 } catch (error) {
 console.error("Failed to adjust inventory:", error);
 return { error: "Failed to adjust inventory." };
 }
}
