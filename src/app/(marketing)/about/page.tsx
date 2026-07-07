import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { TeamCard } from "@/components/marketing/team-card";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, personSchema } from "@/lib/seo/schema";
import { TEAM } from "@/lib/marketing/team";
import { ABOUT_FAQ } from "@/lib/marketing/faq";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sarion is an independent software company building tools to help agencies run more efficiently.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Sarion is an independent software company building tools to help agencies run more efficiently.",
    url: "/about",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);
const FAQ_SCHEMA = faqSchema(ABOUT_FAQ);

function slugifyName(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

// Real, named founders — genuine Person entities for E-E-A-T, referenced by
// @id from blog posts' authorship (see blogPostingSchema's authorId param).
const PERSON_SCHEMAS = TEAM.map((member) =>
  personSchema({
    id: `/about#person-${slugifyName(member.name)}`,
    name: member.name,
    jobTitle: member.title,
    description: member.bio,
  }),
);

const RELATED_LINKS = [
  {
    label: "Home",
    description: "See how Sarion brings agency operations into one workspace.",
    href: "/",
  },
  {
    label: "Contact",
    description: "Reach the founding team directly with questions or feedback.",
    href: "/contact",
  },
  {
    label: "Features",
    description: "See everything Sarion does for running agency client work.",
    href: "/features",
  },
  {
    label: "Agency Scorecard",
    description: "Score your agency's operations in 3 minutes, free.",
    href: "/scorecard",
  },
  {
    label: "Partners",
    description: "Work with us as a referral, technology, or agency partner.",
    href: "/partners",
  },
  {
    label: "Affiliate Program",
    description: "Refer agencies to Sarion and earn a commission.",
    href: "/affiliate",
  },
];

const CHALLENGES = [
  {
    title: "Five tools, one project",
    body: "A single client engagement gets split across a project tracker, an invoicing app, an inbox, and a file-sharing folder. Nothing talks to anything else, so someone has to manually keep them in sync.",
  },
  {
    title: "The status is in someone's head",
    body: "Ask \"where's this project at?\" and the real answer lives in a mix of Slack threads, email replies, and a teammate's memory — not in any system either the agency or the client can check.",
  },
  {
    title: "Invoices built by hand, every time",
    body: "Hours get copied from a tracker into a spreadsheet, turned into a PDF, and emailed out — then chased again a week later because there's no record of who's actually paid.",
  },
  {
    title: "Clients ping you for updates you already have",
    body: "Without a shared view of progress, clients default to emailing for status — and agencies spend billable hours writing updates instead of shipping work.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd id="about-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="about-faq-schema" data={FAQ_SCHEMA} />
      <JsonLd id="about-person-schema" data={PERSON_SCHEMAS} />
      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} />
          <div className={styles.hero}>
            <span className="mEyebrow">About Sarion</span>
            <h1 className={styles.headline}>
              We build software that helps agencies focus on their work.
            </h1>
            <p className={styles.subheadline}>
              Sarion is an independent software company based in India. We are
              a small founding team building focused, practical tools — not
              all-in-one platforms bloated with features no one asked for.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Our Mission"
              title="Simplify how agencies operate"
            />
            <div className={styles.proseBody}>
              <p>
                Before Sarion, our founders ran client work for agencies of
                their own. The client work itself was never the hard part —
                juggling five disconnected tools just to answer &ldquo;where&apos;s this
                project at?&rdquo; was. Every week meant rebuilding the same status
                in a different app: project tracker, invoice spreadsheet,
                email thread, chat log.
              </p>
              <p>
                Sarion exists to close that gap. It brings clients, projects,
                invoices, and team collaboration into one workspace, so
                agencies stop maintaining their tools and get back to the work
                clients actually pay for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Our Vision"
              title="The operating system for independent agencies"
            />
            <div className={styles.proseBody}>
              <p>
                Sarion is built to become the default workspace for agencies
                that value clarity over complexity — not the largest
                platform, not the one with the longest feature list, but the
                one an agency actually opens every day because it saves them
                time.
              </p>
              <p>
                We&apos;re building toward that deliberately, starting with the
                fundamentals — client visibility, invoicing, project
                tracking — and expanding next into automation that removes
                the manual status updates and follow-ups agencies still do by
                hand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built It */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader
            eyebrow="Why We Built Sarion"
            title="We lived these problems before we built the fix"
            description="Every agency we've worked with hits the same four walls. Sarion addresses each one directly."
          />
          <div className={styles.challenges}>
            {CHALLENGES.map((c) => (
              <div key={c.title} className={styles.challengeCard}>
                <h3 className={styles.challengeTitle}>{c.title}</h3>
                <p className={styles.challengeBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="The Team"
            title="Meet the founders"
            description="Sarion is built by a small founding team, hands-on with the product every day."
          />
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <div key={member.name} id={`person-${slugifyName(member.name)}`}>
                <TeamCard {...member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.contact}>
            <SectionHeader
              eyebrow="Get in Touch"
              title="Questions or feedback?"
              description="We read every message and reply within 24 hours."
            />
            <div className={styles.contactAction}>
              <Link href="/contact" className="mBtn mBtnPrimary mBtnLg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about Sarion the company" />
          <FaqGrid items={ABOUT_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="Ready to simplify your agency operations?"
        subtext="Start your 14-day free trial. No credit card required."
      />
    </>
  );
}
