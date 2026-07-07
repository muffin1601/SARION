import type { ToolContent } from "../types";

export const agencyGrowthScoreCalculatorContent: ToolContent = {
  slug: "agency-growth-score-calculator",
  title: "Agency Growth Score Calculator",
  featured: false,
  addedDate: "2026-07-08",
  metaTitle: "Agency Growth Score Calculator",
  metaDescription:
    "Get a directional Agency Growth Score from four weighted inputs — utilization, retention, margin, and pipeline health — plus your biggest opportunity to improve.",
  heroHeadline: "How healthy is your agency's growth trajectory, directionally?",
  heroSubhead:
    "This is a self-assessment composite score built from four inputs you control, not a scientific prediction or an industry-standard benchmark index.",

  whatItMeans:
    "The Agency Growth Score is a Sarion-original directional self-assessment: it takes four inputs you provide — utilization, client retention, project margin, and pipeline health — and combines them into a single weighted number from 0-100. It is not a scientific prediction and not a recognized external industry benchmark; it's a way to see, at a glance, which of your own levers needs the most attention.",
  whyItMatters:
    "Agencies usually track these four metrics separately, if at all, which makes it hard to see the overall direction. Combining them into one number makes it easier to spot which single input is dragging the average down and re-check that direction over time — the point is the trend, not the exact digit.",
  benchmarks: [
    { label: "Needs attention (below 50)", value: "Usually one or two inputs are dragging the average down" },
    { label: "Solid foundation (50-74)", value: "Fundamentals are working, with room to optimize" },
    { label: "Strong growth position (75+)", value: "Most levers are healthy at once" },
  ],
  howToImprove: [
    "Identify your single lowest-scoring input first — it usually has the most room to move the average.",
    "Improve utilization and margin together where possible, since gains in both compound.",
    "Re-run the calculator quarterly and track the trend line, not just one snapshot.",
  ],
  commonMistakes: [
    "Treating the score as a precise, scientific number instead of a directional read on four inputs.",
    "Optimizing one input aggressively while letting the other three slide.",
    "Calculating it once and never re-measuring, so there's no trend to actually learn from.",
  ],

  faqs: [
    {
      question: "Is this a real industry benchmark?",
      answer:
        "No — it's a directional self-assessment tool built from four weighted inputs you provide. It isn't a recognized external industry index, so treat the number as a compass, not a scorecard against other agencies.",
    },
    {
      question: "Why are the four inputs weighted differently?",
      answer:
        "Utilization and retention are weighted highest (30% each) because they most directly reflect current health, margin next (25%), and pipeline health lowest (15%) since it's forward-looking and harder to measure precisely.",
    },
    {
      question: "What should I do if my score is low?",
      answer:
        "Look at which of the four inputs is lowest — that's almost always the highest-leverage place to focus first, rather than trying to move all four at once.",
    },
  ],

  relatedResourceSlugs: ["crm-migration-checklist"],
  relatedBlogSlugs: ["signs-your-agency-has-outgrown-spreadsheets", "how-to-choose-an-agency-crm", "automating-agency-admin-work"],
  relatedIndustrySlugs: ["marketing-agencies", "creative-agencies"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets"],
  relatedToolSlugs: ["agency-profit-calculator", "client-capacity-calculator", "client-lifetime-value-calculator"],
};
