import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/prisma/client";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { AdminPagination } from "@/components/admin/AdminPagination";
import { BulkProductImport } from "@/components/admin/BulkProductImport";

export default async function AdminProducts(props: { searchParams: Promise<{ page?: string, q?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = searchParams.q || "";
  const take = 10;
  const skip = (page - 1) * take;

  const where = q ? {
    OR: [
      { name: { contains: q, mode: 'insensitive' as const } },
      { sku: { contains: q, mode: 'insensitive' as const } },
      { category: { name: { contains: q, mode: 'insensitive' as const } } }
    ]
  } : {};

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.product.count({ where })
  ]);

  const totalPages = Math.ceil(totalProducts / take);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Product Catalog</h1>
          <p className="mt-2 text-slate-500">Manage your B2B gifting inventory and pricing tiers.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <BulkProductImport />
          <Link 
            href="/admin/products/new" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2 shrink-0"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
        <AdminSearchInput placeholder="Search products by name, SKU, or category..." />
      </div>

      <div className="border border-slate-200 rounded-md bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Merchandising</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Package className="h-12 w-12 text-slate-300" />
                    <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                    <p className="text-slate-500 max-w-sm text-center">Your catalog search returned no results.</p>
                    <Link 
                      href="/admin/products/new" 
                      className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add First Product
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-slate-900">{product.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
                  <TableCell>{formatINR(product.price)}</TableCell>
                  <TableCell>
                    <span className={product.stockQuantity < 100 ? "text-amber-600 font-medium" : ""}>
                      {product.stockQuantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === "ACTIVE" ? "default" : product.status === "DRAFT" ? "secondary" : "destructive"}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <form action={async () => {
                      'use server';
                      const { prisma } = await import('@/lib/prisma/client');
                      const { requireAdmin } = await import('@/lib/auth/require-admin');
                      await requireAdmin();
                      await prisma.product.update({
                        where: { id: product.id },
                        data: { isFeatured: !product.isFeatured }
                      });
                      const { revalidatePath } = await import('next/cache');
                      revalidatePath('/admin/products');
                    }}>
                      <button type="submit" className={`text-xs px-2 py-1 rounded border ${product.isFeatured ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}>
                        {product.isFeatured ? 'Featured ★' : 'Feature'}
                      </button>
                    </form>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdminPagination totalPages={totalPages} currentPage={page} />
    </div>
  );
}
