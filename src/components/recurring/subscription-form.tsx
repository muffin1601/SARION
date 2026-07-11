"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { createSubscription, updateSubscription, type SubscriptionInput } from "@/server/actions/recurring";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ClientOption {
  id: string;
  name: string;
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function SubscriptionForm({
  mode,
  clients,
  subscriptionId,
  defaultValues,
}: {
  mode: "create" | "edit";
  clients: ClientOption[];
  subscriptionId?: string;
  defaultValues?: Partial<SubscriptionInput>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [clientId, setClientId] = useState(defaultValues?.clientId ?? "");
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [amount, setAmount] = useState(String(defaultValues?.amount ?? ""));
  const [frequency, setFrequency] = useState(defaultValues?.frequency ?? "MONTHLY");
  const [customIntervalDays, setCustomIntervalDays] = useState(String(defaultValues?.customIntervalDays ?? "30"));
  const [nextBillingDate, setNextBillingDate] = useState(defaultValues?.nextBillingDate ?? today());
  const [autoSend, setAutoSend] = useState(defaultValues?.autoSend ?? true);
  const [autoRemind, setAutoRemind] = useState(defaultValues?.autoRemind ?? true);
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const payload: SubscriptionInput = {
      clientId,
      name,
      amount,
      frequency,
      customIntervalDays: frequency === "CUSTOM" ? Number(customIntervalDays) : null,
      nextBillingDate,
      autoSend,
      autoRemind,
      description: description || null,
    };

    startTransition(async () => {
      const result = mode === "create" ? await createSubscription(payload) : await updateSubscription(subscriptionId!, payload);
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        toast.error(result.error);
        return;
      }
      toast.success(mode === "create" ? "Subscription created" : "Subscription updated");
      router.push(`/recurring/${result.subscriptionId}`);
      router.refresh();
    });
  }

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="sub-name">Name</Label>
            <Input id="sub-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Monthly Retainer" disabled={isPending} />
            <FieldError errors={fieldErrors.name} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sub-client">Client</Label>
              <select id="sub-client" className={selectClass} value={clientId} onChange={(e) => setClientId(e.target.value)} disabled={isPending}>
                <option value="" disabled>
                  Select a client…
                </option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <FieldError errors={fieldErrors.clientId} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sub-amount">Amount</Label>
              <Input id="sub-amount" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={isPending} />
              <FieldError errors={fieldErrors.amount} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sub-frequency">Frequency</Label>
              <select id="sub-frequency" className={selectClass} value={frequency} onChange={(e) => setFrequency(e.target.value)} disabled={isPending}>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="QUARTERLY">Quarterly</option>
                <option value="YEARLY">Yearly</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>
            {frequency === "CUSTOM" ? (
              <div className="space-y-2">
                <Label htmlFor="sub-interval">Interval (days)</Label>
                <Input
                  id="sub-interval"
                  type="number"
                  min="1"
                  value={customIntervalDays}
                  onChange={(e) => setCustomIntervalDays(e.target.value)}
                  disabled={isPending}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="sub-next">Next billing date</Label>
                <Input id="sub-next" type="date" value={nextBillingDate} onChange={(e) => setNextBillingDate(e.target.value)} disabled={isPending} />
              </div>
            )}
          </div>
          {frequency === "CUSTOM" && (
            <div className="space-y-2">
              <Label htmlFor="sub-next-2">Next billing date</Label>
              <Input id="sub-next-2" type="date" value={nextBillingDate} onChange={(e) => setNextBillingDate(e.target.value)} disabled={isPending} />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="sub-description">Description (optional)</Label>
            <Textarea id="sub-description" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} disabled={isPending} />
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={autoSend} onCheckedChange={setAutoSend} id="sub-auto-send" />
              <Label htmlFor="sub-auto-send" className="font-normal">
                Auto send invoice
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={autoRemind} onCheckedChange={setAutoRemind} id="sub-auto-remind" />
              <Label htmlFor="sub-auto-remind" className="font-normal">
                Auto remind
              </Label>
            </div>
          </div>

          <div className={cn("flex items-center gap-3 pt-2")}>
            <Button type="submit" variant="brand" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "create" ? "Create subscription" : "Save changes"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <>
      {errors.map((err) => (
        <p key={err} className="text-sm text-destructive">
          {err}
        </p>
      ))}
    </>
  );
}
