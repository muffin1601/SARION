import { TEAM } from "@/lib/marketing/team";
import styles from "./founder-note.module.css";

const FOUNDER = TEAM[0];

/**
 * Honest credibility for a brand-new product: a short note on why Sarion exists,
 * in place of fabricated testimonials or customer logos.
 */
export function FounderNote() {
  return (
    <section className={`mSection ${styles.section}`}>
      <div className="mContainer">
        <div className={styles.card}>
          <span className={styles.eyebrow}>Why we built Sarion</span>
          <p className={styles.quote}>
            “Sarion was built to replace the scattered spreadsheets, chat
            threads, and tools agencies juggle every day. The goal is simple:
            manage clients, projects, invoices, and communication from one
            workspace.”
          </p>
          <div className={styles.founder}>
            <span className={styles.avatar}>{FOUNDER.initials}</span>
            <div className={styles.founderText}>
              <span className={styles.founderName}>{FOUNDER.name}</span>
              <span className={styles.founderTitle}>{FOUNDER.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
