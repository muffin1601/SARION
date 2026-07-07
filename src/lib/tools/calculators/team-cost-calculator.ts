import type { Calculator } from "../types";
import { formatCurrency, toNumber } from "../format";

export const teamCostCalculator: Calculator = {
  fields: [
    {
      key: "teamSize",
      label: "Team size",
      type: "number",
      min: 1,
      max: 500,
      step: 1,
      defaultValue: 5,
    },
    {
      key: "avgAnnualSalary",
      label: "Average annual salary",
      type: "currency",
      min: 0,
      max: 500000,
      step: 1000,
      defaultValue: 65000,
      tooltip: "Average annual salary or contractor cost per team member",
    },
    {
      key: "overheadPercent",
      label: "Overhead",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 25,
      tooltip: "Benefits, taxes, tools, and other overhead as a % of salary",
    },
  ],

  calculate(inputs) {
    const teamSize = toNumber(inputs.teamSize, 5);
    const avgAnnualSalary = toNumber(inputs.avgAnnualSalary, 65000);
    const overheadPercent = toNumber(inputs.overheadPercent, 25);

    const costPerMember = avgAnnualSalary * (1 + overheadPercent / 100);
    const totalAnnualTeamCost = costPerMember * teamSize;
    const monthlyTeamCost = totalAnnualTeamCost / 12;
    const overheadCostPerMember = costPerMember - avgAnnualSalary;
    const baseSalariesTotal = avgAnnualSalary * teamSize;

    return {
      headline: `Your team costs about ${formatCurrency(totalAnnualTeamCost)}/year fully loaded`,
      metrics: [
        { label: "Total annual team cost", value: formatCurrency(totalAnnualTeamCost) },
        { label: "Monthly team cost", value: formatCurrency(monthlyTeamCost) },
        { label: "Fully-loaded cost per member", value: formatCurrency(costPerMember) },
        { label: "Overhead cost per member", value: formatCurrency(overheadCostPerMember) },
      ],
      chart: {
        type: "bar",
        data: [
          { label: "Base salaries total", value: Math.round(baseSalariesTotal) },
          { label: "Total with overhead", value: Math.round(totalAnnualTeamCost) },
        ],
      },
      recommendations: [
        "Use this fully-loaded number as the floor when pricing projects and retainers, not just base salary.",
        "Revisit overhead assumptions yearly as benefits, tools, and taxes change.",
        "Compare cost per member against revenue per member to see if the team is sized correctly.",
      ],
      nextSteps: [
        "Add each team member's loaded cost to your project management tool for accurate margin tracking.",
        "Share this number with leadership when setting billing rates for the next quarter.",
      ],
      relevantFeatureEyebrows: ["Team Collaboration", "Invoices"],
    };
  },
};
