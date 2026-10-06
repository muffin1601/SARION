import { appUrl } from "@/config/urls";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { SectionHeader } from "@/components/marketing/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { COMMERCIAL_PAGES, getCommercialPage } from "@/content/seo/commercial-pages";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./commercial.module.css";

export function generateStaticParams() {
  return COMMERCIAL_PAGES.map((page) => ({ commercial: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ commercial: string }> }): Promise<Metadata> {
  const { commercial } = await params;
  const page = getCommercialPage(commercial);
  if (!page) return {};
  const url = `/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: { title: page.metaTitle, description: page.description, url, type: "website" },
    twitter: { card: "summary_large_image", title: page.metaTitle, description: page.description },
  };
}

export default async function CommercialPage({ params }: { params: Promise<{ commercial: string }> }) {
  const { commercial } = await params;
  const page = getCommercialPage(commercial);
  if (!page) notFound();
  const url = `/${page.slug}`;
  const trail = [{ name: "Home", path: "/" }, { name: page.eyebrow, path: url }];
  return <>
    <JsonLd id="commercial-breadcrumb" data={breadcrumbSchema(trail)} />
    <JsonLd id="commercial-page" data={webPageSchema({ name: page.metaTitle, description: page.description, url })} />
    <JsonLd id="commercial-faq" data={faqSchema(page.faq)} />
    <section className="mSectionTight"><div className={`mContainer ${styles.hero}`}>
      <BreadcrumbNav trail={trail} center />
      <SectionHeader as="h1" eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <p className={styles.intro}>{page.intro}</p>
      <div className={styles.actions}><Link href={appUrl("/signup")} className="mBtn mBtnPrimary mBtnLg">Start free</Link><Link href="/pricing" className="mBtn mBtnSecondary mBtnLg">View pricing</Link></div>
    </div></section>
    <section className="mSection mSectionAlt"><div className="mContainer">
      <SectionHeader eyebrow="The operational gap" title={page.problemTitle} description="The cost is not only software spend. It is the repeated coordination required to keep disconnected records accurate." />
      <div className={styles.grid3}>{page.problems.map((item) => <article className={styles.card} key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </div></section>
    <section className="mSection"><div className="mContainer">
      <SectionHeader eyebrow="How it works" title={page.workflowTitle} description="Sarion keeps the core steps of agency delivery connected without requiring a custom system." />
      <div className={styles.workflow}>{page.workflow.map((item) => <article className={styles.step} key={item.step}><span className={styles.stepNo}>{item.step}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
    </div></section>
    <section className="mSection mSectionAlt"><div className="mContainer">
      <SectionHeader eyebrow="Connected workspace" title="Explore the capabilities behind the workflow" description="Go deeper into each product area, or start with the full workflow here." />
      <div className={styles.capabilities}>{page.capabilities.map((item) => <Link className={styles.capability} href={item.href} key={item.title}><strong>{item.title} →</strong><span>{item.description}</span></Link>)}</div>
    </div></section>
    <section className="mSection"><div className={`mContainer ${styles.split}`}>
      <div><span className="mEyebrow">Who it is for</span><h2 style={{ marginTop: "var(--m-space-4)", fontSize: "var(--m-text-2xl)" }}>Built for client-service teams</h2><ul className={styles.audience}>{page.audience.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <article className={styles.stack}><h2>{page.stackTitle}</h2><p>{page.stackCopy}</p></article>
    </div></section>
    <section className="mSectionTight mSectionAlt"><div className="mContainer"><SectionHeader eyebrow="FAQ" title={`Questions about ${page.primaryKeyword}`} /><FaqGrid items={page.faq} /></div></section>
    <CTASection headline="Run client delivery from one connected workspace." />
  </>;
}
