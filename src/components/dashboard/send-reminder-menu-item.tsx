"use client";

import { useTransition } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { sendInvoiceReminder } from "@/server/actions/dashboard";

export function SendReminderMenuItem({ invoiceId }: { invoiceId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await sendInvoiceReminder(invoiceId);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Reminder sent");
    });
  }

  return (
    <DropdownMenuItem disabled={isPending} onSelect={(e) => { e.preventDefault(); handleClick(); }}>
      <Send className="h-4 w-4" /> Send Reminder
    </DropdownMenuItem>
  );
}
