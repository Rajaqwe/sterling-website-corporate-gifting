import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { AttributesClient } from "./AttributesClient";



export default async function AdminAttributesPage() {
 await requirePermission('attributes.manage');

 const attributes = await prisma.attribute.findMany({
 orderBy: { name: 'asc' },
 include: {
 values: { orderBy: { value: 'asc' } },
 _count: { select: { values: true } }
 }
 });

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Attributes</h1>
 <p className="text-muted-foreground mt-1">Manage product attributes and their possible values</p>
 </div>

 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <Layers className="h-5 w-5" />
 All Attributes
 </CardTitle>
 </CardHeader>
 <CardContent>
 <AttributesClient attributes={attributes} />
 </CardContent>
 </Card>
 </div>
 );
}
