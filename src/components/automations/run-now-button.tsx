"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Play } from "lucide-react";

import { runAutomationManually } from "@/server/actions/automations";
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

interface RunNowButtonProps {
  automationId: string;
  automationName: string;
}

export function RunNowButton({ automationId, automationName }: RunNowButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleRun() {
    startTransition(async () => {
      const result = await runAutomationManually(automationId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Automation ran successfully.");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" size="sm">
          <Play className="h-4 w-4" />
          Run Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Run &quot;{automationName}&quot; now?</DialogTitle>
          <DialogDescription>
            This executes every action in this automation immediately, using the same engine that runs it
            automatically on its trigger. The result is recorded in Run History either way.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="brand" onClick={handleRun} disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Run automation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
