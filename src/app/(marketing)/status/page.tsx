import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./status.module.css";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Sarion's system status page. Status is currently reviewed manually — automated uptime monitoring and a public API status feed are on our roadmap.",
  alternates: { canonical: "/status" },
  openGraph: {
    title: "System Status",
    description:
      "Sarion's system status page. Status is currently reviewed manually — automated uptime monitoring and a public API status feed are on our roadmap.",
    url: "/status",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Status", path: "/status" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "System Status",
  description:
    "Sarion's system status page. Status is currently reviewed manually — automated uptime monitoring and a public API status feed are on our roadmap.",
  url: "/status",
});

const SYSTEMS = [
  { name: "Website", status: "Operational" },
  { name: "Application", status: "Operational" },
  { name: "API", status: "Not yet public" },
];

const RELATED_LINKS = [
  {
    label: "Trust Center",
    description: "How Sarion approaches security, privacy, and reliability.",
    href: "/trust",
  },
  {
    label: "Security",
    description: "Details on how Sarion protects your data.",
    href: "/security",
  },
  {
    label: "Changelog",
    description: "See what's shipped recently.",
    href: "/changelog",
  },
];

function StatusBadge() {
  return (
    <span className={styles.badge}>
      <span className={styles.dot} aria-hidden="true" />
      All Systems Operational
    </span>
  );
}

export default function StatusPage() {
  return (
    <>
      <JsonLd id="status-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="status-webpage-schema" data={WEBPAGE_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <div className={styles.hero}>
            <span className="mEyebrow">System Status</span>
            <h1 className={styles.headline}>Sarion system status</h1>
            <StatusBadge />
            <p className={styles.subheadline}>
              Status is currently reviewed manually; automated monitoring is
              on the roadmap. This page reflects the state of Sarion&apos;s
              systems as we understand it, not a live automated check.
            </p>
          </div>
        </div>
      </section>

      {/* Current status */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="Current Status" title="Core systems" />
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>System</span>
              <span>Status</span>
            </div>
            {SYSTEMS.map((system) => (
              <div key={system.name} className={styles.tableRow}>
                <span className={styles.systemName}>{system.name}</span>
                <span className={styles.systemStatus}>
                  <span className={styles.smallDot} aria-hidden="true" />
                  {system.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident history */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="Incident History" title="No incidents reported" />
          <p className={styles.note}>
            We haven&apos;t recorded any incidents. Once automated monitoring is
            live, this section will show real incident history as it
            happens.
          </p>
        </div>
      </section>

      {/* Maintenance */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="Maintenance" title="No maintenance currently scheduled" />
          <p className={styles.note}>
            When we schedule maintenance that could affect Sarion, we&apos;ll
            announce it here ahead of time.
          </p>
        </div>
      </section>

      {/* Future monitoring */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="Future Monitoring" title="What's coming" />
          <p className={styles.note}>
            We&apos;re planning to add automated uptime monitoring and a public
            API status feed as Sarion&apos;s API moves toward general
            availability. Track progress on our{" "}
            <Link href="/roadmap" className={styles.inlineLink}>
              roadmap
            </Link>
            .
          </p>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Questions about Sarion's reliability?"
        subtext="Reach out and we'll be glad to walk you through it."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Trust Center"
        secondaryHref="/trust"
      />
    </>
  );
}
