import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Download } from "lucide-react";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/prisma/client";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { AdminPagination } from "@/components/admin/AdminPagination";

export default async function AdminOrders(props: { searchParams: Promise<{ page?: string, q?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const q = searchParams.q || "";
  const take = 10;
  const skip = (page - 1) * take;

  const where = q ? {
    OR: [
      { orderNumber: { contains: q, mode: 'insensitive' as const } },
      { user: { email: { contains: q, mode: 'insensitive' as const } } },
      { company: { name: { contains: q, mode: 'insensitive' as const } } },
    ]
  } : {};

  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        user: { select: { fullName: true, email: true } },
        company: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.order.count({ where })
  ]);

  const totalPages = Math.ceil(totalOrders / take);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="mt-2 text-slate-500">Track and manage corporate gift orders.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-background p-4 border rounded-md shadow-sm">
        <AdminSearchInput placeholder="Search by order ID or client..." />
      </div>

      <div className="border border-slate-200 rounded-md bg-background overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Package className="h-12 w-12 text-slate-300" />
                    <h3 className="text-lg font-medium text-slate-900">No orders found</h3>
                    <p className="text-slate-500 max-w-sm text-center">There are currently no active orders matching your search.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-slate-900">
                    {order.orderNumber || order.id.substring(0, 8)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.company?.name || 'N/A'}</span>
                      <span className="text-xs text-slate-500">{order.user?.fullName || order.user?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'DELIVERED' ? 'default' : order.status === 'PENDING' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatINR(Number(order.total))}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <a href={`/api/orders/${order.id}/pdf`} target="_blank" className="inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors" title="Download Invoice">
                      <Download className="h-4 w-4" />
                    </a>
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
