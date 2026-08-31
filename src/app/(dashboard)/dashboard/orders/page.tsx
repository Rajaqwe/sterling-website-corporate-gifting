import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatINR } from "@/lib/currency";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { Package, Download } from "lucide-react";
import Link from "next/link";
import { AdminPagination } from "@/components/admin/AdminPagination";

export default async function DashboardOrders(props: { searchParams?: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const pageSize = 10;
  const auth = await requireUser();
  const user = auth.user;

  // Fetch real orders from database for the logged in user with pagination
  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.order.count({ where: { userId: user.id } })
  ]);
  const totalPages = Math.ceil(totalOrders / pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Order History</h1>
        <p className="mt-2 text-muted-foreground">Track your past corporate orders and shipments.</p>
      </div>

      <div className="border rounded-md bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Ref</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <Package className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">You haven&apos;t placed any orders yet.</p>
                    <Link href="/corporate-gifts" className="text-primary font-medium hover:underline">
                      Browse Corporate Catalog
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary">{order.orderNumber}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{formatINR(order.total)}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'DELIVERED' ? 'default' : order.status === 'PENDING' ? 'secondary' : 'outline'}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <a href={`/api/orders/${order.id}/pdf`} target="_blank" className="text-muted-foreground hover:text-primary transition-all duration-[var(--motion-fast)] ease-[var(--ease-standard)] opacity-70 group-hover:opacity-100 flex items-center justify-end gap-1 text-sm font-medium">
                      <Download className="h-4 w-4" /> PDF
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {totalPages > 1 && <AdminPagination currentPage={page} totalPages={totalPages} />}
      </div>
    </div>
  );
}
