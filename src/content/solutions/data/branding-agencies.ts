import type { Industry } from "../types";

export const brandingAgencies: Industry = {
  slug: "branding-agencies",
  name: "Branding Agencies",
  metaTitle: "CRM for Branding Agencies",
  metaDescription:
    "A CRM built for branding agencies running multi-month identity engagements with fewer clients, deeper relationships, and milestone-based billing.",
  heroHeadline: "Give a months-long brand engagement one clear home",
  heroSubhead:
    "Branding work moves in phases over months, not weeks, with multiple stakeholders weighing in along the way. Sarion keeps status, feedback, and milestone billing tied to each engagement so nothing gets lost between strategy and final delivery.",

  painPoints: [
    {
      title: "Long engagements lose visibility over time",
      description:
        "A rebrand that runs four to six months moves through quiet stretches of internal work, and by month three the client isn't sure what's actually happening or when they'll hear from you next.",
    },
    {
      title: "Strategy and creative live in disconnected places",
      description:
        "The brand strategy doc is in one file, the creative deck is in another, and client comments on each are scattered across email — so nobody has a single view of the engagement's full history.",
    },
    {
      title: "Multiple stakeholders need different levels of visibility",
      description:
        "The CMO wants a high-level view, the brand manager wants the details, and the founder only wants to see final concepts — but everyone's getting the same email update whether they want it or not.",
    },
    {
      title: "Milestone billing is tracked by memory",
      description:
        "A big-ticket engagement is billed in stages tied to deliverables, but tracking which milestone has been hit and which invoice is due next is handled by someone mentally checking a contract PDF.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Spreadsheets",
      shortcoming:
        "A spreadsheet can list milestones, but it doesn't give clients any visibility, and it won't tell you a milestone invoice is overdue until someone remembers to check it.",
    },
    {
      tool: "Generic project tools",
      shortcoming:
        "Good for internal task lists, but they weren't built to give a client-facing view of a months-long engagement or to tie billing to the milestones stakeholders actually care about.",
    },
    {
      tool: "Email and file-sharing tools",
      shortcoming:
        "Strategy docs, decks, and feedback pile up across scattered emails and shared folders, so there's no single record of how the engagement has actually progressed over its lifetime.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Long engagements lose visibility over time",
      solution:
        "The engagement's project status is kept current in Sarion throughout its run, so the client can check in on real progress at any point instead of waiting on a status email.",
    },
    {
      problem: "Strategy and creative live in disconnected places",
      solution:
        "Notes, updates, and client comments are logged against the same client project as it moves through phases, building one running record instead of scattered files and threads.",
    },
    {
      problem: "Multiple stakeholders need different levels of visibility",
      solution:
        "Each client's portal shows their project's current status and history, so any stakeholder can check the level of detail they want without a custom update being written for each of them.",
    },
    {
      problem: "Milestone billing is tracked by memory",
      solution:
        "Invoices are tied to the client's project record, so milestone billing is issued and tracked against the same engagement rather than reconstructed from a contract every time.",
    },
  ],

  relevantFeatureEyebrows: ["Client Portal", "Project Management", "Invoices", "Client Management"],

  workflow: [
    {
      step: "Discovery and strategy phase",
      description:
        "The engagement is set up as a client project from day one, with strategy notes and early client input logged against it as the foundational phase takes shape.",
    },
    {
      step: "Concept presentation",
      description:
        "Creative concepts are shared with the client, who leaves feedback directly in their portal — giving every stakeholder a record of what was shown and what they said about it.",
    },
    {
      step: "Refinement over multiple checkpoints",
      description:
        "As the brand identity is refined across checkpoints, project status is kept current, so a client checking in mid-engagement sees real progress instead of silence.",
    },
    {
      step: "Final delivery and milestone invoicing",
      description:
        "When the engagement reaches its final delivery milestone, project status reflects completion and the milestone invoice goes out referencing the same client record.",
    },
  ],

  faqs: [
    {
      question: "How does Sarion handle milestone-based billing?",
      answer:
        "Invoices are tied to the client's project, so you can issue and track billing against specific milestones in the engagement rather than relying on a separate reminder to check the contract terms.",
    },
    {
      question: "Our engagements run for months. How does this keep clients engaged in the meantime?",
      answer:
        "The client's portal reflects current project status throughout the engagement, so they can check in on real progress between major touchpoints instead of only hearing from you at milestones.",
    },
    {
      question: "We have several stakeholders on the client side. Can they all see status?",
      answer:
        "Yes — anyone with access to the client's portal can view the project's status and history, so each stakeholder can check in at the level of detail they want without a bespoke update for each person.",
    },
    {
      question: "Does Sarion manage our brand strategy documents or creative files?",
      answer:
        "No — Sarion isn't a document or design file tool. It's where you track the engagement's status, client feedback, and invoicing around the strategy and creative work you produce elsewhere.",
    },
    {
      question: "How does this help once the engagement moves from strategy into creative execution?",
      answer:
        "The same client project carries through both phases, so notes and status from the strategy phase stay attached to the same record as the creative work that follows — nothing gets siloed by phase.",
    },
  ],

  outcomes: [
    "Clients stay informed during long engagements without needing a manual status email.",
    "Strategy and creative feedback build one running record instead of living in scattered files.",
    "Every stakeholder can check status at their own level of detail, from one portal.",
    "Milestone invoices are tracked against the engagement, not reconstructed from memory.",
  ],

  relatedBlogSlugs: [
    "how-to-price-agency-services",
    "invoicing-best-practices-for-agencies",
    "what-is-a-client-portal",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["design-agencies", "creative-agencies", "marketing-agencies"],
};
