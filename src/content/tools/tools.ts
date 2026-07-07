import type { Calculator } from "@/lib/tools/types";
import type { ToolContent } from "./types";

import { agencyCrmRoiCalculator } from "@/lib/tools/calculators/agency-crm-roi";
import { agencyProfitCalculator } from "@/lib/tools/calculators/agency-profit-calculator";
import { clientCapacityCalculator } from "@/lib/tools/calculators/client-capacity-calculator";
import { hourlyRateCalculator } from "@/lib/tools/calculators/hourly-rate-calculator";
import { projectProfitabilityCalculator } from "@/lib/tools/calculators/project-profitability-calculator";
import { retainerPricingCalculator } from "@/lib/tools/calculators/retainer-pricing-calculator";
import { teamCostCalculator } from "@/lib/tools/calculators/team-cost-calculator";
import { leadValueCalculator } from "@/lib/tools/calculators/lead-value-calculator";
import { clientLifetimeValueCalculator } from "@/lib/tools/calculators/client-lifetime-value-calculator";
import { projectTimelineEstimator } from "@/lib/tools/calculators/project-timeline-estimator";
import { proposalValueEstimator } from "@/lib/tools/calculators/proposal-value-estimator";
import { agencyGrowthScoreCalculator } from "@/lib/tools/calculators/agency-growth-score-calculator";

import { agencyCrmRoi } from "./data/agency-crm-roi";
import { agencyProfitCalculatorContent } from "./data/agency-profit-calculator";
import { clientCapacityCalculatorContent } from "./data/client-capacity-calculator";
import { hourlyRateCalculatorContent } from "./data/hourly-rate-calculator";
import { projectProfitabilityCalculatorContent } from "./data/project-profitability-calculator";
import { retainerPricingCalculatorContent } from "./data/retainer-pricing-calculator";
import { teamCostCalculatorContent } from "./data/team-cost-calculator";
import { leadValueCalculatorContent } from "./data/lead-value-calculator";
import { clientLifetimeValueCalculatorContent } from "./data/client-lifetime-value-calculator";
import { projectTimelineEstimatorContent } from "./data/project-timeline-estimator";
import { proposalValueEstimatorContent } from "./data/proposal-value-estimator";
import { agencyGrowthScoreCalculatorContent } from "./data/agency-growth-score-calculator";

export interface ToolEntry {
  content: ToolContent;
  calculator: Calculator;
}

/**
 * Single registry pairing each tool's educational content with its
 * calculation engine by matching slug. Adding tool #13+ is one new
 * calculator file + one new content file + one entry here.
 */
export const TOOLS: ToolEntry[] = [
  { content: agencyCrmRoi, calculator: agencyCrmRoiCalculator },
  { content: agencyProfitCalculatorContent, calculator: agencyProfitCalculator },
  { content: clientCapacityCalculatorContent, calculator: clientCapacityCalculator },
  { content: hourlyRateCalculatorContent, calculator: hourlyRateCalculator },
  { content: projectProfitabilityCalculatorContent, calculator: projectProfitabilityCalculator },
  { content: retainerPricingCalculatorContent, calculator: retainerPricingCalculator },
  { content: teamCostCalculatorContent, calculator: teamCostCalculator },
  { content: leadValueCalculatorContent, calculator: leadValueCalculator },
  { content: clientLifetimeValueCalculatorContent, calculator: clientLifetimeValueCalculator },
  { content: projectTimelineEstimatorContent, calculator: projectTimelineEstimator },
  { content: proposalValueEstimatorContent, calculator: proposalValueEstimator },
  { content: agencyGrowthScoreCalculatorContent, calculator: agencyGrowthScoreCalculator },
];

export function getToolEntries(): ToolEntry[] {
  return TOOLS;
}

export function getToolEntryBySlug(slug: string): ToolEntry | undefined {
  return TOOLS.find((t) => t.content.slug === slug);
}

export function getToolBySlug(slug: string): ToolContent | undefined {
  return getToolEntryBySlug(slug)?.content;
}
