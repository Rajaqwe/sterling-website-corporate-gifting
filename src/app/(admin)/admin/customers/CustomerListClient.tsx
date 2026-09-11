"use client";

import { DataTable, Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Users, Building2 } from "lucide-react";

export function CustomerListClient({ users, totalCount }: { users: any[], totalCount: number }) {
 const columns: Column<any>[] = [
 { 
 header: "Client Name", 
 accessorKey: "fullName", 
 sortable: true,
 cell: (item) => (
 <a href={`/admin/customers/${item.id}`} className="hover:underline text-primary font-medium text-foreground">
 {item.fullName || 'N/A'}
 </a>
 )
 },
 { 
 header: "Email", 
 accessorKey: "email",
 sortable: true,
 cell: (item) => item.email
 },
 { 
 header: "Company", 
 cell: (item) => (
 item.companyMembers && item.companyMembers.length > 0 ? (
 <div className="flex items-center text-sm text-muted-foreground">
 <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
 {item.companyMembers[0].company.name}
 </div>
 ) : (
 <span className="text-muted-foreground italic">No company</span>
 )
 )
 },
 { 
 header: "Role", 
 accessorKey: "role",
 sortable: true,
 cell: (item) => (
 <Badge variant={item.role === 'ADMIN' ? 'default' : 'secondary'}>
 {item.role}
 </Badge>
 )
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
 data={users}
 columns={columns}
 totalCount={totalCount}
 emptyState={
 <div className="flex flex-col items-center justify-center space-y-3 py-10">
 <Users className="h-12 w-12 text-muted-foreground" />
 <h3 className="text-lg font-medium text-foreground">No clients found</h3>
 <p className="text-muted-foreground max-w-sm text-center">There are currently no active users matching your search.</p>
 </div>
 }
 />
 );
}
