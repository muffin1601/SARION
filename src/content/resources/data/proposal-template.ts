import type { Resource } from "../types";

export const proposalTemplate: Resource = {
  slug: "proposal-template",
  title: "Client Proposal Template",
  category: "templates",
  tags: ["proposals", "agency growth", "sales"],
  status: "live",
  featured: false,
  popular: true,
  addedDate: "2026-07-08",
  metaTitle: "Client Proposal Template for Agencies",
  metaDescription:
    "A proposal structure built to win work without over-promising — clear scope, deliverables, timeline, pricing, and terms.",
  heroHeadline: "A proposal structure that wins work without over-promising",
  heroSubhead:
    "Most losing proposals aren't losing on price — they're losing on vagueness, or winning and then losing money because the scope was never pinned down. This template fixes both.",

  overview:
    "This is a proposal structure for agency services — scope, deliverables, timeline, pricing, and terms — written to be specific enough that a client can say yes to exactly what they're getting, and specific enough that your team isn't quietly absorbing scope creep six weeks later. It's built around the sections that actually get read, in the order clients read them.",
  whyItMatters:
    "A vague proposal costs you twice: it loses deals to competitors who sound more concrete, and the ones it does win tend to under-scope the work, so the agency eats the difference in unpaid hours. Naming exact deliverables, a realistic timeline, and what's explicitly out of scope isn't just about winning — it's what makes the project profitable once you've won it.",
  whoShouldUseIt: [
    "Agencies who currently write proposals from scratch each time and want a consistent, faster starting point",
    "Anyone who's had a client push back after signing because they expected something different than what was delivered",
    "Founders and account leads who send proposals themselves and want them to read as more established",
  ],
  howToUseIt: [
    { step: "Define scope before you open the template", description: "Write down exactly what's included and what's explicitly excluded first — the template only works if scope is decided, not decided while you write." },
    { step: "Fill in deliverables and timeline together", description: "Every deliverable should have a date next to it. A timeline without deliverables tied to it is just a guess dressed up as a plan." },
    { step: "Send pricing with the reasoning attached", description: "Don't present a number alone — tie it back to the scope section so the client can see what the price is buying, not just what it costs." },
  ],

  fileType: "Google Doc template",
  estimatedTimeSaved: "2-3 hours per proposal, and fewer scope disputes after signing",
  whatsIncluded: [
    "A scope-definition section that separates included vs. explicitly out-of-scope work",
    "A deliverables and timeline table with suggested date structure",
    "A pricing presentation section that ties cost back to scope",
    "Standard terms language covering revisions, payment schedule, and scope-change handling",
  ],
  previewContent: [
    "Project overview & objectives",
    "Scope of work (included)",
    "Explicitly out of scope",
    "Deliverables & timeline",
    "Investment & payment schedule",
    "Terms: revisions, changes, cancellation",
    "Next steps & signature",
  ],

  faqs: [
    {
      question: "Should the price go at the beginning or the end of the proposal?",
      answer:
        "After scope and deliverables, not before. A price with no context reads as arbitrary — a price that follows a clear scope section reads as reasonable, even when it's the same number.",
    },
    {
      question: "How specific should the 'out of scope' section be?",
      answer:
        "As specific as the included section. Vague exclusions ('additional work billed separately') get argued over. Specific ones ('up to 2 rounds of revisions; a 3rd round is billed at the hourly rate') don't.",
    },
    {
      question: "Does this work for both fixed-price and retainer proposals?",
      answer:
        "Yes, with one change — retainer proposals should replace the deliverables timeline with a monthly scope of work and a renewal or cancellation term, which is covered in the terms section.",
    },
    {
      question: "What's the single biggest reason proposals get rejected?",
      answer:
        "Vagueness, more often than price. A client who can't tell exactly what they're getting will negotiate down or walk away — a client who can see the exact deliverables can evaluate the price on its merits.",
    },
  ],

  relatedResourceSlugs: ["discovery-call-checklist", "invoice-template", "client-onboarding-template"],
  relatedBlogSlugs: ["how-to-price-agency-services", "client-communication-best-practices", "invoicing-best-practices-for-agencies"],
  relatedComparisonSlugs: ["hubspot"],
  relatedIndustrySlugs: ["marketing-agencies", "design-agencies", "branding-agencies"],
};
