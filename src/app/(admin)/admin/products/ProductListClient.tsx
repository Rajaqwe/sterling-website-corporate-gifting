"use client";

import { DataTable, Column } from "@/components/admin/DataTable";
import { formatINR } from "@/lib/currency";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { toggleProductFeatured } from "./actions";

export function ProductListClient({ products, totalCount }: { products: any[], totalCount: number }) {
    const columns: Column<any>[] = [
        {
            header: "SKU",
            accessorKey: "sku",
            sortable: true,
            cell: (item) => (
                <span className="font-mono text-xs text-muted-foreground font-medium">
                    {item.sku}
                </span>
            )
        },
        {
            header: "Product Name",
            accessorKey: "name",
            sortable: true,
            cell: (item) => (
                <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground dark:text-muted-foreground shrink-0" />
                    <span className="truncate max-w-[240px] font-medium text-foreground " title={item.name}>
                        {item.name}
                    </span>
                </div>
            )
        },
        {
            header: "Category",
            cell: (item) => (
                <span className="text-muted-foreground dark:text-muted-foreground">
                    {item.category?.name || "Uncategorized"}
                </span>
            )
        },
        {
            header: "Base Price",
            accessorKey: "price",
            sortable: true,
            cell: (item) => (
                <span className="font-medium text-foreground ">
                    {formatINR(item.price)}
                </span>
            )
        },
        {
            header: "Stock",
            accessorKey: "stockQuantity",
            sortable: true,
            cell: (item) => (
                <span className={item.stockQuantity < 100 ? "text-amber-600 dark:text-amber-400 font-semibold" : "text-muted-foreground "}>
                    {item.stockQuantity}
                </span>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (item) => (
                <Badge variant={item.status === "ACTIVE" ? "default" : item.status === "DRAFT" ? "secondary" : "destructive"}>
                    {item.status}
                </Badge>
            )
        },
        {
            header: "Merchandising",
            cell: (item) => (
                <form action={() => toggleProductFeatured(item.id, item.isFeatured)}>
                    <button
                        type="submit"
                        className={`text-xs px-2.5 py-1 rounded border transition-colors ${item.isFeatured
                                ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                                : 'bg-muted text-muted-foreground dark:text-muted-foreground border-border hover:bg-muted/70 dark:hover:bg-slate-700'
                            }`}
                    >
                        {item.isFeatured ? 'Featured ★' : 'Feature'}
                    </button>
                </form>
            )
        },
        {
            header: "Action",
            cell: (item) => (
                <Link href={`/admin/products/${item.id}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                    Edit
                </Link>
            )
        },
    ];

    return (
        <DataTable
            data={products}
            columns={columns}
            totalCount={totalCount}
            showPagination={false}
            scrollable={true}
            itemLabel="products"
            emptyState={
                <div className="flex flex-col items-center justify-center space-y-3 py-12">
                    <Package className="h-12 w-12 text-muted-foreground dark:text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground ">No products found</h3>
                    <p className="text-muted-foreground dark:text-muted-foreground max-w-sm text-center">Your catalog search returned no results.</p>
                    <Link
                        href="/admin/products/new"
                        className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add First Product
                    </Link>
                </div>
            }
        />
    );
}
