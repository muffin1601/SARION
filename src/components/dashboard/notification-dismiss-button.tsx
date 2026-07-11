"use client";

import { useTransition } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { dismissNotification } from "@/server/actions/dashboard-prefs";

export function NotificationDismissButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      disabled={isPending}
      onClick={() => startTransition(() => { void dismissNotification(id); })}
      aria-label="Dismiss"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}
