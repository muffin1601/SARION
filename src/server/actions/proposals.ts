"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAgency, requireVerifiedEmailOrError } from "@/server/auth-context";
import { logActivity } from "@/server/activity";
import { runAutomationsForActivity } from "@/server/services/automation-engine";
import { generateInvoiceNumber } from "@/server/services/invoice-number";
import { checkLimit } from "@/server/services/plan-limits";

const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

const itemSchema = z.object({
  description: z.string().trim().min(1, "Description is required").max(500),
  qty: z.coerce.number().int().positive("Qty must be at least 1"),
  unitPrice: z.coerce.number().min(0).max(99_999_999),
});

const proposalSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(160),
  clientId: z.preprocess(emptyToNull, z.string().trim().nullable()),
  templateCategory: z.preprocess(emptyToNull, z.string().trim().nullable()),
  items: z.array(itemSchema).min(1, "Add at least one line item"),
  discountType: z.preprocess(emptyToNull, z.enum(["percent", "flat"]).nullable()),
  discountValue: z.coerce.number().min(0).max(99_999_999).nullable().optional(),
  taxPercent: z.coerce.number().min(0).max(100).nullable().optional(),
  validUntil: z.preprocess((v) => {
    if (typeof v !== "string" || v.trim() === "") return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d;
  }, z.date().nullable()),
  terms: z.preprocess(emptyToNull, z.string().trim().max(5000).nullable()),
  notes: z.preprocess(emptyToNull, z.string().trim().max(5000).nullable()),
});

export interface ProposalItemInput {
  description: string;
  qty: number | string;
  unitPrice: number | string;
}

export interface ProposalInput {
  name: string;
  clientId?: string | null;
  templateCategory?: string | null;
  items: ProposalItemInput[];
  discountType?: "percent" | "flat" | null;
  discountValue?: number | null;
  taxPercent?: number | null;
  validUntil?: string | null;
  terms?: string | null;
  notes?: string | null;
}

export type ActionResult =
  | { ok: true; proposalId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function money(n: number): number {
  return Math.round(n * 100) / 100;
}

function computeTotals(
  items: z.infer<typeof itemSchema>[],
  discountType: "percent" | "flat" | null,
  discountValue: number | null | undefined,
  taxPercent: number | null | undefined,
) {
  const prepared = items.map((it) => ({
    description: it.description,
    qty: it.qty,
    unitPrice: money(it.unitPrice),
    lineTotal: money(it.qty * it.unitPrice),
  }));
  const subtotal = money(prepared.reduce((sum, it) => sum + it.lineTotal, 0));
  const discountAmount =
    discountType === "percent"
      ? money(subtotal * ((discountValue ?? 0) / 100))
      : discountType === "flat"
        ? money(discountValue ?? 0)
        : 0;
  const afterDiscount = Math.max(0, money(subtotal - discountAmount));
  const taxAmount = money(afterDiscount * ((taxPercent ?? 0) / 100));
  const total = money(afterDiscount + taxAmount);
  return { prepared, subtotal, total };
}

async function assertClientOwned(agencyId: string, clientId: string) {
  const client = await db.client.findFirst({ where: { id: clientId, agencyId, deletedAt: null }, select: { id: true } });
  return Boolean(client);
}

export async function createProposal(input: ProposalInput): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  const parsed = proposalSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  if (parsed.data.clientId && !(await assertClientOwned(agencyId, parsed.data.clientId))) {
    return { ok: false, error: "Selected client not found.", fieldErrors: { clientId: ["Select a valid client."] } };
  }

  const { prepared, subtotal, total } = computeTotals(
    parsed.data.items,
    parsed.data.discountType,
    parsed.data.discountValue,
    parsed.data.taxPercent,
  );

  const proposal = await db.$transaction(async (tx) => {
    const created = await tx.proposal.create({
      data: {
        agencyId,
        clientId: parsed.data.clientId,
        templateCategory: parsed.data.templateCategory,
        name: parsed.data.name,
        subtotal,
        discountType: parsed.data.discountType,
        discountValue: parsed.data.discountValue ?? null,
        taxPercent: parsed.data.taxPercent ?? null,
        total,
        validUntil: parsed.data.validUntil,
        terms: parsed.data.terms,
        notes: parsed.data.notes,
        createdBy: userId,
        items: { create: prepared.map((it, i) => ({ agencyId, ...it, sortOrder: i })) },
      },
    });
    await tx.proposalActivity.create({ data: { agencyId, proposalId: created.id, type: "created" } });
    await logActivity(
      {
        agencyId,
        clientId: parsed.data.clientId ?? undefined,
        userId,
        type: "Proposal Created",
        title: "Proposal Created",
        description: `Proposal "${created.name}" was created.`,
      },
      tx,
    );
    return created;
  });

  revalidatePath("/proposals");
  return { ok: true, proposalId: proposal.id };
}

