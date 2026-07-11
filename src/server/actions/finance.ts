"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAgency, requireOwner } from "@/server/auth-context";
import { logActivity } from "@/server/activity";

const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

const costSchema = z.object({
  amount: z.coerce.number().positive("Amount must be greater than 0").max(99_999_999),
  category: z.string().trim().min(1, "Category is required").max(80),
  description: z.preprocess(emptyToNull, z.string().trim().max(500).nullable()),
  clientId: z.preprocess(emptyToNull, z.string().trim().nullable()),
  projectId: z.preprocess(emptyToNull, z.string().trim().nullable()),
  incurredAt: z.preprocess((v) => {
    if (typeof v !== "string" || v.trim() === "") return new Date();
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? v : d;
  }, z.date({ message: "A valid date is required" })),
});

export interface CostInput {
  amount: number | string;
  category: string;
  description?: string | null;
  clientId?: string | null;
  projectId?: string | null;
  incurredAt?: string | null;
}

export type ActionResult =
  | { ok: true; costId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

/** Log a cost entry (owner-only) — a flat expense log, not bookkeeping. */
export async function createCost(input: CostInput): Promise<ActionResult> {
  const { agencyId, userId } = await requireOwner();

  const parsed = costSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let clientId = parsed.data.clientId ?? undefined;
  if (parsed.data.projectId) {
    const project = await db.project.findFirst({
      where: { id: parsed.data.projectId, agencyId, deletedAt: null },
      select: { clientId: true },
    });
    if (!project) {
      return { ok: false, error: "Selected project not found.", fieldErrors: { projectId: ["Select a valid project."] } };
    }
    clientId = clientId ?? project.clientId;
  }
  if (clientId) {
    const client = await db.client.findFirst({ where: { id: clientId, agencyId, deletedAt: null }, select: { id: true } });
    if (!client) {
      return { ok: false, error: "Selected client not found.", fieldErrors: { clientId: ["Select a valid client."] } };
    }
  }

  const cost = await db.$transaction(async (tx) => {
    const created = await tx.cost.create({
      data: {
        agencyId,
        clientId: clientId ?? null,
        projectId: parsed.data.projectId,
        amount: parsed.data.amount,
        category: parsed.data.category,
        description: parsed.data.description,
        incurredAt: parsed.data.incurredAt,
        createdBy: userId,
      },
    });
    await logActivity(
      {
        agencyId,
        clientId: clientId ?? undefined,
        projectId: parsed.data.projectId ?? undefined,
        userId,
        type: "Cost Logged",
        title: "Cost Logged",
        description: `${created.category} — ${money(Number(created.amount))}${created.description ? `: ${created.description}` : ""}`,
        metadata: { amount: Number(created.amount), category: created.category },
      },
      tx,
    );
    return created;
  });

  revalidatePath("/finance");
  if (clientId) revalidatePath(`/clients/${clientId}`);
  revalidatePath("/dashboard");

  return { ok: true, costId: cost.id };
}

export type SimpleResult = { ok: true } | { ok: false; error: string };

export async function deleteCost(costId: string): Promise<SimpleResult> {
  const { agencyId } = await requireOwner();

  const { count } = await db.cost.deleteMany({ where: { id: costId, agencyId } });
  if (count === 0) return { ok: false, error: "Cost entry not found." };

  revalidatePath("/finance");
  return { ok: true };
}

const estimateSchema = z.object({
  estimatedCost: z.preprocess((v) => (v === "" || v === null || v === undefined ? null : Number(v)), z.number().min(0).nullable()),
  estimatedHours: z.preprocess((v) => (v === "" || v === null || v === undefined ? null : Number(v)), z.number().min(0).nullable()),
});

export interface ProjectEstimateInput {
  estimatedCost?: number | string | null;
  estimatedHours?: number | string | null;
}

/** Manual budget entry — not time tracking. */
export async function updateProjectEstimate(
  projectId: string,
  input: ProjectEstimateInput,
): Promise<SimpleResult> {
  const { agencyId } = await requireAgency();

  const parsed = estimateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please enter valid numbers." };
  }

  const { count } = await db.project.updateMany({
    where: { id: projectId, agencyId, deletedAt: null },
    data: { estimatedCost: parsed.data.estimatedCost, estimatedHours: parsed.data.estimatedHours },
  });
  if (count === 0) return { ok: false, error: "Project not found." };

  revalidatePath("/finance");
  revalidatePath(`/projects/${projectId}`);
  return { ok: true };
}
