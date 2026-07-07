import Link from "next/link";

import type { Industry } from "@/content/solutions/types";
import styles from "./industry-card.module.css";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link href={`/solutions/${industry.slug}`} className={styles.card}>
      <h3 className={styles.title}>{industry.name}</h3>
      <p className={styles.description}>{industry.heroSubhead}</p>
      <span className={styles.cta}>See how it fits →</span>
    </Link>
  );
}
