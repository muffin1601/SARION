export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, decimals = 1): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 0): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatHours(value: number): string {
  return `${formatNumber(value)} hr${value === 1 ? "" : "s"}`;
}

/** Coerces a form input value (string from a controlled input) to a number, falling back safely. */
export function toNumber(value: number | string, fallback = 0): number {
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}
