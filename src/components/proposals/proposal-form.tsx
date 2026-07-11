"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { createProposal, updateProposal, type ProposalInput } from "@/server/actions/proposals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PROPOSAL_TEMPLATE_CATEGORIES } from "@/lib/proposal-templates";

interface ClientOption {
  id: string;
  name: string;
}

interface ItemValue {
  description: string;
  qty: string;
  unitPrice: string;
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const EMPTY_ITEM: ItemValue = { description: "", qty: "1", unitPrice: "0" };

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number.isFinite(n) ? n : 0);
}

export interface ProposalFormDefaults {
  name?: string;
  clientId?: string;
  templateCategory?: string;
  items?: ItemValue[];
  discountType?: "percent" | "flat" | "";
  discountValue?: string;
  taxPercent?: string;
  validUntil?: string;
  terms?: string;
  notes?: string;
}

export function ProposalForm({
  mode,
  clients,
  proposalId,
  defaultValues,
}: {
  mode: "create" | "edit";
  clients: ClientOption[];
  proposalId?: string;
  defaultValues?: ProposalFormDefaults;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [clientId, setClientId] = useState(defaultValues?.clientId ?? "");
  const [templateCategory, setTemplateCategory] = useState(defaultValues?.templateCategory ?? "");
  const [items, setItems] = useState<ItemValue[]>(
    defaultValues?.items && defaultValues.items.length > 0 ? defaultValues.items : [{ ...EMPTY_ITEM }],
  );
  const [discountType, setDiscountType] = useState(defaultValues?.discountType ?? "");
  const [discountValue, setDiscountValue] = useState(defaultValues?.discountValue ?? "");
  const [taxPercent, setTaxPercent] = useState(defaultValues?.taxPercent ?? "");
  const [validUntil, setValidUntil] = useState(defaultValues?.validUntil ?? "");
  const [terms, setTerms] = useState(defaultValues?.terms ?? "");
  const [notes, setNotes] = useState(defaultValues?.notes ?? "");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function applyTemplate(category: string) {
    setTemplateCategory(category);
    const template = PROPOSAL_TEMPLATE_CATEGORIES.find((c) => c.category === category);
    if (!template) return;
    setItems(template.defaultItems.map((i) => ({ description: i.description, qty: String(i.qty), unitPrice: String(i.unitPrice) })));
    setTerms((prev) => prev || template.defaultTerms);
    setName((prev) => prev || template.label);
  }

  function setItem(index: number, patch: Partial<ItemValue>) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }
  function addItem() {
    setItems((prev) => [...prev, { ...EMPTY_ITEM }]);
  }
  function removeItem(index: number) {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  }

  const lineTotals = useMemo(
    () =>
      items.map((it) => {
        const qty = parseFloat(it.qty);
        const price = parseFloat(it.unitPrice);
        return Math.round((Number.isFinite(qty) ? qty : 0) * (Number.isFinite(price) ? price : 0) * 100) / 100;
      }),
    [items],
  );
  const subtotal = useMemo(() => Math.round(lineTotals.reduce((s, n) => s + n, 0) * 100) / 100, [lineTotals]);
  const discountAmount = useMemo(() => {
    const dv = parseFloat(discountValue) || 0;
    if (discountType === "percent") return Math.round(subtotal * (dv / 100) * 100) / 100;
    if (discountType === "flat") return dv;
    return 0;
  }, [discountType, discountValue, subtotal]);
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount = useMemo(() => Math.round(afterDiscount * ((parseFloat(taxPercent) || 0) / 100) * 100) / 100, [afterDiscount, taxPercent]);
  const total = Math.round((afterDiscount + taxAmount) * 100) / 100;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const payload: ProposalInput = {
      name,
      clientId: clientId || null,
      templateCategory: templateCategory || null,
      items: items.map((it) => ({ description: it.description, qty: it.qty, unitPrice: it.unitPrice })),
      discountType: (discountType || null) as "percent" | "flat" | null,
      discountValue: discountValue ? Number(discountValue) : null,
      taxPercent: taxPercent ? Number(taxPercent) : null,
      validUntil: validUntil || null,
      terms: terms || null,
      notes: notes || null,
    };

    startTransition(async () => {
      const result = mode === "create" ? await createProposal(payload) : await updateProposal(proposalId!, payload);
      if (!result.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        toast.error(result.error);
        return;
      }
      toast.success(mode === "create" ? "Proposal created" : "Proposal updated");
      router.push(`/proposals/${result.proposalId}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="proposal-name">Proposal name</Label>
            <Input id="proposal-name" value={name} onChange={(e) => setName(e.target.value)} disabled={isPending} />
            <FieldError errors={fieldErrors.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-client">Client</Label>
            <select id="proposal-client" className={selectClass} value={clientId} onChange={(e) => setClientId(e.target.value)} disabled={isPending}>
              <option value="">No client yet</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-template">Template</Label>
            <select
              id="proposal-template"
              className={selectClass}
              value={templateCategory}
              onChange={(e) => applyTemplate(e.target.value)}
              disabled={isPending}
            >
              <option value="">None</option>
              {PROPOSAL_TEMPLATE_CATEGORIES.map((c) => (
                <option key={c.category} value={c.category}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-valid-until">Valid until</Label>
            <Input id="proposal-valid-until" type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} disabled={isPending} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Services &amp; Pricing</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addItem} disabled={isPending}>
            <Plus className="h-4 w-4" /> Add item
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <FieldError errors={fieldErrors.items} />
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 items-start gap-2 rounded-lg border p-3">
              <div className="col-span-12 space-y-1 sm:col-span-6">
                <Label className="text-xs text-muted-foreground">Description</Label>
                <Input value={item.description} onChange={(e) => setItem(index, { description: e.target.value })} disabled={isPending} />
              </div>
              <div className="col-span-4 space-y-1 sm:col-span-2">
                <Label className="text-xs text-muted-foreground">Qty</Label>
                <Input type="number" min="1" step="1" value={item.qty} onChange={(e) => setItem(index, { qty: e.target.value })} disabled={isPending} />
              </div>
              <div className="col-span-4 space-y-1 sm:col-span-2">
                <Label className="text-xs text-muted-foreground">Unit price</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => setItem(index, { unitPrice: e.target.value })}
                  disabled={isPending}
                />
              </div>
              <div className="col-span-3 space-y-1 sm:col-span-1">
                <Label className="text-xs text-muted-foreground">Total</Label>
                <p className="flex h-10 items-center text-sm font-medium tabular-nums">{money(lineTotals[index])}</p>
              </div>
              <div className="col-span-1 flex h-full items-end justify-end">
                <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)} disabled={isPending || items.length === 1}>
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}

          <div className="grid gap-4 border-t pt-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Discount</Label>
              <div className="flex gap-2">
                <select
                  className={cn(selectClass, "w-28")}
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as "percent" | "flat" | "")}
                  disabled={isPending}
                >
                  <option value="">None</option>
                  <option value="percent">%</option>
                  <option value="flat">$</option>
                </select>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  disabled={isPending || !discountType}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Tax %</Label>
              <Input type="number" min="0" max="100" step="0.01" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} disabled={isPending} />
            </div>
            <div className="space-y-1 text-right">
              <p className="text-xs text-muted-foreground">Subtotal {money(subtotal)}</p>
              {discountAmount > 0 && <p className="text-xs text-muted-foreground">Discount −{money(discountAmount)}</p>}
              {taxAmount > 0 && <p className="text-xs text-muted-foreground">Tax +{money(taxAmount)}</p>}
              <p className="text-xl font-semibold tabular-nums">{money(total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Terms &amp; Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposal-terms">Terms</Label>
            <Textarea id="proposal-terms" rows={4} value={terms} onChange={(e) => setTerms(e.target.value)} disabled={isPending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-notes">Notes (internal)</Label>
            <Textarea id="proposal-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} disabled={isPending} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="brand" disabled={isPending}>
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === "create" ? "Create proposal" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isPending}>
          Cancel
        </Button>
      </div>
    </form>
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
