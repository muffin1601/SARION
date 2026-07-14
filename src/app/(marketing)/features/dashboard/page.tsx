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
  title: "Dashboard",
  description:
    "A real-time snapshot of revenue, projects, invoices, and team activity — one view of the whole agency, built into Sarion's agency management software.",
  alternates: { canonical: "/features/dashboard" },
  keywords: ["agency dashboard", "agency management software"],
  openGraph: {
    title: "Dashboard · Sarion",
    description:
      "One dashboard for the whole agency — revenue, overdue invoices, delayed projects, and team activity, updated in real time.",
    url: "/features/dashboard",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Dashboard", path: "/features/dashboard" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const DASHBOARD_FAQ = [
  {
    question: "Can I customize what's on my dashboard?",
    answer:
      "Yes. Widgets can be reordered, hidden, or collapsed per user, so an account manager can prioritize client and project activity while a founder keeps revenue and invoicing front and center — on the same workspace, without stepping on each other's view.",
  },
  {
    question: "Does it show revenue in real time?",
    answer:
      "Yes. Today's revenue, monthly revenue, and outstanding payments are pulled live from your invoices, so the numbers on the dashboard match what's actually been paid and what's still owed — no manual refresh or exported report required.",
  },
  {
    question: "What's the health score based on?",
    answer:
      "The business health score is calculated from the same data already on your dashboard — revenue trend, outstanding payments, delayed projects, and overdue invoices — rolled into one number so you can gauge how the agency is doing at a glance, before digging into any single widget.",
  },
  {
    question: "Will it tell me what needs my attention today?",
    answer:
      "Yes. The priorities and notifications widgets surface overdue invoices, delayed projects, meetings scheduled for today, and clients who've gone quiet, so you start the day knowing what to act on instead of clicking through every project and invoice to check.",
  },
];
const FAQ_SCHEMA = faqSchema(DASHBOARD_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion does in one workspace.",
    href: "/features",
  },
  {
    label: "Reporting",
    description: "Dig deeper into the revenue and project numbers behind the dashboard.",
    href: "/features/reporting",
  },
  {
    label: "Client CRM",
    description: "The client record every dashboard widget is ultimately built from.",
    href: "/features/crm",
  },
  {
    label: "Invoices",
    description: "Paid, unpaid, and overdue invoices tied to every client.",
    href: "/features/invoices",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function DashboardPage() {
  return (
    <>
      <JsonLd id="dashboard-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="dashboard-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Dashboard"
            title="One dashboard for the whole agency"
            description="Today's revenue, overdue invoices, delayed projects, and team activity — pulled live from every client record into a single view, instead of a status meeting to find out where things stand."
          />
          <p className={styles.intro}>
            Every widget on the dashboard is built from the same client, project, and invoice
            data you&apos;re already working in — not a separate report you have to remember to
            generate. Open it in the morning and see exactly what changed since yesterday.
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
              <span className="mEyebrow">Snapshot & Health Score</span>
              <h2 className={styles.title}>The whole agency, at a glance</h2>
              <p className={styles.workflow}>
                Snapshot cards show today&apos;s revenue, monthly revenue, outstanding payments,
                active and delayed projects, invoices due, total and new clients, team members,
                and open tasks — the numbers you&apos;d otherwise chase across five different tools.
                A single business health score rolls those signals into one figure, so you can
                tell how the agency is doing before you dig into any one widget.
              </p>
              <ul className={styles.list}>
                {[
                  "Today's & monthly revenue",
                  "Outstanding payments",
                  "Active vs. delayed projects",
                  "Business health score",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                No more asking around to find out how the month is actually going.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="dashboard"
                alt="The Sarion dashboard showing revenue, outstanding payments, and project snapshot cards"
                url="trysarion.com/dashboard"
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
              <span className="mEyebrow">Priorities & Notifications</span>
              <h2 className={styles.title}>Know what needs attention today</h2>
              <p className={styles.workflow}>
                Overdue invoices, delayed projects, meetings on today&apos;s calendar, and clients
                who&apos;ve gone quiet all surface as priority signals the moment they happen —
                instead of staying buried until someone stumbles across them in a client record
                or project list.
              </p>
              <ul className={styles.list}>
                {[
                  "Overdue invoice alerts",
                  "Delayed project flags",
                  "Today's meetings",
                  "Inactive client signals",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                A short, honest list of what&apos;s actually urgent — not a firehose of every update.
              </p>
              <Link href="/features/invoices" className={styles.inlineLink}>
                See how overdue invoices are tracked →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="dashboard"
                alt="Priority signals on the Sarion dashboard flagging overdue invoices and delayed projects"
                url="trysarion.com/dashboard"
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
              <span className="mEyebrow">Built to Fit Each Role</span>
              <h2 className={styles.title}>Customizable, so everyone sees what matters to them</h2>
              <p className={styles.workflow}>
                Revenue charts, project status breakdowns, top clients by revenue, recent
                invoices, team activity, and ops widgets like hours tracked and upcoming
                renewals can all be reordered, hidden, or collapsed per person — a founder&apos;s
                dashboard doesn&apos;t have to look like a project manager&apos;s.
              </p>
              <ul className={styles.list}>
                {[
                  "Reorder widgets",
                  "Hide what's not relevant",
                  "Collapse sections you check less often",
                  "Preferences saved per user",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                One dashboard, tailored to the person looking at it instead of a fixed layout
                for everyone.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="dashboard"
                alt="A customized Sarion dashboard layout with reordered and collapsed widgets"
                url="trysarion.com/dashboard"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about Sarion's dashboard" />
          <FaqGrid items={DASHBOARD_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See it in action with a free trial." />
    </>
  );
}
