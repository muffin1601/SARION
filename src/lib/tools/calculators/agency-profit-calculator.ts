import type { Calculator } from "../types";
import { formatCurrency, formatPercent, toNumber } from "../format";

export const agencyProfitCalculator: Calculator = {
  fields: [
    {
      key: "monthlyRevenue",
      label: "Monthly revenue",
      type: "currency",
      min: 0,
      max: 500000,
      step: 500,
      defaultValue: 25000,
    },
    {
      key: "monthlyExpenses",
      label: "Monthly expenses",
      type: "currency",
      min: 0,
      max: 500000,
      step: 500,
      defaultValue: 18000,
      tooltip: "Total monthly cost of salaries, tools, and overhead",
    },
    {
      key: "numberOfClients",
      label: "Number of clients",
      type: "number",
      min: 1,
      max: 200,
      step: 1,
      defaultValue: 8,
    },
  ],

  calculate(inputs) {
    const monthlyRevenue = toNumber(inputs.monthlyRevenue, 25000);
    const monthlyExpenses = toNumber(inputs.monthlyExpenses, 18000);
    const numberOfClients = toNumber(inputs.numberOfClients, 8);

    const profit = monthlyRevenue - monthlyExpenses;
    const marginPercent = monthlyRevenue > 0 ? (profit / monthlyRevenue) * 100 : 0;
    const profitPerClient = numberOfClients > 0 ? profit / numberOfClients : 0;
    const annualizedProfit = profit * 12;

    return {
      headline: `You're profiting ${formatCurrency(profit)}/month at a ${formatPercent(marginPercent)} margin`,
      metrics: [
        { label: "Monthly profit", value: formatCurrency(profit) },
        { label: "Profit margin", value: formatPercent(marginPercent) },
        { label: "Profit per client", value: formatCurrency(profitPerClient) },
        { label: "Annualized profit", value: formatCurrency(annualizedProfit) },
      ],
      chart: {
        type: "bar",
        data: [
          { label: "Revenue", value: Math.round(monthlyRevenue) },
          { label: "Expenses", value: Math.round(monthlyExpenses) },
        ],
      },
      recommendations: [
        "A healthy small-agency margin is typically 15-25% — if you're below that, look at expense creep before raising prices.",
        "Review your recurring monthly expenses line by line; subscriptions and tools tend to accumulate quietly.",
        "Re-run this calculator quarterly with real numbers so margin trends don't sneak up on you.",
      ],
      nextSteps: [
        "Check whether your current pricing supports this margin using an hourly rate or retainer pricing tool.",
        "Look at profit per client to see if any accounts are quietly dragging your margin down.",
      ],
      relevantFeatureEyebrows: ["Invoices", "Client Management"],
    };
  },
};
