import type { Resource } from "../types";

export const invoiceTemplate: Resource = {
  slug: "invoice-template",
  title: "Invoice Template",
  category: "templates",
  tags: ["invoicing", "operations", "billing"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Invoice Template for Agencies",
  metaDescription:
    "A professional invoice layout with every field agencies need — scope reference, due date, payment terms, and late-fee language.",
  heroHeadline: "An invoice layout that gets paid on time",
  heroSubhead:
    "Late payments are often a formatting problem, not a client problem — a due date that's easy to miss, or terms that were never stated. This template removes the ambiguity.",

  overview:
    "This is a line-item invoice layout built for agency billing — referencing the scope of work, laying out due dates and payment terms clearly, and stating late-fee language up front instead of after the fact. It's structured so a client's accounts-payable person can process it without a follow-up email, which is where most payment delays actually start.",
  whyItMatters:
    "A surprising share of late payments aren't disputes — they're processing delays caused by a missing PO reference, an unclear due date, or line items that don't match what the client remembers agreeing to. An invoice that references the original scope, states terms clearly, and itemizes work in a way the client recognizes gets approved faster, with fewer 'what is this line item for' emails back and forth.",
  whoShouldUseIt: [
    "Agencies currently invoicing from a generic template that doesn't reference scope or project history",
    "Anyone chasing late payments who suspects the invoice itself, not the client, is part of the problem",
    "Teams standardizing invoice format across multiple clients and team members billing work",
  ],
  howToUseIt: [
    { step: "Reference the scope or proposal on every invoice", description: "Add the project or scope reference so the client can trace the invoice back to what they agreed to, without asking." },
    { step: "State the due date and terms explicitly, every time", description: "Don't rely on a client remembering net-30 from a contract signed months ago — restate it on the invoice itself." },
    { step: "Group line items the way the client thinks about the work", description: "Match line items to deliverables or milestones from the proposal, not internal task names that mean nothing to the client." },
  ],

  fileType: "Google Sheets template",
  estimatedTimeSaved: "20-30 minutes per invoice, and fewer late payments from processing delays",
  whatsIncluded: [
    "A full invoice layout with scope reference, due date, and payment terms fields",
    "Late-fee language, pre-written and ready to adjust to your terms",
    "A line-item table structured around deliverables, not internal task names",
    "A point-of-contact field for billing questions, separate from the project contact",
  ],
  previewContent: [
    "Invoice #, issue date, due date",
    "Scope / proposal reference",
    "Bill to & billing contact",
    "Line items (by deliverable, not task)",
    "Subtotal, tax, total due",
    "Payment terms & accepted methods",
    "Late payment fee (after due date)",
  ],

  faqs: [
    {
      question: "Where should the payment terms go on the invoice?",
      answer:
        "Near the total, not buried in a footer. Terms that are easy to see get processed faster than terms a client's AP team has to search for.",
    },
    {
      question: "Should late fees actually be stated on every invoice, or just in the contract?",
      answer:
        "Both. Stating it on the contract sets the expectation once; restating it on the invoice itself is what actually gets referenced when a payment is late, and reduces the awkwardness of bringing it up after the fact.",
    },
    {
      question: "How should line items be grouped for a multi-deliverable project?",
      answer:
        "By deliverable or milestone, matching the language from the original proposal — not by internal task or hours logged, which the client has no context for and tends to prompt questions.",
    },
    {
      question: "Who should be listed as the billing point of contact?",
      answer:
        "Whoever actually owns invoice questions — often not the same person as the day-to-day project contact. Listing the wrong person adds a forwarding step to every question about the bill.",
    },
  ],

  relatedResourceSlugs: ["proposal-template", "client-onboarding-template", "weekly-agency-operations-checklist"],
  relatedBlogSlugs: ["invoicing-best-practices-for-agencies", "how-to-price-agency-services", "automating-agency-admin-work"],
  relatedComparisonSlugs: ["zoho-crm"],
  relatedIndustrySlugs: ["freelancers", "consultants", "web-development-agencies"],
};
