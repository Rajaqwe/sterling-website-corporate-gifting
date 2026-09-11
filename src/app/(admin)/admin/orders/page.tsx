import { Download } from "lucide-react";
import { requirePermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma/client";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { OrderListClient } from "./OrderListClient";

export default async function AdminOrders(props: { searchParams: Promise<{ page?: string, q?: string, sort?: string, order?: string }> }) {
  await requirePermission('orders.read');
 const searchParams = await props.searchParams;
 const page = Number(searchParams.page) || 1;
 const q = searchParams.q || "";
 const sort = searchParams.sort || "createdAt";
 const order = searchParams.order || "desc";
 const take = 10;
 const skip = (page - 1) * take;

 const where = q ? {
 OR: [
 { orderNumber: { contains: q, mode: 'insensitive' as const } },
 { user: { email: { contains: q, mode: 'insensitive' as const } } },
 { company: { name: { contains: q, mode: 'insensitive' as const } } },
 ]
 } : {};

 let orderBy: any = {};
 if (sort === 'createdAt') {
 orderBy = { createdAt: order as any };
 } else if (sort === 'total') {
 orderBy = { total: order as any };
 } else if (sort === 'orderNumber') {
 orderBy = { orderNumber: order as any };
 } else if (sort === 'status') {
 orderBy = { status: order as any };
 } else {
 orderBy = { createdAt: 'desc' };
 }

 // Serialized to prevent EAUTHTIMEOUT connection exhaustion
 const orders = await prisma.order.findMany({
 where,
 include: {
 user: { select: { fullName: true, email: true } },
 company: { select: { name: true } }
 },
 orderBy,
 skip,
 take,
 });
 
 const totalOrders = await prisma.order.count({ where });

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div className="flex justify-between items-end gap-4 w-full">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Orders</h1>
 <p className="mt-2 text-muted-foreground">Track and manage corporate gift orders.</p>
 </div>
 <a href="/api/admin/exports/orders" target="_blank" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2 text-sm font-medium">
 <Download className="w-4 h-4" /> Export CSV
 </a>
 </div>
 </div>

 <div className="flex items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
 <AdminSearchInput placeholder="Search by order ID or client..." />
 </div>

 <OrderListClient 
 orders={orders.map(o => ({
 ...o,
 total: Number(o.total),
 subtotal: Number(o.subtotal),
 tax: Number(o.tax),
 shippingCost: Number(o.shippingCost),
 discount: Number(o.discount),
 createdAt: o.createdAt.toISOString(),
 updatedAt: o.updatedAt.toISOString(),
 formattedDate: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(o.createdAt)
 }))} 
 totalCount={totalOrders} 
 />
 </div>
 );
}
