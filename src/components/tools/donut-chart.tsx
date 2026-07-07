import type { ToolChartData } from "@/lib/tools/types";
import styles from "./donut-chart.module.css";

const COLORS = ["var(--m-primary)", "var(--m-success)", "var(--m-warning)", "var(--m-fg-subtle)"];
const SIZE = 160;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Lightweight inline SVG donut chart — no charting dependency. */
export function DonutChart({ data, unit }: { data: ToolChartData[]; unit?: string }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  let offset = 0;

  return (
    <div className={styles.wrap}>
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={data.map((d) => `${d.label}: ${d.value}${unit ?? ""}`).join(", ")}
      >
        <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
          {data.map((d, i) => {
            const fraction = d.value / total;
            const dash = fraction * CIRCUMFERENCE;
            const segment = (
              <circle
                key={d.label}
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={COLORS[i % COLORS.length]}
                strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return segment;
          })}
        </g>
      </svg>
      <ul className={styles.legend}>
        {data.map((d, i) => (
          <li key={d.label}>
            <span className={styles.swatch} style={{ background: COLORS[i % COLORS.length] }} />
            {d.label} — {d.value}
            {unit ?? ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
