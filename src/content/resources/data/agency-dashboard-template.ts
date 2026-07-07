import type { Resource } from "../types";

export const agencyDashboardTemplate: Resource = {
  slug: "agency-dashboard-template",
  title: "Agency Dashboard Template",
  category: "templates",
  tags: ["reporting", "operations"],
  status: "live",
  featured: true,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Agency Dashboard Template for Tracking Clients and Revenue",
  metaDescription:
    "A single-sheet spreadsheet layout for seeing every active client, project status, and revenue at a glance — no software setup required.",
  heroHeadline: "See your whole agency on one screen",
  heroSubhead:
    "Not a piece of software — a spreadsheet layout. One sheet that answers 'how are we actually doing right now' without opening ten different client folders.",

  overview:
    "This is a spreadsheet template, not a tool — a specific layout for a single Google Sheet that gives you a top-level view of every active client, what stage each of their projects is in, and where your revenue stands, all on one screen. It's built from three linked sections: a client status table, a revenue summary, and an overdue-invoice flag column that turns red the moment a payment is late. You fill it in weekly; it doesn't update itself.",
  whyItMatters:
    "Most agencies can answer 'how is Client X doing' in isolation, but struggle to answer 'how are we doing as an agency' without a slow lap around every project tracker and every invoice. That gap is exactly where things get missed — an overdue invoice nobody's chasing, a project quietly stalled for two weeks, a client who's gone quiet since their last payment. A single dashboard sheet, updated on a fixed weekly cadence, closes that gap without needing new software.",
  whoShouldUseIt: [
    "Agency owners or ops leads who currently check client status by opening each client's folder individually",
    "Agencies juggling 5-20 active clients where a mental model of 'how things are going' has stopped being reliable",
    "Anyone who has been surprised by a late invoice or a stalled project they should have caught weeks earlier",
  ],
  howToUseIt: [
    { step: "Set a weekly 15-minute update slot", description: "Pick a fixed time — Monday morning works well — to pull current status into the sheet from your project and invoice records. It only works if it's current." },
    { step: "Fill the client status table first", description: "One row per active client: current project stage, health (on track / at risk / stalled), and last contact date. This is the section you'll actually look at daily." },
    { step: "Let the revenue summary and overdue flag do the rest", description: "Once invoice amounts and due dates are in, the overdue-invoice flag column and revenue summary total are just formulas referencing that data — no separate upkeep." },
  ],

  fileType: "Google Sheets template",
  estimatedTimeSaved: "1-2 hours a week of chasing status across client folders",
  whatsIncluded: [
    "A client status table (project stage, health, last contact)",
    "A revenue summary block (invoiced, collected, outstanding this month)",
    "An overdue-invoice flag column with built-in conditional formatting",
    "A simple weekly-update checklist so the sheet stays trustworthy",
  ],
  previewContent: [
    "Client Name",
    "Current Project Stage",
    "Project Health (On Track / At Risk / Stalled)",
    "Last Client Contact",
    "Invoice Status",
    "Overdue Flag",
    "Revenue Summary (Invoiced / Collected / Outstanding)",
  ],

  faqs: [
    {
      question: "Is this a live dashboard that updates automatically?",
      answer:
        "No — it's a spreadsheet template you update on a set cadence, typically weekly. It doesn't pull data automatically from anywhere; the value is in the layout, not automation.",
    },
    {
      question: "How is this different from just looking at each client's project tracker?",
      answer:
        "A per-client tracker tells you about one client. This sheet is the rollup across all of them, so you can spot the client that's quietly stalled or the invoice that's overdue without opening every tracker individually.",
    },
    {
      question: "What counts as 'at risk' for the project health column?",
      answer:
        "There's no universal rule — most agencies use it for any project that's missed a milestone date, gone quiet on client communication for over a week, or is waiting on a client input that's overdue.",
    },
    {
      question: "Can this replace a real CRM or project tracker?",
      answer:
        "No — this is a weekly-glance summary, not a system of record. It works best alongside proper client records and project tracking, pulling its numbers from there.",
    },
  ],

  relatedResourceSlugs: ["agency-kpi-tracker", "weekly-agency-operations-checklist", "crm-migration-checklist"],
  relatedBlogSlugs: ["signs-your-agency-has-outgrown-spreadsheets", "invoicing-best-practices-for-agencies", "reduce-client-status-update-emails"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets", "monday"],
  relatedIndustrySlugs: ["marketing-agencies", "design-agencies"],
};
