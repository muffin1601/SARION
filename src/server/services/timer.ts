import "server-only";

import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { logActivity } from "@/server/activity";
import { runAutomationsForActivity } from "@/server/services/automation-engine";

/**
 * Timer lifecycle — one active TimerSession per user, enforced here.
 * Stop converts the session into a real TimeEntry and deletes the session row.
 * Never called mid-transaction of anything else, same safety rule as the
 * automation engine: automations fire only after the owning transaction commits.
 */

export type TimerResult =
  | { ok: true; sessionId?: string; entryId?: string }
  | { ok: false; error: string };

async function assertProjectOwned(agencyId: string, projectId: string) {
  return db.project.findFirst({ where: { id: projectId, agencyId, deletedAt: null }, select: { id: true, clientId: true } });
}

export async function startTimer(
  agencyId: string,
  userId: string,
  input: { projectId: string; taskId?: string | null; description?: string | null },
): Promise<TimerResult> {
  const project = await assertProjectOwned(agencyId, input.projectId);
  if (!project) return { ok: false, error: "Project not found." };

  // No findFirst-then-create: the @@unique([agencyId, userId]) constraint on
  // TimerSession is the sole source of truth, so concurrent starts (double
  // click, two tabs, a retried request) race on the DB instead of on this
  // process, and only one can ever win.
  let session;
  try {
    session = await db.timerSession.create({
      data: {
        agencyId,
        userId,
        projectId: input.projectId,
        taskId: input.taskId ?? null,
        description: input.description ?? null,
        startedAt: new Date(),
        status: "running",
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { ok: false, error: "You already have a running timer. Stop it before starting a new one." };
    }
    throw err;
  }

  const activity = await logActivity({
    agencyId,
    clientId: project.clientId,
    projectId: input.projectId,
    userId,
    type: "Timer Started",
    title: "Timer Started",
    description: input.description ? `Timer started: ${input.description}` : "Timer started.",
  });
  await runAutomationsForActivity({ agencyId, triggerType: "Timer Started", activityId: activity.id, clientId: project.clientId, projectId: input.projectId });

  return { ok: true, sessionId: session.id };
}

export async function pauseTimer(agencyId: string, userId: string): Promise<TimerResult> {
  const session = await db.timerSession.findFirst({ where: { agencyId, userId } });
  if (!session) return { ok: false, error: "No active timer." };
  if (session.status === "paused") return { ok: true, sessionId: session.id };

  const elapsed = Math.floor((Date.now() - session.startedAt.getTime()) / 1000);
  await db.timerSession.update({
    where: { id: session.id },
    data: { status: "paused", pausedAt: new Date(), accumulatedSeconds: session.accumulatedSeconds + elapsed },
  });
  return { ok: true, sessionId: session.id };
}

export async function resumeTimer(agencyId: string, userId: string): Promise<TimerResult> {
  const session = await db.timerSession.findFirst({ where: { agencyId, userId } });
  if (!session) return { ok: false, error: "No active timer." };
  if (session.status === "running") return { ok: true, sessionId: session.id };

  await db.timerSession.update({
    where: { id: session.id },
    data: { status: "running", pausedAt: null, startedAt: new Date() },
  });
  return { ok: true, sessionId: session.id };
}

export async function stopTimer(
  agencyId: string,
  userId: string,
  input: { billable?: boolean; billableRate?: number | null },
): Promise<TimerResult> {
  const session = await db.timerSession.findFirst({ where: { agencyId, userId } });
  if (!session) return { ok: false, error: "No active timer." };

  const project = await db.project.findFirst({ where: { id: session.projectId, agencyId }, select: { clientId: true } });
  if (!project) return { ok: false, error: "Project no longer exists." };

  const user = await db.user.findUnique({ where: { id: userId }, select: { hourlyCostRate: true } });

  const additionalSeconds = session.status === "running" ? Math.floor((Date.now() - session.startedAt.getTime()) / 1000) : 0;
  const totalSeconds = session.accumulatedSeconds + additionalSeconds;
  const durationMinutes = Math.max(1, Math.round(totalSeconds / 60));
  const startedAt = new Date(Date.now() - totalSeconds * 1000);

  const { entry, weeklyHoursBefore, weeklyHoursAfter, capacityHours } = await db.$transaction(async (tx) => {
    const created = await tx.timeEntry.create({
      data: {
        agencyId,
        userId,
        projectId: session.projectId,
        clientId: project.clientId,
        taskId: session.taskId,
        description: session.description,
        startedAt,
        endedAt: new Date(),
        durationMinutes,
        billable: input.billable ?? true,
        billableRate: input.billableRate ?? null,
        costRate: user?.hourlyCostRate ?? null,
      },
    });
    await tx.timerSession.delete({ where: { id: session.id } });

    const capacity = (await tx.user.findUnique({ where: { id: userId }, select: { weeklyCapacityHours: true } }))?.weeklyCapacityHours ?? 40;
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    weekStart.setHours(0, 0, 0, 0);
    const weeklyAgg = await tx.timeEntry.aggregate({
      where: { agencyId, userId, startedAt: { gte: weekStart } },
      _sum: { durationMinutes: true },
    });
    const weeklyMinutesAfter = weeklyAgg._sum.durationMinutes ?? 0;
    const weeklyHoursAfter = weeklyMinutesAfter / 60;
    const weeklyHoursBefore = (weeklyMinutesAfter - durationMinutes) / 60;

    return { entry: created, weeklyHoursBefore, weeklyHoursAfter, capacityHours: capacity };
  });

  const activity = await logActivity({
    agencyId,
    clientId: project.clientId,
    projectId: session.projectId,
    userId,
    type: "Hours Logged",
    title: "Hours Logged",
    description: `Logged ${(durationMinutes / 60).toFixed(2)}h on ${session.description || "a project"}.`,
    metadata: { durationMinutes, billable: entry.billable },
  });
  await runAutomationsForActivity({ agencyId, triggerType: "Hours Logged", activityId: activity.id, clientId: project.clientId, projectId: session.projectId });

  await logActivity({
    agencyId,
    clientId: project.clientId,
    projectId: session.projectId,
    userId,
    type: "Timer Stopped",
    title: "Timer Stopped",
    description: `Timer stopped after ${(durationMinutes / 60).toFixed(2)}h.`,
  }).then((stopActivity) =>
    runAutomationsForActivity({ agencyId, triggerType: "Timer Stopped", activityId: stopActivity.id, clientId: project.clientId, projectId: session.projectId }),
  );

  if (weeklyHoursBefore <= capacityHours && weeklyHoursAfter > capacityHours) {
    await logActivity({
      agencyId,
      userId,
      type: "Workload Changed",
      title: "Workload Changed",
      description: `Weekly logged hours crossed capacity (${weeklyHoursAfter.toFixed(1)}h / ${capacityHours}h).`,
    });
  }

  return { ok: true, entryId: entry.id };
}
