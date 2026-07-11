"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { logActivity } from "@/server/activity";
import { runAutomationsForActivity } from "@/server/services/automation-engine";

/**
 * Unauthenticated, token-only actions for the public proposal page
 * (/p/[shareToken]) — mirrors src/server/actions/portal.ts's pattern exactly:
 * resolved by the unguessable shareToken, no session.
 */

const VIEW_THROTTLE_MS = 60 * 60 * 1000; // 1 hour, same throttle as logPortalView

export async function viewProposal(shareToken: string): Promise<void> {
  const proposal = await db.proposal.findFirst({
    where: { shareToken },
    select: { id: true, agencyId: true, clientId: true, status: true, name: true },
  });
  if (!proposal) return;

  const since = new Date(Date.now() - VIEW_THROTTLE_MS);
  const recent = await db.proposalActivity.findFirst({
    where: { proposalId: proposal.id, type: "viewed", createdAt: { gt: since } },
    select: { id: true },
  });
  if (recent) return;

  await db.$transaction(async (tx) => {
    await tx.proposalActivity.create({ data: { agencyId: proposal.agencyId, proposalId: proposal.id, type: "viewed" } });
    if (proposal.status === "sent") {
      await tx.proposal.update({ where: { id: proposal.id }, data: { status: "viewed", viewedAt: new Date() } });
    }
    await logActivity(
      {
        agencyId: proposal.agencyId,
        clientId: proposal.clientId ?? undefined,
        type: "Proposal Viewed",
        title: "Proposal Viewed",
        description: `Proposal "${proposal.name}" was viewed by the client.`,
      },
      tx,
    );
  });
}

const acceptSchema = z.object({ name: z.string().trim().min(1, "Enter your name").max(160) });

export type PublicActionResult = { ok: true } | { ok: false; error: string };

/** Lightweight acceptance record (typed name + timestamp) — not a legal e-signature product. */
export async function acceptProposal(shareToken: string, input: { name: string }): Promise<PublicActionResult> {
  const parsed = acceptSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Enter your name to accept." };

  const proposal = await db.proposal.findFirst({
    where: { shareToken },
    select: { id: true, agencyId: true, clientId: true, name: true, status: true },
  });
  if (!proposal) return { ok: false, error: "Proposal not found." };
  if (["accepted", "rejected", "cancelled", "expired"].includes(proposal.status)) {
    return { ok: false, error: "This proposal can no longer be accepted." };
  }

  const activityId = await db.$transaction(async (tx) => {
    await tx.proposal.update({
      where: { id: proposal.id },
      data: { status: "accepted", acceptedByName: parsed.data.name, acceptedAt: new Date() },
    });
    await tx.proposalActivity.create({
      data: { agencyId: proposal.agencyId, proposalId: proposal.id, type: "accepted", metadata: { name: parsed.data.name } },
    });
    const activity = await logActivity(
      {
        agencyId: proposal.agencyId,
        clientId: proposal.clientId ?? undefined,
        type: "Proposal Accepted",
        title: "Proposal Accepted",
        description: `${parsed.data.name} accepted proposal "${proposal.name}".`,
      },
      tx,
    );
    return activity.id;
  });

  await runAutomationsForActivity({
    agencyId: proposal.agencyId,
    triggerType: "Proposal Accepted",
    activityId,
    clientId: proposal.clientId ?? undefined,
  });

  revalidatePath(`/p/${shareToken}`);
  return { ok: true };
}

const rejectSchema = z.object({ reason: z.string().trim().max(2000).optional() });

export async function rejectProposal(shareToken: string, input: { reason?: string }): Promise<PublicActionResult> {
  const parsed = rejectSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid request." };

  const proposal = await db.proposal.findFirst({
    where: { shareToken },
    select: { id: true, agencyId: true, clientId: true, name: true, status: true },
  });
  if (!proposal) return { ok: false, error: "Proposal not found." };
  if (["accepted", "rejected", "cancelled", "expired"].includes(proposal.status)) {
    return { ok: false, error: "This proposal can no longer be rejected." };
  }

  const activityId = await db.$transaction(async (tx) => {
    await tx.proposal.update({
      where: { id: proposal.id },
      data: { status: "rejected", rejectedReason: parsed.data.reason || null, rejectedAt: new Date() },
    });
    await tx.proposalActivity.create({
      data: { agencyId: proposal.agencyId, proposalId: proposal.id, type: "rejected", metadata: { reason: parsed.data.reason ?? null } },
    });
    const activity = await logActivity(
      {
        agencyId: proposal.agencyId,
        clientId: proposal.clientId ?? undefined,
        type: "Proposal Rejected",
        title: "Proposal Rejected",
        description: `Proposal "${proposal.name}" was rejected.${parsed.data.reason ? ` Reason: ${parsed.data.reason}` : ""}`,
      },
      tx,
    );
    return activity.id;
  });

  await runAutomationsForActivity({
    agencyId: proposal.agencyId,
    triggerType: "Proposal Rejected",
    activityId,
    clientId: proposal.clientId ?? undefined,
  });

  revalidatePath(`/p/${shareToken}`);
  return { ok: true };
}

const commentSchema = z.object({
  author: z.string().trim().min(1, "Name is required").max(120),
  message: z.string().trim().min(1, "Comment is required").max(2000),
});

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/** Reuses the same DB-count rate-limit pattern as src/server/actions/portal.ts's addPortalComment. */
export async function commentOnProposal(shareToken: string, input: { author: string; message: string }): Promise<PublicActionResult> {
  const parsed = commentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields." };
  }

  const proposal = await db.proposal.findFirst({
    where: { shareToken },
    select: { id: true, agencyId: true, clientId: true, name: true, status: true },
  });
  if (!proposal) return { ok: false, error: "Proposal not found." };
  if (["accepted", "rejected", "expired", "cancelled"].includes(proposal.status)) {
    return { ok: false, error: "This proposal is closed to new comments." };
  }

  const since = new Date(Date.now() - RATE_WINDOW_MS);
  const recentCount = await db.proposalActivity.count({
    where: { proposalId: proposal.id, type: "commented", createdAt: { gt: since } },
  });
  if (recentCount >= RATE_LIMIT) {
    return { ok: false, error: "You're posting too quickly. Please wait a few minutes and try again." };
  }

  await db.$transaction(async (tx) => {
    await tx.proposalActivity.create({
      data: {
        agencyId: proposal.agencyId,
        proposalId: proposal.id,
        type: "commented",
        metadata: { author: parsed.data.author, message: parsed.data.message },
      },
    });
    await logActivity(
      {
        agencyId: proposal.agencyId,
        clientId: proposal.clientId ?? undefined,
        type: "Custom Event",
        title: "Proposal Comment",
        description: `${parsed.data.author} commented on proposal "${proposal.name}".`,
      },
      tx,
    );
  });

  revalidatePath(`/p/${shareToken}`);
  return { ok: true };
}
