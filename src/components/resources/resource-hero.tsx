import { SectionHeader } from "@/components/marketing/section-header";
import type { ResourceCategory } from "@/content/resources/categories";
import styles from "./resource-hero.module.css";

export function ResourceHero({
  category,
  headline,
  subhead,
  tags,
}: {
  category: ResourceCategory;
  headline: string;
  subhead: string;
  tags: string[];
}) {
  return (
    <div>
      <SectionHeader as="h1" align="left" eyebrow={category.name} title={headline} description={subhead} />
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className="mBadge mBadgeInfo">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
