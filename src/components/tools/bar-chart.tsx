import type { ToolChartData } from "@/lib/tools/types";
import styles from "./bar-chart.module.css";

/** Lightweight inline SVG bar chart — no charting dependency. */
export function BarChart({ data, unit }: { data: ToolChartData[]; unit?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={styles.wrap} role="img" aria-label={data.map((d) => `${d.label}: ${d.value}${unit ?? ""}`).join(", ")}>
      {data.map((d) => (
        <div key={d.label} className={styles.row}>
          <span className={styles.label}>{d.label}</span>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${Math.max((d.value / max) * 100, 2)}%` }}
            />
          </div>
          <span className={styles.value}>
            {d.value}
            {unit ?? ""}
          </span>
        </div>
      ))}
    </div>
  );
}
