import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { HeroSection } from "@/components/marketing/hero-section";
import { FounderNote } from "@/components/marketing/founder-note";
import { SectionHeader } from "@/components/marketing/section-header";
import { FeatureCard } from "@/components/marketing/feature-card";
import { ProductShot } from "@/components/marketing/product-shot";
import { CTASection } from "@/components/marketing/cta-section";
import { ScorecardBanner } from "@/components/marketing/scorecard-banner";
import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { DemoVideo } from "@/components/marketing/demo-video";
import { PROBLEM_CARDS, FEATURE_CARDS } from "@/lib/marketing/features";
import { MARKETING_PLANS, TRIAL_POINTS } from "@/lib/marketing/pricing";
import { HOME_FAQ } from "@/lib/marketing/faq";
import { HomeFaq } from "@/components/marketing/home-faq";
import { Comparison } from "@/components/marketing/comparison";
import { RelatedPages } from "@/components/marketing/related-pages";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { softwareApplicationSchema, faqSchema } from "@/lib/seo/schema";
import styles from "./home.module.css";

export const metadata: Metadata = {
  // Marketing layout already sets the homepage title/description; pin the
  // canonical to the root so the indexable home URL is unambiguous.
  alternates: { canonical: "/" },
  keywords: [
    "agency management software",
    "client management software for agencies",
    "client portal software",
    "agency CRM",
    "project and invoicing software for agencies",
    "freelancer client management",
  ],
};

// Product structured data (SoftwareApplication with real pricing) + FAQ schema.
// Organization + WebSite are emitted sitewide by the marketing layout.
const SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [softwareApplicationSchema()],
};
const FAQ_SCHEMA = faqSchema(HOME_FAQ);

const FEATURED_PLAN = MARKETING_PLANS.find((p) => p.featured) ?? MARKETING_PLANS[0];

const RELATED_LINKS = [
  {
    label: "Portal Demo",
    description: "Try the branded client portal your clients would see.",
    href: "/portal-demo",
  },
  {
    label: "Agency Scorecard",
    description: "Score your agency's operations in 3 minutes, free.",
    href: "/scorecard",
  },
  {
    label: "About Sarion",
    description: "Who's building Sarion, and why.",
    href: "/about",
  },
];

export default function HomePage() {
  return (
    <>
      <TrackPageView event={ANALYTICS_EVENTS.LandingViewed} />
      <JsonLd id="software-schema" data={SOFTWARE_SCHEMA} />
      <JsonLd id="home-faq-schema" data={FAQ_SCHEMA} />

      <AnnouncementBar
        href="/products/claude-code-mastery"
        label="🚀 New: SARION AI Engineering Suite – Volume 1: Claude Code Mastery is now available."
      />

      <HeroSection />

      {/* Honest credibility — a note from the team, not fake testimonials */}
      <FounderNote />

      {/* B. Problem */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="The problem"
            title="Running an agency shouldn't mean juggling ten tools"
            description="Most agencies stitch together spreadsheets, inboxes, and chat apps to run client work. The result is wasted time, duplicated effort, and details that slip through the cracks."
          />
          <div className={styles.grid3}>
            {PROBLEM_CARDS.map((p) => (
              <FeatureCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* B2. Scorecard lead magnet — quantifies the pain just named above */}
      <ScorecardBanner placement="home_problem" />

      {/* C. Solution preview — a taste of the capabilities, not the full list */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="The solution"
            title="Everything you need to run client work, in one place"
            description="Sarion replaces the spreadsheets, inboxes, and disconnected apps with a single workspace built for agency delivery."
          />
          <div className={styles.grid3}>
            {FEATURE_CARDS.slice(0, 4).map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
          <div className={styles.center}>
            <Link href="/features" className="mBtn mBtnSecondary mBtnLg">
              Explore all features →
            </Link>
          </div>
        </div>
      </section>

      {/* C2. Demo video */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="See it in action"
            title="See how an agency runs on SARION in 90 seconds."
          />
          <DemoVideo />
        </div>
      </section>

      {/* D. Real product screenshots */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="A look inside"
            title="Clear, fast, and a pleasure to use"
          />
          <div className={styles.shots}>
            <ProductShot
              name="portal"
              alt="The branded Sarion client portal showing project updates and a comment thread"
              url="trysarion.com/portal"
            />
            <ProductShot
              name="clients"
              alt="The Sarion clients list with companies, emails, and project counts"
              url="trysarion.com/clients"
            />
            <ProductShot
              name="invoices"
              alt="The Sarion invoices list showing paid, unpaid, and overdue status"
              url="trysarion.com/invoices"
            />
          </div>
        </div>
      </section>

      {/* E. Pricing preview — summary only, full plans live on /pricing */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple plans that grow with you"
          />
          <div className={styles.pricingTeaser}>
            <div className={styles.pricingTeaserCard}>
              <span className={styles.pricingTeaserLabel}>Starting at</span>
              <span className={styles.pricingTeaserPrice}>Free</span>
              <span className={styles.pricingTeaserNote}>
                No credit card, no time limit.
              </span>
            </div>
            <div className={styles.pricingTeaserDivider} aria-hidden />
            <div className={styles.pricingTeaserCard}>
              <span className={styles.pricingTeaserLabel}>Most popular</span>
              <span className={styles.pricingTeaserPrice}>
                {FEATURED_PLAN.name} — ${FEATURED_PLAN.monthly}/mo
              </span>
              <ul className={styles.pricingTeaserList}>
                {TRIAL_POINTS.slice(0, 3).map((point) => (
                  <li key={point}>
                    <Check aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.center}>
            <Link href="/pricing" className="mBtn mBtnSecondary mBtnLg">
              View Pricing
            </Link>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
          </div>
        </div>
      </section>

      {/* E2. Comparison — commercial-comparison intent */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Why Sarion"
            title="One workspace beats a patchwork of tools"
            description="Spreadsheets and a generic CRM can limp along — but neither was built to run agency delivery end to end. Here's how Sarion compares."
          />
          <Comparison />
        </div>
      </section>

      {/* E3. Related pages — light-touch, links to pages not already linked contextually above */}
      <section className="mSectionTight">
        <div className="mContainer">
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      {/* F. FAQ — informational intent + FAQ rich results + internal links */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions agencies ask before switching"
            description="Everything you need to know about running your agency on Sarion."
          />
          <HomeFaq />
        </div>
      </section>

      {/* G. Final CTA */}
      <CTASection
        headline="Run your agency from one place."
        subtext="Start your 14-day free trial today. No credit card required."
      />
    </>
  );
}
