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
  title: "Client Portal",
  description:
    "A branded space where clients see project status and invoices without emailing you for updates. White-labeled, shareable, and included on every paid plan.",
  alternates: { canonical: "/features/client-portal" },
  keywords: [
    "client portal software",
    "branded client portal for agencies",
    "agency client portal",
    "white label client portal",
  ],
  openGraph: {
    title: "Client Portal · Sarion",
    description:
      "A branded space where clients see project status and invoices without emailing you for updates.",
    url: "/features/client-portal",
  },
};

const BREADCRUMB_TRAIL = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "Client Portal", path: "/features/client-portal" },
];
const BREADCRUMB_SCHEMA = breadcrumbSchema(BREADCRUMB_TRAIL);

const CLIENT_PORTAL_FAQ: HomeFaqItem[] = [
  {
    question: "Does the portal show our branding or Sarion's?",
    answer:
      "Yours. Add your agency's logo and name so the portal your clients open looks like your own product — clients see your agency, not Sarion.",
  },
  {
    question: "Can clients comment on projects?",
    answer:
      "Yes. Each project has its own comment thread inside the portal, so a client can ask a question or leave feedback in context instead of starting a new email chain.",
  },
  {
    question: "Do clients need to create an account or log in?",
    answer:
      "No. Each client gets a unique, shareable portal link — no signup and no password to remember. Opening the link takes them straight to their projects, files, and invoices.",
  },
  {
    question: "Can clients see invoice status in the portal?",
    answer:
      "Yes. Paid and pending invoices are shown right alongside project status, so a client can check what they owe without asking you or digging through email.",
    href: "/features/invoices",
    hrefLabel: "See how invoicing works",
  },
];
const FAQ_SCHEMA = faqSchema(CLIENT_PORTAL_FAQ);

const RELATED_LINKS = [
  {
    label: "All Features",
    description: "See everything else Sarion brings into one agency workspace.",
    href: "/features",
  },
  {
    label: "Portal Demo",
    description: "Click through the real, interactive client portal with sample data.",
    href: "/portal-demo",
  },
  {
    label: "Invoices",
    description: "See how paid, unpaid, and overdue invoices are tracked.",
    href: "/features/invoices",
  },
  {
    label: "Project Management",
    description: "See how status, due dates, and tasks stay visible to your team.",
    href: "/features/projects",
  },
  {
    label: "Pricing",
    description: "The client portal is included on every paid plan — see what else you get.",
    href: "/pricing",
  },
];

export default function ClientPortalPage() {
  return (
    <>
      <JsonLd id="client-portal-breadcrumb-schema" data={BREADCRUMB_SCHEMA} />
      <JsonLd id="client-portal-faq-schema" data={FAQ_SCHEMA} />
      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={BREADCRUMB_TRAIL} center />
          <SectionHeader
            as="h1"
            eyebrow="Client Portal"
            title="A branded portal, not another status-update email"
            description="Clients get one link to check project status, leave comments, and see what they owe — under your agency's own branding, not Sarion's."
          />
          <div className={styles.heroActions}>
            <Link href="/signup" className="mBtn mBtnPrimary mBtnLg">
              Start Free
            </Link>
            <Link href="/portal-demo" className="mBtn mBtnSecondary mBtnLg">
              Try the live portal demo →
            </Link>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`} data-first>
        <div className="mContainer">
          <div className={styles.row}>
            <div className={styles.copy}>
              <span className="mEyebrow">Branded Access</span>
              <h2 className={styles.title}>Looks like your agency, not ours</h2>
              <p className={styles.workflow}>
                Every client gets a unique, shareable portal link — no Sarion logo, no signup
                screen. Add your own logo and agency name once, and every client who opens their
                link lands in a portal that looks like a product you built yourself.
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Your logo and agency name on every page
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  One shareable link per client — no app to install
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  No signup or password for your client to manage
                </li>
              </ul>
              <p className={styles.benefit}>
                Your portal becomes part of your agency&apos;s brand, not a reminder that you&apos;re using
                someone else&apos;s tool.
              </p>
              <Link href="/portal-demo" className={styles.inlineLink}>
                Try the live portal demo →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="portal"
                alt="The branded Sarion client portal showing an agency's own logo and name"
                url="trysarion.com/portal"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`mSectionTight ${styles.rowSection}`}>
        <div className="mContainer">
          <div className={styles.row} data-reverse>
            <div className={styles.copy}>
              <span className="mEyebrow">Status & Comments</span>
              <h2 className={styles.title}>Clients follow along without emailing you</h2>
              <p className={styles.workflow}>
                Each project shows its current status and due date right in the portal. If a
                client has a question or feedback, they leave it as a comment on that project —
                so the conversation stays attached to the work instead of scattered across email
                and chat threads.
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Live project status and due dates
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  A comment thread per project
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Recent activity, so clients see what changed
                </li>
              </ul>
              <p className={styles.benefit}>
                The Friday status-update email goes away almost entirely — clients check the
                portal instead of messaging you for updates.
              </p>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="portal"
                alt="A client portal project with status, due date, and a comment thread"
                url="trysarion.com/portal"
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
              <span className="mEyebrow">Invoices</span>
              <h2 className={styles.title}>Payment status, right where clients already look</h2>
              <p className={styles.workflow}>
                Invoices show up in the same portal as project status — marked paid or pending —
                so a client can check what they owe without digging through their inbox for a PDF
                or asking your billing contact directly.
              </p>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Paid and pending status at a glance
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  Line-item detail on every invoice
                </li>
                <li className={styles.item}>
                  <Check className={styles.check} aria-hidden />
                  No &quot;did you get my invoice?&quot; follow-ups
                </li>
              </ul>
              <p className={styles.benefit}>
                Fewer awkward payment conversations, because the status was visible the whole
                time.
              </p>
              <Link href="/features/invoices" className={styles.inlineLink}>
                See how invoicing works →
              </Link>
            </div>
            <div className={styles.visual}>
              <ProductShot
                name="invoices"
                alt="Invoices shown with paid and pending status inside the client portal"
                url="trysarion.com/portal"
                sizes="(max-width: 880px) 100vw, 540px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mSectionTight">
        <div className="mContainer">
          <SectionHeader eyebrow="FAQ" title="Questions about the client portal" />
          <FaqGrid items={CLIENT_PORTAL_FAQ} />
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>

      <CTASection headline="Give your clients a portal that looks like yours." />
    </>
  );
}
