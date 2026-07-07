import type { Calculator } from "../types";
import { formatCurrency, formatHours, toNumber } from "../format";

export const agencyCrmRoiCalculator: Calculator = {
  fields: [
    {
      key: "activeClients",
      label: "Active clients",
      type: "number",
      min: 1,
      max: 200,
      step: 1,
      defaultValue: 10,
      tooltip: "How many clients your agency is actively serving right now.",
    },
    {
      key: "statusUpdateHours",
      label: "Hours/week on status updates",
      type: "number",
      unit: "hrs",
      min: 0,
      max: 40,
      step: 0.5,
      defaultValue: 5,
      tooltip: "Time spent writing client status emails, replying to \"how's it going?\" messages, and reconciling spreadsheets.",
    },
    {
      key: "invoiceAdminHours",
      label: "Hours/week on invoice admin",
      type: "number",
      unit: "hrs",
      min: 0,
      max: 20,
      step: 0.5,
      defaultValue: 2,
      tooltip: "Time spent creating, sending, and chasing invoices manually.",
    },
    {
      key: "hourlyCost",
      label: "Loaded hourly cost of that time",
      type: "currency",
      min: 10,
      max: 300,
      step: 5,
      defaultValue: 60,
      tooltip: "What an hour of the person doing this admin work actually costs the agency (salary + overhead, not billing rate).",
    },
  ],

  calculate(inputs) {
    const activeClients = toNumber(inputs.activeClients, 10);
    const statusUpdateHours = toNumber(inputs.statusUpdateHours, 5);
    const invoiceAdminHours = toNumber(inputs.invoiceAdminHours, 2);
    const hourlyCost = toNumber(inputs.hourlyCost, 60);

    const weeklyHours = statusUpdateHours + invoiceAdminHours;
    const annualHours = weeklyHours * 52;
    const annualCost = annualHours * hourlyCost;

    // Conservative, transparent assumption: a client portal + tied invoicing
    // removes roughly 70% of manual status-update time and 50% of manual
    // invoice-admin time — these are stated explicitly, not hidden.
    const hoursSavedWeekly = statusUpdateHours * 0.7 + invoiceAdminHours * 0.5;
    const annualSavings = hoursSavedWeekly * 52 * hourlyCost;

    return {
      headline: `Manual status updates and invoicing cost this agency about ${formatCurrency(annualCost)}/year`,
      metrics: [
        { label: "Hours spent weekly", value: formatHours(weeklyHours) },
        { label: "Annual cost of that time", value: formatCurrency(annualCost) },
        {
          label: "Potential annual savings",
          value: formatCurrency(annualSavings),
          helpText: "Assumes ~70% less status-update time and ~50% less invoice admin with a client portal.",
        },
        { label: "Clients served", value: String(activeClients) },
      ],
      chart: {
        type: "bar",
        unit: " hrs/wk",
        data: [
          { label: "Status updates", value: Math.round(statusUpdateHours * 10) / 10 },
          { label: "Invoice admin", value: Math.round(invoiceAdminHours * 10) / 10 },
        ],
      },
      recommendations: [
        "Move recurring status updates to a client-visible record instead of a written recap each time.",
        "Tie invoicing to the same client/project record so status and billing never fall out of sync.",
        "Re-run this calculator in 3 months with your real numbers after making a change.",
      ],
      nextSteps: [
        "See what a branded client portal looks like in the Portal Demo.",
        "Check whether your active client count fits comfortably in a Starter or Growth plan.",
      ],
      relevantFeatureEyebrows: ["Client Portal", "Invoices", "Client Management"],
    };
  },
};
