import type { Calculator } from "../types";
import { formatNumber, formatPercent, toNumber } from "../format";

export const projectTimelineEstimator: Calculator = {
  fields: [
    {
      key: "totalEstimatedHours",
      label: "Total estimated hours",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 5000,
      step: 5,
      defaultValue: 120,
      tooltip: "Total estimated team hours for the whole project.",
    },
    {
      key: "teamMembersOnProject",
      label: "Team members on project",
      type: "number",
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 2,
    },
    {
      key: "hoursAvailablePerMemberPerWeek",
      label: "Hours available per member per week",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 40,
      step: 1,
      defaultValue: 15,
      tooltip: "Hours per week each team member can realistically dedicate to this project, accounting for other work.",
    },
    {
      key: "bufferPercent",
      label: "Buffer",
      type: "percent",
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 20,
      tooltip: "Extra time buffer for revisions, client feedback delays, and the unexpected.",
    },
  ],

  calculate(inputs) {
    const totalEstimatedHours = toNumber(inputs.totalEstimatedHours, 120);
    const teamMembersOnProject = toNumber(inputs.teamMembersOnProject, 2);
    const hoursAvailablePerMemberPerWeek = toNumber(inputs.hoursAvailablePerMemberPerWeek, 15);
    const bufferPercent = toNumber(inputs.bufferPercent, 20);

    const weeklyTeamCapacity = teamMembersOnProject * hoursAvailablePerMemberPerWeek;
    const baseWeeks = weeklyTeamCapacity > 0 ? totalEstimatedHours / weeklyTeamCapacity : 0;
    const estimatedWeeks = baseWeeks * (1 + bufferPercent / 100);
    const estimatedWeeksRoundedUp = Math.ceil(estimatedWeeks);

    return {
      headline: `Plan for about ${estimatedWeeksRoundedUp} week${estimatedWeeksRoundedUp === 1 ? "" : "s"}, including buffer`,
      metrics: [
        { label: "Base timeline (no buffer)", value: `${formatNumber(baseWeeks)} wks` },
        { label: "Realistic timeline (with buffer)", value: `${formatNumber(estimatedWeeks)} wks` },
        { label: "Weekly team capacity", value: `${formatNumber(weeklyTeamCapacity)} hrs/wk` },
        { label: "Buffer applied", value: formatPercent(bufferPercent) },
      ],
      chart: {
        type: "bar",
        unit: " wks",
        data: [
          { label: "Base weeks", value: Math.round(baseWeeks * 10) / 10 },
          { label: "Realistic weeks", value: Math.round(estimatedWeeks * 10) / 10 },
        ],
      },
      recommendations: [
        "Quote the buffered timeline, not the base estimate — buffer protects client trust when revisions or delays happen.",
        "Communicate a range (e.g. base to buffered weeks) rather than a single hard date.",
        "Revisit this estimate at each project milestone as real hours logged start to differ from the plan.",
      ],
      nextSteps: [
        "See how project milestones and shared timelines look in a client-visible portal.",
        "Run the Team Cost Calculator to see what this timeline actually costs to deliver.",
      ],
      relevantFeatureEyebrows: ["Project Management", "Client Portal"],
    };
  },
};
