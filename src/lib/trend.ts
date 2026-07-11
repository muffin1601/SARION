export interface TrendValue {
  direction: "up" | "down" | "flat";
  percent: number;
}

/** Shared by src/server/data/{dashboard,finance}.ts so both compute trends identically. */
export function computeTrend(current: number, previous: number): TrendValue | null {
  if (previous === 0 && current === 0) return null;
  if (previous === 0) return { direction: "up", percent: 100 };
  const delta = ((current - previous) / previous) * 100;
  if (Math.abs(delta) < 1) return { direction: "flat", percent: 0 };
  return { direction: delta > 0 ? "up" : "down", percent: Math.round(Math.abs(delta)) };
}
