import type { ComparisonRow } from "@/content/compare/types";
import styles from "./feature-matrix.module.css";

/** Named-competitor comparison table — same visual language as the
 *  homepage's Comparison component, generalized to any competitor name. */
export function FeatureMatrix({
  sarionName,
  competitorName,
  rows,
}: {
  sarionName: string;
  competitorName: string;
  rows: ComparisonRow[];
}) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Capability</th>
            <th scope="col">{sarionName}</th>
            <th scope="col">{competitorName}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.category}>
              <th scope="row" className={styles.rowHead}>
                {row.category}
              </th>
              <td className={styles.sarionCol}>{row.sarion}</td>
              <td>{row.competitor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