export async function updateProposal(proposalId: string, input: ProposalInput): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  const parsed = proposalSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  if (parsed.data.clientId && !(await assertClientOwned(agencyId, parsed.data.clientId))) {
    return { ok: false, error: "Selected client not found.", fieldErrors: { clientId: ["Select a valid client."] } };
  }

  const { prepared, subtotal, total } = computeTotals(
    parsed.data.items,
    parsed.data.discountType,
    parsed.data.discountValue,
    parsed.data.taxPercent,
  );

  const result = await db.$transaction(async (tx) => {
    const existing = await tx.proposal.findFirst({ where: { id: proposalId, agencyId }, select: { id: true } });
    if (!existing) return null;

    await tx.proposalItem.deleteMany({ where: { proposalId, agencyId } });
    await tx.proposal.update({
      where: { id: proposalId },
      data: {
        clientId: parsed.data.clientId,
        templateCategory: parsed.data.templateCategory,
        name: parsed.data.name,
        subtotal,
        discountType: parsed.data.discountType,
        discountValue: parsed.data.discountValue ?? null,
        taxPercent: parsed.data.taxPercent ?? null,
        total,
        validUntil: parsed.data.validUntil,
        terms: parsed.data.terms,
        notes: parsed.data.notes,
        items: { create: prepared.map((it, i) => ({ agencyId, ...it, sortOrder: i })) },
      },
    });
    await logActivity(
      { agencyId, clientId: parsed.data.clientId ?? undefined, userId, type: "Proposal Created", title: "Proposal Updated", description: `Proposal "${parsed.data.name}" was updated.` },
      tx,
    );
    return existing;
  });

  if (!result) return { ok: false, error: "Proposal not found." };
  revalidatePath("/proposals");
  revalidatePath(`/proposals/${proposalId}`);
  return { ok: true, proposalId };
}

export type SimpleResult = { ok: true } | { ok: false; error: string };

export async function deleteProposal(proposalId: string): Promise<SimpleResult> {
  const { agencyId } = await requireAgency();
  const { count } = await db.proposal.deleteMany({ where: { id: proposalId, agencyId } });
  if (count === 0) return { ok: false, error: "Proposal not found." };
  revalidatePath("/proposals");
  return { ok: true };
}

export async function duplicateProposal(proposalId: string): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();
  const existing = await db.proposal.findFirst({ where: { id: proposalId, agencyId }, include: { items: true } });
  if (!existing) return { ok: false, error: "Proposal not found." };

  const copy = await db.proposal.create({
    data: {
      agencyId,
      clientId: existing.clientId,
      templateCategory: existing.templateCategory,
      name: `${existing.name} (copy)`,
      subtotal: existing.subtotal,
      discountType: existing.discountType,
      discountValue: existing.discountValue,
      taxPercent: existing.taxPercent,
      total: existing.total,
      terms: existing.terms,
      notes: existing.notes,
      createdBy: userId,
      items: {
        create: existing.items.map((it, i) => ({
          agencyId,
          description: it.description,
          qty: it.qty,
          unitPrice: it.unitPrice,
          lineTotal: it.lineTotal,
          sortOrder: i,
        })),
      },
    },
  });

  revalidatePath("/proposals");
  return { ok: true, proposalId: copy.id };
}

/** Send the proposal to the client — status=sent, emails the share link. */
export async function sendProposal(proposalId: string): Promise<SimpleResult> {
  const { agencyId, userId } = await requireAgency();

  const verificationError = await requireVerifiedEmailOrError(userId);
  if (verificationError) return { ok: false, error: verificationError };

  const proposal = await db.$transaction(async (tx) => {
    const existing = await tx.proposal.findFirst({
      where: { id: proposalId, agencyId },
      select: { id: true, name: true, clientId: true, shareToken: true },
    });
    if (!existing) return null;

    await tx.proposal.update({ where: { id: proposalId }, data: { status: "sent", sentAt: new Date() } });
    await tx.proposalActivity.create({ data: { agencyId, proposalId, type: "sent" } });
    await logActivity(
      { agencyId, clientId: existing.clientId ?? undefined, userId, type: "Proposal Sent", title: "Proposal Sent", description: `Proposal "${existing.name}" was sent.` },
      tx,
    );
    return existing;
  });

  if (!proposal) return { ok: false, error: "Proposal not found." };

  if (proposal.clientId) {
    try {
      const [client, agency] = await Promise.all([
        db.client.findUnique({ where: { id: proposal.clientId }, select: { email: true } }),
        db.agency.findUnique({ where: { id: agencyId }, select: { name: true } }),
      ]);
      if (client?.email) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://trysarion.com";
        const { sendEmailSafe } = await import("@/lib/email");
        await sendEmailSafe("proposalShared", client.email, {
          proposalName: proposal.name,
          proposalUrl: `${appUrl}/p/${proposal.shareToken}`,
          fromAgency: agency?.name,
        });
      }
    } catch (err) {
      console.error("[proposals] send email failed:", err);
    }
  }

  revalidatePath("/proposals");
  revalidatePath(`/proposals/${proposalId}`);
  return { ok: true };
}

