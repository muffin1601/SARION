import type { HowToStep } from "@/content/resources/types";
import styles from "./resource-overview.module.css";

export function ResourceOverview({
  overview,
  whyItMatters,
  whoShouldUseIt,
  howToUseIt,
}: {
  overview: string;
  whyItMatters: string;
  whoShouldUseIt: string[];
  howToUseIt: HowToStep[];
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.block}>
        <p className="mEyebrow">Overview</p>
        <p className={styles.prose}>{overview}</p>
      </div>

      <div className={styles.block}>
        <p className="mEyebrow">Why it matters</p>
        <p className={styles.prose}>{whyItMatters}</p>
      </div>

      <div className={styles.block}>
        <p className="mEyebrow">Who should use it</p>
        <ul className={styles.list}>
          {whoShouldUseIt.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <p className="mEyebrow">How to use it</p>
        <ol className={styles.steps}>
          {howToUseIt.map((step, i) => (
            <li key={step.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <div>
                <p className={styles.stepTitle}>{step.step}</p>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
