import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatINR } from "@/lib/currency";
import { CreditCard } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
 PAID: "bg-green-100 text-green-800",
 PENDING: "bg-amber-100 text-amber-800",
 FAILED: "bg-red-100 text-red-800",
 CANCELLED: "bg-muted text-muted-foreground",
 REFUNDED: "bg-purple-100 text-purple-800",
 PARTIALLY_REFUNDED: "bg-blue-100 text-blue-800",
};

export default async function AdminPaymentsPage() {
 await requirePermission('payments.read');

 const payments = await prisma.payment.findMany({
 orderBy: { createdAt: 'desc' },
 take: 100,
 include: {
 order: {
 select: {
 id: true,
 orderNumber: true,
 user: { select: { fullName: true, email: true } },
 company: { select: { name: true } }
 }
 }
 }
 });

 const totalPaid = payments
 .filter(p => p.status === 'PAID')
 .reduce((sum, p) => sum + Number(p.amount), 0);

 const totalPending = payments
 .filter(p => p.status === 'PENDING')
 .reduce((sum, p) => sum + Number(p.amount), 0);

 const totalFailed = payments.filter(p => p.status === 'FAILED').length;

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
 <p className="text-muted-foreground mt-1">Payment reconciliation ledger</p>
 </div>

 <div className="grid gap-4 md:grid-cols-3">
 <Card className="border-green-200 bg-green-50">
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium text-green-700">Total Collected</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-green-900">{formatINR(totalPaid)}</div>
 </CardContent>
 </Card>
 <Card className="border-amber-200 bg-amber-50">
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium text-amber-700">Pending</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-amber-900">{formatINR(totalPending)}</div>
 </CardContent>
 </Card>
 <Card className="border-red-200 bg-red-50">
 <CardHeader className="pb-2">
 <CardTitle className="text-sm font-medium text-red-700">Failed Payments</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-red-900">{totalFailed}</div>
 </CardContent>
 </Card>
 </div>

 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <CreditCard className="h-5 w-5" />
 Payment Ledger
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="rounded-md border overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-secondary/20 border-b">
 <tr>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Order</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Provider</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Provider ID</th>
 <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
 <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
 <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
 </tr>
 </thead>
 <tbody className="divide-y">
 {payments.length === 0 && (
 <tr>
 <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No payments found.</td>
 </tr>
 )}
 {payments.map(payment => (
 <tr key={payment.id} className="hover:bg-secondary/20">
 <td className="px-4 py-3">
 <Link href={`/admin/orders/${payment.orderId}`} className="font-medium text-primary hover:underline">
 {payment.order.orderNumber || payment.orderId.substring(0, 8)}
 </Link>
 </td>
 <td className="px-4 py-3">
 <div className="font-medium text-foreground">{payment.order.user?.fullName || payment.order.user?.email}</div>
 {payment.order.company && (
 <div className="text-xs text-muted-foreground">{payment.order.company.name}</div>
 )}
 </td>
 <td className="px-4 py-3 text-muted-foreground">{payment.provider}</td>
 <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
 {payment.providerPaymentId ? payment.providerPaymentId.substring(0, 20) + '...' : '—'}
 </td>
 <td className="px-4 py-3 text-right font-medium">{formatINR(Number(payment.amount))}</td>
 <td className="px-4 py-3 text-center">
 <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[payment.status] || 'bg-muted text-muted-foreground'}`}>
 {payment.status}
 </span>
 </td>
 <td className="px-4 py-3 text-muted-foreground text-xs">
 {payment.createdAt.toLocaleDateString()}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 </div>
 );
}
