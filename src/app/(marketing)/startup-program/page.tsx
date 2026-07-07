import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./startup-program.module.css";

export const metadata: Metadata = {
  title: "Startup Program",
  description:
    "Sarion's Startup Program supports early-stage agencies with special pricing consideration, onboarding help, and a direct line to the founding team.",
  alternates: { canonical: "/startup-program" },
  openGraph: {
    title: "Startup Program",
    description:
      "Sarion's Startup Program supports early-stage agencies with special pricing consideration, onboarding help, and a direct line to the founding team.",
    url: "/startup-program",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Startup Program", path: "/startup-program" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Startup Program",
  description:
    "Sarion's Startup Program supports early-stage agencies with special pricing consideration, onboarding help, and a direct line to the founding team.",
  url: "/startup-program",
});

const STARTUP_FAQ = [
  {
    question: "What's the discount?",
    answer:
      "Reach out and we'll work out pricing based on your stage — we don't publish a blanket rate. Every early-stage agency is different, so we'd rather talk to you than quote a number that doesn't fit.",
  },
  {
    question: "Who qualifies for the Startup Program?",
    answer:
      "We're generally looking at newer, smaller agencies — think early team size and a business that's still finding its footing. If you're not sure whether you qualify, apply anyway and we'll let you know.",
  },
  {
    question: "Is this a permanent discount?",
    answer:
      "Special pricing consideration under the program is tied to your stage as a business. As you grow, we'll have an honest conversation about what makes sense going forward.",
  },
  {
    question: "Do I need to already be a Sarion customer?",
    answer:
      "No. You can apply as part of signing up, or reach out first if you'd like to talk it through before you commit to anything.",
  },
];
const FAQ_SCHEMA = faqSchema(STARTUP_FAQ);

const ELIGIBILITY = [
  {
    title: "Early-stage agencies",
    body: "Agencies and consultancies still in their first few years of operating, or newly spun out on their own.",
  },
  {
    title: "Small teams",
    body: "Lean teams where every subscription cost is felt — we built this program with that reality in mind.",
  },
  {
    title: "Bootstrapped or newly funded",
    body: "Businesses running lean, whether self-funded or having just closed early funding, who need tools that don't strain the budget.",
  },
];

const INCLUDED = [
  {
    title: "Special pricing consideration",
    body: "We'll work with you on pricing that fits your stage — no blanket percentage, just a conversation about what's fair for where you are.",
  },
  {
    title: "Onboarding support",
    body: "Hands-on help getting your workspace, clients, and projects set up so you're productive from day one.",
  },
  {
    title: "A voice in our roadmap",
    body: "Direct input to the founding team on what we build next — startup agencies often have the sharpest feedback.",
  },
];

const STEPS = [
  {
    title: "Apply via our contact form",
    body: "Tell us a bit about your agency — team size, stage, and what you're hoping to solve with Sarion.",
  },
  {
    title: "Hear back from the team",
    body: "A real person on our founding team reviews every application and follows up directly.",
  },
  {
    title: "Get set up",
    body: "If it's a fit, we'll get you onboarded with the support and pricing consideration that make sense for your stage.",
  },
];

const RELATED_LINKS = [
  {
    label: "Pricing",
    description: "See Sarion's standard plans and what's included at each tier.",
    href: "/pricing",
  },
  {
    label: "Contact",
    description: "Apply to the Startup Program or ask a question first.",
    href: "/contact",
  },
  {
    label: "About",
    description: "Meet the founding team behind Sarion.",
    href: "/about",
  },
];

export default function StartupProgramPage() {
  return (
    <>
      <JsonLd id="startup-program-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="startup-program-webpage-schema" data={WEBPAGE_SCHEMA} />
      <JsonLd id="startup-program-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} />
          <div className={styles.hero}>
            <span className="mEyebrow">Startup Program</span>
            <h1 className={styles.headline}>
              Built for agencies that are just getting started.
            </h1>
            <p className={styles.subheadline}>
              Sarion&apos;s Startup Program exists to support early-stage agencies
              and consultancies — with pricing consideration, hands-on
              onboarding, and a direct line to the people building the
              product.
            </p>
          </div>
        </div>
      </section>

      {/* Who qualifies */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Who Qualifies"
            title="Built for early-stage agencies"
            description="If your agency is small and just finding its footing, this program is for you."
          />
          <div className={styles.grid}>
            {ELIGIBILITY.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="What's Included"
            title="What you get as a member"
          />
          <div className={styles.grid}>
            {INCLUDED.map((item) => (
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
          <SectionHeader eyebrow="How To Apply" title="Three simple steps" />
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
          <SectionHeader eyebrow="FAQ" title="Questions about the Startup Program" />
          <FaqGrid items={STARTUP_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Think your agency qualifies?"
        subtext="Tell us about your agency and we'll get back to you."
        primaryLabel="Apply Now"
        primaryHref="/contact"
      />
    </>
  );
}
