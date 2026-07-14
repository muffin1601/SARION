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
  title: "Team Collaboration",
  description:
    "Invite your team, give the right people access to the right clients, and work from one shared workspace instead of scattered docs and DMs.",
  alternates: { canonical: "/features/team-collaboration" },
  keywords: ["agency team collaboration software", "team management for agencies"],
  openGraph: {
    title: "Team Collaboration · Sarion",
    description:
      "Invite your team, give the right people access to the right clients, and work from one shared workspace instead of scattered docs and DMs.",
    url: "/features/team-collaboration",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Team Collaboration", path: "/features/team-collaboration" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const TEAM_FAQ = [
  {
    question: "Can I limit what a freelancer or contractor sees?",
    answer:
      "Yes. When you invite someone as a team member rather than an owner, they work inside your agency's shared workspace without owner-level controls — so a contractor brought on for one engagement isn't managing billing or account settings they don't need to touch.",
  },
  {
    question: "How many team members can I add?",
    answer:
      "That depends on your plan — check current seat limits and what's included at each tier.",
    href: "/pricing",
    hrefLabel: "See plans",
  },
  {
    question: "What's the difference between an owner and a team member?",
    answer:
      "The owner is the agency account holder who invites people and manages the workspace. Team members get access to the same shared client, project, and invoice records so they can do their work without owner-level administrative access.",
  },
  {
    question: "Do team members see workload across the whole agency?",
    answer:
      "The team view shows who's working on what across active projects, so leads can see workload at a glance instead of asking around before handing off new work.",
  },
];
const FAQ_SCHEMA = faqSchema(TEAM_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything Sarion does in one workspace.",
    href: "/features",
  },
  {
    label: "Client CRM",
    description: "The client record your whole team works from.",
    href: "/features/crm",
  },
  {
    label: "Dashboard",
    description: "The at-a-glance view of clients, projects, and invoices.",
    href: "/features/dashboard",
  },
  {
    label: "Project Management",
    description: "Track status, due dates, and progress across every client.",
    href: "/features/projects",
  },
  {
    label: "Pricing",
    description: "See plans, founding pricing, and what's included at each tier.",
    href: "/pricing",
  },
];

export default function TeamCollaborationPage() {
  return (
    <>
      <JsonLd id="team-collaboration-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="team-collaboration-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Team Collaboration"
            title="Your whole team, one shared workspace"
            description="Invite teammates and contractors, give each person the right level of access, and let everyone work from the same client, project, and invoice records instead of scattered docs and DMs."
          />
          <p className={styles.intro}>
            Client work falls apart when the account manager, the person doing the work, and the
            person sending invoices are all looking at different information. Sarion keeps
            everyone on one team working from the same source of truth, with access that matches
            their role.
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
              <span className="mEyebrow">Invites & Access</span>
              <h2 className={styles.title}>Invite your team, set the right access level</h2>
              <p className={styles.workflow}>
                Founders invite teammates and contractors into the workspace as either an owner or
                a team member, so a freelancer brought on for one project gets access to do their
                work without owner-level controls over billing or agency settings.
              </p>
              <ul className={styles.list}>
                {["Owner access", "Team member access", "One invite, instant access"].map(
                  (feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <p className={styles.benefit}>
                Everyone gets access that matches their role, with no oversharing.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="team"
                alt="The Sarion team settings with members, invites, and permissions"
                url="trysarion.com/team"
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
              <span className="mEyebrow">Shared Records</span>
              <h2 className={styles.title}>Everyone works from the same client record</h2>
              <p className={styles.workflow}>
                Instead of one person&apos;s inbox holding the real status of a client, every teammate
                sees the same client, project, and invoice data the moment it&apos;s updated — so
                &quot;does anyone know the status?&quot; stops being a question anyone has to ask.
              </p>
              <ul className={styles.list}>
                {["Shared client records", "Shared project status", "Shared invoice visibility"].map(
                  (feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <p className={styles.benefit}>
                No more chasing a teammate to find out where things stand.
              </p>
              <Link href="/features/crm" className={styles.inlineLink}>
                See the client record →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="dashboard"
                alt="The Sarion dashboard showing shared client and project status"
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
              <span className="mEyebrow">Workload Visibility</span>
              <h2 className={styles.title}>See who&apos;s stretched thin before it&apos;s a problem</h2>
              <p className={styles.workflow}>
                Team leads can see workload across the team at a glance — who&apos;s carrying too many
                active projects and who has room — instead of finding out someone is overloaded
                only after a deadline slips.
              </p>
              <ul className={styles.list}>
                {["Team workload view", "Active project counts per person", "Visible before deadlines slip"].map(
                  (feature) => (
                    <li key={feature} className={styles.item}>
                      <Check className={styles.check} aria-hidden />
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <p className={styles.benefit}>
                New work goes to whoever actually has the capacity for it.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="team"
                alt="The Sarion team view showing workload across team members"
                url="trysarion.com/team"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about team collaboration" />
          <FaqGrid items={TEAM_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="See it in action with a free trial." />
    </>
  );
}
