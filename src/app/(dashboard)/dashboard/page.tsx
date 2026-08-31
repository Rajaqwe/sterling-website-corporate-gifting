import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FileText, Clock, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/currency";
import Link from "next/link";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { SpendAnalyticsChart } from "@/components/dashboard/SpendAnalyticsChart";
import { getStatusStyles } from "@/components/admin/StatusBadge";

export default async function DashboardOverview() {
  const auth = await requireUser();
  const user = auth.user;

  // Fetch all stats in parallel
  const currentYear = new Date().getFullYear();
  const yearStart = new Date(`${currentYear}-01-01T00:00:00.000Z`);
  const yearEnd = new Date(`${currentYear + 1}-01-01T00:00:00.000Z`);

  const [pendingOrders, completedOrders, quotesCount, totalSpendAgg, recentQuotes, dbUser, monthlyOrders] =
    await Promise.all([
      prisma.order.count({
        where: { userId: user.id, status: { in: ["PENDING", "PROCESSING", "SHIPPED"] } },
      }),
      prisma.order.count({ where: { userId: user.id, status: "DELIVERED" } }),
      prisma.quoteRequest.count({ where: { userId: user.id } }),
      prisma.order.aggregate({ where: { userId: user.id }, _sum: { total: true } }),
      prisma.quoteRequest.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.user.findUnique({ where: { id: user.id }, select: { fullName: true } }),
      // Fetch orders this year to build monthly spend breakdown
      prisma.order.findMany({
        where: {
          userId: user.id,
          createdAt: { gte: yearStart, lt: yearEnd },
        },
        select: { createdAt: true, total: true },
      }),
    ]);

  const totalSpend = totalSpendAgg._sum.total ? Number(totalSpendAgg._sum.total) : 0;
  const firstName = dbUser?.fullName?.split(" ")[0] || "there";

  // Build 12-element array of monthly spend (Jan=0 … Dec=11)
  const monthlySpend = Array<number>(12).fill(0);
  for (const order of monthlyOrders) {
    const month = new Date(order.createdAt).getMonth(); // 0-indexed
    monthlySpend[month] += Number(order.total ?? 0);
  }

  const stats = [
    {
      title: "Quotes Requested",
      value: quotesCount,
      sub: "Lifetime total",
      icon: FileText,
      href: "/dashboard/quotes",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      sub: "Currently in progress",
      icon: Clock,
      href: "/dashboard/orders",
    },
    {
      title: "Completed Orders",
      value: completedOrders,
      sub: "Successfully delivered",
      icon: CheckCircle,
      href: "/dashboard/orders",
    },
    {
      title: "Total Spend",
      value: formatINR(totalSpend),
      sub: "Lifetime value",
      icon: TrendingUp,
      href: "/dashboard/orders",
    },
  ];



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            Welcome back, {firstName} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s an overview of your Sterling Corporate Portal activity.
          </p>
        </div>
        <Link
          href="/request-a-quote"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors self-start"
        >
          <FileText className="h-4 w-4" />
          Request a Quote
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="group block">
            <Card className="hover:shadow-md transition-shadow duration-200 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
                  {stat.title}
                </CardTitle>
                <div className="rounded-md bg-primary/10 p-1.5 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-2xl font-bold text-primary truncate">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Quotes + Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Quotes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Quotes</CardTitle>
            <Link
              href="/dashboard/quotes"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent>
            {recentQuotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FileText className="h-9 w-9 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">No quotes yet.</p>
                <Link
                  href="/request-a-quote"
                  className="mt-3 text-sm text-primary hover:underline"
                >
                  Request your first quote →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">
                        QR-{quote.id.substring(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(quote.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-1 rounded-full border ${getStatusStyles(quote.status)}`}
                    >
                      {quote.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href="/corporate-gifts"
              className="flex items-center gap-4 rounded-lg border p-4 hover:bg-secondary/40 transition-colors group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm">Browse Catalog</p>
                <p className="text-xs text-muted-foreground truncate">
                  Explore corporate gifting options
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/request-a-quote"
              className="flex items-center gap-4 rounded-lg border p-4 hover:bg-secondary/40 transition-colors group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm">Request a Custom Quote</p>
                <p className="text-xs text-muted-foreground truncate">
                  Have a specific bulk requirement?
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-4 rounded-lg border p-4 hover:bg-secondary/40 transition-colors group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm">Update Your Profile</p>
                <p className="text-xs text-muted-foreground truncate">
                  Add your phone number &amp; name
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Spend Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Spend Analytics</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Your corporate gifting expenditure over the last 12 months.
              </p>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <SpendAnalyticsChart monthlySpend={monthlySpend} />
        </CardContent>
      </Card>
    </div>
  );
}
