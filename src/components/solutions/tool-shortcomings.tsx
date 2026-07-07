import type { ToolShortcoming } from "@/content/solutions/types";
import styles from "./tool-shortcomings.module.css";

/** "Why existing tools fail" — named tool categories, never competitor products. */
export function ToolShortcomings({ items }: { items: ToolShortcoming[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.tool} className={styles.row}>
          <span className="mBadge mBadgeWarning">{item.tool}</span>
          <p className={styles.text}>{item.shortcoming}</p>
        </div>
      ))}
    </div>
  );
}
