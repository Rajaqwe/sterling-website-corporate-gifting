'use server';

import { requirePermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export async function toggleCompanyStatus(companyId: string, isActive: boolean) {
 const admin = await requirePermission('companies.manage');

 try {
 await prisma.company.update({
 where: { id: companyId },
 data: { isActive }
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'COMPANY_STATUS_TOGGLED',
 resource: 'Company',
 resourceId: companyId,
 metadata: { isActive }
 }
 });

 revalidatePath(`/admin/companies/${companyId}`);
 revalidatePath(`/admin/companies`);
 return { success: true };
 } catch (error: any) {
 console.error("Failed to toggle company status:", error);
 return { error: "Failed to update company status." };
 }
}

export async function updateCompanyProfile(companyId: string, data: { industry?: string, size?: string, website?: string, phone?: string, email?: string, gstNumber?: string }) {
 const admin = await requirePermission('companies.manage');

 try {
 await prisma.company.update({
 where: { id: companyId },
 data: {
 industry: data.industry,
 size: data.size,
 website: data.website,
 phone: data.phone,
 email: data.email,
 gstNumber: data.gstNumber,
 }
 });

 await prisma.auditLog.create({
 data: {
 actorId: admin.id,
 action: 'COMPANY_PROFILE_UPDATED',
 resource: 'Company',
 resourceId: companyId,
 metadata: data
 }
 });

 revalidatePath(`/admin/companies/${companyId}`);
 return { success: true };
 } catch (error: any) {
 console.error("Failed to update company profile:", error);
 return { error: "Failed to update company profile." };
 }
}
