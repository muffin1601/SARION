import type { Integration } from "@/content/integrations/types";
import styles from "./integration-card.module.css";

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{integration.name}</h3>
        <span className={integration.status === "coming-soon" ? "mBadge mBadgeWarning" : "mBadge mBadgeInfo"}>
          {integration.status === "coming-soon" ? "Coming Soon" : "Requested"}
        </span>
      </div>
      <p className={styles.description}>{integration.description}</p>
      <ul className={styles.benefits}>
        {integration.benefits.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
