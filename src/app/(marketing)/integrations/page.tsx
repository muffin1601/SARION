import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { CTASection } from "@/components/marketing/cta-section";
import { IntegrationCard } from "@/components/trust/integration-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { INTEGRATIONS } from "@/content/integrations/integrations";
import styles from "./integrations.module.css";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Sarion's integration roadmap — API, webhooks, Zapier, Slack, and more. See what's coming soon and what's been requested.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations · Sarion",
    description: "Sarion's integration roadmap — what's coming soon and what's requested.",
    url: "/integrations",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Integrations", path: "/integrations" },
];

const RELATED_LINKS = [
  { label: "Roadmap", description: "See automation and API work in the broader roadmap.", href: "/roadmap" },
  { label: "Changelog", description: "What's already shipped.", href: "/changelog" },
  { label: "Contact", description: "Ask about an integration you need.", href: "/contact" },
];

export default function IntegrationsPage() {
  const comingSoon = INTEGRATIONS.filter((i) => i.status === "coming-soon");
  const requested = INTEGRATIONS.filter((i) => i.status === "requested");

  return (
    <>
      <JsonLd id="integrations-breadcrumb" data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        id="integrations-list"
        data={itemListSchema(INTEGRATIONS.map((i) => ({ name: i.name, url: `/integrations#${i.slug}` })))}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Integrations"
            title="Where Sarion connects to the rest of your stack"
            description="Sarion doesn't have a public integration marketplace yet — here's exactly what's coming soon, what's been requested, and how to ask for one that isn't listed."
          />
        </div>
      </section>

      <section className="mSection" id="current">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Current" title="Available today" />
          <p className={styles.honestNote}>
            None yet — Sarion is early, and integrations are still on the roadmap rather than shipped.
            The sections below show exactly what&apos;s planned.
          </p>
        </div>
      </section>

      <section className="mSectionAlt mSection" id="coming-soon">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Coming Soon" title="On the near-term build list" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {comingSoon.map((integration) => (
              <div key={integration.slug} id={integration.slug}>
                <IntegrationCard integration={integration} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mSection" id="requested">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Requested" title="Asked for, not yet scheduled" />
          <div className={styles.grid} style={{ marginTop: "var(--m-space-6)" }}>
            {requested.map((integration) => (
              <div key={integration.slug} id={integration.slug}>
                <IntegrationCard integration={integration} />
              </div>
            ))}
          </div>
          <p className={styles.honestNote}>
            Need something that isn&apos;t listed? <Link href="/contact">Tell us</Link> — requested
            integrations move up the roadmap based on real demand.
          </p>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Try what's already built"
        subtext="The core CRM, portal, and invoicing workflow is live today — integrations extend it, they aren't required to get value."
        primaryLabel="Start Free Trial"
        primaryHref="/signup"
        secondaryLabel="See Features"
        secondaryHref="/features"
      />
    </>
  );
}
