import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CategoriesClient } from "./CategoriesClient";

export default async function AdminCategoriesPage() {
 await requirePermission('categories.manage');

 const categories = await prisma.category.findMany({
 orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
 include: {
 _count: { select: { products: true, children: true } },
 parent: { select: { name: true } }
 }
 });

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
 <p className="text-muted-foreground mt-1">Manage product categories and hierarchy</p>
 </div>
 </div>

 <Card>
 <CardHeader>
 <CardTitle>All Categories</CardTitle>
 </CardHeader>
 <CardContent>
 <CategoriesClient categories={categories} />
 </CardContent>
 </Card>
 </div>
 );
}
