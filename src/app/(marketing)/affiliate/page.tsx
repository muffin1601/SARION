import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./affiliate.module.css";

export const metadata: Metadata = {
  title: "Affiliate Program",
  description:
    "Refer agencies to Sarion and earn a commission on customers who sign up. A simple, human-reviewed affiliate program for creators, consultants, and agency owners.",
  alternates: { canonical: "/affiliate" },
  openGraph: {
    title: "Affiliate Program",
    description:
      "Refer agencies to Sarion and earn a commission on customers who sign up. A simple, human-reviewed affiliate program for creators, consultants, and agency owners.",
    url: "/affiliate",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Affiliate Program", path: "/affiliate" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Affiliate Program",
  description:
    "Refer agencies to Sarion and earn a commission on customers who sign up. A simple, human-reviewed affiliate program for creators, consultants, and agency owners.",
  url: "/affiliate",
});

const AFFILIATE_FAQ = [
  {
    question: "What's the commission rate?",
    answer:
      "We don't publish a fixed percentage — commission details are shared when you apply, since we're still shaping this program and want it to be fair for both sides.",
  },
  {
    question: "Is there an automated dashboard?",
    answer:
      "Not yet. Applications and referral links are currently reviewed and issued by our team directly rather than through a self-serve dashboard, since the program is still new.",
  },
  {
    question: "Who can apply?",
    answer:
      "Anyone with an audience that includes agencies or agency owners — content creators, consultants, and educators are all a good fit.",
  },
];
const FAQ_SCHEMA = faqSchema(AFFILIATE_FAQ);

const HOW_IT_WORKS = [
  {
    title: "You refer someone",
    body: "Share Sarion with an agency or consultant in your audience who could use it.",
  },
  {
    title: "They sign up",
    body: "When they sign up using your referral link, it's tracked back to you.",
  },
  {
    title: "You earn a commission",
    body: "You earn a commission on referred customers — specifics on rate and terms are shared when you apply.",
  },
];

const WHO_ITS_FOR = [
  {
    title: "Content creators",
    body: "Writers, YouTubers, and podcasters whose audience includes agency owners or freelancers.",
  },
  {
    title: "Consultants",
    body: "Independent consultants already advising agencies on tools and operations.",
  },
  {
    title: "Agency owners",
    body: "Owners with a network of peers who'd genuinely benefit from switching to Sarion.",
  },
];

const STEPS = [
  {
    title: "Apply through our contact form",
    body: "Tell us about your audience and how you'd plan to share Sarion.",
  },
  {
    title: "Our team reviews it",
    body: "We review every application by hand — there's no automated approval yet.",
  },
  {
    title: "Get your referral link",
    body: "Once approved, we'll set you up with a referral link and the commission details.",
  },
];

const RELATED_LINKS = [
  {
    label: "Partners",
    description: "A deeper collaboration option beyond referrals.",
    href: "/partners",
  },
  {
    label: "Contact",
    description: "Apply to the affiliate program.",
    href: "/contact",
  },
  {
    label: "Blog",
    description: "Read what we're writing about agency operations.",
    href: "/blog",
  },
];

export default function AffiliatePage() {
  return (
    <>
      <JsonLd id="affiliate-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="affiliate-webpage-schema" data={WEBPAGE_SCHEMA} />
      <JsonLd id="affiliate-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <div className={styles.hero}>
            <span className="mEyebrow">Affiliate Program</span>
            <h1 className={styles.headline}>
              Refer Sarion, earn a commission.
            </h1>
            <p className={styles.subheadline}>
              If you talk to agencies regularly — as a creator, consultant, or
              agency owner — you can earn a commission by referring them to
              Sarion.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="How It Works" title="Three simple steps" />
          <div className={styles.grid}>
            {HOW_IT_WORKS.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="Who It's For" title="Built for people with an audience" />
          <div className={styles.grid}>
            {WHO_ITS_FOR.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="How To Apply" title="Getting started is manual, on purpose" />
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.title} className={styles.stepCard}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about the affiliate program" />
          <FaqGrid items={AFFILIATE_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Ready to start referring?"
        subtext="Apply and we'll follow up with the details."
        primaryLabel="Apply to the Affiliate Program"
        primaryHref="/contact"
      />
    </>
  );
}
