import type { ComparisonRow } from "@/content/compare/types";
import styles from "./workflow-comparison.module.css";

export function WorkflowComparisonSection({
  label,
  sarionName,
  competitorName,
  rows,
}: {
  label: string;
  sarionName: string;
  competitorName: string;
  rows: ComparisonRow[];
}) {
  return (
    <div className={styles.section}>
      <p className={styles.label}>{label}</p>
      {rows.map((row) => (
        <div key={row.category} className={styles.row}>
          <p className={styles.category}>{row.category}</p>
          <div className={styles.pair}>
            <div className={styles.cell}>
              <span className="mBadge mBadgeSuccess">{sarionName}</span>
              <p>{row.sarion}</p>
            </div>
            <div className={styles.cell}>
              <span className="mBadge mBadgeInfo">{competitorName}</span>
              <p>{row.competitor}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
