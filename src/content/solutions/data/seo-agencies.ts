import type { Industry } from "../types";

export const seoAgencies: Industry = {
  slug: "seo-agencies",
  name: "SEO Agencies",
  metaTitle: "CRM for SEO Agencies",
  metaDescription:
    "A CRM built for SEO agencies running long-term retainers, monthly reporting cycles, and the client trust that keeps a slow-moving campaign renewed.",
  heroHeadline: "Keep clients confident while the rankings catch up",
  heroSubhead:
    "SEO is a long game, and clients on a monthly retainer need to see the work between the rank jumps. Sarion keeps every account's activity, status, and invoicing in one place so trust doesn't run out before the results do.",

  painPoints: [
    {
      title: "Clients get anxious in the slow months",
      description:
        "Rankings take months to move, and a client paying a retainer every month with nothing visible to show for it starts wondering out loud whether anything is actually happening.",
    },
    {
      title: "Monthly reporting eats a full day",
      description:
        "Pulling data from rank trackers, analytics, and a running list of completed work into one client-ready report takes hours every month — hours that don't exist anywhere as billable time.",
    },
    {
      title: "There's no running record to prove the work happened",
      description:
        "When a skeptical client asks \"what have you actually done for us this quarter,\" the honest answer is scattered across a dozen tools and nobody's memory — not a single place you can point to.",
    },
    {
      title: "Retainers churn when clients can't see the value",
      description:
        "A client doesn't cancel because the SEO isn't working — they cancel because they can't tell whether it's working, and silence reads as inactivity even when the team is heads-down on real work.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Generic project trackers",
      shortcoming:
        "Show internal task status to the team, not client-facing proof of activity — a client isn't going to log into a ticket board to feel reassured about their retainer.",
    },
    {
      tool: "Spreadsheets",
      shortcoming:
        "A monthly activity log in a spreadsheet has no client view and no link to invoicing, so the proof of work and the bill for it live in two disconnected places.",
    },
    {
      tool: "Ticketing tools built for internal IT",
      shortcoming:
        "Built around resolving discrete internal issues, not around narrating months of ongoing optimization work in a way a non-technical client retainer holder can actually follow.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Clients get anxious in the slow months",
      solution:
        "Work gets logged against the client's project as it happens — content published, links built, technical fixes shipped — so there's visible activity in the portal even in a month where rankings haven't moved yet.",
    },
    {
      problem: "Monthly reporting eats a full day",
      solution:
        "Because activity is logged through the month rather than reconstructed at the end of it, the monthly report becomes a summary of existing records instead of a scramble across tools.",
    },
    {
      problem: "There's no running record to prove the work happened",
      solution:
        "Client notes and project history accumulate on the account record itself, giving you a real, dated log to point to the moment a client asks what's been done.",
    },
    {
      problem: "Retainers churn when clients can't see the value",
      solution:
        "The client's portal gives them their own view of logged work and status between reports, so the retainer feels active and visible instead of like a monthly charge with no evidence behind it.",
    },
  ],

  relevantFeatureEyebrows: ["Client Portal", "Client Management", "Project Management", "Invoices"],

  workflow: [
    {
      step: "Work gets logged as it happens",
      description:
        "Content, link building, and technical work get recorded against the client's project through the month, rather than left to be remembered at reporting time.",
    },
    {
      step: "Client portal check-ins",
      description:
        "A client can look into their portal mid-month and see logged activity and status, closing the gap between \"paying every month\" and \"seeing what that pays for.\"",
    },
    {
      step: "Monthly report assembly",
      description:
        "The month's logged work becomes the backbone of the client report, cutting the manual pull-and-paste work down to a summary pass instead of a rebuild.",
    },
    {
      step: "Invoice the retainer",
      description:
        "The recurring retainer invoice goes out referencing the same account record the work was logged against, so billing and delivered work stay tied together.",
    },
  ],

  faqs: [
    {
      question: "Does Sarion track keyword rankings or pull analytics data?",
      answer:
        "No — Sarion isn't a rank tracker or analytics platform. It's where you log the work you're doing for a client and give them visibility into it, alongside status and invoicing for the retainer.",
    },
    {
      question: "How does this help prove ROI to a skeptical retainer client?",
      answer:
        "Work gets logged against the client's project as it's done, so when a client questions the value of the retainer, you have a dated record of activity to point to instead of a vague summary from memory.",
    },
    {
      question: "Can clients see anything before their monthly report lands?",
      answer:
        "Yes — logged work and project status are visible through the client's portal, so they can see activity between reports instead of waiting a full month to hear anything.",
    },
    {
      question: "Does this reduce churn on long-term SEO retainers?",
      answer:
        "Indirectly, yes — churn on SEO retainers is usually driven by clients not seeing what they're paying for, and a visible record of ongoing work addresses that directly, even before rankings move.",
    },
    {
      question: "Does it speed up our monthly reporting process?",
      answer:
        "Yes — because work is logged through the month rather than reconstructed at the end of it, the report becomes a summary of existing records instead of hours of pulling data together from scratch.",
    },
  ],

  outcomes: [
    "Clients see logged activity in slow months instead of assuming nothing is happening.",
    "Monthly reporting shrinks from a full day of assembly to a summary pass over existing records.",
    "A dated record of work exists the moment a client questions the retainer's value.",
    "Retainer churn drops because clients can see what the monthly fee is actually buying.",
  ],

  relatedBlogSlugs: [
    "client-communication-best-practices",
    "how-to-price-agency-services",
    "reduce-client-status-update-emails",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants", "freelancers"],
};
