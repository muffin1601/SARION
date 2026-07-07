import type { FitGuidanceItem } from "@/content/compare/types";
import styles from "./fit-guidance.module.css";

function GuidanceCards({ items }: { items: FitGuidanceItem[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.title} className={styles.card}>
          <h4 className={styles.title}>{item.title}</h4>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

/** Honest, two-sided "when X is a better fit" guidance — never one-sided. */
export function FitGuidance({
  sarionName,
  competitorName,
  whenSarionFits,
  whenCompetitorFits,
}: {
  sarionName: string;
  competitorName: string;
  whenSarionFits: FitGuidanceItem[];
  whenCompetitorFits: FitGuidanceItem[];
}) {
  return (
    <div className={styles.wrap}>
      <div>
        <p className={styles.label}>When {sarionName} is the better fit</p>
        <GuidanceCards items={whenSarionFits} />
      </div>
      <div>
        <p className={styles.label}>When {competitorName} may be the better fit</p>
        <GuidanceCards items={whenCompetitorFits} />
      </div>
    </div>
  );
}
