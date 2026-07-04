import { PRODUCT_STATS } from "@/lib/marketing/products";
import styles from "./stats-strip.module.css";

export function StatsStrip() {
  return (
    <div className={styles.grid}>
      {PRODUCT_STATS.map((stat) => (
        <div key={stat.label} className={styles.tile}>
          <div className={styles.value}>{stat.value}</div>
          <div className={styles.label}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
