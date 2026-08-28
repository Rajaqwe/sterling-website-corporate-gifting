"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatINR } from "@/lib/currency";

interface RevenueChartProps {
  data: { month: string; revenue: number; quotes: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis 
            tickFormatter={(val) => `₹${(val / 1000)}k`} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }} 
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
          <Tooltip 
            formatter={(value: any, name: any) => [
              name === 'revenue' ? formatINR(Number(value) || 0) : value, 
              name === 'revenue' ? 'Revenue' : 'Quotes'
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
