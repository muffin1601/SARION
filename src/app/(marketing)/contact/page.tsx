import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { ContactForm } from "@/components/marketing/contact-form";
import { SocialLinks } from "@/components/marketing/social-links";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackPageView } from "@/components/analytics/track-page-view";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Sarion team. Tell us about your agency and we'll help you get started or book a demo — we usually reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Sarion",
    description:
      "Talk to the Sarion team. Get started or book a demo — we usually reply within 24 hours.",
    url: "/contact",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const RELATED_LINKS = [
  {
    label: "Features",
    description: "See everything Sarion does for running agency client work.",
    href: "/features",
  },
  {
    label: "Pricing",
    description: "Plans, founding pricing, and the 14-day free trial.",
    href: "/pricing",
  },
  {
    label: "About",
    description: "Who's building Sarion, and why.",
    href: "/about",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd id="contact-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <TrackPageView event={ANALYTICS_EVENTS.ContactViewed} />
    <section className="mSectionTight">
      <div className="mContainer">
        <BreadcrumbNav trail={BREADCRUMB_TRAIL} />
        <SectionHeader
          as="h1"
          eyebrow="Contact"
          title="Talk to the Sarion team"
          description="Tell us about your agency and we'll help you get started — or book a demo. We usually reply within 24 hours."
        />
        <div className={styles.wrap}>
          <ContactForm />
        </div>

        <div className={styles.details}>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Sales &amp; general</p>
            <p className={styles.cardText}>
              Questions about plans, demos, or getting started.
            </p>
            <a
              href={`mailto:${siteConfig.salesEmail}`}
              className={styles.cardEmail}
            >
              {siteConfig.salesEmail}
            </a>
          </div>
          <div className={styles.card}>
            <p className={styles.cardLabel}>Support</p>
            <p className={styles.cardText}>
              Already a customer and need a hand? We&apos;re here to help.
            </p>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className={styles.cardEmail}
            >
              {siteConfig.supportEmail}
            </a>
          </div>
        </div>

        <div className={styles.follow}>
          <p className={styles.followLabel}>Follow us</p>
          <SocialLinks ariaLabel="Sarion on social media" />
        </div>

        <RelatedPages links={RELATED_LINKS} />
      </div>
    </section>
    </>
  );
}
