import Link from "next/link";
import { CircleDollarSign, FileClock, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FinanceSnapshot } from "@/server/data/finance";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function FinanceWidget({ snapshot }: { snapshot: FinanceSnapshot }) {
  const items = [
    { label: "Revenue", value: snapshot.revenue, icon: TrendingUp },
    { label: "Profit", value: snapshot.profit, icon: CircleDollarSign },
    { label: "Outstanding", value: snapshot.outstanding, icon: FileClock },
  ];

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Finance</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/finance">View Finance</Link>
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border p-3 text-center">
            <item.icon className="mx-auto h-4 w-4 text-muted-foreground" />
            <p className="mt-1 text-lg font-bold tabular-nums">{money(item.value)}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
