import type { SolutionMappingItem } from "@/content/solutions/types";
import styles from "./solution-mapping.module.css";

export function SolutionMapping({ items }: { items: SolutionMappingItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.problem} className={styles.row}>
          <div className={styles.problem}>
            <span className="mBadge mBadgeWarning">Problem</span>
            <p>{item.problem}</p>
          </div>
          <div className={styles.solution}>
            <span className="mBadge mBadgeSuccess">Sarion</span>
            <p>{item.solution}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
