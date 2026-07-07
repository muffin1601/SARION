import Link from "next/link";
import { Check } from "lucide-react";

import { ProductShot } from "./product-shot";
import styles from "./hero-section.module.css";

const HERO_FEATURES = [
  "CRM",
  "Client Portal",
  "Projects",
  "Invoicing",
  "Team Management",
  "AI Assistant (Coming Soon)",
];

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`mContainer ${styles.inner}`}>
        <div className={styles.copy}>
          <span className="mEyebrow">Agency operating system</span>
          <h1 className={styles.headline}>
            Your agency, out of <em className={styles.accent}>8 tools</em>{" "}
            and into one.
          </h1>
          <p className={styles.subheadline}>
            Clients, projects, invoicing, and a branded client portal — one
            workspace, so nothing slips through the cracks.
          </p>
          <div className={styles.actions}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free Trial
            </Link>
            <Link href="/portal-demo" className="mBtn mBtnSecondary mBtnLg">
              See Portal Demo
            </Link>
          </div>
          <ul className={styles.featureStrip}>
            {HERO_FEATURES.map((feature) => (
              <li key={feature}>
                <Check aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <p className={styles.note}>
            14-day free trial · No credit card required ·{" "}
            <Link href="/scorecard" className={styles.noteLink}>
              Score your agency free →
            </Link>
          </p>
        </div>

        <div className={styles.visual}>
          <ProductShot
            name="dashboard"
            alt="The Sarion dashboard showing clients, active projects, unpaid totals, and recent activity"
            url="trysarion.com/dashboard"
            priority
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </div>
      </div>
    </section>
  );
}
