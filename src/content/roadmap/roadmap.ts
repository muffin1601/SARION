import type { RoadmapItem } from "./types";

/**
 * Honesty rule: only genuinely shipped, live product capabilities are
 * marked "shipped" (cross-checked against the real feature list in
 * softwareApplicationSchema()). Everything else is explicitly planned or
 * exploratory language — never implied as already built.
 */
export const ROADMAP_ITEMS: RoadmapItem[] = [
  // Shipped — real, live today.
  { title: "Client management (CRM)", status: "shipped", area: "crm", description: "Client records, notes, and history in one place." },
  { title: "Project & task tracking", status: "shipped", area: "crm", description: "Status and due dates tied to each client." },
  { title: "Invoicing", status: "shipped", area: "crm", description: "Paid, unpaid, and overdue invoices tracked per client." },
  { title: "Branded client portal", status: "shipped", area: "portal", description: "A branded space where clients see progress and invoices." },
  { title: "Team collaboration", status: "shipped", area: "crm", description: "Scoped team member access per agency." },

  // Now — in active development.
  { title: "Portal comment threads polish", status: "now", area: "portal", description: "Refining client-facing comments and file sharing inside the portal." },
  { title: "Overdue invoice reminders", status: "now", area: "automation", description: "Automatic surfacing of overdue invoices without manual tracking." },

  // Next — planned, not yet started.
  { title: "Mobile-responsive portal improvements", status: "next", area: "mobile", description: "A smoother client portal experience on phones and tablets — not a native app." },
  { title: "Webhook support", status: "next", area: "automation", description: "Let external tools react to events happening inside Sarion." },
  { title: "AI-assisted status update drafts", status: "next", area: "ai", description: "Draft a client status update from recent project activity, for a human to review and send." },

  // Later — exploring, not committed.
  { title: "Native mobile app", status: "later", area: "mobile", description: "Exploring a dedicated iOS/Android app — not yet scoped or committed." },
  { title: "AI meeting-notes summarization", status: "later", area: "ai", description: "Exploring turning raw meeting notes into a structured summary automatically." },
  { title: "Automation rules engine", status: "later", area: "automation", description: "Exploring configurable if-this-then-that rules for recurring agency workflows." },
  { title: "Multi-currency invoicing", status: "later", area: "crm", description: "Exploring support for invoicing clients in currencies other than USD." },
];
