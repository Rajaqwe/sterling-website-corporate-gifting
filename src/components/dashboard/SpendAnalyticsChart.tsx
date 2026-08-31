"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { formatINR } from "@/lib/currency";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface SpendAnalyticsChartProps {
  /** Array of 12 numbers — one per month (Jan–Dec) — in INR */
  monthlySpend: number[];
}

export function SpendAnalyticsChart({ monthlySpend }: SpendAnalyticsChartProps) {
  const data = MONTH_LABELS.map((month, i) => ({
    month,
    spend: monthlySpend[i] ?? 0,
  }));

  const hasData = data.some((d) => d.spend > 0);

  if (!hasData) {
    return (
      <div className="h-[220px] w-full flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
        <svg className="h-10 w-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-sm font-medium">No orders placed yet</p>
        <p className="text-xs">Your spend history will appear here once you place an order.</p>
      </div>
    );
  }

  const totalSpend = data.reduce((sum, d) => sum + d.spend, 0);

  return (
    <div 
      className="h-[280px] w-full mt-2"
      role="img"
      aria-label={`Monthly spend chart showing a total of ${formatINR(totalSpend)} spent over the last 12 months.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="hsl(var(--accent))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v >= 1000 ? `${v / 1000}k` : v}`}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            width={52}
          />
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Tooltip
            formatter={(value: any) => [formatINR(Number(value) || 0), "Spend"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
            }}
          />
          <Area
            type="monotone"
            dataKey="spend"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSpend)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
