import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RevenueForecast } from "@/server/data/finance";

function money(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function RevenueForecastCard({ forecast }: { forecast: RevenueForecast }) {
  const periods = [
    { label: "Next 30 days", value: forecast.days30 },
    { label: "Next 90 days", value: forecast.days90 },
    { label: "Next 12 months", value: forecast.months12 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {periods.map((p) => (
            <div key={p.label} className="rounded-lg border p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{p.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">{money(Math.max(0, p.value))}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{forecast.basis}</p>
      </CardContent>
    </Card>
  );
}
