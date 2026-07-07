import type { Resource } from "../types";

export const agencyKpiTracker: Resource = {
  slug: "agency-kpi-tracker",
  title: "Agency KPI Tracker",
  category: "templates",
  tags: ["reporting", "agency growth"],
  status: "live",
  featured: false,
  popular: false,
  addedDate: "2026-07-08",
  metaTitle: "Agency KPI Tracker Template",
  metaDescription:
    "A month-over-month tracker for the handful of KPIs that actually matter to a small agency — utilization, margin, retention, overdue invoices.",
  heroHeadline: "Track the four numbers that actually tell you how your agency is doing",
  heroSubhead:
    "Not a 20-metric consultant dashboard. A monthly tracker for utilization, average project margin, client retention, and overdue invoice rate — the KPIs a small agency can actually act on.",

  overview:
    "This is a spreadsheet template for tracking four KPIs month over month: team utilization, average project margin, client retention rate, and overdue invoice rate. Each gets its own row across a monthly column layout, so you can see the trend, not just this month's snapshot. It deliberately leaves out vanity metrics that sound good in a board deck but don't change what you do on a Monday morning.",
  whyItMatters:
    "Small agencies don't have a data problem, they have a filtering problem — most of the numbers available to track don't actually change a decision. Utilization tells you if you're overstaffed or about to burn out your team. Average project margin tells you if you're pricing correctly. Client retention tells you if the work is actually landing. Overdue invoice rate tells you if cash flow problems are coming. Tracked monthly, these four numbers surface problems while they're still small — a slipping margin over three months is a pricing conversation; a slipping margin you notice a year later is a crisis.",
  whoShouldUseIt: [
    "Agency owners who want a monthly 15-minute number-check instead of a full reporting exercise",
    "Agencies that have never formally tracked utilization or margin and are pricing or staffing on gut feel",
    "Anyone preparing for a slow season who needs an early-warning system for cash flow and retention",
  ],
  howToUseIt: [
    { step: "Pick a fixed day each month to update it", description: "The first business day of the month works well — pull last month's actuals for all four KPIs while they're still easy to reconstruct from invoices and timesheets." },
    { step: "Calculate each KPI the same way every time", description: "Utilization as billable hours over available hours, margin as (project revenue - project cost) over revenue, retention as clients retained over clients at risk of churn, overdue rate as overdue invoice dollars over total invoiced." },
    { step: "Look at trend, not single months", description: "One bad month for any KPI is noise. Three consecutive months moving the same direction is the signal that's actually worth acting on — that's what the month-over-month layout is built to surface." },
  ],

  fileType: "Google Sheets template",
  estimatedTimeSaved: "2-3 hours of ad hoc analysis avoided each month, plus earlier warning on margin or cash flow problems",
  whatsIncluded: [
    "A month-over-month tracker for all four KPIs",
    "A worked calculation formula for each metric, in plain terms",
    "A simple color-coded trend indicator (improving / flat / declining)",
    "Notes column for context behind any unusual month",
  ],
  previewContent: [
    "Team Utilization Rate",
    "Average Project Margin",
    "Client Retention Rate",
    "Overdue Invoice Rate",
    "New Clients Won",
    "Clients Lost / Churned",
    "Notes / Context for the Month",
  ],

  faqs: [
    {
      question: "Why only four KPIs? Shouldn't I track more?",
      answer:
        "You can add more, but most small agencies stop acting on a dashboard once it grows past 5-6 numbers. These four cover staffing, pricing, client health, and cash flow — the categories most likely to quietly go wrong.",
    },
    {
      question: "How do I calculate utilization if timesheets aren't consistent yet?",
      answer:
        "Start with a rough estimate from project hours logged against total team capacity, even if it's imperfect — a consistent rough number tracked monthly is more useful than a precise number you only calculate once.",
    },
    {
      question: "What's a healthy overdue invoice rate?",
      answer:
        "There's no universal target, but most agencies should be concerned if overdue invoice dollars regularly exceed 10-15% of that month's total invoiced amount — it's the trend that matters more than any single threshold.",
    },
    {
      question: "Does this replace the Agency Dashboard Template?",
      answer:
        "No, they're complementary — the dashboard is a weekly operational snapshot of clients and projects, while this tracker is a monthly trend view of the four KPIs behind the business's overall health.",
    },
  ],

  relatedResourceSlugs: ["agency-dashboard-template", "weekly-agency-operations-checklist", "agency-sop-template"],
  relatedBlogSlugs: ["how-to-price-agency-services", "invoicing-best-practices-for-agencies", "signs-your-agency-has-outgrown-spreadsheets"],
  relatedComparisonSlugs: ["agency-crm-vs-spreadsheets", "clickup"],
  relatedIndustrySlugs: ["marketing-agencies", "consultants"],
};
