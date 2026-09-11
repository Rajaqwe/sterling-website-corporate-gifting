"use client";

import { DataTable, Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

export function CompanyListClient({ companies, totalCount }: { companies: any[], totalCount: number }) {
 const columns: Column<any>[] = [
 { 
 header: "Company Name", 
 accessorKey: "name", 
 sortable: true,
 cell: (item) => (
 <div>
 <a href={`/admin/companies/${item.id}`} className="hover:underline text-primary font-medium text-foreground">
 {item.name}
 </a>
 {item.email && <div className="text-xs text-muted-foreground font-normal mt-1">{item.email}</div>}
 </div>
 )
 },
 { 
 header: "Industry", 
 accessorKey: "industry",
 sortable: true,
 cell: (item) => item.industry || 'N/A'
 },
 { 
 header: "Members", 
 cell: (item) => item._count?.members || 0
 },
 { 
 header: "Orders", 
 cell: (item) => item._count?.orders || 0
 },
 { 
 header: "Status", 
 accessorKey: "isActive",
 sortable: true,
 cell: (item) => (
 <Badge variant={item.isActive ? 'default' : 'destructive'} className={item.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
 {item.isActive ? 'Active' : 'Inactive'}
 </Badge>
 )
 },
 { 
 header: "Joined", 
 accessorKey: "createdAt",
 sortable: true,
 cell: (item) => item.formattedDate || new Date(item.createdAt).toLocaleDateString()
 }
 ];

 return (
 <DataTable
 data={companies}
 columns={columns}
 totalCount={totalCount}
 emptyState={
 <div className="flex flex-col items-center justify-center space-y-3 py-10">
 <Building2 className="h-12 w-12 text-muted-foreground" />
 <h3 className="text-lg font-medium text-foreground">No companies found</h3>
 <p className="text-muted-foreground max-w-sm text-center">There are currently no companies matching your search.</p>
 </div>
 }
 />
 );
}
