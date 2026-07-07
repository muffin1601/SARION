import type { Calculator } from "../types";
import { toNumber } from "../format";

export const agencyGrowthScoreCalculator: Calculator = {
  fields: [
    {
      key: "utilizationPercent",
      label: "Team utilization",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 70,
      tooltip: "% of team capacity currently billable.",
    },
    {
      key: "clientRetentionPercent",
      label: "Client retention",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 80,
      tooltip: "% of clients retained year over year.",
    },
    {
      key: "avgProjectMarginPercent",
      label: "Average project margin",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 30,
      tooltip: "Average profit margin across projects/retainers.",
    },
    {
      key: "pipelineHealthPercent",
      label: "Pipeline health",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 50,
      tooltip: "Rough % of next quarter's capacity already booked or in a late-stage proposal.",
    },
  ],

  calculate(inputs) {
    const utilizationPercent = toNumber(inputs.utilizationPercent, 70);
    const clientRetentionPercent = toNumber(inputs.clientRetentionPercent, 80);
    const avgProjectMarginPercent = toNumber(inputs.avgProjectMarginPercent, 30);
    const pipelineHealthPercent = toNumber(inputs.pipelineHealthPercent, 50);

    const rawScore =
      utilizationPercent * 0.3 +
      clientRetentionPercent * 0.3 +
      avgProjectMarginPercent * 0.25 +
      pipelineHealthPercent * 0.15;
    const growthScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    let label: string;
    if (growthScore < 50) {
      label = "Needs attention";
    } else if (growthScore < 75) {
      label = "Solid foundation";
    } else {
      label = "Strong growth position";
    }

    const inputScores = [
      { key: "utilization", name: "Utilization", value: utilizationPercent },
      { key: "retention", name: "Client retention", value: clientRetentionPercent },
      { key: "margin", name: "Project margin", value: avgProjectMarginPercent },
      { key: "pipeline", name: "Pipeline health", value: pipelineHealthPercent },
    ];
    const sortedByLowest = [...inputScores].sort((a, b) => a.value - b.value);
    const lowest = sortedByLowest[0];
    const secondLowest = sortedByLowest[1];

    return {
      headline: `Your Agency Growth Score: ${growthScore} — ${label}`,
      metrics: [
        { label: "Growth score", value: `${growthScore}/100` },
        { label: "Label", value: label },
        { label: "Biggest opportunity", value: lowest.name },
        { label: "Second opportunity", value: secondLowest.name },
      ],
      chart: {
        type: "donut",
        unit: "%",
        data: inputScores.map((s) => ({ label: s.name, value: s.value })),
      },
      recommendations: [
        "Whichever score is lowest is usually the highest-leverage place to focus next.",
        "Utilization and margin compound — small improvements to both multiply.",
        "Re-run this quarterly to track direction, not just the absolute number.",
      ],
      nextSteps: [
        "Set a target for your lowest-scoring input for next quarter.",
        "Share this score with your team as a baseline, then re-measure in 90 days.",
      ],
      relevantFeatureEyebrows: ["Client Management", "Project Management", "Invoices"],
    };
  },
};
