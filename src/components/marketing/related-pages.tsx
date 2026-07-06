import Link from "next/link";

import styles from "./related-pages.module.css";

export interface RelatedPageLink {
  label: string;
  description: string;
  href: string;
}

/** Compact internal-linking block — placed above a page's final CTA. */
export function RelatedPages({ links }: { links: RelatedPageLink[] }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.heading}>Related pages</p>
      <div className={styles.grid}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.card}>
            <p className={styles.label}>{link.label}</p>
            <p className={styles.description}>{link.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
