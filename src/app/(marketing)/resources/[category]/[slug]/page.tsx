import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { SectionHeader } from "@/components/marketing/section-header";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { CTASection } from "@/components/marketing/cta-section";
import { ResourceHero } from "@/components/resources/resource-hero";
import { ResourceOverview } from "@/components/resources/resource-overview";
import { ResourcePreview } from "@/components/resources/resource-preview";
import { DownloadPanel } from "@/components/resources/download-panel";
import { RelatedResourceContent } from "@/components/resources/related-resource-content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, downloadActionSchema } from "@/lib/seo/schema";
import { RESOURCES, getResourceBySlug } from "@/content/resources/resources";
import { getResourceCategoryBySlug } from "@/content/resources/categories";
import styles from "./resource.module.css";

export function generateStaticParams() {
  return RESOURCES.filter((r) => r.status === "live").map((r) => ({
    category: r.category,
    slug: r.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource || resource.status !== "live" || resource.category !== category) return {};

  return {
    title: resource.metaTitle,
    description: resource.metaDescription,
    alternates: { canonical: `/resources/${resource.category}/${resource.slug}` },
    openGraph: {
      title: `${resource.metaTitle} · Sarion`,
      description: resource.metaDescription,
      url: `/resources/${resource.category}/${resource.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: resource.metaTitle,
      description: resource.metaDescription,
    },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource || resource.status !== "live" || resource.category !== category) notFound();

  const resourceCategory = getResourceCategoryBySlug(resource.category);
  if (!resourceCategory) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: resourceCategory.name, path: `/resources/${resourceCategory.slug}` },
    { name: resource.title, path: `/resources/${resource.category}/${resource.slug}` },
  ];

  return (
    <>
      <JsonLd id="resource-breadcrumb" data={breadcrumbSchema(trail)} />
      <JsonLd
        id="resource-webpage"
        data={downloadActionSchema({
          name: resource.metaTitle,
          description: resource.metaDescription,
          url: `/resources/${resource.category}/${resource.slug}`,
          fileFormat: resource.fileType,
        })}
      />
      <JsonLd id="resource-faq" data={faqSchema(resource.faqs)} />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={trail} />
          <ResourceHero
            category={resourceCategory}
            headline={resource.heroHeadline}
            subhead={resource.heroSubhead}
            tags={resource.tags}
          />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <ResourceOverview
            overview={resource.overview}
            whyItMatters={resource.whyItMatters}
            whoShouldUseIt={resource.whoShouldUseIt}
            howToUseIt={resource.howToUseIt}
          />
        </div>
      </section>

      {resource.previewContent && (
        <section className="mSectionAlt mSection">
          <div className="mContainer">
            <SectionHeader align="left" eyebrow="Preview" title="What's inside" />
            <div className={styles.previewWrap}>
              <ResourcePreview lines={resource.previewContent} />
            </div>
          </div>
        </section>
      )}

      <section className="mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="Download" title="Get it free" />
          <div className={styles.downloadWrap}>
            <DownloadPanel resource={resource} />
          </div>
        </div>
      </section>

      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader align="left" eyebrow="FAQ" title="Common questions" />
          <div style={{ marginTop: "var(--m-space-6)" }}>
            <FaqGrid items={resource.faqs} />
          </div>
          <RelatedResourceContent resource={resource} />
        </div>
      </section>

      <CTASection
        headline="Run the rest of your agency from one place"
        subtext="This resource is free. Sarion is where the day-to-day client work happens next."
        primaryLabel="Start Free Trial"
        primaryHref="/signup"
        secondaryLabel="See Features"
        secondaryHref="/features"
      />
    </>
  );
}
