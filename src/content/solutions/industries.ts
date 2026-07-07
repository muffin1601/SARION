import type { Industry } from "./types";
import { marketingAgencies } from "./data/marketing-agencies";
import { designAgencies } from "./data/design-agencies";
import { webDevelopmentAgencies } from "./data/web-development-agencies";
import { seoAgencies } from "./data/seo-agencies";
import { brandingAgencies } from "./data/branding-agencies";
import { creativeAgencies } from "./data/creative-agencies";
import { freelancers } from "./data/freelancers";
import { consultants } from "./data/consultants";

/**
 * Single registry driving /solutions and every /solutions/[industry] page.
 * Adding industry #9+ is just appending another object here — no route,
 * component, sitemap, or cross-linking code needs to change.
 */
export const INDUSTRIES: Industry[] = [
  marketingAgencies,
  designAgencies,
  webDevelopmentAgencies,
  seoAgencies,
  brandingAgencies,
  creativeAgencies,
  freelancers,
  consultants,
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
