import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HealthScore } from "@/lib/health-score";

const CATEGORY_LABEL: Record<keyof HealthScore["categories"], string> = {
  sales: "Sales",
  projects: "Projects",
  finance: "Finance",
  operations: "Operations",
  customerSuccess: "Customer Success",
};

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-destructive";
}

function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        className="fill-none stroke-muted"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={cn("fill-none stroke-current transition-all", scoreColor(score))}
      />
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        dominantBaseline="middle"
        className={cn("fill-current text-3xl font-bold", scoreColor(score))}
      >
        {score}
      </text>
      <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-xs">
        / 100
      </text>
    </svg>
  );
}

export function HealthScoreCard({ health }: { health: HealthScore }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Health Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={health.overall} />
          <span className="text-sm font-medium text-muted-foreground">Overall</span>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {(Object.keys(health.categories) as (keyof HealthScore["categories"])[]).map((key) => {
            const category = health.categories[key];
            return (
              <div key={key} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{CATEGORY_LABEL[key]}</span>
                  <span className={cn("text-lg font-bold tabular-nums", scoreColor(category.score))}>
                    {category.score}
                  </span>
                </div>
                <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                  {category.reasons.map((reason) => (
                    <li key={reason}>• {reason}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs font-medium text-primary">{category.suggestion}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
