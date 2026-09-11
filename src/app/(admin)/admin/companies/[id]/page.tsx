import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CompanyActions } from "./CompanyActions";
import { formatINR } from "@/lib/currency";

export default async function CompanyDetailPage(props: { params: Promise<{ id: string }> }) {
  await requirePermission('companies.read');
 const params = await props.params;
 const id = params.id;

 const [company, auditLogs] = await Promise.all([
 prisma.company.findUnique({
 where: { id },
 include: {
 members: { include: { user: true } },
 companyInvitations: true,
 invoices: {
 orderBy: { createdAt: 'desc' },
 take: 5
 },
 orders: {
 orderBy: { createdAt: 'desc' },
 take: 5
 }
 }
 }),
 prisma.auditLog.findMany({
 where: { resource: 'Company', resourceId: id },
 orderBy: { createdAt: 'desc' },
 take: 10
 })
 ]);

 if (!company) {
 notFound();
 }

 return (
 <div className="max-w-5xl mx-auto space-y-6 pb-10">
 <div className="flex items-center gap-4">
 <Link href="/admin/companies" className="text-muted-foreground hover:text-black dark:hover:text-white transition">
 <ArrowLeft className="w-5 h-5" />
 </Link>
 <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
 <Badge variant={company.isActive ? 'default' : 'destructive'} className={company.isActive ? "bg-green-100 text-green-800" : ""}>
 {company.isActive ? 'Active' : 'Inactive'}
 </Badge>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Company Details</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4 text-sm">
 <div>
 <div className="font-medium text-muted-foreground">Industry</div>
 <div>{company.industry || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Size</div>
 <div>{company.size || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Website</div>
 <div>{company.website || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Email</div>
 <div>{company.email || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Phone</div>
 <div>{company.phone || 'N/A'}</div>
 </div>
 <div>
 <div className="font-medium text-muted-foreground">Tax/GST No.</div>
 <div>{company.gstNumber || 'N/A'}</div>
 </div>

 <div className="pt-4 border-t">
 <div className="font-medium text-muted-foreground mb-2">Actions</div>
 <CompanyActions companyId={company.id} isActive={company.isActive} companyData={company} />
 </div>
 </CardContent>
 </Card>
 </div>

 <div className="md:col-span-2 space-y-6">
 <Card>
 <CardHeader>
 <CardTitle>Company Members</CardTitle>
 </CardHeader>
 <CardContent>
 {company.members.length === 0 ? (
 <div className="text-muted-foreground text-sm">No members attached.</div>
 ) : (
 <div className="space-y-3">
 {company.members.map(member => (
 <div key={member.id} className="flex items-center justify-between p-3 border rounded-md">
 <div>
 <Link href={`/admin/customers/${member.userId}`} className="font-medium text-primary hover:underline">
 {member.user.fullName || member.user.email}
 </Link>
 <div className="text-xs text-muted-foreground">{member.user.email}</div>
 </div>
 <div className="text-right">
 <Badge variant="outline">{member.role}</Badge>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Recent Orders</CardTitle>
 </CardHeader>
 <CardContent>
 {company.orders.length === 0 ? (
 <div className="text-muted-foreground text-sm">No orders placed.</div>
 ) : (
 <div className="space-y-3">
 {company.orders.map(order => (
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
 <CardTitle>Pending Invitations</CardTitle>
 </CardHeader>
 <CardContent>
 {company.companyInvitations.filter(i => i.status === 'PENDING').length === 0 ? (
 <div className="text-muted-foreground text-sm">No pending invitations.</div>
 ) : (
 <div className="space-y-3">
 {company.companyInvitations.filter(i => i.status === 'PENDING').map(inv => (
 <div key={inv.id} className="flex items-center justify-between p-3 border rounded-md">
 <div>
 <div className="font-medium text-primary">{inv.email}</div>
 <div className="text-xs text-muted-foreground">Sent on {inv.createdAt.toLocaleDateString()}</div>
 </div>
 <Badge variant="outline">{inv.role}</Badge>
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
 {company.invoices.length === 0 ? (
 <div className="text-muted-foreground text-sm">No invoices found.</div>
 ) : (
 <div className="space-y-3">
 {company.invoices.map(invoice => (
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
 {auditLogs.length === 0 ? (
 <div className="text-muted-foreground text-sm">No recent activity.</div>
 ) : (
 <div className="space-y-3">
 {auditLogs.map(log => (
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
 </div>
 </div>
 );
}
