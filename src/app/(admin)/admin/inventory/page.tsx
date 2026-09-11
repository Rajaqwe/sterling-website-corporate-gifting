import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, TrendingDown } from "lucide-react";
import { InventoryAdjustButton } from "./InventoryAdjustButton";

export default async function AdminInventoryPage() {
 await requirePermission('inventory.read');

 const variants = await prisma.productVariant.findMany({
 where: { isActive: true },
 orderBy: [{ stockQuantity: 'asc' }],
 include: {
 product: {
 select: { id: true, name: true, sku: true, status: true }
 }
 }
 });

 const outOfStock = variants.filter(v => (v.stockQuantity ?? 0) <= 0);
 const lowStock = variants.filter(v => (v.stockQuantity ?? 0) > 0 && (v.stockQuantity ?? 0) < 10);
 const healthy = variants.filter(v => (v.stockQuantity ?? 0) >= 10);

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
 <p className="text-muted-foreground mt-1">Monitor and adjust stock levels across all product variants</p>
 </div>

 <div className="grid gap-4 md:grid-cols-3">
 <Card className="border-red-200 bg-red-50">
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium text-red-700 flex items-center gap-2">
 <Package className="h-4 w-4" /> Out of Stock
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-red-900">{outOfStock.length}</div>
 </CardContent>
 </Card>
 <Card className="border-amber-200 bg-amber-50">
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium text-amber-700 flex items-center gap-2">
 <TrendingDown className="h-4 w-4" /> Low Stock (&lt;10)
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-amber-900">{lowStock.length}</div>
 </CardContent>
 </Card>
 <Card className="border-green-200 bg-green-50">
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
 <Package className="h-4 w-4" /> Healthy Stock
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-green-900">{healthy.length}</div>
 </CardContent>
 </Card>
 </div>

 <Card>
 <CardHeader>
 <CardTitle>All Variants</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="rounded-md border overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-secondary/20 border-b">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Product</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Variant</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">SKU</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Stock</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
 <th className="text-right px-4 py-3 font-medium text-muted-foreground">Adjust</th>
 </tr>
 </thead>
 <tbody className="divide-y">
 {variants.map(variant => {
 const stock = variant.stockQuantity ?? 0;
 const stockStatus = stock <= 0 ? 'out' : stock < 10 ? 'low' : 'ok';
 return (
 <tr key={variant.id} className={`hover:bg-secondary/20 ${stockStatus === 'out' ? 'bg-red-50' : stockStatus === 'low' ? 'bg-amber-50' : ''}`}>
 <td className="px-4 py-3">
 <Link href={`/admin/products/${variant.product.id}`} className="font-medium text-primary hover:underline">
 {variant.product.name}
 </Link>
 <div className="text-xs text-muted-foreground">{variant.product.sku}</div>
 </td>
 <td className="px-4 py-3 text-muted-foreground">{variant.name}</td>
 <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{variant.sku || '—'}</td>
 <td className="px-4 py-3 text-center">
 <span className={`font-bold text-base ${stockStatus === 'out' ? 'text-red-600' : stockStatus === 'low' ? 'text-amber-600' : 'text-green-600'}`}>
 {stock}
 </span>
 </td>
 <td className="px-4 py-3 text-center">
 {stockStatus === 'out' && <Badge variant="destructive">Out of Stock</Badge>}
 {stockStatus === 'low' && <Badge className="bg-amber-100 text-amber-800 border-amber-200">Low Stock</Badge>}
 {stockStatus === 'ok' && <Badge className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>}
 </td>
 <td className="px-4 py-3 text-right">
 <InventoryAdjustButton variantId={variant.id} currentStock={stock} variantName={`${variant.product.name} — ${variant.name}`} />
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
