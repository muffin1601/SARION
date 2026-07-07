import type { Calculator } from "../types";
import { formatCurrency, formatNumber, toNumber } from "../format";

export const hourlyRateCalculator: Calculator = {
  fields: [
    {
      key: "desiredAnnualIncome",
      label: "Desired annual income",
      type: "currency",
      min: 0,
      max: 1000000,
      step: 1000,
      defaultValue: 90000,
      tooltip: "What you want to personally take home or profit per year from this work",
    },
    {
      key: "annualOverheadCosts",
      label: "Annual overhead costs",
      type: "currency",
      min: 0,
      max: 500000,
      step: 500,
      defaultValue: 15000,
      tooltip: "Tools, software, insurance, and other business costs per year",
    },
    {
      key: "billableHoursPerWeek",
      label: "Billable hours/week",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 60,
      step: 1,
      defaultValue: 25,
      tooltip: "Hours per week you can realistically bill, not total working hours",
    },
    {
      key: "weeksWorkedPerYear",
      label: "Weeks worked/year",
      type: "number",
      unit: "wks",
      min: 1,
      max: 52,
      step: 1,
      defaultValue: 48,
    },
  ],

  calculate(inputs) {
    const desiredAnnualIncome = toNumber(inputs.desiredAnnualIncome, 90000);
    const annualOverheadCosts = toNumber(inputs.annualOverheadCosts, 15000);
    const billableHoursPerWeek = toNumber(inputs.billableHoursPerWeek, 25);
    const weeksWorkedPerYear = toNumber(inputs.weeksWorkedPerYear, 48);

    const annualBillableHours = billableHoursPerWeek * weeksWorkedPerYear;
    const totalAnnualTarget = desiredAnnualIncome + annualOverheadCosts;
    const minHourlyRate = annualBillableHours > 0 ? totalAnnualTarget / annualBillableHours : 0;

    return {
      headline: `You need to charge at least ${formatCurrency(minHourlyRate)}/hour to hit your goal`,
      metrics: [
        { label: "Minimum hourly rate", value: formatCurrency(minHourlyRate) },
        { label: "Annual billable hours", value: formatNumber(annualBillableHours, 0) },
        { label: "Total annual target", value: formatCurrency(totalAnnualTarget) },
      ],
      chart: {
        type: "bar",
        data: [
          { label: "Desired income", value: Math.round(desiredAnnualIncome) },
          { label: "Overhead costs", value: Math.round(annualOverheadCosts) },
        ],
      },
      recommendations: [
        "Treat this as a bare minimum — build in a buffer of 10-20% for slow months and rate negotiation.",
        "Remember this only accounts for billable hours; admin, sales, and marketing time isn't in this number.",
        "Revisit this rate whenever overhead costs or your income goal changes, not just once a year.",
      ],
      nextSteps: [
        "Use a project profitability calculator to check whether current projects actually clear this rate.",
        "Compare this rate against a retainer pricing calculator if you package work into retainers.",
      ],
      relevantFeatureEyebrows: ["Invoices", "Project Management"],
    };
  },
};
