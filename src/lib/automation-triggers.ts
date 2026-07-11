/**
 * Single source of truth for automation trigger types. Each value (other than
 * "MANUAL") is exactly one of the existing ActivityType strings emitted by
 * logActivity() (src/server/activity.ts) — the automation engine listens on
 * the same event stream the Unified Timeline and Business Command Center
 * already read from, so adding a trigger never means inventing a new event
 * bus. New ERP-module triggers register here + get an executor in
 * src/server/services/automation-action-executors.ts — no schema change.
 */

export const MANUAL_TRIGGER = "MANUAL" as const;

export interface AutomationTrigger {
  value: string;
  label: string;
  description: string;
}

export const AUTOMATION_TRIGGERS: AutomationTrigger[] = [
  { value: "Client Created", label: "Client Created", description: "A new client is added." },
  { value: "Client Updated", label: "Client Updated", description: "A client's details change." },
  { value: "Project Created", label: "Project Created", description: "A new project is created." },
  { value: "Project Completed", label: "Project Completed", description: "A project's status changes to Completed." },
  { value: "Invoice Created", label: "Invoice Created", description: "A new invoice is created." },
  { value: "Invoice Sent", label: "Invoice Sent", description: "An invoice is emailed to a client." },
  { value: "Invoice Paid", label: "Invoice Paid", description: "An invoice is marked paid." },
  { value: "Payment Received", label: "Payment Received", description: "A payment is recorded against an invoice." },
  { value: "Task Completed", label: "Task Completed", description: "A task is marked done." },
  { value: "Meeting Scheduled", label: "Meeting Created", description: "A meeting is logged." },
  { value: "Portal Viewed", label: "Portal Login", description: "A client opens their portal." },
  { value: "Proposal Accepted", label: "Proposal Accepted", description: "A client accepts a proposal." },
  { value: "Proposal Rejected", label: "Proposal Rejected", description: "A client rejects a proposal." },
  { value: "Subscription Renewed", label: "Subscription Renewed", description: "A recurring invoice is generated." },
  { value: "Subscription Failed", label: "Subscription Failed", description: "A recurring billing attempt fails." },
  { value: "Subscription Auto-Paused", label: "Subscription Auto-Paused", description: "A subscription is paused after repeated billing failures." },
  { value: "Timer Started", label: "Timer Started", description: "A team member starts a timer." },
  { value: "Timer Stopped", label: "Timer Stopped", description: "A team member stops a timer." },
  { value: "Hours Logged", label: "Time Entry Created", description: "A time entry is logged (timer or manual)." },
  { value: MANUAL_TRIGGER, label: "Manual Trigger", description: "Run this automation on demand." },
];

export function triggerLabel(value: string): string {
  return AUTOMATION_TRIGGERS.find((t) => t.value === value)?.label ?? value;
}

export function isKnownTrigger(value: string): boolean {
  return AUTOMATION_TRIGGERS.some((t) => t.value === value);
}

// Triggers that fire from money-moving events. Automations on these triggers
// are restricted to the agency owner (see src/server/actions/automations.ts)
// since their actions (e.g. auto-sending invoices/reminders) have direct
// financial and client-facing consequences.
const BILLING_TRIGGERS = new Set<string>([
  "Invoice Created",
  "Invoice Sent",
  "Invoice Paid",
  "Payment Received",
  "Subscription Renewed",
  "Subscription Failed",
  "Subscription Auto-Paused",
]);

export function isBillingTrigger(value: string): boolean {
  return BILLING_TRIGGERS.has(value);
}
