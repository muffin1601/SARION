import type { ChangelogEntry } from "./types";

/**
 * Real, honest site milestones only — every entry here reflects something
 * actually shipped on trysarion.com. Never invent a product feature that
 * doesn't exist; the marketing site's own build-out is fair game since it's
 * real and verifiable.
 */
export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    slug: "interactive-tools-launched",
    date: "2026-07-08",
    type: "feature",
    title: "Free interactive calculators launched",
    description:
      "12 free calculators for agency pricing, profitability, and capacity planning — hourly rate, retainer pricing, client lifetime value, and more. Live results, no signup required.",
    tags: ["tools", "calculators"],
  },
  {
    slug: "resources-platform-launched",
    date: "2026-07-08",
    type: "feature",
    title: "Resources & templates library launched",
    description:
      "Free templates, checklists, and guides for running an agency — including a CRM migration checklist and client onboarding template.",
    tags: ["resources", "templates"],
  },
  {
    slug: "comparison-pages-launched",
    date: "2026-07-08",
    type: "feature",
    title: "Honest comparison pages launched",
    description:
      "Side-by-side comparisons against ClickUp, Notion, Monday, Trello, Asana, HubSpot, Zoho CRM, and spreadsheets — built to help you pick the right tool, not just sell ours.",
    tags: ["compare"],
  },
  {
    slug: "solutions-pages-launched",
    date: "2026-07-08",
    type: "feature",
    title: "Industry solutions pages launched",
    description:
      "Dedicated pages for marketing agencies, design agencies, web development agencies, SEO agencies, branding agencies, creative agencies, freelancers, and consultants.",
    tags: ["solutions"],
  },
  {
    slug: "blog-launched",
    date: "2026-05-01",
    type: "feature",
    title: "Blog launched",
    description:
      "Practical, agency-focused articles on CRM, client management, and operations — starting with our Agency CRM topic cluster.",
    tags: ["blog"],
  },
  {
    slug: "portal-demo-launched",
    date: "2026-04-10",
    type: "feature",
    title: "Interactive Portal Demo added",
    description:
      "A live, click-through preview of the branded client portal — see exactly what your clients would experience before signing up.",
    tags: ["portal"],
  },
  {
    slug: "seo-technical-audit",
    date: "2026-06-15",
    type: "announcement",
    title: "Site-wide technical SEO pass completed",
    description:
      "Structured data, canonical tags, sitemap, and internal linking overhauled across every marketing page.",
    tags: ["seo"],
  },
];
