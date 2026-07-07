/**
 * Structured-data (schema.org JSON-LD) builders. Centralised so every page
 * speaks the same vocabulary and so commercial facts (prices, plan names) are
 * derived from the single source of truth in src/config/plans.ts — the schema
 * can never advertise a price the product doesn't charge.
 */
import { siteConfig } from "@/config/site";
import { PAID_PLAN_LIST, PLANS } from "@/config/plans";

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

/** Organization — brand identity. Referenced by other nodes via @id. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/SARION-ICON.png`,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    // Official social profiles — lets search engines link the brand's
    // knowledge-panel entity to its verified social presence.
    sameAs: Object.values(siteConfig.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.salesEmail,
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.supportEmail,
        availableLanguage: ["English"],
      },
    ],
  };
}

/** WebSite — sitewide entity; enables name/branding in search. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/**
 * SoftwareApplication with a real AggregateOffer derived from the live plan
 * matrix (lowest paid monthly → highest). Eligible for product/SaaS rich data.
 */
export function softwareApplicationSchema() {
  const monthly = PAID_PLAN_LIST.map((p) => p.pricing.monthly);
  return {
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM",
    operatingSystem: "Web",
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
    featureList: [
      "Client management (CRM)",
      "Project & task tracking",
      "Invoicing",
      "Branded client portals",
      "Team collaboration",
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...monthly),
      highPrice: Math.max(...monthly),
      offerCount: PAID_PLAN_LIST.length,
      offers: [
        // Include the free tier explicitly so $0 entry is discoverable.
        {
          "@type": "Offer",
          name: `${PLANS.free.name} plan`,
          price: 0,
          priceCurrency: "USD",
        },
        ...PAID_PLAN_LIST.map((p) => ({
          "@type": "Offer",
          name: `${p.name} plan`,
          price: p.pricing.monthly,
          priceCurrency: "USD",
          url: `${siteConfig.url}/pricing`,
        })),
      ],
    },
  };
}

/** FAQPage — from an array of Q/A pairs. Eligible for FAQ rich results. */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList — pass ordered [label, path] pairs (paths relative to root). */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/** ItemList — an ordered collection of pages (e.g. the products catalog). */
export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

/** Product — a purchasable digital good (e.g. a SARION digital product). */
export function productSchema(data: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price: number;
  priceValidUntil?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    url: `${siteConfig.url}${data.url}`,
    ...(data.image ? { image: `${siteConfig.url}${data.image}` } : {}),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}${data.url}`,
      priceCurrency: "USD",
      price: data.price,
      availability: "https://schema.org/InStock",
      ...(data.priceValidUntil ? { priceValidUntil: data.priceValidUntil } : {}),
    },
  };
}

/** BlogPosting — a blog article. Eligible for Article rich results. */
export function blogPostingSchema(data: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  /** Path to the author's Person @id (e.g. "/about#person-sara-siddiqui" or
   *  "/blog/author/sara-siddiqui") — links the post to a real Person node
   *  when known, instead of a bare name string. */
  authorId?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    url: `${siteConfig.url}${data.url}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified ?? data.datePublished,
    author: data.authorId
      ? { "@id": `${siteConfig.url}${data.authorId}` }
      : { "@type": "Person", name: data.authorName },
    publisher: { "@id": ORG_ID },
    ...(data.image ? { image: `${siteConfig.url}${data.image}` } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${data.url}`,
    },
  };
}

/** WebPage — a standalone marketing page (e.g. an industry landing page). */
export function webPageSchema(data: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.name,
    description: data.description,
    url: `${siteConfig.url}${data.url}`,
    isPartOf: { "@id": SITE_ID },
  };
}

/** WebPage + DownloadAction — a downloadable resource page. */
export function downloadActionSchema(data: {
  name: string;
  description: string;
  url: string;
  fileFormat: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.name,
    description: data.description,
    url: `${siteConfig.url}${data.url}`,
    isPartOf: { "@id": SITE_ID },
    potentialAction: {
      "@type": "DownloadAction",
      target: `${siteConfig.url}${data.url}`,
      encodingType: data.fileFormat,
    },
  };
}

/** HowTo — step-by-step instructions for using a tool/calculator. */
export function howToSchema(data: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.name,
    description: data.description,
    step: data.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * WebApplication — describes a free browser-based calculator tool itself.
 * Distinct from softwareApplicationSchema(), which describes the Sarion
 * product, not an individual /tools calculator.
 */
export function toolApplicationSchema(data: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: data.name,
    description: data.description,
    url: `${siteConfig.url}${data.url}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "USD",
    },
  };
}

/** Person — a real, named individual (e.g. a founder or blog author). */
export function personSchema(data: { id: string; name: string; jobTitle: string; description?: string }) {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}${data.id}`,
    name: data.name,
    jobTitle: data.jobTitle,
    worksFor: { "@id": ORG_ID },
    ...(data.description ? { description: data.description } : {}),
  };
}

/** Article — a general article (e.g. a changelog entry). */
export function articleSchema(data: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    url: `${siteConfig.url}${data.url}`,
    datePublished: data.datePublished,
    dateModified: data.dateModified ?? data.datePublished,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${data.url}`,
    },
  };
}

/** SearchAction — enables a sitelinks searchbox pointing at the real /search page. */
export function searchActionSchema() {
  return {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  };
}

/** Sitewide @graph (Organization + WebSite) for the marketing layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      { ...websiteSchema(), potentialAction: searchActionSchema() },
    ],
  };
}
