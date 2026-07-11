"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Printer } from "lucide-react";

import { acceptProposal, rejectProposal } from "@/server/actions/proposal-public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PublicProposalActions({ shareToken }: { shareToken: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [acceptOpen, setAcceptOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  function handleAccept() {
    startTransition(async () => {
      const result = await acceptProposal(shareToken, { name });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Proposal accepted");
      setAcceptOpen(false);
      router.refresh();
    });
  }

  function handleReject() {
    startTransition(async () => {
      const result = await rejectProposal(shareToken, { reason });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Proposal declined");
      setRejectOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Dialog open={acceptOpen} onOpenChange={setAcceptOpen}>
        <DialogTrigger asChild>
          <Button variant="brand">Accept Proposal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Accept this proposal</DialogTitle>
            <DialogDescription>Type your name to confirm acceptance.</DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            <Label htmlFor="accept-name">Your name</Label>
            <Input id="accept-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAcceptOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="brand" onClick={handleAccept} disabled={isPending || !name.trim()}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm acceptance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Reject Proposal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline this proposal</DialogTitle>
            <DialogDescription>Let the agency know why (optional).</DialogDescription>
          </DialogHeader>
          <Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (optional)" />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRejectOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Confirm decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="outline" onClick={() => window.print()}>
        <Printer className="h-4 w-4" /> Download PDF
      </Button>
    </div>
  );
}
