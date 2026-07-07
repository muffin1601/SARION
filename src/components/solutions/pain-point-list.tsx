import type { PainPoint } from "@/content/solutions/types";
import styles from "./pain-point-list.module.css";

export function PainPointList({ items }: { items: PainPoint[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.title} className={styles.card}>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
