import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { CTASection } from "@/components/marketing/cta-section";
import { CalculatorForm } from "@/components/tools/calculator-form";
import { CommonMistakes } from "@/components/tools/common-mistakes";
import { RelatedToolContent } from "@/components/tools/related-tool-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema, howToSchema, toolApplicationSchema } from "@/lib/seo/schema";
import { getToolEntries, getToolEntryBySlug } from "@/content/tools/tools";
import { notFound } from "next/navigation";
import styles from "./tool.module.css";

export function generateStaticParams() {
  return getToolEntries().map((entry) => ({ tool: entry.content.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool: slug } = await params;
  const entry = getToolEntryBySlug(slug);
  if (!entry) return {};
  const { content } = entry;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `/tools/${content.slug}` },
    openGraph: {
      title: `${content.metaTitle} · Sarion`,
      description: content.metaDescription,
      url: `/tools/${content.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: slug } = await params;
  const entry = getToolEntryBySlug(slug);
  if (!entry) notFound();
  const { content } = entry;

  const trail = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: content.title, path: `/tools/${content.slug}` },
  ];

  return (
    <>
      <JsonLd id="tool-breadcrumb" data={breadcrumbSchema(trail)} />
      <JsonLd
        id="tool-webpage"
        data={webPageSchema({ name: content.metaTitle, description: content.metaDescription, url: `/tools/${content.slug}` })}
      />
      <JsonLd
        id="tool-application"
        data={toolApplicationSchema({ name: content.title, description: content.metaDescription, url: `/tools/${content.slug}` })}
      />
      <JsonLd
        id="tool-howto"
        data={howToSchema({
          name: `How to use the ${content.title}`,
          description: content.metaDescription,
          steps: [
            { name: "Enter your numbers", text: "Fill in the fields with your agency's real figures — there's no need to sign up." },
            { name: "Read the live results", text: "Results update instantly as you type, with a summary, chart, and recommendations." },
            { name: "Apply the recommendations", text: "Use the suggested next steps to decide what to change first." },
          ],
        })}
      />
      <JsonLd id="tool-faq" data={faqSchema(content.faqs)} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader as="h1" align="left" eyebrow="Free Tool" title={content.heroHeadline} description={content.heroSubhead} />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <div className={styles.explanation}>
            <div>
              <p className="mEyebrow">What it means</p>
              <p className={styles.prose}>{content.whatItMeans}</p>
            </div>
            <div>
              <p className="mEyebrow">Why it matters</p>
              <p className={styles.prose}>{content.whyItMatters}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Calculator" title="Try it with your own numbers" />
          <div className={styles.calculatorWrap}>
            <CalculatorForm toolSlug={content.slug} toolTitle={content.title} />
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Benchmarks" title="What's typical" />
          <div className={styles.benchmarks}>
            {content.benchmarks.map((b) => (
              <div key={b.label} className={styles.benchmark}>
                <p className={styles.benchmarkLabel}>{b.label}</p>
                <p className={styles.benchmarkValue}>{b.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="How to improve" title="What actually moves this number" />
          <ul className={styles.improveList}>
            {content.howToImprove.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Common mistakes" title="Where this usually goes wrong" />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <CommonMistakes items={content.commonMistakes} />
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="FAQ" title="Common questions" />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <FaqGrid items={content.faqs} />
          </div>
          <RelatedToolContent tool={content} />
        </div>
      </section>

      <CTASection
        headline="Put these numbers to work"
        subtext="Sarion is where the client records, invoicing, and portal behind these numbers actually live."
        primaryLabel="Start Free Trial"
        primaryHref="/signup"
        secondaryLabel="See Features"
        secondaryHref="/features"
      />
    </>
  );
}
