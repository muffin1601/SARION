import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { ProductShot } from "@/components/marketing/product-shot";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { CTASection } from "@/components/marketing/cta-section";
import { PainPointList } from "@/components/solutions/pain-point-list";
import { ToolShortcomings } from "@/components/solutions/tool-shortcomings";
import { SolutionMapping } from "@/components/solutions/solution-mapping";
import { RelevantFeatures } from "@/components/solutions/relevant-features";
import { WorkflowSteps } from "@/components/solutions/workflow-steps";
import { RelatedIndustryContent } from "@/components/solutions/related-industry-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import { INDUSTRIES, getIndustryBySlug } from "@/content/solutions/industries";
import styles from "./industry.module.css";

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/solutions/${industry.slug}` },
    openGraph: {
      title: `${industry.metaTitle} · Sarion`,
      description: industry.metaDescription,
      url: `/solutions/${industry.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Solutions", path: "/solutions" },
    { name: industry.name, path: `/solutions/${industry.slug}` },
  ];
  const faqData = faqSchema(industry.faqs);
  const webPageData = webPageSchema({
    name: industry.metaTitle,
    description: industry.metaDescription,
    url: `/solutions/${industry.slug}`,
  });

  return (
    <>
      <JsonLd id="industry-breadcrumb" data={breadcrumbSchema(trail)} />
      <JsonLd id="industry-webpage" data={webPageData} />
      <JsonLd id="industry-faq" data={faqData} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow={industry.name}
            title={industry.heroHeadline}
            description={industry.heroSubhead}
          />
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
        <div className="mContainer">
          <SectionHeader
            align="left"
            eyebrow="The problem"
            title={`Where ${industry.name.toLowerCase()} lose time and trust`}
          />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <PainPointList items={industry.painPoints} />
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Why generic tools fall short" title="What's actually missing" />
          <ToolShortcomings items={industry.whyToolsFail} />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="How Sarion helps" title="Problem, met with a real fix" />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <SolutionMapping items={industry.howSarionSolves} />
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Relevant features" title="Built for exactly this" />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <RelevantFeatures eyebrows={industry.relevantFeatureEyebrows} />
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="In practice" title="What a week looks like" />
          <div style={{ marginTop: "var(--m-space-6)", maxWidth: 720 }}>
            <WorkflowSteps items={industry.workflow} />
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="See it" title="The client portal your clients would use" />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <ProductShot
              name="portal"
              alt="The branded Sarion client portal showing project updates and comments"
            />
          </div>
          <div className={styles.shotCtas}>
            <Link href="/portal-demo" className="mBtn mBtnPrimary">
              Explore the full Portal Demo
            </Link>
            <Link href="/pricing" className="mBtn mBtnGhost">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Outcomes" title="What changes" />
          <ul className={styles.outcomes}>
            {industry.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="FAQ" title={`Questions from ${industry.name.toLowerCase()}`} />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <FaqGrid items={industry.faqs} />
          </div>
          <RelatedIndustryContent industry={industry} />
        </div>
      </section>

      <CTASection
        headline={`Built for ${industry.name}`}
        subtext="Start free — no card required. See your first client portal live in minutes."
        primaryLabel="Start Free Trial"
        primaryHref="/signup"
        secondaryLabel="See Features"
        secondaryHref="/features"
      />
    </>
  );
}
