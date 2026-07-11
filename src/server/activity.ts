import "server-only";

import type { Activity, Prisma, PrismaClient } from "@prisma/client";

import { db } from "@/lib/db";

/**
 * Human-readable activity types (kept as display strings for consistency with
 * the existing F3/F4/F6 trail and the badge/icon maps that render them). Most
 * events are client-scoped; agency-level events (e.g. "Team Member Invited")
 * omit clientId. This is the full vocabulary rendered by the Unified Client
 * Timeline — see src/lib/activity-categories.ts for how each type maps to a
 * timeline filter category.
 */
export type ActivityType =
  | "Client Created"
  | "Client Updated"
  | "Note Added"
  | "Client Archived"
  | "Client Restored"
  | "Project Created"
  | "Project Updated"
  | "Project Started"
  | "Project Completed"
  | "Project Cancelled"
  | "Status Changed"
  | "Project Archived"
  | "Invoice Created"
  | "Invoice Updated"
  | "Invoice Sent"
  | "Invoice Viewed"
  | "Invoice Paid"
  | "Invoice Unpaid"
  | "Invoice Archived"
  | "Payment Received"
  | "File Uploaded"
  | "Contract Uploaded"
  | "Team Member Invited"
  | "Team Member Joined"
  | "Team Member Removed"
  | "Invite Cancelled"
  | "Meeting Scheduled"
  | "Meeting Completed"
  | "Email Sent"
  | "Portal Comment"
  | "Portal Viewed"
  | "Login Activity"
  | "Custom Event"
  | "Task Completed"
  | "Automation Succeeded"
  | "Automation Failed"
  | "Cost Logged"
  | "Proposal Created"
  | "Proposal Sent"
  | "Proposal Viewed"
  | "Proposal Accepted"
  | "Proposal Rejected"
  | "Proposal Expired"
  | "Proposal Cancelled"
  | "Subscription Created"
  | "Subscription Renewed"
  | "Subscription Failed"
  | "Subscription Auto-Paused"
  | "Timer Started"
  | "Timer Stopped"
  | "Hours Logged"
  | "Workload Changed";

interface LogActivityInput {
  agencyId: string;
  /** Set for client-scoped events; omitted for agency-level events. */
  clientId?: string;
  /** Set for project-scoped events. */
  projectId?: string;
  /** Set for invoice-scoped events. */
  invoiceId?: string;
  /** The user who performed the action, when applicable. */
  userId?: string;
  type: ActivityType;
  /** Short headline for timeline UIs; falls back to `type` when omitted. */
  title?: string;
  description: string;
  /** Structured payload (amount, filename, meeting time, ...) for richer rendering. */
  metadata?: Prisma.InputJsonValue;
}

/** Prisma client or an interactive transaction client. */
type DbClient = PrismaClient | Prisma.TransactionClient;

/**
 * Append a row to the activity trail. Pass a transaction client to record the
 * activity atomically with its triggering mutation. Returns the created row
 * so callers can feed its id into the Automation Builder's engine
 * (runAutomationsForActivity) after the transaction commits.
 */
export async function logActivity(
  input: LogActivityInput,
  client: DbClient = db,
): Promise<Activity> {
  return client.activity.create({ data: input });
}
