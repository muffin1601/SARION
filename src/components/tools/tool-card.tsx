import Link from "next/link";
import { Calculator } from "lucide-react";

import type { ToolContent } from "@/content/tools/types";
import styles from "./tool-card.module.css";

export function ToolCard({ tool }: { tool: ToolContent }) {
  return (
    <Link href={`/tools/${tool.slug}`} className={styles.card}>
      <span className={styles.iconWrap}>
        <Calculator size={18} aria-hidden />
      </span>
      <h3 className={styles.title}>{tool.title}</h3>
      <p className={styles.description}>{tool.metaDescription}</p>
      <span className={styles.cta}>Calculate →</span>
    </Link>
  );
}
