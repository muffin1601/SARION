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
import type { HomeFaqItem } from "@/lib/marketing/faq";
import styles from "../features.module.css";

export const metadata: Metadata = {
  title: "Project Management",
  description:
    "Track project status, due dates, and task checklists scoped to each client — every project lives directly on the client record, tied to invoices and portal activity, not a standalone project tool.",
  alternates: { canonical: "/features/projects" },
  keywords: [
    "agency project management",
    "project tracking software for agencies",
    "client project tracking",
    "agency task checklists",
  ],
  openGraph: {
    title: "Project Management · Sarion",
    description:
      "Status tracking, due dates, and task checklists — every project tied to the client record it belongs to.",
    url: "/features/projects",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Projects", path: "/features/projects" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const PROJECTS_FAQ: HomeFaqItem[] = [
  {
    question: "Can I set task checklists on a project?",
    answer:
      "Yes. Each project supports its own task checklist, so you can break work into steps and see exactly what's done versus outstanding — not just a single status label.",
  },
  {
    question: "How do I see what's overdue?",
    answer:
      "Every project has a status (Planned, Active, Completed, or On Hold) and a due date. Delayed projects are flagged automatically across the dashboard and client record, so you catch a slipping deadline before a client has to ask.",
  },
  {
    question: "Is this a replacement for ClickUp or Asana?",
    answer:
      "No — and it isn't trying to be. Sarion's project tracking is intentionally scoped to client delivery: status, due dates, and checklists tied to a specific client, invoice, and portal, not general team task management, sprints, or cross-team backlogs. If you need a full project-management suite for internal engineering work, keep that tool and use Sarion for the client-facing side.",
  },
  {
    question: "Do projects show up anywhere besides the projects list?",
    answer:
      "Yes. Every project lives on its client's record alongside that client's invoices, files, and portal activity, and project counts and delayed-project alerts surface right on the dashboard — so status is never separated from who it's for.",
  },
];
const FAQ_SCHEMA = faqSchema(PROJECTS_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion includes for running client work end to end.",
    href: "/features",
  },
  {
    label: "Client Management",
    description: "The client record every project, invoice, and portal update lives on.",
    href: "/features/crm",
  },
  {
    label: "Client Portal",
    description: "Where clients see their project's status and progress without asking.",
    href: "/features/client-portal",
  },
  {
    label: "Tasks",
    description: "How task checklists break project work into trackable steps.",
    href: "/features/tasks",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function ProjectsFeaturePage() {
  return (
    <>
      <JsonLd id="projects-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="projects-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Project Management"
            title="Project tracking that stays tied to the client"
            description="Every project belongs to a client record, so status, due dates, and task checklists never get separated from who it's for and what's been invoiced."
          />
          <p className={styles.intro}>
            Sarion isn&apos;t a generic, standalone project tool bolted on next to your CRM.
            Projects live directly on the client record itself, right alongside that client&apos;s
            invoices, files, and portal activity — so a project&apos;s status always has context, not
            just a label on a board.
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

      <section className={`mSectionTight ${styles.rowSection}`} data-first="true">
        <div className="mContainer">
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className="mEyebrow">Status &amp; Due Dates</span>
              <h2 className={styles.title}>See what&apos;s slipping before a client has to ask</h2>
              <p className={styles.workflow}>
                Set a project to Planned, Active, Completed, or On Hold the moment it kicks off,
                then check the dashboard each morning — delayed projects are flagged automatically
                so a missed due date never sits quietly until a client brings it up.
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Planned, Active, Completed, and On Hold statuses
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Due dates on every project
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Delayed-project alerts on the dashboard
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Project counts per client
                </li>
              </ul>
              <p className={styles.benefit}>
                Deadlines stay visible instead of living in someone&apos;s memory.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="projects"
                alt="The Sarion projects view showing status and due dates per client"
                url="trysarion.com/projects"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`}>
        <div className="mContainer">
          <div className={styles.row} data-reverse="true">
            <div className={styles.copy}>
              <span className="mEyebrow">Task Checklists</span>
              <h2 className={styles.title}>Break a project into steps you can actually track</h2>
              <p className={styles.workflow}>
                A single status label doesn&apos;t tell you what&apos;s actually left to do. Add a task
                checklist inside a project to track the individual steps, so anyone on the team can
                see what&apos;s done and what&apos;s still outstanding without asking around.
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Task checklists inside every project
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Clear done vs. outstanding at a glance
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Scoped to the project and client it belongs to
                </li>
              </ul>
              <p className={styles.benefit}>
                Progress is visible in steps, not just a single status word.
              </p>
              <Link href="/features/tasks" className={styles.inlineLink}>
                See how task checklists work →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="projects"
                alt="A Sarion project with a task checklist showing completed and outstanding items"
                url="trysarion.com/projects"
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
              <span className="mEyebrow">Client Record</span>
              <h2 className={styles.title}>One record ties the project, portal, and invoice together</h2>
              <p className={styles.workflow}>
                Because a project lives on the client record, its status update is automatically
                what the client sees in their portal, and it sits right next to the invoices tied
                to that work — no separate tool to keep in sync, no status copied by hand from one
                app into another.
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Project status visible in the client&apos;s branded portal
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Projects sit alongside that client&apos;s invoices and files
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  No separate project tool to keep manually in sync
                </li>
              </ul>
              <p className={styles.benefit}>
                Status-update emails go away because clients check the portal instead.
              </p>
              <Link href="/features/client-portal" className={styles.inlineLink}>
                See the client portal →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="portal"
                alt="The branded Sarion client portal showing a project's status and updates"
                url="trysarion.com/portal"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about project tracking in Sarion" />
          <FaqGrid items={PROJECTS_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="Keep every project tied to the client it's for." />
    </>
  );
}
