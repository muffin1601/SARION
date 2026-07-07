import type { Industry } from "../types";

export const marketingAgencies: Industry = {
  slug: "marketing-agencies",
  name: "Marketing Agencies",
  metaTitle: "CRM for Marketing Agencies",
  metaDescription:
    "A CRM built for marketing agencies juggling retainers, campaign reporting, and client approvals across multiple accounts at once.",
  heroHeadline: "Run every retainer without losing the thread",
  heroSubhead:
    "Marketing agencies live on recurring client work — campaigns, reporting cadences, approvals. Sarion keeps every account's status, invoices, and deliverables in one place your whole team can see.",

  painPoints: [
    {
      title: "Reporting month becomes a scavenger hunt",
      description:
        "Campaign results live in ad platforms, analytics dashboards, and a shared drive — and someone has to manually assemble it all into a client-ready report every single month.",
    },
    {
      title: "Approvals stall in email threads",
      description:
        "A client sign-off on ad copy or creative gets buried three replies deep in a thread that also has five other things going on, and nobody's sure if it's actually approved.",
    },
    {
      title: "Retainer scope quietly expands",
      description:
        "A client asks for \"one more small thing\" every month, and by month four the account is doing twice the agreed work for the same retainer fee — with no record of how it happened.",
    },
    {
      title: "Account managers are the only source of truth",
      description:
        "If an account manager is out sick, nobody else on the team can answer a basic client question, because the context lives in their head and their inbox.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Spreadsheets",
      shortcoming:
        "A retainer tracker in a spreadsheet doesn't notify anyone when scope creeps past what's billed, and it gives clients zero visibility of their own.",
    },
    {
      tool: "Generic sales CRMs",
      shortcoming:
        "Built for closing new deals, not for tracking a campaign's ongoing status, approvals, and monthly reporting cycle after the deal is signed.",
    },
    {
      tool: "Project management tools",
      shortcoming:
        "Great at tasks, weak at the client-facing side — most have no branded portal, so clients still email for status instead of checking a shared view.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Reporting month becomes a scavenger hunt",
      solution:
        "Keep a running log of campaign updates and deliverables against each client as work happens, so the monthly report is a summary of what's already recorded — not a rebuild from scratch.",
    },
    {
      problem: "Approvals stall in email threads",
      solution:
        "Clients comment and approve directly inside their branded portal, tied to the specific project — so approval status is a fact in the system, not a guess based on the last email.",
    },
    {
      problem: "Retainer scope quietly expands",
      solution:
        "Every request lands as a tracked task against the client's project, so scope additions are visible and countable instead of invisible favors.",
    },
    {
      problem: "Account managers are the only source of truth",
      solution:
        "Client history, notes, and status live on the client record itself — any teammate with access can answer a status question without pinging the account owner.",
    },
  ],

  relevantFeatureEyebrows: ["Client Management", "Client Portal", "Project Management", "Invoices"],

  workflow: [
    {
      step: "Monday: review account status",
      description:
        "Account leads open each client's project view to see what's due this week and what slipped last week, before the client has to ask.",
    },
    {
      step: "Mid-month: log campaign progress",
      description:
        "As campaigns run, updates get logged against the client record — so by reporting time, most of the report already exists.",
    },
    {
      step: "Approval checkpoints",
      description:
        "Creative or copy goes up in the client's portal; the client comments or approves there, and the team moves to the next stage with a clear record.",
    },
    {
      step: "End of month: report and invoice",
      description:
        "The monthly report pulls from logged updates, and the retainer invoice goes out referencing the same account — no separate reconciliation step.",
    },
  ],

  faqs: [
    {
      question: "Can Sarion replace our ad platforms and analytics tools?",
      answer:
        "No — Sarion isn't a campaign or analytics platform. It's where you track client accounts, approvals, deliverables, and invoicing around the campaign work you're already doing elsewhere.",
    },
    {
      question: "How does this help with client reporting specifically?",
      answer:
        "You log campaign progress and deliverables against each client as the month goes, so your monthly report is assembled from real records instead of built from scratch at deadline.",
    },
    {
      question: "Can clients approve creative or copy inside Sarion?",
      answer:
        "Yes — clients comment and approve directly in their branded portal, tied to the specific project, so approval status is a recorded fact rather than an email you have to interpret.",
    },
    {
      question: "We manage 20+ retainer clients. Does this scale?",
      answer:
        "Yes — every client has their own record and portal, and your team can see status across all of them from one dashboard instead of juggling separate trackers per account.",
    },
    {
      question: "Does it help us catch scope creep on retainers?",
      answer:
        "Every request becomes a tracked task against the client's project, so you can see, at a glance, how much unbilled work has piled up on any given retainer.",
    },
  ],

  outcomes: [
    "Monthly reporting takes less time because updates are already logged as work happens.",
    "Client approvals become a recorded fact in the portal, not a buried email.",
    "Scope creep is visible before it erodes a retainer's margin.",
    "Any team member can answer a client status question, not just the account owner.",
  ],

  relatedBlogSlugs: [
    "reduce-client-status-update-emails",
    "invoicing-best-practices-for-agencies",
    "client-communication-best-practices",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["seo-agencies", "creative-agencies", "branding-agencies"],
};
