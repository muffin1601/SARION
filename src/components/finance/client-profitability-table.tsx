import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ClientProfitability } from "@/server/data/finance";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function marginVariant(margin: number) {
  if (margin >= 40) return "success" as const;
  if (margin >= 15) return "warning" as const;
  return "destructive" as const;
}

function healthVariant(score: number) {
  if (score >= 80) return "success" as const;
  if (score >= 60) return "warning" as const;
  return "destructive" as const;
}

export function ClientProfitabilityTable({ clients }: { clients: ClientProfitability[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Client Profitability</CardTitle>
      </CardHeader>
      <CardContent>
        {clients.length === 0 ? (
          <EmptyState title="No profitability data yet" description="Log costs and paid invoices to see client profit here." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Costs</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead className="text-right">Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <Link href={`/clients/${client.id}`} className="hover:underline">
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{money(client.revenue)}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">{money(client.costs)}</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{money(client.profit)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={marginVariant(client.marginPercent)}>{client.marginPercent.toFixed(0)}%</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{client.projectCount}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">{money(client.outstanding)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={healthVariant(client.healthScore)}>{client.healthScore}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
