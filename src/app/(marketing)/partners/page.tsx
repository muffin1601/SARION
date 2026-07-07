import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./partners.module.css";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Sarion as a referral partner, technology partner, or agency partner. An early-stage program with direct access to the founding team.",
  alternates: { canonical: "/partners" },
  openGraph: {
    title: "Partners",
    description:
      "Partner with Sarion as a referral partner, technology partner, or agency partner. An early-stage program with direct access to the founding team.",
    url: "/partners",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Partners", path: "/partners" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Partners",
  description:
    "Partner with Sarion as a referral partner, technology partner, or agency partner. An early-stage program with direct access to the founding team.",
  url: "/partners",
});

const PARTNERS_FAQ = [
  {
    question: "Is there a cost to become a partner?",
    answer:
      "No. Partnering with Sarion doesn't cost anything — we're looking to build genuine working relationships, not sell a membership.",
  },
  {
    question: "What do referral partners earn?",
    answer:
      "Referral partners earn a commission on customers they refer who sign up. We haven't published a fixed rate — we'll share the specifics when you apply.",
  },
  {
    question: "We're a small team — can we still apply?",
    answer:
      "Yes. As an early-stage company ourselves, we're often a better fit for smaller, more agile partners than a big enterprise program would be.",
  },
];
const FAQ_SCHEMA = faqSchema(PARTNERS_FAQ);

const PARTNER_TYPES = [
  {
    title: "Referral partners",
    body: "Know agencies who'd benefit from Sarion? Refer them and earn a commission on customers who sign up — details are shared once you apply.",
  },
  {
    title: "Technology partners",
    body: "Building a tool agencies use alongside Sarion? We're open to integration collaboration with complementary products.",
  },
  {
    title: "Agency partners",
    body: "Consultants and implementers who want to set up and run Sarion for their own clients as part of the services they offer.",
  },
];

const WHY_PARTNER = [
  {
    title: "A founding team you can actually reach",
    body: "We're small and early-stage, which means partners talk directly with the people building the product — not a tiered support queue.",
  },
  {
    title: "Room to shape how the partnership works",
    body: "Because the program is new, there's real flexibility in how we structure a collaboration around what works for you.",
  },
  {
    title: "Aligned incentives",
    body: "We only succeed if the agencies you send our way get real value — so we're motivated to make every partner referral count.",
  },
];

const STEPS = [
  {
    title: "Apply",
    body: "Tell us about you or your business and the kind of partnership you're interested in.",
  },
  {
    title: "Talk with the team",
    body: "We'll set up a conversation to understand the fit and answer your questions.",
  },
  {
    title: "Agree on the details",
    body: "Once we're aligned, we'll put a simple agreement in place and get you started.",
  },
];

const RELATED_LINKS = [
  {
    label: "Affiliate Program",
    description: "A lighter-weight way to earn a commission for referrals.",
    href: "/affiliate",
  },
  {
    label: "Integrations",
    description: "See what Sarion connects with today and what's coming.",
    href: "/integrations",
  },
  {
    label: "Contact",
    description: "Reach out to start a partnership conversation.",
    href: "/contact",
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd id="partners-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="partners-webpage-schema" data={WEBPAGE_SCHEMA} />
      <JsonLd id="partners-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} />
          <div className={styles.hero}>
            <span className="mEyebrow">Partners</span>
            <h1 className={styles.headline}>
              Partner with Sarion.
            </h1>
            <p className={styles.subheadline}>
              We work with agencies, consultants, and technology providers who
              want to bring Sarion to the people they work with — as a
              referral partner, a technology partner, or an agency partner.
            </p>
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="Partner Types" title="A few ways to work with us" />
          <div className={styles.grid}>
            {PARTNER_TYPES.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="Why Partner With Sarion" title="What makes this worth your time" />
          <div className={styles.grid}>
            {WHY_PARTNER.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="How It Works" title="From application to agreement" />
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
          <SectionHeader eyebrow="FAQ" title="Questions about partnering with Sarion" />
          <FaqGrid items={PARTNERS_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Interested in partnering with Sarion?"
        subtext="Tell us a bit about your business and we'll be in touch."
        primaryLabel="Become a Partner"
        primaryHref="/contact"
      />
    </>
  );
}
