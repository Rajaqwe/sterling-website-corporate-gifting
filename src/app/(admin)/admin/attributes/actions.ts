'use server';

import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const attributeSchema = z.object({
 name: z.string().min(1).max(100),
 type: z.string().min(1).max(50).default("TEXT"),
});

const attributeValueSchema = z.object({
 value: z.string().min(1).max(200),
});

export async function createAttribute(data: z.infer<typeof attributeSchema>) {
 const admin = await requirePermission('attributes.manage');
 const parsed = attributeSchema.safeParse(data);
 if (!parsed.success) return { error: "Validation failed." };
 try {
 await prisma.attribute.create({ data: parsed.data });
 await prisma.auditLog.create({
 data: { actorId: admin.id, action: 'ATTRIBUTE_CREATED', resource: 'Attribute', resourceId: parsed.data.name, metadata: {} }
 });
 revalidatePath('/admin/attributes');
 return { success: true };
 } catch (error: any) {
 if (error?.code === 'P2002') return { error: "Attribute name must be unique." };
 return { error: "Failed to create attribute." };
 }
}

export async function updateAttribute(id: string, data: z.infer<typeof attributeSchema>) {
 const admin = await requirePermission('attributes.manage');
 const parsed = attributeSchema.safeParse(data);
 if (!parsed.success) return { error: "Validation failed." };
 try {
 await prisma.attribute.update({ where: { id }, data: parsed.data });
 revalidatePath('/admin/attributes');
 return { success: true };
 } catch (error: any) {
 if (error?.code === 'P2002') return { error: "Attribute name must be unique." };
 return { error: "Failed to update attribute." };
 }
}

export async function deleteAttribute(id: string) {
 const admin = await requirePermission('attributes.manage');
 try {
 await prisma.attribute.delete({ where: { id } });
 await prisma.auditLog.create({
 data: { actorId: admin.id, action: 'ATTRIBUTE_DELETED', resource: 'Attribute', resourceId: id, metadata: {} }
 });
 revalidatePath('/admin/attributes');
 return { success: true };
 } catch (error) {
 return { error: "Failed to delete attribute. It may be in use by products." };
 }
}

export async function addAttributeValue(attributeId: string, value: string) {
 const admin = await requirePermission('attributes.manage');
 const parsed = attributeValueSchema.safeParse({ value });
 if (!parsed.success) return { error: "Invalid value." };
 try {
 await prisma.attributeValue.create({ data: { attributeId, value: parsed.data.value } });
 revalidatePath('/admin/attributes');
 return { success: true };
 } catch (error: any) {
 if (error?.code === 'P2002') return { error: "This value already exists for this attribute." };
 return { error: "Failed to add value." };
 }
}

export async function deleteAttributeValue(id: string) {
 const admin = await requirePermission('attributes.manage');
 try {
 await prisma.attributeValue.delete({ where: { id } });
 revalidatePath('/admin/attributes');
 return { success: true };
 } catch (error) {
 return { error: "Failed to delete value." };
 }
}
