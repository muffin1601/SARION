import Link from "next/link";
import { Download, Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { invoiceStatusLabel, displayStatus, INVOICE_STATUS_VARIANT } from "@/lib/invoice-status";
import { SendReminderMenuItem } from "@/components/dashboard/send-reminder-menu-item";
import type { RecentInvoice } from "@/server/data/dashboard";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export function RecentInvoicesCard({
  invoices,
  title = "Recent Invoices",
  viewAllHref = "/invoices",
  emptyTitle = "No invoices yet",
  emptyDescription = "Create your first invoice to see it here.",
}: {
  invoices: RecentInvoice[];
  title?: string;
  viewAllHref?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button asChild variant="link" className="h-auto p-0 text-sm">
          <Link href={viewAllHref}>View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <ul className="space-y-2">
            {invoices.map((invoice) => {
              const status = displayStatus(invoice.status, invoice.dueDate);
              return (
                <li
                  key={invoice.id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{invoice.number}</span>
                      <Badge variant={INVOICE_STATUS_VARIANT[status]}>{invoiceStatusLabel(status)}</Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {invoice.clientName} · Due {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">{money(invoice.total)}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/invoices/${invoice.id}`}>
                            <Eye className="h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <SendReminderMenuItem invoiceId={invoice.id} />
                        <DropdownMenuItem asChild>
                          <Link href={`/invoices/${invoice.id}`}>
                            <Download className="h-4 w-4" /> Download
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
