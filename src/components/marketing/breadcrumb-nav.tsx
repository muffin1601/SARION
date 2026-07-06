import Link from "next/link";

import styles from "./breadcrumb-nav.module.css";

export interface BreadcrumbTrailItem {
  name: string;
  path: string;
}

/**
 * Visible breadcrumb trail matching the same data already passed to
 * breadcrumbSchema() — keeps the visible trail and the structured data in
 * sync by construction.
 */
export function BreadcrumbNav({ trail }: { trail: BreadcrumbTrailItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.trail}>
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <span key={item.path}>
            {i > 0 && <span className={styles.sep}> / </span>}
            {isLast ? (
              <span className={styles.current} aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className={styles.link}>
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
