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

const data = [
  { month: "Jan", spend: 40000 },
  { month: "Feb", spend: 30000 },
  { month: "Mar", spend: 20000 },
  { month: "Apr", spend: 27800 },
  { month: "May", spend: 18900 },
  { month: "Jun", spend: 23900 },
  { month: "Jul", spend: 34900 },
  { month: "Aug", spend: 45000 },
  { month: "Sep", spend: 85000 },
  { month: "Oct", spend: 125000 },
  { month: "Nov", spend: 95000 },
  { month: "Dec", spend: 140000 },
];

export function SpendAnalyticsChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
            dy={10} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `₹${(value / 1000)}k`} 
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} 
          />
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <Tooltip 
            formatter={(value: any) => [formatINR(Number(value) || 0), "Spend"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
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
