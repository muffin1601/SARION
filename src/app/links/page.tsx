import type { Metadata } from "next";

import { LinksPageClient } from "@/components/links/links-page-client";
import { links, contactEmail } from "@/components/links/links-data";

const TITLE = "SARION | Links";
const DESCRIPTION =
  "Official links for SARION including YouTube, website, social media, and contact information.";
const URL = "https://trysarion.com/links";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "profile",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "SARION",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function LinksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: "2026-07-11",
    mainEntity: {
      "@type": "Organization",
      name: "SARION",
      url: "https://trysarion.com",
      logo: "https://trysarion.com/SARION-ICON.png",
      email: contactEmail,
      sameAs: links
        .filter((link) => link.url.startsWith("http"))
        .map((link) => link.url),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LinksPageClient />
    </>
  );
}
