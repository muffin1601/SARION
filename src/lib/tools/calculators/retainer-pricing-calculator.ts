import type { Calculator } from "../types";
import { formatCurrency, toNumber } from "../format";

export const retainerPricingCalculator: Calculator = {
  fields: [
    {
      key: "hoursIncludedPerMonth",
      label: "Hours included per month",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 200,
      step: 1,
      defaultValue: 20,
      tooltip: "Hours of work included in the retainer each month",
    },
    {
      key: "teamHourlyCost",
      label: "Team hourly cost",
      type: "currency",
      min: 0,
      max: 500,
      step: 5,
      defaultValue: 55,
      tooltip: "Loaded cost of an hour of team time",
    },
    {
      key: "desiredMarginPercent",
      label: "Desired margin",
      type: "percent",
      min: 0,
      max: 95,
      step: 5,
      defaultValue: 30,
      tooltip: "Target profit margin on this retainer",
    },
  ],

  calculate(inputs) {
    const hoursIncludedPerMonth = toNumber(inputs.hoursIncludedPerMonth, 20);
    const teamHourlyCost = toNumber(inputs.teamHourlyCost, 55);
    const desiredMarginPercent = toNumber(inputs.desiredMarginPercent, 30);

    const baseCost = hoursIncludedPerMonth * teamHourlyCost;
    const marginFraction = Math.min(desiredMarginPercent, 95) / 100;
    const recommendedMonthlyRetainer = marginFraction < 1 ? baseCost / (1 - marginFraction) : baseCost;
    const monthlyProfit = recommendedMonthlyRetainer - baseCost;
    const effectiveHourlyRate = hoursIncludedPerMonth > 0 ? recommendedMonthlyRetainer / hoursIncludedPerMonth : 0;
    const annualRetainerValue = recommendedMonthlyRetainer * 12;

    return {
      headline: `Price this retainer at about ${formatCurrency(recommendedMonthlyRetainer)}/month to hit your margin`,
      metrics: [
        { label: "Recommended monthly retainer", value: formatCurrency(recommendedMonthlyRetainer) },
        { label: "Monthly profit", value: formatCurrency(monthlyProfit) },
        { label: "Effective hourly rate", value: formatCurrency(effectiveHourlyRate) },
        { label: "Annual retainer value", value: formatCurrency(annualRetainerValue) },
      ],
      chart: {
        type: "bar",
        data: [
          { label: "Base cost", value: Math.round(baseCost) },
          { label: "Recommended price", value: Math.round(recommendedMonthlyRetainer) },
        ],
      },
      recommendations: [
        "Build in a buffer for overage hours so a busy month doesn't erase the margin.",
        "Review retainer scope quarterly to make sure included hours still match actual client demand.",
        "Compare the effective hourly rate here against your project work rates to keep pricing consistent.",
      ],
      nextSteps: [
        "Document what's in and out of scope before sending the retainer agreement.",
        "Set up recurring invoicing so the retainer bills automatically each month.",
      ],
      relevantFeatureEyebrows: ["Invoices", "Client Management"],
    };
  },
};