export async function cancelProposal(proposalId: string): Promise<SimpleResult> {
  const { agencyId, userId } = await requireAgency();
  const result = await db.$transaction(async (tx) => {
    const existing = await tx.proposal.findFirst({ where: { id: proposalId, agencyId }, select: { name: true, clientId: true } });
    if (!existing) return null;
    await tx.proposal.update({ where: { id: proposalId }, data: { status: "cancelled" } });
    await tx.proposalActivity.create({ data: { agencyId, proposalId, type: "cancelled" } });
    await logActivity(
      { agencyId, clientId: existing.clientId ?? undefined, userId, type: "Proposal Cancelled", title: "Proposal Cancelled", description: `Proposal "${existing.name}" was cancelled.` },
      tx,
    );
    return existing;
  });
  if (!result) return { ok: false, error: "Proposal not found." };
  revalidatePath("/proposals");
  revalidatePath(`/proposals/${proposalId}`);
  return { ok: true };
}

const saveTemplateSchema = z.object({
  name: z.string().trim().min(1).max(120),
});

export async function saveAsTemplate(proposalId: string, name: string): Promise<SimpleResult> {
  const { agencyId } = await requireAgency();
  const parsed = saveTemplateSchema.safeParse({ name });
  if (!parsed.success) return { ok: false, error: "Enter a template name." };

  const proposal = await db.proposal.findFirst({ where: { id: proposalId, agencyId }, include: { items: true } });
  if (!proposal) return { ok: false, error: "Proposal not found." };

  await db.proposalTemplate.create({
    data: {
      agencyId,
      name: parsed.data.name,
      category: proposal.templateCategory,
      defaultItems: proposal.items.map((i) => ({ description: i.description, qty: i.qty, unitPrice: Number(i.unitPrice) })),
      defaultTerms: proposal.terms,
    },
  });

  revalidatePath("/proposals");
  return { ok: true };
}

export type ConvertResult =
  | { ok: true; clientId: string; projectId: string; invoiceId: string }
  | { ok: false; error: string };

/**
 * Proposal → Client → Project → Invoice → Automation → Timeline. Creates the
 * client if the proposal wasn't already linked to one, one Project seeded
 * from the proposal, one Invoice from the ProposalItems (reusing
 * generateInvoiceNumber — the same numbering sequence as every other
 * invoice), logs each step, and fires the "Proposal Accepted" automation
 * trigger. One service function — never duplicated across UI entry points.
 */
export async function convertProposal(proposalId: string): Promise<ConvertResult> {
  const { agencyId, userId } = await requireAgency();

  const proposal = await db.proposal.findFirst({ where: { id: proposalId, agencyId }, include: { items: true, client: true } });
  if (!proposal) return { ok: false, error: "Proposal not found." };
  if (proposal.status !== "accepted") return { ok: false, error: "Only accepted proposals can be converted." };

  const limit = await checkLimit(agencyId, "projects");
  if (!limit.ok) return { ok: false, error: limit.message ?? "Plan limit reached." };

  const { clientId, projectId, invoiceId, activityId } = await db.$transaction(async (tx) => {
    let clientId = proposal.clientId;
    if (!clientId) {
      const client = await tx.client.create({
        data: { agencyId, name: proposal.acceptedByName || proposal.name },
      });
      await logActivity({ agencyId, clientId: client.id, userId, type: "Client Created", title: "Client Created", description: `Client "${client.name}" was created from an accepted proposal.` }, tx);
      clientId = client.id;
    }

    const project = await tx.project.create({
      data: { agencyId, clientId, name: proposal.name, status: "PLANNED" },
    });
    await logActivity({ agencyId, clientId, projectId: project.id, userId, type: "Project Created", title: "Project Created", description: `Project "${project.name}" was created from an accepted proposal.` }, tx);

    const number = await generateInvoiceNumber(agencyId, tx);
    const invoice = await tx.invoice.create({
      data: {
        agencyId,
        clientId,
        number,
        status: "unpaid",
        total: proposal.total,
        items: {
          create: proposal.items.map((it) => ({ agencyId, description: it.description, qty: it.qty, unitPrice: it.unitPrice, lineTotal: it.lineTotal })),
        },
      },
    });
    const activity = await logActivity(
      { agencyId, clientId, invoiceId: invoice.id, userId, type: "Invoice Created", title: "Invoice Created", description: `Invoice ${invoice.number} was created from accepted proposal "${proposal.name}".` },
      tx,
    );

    return { clientId, projectId: project.id, invoiceId: invoice.id, activityId: activity.id };
  });

  await runAutomationsForActivity({ agencyId, triggerType: "Proposal Accepted", activityId, clientId, projectId, invoiceId });

  revalidatePath("/proposals");
  revalidatePath(`/proposals/${proposalId}`);
  revalidatePath(`/clients/${clientId}`);

  return { ok: true, clientId, projectId, invoiceId };
}
