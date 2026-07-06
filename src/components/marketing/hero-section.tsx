import Link from "next/link";
import { Check } from "lucide-react";

import { ProductShot } from "./product-shot";
import { ScorecardLink } from "./scorecard-link";
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
            Stop juggling 8 tools. Run your entire agency from{" "}
            <em className={styles.accent}>one workspace</em>.
          </h1>
          <p className={styles.subheadline}>
            Win back hours every week — clients, projects, invoicing, a
            branded client portal, and your team, all in one place.
          </p>
          <div className={styles.actions}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
            <Link href="#demo" className="mBtn mBtnSecondary mBtnLg">
              Watch Demo
            </Link>
            <ScorecardLink placement="home_hero" className="mBtn mBtnGhost mBtnLg">
              Score your agency →
            </ScorecardLink>
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
            14-day free trial · No credit card required
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
