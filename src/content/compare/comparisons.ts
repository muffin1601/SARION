import type { Comparison } from "./types";
import { agencyCrmVsSpreadsheets } from "./data/agency-crm-vs-spreadsheets";
import { clickup } from "./data/clickup";
import { notion } from "./data/notion";
import { monday } from "./data/monday";
import { trello } from "./data/trello";
import { asana } from "./data/asana";
import { hubspot } from "./data/hubspot";
import { zohoCrm } from "./data/zoho-crm";

/**
 * Single registry driving /compare and every /compare/[competitor] page.
 * Adding comparison #9+ is just appending another object here — no route,
 * component, sitemap, or cross-linking code needs to change.
 */
export const COMPARISONS: Comparison[] = [
  clickup,
  notion,
  monday,
  trello,
  asana,
  hubspot,
  zohoCrm,
  agencyCrmVsSpreadsheets,
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
