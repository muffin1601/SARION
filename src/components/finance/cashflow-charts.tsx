"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CashflowPoint } from "@/server/data/finance";

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: n >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 0,
  }).format(n);
}

const tooltipStyle = {
  fontSize: 12,
  borderRadius: 8,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--popover))",
  color: "hsl(var(--popover-foreground))",
};

export function CashflowCharts({ points }: { points: CashflowPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Cashflow Timeline</CardTitle>
      </CardHeader>
      <CardContent className="h-72 pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={points} margin={{ left: 8, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={money} width={56} />
            <Tooltip formatter={(v) => money(Number(v))} contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--accent))" }} />
            <Bar dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]} className="fill-primary" />
            <Bar dataKey="outstanding" name="Outstanding" radius={[4, 4, 0, 0]} className="fill-amber-500" />
            <Line dataKey="collections" name="Collections" type="linear" className="stroke-emerald-500" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <ul className="mt-2 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" /> Revenue
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Outstanding
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Collections
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
