import type { Calculator } from "../types";
import { agencyCrmRoiCalculator } from "./agency-crm-roi";
import { agencyProfitCalculator } from "./agency-profit-calculator";
import { clientCapacityCalculator } from "./client-capacity-calculator";
import { hourlyRateCalculator } from "./hourly-rate-calculator";
import { projectProfitabilityCalculator } from "./project-profitability-calculator";
import { retainerPricingCalculator } from "./retainer-pricing-calculator";
import { teamCostCalculator } from "./team-cost-calculator";
import { leadValueCalculator } from "./lead-value-calculator";
import { clientLifetimeValueCalculator } from "./client-lifetime-value-calculator";
import { projectTimelineEstimator } from "./project-timeline-estimator";
import { proposalValueEstimator } from "./proposal-value-estimator";
import { agencyGrowthScoreCalculator } from "./agency-growth-score-calculator";

/**
 * Calculator-only registry — no content-file imports. This is the one
 * `CalculatorForm` (a client component) should import: importing the full
 * `src/content/tools/tools.ts` registry from client code pulls all 12
 * content files (FAQs, benchmarks, prose) into the browser bundle for
 * every /tools/* page, which is most of what made that bundle heavy.
 */
export const CALCULATORS: Record<string, Calculator> = {
  "agency-crm-roi": agencyCrmRoiCalculator,
  "agency-profit-calculator": agencyProfitCalculator,
  "client-capacity-calculator": clientCapacityCalculator,
  "hourly-rate-calculator": hourlyRateCalculator,
  "project-profitability-calculator": projectProfitabilityCalculator,
  "retainer-pricing-calculator": retainerPricingCalculator,
  "team-cost-calculator": teamCostCalculator,
  "lead-value-calculator": leadValueCalculator,
  "client-lifetime-value-calculator": clientLifetimeValueCalculator,
  "project-timeline-estimator": projectTimelineEstimator,
  "proposal-value-estimator": proposalValueEstimator,
  "agency-growth-score-calculator": agencyGrowthScoreCalculator,
};

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return CALCULATORS[slug];
}
