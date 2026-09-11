"use client";

import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatINR } from "@/lib/currency";
import { Download, FileSearch } from "lucide-react";
import Link from "next/link";

export function QuoteListClient({ quotes, totalCount }: { quotes: any[], totalCount: number }) {
 const columns: Column<any>[] = [
 { 
 header: "Quote Ref", 
 accessorKey: "quoteNumber", 
 sortable: true,
 cell: (item) => <span className="font-medium text-foreground">{item.quoteNumber}</span>
 },
 { 
 header: "Company", 
 accessorKey: "companyName",
 sortable: true,
 cell: (item) => item.companyName || 'N/A'
 },
 { 
 header: "Date", 
 accessorKey: "createdAt",
 sortable: true,
 cell: (item) => item.formattedDate || new Date(item.createdAt).toLocaleDateString()
 },
 { 
 header: "Est. Budget", 
 cell: (item) => {
 const totalBudget = item.budgetPerRecipient 
 ? Number(item.budgetPerRecipient) * item.numberOfRecipients 
 : 0;
 return formatINR(totalBudget);
 }
 },
 { 
 header: "Status", 
 accessorKey: "status",
 sortable: true,
 cell: (item) => <StatusBadge status={item.status} />
 },
 { 
 header: "Action", 
 cell: (item) => (
 <div className="flex items-center justify-end gap-3 text-right">
 <a href={`/api/quotes/${item.id}/pdf`} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors" title="Download PDF Quote">
 <Download className="h-4 w-4" />
 </a>
 <Link href={`/admin/quotes/${item.id}`} className="text-accent hover:underline text-sm font-semibold">
 Review
 </Link>
 </div>
 )
 }
 ];

 return (
 <DataTable
 data={quotes}
 columns={columns}
 totalCount={totalCount}
 emptyState={
 <div className="flex flex-col items-center justify-center space-y-3 py-16 px-4 bg-secondary/20 /50 border border-dashed border-border rounded-xl">
 <FileSearch className="h-12 w-12 text-muted-foreground" />
 <h3 className="text-lg font-medium text-foreground ">No quotes found</h3>
 <p className="text-muted-foreground max-w-sm text-center">There are currently no quote requests in the system matching your search.</p>
 </div>
 }
 />
 );
}
