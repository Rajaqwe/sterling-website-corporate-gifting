import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, Clock, CheckCircle } from "lucide-react";
import { formatINR } from "@/lib/currency";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { redirect } from "next/navigation";
import { SpendAnalyticsChart } from "@/components/dashboard/SpendAnalyticsChart";

export default async function DashboardOverview() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch actual counts from DB
  const [pendingOrders, completedOrders] = await Promise.all([
    prisma.order.count({ where: { userId: user.id, status: { in: ['PENDING', 'PROCESSING', 'SHIPPED'] } } }),
    prisma.order.count({ where: { userId: user.id, status: 'DELIVERED' } })
  ]);

  const quotesCount = await prisma.quoteRequest.count({ where: { userId: user.id } });
  
  // Aggregate total spend
  const totalSpendAgg = await prisma.order.aggregate({
    where: { userId: user.id },
    _sum: { total: true }
  });
  const totalSpend = totalSpendAgg._sum.total ? Number(totalSpendAgg._sum.total) : 0;

  // Recent Quotes
  const recentQuotes = await prisma.quoteRequest.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back to the Sterling Corporate Portal. Here is an overview of your activity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stat Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quotes Requested</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{quotesCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime quotes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{completedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatINR(totalSpend)}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Quotes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentQuotes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">You have no recent quotes.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">QR-{quote.id.substring(0, 8)}</p>
                      <p className="text-xs text-muted-foreground">Requested on {new Date(quote.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm font-medium px-2 py-1 bg-secondary rounded text-secondary-foreground">
                      {quote.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link href="/dashboard/quotes" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full mt-6">
              View All Quotes
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/corporate-gifts" className="flex items-center p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
              <Package className="h-8 w-8 text-primary p-1.5 bg-primary/10 rounded mr-4" />
              <div>
                <p className="font-medium">Browse Catalog</p>
                <p className="text-sm text-muted-foreground">Find new corporate gifts</p>
              </div>
            </Link>
            <Link href="/request-a-quote" className="flex items-center p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
              <FileText className="h-8 w-8 text-primary p-1.5 bg-primary/10 rounded mr-4" />
              <div>
                <p className="font-medium">Request a Custom Quote</p>
                <p className="text-sm text-muted-foreground">Have a specific requirement?</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Spend Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Spend Analytics</CardTitle>
          <p className="text-sm text-muted-foreground">Your corporate gifting expenditure over the last 12 months.</p>
        </CardHeader>
        <CardContent>
          <SpendAnalyticsChart />
        </CardContent>
      </Card>
    </div>
  );
}
