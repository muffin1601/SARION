import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import { FaqGrid } from "@/components/marketing/faq-grid";
import { RelatedPages } from "@/components/marketing/related-pages";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/seo/schema";
import styles from "./why-sarion.module.css";

export const metadata: Metadata = {
  title: "Why Sarion",
  description:
    "Why Sarion exists: agencies don't need another general-purpose project tool — they need software built around the client relationship itself.",
  alternates: { canonical: "/why-sarion" },
  openGraph: {
    title: "Why Sarion · Sarion",
    description:
      "Why Sarion exists: agencies don't need another general-purpose project tool — they need software built around the client relationship itself.",
    url: "/why-sarion",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Why Sarion", path: "/why-sarion" },
];

const WHY_SARION_FAQ = [
  {
    question: "Isn't Sarion just another project management tool?",
    answer:
      "No. Project management tools organize tasks; Sarion organizes the client relationship the tasks belong to — the client record, the project status they can see, the invoice tied to it, and the portal that ties it all together for them.",
  },
  {
    question: "Why not just use a general tool and configure it to fit?",
    answer:
      "You can, and some agencies do. But configuring a generic tool into an agency workflow takes ongoing effort, and it still won't give clients a portal built for them. Sarion starts from the agency-client relationship instead of a blank workspace you have to build up yourself.",
  },
  {
    question: "What does \"agency-first\" actually mean in the product?",
    answer:
      "It means every feature is evaluated by whether it helps an agency manage a client relationship, not by whether it adds generic flexibility. That's why the client portal shipped before things like custom fields or automation — it's the part that's specific to agency work.",
  },
  {
    question: "Is this just positioning, or does it change what gets built?",
    answer:
      "It changes what gets built. Roadmap decisions are weighed against \"does this help an agency run client work more clearly,\" which is a narrower bar than \"could this be useful to some team somewhere.\"",
  },
];

const RELATED_LINKS = [
  {
    label: "About Sarion",
    description: "Who's building Sarion and the company behind it.",
    href: "/about",
  },
  {
    label: "Features",
    description: "The full breakdown of every tool in the workspace.",
    href: "/features",
  },
  {
    label: "Solutions by Industry",
    description: "See how Sarion fits your specific kind of agency.",
    href: "/solutions",
  },
];

const DIFFERENCES = [
  {
    title: "Client records, not just contacts",
    body: "Every client has a real record — notes, history, and every project and invoice tied to them — instead of a name in a generic contacts list.",
  },
  {
    title: "Project tracking built around delivery",
    body: "Status, due dates, and task checklists are scoped to client engagements, not abstracted into a generic board that could belong to any team, anywhere.",
  },
  {
    title: "Invoicing that lives next to the work",
    body: "Invoices sit beside the project they bill for, so paid, unpaid, and overdue status is visible without exporting anything to a separate app.",
  },
  {
    title: "A client portal, not a shared doc",
    body: "Clients get a branded, permissioned view of their own projects and invoices — not a spreadsheet link or a guest seat in your internal tool.",
  },
];

const BREADCRUMB_SCHEMA = breadcrumbSchema(TRAIL);
const FAQ_SCHEMA = faqSchema(WHY_SARION_FAQ);
const WEBPAGE_SCHEMA = webPageSchema({
  name: "Why Sarion",
  description:
    "Why Sarion exists: agencies don't need another general-purpose project tool — they need software built around the client relationship itself.",
  url: "/why-sarion",
});

export default function WhySarionPage() {
  return (
    <>
      <JsonLd
        id="why-sarion-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [BREADCRUMB_SCHEMA, WEBPAGE_SCHEMA, FAQ_SCHEMA],
        }}
      />

      {/* Hero */}
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <div className={styles.hero}>
            <span className="mEyebrow">Why Sarion</span>
            <h1 className={styles.headline}>
              Agencies don&apos;t need another project tool. They need one built
              around the client.
            </h1>
            <p className={styles.subheadline}>
              Most software an agency adopts was designed for internal teams
              first and bent into shape for client work afterward. Sarion
              starts from the opposite direction: the client relationship is
              the unit everything else is organized around.
            </p>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="The Problem"
              title="Generic tools and spreadsheets weren't built for agency work"
            />
            <div className={styles.proseBody}>
              <p>
                A task board doesn&apos;t know it&apos;s attached to a client who&apos;s
                paying an invoice for that work. A spreadsheet doesn&apos;t know a
                project&apos;s status needs to be shown to someone outside the
                team. That mismatch is why agencies end up duct-taping a
                project tool, an invoicing app, and a shared folder together —
                see our{" "}
                <Link href="/compare/agency-crm-vs-spreadsheets">
                  comparison of agency CRM vs. spreadsheets
                </Link>{" "}
                for the specific gaps spreadsheets leave open.
              </p>
              <p>
                General-purpose workspace tools have the opposite problem:
                they&apos;re flexible enough to become anything, which means an
                agency has to spend real time configuring boards, fields, and
                permissions before the tool reflects how client work actually
                runs. Our{" "}
                <Link href="/compare/clickup">Sarion vs. ClickUp comparison</Link>{" "}
                walks through where that flexibility helps and where it just
                adds setup work an agency didn&apos;t sign up for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Sarion is different */}
      <section className="mSection">
        <div className="mContainer">
          <SectionHeader
            eyebrow="How Sarion Is Different"
            title="Built for client relationships, not generic project management"
            description="Every part of the workspace is scoped to the thing agencies actually manage: a client, their projects, and what they're billed for."
          />
          <div className={styles.featureList}>
            {DIFFERENCES.map((d) => (
              <div key={d.title} className={styles.featureItem}>
                <h3 className={styles.featureTitle}>{d.title}</h3>
                <p className={styles.featureBody}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our vision */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Our Vision"
              title="Clarity should be the default, not something you configure"
            />
            <div className={styles.proseBody}>
              <p>
                A lot of software treats simplicity as a starting tier you
                graduate out of once you need &ldquo;real&rdquo; features. We think
                that&apos;s backwards for agency work — the clearest possible view
                of a client, their projects, and what they owe should be
                available on day one, not unlocked after weeks of setup.
              </p>
              <p>
                Long-term, that means Sarion keeps expanding into the
                relationship itself — clearer client communication, less
                manual chasing on invoices, more of the status update written
                automatically instead of by hand — without ever trading away
                the plain, uncluttered view that made the product useful in
                the first place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agency-first philosophy */}
      <section className="mSection">
        <div className="mContainer">
          <div className={styles.prose}>
            <SectionHeader
              align="left"
              eyebrow="Agency-First Philosophy"
              title="What 'agency-first' means when we make product decisions"
            />
            <div className={styles.proseBody}>
              <p>
                A concrete example: when we had to choose between building
                deep custom-field configuration (useful to almost any kind of
                team) and building the branded client portal (useful
                specifically to agencies with outside clients), we built the
                portal first. It doesn&apos;t generalize to every kind of
                software team — but it&apos;s the piece that actually matters for
                agency work, and that&apos;s the bar every roadmap decision gets
                measured against.
              </p>
              <p>
                See what that produced in practice on the{" "}
                <Link href="/features">features page</Link>, or explore how it
                plays out for your specific kind of agency on{" "}
                <Link href="/solutions">solutions by industry</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mSection mSectionAlt">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about why Sarion exists" />
          <FaqGrid items={WHY_SARION_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection
        headline="See the agency-first workspace for yourself"
        subtext="Start your 14-day free trial. No credit card required."
      />
    </>
  );
}
