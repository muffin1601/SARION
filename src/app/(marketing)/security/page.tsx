import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/config/site";
import styles from "./security.module.css";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Sarion protects your agency's data: account-scoped isolation, encrypted transit, session-based auth, and a straightforward disclosure process.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "Security · Sarion",
    description:
      "How Sarion protects your agency's data: account-scoped isolation, encrypted transit, session-based auth, and a straightforward disclosure process.",
    url: "/security",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Security", path: "/security" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Security · Sarion",
  description:
    "How Sarion protects your agency's data: account-scoped isolation, encrypted transit, session-based auth, and a straightforward disclosure process.",
  url: "/security",
});

const SECURITY_FAQ = [
  {
    question: "Is Sarion SOC 2 or ISO 27001 certified?",
    answer:
      "Not yet — Sarion hasn't pursued formal compliance certifications. It's something we're evaluating as the company grows.",
  },
  {
    question: "Does Sarion support SSO or two-factor authentication?",
    answer:
      "Today, Sarion uses session-based authentication with hashed passwords. We're exploring stronger authentication options, including two-factor authentication and SSO, as the product matures.",
  },
  {
    question: "Is my agency's data isolated from other agencies?",
    answer:
      "Yes. Every account is scoped to its own agency — client records, projects, invoices, and portal data are all tied to your account and are not visible to other agencies on Sarion.",
  },
  {
    question: "How do I report a security issue?",
    answer:
      `Email us at security@${siteConfig.url.replace(/^https?:\/\//, "")} or ${siteConfig.contactEmail} with details. We acknowledge every report and work directly with the reporter to understand and fix the issue.`,
  },
  {
    question: "Does Sarion sell or share my data?",
    answer:
      "No. Data you put into Sarion is used only to provide the service to you. See our Privacy Policy for the full details.",
  },
];
const FAQ_SCHEMA = faqSchema(SECURITY_FAQ);

const RELATED_LINKS = [
  {
    label: "Trust Center",
    description: "Everything about how Sarion operates, in one place.",
    href: "/trust",
  },
  {
    label: "Privacy Policy",
    description: "The full detail on what data we collect and why.",
    href: "/privacy",
  },
  {
    label: "Enterprise",
    description: "What Sarion offers larger, growing agency teams.",
    href: "/enterprise",
  },
  {
    label: "CRM Migration Checklist",
    description: "A free checklist for moving your client data into Sarion safely.",
    href: "/resources/checklists/crm-migration-checklist",
  },
];

const BEST_PRACTICES = [
  "Use a strong, unique password for your Sarion account — don't reuse a password from another site.",
  "Never share your login credentials with teammates. Instead, invite them as team members with their own access.",
  "Log out of Sarion when using a shared or public computer.",
  "Keep the email address on your account up to date, since it's used to verify account access.",
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd id="security-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="security-webpage-schema" data={WEBPAGE_SCHEMA} />
      <JsonLd id="security-faq-schema" data={FAQ_SCHEMA} />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Security"
            title="Security at Sarion"
            description="Sarion is built to keep your agency's client data safe, isolated, and under your control. Here's how we approach security today, in plain language — and where we're headed."
          />
        </div>
      </section>

      {/* Data protection */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Data Protection"
              title="Your agency's data is scoped to your account"
            />
            <div className={styles.proseBody}>
              <p>
                Every client record, project, invoice, and portal in Sarion belongs to a single
                agency account. Data is scoped and isolated per account — one agency&apos;s
                clients and projects are never visible to another agency using Sarion.
              </p>
              <p>
                Access within an account is controlled through team member permissions, so you
                decide who on your team can see and edit what.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Authentication"
              title="Session-based authentication"
            />
            <div className={styles.proseBody}>
              <p>
                Sarion uses password-based, session-based authentication. Passwords are hashed —
                we never store them in plain text. When you log in, Sarion issues a session that
                keeps you signed in securely as you use the app.
              </p>
              <p>
                We&apos;re actively exploring stronger authentication options, including two-factor
                authentication, as Sarion grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Encryption */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader align="left" eyebrow="Encryption" title="Encrypted in transit" />
            <div className={styles.proseBody}>
              <p>
                All traffic to and from Sarion is encrypted in transit over HTTPS/TLS, the same
                standard used across modern web applications. We also work with infrastructure
                providers who encrypt data at rest as part of their platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Infrastructure"
              title="Modern, monitored hosting"
            />
            <div className={styles.proseBody}>
              <p>
                Sarion is hosted on modern cloud infrastructure. We follow standard practices for
                a hosted SaaS product: regular deployments, monitoring for issues, and keeping
                dependencies up to date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader align="left" eyebrow="Privacy" title="Your data isn't for sale" />
            <div className={styles.proseBody}>
              <p>
                We use the data you put into Sarion only to provide the service to you — we don&apos;t
                sell it, and we don&apos;t use it for anything beyond running your agency&apos;s
                workspace. Read the full{" "}
                <Link href="/privacy">Privacy Policy</Link> for details on what we collect and why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Backups */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader align="left" eyebrow="Backups" title="Regular automated backups" />
            <div className={styles.proseBody}>
              <p>
                We run regular automated backups of the database as part of normal operations,
                so your client, project, and invoice data isn&apos;t dependent on a single point of
                failure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future certifications */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Certifications"
              title="Where we're headed"
            />
            <div className={styles.proseBody}>
              <p>
                Sarion has not yet pursued formal compliance certifications such as SOC 2 or ISO
                27001. As we grow, we&apos;re evaluating these certifications and will update this
                page as our security program matures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Responsible Disclosure"
              title="Found a security issue? Tell us."
            />
            <div className={styles.proseBody}>
              <p>
                If you believe you&apos;ve found a security vulnerability in Sarion, email us at{" "}
                <Link href={`mailto:security@${siteConfig.url.replace(/^https?:\/\//, "")}`}>
                  security@{siteConfig.url.replace(/^https?:\/\//, "")}
                </Link>{" "}
                or{" "}
                <Link href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</Link>{" "}
                with as much detail as you can share. We acknowledge every report, work directly
                with the reporter to understand and address the issue, and follow up once it&apos;s
                resolved. We don&apos;t currently run a paid bug bounty program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best practices */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Best Practices"
            title="How to keep your account secure"
            description="A few habits that go a long way, regardless of the platform."
          />
          <div className={styles.list}>
            {BEST_PRACTICES.map((practice) => (
              <div key={practice} className={styles.listItem}>
                <p className={styles.listItemBody}>{practice}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSectionAlt mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Common security questions" />
          <FaqGrid items={SECURITY_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Ready to bring your agency into one workspace?"
        subtext="Start free, no credit card required."
      />
    </>
  );
}
