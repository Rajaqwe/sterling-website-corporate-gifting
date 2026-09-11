"use client";

import { DataTable, Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ReviewActions } from "./ReviewActions";

export function ReviewListClient({ reviews, totalCount }: { reviews: any[], totalCount: number }) {
 const columns: Column<any>[] = [
 { 
 header: "Date", 
 accessorKey: "createdAt",
 sortable: true,
 cell: (item) => item.formattedDate || new Date(item.createdAt).toLocaleDateString()
 },
 { 
 header: "Product", 
 cell: (item) => (
 <Link href={`/admin/products/${item.product.id}`} className="text-primary hover:underline font-medium text-sm">
 {item.product.name}
 </Link>
 )
 },
 { 
 header: "Reviewer", 
 cell: (item) => (
 <div>
 <div className="font-medium text-sm">{item.user.fullName}</div>
 <div className="text-xs text-muted-foreground">{item.user.email}</div>
 </div>
 )
 },
 { 
 header: "Rating", 
 accessorKey: "rating",
 sortable: true,
 cell: (item) => (
 <div className="flex items-center gap-1 text-yellow-500">
 {Array.from({ length: 5 }).map((_, i) => (
 <Star key={i} className={`w-3 h-3 ${i < item.rating ? "fill-current" : "text-gray-300"}`} />
 ))}
 </div>
 )
 },
 { 
 header: "Status", 
 accessorKey: "isVerified",
 sortable: true,
 cell: (item) => (
 <Badge variant={item.isVerified ? "default" : "secondary"}>
 {item.isVerified ? "Approved" : "Pending"}
 </Badge>
 )
 },
 { 
 header: "Review", 
 cell: (item) => (
 <div className="max-w-[250px]">
 {item.title && <div className="font-medium text-sm truncate">{item.title}</div>}
 {item.content && <p className="text-xs text-muted-foreground truncate">{item.content}</p>}
 </div>
 )
 },
 { 
 header: "Action", 
 cell: (item) => (
 <ReviewActions reviewId={item.id} isVerified={item.isVerified} />
 )
 }
 ];

 return (
 <DataTable
 data={reviews}
 columns={columns}
 totalCount={totalCount}
 emptyState={
 <div className="flex flex-col items-center justify-center space-y-3 py-10">
 <MessageSquare className="h-12 w-12 text-muted-foreground" />
 <h3 className="text-lg font-medium text-foreground">No reviews found</h3>
 <p className="text-muted-foreground max-w-sm text-center">There are currently no reviews matching your search.</p>
 </div>
 }
 />
 );
}
