import type { Calculator } from "../types";
import { formatCurrency, toNumber } from "../format";

export const leadValueCalculator: Calculator = {
  fields: [
    {
      key: "leadsPerMonth",
      label: "Leads per month",
      type: "number",
      min: 0,
      max: 1000,
      step: 1,
      defaultValue: 20,
      tooltip: "New inbound or outbound leads your agency gets per month.",
    },
    {
      key: "leadToClientConversionPercent",
      label: "Lead-to-client conversion",
      type: "percent",
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 15,
      tooltip: "% of leads that become paying clients.",
    },
    {
      key: "avgFirstProjectValue",
      label: "Average first project value",
      type: "currency",
      min: 0,
      max: 500000,
      step: 500,
      defaultValue: 6000,
      tooltip: "Average revenue from a new client's first project or first month.",
    },
  ],

  calculate(inputs) {
    const leadsPerMonth = toNumber(inputs.leadsPerMonth, 20);
    const leadToClientConversionPercent = toNumber(inputs.leadToClientConversionPercent, 15);
    const avgFirstProjectValue = toNumber(inputs.avgFirstProjectValue, 6000);

    const conversionRate = leadToClientConversionPercent / 100;
    const newClientsPerMonth = leadsPerMonth * conversionRate;
    const monthlyValueGenerated = newClientsPerMonth * avgFirstProjectValue;
    const annualValueGenerated = monthlyValueGenerated * 12;

    // valuePerLead equals monthlyValueGenerated / leadsPerMonth, but computed
    // directly so it stays defined (and correct) even when leadsPerMonth is 0.
    const valuePerLead = avgFirstProjectValue * conversionRate;

    return {
      headline: `Each lead is worth about ${formatCurrency(valuePerLead)} to your pipeline`,
      metrics: [
        { label: "Value per lead", value: formatCurrency(valuePerLead) },
        { label: "New clients per month", value: String(Math.round(newClientsPerMonth * 10) / 10) },
        { label: "Monthly value generated", value: formatCurrency(monthlyValueGenerated) },
        { label: "Annual value generated", value: formatCurrency(annualValueGenerated) },
      ],
      chart: {
        type: "bar",
        unit: "",
        data: [
          { label: "Leads per month", value: Math.round(leadsPerMonth * 10) / 10 },
          { label: "New clients per month", value: Math.round(newClientsPerMonth * 10) / 10 },
        ],
      },
      recommendations: [
        "Use this per-lead value as a ceiling for how much you're willing to spend acquiring one more lead.",
        "Track conversion rate by lead source separately — a $5k CPC lead and a $0 referral lead are not equally valuable.",
        "Following up faster with new leads is usually the cheapest way to raise this number without spending more on lead gen.",
      ],
      nextSteps: [
        "See how a structured client record keeps new leads from falling through the cracks after handoff.",
        "Run the Client Lifetime Value Calculator to see what a converted lead is worth beyond the first project.",
      ],
      relevantFeatureEyebrows: ["Client Management", "Team Collaboration"],
    };
  },
};
