import type { Calculator } from "../types";
import { formatHours, toNumber } from "../format";

export const clientCapacityCalculator: Calculator = {
  fields: [
    {
      key: "teamMembers",
      label: "Team members",
      type: "number",
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 4,
    },
    {
      key: "avgHoursPerWeekPerMember",
      label: "Avg. hours/week per member",
      type: "number",
      unit: "hrs",
      min: 1,
      max: 60,
      step: 1,
      defaultValue: 35,
      tooltip: "Average working hours per team member per week",
    },
    {
      key: "utilizationTargetPercent",
      label: "Utilization target",
      type: "percent",
      min: 10,
      max: 100,
      step: 5,
      defaultValue: 75,
      tooltip:
        "Realistic % of working hours that go to billable/client work, after meetings, admin, and internal work",
    },
    {
      key: "avgHoursPerClientPerWeek",
      label: "Avg. hours/client/week",
      type: "number",
      unit: "hrs",
      min: 0.5,
      max: 40,
      step: 0.5,
      defaultValue: 4,
      tooltip: "Average hours of team time a single client needs per week",
    },
  ],

  calculate(inputs) {
    const teamMembers = toNumber(inputs.teamMembers, 4);
    const avgHoursPerWeekPerMember = toNumber(inputs.avgHoursPerWeekPerMember, 35);
    const utilizationTargetPercent = toNumber(inputs.utilizationTargetPercent, 75);
    const avgHoursPerClientPerWeek = toNumber(inputs.avgHoursPerClientPerWeek, 4);

    const capacityHours = teamMembers * avgHoursPerWeekPerMember * (utilizationTargetPercent / 100);
    const maxClients =
      avgHoursPerClientPerWeek > 0 ? Math.floor(capacityHours / avgHoursPerClientPerWeek) : 0;
    const hoursNeededForMaxClients = maxClients * avgHoursPerClientPerWeek;

    return {
      headline: `Your team can realistically support about ${maxClients} clients at once`,
      metrics: [
        { label: "Weekly capacity hours", value: formatHours(capacityHours) },
        { label: "Max clients at current capacity", value: String(maxClients) },
        { label: "Hours per client assumed", value: formatHours(avgHoursPerClientPerWeek) },
      ],
      chart: {
        type: "bar",
        unit: " hrs/wk",
        data: [
          { label: "Capacity hours", value: Math.round(capacityHours * 10) / 10 },
          { label: "Hours needed", value: Math.round(hoursNeededForMaxClients * 10) / 10 },
        ],
      },
      recommendations: [
        "Raise utilization gradually and only if meetings/admin overhead is already well controlled — pushing past 85% usually burns people out.",
        "Before hiring, check whether redistributing low-value clients frees up enough capacity first.",
        "Revisit this each time your team size or average hours per client changes materially.",
      ],
      nextSteps: [
        "Use a project profitability calculator to see whether your current clients are worth the hours they take.",
        "Check a team cost calculator to see what capacity actually costs to staff.",
      ],
      relevantFeatureEyebrows: ["Project Management", "Team Collaboration"],
    };
  },
};
