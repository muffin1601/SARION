import type { Industry } from "../types";

export const consultants: Industry = {
  slug: "consultants",
  name: "Consultants",
  metaTitle: "CRM for Consultants",
  metaDescription:
    "A CRM for independent consultants managing engagements, milestone deliverables, and billing — built around advisory work, not ad-hoc projects.",
  heroHeadline: "Engagements with visible progress, billed on schedule",
  heroSubhead:
    "Consulting work runs on trust between milestones — a client needs to see progress before the next deliverable lands. Sarion tracks engagement status, deliverables, and milestone invoicing in one record per client, so credibility doesn't rest on memory.",

  painPoints: [
    {
      title: "Engagement scope lives in a call, not a document",
      description:
        "The scope and deliverables for an engagement get agreed on a call or in a proposal email, and by the third milestone nobody has a clean written record to point back to if the client's expectations have drifted.",
    },
    {
      title: "Clients want proof of progress between deliverables",
      description:
        "A strategy engagement might run six weeks between a kickoff and the first real deliverable, and a client who hears nothing in that window starts to wonder what they're paying for.",
    },
    {
      title: "Milestone billing is hard to track without a system",
      description:
        "Invoicing tied to phases or milestones instead of a flat monthly fee means tracking which milestone has been billed, which is in progress, and which hasn't started — easy to lose track of across a few concurrent engagements.",
    },
    {
      title: "Credibility has to come from the work, not a big brand",
      description:
        "A solo or small consulting practice is competing against larger firms with more visible infrastructure, and a scattered client experience — status by email, invoices as PDFs — undercuts the professionalism the advice itself deserves.",
    },
  ],

  whyToolsFail: [
    {
      tool: "Spreadsheets",
      shortcoming:
        "Track which milestone you're on well enough for your own reference, but give the client no visibility and no record of scope they can check themselves.",
    },
    {
      tool: "Generic sales CRMs",
      shortcoming:
        "Built to move a prospect through a pipeline to a signed deal — they have little to say about tracking an engagement's deliverables and milestones after the contract is signed.",
    },
    {
      tool: "Proposal or document tools",
      shortcoming:
        "Capture the scope and deliverables once at the start, but don't track ongoing engagement status or connect that record to milestone invoicing as the work progresses.",
    },
  ],

  howSarionSolves: [
    {
      problem: "Engagement scope lives in a call, not a document",
      solution:
        "Engagement details and agreed deliverables get recorded as notes on the client's project record, giving both sides a written reference to point back to instead of relying on memory of a call.",
    },
    {
      problem: "Clients want proof of progress between deliverables",
      solution:
        "Project status is visible in the client's portal, so a client can check in on progress themselves between milestones instead of wondering what's happening in the quiet weeks.",
    },
    {
      problem: "Milestone billing is hard to track without a system",
      solution:
        "Each milestone is tracked against the client's project, and invoices are sent from that same record — so it's clear at a glance what's been billed and what's still outstanding.",
    },
    {
      problem: "Credibility has to come from the work, not a big brand",
      solution:
        "A branded client portal and clean invoicing give a solo practice the same polished client experience as a larger firm, without requiring any extra infrastructure.",
    },
  ],

  relevantFeatureEyebrows: ["Client Portal", "Project Management", "Invoices", "Client Management"],

  workflow: [
    {
      step: "Scoping call and engagement setup",
      description:
        "After the scoping call, the engagement's deliverables and milestones get recorded against the client's project record — a written reference both sides can check later.",
    },
    {
      step: "Work happens between milestones",
      description:
        "Progress notes get logged on the project as work moves, so there's a visible trail even in the weeks between one deliverable and the next.",
    },
    {
      step: "Client checks the portal instead of emailing to ask",
      description:
        "A client wondering how things are going opens their portal link and sees current status, instead of sending a check-in email that interrupts the work.",
    },
    {
      step: "Milestone delivered, invoice sent",
      description:
        "When a milestone deliverable is complete, the invoice for that phase goes out from the same client record — no separate tracker to reconcile against.",
    },
  ],

  faqs: [
    {
      question: "How does this help with milestone-based billing specifically?",
      answer:
        "Each milestone is tracked against the client's project, so it's clear which phases have been invoiced and which haven't — instead of relying on a separate note or spreadsheet to remember.",
    },
    {
      question: "Can I keep a record of what was agreed for an engagement?",
      answer:
        "Yes — engagement scope and deliverables can be logged as notes on the client's project, giving you a written reference to point back to if expectations ever seem to drift from what was agreed.",
    },
    {
      question: "My clients don't hear from me between milestones — will they think I've gone quiet?",
      answer:
        "The client portal gives them a status view they can check themselves between deliverables, so a quiet week reads as steady progress instead of radio silence.",
    },
    {
      question: "I'm a solo consultant — will this make me look more credible to larger prospects?",
      answer:
        "A branded portal and clean, itemized invoicing give clients the same polished experience they'd get from a bigger firm, without you needing to build any of that infrastructure yourself.",
    },
    {
      question: "I run a few engagements at once with different milestone schedules — does this stay organized?",
      answer:
        "Each engagement is its own project with its own milestones and status, so you can check progress across all your active clients from one dashboard instead of juggling separate trackers per engagement.",
    },
  ],

  outcomes: [
    "Engagement scope has a written record instead of living only in a call or email.",
    "Clients can check progress themselves between milestones instead of emailing to ask.",
    "Milestone invoicing stays clear on what's billed and what's still outstanding.",
    "A solo practice presents with the same polish as a larger competing firm.",
  ],

  relatedBlogSlugs: [
    "how-to-price-agency-services",
    "what-is-a-client-portal",
    "how-to-onboard-a-new-client-checklist",
  ],
  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedIndustrySlugs: ["freelancers", "marketing-agencies", "web-development-agencies"],
};
