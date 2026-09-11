'use server';

import { requirePermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export async function toggleCustomerStatus(userId: string, isActive: boolean) {
 const admin = await requirePermission('customers.manage');

 try {
 await prisma.user.update({
 where: { id: userId },
 data: { isActive }
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'CUSTOMER_STATUS_TOGGLED',
 resource: 'User',
 resourceId: userId,
 metadata: { isActive }
 }
 });

 revalidatePath(`/admin/customers/${userId}`);
 revalidatePath(`/admin/customers`);
 return { success: true };
 } catch (error: any) {
 console.error("Failed to toggle customer status:", error);
 return { error: "Failed to update customer status." };
 }
}

export async function updateCustomerProfile(userId: string, data: { fullName?: string, phone?: string }) {
 const admin = await requirePermission('customers.manage');

 try {
 await prisma.user.update({
 where: { id: userId },
 data: {
 fullName: data.fullName,
 phone: data.phone,
 },
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'CUSTOMER_PROFILE_UPDATED',
 resource: 'User',
 resourceId: userId,
 metadata: data
 }
 });

 revalidatePath(`/admin/customers/${userId}`);
 return { success: true };
 } catch (error: any) {
 console.error("Failed to update customer profile:", error);
 return { error: "Failed to update customer profile." };
 }
}
