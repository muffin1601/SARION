import type { WorkflowStep } from "@/content/solutions/types";
import styles from "./workflow-steps.module.css";

export function WorkflowSteps({ items }: { items: WorkflowStep[] }) {
  return (
    <ol className={styles.list}>
      {items.map((item, i) => (
        <li key={item.step} className={styles.item}>
          <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className={styles.step}>{item.step}</p>
            <p className={styles.description}>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
