import Link from "next/link";

import { getResourceCategoryBySlug } from "@/content/resources/categories";
import type { Resource } from "@/content/resources/types";
import styles from "./resource-card.module.css";

export function ResourceCard({ resource }: { resource: Resource }) {
  const category = getResourceCategoryBySlug(resource.category);
  const isLive = resource.status === "live";

  const body = (
    <>
      <div className={styles.badges}>
        {category && <span className="mBadge mBadgeInfo">{category.name}</span>}
        {resource.popular && <span className="mBadge mBadgeSuccess">Popular</span>}
      </div>
      <h3 className={styles.title}>{resource.title}</h3>
      <p className={styles.description}>{resource.metaDescription}</p>
      <div className={styles.status}>
        {isLive ? (
          <span className={styles.cta}>Get it free →</span>
        ) : (
          <span className="mBadge mBadgeWarning">Coming soon</span>
        )}
      </div>
    </>
  );

  if (isLive) {
    return (
      <Link href={`/resources/${resource.category}/${resource.slug}`} className={styles.card} data-live="true">
        {body}
      </Link>
    );
  }

  return (
    <div className={styles.card} data-live="false">
      {body}
    </div>
  );
}
