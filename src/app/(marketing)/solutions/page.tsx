import type { Metadata } from "next";

import { SectionHeader } from "@/components/marketing/section-header";
import { BreadcrumbNav } from "@/components/marketing/breadcrumb-nav";
import { RelatedPages } from "@/components/marketing/related-pages";
import { IndustryCard } from "@/components/solutions/industry-card";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/seo/schema";
import { INDUSTRIES } from "@/content/solutions/industries";
import styles from "./solutions.module.css";

export const metadata: Metadata = {
  title: "Solutions by Industry",
  description:
    "Agency workflow software tailored to how marketing, design, web development, SEO, branding, and creative agencies — plus freelancers and consultants — actually run client work.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "Solutions by Industry · Sarion",
    description:
      "Agency workflow software tailored to how different kinds of agencies and independents actually run client work.",
    url: "/solutions",
  },
};

const TRAIL = [
  { name: "Home", path: "/" },
  { name: "Solutions", path: "/solutions" },
];

const RELATED_LINKS = [
  { label: "Features", description: "The full breakdown of every tool in the workspace.", href: "/features" },
  { label: "Pricing", description: "Simple plans that grow with your agency.", href: "/pricing" },
  { label: "Portal Demo", description: "Try the branded client portal your clients would see.", href: "/portal-demo" },
  { label: "Customers", description: "See who Sarion is built for.", href: "/customers" },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd id="solutions-breadcrumb" data={breadcrumbSchema(TRAIL)} />
      <JsonLd
        id="solutions-list"
        data={itemListSchema(
          INDUSTRIES.map((industry) => ({
            name: industry.name,
            url: `/solutions/${industry.slug}`,
          })),
        )}
      />

      <section className="mSectionTight">
        <div className="mContainer">
          <BreadcrumbNav trail={TRAIL} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Solutions"
            title="Built for how your kind of agency actually works"
            description="Every industry runs client work a little differently. Pick yours to see the specific pain points, workflow, and features that matter most."
          />
        </div>
      </section>

      <section className="mSection">
        <div className="mContainer">
          <div className={styles.grid}>
            {INDUSTRIES.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
          <RelatedPages links={RELATED_LINKS} />
        </div>
      </section>
    </>
  );
}
