import type { Category } from "@/lib/blog/types";

/**
 * The 8 topic-cluster categories the blog is organized around. Each maps to
 * a pillar post once that cluster's pillar article exists — new clusters add
 * a `cluster` slug here, they never require a new page template.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "crm",
    name: "Agency CRM",
    description: "Managing clients, pipeline, and relationships as an agency.",
    cluster: "what-is-agency-crm",
  },
  {
    slug: "client-management",
    name: "Client Management",
    description: "Keeping clients informed, happy, and easy to work with.",
    cluster: "what-is-agency-crm",
  },
  {
    slug: "project-management",
    name: "Project Management",
    description: "Running agency delivery work without the chaos.",
  },
  {
    slug: "operations",
    name: "Operations",
    description: "The systems and processes that keep an agency running.",
  },
  {
    slug: "automation",
    name: "Automation",
    description: "Removing manual, repetitive agency busywork.",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Getting more delivery done with less admin overhead.",
  },
  {
    slug: "agency-growth",
    name: "Agency Growth",
    description: "Winning clients and scaling an agency sustainably.",
  },
  {
    slug: "ai",
    name: "AI",
    description: "Practical AI use inside day-to-day agency work.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
