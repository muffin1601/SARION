import { NewsletterForm } from "@/components/marketing/newsletter-form";
import styles from "./newsletter-cta.module.css";

/** Reuses the existing NewsletterForm — no new subscribe logic. */
export function NewsletterCta() {
  return (
    <div className={`${styles.wrap} mSectionAlt`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Get new articles in your inbox</h2>
        <p className={styles.description}>
          One practical agency-operations article, sent when we publish. No spam.
        </p>
        <NewsletterForm />
      </div>
    </div>
  );
}
