import type { Calculator } from "../types";
import { formatCurrency, toNumber } from "../format";

export const clientLifetimeValueCalculator: Calculator = {
  fields: [
    {
      key: "avgMonthlyRevenuePerClient",
      label: "Average monthly revenue per client",
      type: "currency",
      min: 0,
      max: 100000,
      step: 100,
      defaultValue: 2500,
      tooltip: "Average monthly revenue a client generates, across retainers and projects.",
    },
    {
      key: "avgRetentionMonths",
      label: "Average retention",
      type: "number",
      unit: "mo",
      min: 1,
      max: 120,
      step: 1,
      defaultValue: 14,
      tooltip: "Average number of months a client stays with the agency.",
    },
    {
      key: "grossMarginPercent",
      label: "Gross margin",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 40,
      tooltip: "% of revenue left after direct delivery costs (team time, tools) before overhead.",
    },
  ],

  calculate(inputs) {
    const avgMonthlyRevenuePerClient = toNumber(inputs.avgMonthlyRevenuePerClient, 2500);
    const avgRetentionMonths = toNumber(inputs.avgRetentionMonths, 14);
    const grossMarginPercent = toNumber(inputs.grossMarginPercent, 40);

    const lifetimeRevenue = avgMonthlyRevenuePerClient * avgRetentionMonths;
    const clientLifetimeValue = lifetimeRevenue * (grossMarginPercent / 100);

    return {
      headline: `The average client is worth about ${formatCurrency(clientLifetimeValue)} in lifetime profit`,
      metrics: [
        { label: "Client lifetime value", value: formatCurrency(clientLifetimeValue) },
        { label: "Lifetime revenue (pre-margin)", value: formatCurrency(lifetimeRevenue) },
        { label: "Average retention", value: `${avgRetentionMonths} mo` },
        { label: "Monthly revenue per client", value: formatCurrency(avgMonthlyRevenuePerClient) },
      ],
      chart: {
        type: "bar",
        unit: "",
        data: [
          { label: "Lifetime revenue", value: Math.round(lifetimeRevenue) },
          { label: "Lifetime value (profit)", value: Math.round(clientLifetimeValue) },
        ],
      },
      recommendations: [
        "Use this number to set a sane ceiling on customer-acquisition cost — spending more than a client's lifetime value to win them is a losing trade.",
        "Extending average retention by even a few months compounds this number more than raising monthly revenue alone.",
        "This justifies real investment in client retention efforts (onboarding, communication, portals) since churn is the biggest lever here.",
      ],
      nextSteps: [
        "See how a client portal and consistent communication extend average retention.",
        "Run the Lead Value Calculator to connect this lifetime value back to what a new lead is worth.",
      ],
      relevantFeatureEyebrows: ["Client Management", "Client Portal"],
    };
  },
};
