import type { ChangelogEntry } from "@/content/changelog/types";
import styles from "./changelog-entry.module.css";

const TYPE_BADGE: Record<ChangelogEntry["type"], string> = {
  feature: "mBadgeSuccess",
  fix: "mBadgeWarning",
  announcement: "mBadgeInfo",
};

const TYPE_LABEL: Record<ChangelogEntry["type"], string> = {
  feature: "Feature",
  fix: "Fix",
  announcement: "Announcement",
};

export function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
  const formatted = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={styles.entry}>
      <div className={styles.meta}>
        <time dateTime={entry.date} className={styles.date}>
          {formatted}
        </time>
        <span className={`mBadge ${TYPE_BADGE[entry.type]}`}>{TYPE_LABEL[entry.type]}</span>
      </div>
      <h3 className={styles.title}>{entry.title}</h3>
      <p className={styles.description}>{entry.description}</p>
      {entry.tags.length > 0 && (
        <div className={styles.tags}>
          {entry.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
