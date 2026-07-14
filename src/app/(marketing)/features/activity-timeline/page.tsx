import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { ProductShot } from "@/components/marketing/product-shot";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";
import styles from "../features.module.css";

export const metadata: Metadata = {
  title: "Activity Timeline",
  description:
    "A chronological record of everything that's happened on a client — every project update, invoice, and note — so nothing gets lost when someone's out or a client asks \"what's the status.\"",
  alternates: { canonical: "/features/activity-timeline" },
  keywords: [
    "client activity tracking",
    "agency client history",
    "CRM for agencies",
  ],
  openGraph: {
    title: "Activity Timeline · Sarion",
    description:
      "Every client's history in one chronological timeline — logged automatically, visible to your team, and partly visible to the client in their portal.",
    url: "/features/activity-timeline",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Activity Timeline", path: "/features/activity-timeline" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const ACTIVITY_FAQ = [
  {
    question: "Is the activity logged automatically, or do I have to add it myself?",
    answer:
      "Automatically. When a client is created, a project starts, an invoice is created or paid, or a meeting is scheduled, Sarion logs it to that client's timeline on its own. You don't have to remember to write a status update — the record builds itself as the work happens.",
  },
  {
    question: "Can clients see the full internal timeline?",
    answer:
      "No, not everything. Clients only see select activity in their portal — the milestones relevant to them, like project progress and invoice status — not your internal notes or every minor update. You control what's client-facing versus internal.",
  },
  {
    question: "Can I search past activity?",
    answer:
      "Yes. Activity on a client's timeline is searchable, so you can find a specific update or note from months ago without scrolling back through everything in between.",
  },
  {
    question: "Does this work across all my clients, or just one at a time?",
    answer:
      "Both. Each client has their own timeline, and there's also an agency-wide activity feed so you can see what happened across every client without opening each record individually.",
  },
];
const FAQ_SCHEMA = faqSchema(ACTIVITY_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion does in one workspace.",
    href: "/features",
  },
  {
    label: "Client CRM",
    description: "The client record every activity entry is tied to.",
    href: "/features/crm",
  },
  {
    label: "Client Portal",
    description: "Where select activity shows up for the client to see.",
    href: "/features/client-portal",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function ActivityTimelinePage() {
  return (
    <>
      <JsonLd id="activity-timeline-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="activity-timeline-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Activity Timeline"
            title="Every client's history, in one timeline"
            description="Client created, project started, invoice sent or paid, meeting scheduled — every meaningful action gets logged to that client's record automatically, in order, so the full history is there whenever anyone needs it."
          />
          <p className={styles.intro}>
            When a client asks &quot;what&apos;s the status?&quot; or a teammate takes over an account, the
            answer shouldn&apos;t live in someone&apos;s memory or a scattered inbox. Sarion logs activity
            to the client record as it happens, so the timeline is always up to date without
            anyone having to write a status note.
          </p>
          <div className={styles.heroActions}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
            <Link href="/#demo" className="mBtn mBtnSecondary mBtnLg">
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`} data-first={true}>
        <div className="mContainer">
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className="mEyebrow">Automatic Logging</span>
              <h2 className={styles.title}>Logged as it happens, not typed up after</h2>
              <p className={styles.workflow}>
                Create a client, start a project, send or get paid on an invoice, schedule a
                meeting — Sarion writes each of those to the client&apos;s activity timeline on its
                own. There&apos;s no separate step to &quot;log the update,&quot; so the record doesn&apos;t depend
                on anyone remembering to keep it current.
              </p>
              <ul className={styles.list}>
                {[
                  "Client and project events",
                  "Invoice created and paid events",
                  "Meetings scheduled",
                  "No manual note-taking required",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                The history builds itself in the background, so it&apos;s always there when you need
                it.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="clients"
                alt="A Sarion client record with a chronological activity timeline"
                url="trysarion.com/clients"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`}>
        <div className="mContainer">
          <div className={styles.row} data-reverse={true}>
            <div className={styles.copy}>
              <span className="mEyebrow">Shared Context</span>
              <h2 className={styles.title}>Anyone on the team can pick up where you left off</h2>
              <p className={styles.workflow}>
                Every entry is tied to the client it happened on, so opening a client record shows
                its full history in order — not just the most recent message. If someone&apos;s out
                sick or a client gets handed to a new account manager, the context is already
                there instead of living in one person&apos;s head.
              </p>
              <ul className={styles.list}>
                {[
                  "Full history per client, in order",
                  "Searchable across past activity",
                  "Agency-wide feed across all clients",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                No one has to ask &quot;does anyone know what happened with this client?&quot; again.
              </p>
              <Link href="/features/crm" className={styles.inlineLink}>
                See the client CRM →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="clients"
                alt="Searching activity history on a Sarion client record"
                url="trysarion.com/clients"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`}>
        <div className="mContainer">
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className="mEyebrow">Client-Facing Progress</span>
              <h2 className={styles.title}>Clients see real progress, not a status email</h2>
              <p className={styles.workflow}>
                Select activity from the timeline — project milestones, invoice status, and other
                client-relevant updates — surfaces directly in the client&apos;s portal. Instead of
                writing a separate status update, the progress that&apos;s already happening becomes
                something the client can check on their own.
              </p>
              <ul className={styles.list}>
                {[
                  "Client-relevant milestones in the portal",
                  "No separate status email to write",
                  "Internal notes stay internal",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                Clients stop asking &quot;what&apos;s the status&quot; because they can already see it.
              </p>
              <Link href="/features/client-portal" className={styles.inlineLink}>
                See the client portal →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="clients"
                alt="Client-facing activity and project progress shown in the Sarion portal"
                url="trysarion.com/clients"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about the activity timeline" />
          <FaqGrid items={ACTIVITY_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See it in action with a free trial." />
    </>
  );
}
