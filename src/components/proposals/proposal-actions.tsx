"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Copy, Link2, Loader2, MoreHorizontal, Send, Trash2, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  cancelProposal,
  convertProposal,
  deleteProposal,
  duplicateProposal,
  sendProposal,
} from "@/server/actions/proposals";

export function ProposalActions({
  proposalId,
  status,
  shareToken,
}: {
  proposalId: string;
  status: string;
  shareToken: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [, setCopied] = useState(false);

  function handleSend() {
    startTransition(async () => {
      const result = await sendProposal(proposalId);
      if (!result.ok) toast.error(result.error);
      else {
        toast.success("Proposal sent");
        router.refresh();
      }
    });
  }

  function handleCopyLink() {
    const url = `${window.location.origin}/p/${shareToken}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Share link copied");
    });
  }

  function handleConvert() {
    startTransition(async () => {
      const result = await convertProposal(proposalId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Converted to client, project & invoice");
      router.push(`/clients/${result.clientId}`);
    });
  }

  function handleDuplicate() {
    startTransition(async () => {
      const result = await duplicateProposal(proposalId);
      if (!result.ok) toast.error(result.error);
      else {
        toast.success("Proposal duplicated");
        router.push(`/proposals/${result.proposalId}`);
      }
    });
  }

  function handleCancel() {
    startTransition(async () => {
      const result = await cancelProposal(proposalId);
      if (!result.ok) toast.error(result.error);
      else {
        toast.success("Proposal cancelled");
        router.refresh();
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteProposal(proposalId);
      if (!result.ok) toast.error(result.error);
      else {
        toast.success("Proposal deleted");
        router.push("/proposals");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      {status === "draft" && (
        <Button variant="brand" size="sm" onClick={handleSend} disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </Button>
      )}
      {status === "accepted" && (
        <Button variant="brand" size="sm" onClick={handleConvert} disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          Convert
        </Button>
      )}
      <Button variant="outline" size="sm" onClick={handleCopyLink}>
        <Link2 className="h-4 w-4" /> Copy Link
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" disabled={isPending}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={handleDuplicate}>
            <Copy className="h-4 w-4" /> Duplicate
          </DropdownMenuItem>
          {!["cancelled", "accepted", "rejected"].includes(status) && (
            <DropdownMenuItem onSelect={handleCancel}>Cancel proposal</DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={handleDelete} className="text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
