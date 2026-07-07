import Link from "next/link";

import type { Comparison } from "@/content/compare/types";
import styles from "./comparison-card.module.css";

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Link href={`/compare/${comparison.slug}`} className={styles.card}>
      <span className="mBadge mBadgeInfo">{comparison.category.replace(/-/g, " ")}</span>
      <h3 className={styles.title}>Sarion vs. {comparison.competitorName}</h3>
      <p className={styles.description}>{comparison.quickSummary}</p>
      <span className={styles.cta}>Read comparison →</span>
    </Link>
  );
}
