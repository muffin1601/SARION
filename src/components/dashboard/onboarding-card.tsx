"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Circle, X } from "lucide-react";

import type { OnboardingStatus } from "@/server/data/dashboard";
import { dismissOnboarding } from "@/server/actions/dashboard-prefs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Step {
  key: keyof OnboardingStatus;
  label: string;
  href: string;
}

const STEPS: Step[] = [
  { key: "hasClient", label: "Create first Client", href: "/clients/new" },
  { key: "hasProposal", label: "Create first Proposal", href: "/proposals/new" },
  { key: "hasProposalAccepted", label: "Proposal Accepted", href: "/proposals" },
  { key: "hasTimeTracked", label: "Track Time", href: "/time" },
  { key: "hasInvoiceSent", label: "Send Invoice", href: "/invoices" },
  { key: "hasVisitedDashboard", label: "Open Dashboard", href: "/dashboard" },
];

/**
 * Welcome checklist shown on first login. Progress is computed dynamically
 * from real data (no separate progress table) — dismissal is the only bit of
 * state, stored per-agency on Agency.onboardingDismissedAt. Auto-hides once
 * every step is complete, or once dismissed.
 */
export function OnboardingCard({
  status,
  dismissed,
}: {
  status: OnboardingStatus;
  dismissed: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const completed = STEPS.filter((s) => status[s.key]).length;

  if (dismissed || completed === STEPS.length) return null;

  function handleDismiss() {
    startTransition(async () => {
      await dismissOnboarding();
      router.refresh();
    });
  }

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
        onClick={handleDismiss}
        disabled={isPending}
        aria-label="Dismiss welcome checklist"
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader className="flex-row items-center justify-between space-y-0 pr-10">
        <CardTitle>Welcome — let&apos;s get you set up</CardTitle>
        <span className="text-sm font-medium text-muted-foreground">
          {completed} / {STEPS.length}
        </span>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => {
            const done = status[step.key];
            return (
              <li key={step.key}>
                <Link
                  href={step.href}
                  className="flex items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent"
                >
                  {done ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
                  )}
                  <span
                    className={
                      done ? "text-muted-foreground line-through" : "font-medium"
                    }
                  >
                    {step.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
