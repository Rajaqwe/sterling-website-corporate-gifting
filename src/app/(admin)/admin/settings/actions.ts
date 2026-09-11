'use server';

import { requirePermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export async function saveStoreSettings(data: {
 defaultTaxRate: number;
 flatShippingRate: number;
 contactEmail: string | null;
 contactPhone: string | null;
}) {
 await requirePermission('settings.manage');
 
 try {
 await prisma.storeSettings.upsert({
 where: { isSingleton: 1 },
 update: {
 defaultTaxRate: data.defaultTaxRate,
 flatShippingRate: data.flatShippingRate,
 contactEmail: data.contactEmail,
 contactPhone: data.contactPhone
 },
 create: {
 isSingleton: 1,
 defaultTaxRate: data.defaultTaxRate,
 flatShippingRate: data.flatShippingRate,
 contactEmail: data.contactEmail,
 contactPhone: data.contactPhone
 }
 });

 revalidatePath("/admin/settings");
 return { success: true };
 } catch (error: any) {
 console.error("Failed to save settings:", error);
 return { error: "Failed to save settings." };
 }
}
