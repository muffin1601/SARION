"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Zap } from "lucide-react";

import { generateNow } from "@/server/actions/recurring";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GenerateNowButtonProps {
  subscriptionId: string;
  subscriptionName: string;
}

export function GenerateNowButton({ subscriptionId, subscriptionName }: GenerateNowButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleGenerate() {
    startTransition(async () => {
      const result = await generateNow(subscriptionId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Invoice generated.");
      setOpen(false);
      // The action itself revalidates /recurring and /recurring/[id]; a full
      // refresh also picks up dashboard/finance/timeline/reports widgets that
      // read the same underlying data on their own routes.
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" size="sm">
          <Zap className="h-4 w-4" />
          Generate Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate invoice for {subscriptionName}?</DialogTitle>
          <DialogDescription>
            This creates and issues the invoice for the current billing cycle right now, instead of
            waiting for the scheduled run. Already-billed cycles are never generated twice.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="brand" onClick={handleGenerate} disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Generate invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
