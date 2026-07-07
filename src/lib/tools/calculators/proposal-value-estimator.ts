import type { Calculator } from "../types";
import { formatCurrency, toNumber } from "../format";

export const proposalValueEstimator: Calculator = {
  fields: [
    {
      key: "estimatedHours",
      label: "Estimated hours",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 2000,
      step: 5,
      defaultValue: 60,
      tooltip: "Your best estimate of total hours this project will take.",
    },
    {
      key: "hourlyRate",
      label: "Hourly rate",
      type: "currency",
      min: 0,
      max: 1000,
      step: 5,
      defaultValue: 85,
      tooltip: "Your standard hourly rate for this type of work.",
    },
    {
      key: "scopeRiskBufferPercent",
      label: "Scope risk buffer",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 15,
      tooltip: "Extra buffer for scope uncertainty — higher for vague or new-client projects.",
    },
    {
      key: "desiredMarginPercent",
      label: "Desired margin",
      type: "percent",
      min: 0,
      max: 80,
      step: 5,
      defaultValue: 25,
      tooltip: "Target profit margin on top of your cost basis.",
    },
  ],

  calculate(inputs) {
    const estimatedHours = toNumber(inputs.estimatedHours, 60);
    const hourlyRate = toNumber(inputs.hourlyRate, 85);
    const scopeRiskBufferPercent = toNumber(inputs.scopeRiskBufferPercent, 15);
    const desiredMarginPercent = toNumber(inputs.desiredMarginPercent, 25);

    const baseCost = estimatedHours * hourlyRate;
    const costWithBuffer = baseCost * (1 + scopeRiskBufferPercent / 100);
    const marginDenominator = 1 - desiredMarginPercent / 100;
    const recommendedProposalPrice = marginDenominator > 0 ? costWithBuffer / marginDenominator : costWithBuffer;
    const marginDollars = recommendedProposalPrice - costWithBuffer;

    return {
      headline: `Price this proposal at about ${formatCurrency(recommendedProposalPrice)} to protect your margin`,
      metrics: [
        { label: "Recommended proposal price", value: formatCurrency(recommendedProposalPrice) },
        { label: "Base cost (hours × rate)", value: formatCurrency(baseCost) },
        { label: "Cost with risk buffer", value: formatCurrency(costWithBuffer) },
        { label: "Margin dollars", value: formatCurrency(marginDollars) },
      ],
      chart: {
        type: "bar",
        unit: "",
        data: [
          { label: "Base cost", value: Math.round(baseCost) },
          { label: "Recommended price", value: Math.round(recommendedProposalPrice) },
        ],
      },
      recommendations: [
        "Raise the scope risk buffer for first-time clients or projects with a vague, unwritten scope.",
        "Present the price after walking through the scope, rather than leading with a bare number.",
        "Build a change-order process for any work that goes beyond the buffer you quoted.",
      ],
      nextSteps: [
        "Turn this estimate into a formal proposal your client can approve.",
        "Track actual hours against this estimate once the project starts.",
      ],
      relevantFeatureEyebrows: ["Invoices", "Project Management"],
    };
  },
};
