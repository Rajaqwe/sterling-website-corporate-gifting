import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CustomerActions } from "./CustomerActions";
import { formatINR } from "@/lib/currency";

export default async function CustomerDetailPage(props: { params: Promise<{ id: string }> }) {
  await requirePermission('customers.read');
 const params = await props.params;
 const id = params.id;

 const user = await prisma.user.findUnique({
 where: { id },
 include: {
 companyMembers: { include: { company: true } },
 addresses: true,
 orders: {
 orderBy: { createdAt: 'desc' },
 take: 5
 },
 quotes: {
 orderBy: { createdAt: 'desc' },
 take: 5
 },
 invoices: {
 orderBy: { createdAt: 'desc' },
 take: 5
 },
 auditLogs: {
 orderBy: { createdAt: 'desc' },
 take: 10
 }
 }
 });

 if (!user) {
 notFound();
 }

 return (
 <div className="max-w-5xl mx-auto space-y-6 pb-10">
 <div className="flex items-center gap-4">
 <Link href="/admin/customers" className="text-muted-foreground hover:text-black dark:hover:text-white transition">
 <ArrowLeft className="w-5 h-5" />
 </Link>
 <h1 className="text-3xl font-bold tracking-tight">Customer Profile</h1>
 <Badge variant={user.isActive ? 'default' : 'destructive'} className={user.isActive ? "bg-green-100 text-green-800" : ""}>
 {user.isActive ? 'Active' : 'Inactive'}
 </Badge>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Contact Info</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4 text-sm">
 <div>
 <div className="font-medium text-muted-foreground">Name</div>
 <div>{user.fullName || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Email</div>
 <div>{user.email} {user.emailVerified && <Badge variant="outline" className="ml-2 text-xs">Verified</Badge>}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Phone</div>
 <div>{user.phone || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Joined</div>
 <div>{user.createdAt.toLocaleDateString()}</div>
 </div>

 <div className="pt-4 border-t">
 <div className="font-medium text-muted-foreground mb-2">Actions</div>
 <CustomerActions userId={user.id} isActive={user.isActive} fullName={user.fullName} phone={user.phone} />
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Companies</CardTitle>
 </CardHeader>
 <CardContent className="text-sm space-y-3">
 {user.companyMembers.length === 0 ? (
 <div className="text-muted-foreground italic">No companies attached.</div>
 ) : (
 user.companyMembers.map(cm => (
 <div key={cm.id} className="flex flex-col border-b pb-2 last:border-0 last:pb-0">
 <span className="font-medium">{cm.company.name}</span>
 <span className="text-xs text-muted-foreground">Role: {cm.role}</span>
 </div>
 ))
 )}
 </CardContent>
 </Card>
 </div>

 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Recent Orders</CardTitle>
 </CardHeader>
 <CardContent>
 {user.orders.length === 0 ? (
 <div className="text-muted-foreground text-sm">No orders placed.</div>
 ) : (
 <div className="space-y-3">
 {user.orders.map(order => (
 <div key={order.id} className="flex items-center justify-between p-3 border rounded-md">
 <div>
 <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline flex items-center gap-1">
 {order.orderNumber || order.id.substring(0,8)}
 </Link>
 <div className="text-xs text-muted-foreground">{order.createdAt.toLocaleDateString()}</div>
 </div>
 <div className="text-right">
 <div className="font-medium">{formatINR(Number(order.total))}</div>
 <Badge variant="outline">{order.status}</Badge>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Recent Quotes</CardTitle>
 </CardHeader>
 <CardContent>
 {user.quotes.length === 0 ? (
 <div className="text-muted-foreground text-sm">No quotes requested.</div>
 ) : (
 <div className="space-y-3">
 {user.quotes.map(quote => (
 <div key={quote.id} className="flex items-center justify-between p-3 border rounded-md">
 <div>
 <div className="font-medium">
 {quote.quoteNumber || quote.id.substring(0,8)}
 </div>
 <div className="text-xs text-muted-foreground">{quote.createdAt.toLocaleDateString()}</div>
 </div>
 <div className="text-right">
 <Badge variant="outline">{quote.status}</Badge>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Recent Invoices</CardTitle>
 </CardHeader>
 <CardContent>
 {user.invoices.length === 0 ? (
 <div className="text-muted-foreground text-sm">No invoices found.</div>
 ) : (
 <div className="space-y-3">
 {user.invoices.map(invoice => (
 <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-md">
 <div>
 <Link href={`/admin/orders/${invoice.orderId}`} className="font-medium text-primary hover:underline flex items-center gap-1">
 {invoice.invoiceNumber || invoice.id.substring(0,8)}
 </Link>
 <div className="text-xs text-muted-foreground">{invoice.createdAt.toLocaleDateString()}</div>
 </div>
 <div className="text-right">
 <div className="font-medium">{formatINR(Number(invoice.total))}</div>
 <Badge variant="outline">{invoice.status}</Badge>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Recent Activity</CardTitle>
 </CardHeader>
 <CardContent>
 {user.auditLogs.length === 0 ? (
 <div className="text-muted-foreground text-sm">No recent activity.</div>
 ) : (
 <div className="space-y-3">
 {user.auditLogs.map(log => (
 <div key={log.id} className="flex flex-col border-b pb-2 last:border-0 last:pb-0">
 <span className="font-medium text-sm">{log.action}</span>
 <span className="text-xs text-muted-foreground">{log.createdAt.toLocaleString()}</span>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 
 <div className="md:col-span-3 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Addresses</CardTitle>
 </CardHeader>
 <CardContent>
 {user.addresses.length === 0 ? (
 <div className="text-muted-foreground text-sm">No addresses found.</div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {user.addresses.map(address => (
 <div key={address.id} className="p-3 border rounded-md">
 <div className="font-medium text-sm flex items-center justify-between">
 {address.label || address.type}
 {address.isDefault && <Badge variant="secondary" className="text-[10px]">Default</Badge>}
 </div>
 <div className="text-xs text-muted-foreground mt-2 space-y-1">
 <div>{address.fullName}</div>
 <div>{address.addressLine1}</div>
 {address.addressLine2 && <div>{address.addressLine2}</div>}
 <div>{address.city}, {address.state} {address.postalCode}</div>
 <div>{address.country}</div>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
}
