import type { RoadmapArea, RoadmapItem } from "@/content/roadmap/types";
import styles from "./roadmap-column.module.css";

const AREA_LABEL: Record<RoadmapArea, string> = {
  ai: "AI",
  portal: "Portal",
  crm: "CRM",
  mobile: "Mobile",
  automation: "Automation",
};

export function RoadmapColumn({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: RoadmapItem[];
}) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.items}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.title} className={styles.item}>
              <span className="mBadge mBadgeInfo">{AREA_LABEL[item.area]}</span>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Nothing in this column yet.</p>
        )}
      </div>
    </div>
  );
}
