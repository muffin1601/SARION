import type { ToolContent } from "../types";

export const proposalValueEstimatorContent: ToolContent = {
  slug: "proposal-value-estimator",
  title: "Proposal Value Estimator",
  featured: false,
  addedDate: "2026-07-08",
  metaTitle: "Proposal Value Estimator",
  metaDescription:
    "Turn estimated hours and rate into a defensible proposal price — with a built-in scope risk buffer and margin, instead of a bare hours-times-rate number.",
  heroHeadline: "Are you pricing the project, or just the hours?",
  heroSubhead:
    "A proposal built on hours times rate alone has no room for scope creep or profit. This calculator adds both back in, transparently.",

  whatItMeans:
    "This estimator starts from your raw cost (hours × rate), adds a scope risk buffer for the unknowns every project has, and then adds your target margin on top — so the final number is a price, not just a cost.",
  whyItMatters:
    "Agencies that quote bare cost with no buffer or margin are the ones that lose money the moment scope shifts even slightly. Building the buffer and margin in up front means normal scope drift doesn't turn a profitable project into a loss.",
  benchmarks: [
    { label: "Typical buffer for well-defined scope", value: "10-15%" },
    { label: "Typical buffer for vague or new-client scope", value: "20-30%" },
    { label: "Common target margin on services work", value: "20-35%" },
  ],
  howToImprove: [
    "Raise the scope risk buffer for first-time clients or projects with a vague, unwritten scope.",
    "Present the price after walking through the scope, rather than leading with a bare number.",
    "Build a change-order process for any work that goes beyond the buffer you quoted.",
  ],
  commonMistakes: [
    "Quoting the bare hours × rate cost with no buffer or margin at all.",
    "Underestimating hours just to make the number look more competitive and \"win\" the deal.",
    "Using the same buffer percentage for every project instead of adjusting it to how well-defined the scope actually is.",
  ],

  faqs: [
    {
      question: "Why not just quote hours times rate?",
      answer:
        "Because that number only covers your cost, not the risk of scope changing or any actual profit. A buffer and margin are what separate a price from a cost estimate.",
    },
    {
      question: "How do I pick the right scope risk buffer?",
      answer:
        "Use a lower buffer (10-15%) when the scope is written down and well understood, and a higher buffer (20-30%) for new clients or projects where requirements are still fuzzy.",
    },
    {
      question: "Should I show the client this breakdown?",
      answer:
        "Not usually line by line — most agencies present a single price. The breakdown is for your own confidence that the number is defensible, not necessarily for the client-facing document.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "agency-crm-features-that-actually-matter", "client-communication-best-practices"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["hourly-rate-calculator", "project-profitability-calculator"],
};
