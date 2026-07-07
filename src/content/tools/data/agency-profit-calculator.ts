import type { ToolContent } from "../types";

export const agencyProfitCalculatorContent: ToolContent = {
  slug: "agency-profit-calculator",
  title: "Agency Profit Calculator",
  addedDate: "2026-07-08",
  metaTitle: "Agency Profit Calculator",
  metaDescription:
    "Calculate your agency's monthly profit, margin, and profit per client from revenue and expenses — and see where margin is quietly slipping.",
  heroHeadline: "How profitable is your agency, really?",
  heroSubhead:
    "Revenue growth can hide shrinking margins. This calculator turns your monthly numbers into a clear profit picture.",

  whatItMeans:
    "Profit here is simply monthly revenue minus monthly expenses, expressed as a dollar amount, a margin percentage, and a per-client figure so you can see who's actually contributing to the bottom line.",
  whyItMatters:
    "Agencies often track revenue closely but expenses loosely, which means margin erosion goes unnoticed until cash gets tight. Seeing profit per client also surfaces which accounts are worth keeping.",
  benchmarks: [
    { label: "Healthy agency net margin", value: "15-25%" },
    { label: "Warning zone margin", value: "below 10%" },
    { label: "Strong, well-run agency margin", value: "25%+" },
  ],
  howToImprove: [
    "Audit recurring expenses line by line — subscriptions and underused tools accumulate quietly over time.",
    "Review pricing against actual hours delivered, not just against what competitors charge.",
    "Cut or renegotiate the lowest-margin client relationships instead of only chasing new revenue.",
  ],
  commonMistakes: [
    "Confusing revenue with profit — a busy agency can still be unprofitable.",
    "Not counting the owner's own time as a real cost, which hides the true margin.",
    "Only checking margin once a year instead of monitoring it monthly as expenses shift.",
  ],

  faqs: [
    {
      question: "Should I include my own salary in monthly expenses?",
      answer:
        "Yes, if you want an accurate margin. If you don't pay yourself a fixed salary, estimate what it would cost to replace your role and include that.",
    },
    {
      question: "What counts as a monthly expense?",
      answer:
        "Salaries, contractor payments, software and tools, rent, and any other recurring cost of running the agency — anything you'd still pay even in a slow month.",
    },
    {
      question: "Why does profit per client matter?",
      answer:
        "It's a rough average, not exact per-account profitability, but a low number is a signal to check pricing or scope on your lowest-margin accounts.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["how-to-price-agency-services", "agency-crm-features-that-actually-matter", "what-is-agency-crm"],
  relatedIndustrySlugs: ["marketing-agencies", "design-agencies", "consultants"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["hourly-rate-calculator", "client-lifetime-value-calculator", "project-profitability-calculator"],
};
