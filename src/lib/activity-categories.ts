import type { ActivityType } from "@/server/activity";

/**
 * Single source of truth mapping each ActivityType to one timeline filter
 * category. Reused by the timeline filter bar (category -> types, for the
 * Prisma `where`) and available to any future icon/label lookups. New ERP
 * modules add their ActivityTypes here rather than inventing a parallel
 * categorization scheme.
 */
export const TIMELINE_CATEGORIES = [
  "all",
  "project",
  "invoice",
  "payment",
  "file",
  "meeting",
  "note",
  "email",
  "team",
  "task",
  "automation",
  "proposal",
  "subscription",
  "time",
  "system",
] as const;

export type TimelineCategory = (typeof TIMELINE_CATEGORIES)[number];

export const TIMELINE_CATEGORY_LABEL: Record<TimelineCategory, string> = {
  all: "All",
  project: "Projects",
  invoice: "Invoices",
  payment: "Payments",
  file: "Files",
  meeting: "Meetings",
  note: "Notes",
  email: "Emails",
  team: "Team",
  task: "Tasks",
  automation: "Automations",
  proposal: "Proposals",
  subscription: "Subscriptions",
  time: "Time",
  system: "System",
};

const ACTIVITY_CATEGORY: Record<ActivityType, Exclude<TimelineCategory, "all">> = {
  "Client Created": "system",
  "Client Updated": "system",
  "Client Archived": "system",
  "Client Restored": "system",
  "Note Added": "note",
  "Project Created": "project",
  "Project Updated": "project",
  "Project Started": "project",
  "Project Completed": "project",
  "Project Cancelled": "project",
  "Status Changed": "project",
  "Project Archived": "project",
  "Invoice Created": "invoice",
  "Invoice Updated": "invoice",
  "Invoice Sent": "invoice",
  "Invoice Viewed": "invoice",
  "Invoice Paid": "payment",
  "Invoice Unpaid": "invoice",
  "Invoice Archived": "invoice",
  "Payment Received": "payment",
  "File Uploaded": "file",
  "Contract Uploaded": "file",
  "Team Member Invited": "team",
  "Team Member Joined": "team",
  "Team Member Removed": "team",
  "Invite Cancelled": "team",
  "Meeting Scheduled": "meeting",
  "Meeting Completed": "meeting",
  "Email Sent": "email",
  "Portal Comment": "note",
  "Portal Viewed": "system",
  "Login Activity": "system",
  "Custom Event": "system",
  "Task Completed": "task",
  "Automation Succeeded": "automation",
  "Automation Failed": "automation",
  "Cost Logged": "payment",
  "Proposal Created": "proposal",
  "Proposal Sent": "proposal",
  "Proposal Viewed": "proposal",
  "Proposal Accepted": "proposal",
  "Proposal Rejected": "proposal",
  "Proposal Expired": "proposal",
  "Proposal Cancelled": "proposal",
  "Subscription Created": "subscription",
  "Subscription Renewed": "subscription",
  "Subscription Failed": "subscription",
  "Subscription Auto-Paused": "subscription",
  "Timer Started": "time",
  "Timer Stopped": "time",
  "Hours Logged": "time",
  "Workload Changed": "time",
};

/** Every stored `type` string that belongs to a given timeline category. */
export function typesForCategory(category: TimelineCategory): string[] {
  if (category === "all") return Object.keys(ACTIVITY_CATEGORY);
  return Object.entries(ACTIVITY_CATEGORY)
    .filter(([, cat]) => cat === category)
    .map(([type]) => type);
}

export function categoryForType(type: string): TimelineCategory {
  return (ACTIVITY_CATEGORY as Record<string, TimelineCategory>)[type] ?? "system";
}
