import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { notFound } from "next/navigation";
import { formatINR } from "@/lib/currency";
import { OrderStateActions } from "./OrderStateActions";
import { ShippingModule } from "./ShippingModule";
import { RefundModule } from "./RefundModule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  await requirePermission('orders.read');
 const params = await props.params;
 const id = params.id;

 const order = await prisma.order.findUnique({
 where: { id },
 include: {
 user: true,
 company: true,
 shippingAddress: true,
 billingAddress: true,
 items: {
 include: { product: true }
 },
 }
 });

 if (!order) {
 notFound();
 }

 const auditLogs = await prisma.auditLog.findMany({
 where: { resource: 'Order', resourceId: id },
 orderBy: { createdAt: 'desc' },
 include: { actor: { select: { fullName: true, email: true } } }
 });

 return (
 <div className="max-w-6xl mx-auto space-y-6 pb-10">
 <div className="flex items-center gap-4">
 <Link href="/admin/orders" className="text-muted-foreground hover:text-black dark:hover:text-white transition">
 <ArrowLeft className="w-5 h-5" />
 </Link>
 <h1 className="text-3xl font-bold tracking-tight">
 Order {order.orderNumber || order.id.substring(0, 8)}
 </h1>
 <Badge variant={order.status === 'DELIVERED' ? 'default' : order.status === 'PENDING' ? 'secondary' : 'outline'} className="text-sm px-3 py-1">
 {order.status}
 </Badge>
 <div className="flex-1" />
 <a href={`/api/orders/${order.id}/pdf`} target="_blank" className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80">
 <Download className="w-4 h-4" /> Invoice PDF
 </a>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>State Machine Actions</CardTitle>
 </CardHeader>
 <CardContent>
 <OrderStateActions orderId={order.id} currentStatus={order.status} />
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Order Items</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-4">
 {order.items.map(item => (
 <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
 <div className="flex flex-col">
 <Link href={`/admin/products/${item.productId}`} className="font-medium text-primary hover:underline">
 {item.productName}
 </Link>
 <span className="text-sm text-muted-foreground">SKU: {item.sku}</span>
 {item.brandingOption && <span className="text-xs text-muted-foreground">Branding: {item.brandingOption}</span>}
 </div>
 <div className="text-right">
 <div className="font-medium">{formatINR(Number(item.totalPrice))}</div>
 <div className="text-sm text-muted-foreground">{item.quantity} × {formatINR(Number(item.unitPrice))}</div>
 </div>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Audit Log</CardTitle>
 </CardHeader>
 <CardContent>
 {auditLogs.length === 0 ? (
 <div className="text-sm text-muted-foreground">No events recorded.</div>
 ) : (
 <div className="space-y-4">
 {auditLogs.map(log => {
 const metadata = log.metadata as any || {};
 return (
 <div key={log.id} className="text-sm pb-4 border-b last:border-0 last:pb-0">
 <div className="flex justify-between">
 <span className="font-medium text-black dark:text-white">{log.action}</span>
 <span className="text-muted-foreground">{log.createdAt.toLocaleString()}</span>
 </div>
 <p className="text-muted-foreground dark:text-muted-foreground mt-1">
 By: {log.actor?.fullName || log.actor?.email || 'System'}
 </p>
 {metadata.from && metadata.to && (
 <p className="text-xs text-muted-foreground mt-1">
 Status changed: <span className="font-mono">{metadata.from}</span> → <span className="font-mono">{metadata.to}</span>
 </p>
 )}
 {metadata.notes && (
 <p className="text-xs text-muted-foreground mt-1 italic">Notes: {metadata.notes}</p>
 )}
 </div>
 );
 })}
 </div>
 )}
 </CardContent>
 </Card>
 </div>

 <div className="space-y-6">
 <ShippingModule orderId={order.id} initialCourier={order.shippingCourier} initialTracking={order.trackingNumber} />
 <RefundModule orderId={order.id} status={order.status} />

 <Card>
 <CardHeader>
 <CardTitle>Financial Summary</CardTitle>
 </CardHeader>
 <CardContent className="space-y-2">
 <div className="flex justify-between text-sm">
 <span>Subtotal</span>
 <span>{formatINR(Number(order.subtotal))}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span>Shipping</span>
 <span>{formatINR(Number(order.shippingCost))}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span>Tax</span>
 <span>{formatINR(Number(order.tax))}</span>
 </div>
 <div className="flex justify-between text-sm">
 <span>Discount</span>
 <span className="text-green-600">-{formatINR(Number(order.discount))}</span>
 </div>
 <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
 <span>Total</span>
 <span>{formatINR(Number(order.total))}</span>
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Customer Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div>
 <div className="text-sm font-medium">Customer</div>
 <div className="text-sm text-muted-foreground">{order.user.fullName} ({order.user.email})</div>
 </div>
 {order.company && (
 <div>
 <div className="text-sm font-medium">Company</div>
 <div className="text-sm text-muted-foreground">{order.company.name}</div>
 </div>
 )}
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Addresses</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div>
 <div className="text-sm font-medium">Shipping Address</div>
 <div className="text-sm text-muted-foreground whitespace-pre-wrap">
 {order.shippingAddress.fullName}
 {'\n'}{order.shippingAddress.addressLine1}
 {order.shippingAddress.addressLine2 ? `\n${order.shippingAddress.addressLine2}` : ''}
 {'\n'}{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
 {'\n'}{order.shippingAddress.country}
 {'\n'}{order.shippingAddress.phone}
 </div>
 </div>
 <div className="pt-4 border-t">
 <div className="text-sm font-medium">Billing Address</div>
 <div className="text-sm text-muted-foreground whitespace-pre-wrap">
 {order.billingAddress.fullName}
 {'\n'}{order.billingAddress.addressLine1}
 {order.billingAddress.addressLine2 ? `\n${order.billingAddress.addressLine2}` : ''}
 {'\n'}{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
 {'\n'}{order.billingAddress.country}
 {'\n'}{order.billingAddress.phone}
 </div>
 </div>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
}
