"use client";

import { DataTable, Column } from "@/components/admin/DataTable";
import { formatINR } from "@/lib/currency";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Package, Download } from "lucide-react";

export function OrderListClient({ orders, totalCount }: { orders: any[], totalCount: number }) {
    const columns: Column<any>[] = [
        {
            header: "Order Number",
            accessorKey: "orderNumber",
            sortable: true,
            cell: (item) => (
                <a href={`/admin/orders/${item.id}`} className="hover:underline text-primary font-medium text-foreground">
                    {item.orderNumber || item.id.substring(0, 8)}
                </a>
            )
        },
        {
            header: "Client",
            cell: (item) => (
                <div className="flex flex-col">
                    <span className="font-medium">{item.company?.name || 'N/A'}</span>
                    <span className="text-xs text-muted-foreground">{item.user?.fullName || item.user?.email}</span>
                </div>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            sortable: true,
            cell: (item) => (
                <Badge variant={item.status === 'DELIVERED' ? 'default' : item.status === 'PENDING' ? 'secondary' : 'outline'}>
                    {item.status}
                </Badge>
            )
        },
        {
            header: "Total",
            accessorKey: "total",
            sortable: true,
            cell: (item) => formatINR(Number(item.total))
        },
        {
            header: "Date",
            accessorKey: "createdAt",
            sortable: true,
            cell: (item) => item.formattedDate || new Date(item.createdAt).toLocaleDateString()
        },
        {
            header: "Actions",
            cell: (item) => (
                <div className="flex justify-end">
                    <a href={`/api/orders/${item.id}/pdf`} target="_blank" className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Download Invoice">
                        <Download className="h-4 w-4" />
                    </a>
                </div>
            )
        },
    ];

    return (
        <DataTable
            data={orders}
            columns={columns}
            totalCount={totalCount}
            emptyState={
                <div className="flex flex-col items-center justify-center space-y-3 py-16 px-4 bg-secondary/20 /50 border border-dashed border-border rounded-xl">
                    <Package className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-foreground ">No orders found</h3>
                    <p className="text-muted-foreground max-w-sm text-center">There are currently no active orders matching your search.</p>
                </div>
            }
        />
    );
}
