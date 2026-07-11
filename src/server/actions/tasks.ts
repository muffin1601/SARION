"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { requireAgency } from "@/server/auth-context";
import { runAutomationsForActivity } from "@/server/services/automation-engine";

/**
 * Minimal task CRUD — previously Task rows existed only as counts (dashboard,
 * health score) with no way to create or complete one anywhere in the app.
 * Added alongside the Automation Builder since "Task Completed" is a
 * requested trigger and "Assign Team Member" needs a real task to assign.
 */

const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  projectId: z.string().trim().min(1),
  assigneeId: z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().trim().nullable().optional(),
  ),
});

export type TaskInput = z.input<typeof taskSchema>;

export type ActionResult = { ok: true; taskId: string } | { ok: false; error: string };

async function assertProjectOwned(agencyId: string, projectId: string) {
  const project = await db.project.findFirst({
    where: { id: projectId, agencyId, deletedAt: null },
    select: { id: true },
  });
  return Boolean(project);
}

export async function createTask(input: TaskInput): Promise<ActionResult> {
  const { agencyId } = await requireAgency();

  const parsed = taskSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid task." };
  }
  if (!(await assertProjectOwned(agencyId, parsed.data.projectId))) {
    return { ok: false, error: "Project not found." };
  }

  const task = await db.task.create({
    data: {
      agencyId,
      projectId: parsed.data.projectId,
      title: parsed.data.title,
      assigneeId: parsed.data.assigneeId ?? null,
    },
  });

  revalidatePath(`/projects/${parsed.data.projectId}`);
  return { ok: true, taskId: task.id };
}

export type ToggleResult = { ok: true; isDone: boolean } | { ok: false; error: string };

/** Flip a task's done state. Firing "Task Completed" + automations only happens on false→true. */
export async function toggleTask(taskId: string): Promise<ToggleResult> {
  const { agencyId, userId } = await requireAgency();

  const existing = await db.task.findFirst({
    where: { id: taskId, agencyId },
    select: { isDone: true, title: true, projectId: true, project: { select: { clientId: true } } },
  });
  if (!existing) return { ok: false, error: "Task not found." };

  const nextIsDone = !existing.isDone;
  await db.task.update({ where: { id: taskId }, data: { isDone: nextIsDone } });

  if (nextIsDone) {
    const activity = await db.$transaction(async (tx) => {
      const created = await tx.activity.create({
        data: {
          agencyId,
          clientId: existing.project.clientId,
          projectId: existing.projectId,
          userId,
          type: "Task Completed",
          title: "Task Completed",
          description: `Task "${existing.title}" was marked done.`,
        },
      });
      return created;
    });

    await runAutomationsForActivity({
      agencyId,
      triggerType: "Task Completed",
      activityId: activity.id,
      clientId: existing.project.clientId,
      projectId: existing.projectId,
    });
  }

  revalidatePath(`/projects/${existing.projectId}`);
  return { ok: true, isDone: nextIsDone };
}
