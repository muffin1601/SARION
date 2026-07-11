import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CalendarClock,
  CircleDollarSign,
  FileText,
  FolderPlus,
  ListChecks,
  Mail,
  Plug,
  RefreshCcw,
  Sparkles,
  UserCheck,
  UserPlus,
  Webhook,
} from "lucide-react";

/**
 * Action catalog + per-type config shapes for the Automation Builder. Real
 * (executable) types have a matching function in
 * src/server/services/automation-action-executors.ts. Coming-soon types are
 * shown in the picker (matching the full requested action list) but are
 * disabled — there is no document-generation or generic external-API
 * capability in SARION yet, so nothing here ever pretends to run.
 */

export const AUTOMATION_ACTION_TYPES = [
  "create_client",
  "create_project",
  "assign_team_member",
  "create_task",
  "update_status",
  "generate_invoice",
  "record_payment",
  "create_activity",
  "send_notification",
  "send_email",
  "webhook",
  "schedule_meeting",
  "generate_contract",
  "generate_proposal",
  "future_api_action",
] as const;

export type AutomationActionType = (typeof AUTOMATION_ACTION_TYPES)[number];

export interface AutomationActionCatalogEntry {
  type: AutomationActionType;
  label: string;
  description: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

export const AUTOMATION_ACTION_CATALOG: AutomationActionCatalogEntry[] = [
  { type: "create_client", label: "Create Client", description: "Add a new client.", icon: UserPlus },
  { type: "create_project", label: "Create Project", description: "Start a new project.", icon: FolderPlus },
  {
    type: "assign_team_member",
    label: "Assign Team Member",
    description: "Assign the most recently created task in this run to a team member.",
    icon: UserCheck,
  },
  { type: "create_task", label: "Create Task", description: "Add a task to a project.", icon: ListChecks },
  { type: "update_status", label: "Update Status", description: "Change a project's or invoice's status.", icon: RefreshCcw },
  { type: "generate_invoice", label: "Generate Invoice", description: "Create a new invoice for the client.", icon: FileText },
  { type: "record_payment", label: "Record Payment", description: "Mark the triggering invoice as paid.", icon: CircleDollarSign },
  { type: "create_activity", label: "Create Activity", description: "Log a custom entry on the timeline.", icon: Sparkles },
  { type: "send_notification", label: "Send Notification", description: "Post an in-app notification to the activity feed.", icon: Bell },
  { type: "send_email", label: "Send Email", description: "Email the client.", icon: Mail },
  { type: "webhook", label: "Webhook", description: "POST the event to an external URL.", icon: Webhook },
  { type: "schedule_meeting", label: "Schedule Meeting", description: "Log a meeting on the client's timeline.", icon: CalendarClock },
  { type: "generate_contract", label: "Generate Contract", description: "Coming soon.", icon: FileText, comingSoon: true },
  { type: "generate_proposal", label: "Generate Proposal", description: "Coming soon.", icon: FileText, comingSoon: true },
  { type: "future_api_action", label: "Future API Action", description: "Coming soon.", icon: Plug, comingSoon: true },
];

export function actionCatalogEntry(type: string): AutomationActionCatalogEntry | undefined {
  return AUTOMATION_ACTION_CATALOG.find((a) => a.type === type);
}

// --- Per-type action config shapes -----------------------------------------

export interface CreateClientActionConfig {
  type: "create_client";
  name: string;
  company?: string;
  email?: string;
}

export interface CreateProjectActionConfig {
  type: "create_project";
  name: string;
  status: "PLANNED" | "ACTIVE" | "COMPLETED" | "ON_HOLD";
  /** Use the client from the triggering event when omitted. */
  useTriggerClient: boolean;
}

export interface AssignTeamMemberActionConfig {
  type: "assign_team_member";
  userId: string;
}

export interface CreateTaskActionConfig {
  type: "create_task";
  title: string;
  assigneeId?: string;
  /** Use the project from the triggering event when omitted. */
  useTriggerProject: boolean;
}

export interface UpdateStatusActionConfig {
  type: "update_status";
  entity: "project" | "invoice";
  value: string;
}

export interface GenerateInvoiceActionConfig {
  type: "generate_invoice";
  description: string;
  amount: number;
}

export interface RecordPaymentActionConfig {
  type: "record_payment";
}

export interface CreateActivityActionConfig {
  type: "create_activity";
  title: string;
  description: string;
}

export interface SendNotificationActionConfig {
  type: "send_notification";
  message: string;
}

export interface SendEmailActionConfig {
  type: "send_email";
  subject: string;
  message: string;
}

export interface WebhookActionConfig {
  type: "webhook";
  url: string;
}

export interface ScheduleMeetingActionConfig {
  type: "schedule_meeting";
  title: string;
  meetingInDays: number;
}

export type AutomationActionConfig =
  | CreateClientActionConfig
  | CreateProjectActionConfig
  | AssignTeamMemberActionConfig
  | CreateTaskActionConfig
  | UpdateStatusActionConfig
  | GenerateInvoiceActionConfig
  | RecordPaymentActionConfig
  | CreateActivityActionConfig
  | SendNotificationActionConfig
  | SendEmailActionConfig
  | WebhookActionConfig
  | ScheduleMeetingActionConfig;

export function defaultActionConfig(type: AutomationActionType): AutomationActionConfig {
  switch (type) {
    case "create_client":
      return { type: "create_client", name: "" };
    case "create_project":
      return { type: "create_project", name: "", status: "PLANNED", useTriggerClient: true };
    case "assign_team_member":
      return { type: "assign_team_member", userId: "" };
    case "create_task":
      return { type: "create_task", title: "", useTriggerProject: true };
    case "update_status":
      return { type: "update_status", entity: "project", value: "ACTIVE" };
    case "generate_invoice":
      return { type: "generate_invoice", description: "", amount: 0 };
    case "record_payment":
      return { type: "record_payment" };
    case "create_activity":
      return { type: "create_activity", title: "", description: "" };
    case "send_notification":
      return { type: "send_notification", message: "" };
    case "send_email":
      return { type: "send_email", subject: "", message: "" };
    case "webhook":
      return { type: "webhook", url: "" };
    case "schedule_meeting":
      return { type: "schedule_meeting", title: "", meetingInDays: 3 };
    default:
      throw new Error(`No default config for action type "${type}"`);
  }
}
