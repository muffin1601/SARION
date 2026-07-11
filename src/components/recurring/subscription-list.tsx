"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2, MoreHorizontal, Play, RefreshCcw, Repeat } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cancelSubscription, generateNow, pauseSubscription, resumeSubscription } from "@/server/actions/recurring";
import type { SubscriptionListItem } from "@/server/data/recurring";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

const STATUS_VARIANT: Record<string, "success" | "secondary" | "outline"> = {
  active: "success",
  paused: "secondary",
  cancelled: "outline",
};

const FREQUENCY_LABEL: Record<string, string> = {
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  QUARTERLY: "Quarterly",
  YEARLY: "Yearly",
  CUSTOM: "Custom",
};

export function SubscriptionList({ subscriptions }: { subscriptions: SubscriptionListItem[] }) {
  const [isPending, startTransition] = useTransition();

  function handleAction(fn: () => Promise<{ ok: boolean; error?: string }>) {
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) toast.error(result.error ?? "Something went wrong");
      else toast.success("Done");
    });
  }

  if (subscriptions.length === 0) {
    return <EmptyState icon={Repeat} title="No subscriptions yet" description="Create a recurring subscription to automate billing." />;
  }

  return (
    <div className="space-y-3">
      {subscriptions.map((sub) => (
        <Card key={sub.id}>
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <Link href={`/recurring/${sub.id}`} className="font-medium hover:underline">
                {sub.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {sub.clientName} · {FREQUENCY_LABEL[sub.frequency] ?? sub.frequency} · Next {formatDate(sub.nextBillingDate)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-semibold tabular-nums">{money(sub.amount)}</span>
              <Badge variant={STATUS_VARIANT[sub.status] ?? "secondary"}>{sub.status}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" disabled={isPending}>
                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => handleAction(() => generateNow(sub.id))}>
                    <Play className="h-4 w-4" /> Generate Now
                  </DropdownMenuItem>
                  {sub.status === "active" ? (
                    <DropdownMenuItem onSelect={() => handleAction(() => pauseSubscription(sub.id))}>Pause</DropdownMenuItem>
                  ) : sub.status === "paused" ? (
                    <DropdownMenuItem onSelect={() => handleAction(() => resumeSubscription(sub.id))}>
                      <RefreshCcw className="h-4 w-4" /> Resume
                    </DropdownMenuItem>
                  ) : null}
                  {sub.status !== "cancelled" && (
                    <DropdownMenuItem onSelect={() => handleAction(() => cancelSubscription(sub.id))} className="text-destructive focus:text-destructive">
                      Cancel
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
