import "server-only";

import { db } from "@/lib/db";
import { logActivity } from "@/server/activity";
import { generateInvoiceNumber } from "@/server/services/invoice-number";
import type { AutomationActionConfig } from "@/lib/automation-actions";

/**
 * Per-action executors for the Automation Builder. Each function performs the
 * same shape of write + logActivity() as the matching "use server" action
 * (src/server/actions/{clients,projects,invoices}.ts) but as a plain internal
 * function: the automation engine's input is already-trusted config chosen by
 * the agency owner in the builder, not a raw user form submission, so it
 * skips requireAgency()/zod and runs its own small transaction instead of
 * reusing the (already-committed) triggering transaction — mirrors how
 * seed-workspace.ts has its own internal creation logic alongside the public
 * actions rather than calling them.
 */

export interface ExecutionContext {
  agencyId: string;
  automationUserId?: string;
  clientId?: string;
  projectId?: string;
  invoiceId?: string;
  // Scratch state populated as actions run, so later actions in the same
  // automation run can reference entities created earlier in the run.
  lastCreatedClientId?: string;
  lastCreatedProjectId?: string;
  lastCreatedTaskId?: string;
  lastCreatedInvoiceId?: string;
}

export interface ExecResult {
  ok: boolean;
  message: string;
}

function money(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

async function executeCreateClient(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "create_client" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const client = await db.$transaction(async (tx) => {
    const created = await tx.client.create({
      data: { agencyId, name: config.name, company: config.company || null, email: config.email || null },
    });
    await logActivity(
      {
        agencyId,
        clientId: created.id,
        userId: ctx.automationUserId,
        type: "Client Created",
        title: "Client Created",
        description: `Client "${created.name}" was created by an automation.`,
      },
      tx,
    );
    return created;
  });
  ctx.lastCreatedClientId = client.id;
  return { ok: true, message: `Created client "${client.name}".` };
}

async function executeCreateProject(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "create_project" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const clientId = config.useTriggerClient ? ctx.clientId ?? ctx.lastCreatedClientId : ctx.lastCreatedClientId;
  if (!clientId) return { ok: false, message: "No client available for Create Project." };

  const project = await db.$transaction(async (tx) => {
    const created = await tx.project.create({
      data: { agencyId, clientId, name: config.name, status: config.status },
    });
    await logActivity(
      {
        agencyId,
        clientId,
        projectId: created.id,
        userId: ctx.automationUserId,
        type: "Project Created",
        title: "Project Created",
        description: `Project "${created.name}" was created by an automation.`,
      },
      tx,
    );
    return created;
  });
  ctx.lastCreatedProjectId = project.id;
  return { ok: true, message: `Created project "${project.name}".` };
}

async function executeAssignTeamMember(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "assign_team_member" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const taskId = ctx.lastCreatedTaskId;
  if (!taskId) return { ok: false, message: "Assign Team Member needs a task created earlier in this run." };

  const user = await db.user.findFirst({ where: { id: config.userId, agencyId }, select: { id: true, name: true } });
  if (!user) return { ok: false, message: "Selected team member not found." };

  await db.task.update({ where: { id: taskId }, data: { assigneeId: user.id } });
  return { ok: true, message: `Assigned task to ${user.name}.` };
}

async function executeCreateTask(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "create_task" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const projectId = config.useTriggerProject ? ctx.projectId ?? ctx.lastCreatedProjectId : ctx.lastCreatedProjectId;
  if (!projectId) return { ok: false, message: "No project available for Create Task." };

  const task = await db.task.create({
    data: { agencyId, projectId, title: config.title, assigneeId: config.assigneeId || null },
  });
  ctx.lastCreatedTaskId = task.id;
  return { ok: true, message: `Created task "${task.title}".` };
}

async function executeUpdateStatus(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "update_status" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  if (config.entity === "project") {
    const projectId = ctx.projectId ?? ctx.lastCreatedProjectId;
    if (!projectId) return { ok: false, message: "No project available for Update Status." };
    await db.$transaction(async (tx) => {
      await tx.project.updateMany({ where: { id: projectId, agencyId }, data: { status: config.value as never } });
      await logActivity(
        {
          agencyId,
          projectId,
          userId: ctx.automationUserId,
          type: "Status Changed",
          title: "Status Changed",
          description: `Status changed to ${config.value} by an automation.`,
        },
        tx,
      );
    });
    return { ok: true, message: `Project status set to ${config.value}.` };
  }

  const invoiceId = ctx.invoiceId ?? ctx.lastCreatedInvoiceId;
  if (!invoiceId) return { ok: false, message: "No invoice available for Update Status." };
  await db.$transaction(async (tx) => {
    await tx.invoice.updateMany({ where: { id: invoiceId, agencyId }, data: { status: config.value as never } });
    await logActivity(
      {
        agencyId,
        invoiceId,
        userId: ctx.automationUserId,
        type: "Invoice Updated",
        title: "Invoice Updated",
        description: `Invoice status set to ${config.value} by an automation.`,
      },
      tx,
    );
  });
  return { ok: true, message: `Invoice status set to ${config.value}.` };
}

async function executeGenerateInvoice(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "generate_invoice" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const clientId = ctx.clientId ?? ctx.lastCreatedClientId;
  if (!clientId) return { ok: false, message: "No client available for Generate Invoice." };

  const amount = Math.round(config.amount * 100) / 100;
  const invoice = await db.$transaction(async (tx) => {
    const number = await generateInvoiceNumber(agencyId, tx);
    const created = await tx.invoice.create({
      data: {
        agencyId,
        clientId,
        number,
        status: "unpaid",
        total: amount,
        items: { create: [{ agencyId, description: config.description, qty: 1, unitPrice: amount, lineTotal: amount }] },
      },
    });
    await logActivity(
      {
        agencyId,
        clientId,
        invoiceId: created.id,
        userId: ctx.automationUserId,
        type: "Invoice Created",
        title: "Invoice Created",
        description: `Invoice ${created.number} was created by an automation (${money(amount)}).`,
        metadata: { amount, number: created.number },
      },
      tx,
    );
    return created;
  });
  ctx.lastCreatedInvoiceId = invoice.id;
  return { ok: true, message: `Created invoice ${invoice.number} for ${money(amount)}.` };
}

async function executeRecordPayment(agencyId: string, ctx: ExecutionContext): Promise<ExecResult> {
  const invoiceId = ctx.invoiceId ?? ctx.lastCreatedInvoiceId;
  if (!invoiceId) return { ok: false, message: "No invoice available for Record Payment." };

  const result = await db.$transaction(async (tx) => {
    const existing = await tx.invoice.findFirst({
      where: { id: invoiceId, agencyId, deletedAt: null },
      select: { clientId: true, number: true, status: true, total: true },
    });
    if (!existing || existing.status === "paid") return null;

    await tx.invoice.update({ where: { id: invoiceId }, data: { status: "paid" } });
    await logActivity(
      {
        agencyId,
        clientId: existing.clientId,
        invoiceId,
        userId: ctx.automationUserId,
        type: "Invoice Paid",
        title: "Invoice Paid",
        description: `Invoice ${existing.number} was marked paid by an automation.`,
      },
      tx,
    );
    await logActivity(
      {
        agencyId,
        clientId: existing.clientId,
        invoiceId,
        userId: ctx.automationUserId,
        type: "Payment Received",
        title: "Payment Received",
        description: `Payment of ${money(Number(existing.total))} recorded for invoice ${existing.number}.`,
      },
      tx,
    );
    return existing;
  });

  if (!result) return { ok: false, message: "Invoice already paid or not found." };
  return { ok: true, message: `Invoice ${result.number} marked paid.` };
}

async function executeCreateActivity(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "create_activity" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  await logActivity({
    agencyId,
    clientId: ctx.clientId ?? ctx.lastCreatedClientId,
    projectId: ctx.projectId ?? ctx.lastCreatedProjectId,
    invoiceId: ctx.invoiceId ?? ctx.lastCreatedInvoiceId,
    userId: ctx.automationUserId,
    type: "Custom Event",
    title: config.title,
    description: config.description,
  });
  return { ok: true, message: `Logged activity "${config.title}".` };
}

async function executeSendNotification(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "send_notification" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  await logActivity({
    agencyId,
    clientId: ctx.clientId ?? ctx.lastCreatedClientId,
    projectId: ctx.projectId ?? ctx.lastCreatedProjectId,
    invoiceId: ctx.invoiceId ?? ctx.lastCreatedInvoiceId,
    userId: ctx.automationUserId,
    type: "Custom Event",
    title: "Notification",
    description: config.message,
    metadata: { notify: true },
  });
  return { ok: true, message: "Notification posted to the activity feed." };
}

async function executeSendEmail(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "send_email" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const clientId = ctx.clientId ?? ctx.lastCreatedClientId;
  if (!clientId) return { ok: false, message: "No client available for Send Email." };

  const [client, agency] = await Promise.all([
    db.client.findFirst({ where: { id: clientId, agencyId }, select: { email: true } }),
    db.agency.findUnique({ where: { id: agencyId }, select: { name: true } }),
  ]);
  if (!client?.email) return { ok: false, message: "Client has no email on file." };

  const { sendEmailSafe } = await import("@/lib/email");
  await sendEmailSafe("automationNotification", client.email, {
    subject: config.subject,
    message: config.message,
    fromAgency: agency?.name,
  });
  return { ok: true, message: `Email sent to ${client.email}.` };
}

async function executeScheduleMeeting(
  agencyId: string,
  config: Extract<AutomationActionConfig, { type: "schedule_meeting" }>,
  ctx: ExecutionContext,
): Promise<ExecResult> {
  const meetingAt = new Date();
  meetingAt.setDate(meetingAt.getDate() + Math.max(0, config.meetingInDays));

  await logActivity({
    agencyId,
    clientId: ctx.clientId ?? ctx.lastCreatedClientId,
    userId: ctx.automationUserId,
    type: "Meeting Scheduled",
    title: "Meeting Scheduled",
    description: config.title,
    metadata: { meetingAt: meetingAt.toISOString() },
  });
  return { ok: true, message: `Scheduled "${config.title}" for ${meetingAt.toLocaleDateString()}.` };
}

async function executeWebhook(
  config: Extract<AutomationActionConfig, { type: "webhook" }>,
  event: { agencyId: string; triggerType: string; automationId: string },
): Promise<ExecResult> {
  try {
    const res = await fetch(config.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...event, firedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return { ok: false, message: `Webhook responded with status ${res.status}.` };
    return { ok: true, message: `Webhook delivered (${res.status}).` };
  } catch (err) {
    return { ok: false, message: `Webhook failed: ${err instanceof Error ? err.message : "unknown error"}` };
  }
}

/** Dispatch one action config to its executor. */
export async function executeAction(
  agencyId: string,
  config: AutomationActionConfig,
  ctx: ExecutionContext,
  meta: { triggerType: string; automationId: string },
): Promise<ExecResult> {
  switch (config.type) {
    case "create_client":
      return executeCreateClient(agencyId, config, ctx);
    case "create_project":
      return executeCreateProject(agencyId, config, ctx);
    case "assign_team_member":
      return executeAssignTeamMember(agencyId, config, ctx);
    case "create_task":
      return executeCreateTask(agencyId, config, ctx);
    case "update_status":
      return executeUpdateStatus(agencyId, config, ctx);
    case "generate_invoice":
      return executeGenerateInvoice(agencyId, config, ctx);
    case "record_payment":
      return executeRecordPayment(agencyId, ctx);
    case "create_activity":
      return executeCreateActivity(agencyId, config, ctx);
    case "send_notification":
      return executeSendNotification(agencyId, config, ctx);
    case "send_email":
      return executeSendEmail(agencyId, config, ctx);
    case "webhook":
      return executeWebhook(config, { agencyId, ...meta });
    case "schedule_meeting":
      return executeScheduleMeeting(agencyId, config, ctx);
    default:
      return { ok: false, message: `Action type "${(config as { type: string }).type}" is not yet available.` };
  }
}
