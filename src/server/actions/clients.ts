"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAgency } from "@/server/auth-context";
import { logActivity } from "@/server/activity";
import { checkLimit } from "@/server/services/plan-limits";
import { captureServer } from "@/lib/posthog-server";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { runAutomationsForActivity } from "@/server/services/automation-engine";

// --- Validation ----------------------------------------------------------

const emptyToNull = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? null : v;

const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  company: z.preprocess(emptyToNull, z.string().trim().max(120).nullable()),
  email: z.preprocess(
    emptyToNull,
    z.string().trim().email("Enter a valid email").nullable(),
  ),
  phone: z.preprocess(emptyToNull, z.string().trim().max(40).nullable()),
  notes: z.preprocess(emptyToNull, z.string().trim().max(5000).nullable()),
});

export type ClientInput = z.input<typeof clientSchema>;

export type ActionResult =
  | { ok: true; clientId: string }
  | {
      ok: false;
      error: string;
      fieldErrors?: Record<string, string[]>;
      // "limit" signals the UI to surface an upgrade prompt instead of a
      // generic form error.
      code?: "limit";
    };

const notesSchema = z.object({
  notes: z.preprocess(emptyToNull, z.string().trim().max(5000).nullable()),
});

// --- Create --------------------------------------------------------------

export async function createClient(input: ClientInput): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  // Plan gate — enforce the tier's client quota before creating.
  const limit = await checkLimit(agencyId, "clients");
  if (!limit.ok) {
    return { ok: false, error: limit.message!, code: "limit" };
  }

  const parsed = clientSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { client, activityId } = await db.$transaction(async (tx) => {
    const created = await tx.client.create({
      data: { agencyId, ...parsed.data },
    });
    const activity = await logActivity(
      {
        agencyId,
        clientId: created.id,
        userId,
        type: "Client Created",
        title: "Client Created",
        description: `Client "${created.name}" was created.`,
      },
      tx,
    );
    return { client: created, activityId: activity.id };
  });

  revalidatePath("/clients");

  await captureServer({
    distinctId: userId,
    event: ANALYTICS_EVENTS.ClientCreated,
    agencyId,
  });

  await runAutomationsForActivity({
    agencyId,
    triggerType: "Client Created",
    activityId,
    clientId: client.id,
  });

  return { ok: true, clientId: client.id };
}

// --- Update --------------------------------------------------------------

export async function updateClient(
  clientId: string,
  input: ClientInput,
): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  const parsed = clientSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Ownership enforced by the agencyId predicate — updateMany returns 0 if the
  // client belongs to another agency or is archived.
  const activityId = await db.$transaction(async (tx) => {
    const { count } = await tx.client.updateMany({
      where: { id: clientId, agencyId, deletedAt: null },
      data: parsed.data,
    });
    if (count === 0) return null;
    const activity = await logActivity(
      {
        agencyId,
        clientId,
        userId,
        type: "Client Updated",
        title: "Client Updated",
        description: `Client details were updated.`,
      },
      tx,
    );
    return activity.id;
  });

  if (!activityId) return { ok: false, error: "Client not found." };

  revalidatePath("/clients");
  revalidatePath(`/clients/${clientId}`);

  await runAutomationsForActivity({ agencyId, triggerType: "Client Updated", activityId, clientId });

  return { ok: true, clientId };
}

// --- Notes ---------------------------------------------------------------

export async function updateNotes(
  clientId: string,
  input: { notes: string },
): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  const parsed = notesSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Notes are too long." };
  }

  const result = await db.$transaction(async (tx) => {
    const { count } = await tx.client.updateMany({
      where: { id: clientId, agencyId, deletedAt: null },
      data: { notes: parsed.data.notes },
    });
    if (count === 0) return false;
    await logActivity(
      {
        agencyId,
        clientId,
        userId,
        type: "Note Added",
        title: "Note Added",
        description: "Notes were updated.",
      },
      tx,
    );
    return true;
  });

  if (!result) return { ok: false, error: "Client not found." };

  revalidatePath(`/clients/${clientId}`);
  return { ok: true, clientId };
}

// --- Archive (soft delete) ----------------------------------------------

export async function archiveClient(clientId: string): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  const result = await db.$transaction(async (tx) => {
    const { count } = await tx.client.updateMany({
      where: { id: clientId, agencyId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
    if (count === 0) return false;
    await logActivity(
      {
        agencyId,
        clientId,
        userId,
        type: "Client Archived",
        title: "Client Archived",
        description: "Client was archived.",
      },
      tx,
    );
    return true;
  });

  if (!result) return { ok: false, error: "Client not found." };

  revalidatePath("/clients");
  return { ok: true, clientId };
}

// --- Restore (reverse archive) ------------------------------------------

/**
 * Restore an archived client (reverse of archiveClient). Clears `deletedAt` so
 * the client reappears in lists. Projects/invoices were never archived with the
 * client (archive only sets the client's own deletedAt), so all related data is
 * already intact and reappears automatically.
 */
export async function restoreClient(clientId: string): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();

  const result = await db.$transaction(async (tx) => {
    const { count } = await tx.client.updateMany({
      where: { id: clientId, agencyId, deletedAt: { not: null } },
      data: { deletedAt: null },
    });
    if (count === 0) return false;
    await logActivity(
      {
        agencyId,
        clientId,
        userId,
        type: "Client Restored",
        title: "Client Restored",
        description: "Client was restored.",
      },
      tx,
    );
    return true;
  });

  if (!result) return { ok: false, error: "Archived client not found." };

  revalidatePath("/clients");
  return { ok: true, clientId };
}
