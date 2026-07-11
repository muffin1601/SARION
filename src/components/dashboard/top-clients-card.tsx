import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import type { TopClient } from "@/server/data/dashboard";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
}

function healthVariant(score: number) {
  if (score >= 80) return "success" as const;
  if (score >= 60) return "warning" as const;
  return "destructive" as const;
}

export function TopClientsCard({ clients }: { clients: TopClient[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Top Clients</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href="/clients">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {clients.length === 0 ? (
          <EmptyState title="No revenue yet" description="Top clients appear once invoices are paid." />
        ) : (
          <ul className="space-y-3">
            {clients.map((client) => (
              <li key={client.id} className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar>
                  <AvatarFallback>{initials(client.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{client.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{client.company ?? "—"}</p>
                </div>
                <div className="hidden text-right text-xs text-muted-foreground sm:block">
                  <p>{client.projectCount} project{client.projectCount === 1 ? "" : "s"}</p>
                  <p>{money(client.outstanding)} due</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums">{money(client.revenue)}</p>
                  <Badge variant={healthVariant(client.healthScore)}>{client.healthScore}</Badge>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/clients/${client.id}`}>Open</Link>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
