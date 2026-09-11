import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettings() {
  await requirePermission('settings.read');
 let settings = await prisma.storeSettings.findUnique({ where: { isSingleton: 1 } });

 if (!settings) {
 try {
 settings = await prisma.storeSettings.create({
 data: {
 isSingleton: 1,
 defaultTaxRate: 18.0,
 flatShippingRate: 500.0,
 contactEmail: "support@sterlinggifting.com",
 contactPhone: "+1 (800) 555-0199"
 }
 });
 } catch (err: any) {
 // Two concurrent first-visits can race on the singleton create — re-read the winner's row
 if (err?.code === 'P2002') {
 settings = await prisma.storeSettings.findUnique({ where: { isSingleton: 1 } });
 } else {
 throw err;
 }
 }
 }

 if (!settings) {
 throw new Error('Store settings could not be loaded.');
 }

 const initialData = {
 defaultTaxRate: settings.defaultTaxRate.toString(),
 flatShippingRate: settings.flatShippingRate.toString(),
 contactEmail: settings.contactEmail || "",
 contactPhone: settings.contactPhone || ""
 };

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
 <p className="mt-2 text-muted-foreground">Configure global preferences for the Sterling B2B Portal.</p>
 </div>

 <SettingsForm initialData={initialData} />
 </div>
 );
}
