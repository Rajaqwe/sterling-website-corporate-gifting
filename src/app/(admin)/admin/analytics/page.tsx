import { prisma } from "@/lib/prisma/client";
import { requirePermission } from "@/lib/auth/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatINR } from "@/lib/currency";
import { BarChart3, TrendingUp, Users, ShoppingBag, FileText, Package } from "lucide-react";

export default async function AdminAnalyticsPage() {
 await requirePermission('analytics.read');

 const now = new Date();
 const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
 const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

 const [
 // Sales
 totalRevenue,
 revenue30d,
 revenue7d,
 // Orders
 totalOrders,
 orders30d,
 cancelledOrders,
 // Quotes
 totalQuotes,
 quotes30d,
 convertedQuotes,
 // Customers
 totalCustomers,
 newCustomers30d,
 activeCompanies,
 // Products
 totalProducts,
 topProducts,
 lowStockCount,
 ] = await Promise.all([
 prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ['DELIVERED'] } } }),
 prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ['DELIVERED'] }, createdAt: { gte: thirtyDaysAgo } } }),
 prisma.order.aggregate({ _sum: { total: true }, where: { status: { in: ['DELIVERED'] }, createdAt: { gte: sevenDaysAgo } } }),
 prisma.order.count(),
 prisma.order.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
 prisma.order.count({ where: { status: 'CANCELLED' } }),
 prisma.quoteRequest.count(),
 prisma.quoteRequest.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
 prisma.quoteRequest.count({ where: { status: 'COMPLETED' } }),
 prisma.user.count({ where: { role: 'CUSTOMER' } }),
 prisma.user.count({ where: { role: 'CUSTOMER', createdAt: { gte: thirtyDaysAgo } } }),
 prisma.company.count({ where: { isActive: true } }),
 prisma.product.count({ where: { status: 'ACTIVE' } }),
 prisma.orderItem.groupBy({
 by: ['productId', 'productName'],
 _sum: { quantity: true, totalPrice: true },
 orderBy: { _sum: { totalPrice: 'desc' } },
 take: 5
 }),
 prisma.productVariant.count({ where: { stockQuantity: { lt: 10, gt: 0 }, isActive: true } }),
 ]);

 const conversionRate = totalQuotes > 0 ? ((convertedQuotes / totalQuotes) * 100).toFixed(1) : '0';

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
 <p className="text-muted-foreground mt-1">Business performance overview</p>
 </div>

 {/* Revenue */}
 <div>
 <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /> Revenue</h2>
 <div className="grid gap-4 md:grid-cols-3">
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">All Time Revenue</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{formatINR(Number(totalRevenue._sum?.total || 0))}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Last 30 Days</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{formatINR(Number(revenue30d._sum?.total || 0))}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Last 7 Days</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{formatINR(Number(revenue7d._sum?.total || 0))}</div></CardContent>
 </Card>
 </div>
 </div>

 {/* Orders */}
 <div>
 <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><ShoppingBag className="h-5 w-5 text-blue-600" /> Orders</h2>
 <div className="grid gap-4 md:grid-cols-3">
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Orders</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{totalOrders}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Last 30 Days</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{orders30d}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Cancelled</CardTitle></CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-red-600">{cancelledOrders}</div>
 <p className="text-xs text-muted-foreground mt-1">{totalOrders > 0 ? ((cancelledOrders / totalOrders) * 100).toFixed(1) : 0}% cancellation rate</p>
 </CardContent>
 </Card>
 </div>
 </div>

 {/* Quotes */}
 <div>
 <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><FileText className="h-5 w-5 text-amber-600" /> Quotes</h2>
 <div className="grid gap-4 md:grid-cols-3">
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Quotes</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{totalQuotes}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Last 30 Days</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{quotes30d}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Conversion Rate</CardTitle></CardHeader>
 <CardContent>
 <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
 <p className="text-xs text-muted-foreground mt-1">{convertedQuotes} converted</p>
 </CardContent>
 </Card>
 </div>
 </div>

 {/* Customers */}
 <div>
 <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Users className="h-5 w-5 text-purple-600" /> Customers</h2>
 <div className="grid gap-4 md:grid-cols-3">
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Customers</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{totalCustomers}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">New (30 days)</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{newCustomers30d}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Companies</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{activeCompanies}</div></CardContent>
 </Card>
 </div>
 </div>

 {/* Products */}
 <div>
 <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><Package className="h-5 w-5 text-indigo-600" /> Products</h2>
 <div className="grid gap-4 md:grid-cols-3">
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Active Products</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold">{totalProducts}</div></CardContent>
 </Card>
 <Card>
 <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Low Stock Variants</CardTitle></CardHeader>
 <CardContent><div className="text-2xl font-bold text-amber-600">{lowStockCount}</div></CardContent>
 </Card>
 </div>
 </div>

 {/* Top Products */}
 {topProducts.length > 0 && (
 <Card>
 <CardHeader>
 <CardTitle className="flex items-center gap-2">
 <BarChart3 className="h-5 w-5" /> Top Products by Revenue
 </CardTitle>
 </CardHeader>
 <CardContent>
 <div className="space-y-3">
 {topProducts.map((product, i) => (
 <div key={product.productId || i} className="flex items-center justify-between py-2 border-b last:border-0">
 <div>
 <span className="font-medium text-foreground">{product.productName || 'Unknown'}</span>
 <span className="text-xs text-muted-foreground ml-2">{product._sum.quantity} units sold</span>
 </div>
 <span className="font-bold">{formatINR(Number(product._sum.totalPrice || 0))}</span>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 )}
 </div>
 );
}
