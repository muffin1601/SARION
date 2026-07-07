import type { ResourceCategorySlug } from "./types";

export interface ResourceCategory {
  slug: ResourceCategorySlug;
  name: string;
  description: string;
}

/**
 * The 7 resource-type route segments. `calculators` and `playbooks` ship
 * with zero live resources this phase — their hub pages render an honest
 * "nothing here yet" state rather than a fake placeholder resource.
 */
export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    slug: "templates",
    name: "Templates",
    description: "Ready-to-use documents for common agency deliverables and internal records.",
  },
  {
    slug: "checklists",
    name: "Checklists",
    description: "Step-by-step lists for moments that are easy to get wrong under time pressure.",
  },
  {
    slug: "sops",
    name: "SOPs",
    description: "Documented, repeatable processes so work doesn't depend on one person's memory.",
  },
  {
    slug: "calculators",
    name: "Calculators",
    description: "Interactive tools for estimating agency costs, pricing, and ROI.",
  },
  {
    slug: "guides",
    name: "Guides",
    description: "Longer-form, practical explanations of how to run a specific part of an agency.",
  },
  {
    slug: "prompts",
    name: "Prompts",
    description: "Ready-to-use AI prompts for common agency writing and admin tasks.",
  },
  {
    slug: "playbooks",
    name: "Playbooks",
    description: "End-to-end plans for recurring agency initiatives.",
  },
];

export function getResourceCategoryBySlug(slug: string): ResourceCategory | undefined {
  return RESOURCE_CATEGORIES.find((c) => c.slug === slug);
}
