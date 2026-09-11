import Link from "next/link";
import { requirePermission } from "@/lib/auth/permissions";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { BulkProductImport } from "@/components/admin/BulkProductImport";
import { ProductListClient } from "./ProductListClient";

export default async function AdminProducts(props: { searchParams: Promise<{ q?: string, sort?: string, order?: string }> }) {
  await requirePermission('products.read');
 const searchParams = await props.searchParams;
 const q = searchParams.q || "";
 const sort = searchParams.sort || "createdAt";
 const order = searchParams.order || "desc";

 const where = q ? {
 OR: [
 { name: { contains: q, mode: 'insensitive' as const } },
 { sku: { contains: q, mode: 'insensitive' as const } },
 { category: { name: { contains: q, mode: 'insensitive' as const } } }
 ]
 } : {};

 let orderBy: any = {};
 if (sort === 'category') {
 orderBy = { category: { name: order as any } };
 } else {
 orderBy = { [sort]: order as any };
 }

 const [products, totalProducts] = await Promise.all([
 prisma.product.findMany({
 where,
 include: {
 category: { select: { name: true } }
 },
 orderBy,
 }),
 prisma.product.count({ where })
 ]);

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-3xl font-bold text-foreground ">Product Catalog</h1>
 <p className="mt-2 text-muted-foreground dark:text-muted-foreground">Manage your B2B gifting inventory and pricing tiers.</p>
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <BulkProductImport />
 <Link 
 href="/admin/products/new" 
 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary dark:bg-primary text-white dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90 h-10 px-4 py-2 shrink-0 transition-colors shadow-sm"
 >
 <Plus className="mr-2 h-4 w-4" /> Add Product
 </Link>
 </div>
 </div>

 <div className="flex items-center gap-4 bg-card p-4 border border-border rounded-md shadow-sm">
 <AdminSearchInput placeholder="Search products by name, SKU, or category..." />
 </div>

 <ProductListClient 
 products={products.map(p => ({
 ...p,
 price: Number(p.price),
 compareAtPrice: p.compareAtPrice ? Number(p.compareAtPrice) : null,
 weight: p.weight ? Number(p.weight) : null,
 rating: p.rating ? Number(p.rating) : null,
 createdAt: p.createdAt.toISOString(),
 updatedAt: p.updatedAt.toISOString()
 }))} 
 totalCount={totalProducts} 
 />
 </div>
 );
}
