import Link from "next/link";

import { FEATURE_SECTIONS } from "@/lib/marketing/features";
import styles from "./relevant-features.module.css";

/** Filters the real Features-page sections down to the ones relevant to an industry. */
export function RelevantFeatures({ eyebrows }: { eyebrows: string[] }) {
  const sections = FEATURE_SECTIONS.filter((s) => eyebrows.includes(s.eyebrow));
  if (!sections.length) return null;

  return (
    <div className={styles.grid}>
      {sections.map((section) => (
        <div key={section.eyebrow} className={styles.card}>
          <span className="mEyebrow">{section.eyebrow}</span>
          <h3 className={styles.title}>{section.title}</h3>
          <p className={styles.benefit}>{section.benefit}</p>
          <ul className={styles.list}>
            {section.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      ))}
      <Link href="/features" className={styles.moreLink}>
        See every feature →
      </Link>
    </div>
  );
}
