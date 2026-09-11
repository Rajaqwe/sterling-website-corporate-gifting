'use server';

import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const brandingSchema = z.object({
 name: z.string().min(1).max(100),
 description: z.string().max(500).optional(),
 additionalCost: z.coerce.number().min(0).default(0),
 minimumQuantity: z.coerce.number().int().min(1).default(1),
 leadTimeDays: z.coerce.number().int().min(0).default(7),
 isActive: z.boolean().default(true),
});

export type BrandingFormPayload = z.infer<typeof brandingSchema>;

export async function createBrandingOption(data: BrandingFormPayload) {
 const admin = await requirePermission('branding.manage');
 const parsed = brandingSchema.safeParse(data);
 if (!parsed.success) return { error: "Validation failed." };

 try {
 await prisma.brandingOption.create({ data: { ...parsed.data, description: parsed.data.description || null } });
 await prisma.auditLog.create({
 data: { actorId: admin.id, action: 'BRANDING_CREATED', resource: 'BrandingOption', resourceId: parsed.data.name, metadata: {} }
 });
 revalidatePath('/admin/branding');
 return { success: true };
 } catch (error) {
 console.error(error);
 return { error: "Failed to create branding option." };
 }
}

export async function updateBrandingOption(id: string, data: BrandingFormPayload) {
 const admin = await requirePermission('branding.manage');
 const parsed = brandingSchema.safeParse(data);
 if (!parsed.success) return { error: "Validation failed." };

 try {
 await prisma.brandingOption.update({ where: { id }, data: { ...parsed.data, description: parsed.data.description || null } });
 await prisma.auditLog.create({
 data: { actorId: admin.id, action: 'BRANDING_UPDATED', resource: 'BrandingOption', resourceId: id, metadata: {} }
 });
 revalidatePath('/admin/branding');
 return { success: true };
 } catch (error) {
 console.error(error);
 return { error: "Failed to update branding option." };
 }
}

export async function toggleBrandingStatus(id: string, isActive: boolean) {
 const admin = await requirePermission('branding.manage');
 try {
 await prisma.brandingOption.update({ where: { id }, data: { isActive } });
 await prisma.auditLog.create({
 data: { actorId: admin.id, action: 'BRANDING_STATUS_TOGGLED', resource: 'BrandingOption', resourceId: id, metadata: { isActive } }
 });
 revalidatePath('/admin/branding');
 return { success: true };
 } catch (error) {
 console.error(error);
 return { error: "Failed to toggle status." };
 }
}
