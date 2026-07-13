"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAgency } from "@/server/auth-context";
import { logActivity } from "@/server/activity";
import { runAutomationsForActivity } from "@/server/services/automation-engine";
import { startTimer, pauseTimer, resumeTimer, stopTimer, type TimerResult } from "@/server/services/timer";

export type ActionResult = { ok: true } | { ok: false; error: string };
export type StartResult = { ok: true; sessionId: string } | { ok: false; error: string };
export type StopResult = { ok: true; entryId: string } | { ok: false; error: string };

export async function startTimerAction(input: { projectId: string; taskId?: string | null; description?: string | null }): Promise<StartResult> {
  const { agencyId, userId } = await requireAgency();
  const result = await startTimer(agencyId, userId, input);
  revalidatePath("/time");
  if (!result.ok) return result;
  return { ok: true, sessionId: result.sessionId! };
}

export async function pauseTimerAction(): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();
  const result: TimerResult = await pauseTimer(agencyId, userId);
  revalidatePath("/time");
  return result.ok ? { ok: true } : result;
}

export async function resumeTimerAction(): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();
  const result: TimerResult = await resumeTimer(agencyId, userId);
  revalidatePath("/time");
  return result.ok ? { ok: true } : result;
}

export async function stopTimerAction(input: { billable?: boolean; billableRate?: number | null }): Promise<StopResult> {
  const { agencyId, userId } = await requireAgency();
  const result = await stopTimer(agencyId, userId, input);
  revalidatePath("/time");
  revalidatePath("/dashboard");
  revalidatePath("/finance");
  revalidatePath("/reports");
  if (!result.ok) return result;
  return { ok: true, entryId: result.entryId! };
}

const emptyToNull = (v: unknown) => (typeof v === "string" && v.trim() === "" ? null : v);

const manualEntrySchema = z.object({
  projectId: z.string().trim().min(1, "Project is required"),
  taskId: z.preprocess(emptyToNull, z.string().trim().nullable().optional()),
  description: z.preprocess(emptyToNull, z.string().trim().max(500).nullable()),
  startedAt: z.preprocess((v) => (typeof v === "string" ? new Date(v) : v), z.date({ message: "A valid start time is required" })),
  durationMinutes: z.coerce.number().int().positive("Duration must be greater than 0").max(24 * 60),
  billable: z.coerce.boolean().default(true),
  billableRate: z.preprocess((v) => (v === "" || v === undefined || v === null ? null : v), z.coerce.number().nonnegative().nullable()),
});

export interface ManualEntryInput {
  projectId: string;
  taskId?: string | null;
  description?: string | null;
  startedAt: string;
  durationMinutes: number | string;
  billable?: boolean;
  billableRate?: number | string | null;
}

export type EntryResult = { ok: true; entryId: string } | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

async function assertProjectOwned(agencyId: string, projectId: string) {
  return db.project.findFirst({ where: { id: projectId, agencyId, deletedAt: null }, select: { id: true, clientId: true } });
}

export async function createManualTimeEntry(input: ManualEntryInput): Promise<EntryResult> {
  const { agencyId, userId } = await requireAgency();
  const parsed = manualEntrySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const project = await assertProjectOwned(agencyId, parsed.data.projectId);
  if (!project) return { ok: false, error: "Project not found." };

  const user = await db.user.findUnique({ where: { id: userId }, select: { hourlyCostRate: true } });
  const endedAt = new Date(parsed.data.startedAt.getTime() + parsed.data.durationMinutes * 60 * 1000);

  const entry = await db.timeEntry.create({
    data: {
      agencyId,
      userId,
      projectId: parsed.data.projectId,
      clientId: project.clientId,
      taskId: parsed.data.taskId ?? null,
      description: parsed.data.description,
      startedAt: parsed.data.startedAt,
      endedAt,
      durationMinutes: parsed.data.durationMinutes,
      billable: parsed.data.billable,
      billableRate: parsed.data.billableRate,
      costRate: user?.hourlyCostRate ?? null,
    },
  });

  const activity = await logActivity({
    agencyId,
    clientId: project.clientId,
    projectId: parsed.data.projectId,
    userId,
    type: "Hours Logged",
    title: "Hours Logged",
    description: `Logged ${(parsed.data.durationMinutes / 60).toFixed(2)}h manually.`,
    metadata: { durationMinutes: parsed.data.durationMinutes, billable: parsed.data.billable },
  });
  await runAutomationsForActivity({ agencyId, triggerType: "Hours Logged", activityId: activity.id, clientId: project.clientId, projectId: parsed.data.projectId });

  revalidatePath("/time");
  revalidatePath("/dashboard");
  revalidatePath("/finance");
  revalidatePath("/reports");
  return { ok: true, entryId: entry.id };
}

export async function updateTimeEntry(entryId: string, input: ManualEntryInput): Promise<EntryResult> {
  const { agencyId, userId } = await requireAgency();
  const parsed = manualEntrySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fix the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const existing = await db.timeEntry.findFirst({ where: { id: entryId, agencyId }, select: { id: true, userId: true } });
  if (!existing) return { ok: false, error: "Time entry not found." };
  if (existing.userId !== userId) return { ok: false, error: "You can only edit your own time entries." };

  const project = await assertProjectOwned(agencyId, parsed.data.projectId);
  if (!project) return { ok: false, error: "Project not found." };

  const endedAt = new Date(parsed.data.startedAt.getTime() + parsed.data.durationMinutes * 60 * 1000);

  await db.timeEntry.update({
    where: { id: entryId },
    data: {
      projectId: parsed.data.projectId,
      clientId: project.clientId,
      taskId: parsed.data.taskId ?? null,
      description: parsed.data.description,
      startedAt: parsed.data.startedAt,
      endedAt,
      durationMinutes: parsed.data.durationMinutes,
      billable: parsed.data.billable,
      billableRate: parsed.data.billableRate,
    },
  });

  revalidatePath("/time");
  revalidatePath("/dashboard");
  revalidatePath("/finance");
  revalidatePath("/reports");
  return { ok: true, entryId };
}

export async function deleteTimeEntry(entryId: string): Promise<ActionResult> {
  const { agencyId, userId } = await requireAgency();
  const existing = await db.timeEntry.findFirst({ where: { id: entryId, agencyId }, select: { id: true, userId: true } });
  if (!existing) return { ok: false, error: "Time entry not found." };
  if (existing.userId !== userId) return { ok: false, error: "You can only delete your own time entries." };

  await db.timeEntry.delete({ where: { id: entryId } });
  revalidatePath("/time");
  revalidatePath("/dashboard");
  revalidatePath("/finance");
  revalidatePath("/reports");
  return { ok: true };
}
