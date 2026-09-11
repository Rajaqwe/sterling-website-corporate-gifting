import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette } from "lucide-react";
import { BrandingClient } from "./BrandingClient";


import { formatINR } from "@/lib/currency";

export default async function AdminBrandingPage() {
 await requirePermission('branding.manage');

 const brandingOptions = await prisma.brandingOption.findMany({
 orderBy: { createdAt: 'desc' },
 include: {
 _count: { select: { products: true } }
 }
 });

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Branding Options</h1>
 <p className="text-muted-foreground mt-1">Manage available branding and customization options for products</p>
 </div>

 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Palette className="h-5 w-5" />
 All Branding Options
 </CardTitle>
 </CardHeader>
 <CardContent>
 <BrandingClient options={brandingOptions} />
 </CardContent>
 </Card>
 </div>
 );
}
