import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, Users, DollarSign, AlertCircle, Clock, TrendingDown, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/currency";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { Badge } from "@/components/ui/badge";

export default async function AdminOverview() {
 const currentYear = new Date().getFullYear();
 const yearStart = new Date(`${currentYear}-01-01T00:00:00.000Z`);
 const yearEnd = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`);
 const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
 const monthStart = new Date(currentYear, new Date().getMonth(), 1);

 // Fetch real aggregated data
 const [
 pendingQuotesCount,
 urgentQuotesCount,
 activeOrdersCount,
 productionOrdersCount,
 totalRevenueAgg,
 corporateClientsCount,
 recentQuotes,
 monthlyOrders,
 monthlyQuotes,
 // Action center data
 expiringQuotes,
 staleQuotes,
 pendingOrders,
 lowStockVariants,
 ] = await Promise.all([
 prisma.quoteRequest.count({ where: { status: 'NEW' } }),
 prisma.quoteRequest.count({ where: { status: 'REVIEWING' } }),
 prisma.order.count({ where: { status: { in: ['PENDING', 'PROCESSING'] } } }),
 prisma.order.count({ where: { status: 'PROCESSING' } }),
 prisma.order.aggregate({ _sum: { total: true }, where: { status: 'DELIVERED', createdAt: { gte: monthStart } } }),
 prisma.company.count({ where: { isActive: true } }),
 // Use explicit select on items to avoid selecting `configuration` column which
 // may not yet exist in the database (pending migration). This prevents P2022 crash.
 prisma.quoteRequest.findMany({
   take: 3,
   orderBy: { createdAt: 'desc' },
   select: {
     id: true,
     companyName: true,
     status: true,
     createdAt: true,
     items: {
       select: {
         id: true,
         quantity: true,
         unitPrice: true,
         totalPrice: true,
         description: true,
       }
     }
   }
 }),
 prisma.order.findMany({
 where: {
 status: 'DELIVERED',
 createdAt: { gte: yearStart, lt: yearEnd },
 },
 select: { createdAt: true, total: true },
 }),
 prisma.quoteRequest.findMany({
 where: { createdAt: { gte: yearStart, lt: yearEnd } },
 select: { createdAt: true },
 }),
 // Quotes expiring within 3 days
 prisma.quoteRequest.count({
 where: {
 status: 'APPROVED',
 expiresAt: { lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), gte: new Date() }
 }
 }),
 // Quotes with no activity for 3+ days (stale)
 prisma.quoteRequest.count({
 where: {
 status: { in: ['NEW', 'REVIEWING', 'CONTACTED'] },
 updatedAt: { lte: threeDaysAgo }
 }
 }),
 // Orders awaiting confirmation
 prisma.order.count({ where: { status: 'PENDING' } }),
 // Low stock variants (under 10)
 prisma.productVariant.count({
 where: { stockQuantity: { lt: 10, gt: 0 }, isActive: true }
 }),
 ]);

 const totalRevenue = totalRevenueAgg._sum.total || 0;

 // Build 12-element array of monthly metrics (Jan=0 -> Dec=11)
 const monthlyMetrics = Array.from({ length: 12 }, (_, i) => ({
 month: new Date(2000, i, 1).toLocaleString('default', { month: 'short' }),
 revenue: 0,
 quotes: 0
 }));

 for (const order of monthlyOrders) {
 const month = new Date(order.createdAt).getMonth();
 monthlyMetrics[month].revenue += Number(order.total ?? 0);
 }

 for (const quote of monthlyQuotes) {
 const month = new Date(quote.createdAt).getMonth();
 monthlyMetrics[month].quotes += 1;
 }

 // Filter to show from Jan up to current month for cleaner chart
 const currentMonth = new Date().getMonth();
 const chartData = monthlyMetrics.slice(0, currentMonth + 1);

 return (
 <div className="space-y-8">
 <div>
 <h1 className="text-3xl font-bold text-foreground">Admin Overview</h1>
 <p className="mt-2 text-muted-foreground">
 Monitor your corporate gifting operations, quotes, and orders.
 </p>
 </div>

 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
 <Card className="border-border shadow-sm">
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-sm font-medium text-muted-foreground">Pending Quotes</CardTitle>
 <FileText className="h-4 w-4 text-muted-foreground" />
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-foreground">{pendingQuotesCount}</div>
 <p className="text-xs text-amber-600 mt-1 font-medium">{urgentQuotesCount} require urgent review</p>
 </CardContent>
 </Card>
 
 <Card className="border-border shadow-sm">
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
 <Package className="h-4 w-4 text-muted-foreground" />
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-foreground">{activeOrdersCount}</div>
 <p className="text-xs text-muted-foreground mt-1">{productionOrdersCount} in production</p>
 </CardContent>
 </Card>

 <Card className="border-border shadow-sm">
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue (MTD)</CardTitle>
 <DollarSign className="h-4 w-4 text-muted-foreground" />
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-foreground">{formatINR(totalRevenue)}</div>
 <p className="text-xs text-green-600 mt-1 font-medium">Tracking via delivered orders</p>
 </CardContent>
 </Card>

 <Card className="border-border shadow-sm">
 <CardHeader className="flex flex-row items-center justify-between pb-2">
 <CardTitle className="text-sm font-medium text-muted-foreground">Corporate Clients</CardTitle>
 <Users className="h-4 w-4 text-muted-foreground" />
 </CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-foreground">{corporateClientsCount}</div>
 <p className="text-xs text-muted-foreground mt-1">Active platforms</p>
 </CardContent>
 </Card>
 </div>

 {/* === Action Center === */}
 {(staleQuotes > 0 || expiringQuotes > 0 || pendingOrders > 0 || lowStockVariants > 0) && (
 <div>
 <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
 <AlertCircle className="h-5 w-5 text-amber-500" />
 Action Center
 </h2>
 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
 {pendingOrders > 0 && (
 <Link href="/admin/orders?status=PENDING" className="group flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors">
 <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
 <div className="flex-1">
 <div className="font-semibold text-amber-900">{pendingOrders} Orders Pending</div>
 <div className="text-xs text-amber-700 mt-0.5">Awaiting confirmation</div>
 </div>
 <ArrowRight className="h-4 w-4 text-amber-400 group-hover:text-amber-600 transition-colors" />
 </Link>
 )}
 {staleQuotes > 0 && (
 <Link href="/admin/quotes?status=NEW" className="group flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
 <FileText className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
 <div className="flex-1">
 <div className="font-semibold text-orange-900">{staleQuotes} Stale Quotes</div>
 <div className="text-xs text-orange-700 mt-0.5">No activity in 3+ days</div>
 </div>
 <ArrowRight className="h-4 w-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
 </Link>
 )}
 {expiringQuotes > 0 && (
 <Link href="/admin/quotes?status=APPROVED" className="group flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
 <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
 <div className="flex-1">
 <div className="font-semibold text-red-900">{expiringQuotes} Expiring Soon</div>
 <div className="text-xs text-red-700 mt-0.5">Approved quotes expiring in 3 days</div>
 </div>
 <ArrowRight className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
 </Link>
 )}
 {lowStockVariants > 0 && (
 <Link href="/admin/inventory" className="group flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
 <TrendingDown className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
 <div className="flex-1">
 <div className="font-semibold text-blue-900">{lowStockVariants} Low Stock</div>
 <div className="text-xs text-blue-700 mt-0.5">Variants under 10 units</div>
 </div>
 <ArrowRight className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
 </Link>
 )}
 </div>
 </div>
 )}

 <Card className="border-border shadow-sm mt-6">
 <CardHeader>
 <CardTitle className="text-foreground">Revenue & Quote Trends</CardTitle>
 </CardHeader>
 <CardContent>
 <RevenueChart data={chartData} />
 </CardContent>
 </Card>

 <div className="grid gap-6 md:grid-cols-2 mt-6">
 <Card className="border-border shadow-sm">
 <CardHeader>
 <CardTitle className="text-foreground">Recent Quotes</CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-4">
 {recentQuotes.length === 0 ? (
 <div className="text-center p-4 text-sm text-muted-foreground">No recent quotes</div>
 ) : (
 recentQuotes.map((quote) => {
 const itemsCount = quote.items.reduce((acc, item) => acc + item.quantity, 0);
 return (
 <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg bg-background">
 <div>
 <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-sm text-blue-600 hover:underline">
 QR-{quote.id.substring(0, 8)}
 </Link>
 <p className="text-xs text-muted-foreground">{quote.companyName} • {itemsCount} items</p>
 </div>
 <div className="text-sm font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded">
 {quote.status}
 </div>
 </div>
 );
 })
 )}
 </div>
 <Link 
 href="/admin/quotes" 
 className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-border bg-background hover:bg-muted hover:text-foreground h-10 px-4 py-2 w-full mt-6"
 >
 View All Quotes
 </Link>
 </CardContent>
 </Card>

 <Card className="border-border shadow-sm">
 <CardHeader>
 <CardTitle className="text-foreground">Quick Links</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <Link href="/admin/products/new" className="flex items-center p-4 border rounded-lg hover:bg-secondary/20 transition-colors bg-background">
 <Package className="h-8 w-8 text-blue-600 p-1.5 bg-blue-50 rounded mr-4" />
 <div>
 <p className="font-medium text-foreground">Add New Product</p>
 <p className="text-sm text-muted-foreground">Create a new corporate gift listing</p>
 </div>
 </Link>
 <Link href="/admin/customers" className="flex items-center p-4 border rounded-lg hover:bg-secondary/20 transition-colors bg-background">
 <Users className="h-8 w-8 text-indigo-600 p-1.5 bg-indigo-50 rounded mr-4" />
 <div>
 <p className="font-medium text-foreground">Manage Clients</p>
 <p className="text-sm text-muted-foreground">View corporate accounts and users</p>
 </div>
 </Link>
 </CardContent>
 </Card>
 </div>
 </div>
 );
}
