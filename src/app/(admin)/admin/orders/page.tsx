import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Search, Eye } from "lucide-react";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/prisma/client";
import { Input } from "@/components/ui/input";

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { fullName: true, email: true } },
      company: { select: { name: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Orders</h1>
          <p className="mt-2 text-slate-500">Track and manage corporate gift orders.</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 border rounded-md shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by order ID or client..." className="pl-9 h-10" />
        </div>
      </div>

      <div className="border border-slate-200 rounded-md bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Package className="h-12 w-12 text-slate-300" />
                    <h3 className="text-lg font-medium text-slate-900">No orders found</h3>
                    <p className="text-slate-500 max-w-sm text-center">There are currently no active orders in the system.</p>
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
                    {formatINR(order.total)}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
