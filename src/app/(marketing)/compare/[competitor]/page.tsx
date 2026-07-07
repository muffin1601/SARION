import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { CTASection } from "@/components/marketing/cta-section";
import { WhoItsFor } from "@/components/compare/who-its-for";
import { FitGuidance } from "@/components/compare/fit-guidance";
import { FeatureMatrix } from "@/components/compare/feature-matrix";
import { WorkflowComparisonSection } from "@/components/compare/workflow-comparison";
import { PricingPhilosophy } from "@/components/compare/pricing-philosophy";
import { MigrationGuidance } from "@/components/compare/migration-guidance";
import { RelatedComparisonContent } from "@/components/compare/related-comparison-content";
import { ComparisonToc } from "@/components/compare/comparison-toc";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import { COMPARISONS, getComparisonBySlug } from "@/content/compare/comparisons";
import { siteConfig } from "@/config/site";
import styles from "./comparison.module.css";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  return {
    // Bypasses the layout's "%s · Sarion" title template — metaTitle already
    // reads "Sarion vs. X", so the template would double the brand name.
    title: { absolute: comparison.metaTitle },
    description: comparison.metaDescription,
    alternates: { canonical: `/compare/${comparison.slug}` },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `/compare/${comparison.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
  };
}

const WORKFLOW_SECTIONS = [
  { key: "agencyWorkflow" as const, label: "Agency workflow" },
  { key: "clientManagement" as const, label: "Client management" },
  { key: "projectManagement" as const, label: "Project management" },
  { key: "portal" as const, label: "Client portal" },
  { key: "reporting" as const, label: "Reporting" },
  { key: "automation" as const, label: "Automation" },
];

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  const sarionName = siteConfig.name;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Compare", path: "/compare" },
    { name: `${sarionName} vs. ${comparison.competitorName}`, path: `/compare/${comparison.slug}` },
  ];

  return (
    <>
      <JsonLd id="comparison-breadcrumb" data={breadcrumbSchema(trail)} />
      <JsonLd
        id="comparison-webpage"
        data={webPageSchema({
          name: comparison.metaTitle,
          description: comparison.metaDescription,
          url: `/compare/${comparison.slug}`,
        })}
      />
      <JsonLd id="comparison-faq" data={faqSchema(comparison.faqs)} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Comparison"
            title={comparison.heroHeadline}
            description={comparison.heroSubhead}
          />
          <p className={styles.summary}>{comparison.quickSummary}</p>
          <div className={styles.heroActions}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free Trial
            </Link>
            <Link href="/portal-demo" className="mBtn mBtnSecondary mBtnLg">
              See Portal Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className={`mContainer ${styles.layout}`}>
          <div className={styles.toc}>
            <ComparisonToc />
          </div>
          <div className={styles.content}>
            <div id="who-its-for">
              <SectionHeader align="left" eyebrow="Who it's for" title="Who each product fits" />
              <WhoItsFor
                sarionName={sarionName}
                competitorName={comparison.competitorName}
                sarionBestFor={comparison.sarionBestFor}
                competitorBestFor={comparison.competitorBestFor}
              />
            </div>

            <div id="fit-guidance" className={styles.section}>
              <SectionHeader align="left" eyebrow="Better fit" title="An honest breakdown" />
              <div style={{ marginTop: "var(--m-space-6)" }}>
                <FitGuidance
                  sarionName={sarionName}
                  competitorName={comparison.competitorName}
                  whenSarionFits={comparison.whenSarionFits}
                  whenCompetitorFits={comparison.whenCompetitorFits}
                />
              </div>
            </div>

            <div id="feature-matrix" className={styles.section}>
              <SectionHeader align="left" eyebrow="Feature comparison" title="Side by side" />
              <div style={{ marginTop: "var(--m-space-6)" }}>
                <FeatureMatrix
                  sarionName={sarionName}
                  competitorName={comparison.competitorName}
                  rows={comparison.featureMatrix}
                />
              </div>
            </div>

            <div id="workflow" className={styles.section}>
              <SectionHeader align="left" eyebrow="Workflow comparison" title="How the day-to-day differs" />
              <div style={{ marginTop: "var(--m-space-6)" }}>
                {WORKFLOW_SECTIONS.map(({ key, label }) => (
                  <WorkflowComparisonSection
                    key={key}
                    label={label}
                    sarionName={sarionName}
                    competitorName={comparison.competitorName}
                    rows={comparison.workflowComparison[key]}
                  />
                ))}
              </div>
            </div>

            <div id="pricing" className={styles.section}>
              <SectionHeader align="left" eyebrow="Pricing philosophy" title="How to think about cost" />
              <div style={{ marginTop: "var(--m-space-6)" }}>
                <PricingPhilosophy text={comparison.pricingPhilosophy} />
              </div>
            </div>

            <div id="migration" className={styles.section}>
              <SectionHeader align="left" eyebrow="Migration" title={`Switching from ${comparison.competitorName}`} />
              <div style={{ marginTop: "var(--m-space-6)", maxWidth: 640 }}>
                <MigrationGuidance steps={comparison.migrationSteps} />
              </div>
            </div>

            <div id="faq" className={styles.section}>
              <SectionHeader align="left" eyebrow="FAQ" title="Common questions" />
              <div style={{ marginTop: "var(--m-space-6)" }}>
                <FaqGrid items={comparison.faqs} />
              </div>
              <RelatedComparisonContent comparison={comparison} />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="See it for yourself"
        subtext="Start free and try the client portal, pricing, and workflow built around agency client work."
        primaryLabel="Start Free Trial"
        primaryHref="/signup"
        secondaryLabel="See Portal Demo"
        secondaryHref="/portal-demo"
      />
    </>
  );
}
