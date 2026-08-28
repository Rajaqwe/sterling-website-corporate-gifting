import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, Users, DollarSign } from "lucide-react";
import { formatINR } from "@/lib/currency";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { RevenueChart } from "@/components/admin/RevenueChart";

export default async function AdminOverview() {
  // Fetch real aggregated data
  const [
    pendingQuotesCount,
    urgentQuotesCount,
    activeOrdersCount,
    productionOrdersCount,
    totalRevenueAgg,
    corporateClientsCount,
    recentQuotes
  ] = await Promise.all([
    prisma.quoteRequest.count({ where: { status: 'NEW' } }),
    prisma.quoteRequest.count({ where: { status: 'REVIEWING' } }),
    prisma.order.count({ where: { status: { in: ['PENDING', 'PROCESSING'] } } }),
    prisma.order.count({ where: { status: 'PROCESSING' } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: 'DELIVERED' } }),
    prisma.company.count({ where: { isActive: true } }),
    prisma.quoteRequest.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    })
  ]);

  const totalRevenue = totalRevenueAgg._sum.total || 0;

  // Mock data for the chart, in a real app we'd group by month using raw SQL or JS grouping
  const chartData = [
    { month: "Jan", revenue: 45000, quotes: 12 },
    { month: "Feb", revenue: 52000, quotes: 15 },
    { month: "Mar", revenue: Number(totalRevenue) > 0 ? Number(totalRevenue) * 0.8 : 38000, quotes: 10 },
    { month: "Apr", revenue: Number(totalRevenue) > 0 ? Number(totalRevenue) : 85000, quotes: 24 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Overview</h1>
        <p className="mt-2 text-slate-500">
          Monitor your corporate gifting operations, quotes, and orders.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pending Quotes</CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingQuotesCount}</div>
            <p className="text-xs text-amber-600 mt-1 font-medium">{urgentQuotesCount} require urgent review</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{activeOrdersCount}</div>
            <p className="text-xs text-slate-500 mt-1">{productionOrdersCount} in production</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Revenue (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatINR(totalRevenue)}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">Tracking via delivered orders</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Corporate Clients</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{corporateClientsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Active platforms</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm mt-6">
        <CardHeader>
          <CardTitle className="text-slate-900">Revenue & Quote Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={chartData} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuotes.length === 0 ? (
                <div className="text-center p-4 text-sm text-slate-500">No recent quotes</div>
              ) : (
                recentQuotes.map((quote) => {
                  const itemsCount = quote.items.reduce((acc, item) => acc + item.quantity, 0);
                  return (
                    <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div>
                        <Link href={`/admin/quotes/${quote.id}`} className="font-medium text-sm text-blue-600 hover:underline">
                          QR-{quote.id.substring(0, 8)}
                        </Link>
                        <p className="text-xs text-slate-500">{quote.companyName} • {itemsCount} items</p>
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
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-10 px-4 py-2 w-full mt-6"
            >
              View All Quotes
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/products/new" className="flex items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors bg-white">
              <Package className="h-8 w-8 text-blue-600 p-1.5 bg-blue-50 rounded mr-4" />
              <div>
                <p className="font-medium text-slate-900">Add New Product</p>
                <p className="text-sm text-slate-500">Create a new corporate gift listing</p>
              </div>
            </Link>
            <Link href="/admin/customers" className="flex items-center p-4 border rounded-lg hover:bg-slate-50 transition-colors bg-white">
              <Users className="h-8 w-8 text-indigo-600 p-1.5 bg-indigo-50 rounded mr-4" />
              <div>
                <p className="font-medium text-slate-900">Manage Clients</p>
                <p className="text-sm text-slate-500">View corporate accounts and users</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
