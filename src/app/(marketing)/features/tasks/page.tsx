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
  title: "Tasks",
  description:
    "Task checklists scoped to each project, so nothing gets missed between kickoff and delivery — built into Sarion's agency management software.",
  alternates: { canonical: "/features/tasks" },
  keywords: ["agency task management", "project task tracking for agencies"],
  openGraph: {
    title: "Tasks · Sarion",
    description:
      "Task checklists that live inside the project they belong to — mark items done, see what's still open, right where the client work already lives.",
    url: "/features/tasks",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Tasks", path: "/features/tasks" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const TASKS_FAQ = [
  {
    question: "Is this a full task management tool like Asana or ClickUp?",
    answer:
      "No, and it's not trying to be. Sarion's tasks are intentionally simple checklists scoped to a project — there's no subtasks, dependencies, sprints, or standalone task board. If deep task management is your main need, it's worth comparing Sarion against dedicated tools first.",
    href: "/compare",
    hrefLabel: "See how Sarion compares",
  },
  {
    question: "Can I assign tasks to team members?",
    answer:
      "Yes. Each task can have one assignee, so it's clear who owns an item on the checklist — but it stays simple, without workload views, capacity planning, or reassignment workflows layered on top.",
  },
  {
    question: "Can I set due dates on individual tasks?",
    answer:
      "Not yet — tasks are mark-done checklist items without their own due dates today. The project itself carries a due date, which is what shows up on the dashboard and in the client portal.",
    href: "/features/projects",
    hrefLabel: "See how project due dates work",
  },
  {
    question: "Do tasks show up anywhere outside the project?",
    answer:
      "Yes, in one place: your dashboard shows a running count of open tasks across all your projects, so you can spot work piling up without opening every project individually. Tasks themselves stay inside their project — there's no separate, disconnected task list.",
    href: "/features/dashboard",
    hrefLabel: "See the dashboard",
  },
];
const FAQ_SCHEMA = faqSchema(TASKS_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion does in one workspace.",
    href: "/features",
  },
  {
    label: "Projects",
    description: "The project every task checklist actually lives inside.",
    href: "/features/projects",
  },
  {
    label: "Dashboard",
    description: "Open-task counts alongside revenue, invoices, and project status.",
    href: "/features/dashboard",
  },
  {
    label: "Compare",
    description: "See how Sarion stacks up against dedicated task and project tools.",
    href: "/compare",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function TasksPage() {
  return (
    <>
      <JsonLd id="tasks-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="tasks-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Tasks"
            title="Task checklists that stay with the project"
            description="Tasks live inside the project they belong to, so there's no separate task board disconnected from who the client is or what's been invoiced."
          />
          <p className={styles.intro}>
            No standalone to-do app to keep in sync with your real work. Add a checklist to a
            project, mark items done as the work happens, and the dashboard tells you what&apos;s
            still open — all without leaving the client and project record it belongs to.
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
              <span className="mEyebrow">Checklists Per Project</span>
              <h2 className={styles.title}>Break a project into a simple checklist</h2>
              <p className={styles.workflow}>
                Whoever&apos;s running a project adds the steps it takes to deliver it, then checks
                items off as they&apos;re finished — no separate app, no copying a list from a
                notebook or a chat thread into yet another tool.
              </p>
              <ul className={styles.list}>
                {[
                  "Add tasks to any project",
                  "Mark done or not done",
                  "Assign a task to a team member",
                  "Reorder items as priorities shift",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                A clear, shared view of what&apos;s left on a project — without a status meeting to
                find out.
              </p>
              <Link href="/features/projects" className={styles.inlineLink}>
                See how projects work →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="projects"
                alt="A Sarion project with a task checklist showing completed and open items"
                url="trysarion.com/projects"
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
              <span className="mEyebrow">Open Task Visibility</span>
              <h2 className={styles.title}>Nothing slips through unnoticed</h2>
              <p className={styles.workflow}>
                Your dashboard keeps a running count of open tasks across every project, so
                unfinished checklist items surface on their own instead of staying buried until
                someone opens each project one by one to check.
              </p>
              <ul className={styles.list}>
                {[
                  "Open-task count on the dashboard",
                  "Rolled up across every project",
                  "No project left unchecked",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                A quiet, honest signal of what still needs doing — not another inbox to manage.
              </p>
              <Link href="/features/dashboard" className={styles.inlineLink}>
                See the dashboard →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="dashboard"
                alt="The Sarion dashboard showing an open tasks count alongside other agency metrics"
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
              <span className="mEyebrow">Not a Standalone To-Do App</span>
              <h2 className={styles.title}>Always in context, never a flat list</h2>
              <p className={styles.workflow}>
                A task in Sarion is never just &quot;a task&quot; — it belongs to a project, and that
                project belongs to a client. Open a task and you already know who it&apos;s for and
                what it&apos;s part of, instead of hunting down context in a separate tool.
              </p>
              <ul className={styles.list}>
                {[
                  "Every task tied to a project",
                  "Every project tied to a client",
                  "No generic, disconnected to-do list",
                ].map((feature) => (
                  <li key={feature} className={styles.item}>
                    <Check className={styles.check} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className={styles.benefit}>
                If your team lives and dies by deep task management, a dedicated tool alongside
                Sarion may still make sense — this keeps the basics covered without asking you
                to leave the client record.
              </p>
              <Link href="/compare" className={styles.inlineLink}>
                Compare Sarion to other tools →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="projects"
                alt="A Sarion project view showing tasks scoped to a specific client and project"
                url="trysarion.com/projects"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about tasks in Sarion" />
          <FaqGrid items={TASKS_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See it in action with a free trial." />
    </>
  );
}
