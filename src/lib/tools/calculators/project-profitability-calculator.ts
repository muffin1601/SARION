import type { Calculator } from "../types";
import { formatCurrency, formatPercent, toNumber } from "../format";

export const projectProfitabilityCalculator: Calculator = {
  fields: [
    {
      key: "projectFee",
      label: "Project fee",
      type: "currency",
      min: 0,
      max: 1000000,
      step: 500,
      defaultValue: 12000,
      tooltip: "The total fixed fee you're charging the client for this project",
    },
    {
      key: "estimatedHours",
      label: "Estimated hours",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 2000,
      step: 5,
      defaultValue: 80,
      tooltip: "Total team hours you expect the project to take",
    },
    {
      key: "teamHourlyCost",
      label: "Team hourly cost",
      type: "currency",
      min: 0,
      max: 500,
      step: 5,
      defaultValue: 55,
      tooltip: "What an hour of team time actually costs the agency (loaded cost, not billing rate)",
    },
    {
      key: "otherExpenses",
      label: "Other expenses",
      type: "currency",
      min: 0,
      max: 100000,
      step: 100,
      defaultValue: 500,
      tooltip: "Software, contractor fees, or other direct costs for this project",
    },
  ],

  calculate(inputs) {
    const projectFee = toNumber(inputs.projectFee, 12000);
    const estimatedHours = toNumber(inputs.estimatedHours, 80);
    const teamHourlyCost = toNumber(inputs.teamHourlyCost, 55);
    const otherExpenses = toNumber(inputs.otherExpenses, 500);

    const laborCost = estimatedHours * teamHourlyCost;
    const totalCost = laborCost + otherExpenses;
    const profit = projectFee - totalCost;
    const marginPercent = projectFee > 0 ? (profit / projectFee) * 100 : 0;
    const effectiveHourlyRate = estimatedHours > 0 ? projectFee / estimatedHours : 0;

    return {
      headline: `This project nets ${formatCurrency(profit)} profit at a ${formatPercent(marginPercent)} margin`,
      metrics: [
        { label: "Project profit", value: formatCurrency(profit) },
        { label: "Profit margin", value: formatPercent(marginPercent) },
        { label: "Effective hourly rate", value: formatCurrency(effectiveHourlyRate) },
        { label: "Total project cost", value: formatCurrency(totalCost) },
      ],
      chart: {
        type: "bar",
        data: [
          { label: "Project fee", value: Math.round(projectFee) },
          { label: "Total cost", value: Math.round(totalCost) },
        ],
      },
      recommendations: [
        "Compare the effective hourly rate against your agency's target billing rate to see if this project pulls its weight.",
        "Build a 10-15% buffer into hour estimates to absorb scope creep before it eats into margin.",
        "Track actual hours against the estimate after the project closes so future quotes get more accurate.",
      ],
      nextSteps: [
        "Set up this project in your project management tool so hours are tracked against the estimate.",
        "Turn the agreed fee into an invoice schedule tied to project milestones.",
      ],
      relevantFeatureEyebrows: ["Project Management", "Invoices"],
    };
  },
};
