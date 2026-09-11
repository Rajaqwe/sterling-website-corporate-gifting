'use server';

import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";


const categorySchema = z.object({
 name: z.string().min(1, "Name is required").max(100),
 slug: z.string().min(1, "Slug is required").max(100).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, alphanumeric and hyphens only"),
 description: z.string().max(500).optional(),
 imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
 isActive: z.boolean().default(true),
 sortOrder: z.coerce.number().int().default(0),
 parentId: z.string().optional(),
 seoTitle: z.string().max(160).optional(),
 seoDescription: z.string().max(320).optional(),
});

export type CategoryFormPayload = z.infer<typeof categorySchema>;

export async function createCategory(data: CategoryFormPayload) {
 const admin = await requirePermission('categories.manage');

 const parsed = categorySchema.safeParse(data);
 if (!parsed.success) {
 return { error: "Validation failed.", details: parsed.error.flatten().fieldErrors };
 }

 try {
 await prisma.category.create({
 data: {
 ...parsed.data,
 imageUrl: parsed.data.imageUrl || null,
 parentId: parsed.data.parentId || null,
 seoTitle: parsed.data.seoTitle || null,
 seoDescription: parsed.data.seoDescription || null,
 description: parsed.data.description || null,
 }
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'CATEGORY_CREATED',
 resource: 'Category',
 resourceId: parsed.data.slug,
 metadata: { name: parsed.data.name }
 }
 });

 revalidatePath('/admin/categories');
 revalidatePath('/corporate-gifts');
 return { success: true };
 } catch (error: any) {
 if (error?.code === 'P2002') return { error: "A category with this slug already exists." };
 console.error("Failed to create category:", error);
 return { error: "Failed to create category." };
 }
}

export async function updateCategory(id: string, data: CategoryFormPayload) {
 const admin = await requirePermission('categories.manage');

 const parsed = categorySchema.safeParse(data);
 if (!parsed.success) {
 return { error: "Validation failed.", details: parsed.error.flatten().fieldErrors };
 }

 try {
 await prisma.category.update({
 where: { id },
 data: {
 ...parsed.data,
 imageUrl: parsed.data.imageUrl || null,
 parentId: parsed.data.parentId || null,
 seoTitle: parsed.data.seoTitle || null,
 seoDescription: parsed.data.seoDescription || null,
 description: parsed.data.description || null,
 }
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'CATEGORY_UPDATED',
 resource: 'Category',
 resourceId: id,
 metadata: { name: parsed.data.name }
 }
 });

 revalidatePath('/admin/categories');
 revalidatePath('/corporate-gifts');
 return { success: true };
 } catch (error: any) {
 if (error?.code === 'P2002') return { error: "A category with this slug already exists." };
 console.error("Failed to update category:", error);
 return { error: "Failed to update category." };
 }
}

export async function toggleCategoryStatus(id: string, isActive: boolean) {
 const admin = await requirePermission('categories.manage');

 try {
 await prisma.category.update({ where: { id }, data: { isActive } });
 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'CATEGORY_STATUS_TOGGLED',
 resource: 'Category',
 resourceId: id,
 metadata: { isActive }
 }
 });

 revalidatePath('/admin/categories');
 return { success: true };
 } catch (error) {
 console.error("Failed to toggle category status:", error);
 return { error: "Failed to update category status." };
 }
}
