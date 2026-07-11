/**
 * Static catalog of starter proposal categories. Seeds a new draft's line
 * items — not a required DB row (keeps the 8 built-ins out of migrations).
 * `ProposalTemplate` DB rows are for an agency's own saved custom templates.
 */

export interface ProposalTemplateItem {
  description: string;
  qty: number;
  unitPrice: number;
}

export interface ProposalTemplateCategory {
  category: string;
  label: string;
  description: string;
  defaultItems: ProposalTemplateItem[];
  defaultTerms: string;
}

export const PROPOSAL_TEMPLATE_CATEGORIES: ProposalTemplateCategory[] = [
  {
    category: "website_development",
    label: "Website Development",
    description: "Custom website design and build.",
    defaultItems: [
      { description: "Discovery & wireframes", qty: 1, unitPrice: 1200 },
      { description: "UI design (up to 6 pages)", qty: 1, unitPrice: 2400 },
      { description: "Front-end development", qty: 1, unitPrice: 3600 },
      { description: "QA & launch", qty: 1, unitPrice: 800 },
    ],
    defaultTerms: "50% deposit to begin, balance due on launch. Revisions limited to 2 rounds per milestone.",
  },
  {
    category: "seo",
    label: "SEO",
    description: "Search engine optimization engagement.",
    defaultItems: [
      { description: "Technical SEO audit", qty: 1, unitPrice: 900 },
      { description: "Keyword research & strategy", qty: 1, unitPrice: 600 },
      { description: "On-page optimization", qty: 1, unitPrice: 1200 },
      { description: "Monthly reporting (3 months)", qty: 3, unitPrice: 300 },
    ],
    defaultTerms: "Results reported monthly. SEO is a long-term investment — meaningful ranking changes typically take 3-6 months.",
  },
  {
    category: "marketing",
    label: "Marketing",
    description: "Multi-channel marketing campaign.",
    defaultItems: [
      { description: "Campaign strategy", qty: 1, unitPrice: 800 },
      { description: "Ad creative production", qty: 1, unitPrice: 1500 },
      { description: "Campaign management (monthly)", qty: 1, unitPrice: 1000 },
    ],
    defaultTerms: "Ad spend billed separately, passed through at cost. Campaign management fee is monthly, cancel anytime with 30 days notice.",
  },
  {
    category: "branding",
    label: "Branding",
    description: "Brand identity design.",
    defaultItems: [
      { description: "Brand strategy workshop", qty: 1, unitPrice: 1000 },
      { description: "Logo design (3 concepts)", qty: 1, unitPrice: 1800 },
      { description: "Brand guidelines document", qty: 1, unitPrice: 900 },
    ],
    defaultTerms: "Includes 2 rounds of revisions per deliverable. Final files delivered upon full payment.",
  },
  {
    category: "maintenance",
    label: "Maintenance",
    description: "Ongoing website/product maintenance.",
    defaultItems: [
      { description: "Monthly maintenance (updates, backups, monitoring)", qty: 1, unitPrice: 350 },
    ],
    defaultTerms: "Monthly retainer, auto-renews. Emergency fixes outside scope billed hourly.",
  },
  {
    category: "retainer",
    label: "Retainer",
    description: "Ongoing monthly retainer engagement.",
    defaultItems: [
      { description: "Monthly retainer (up to 20 hours)", qty: 1, unitPrice: 2500 },
    ],
    defaultTerms: "Unused hours do not roll over. 30 days notice to cancel.",
  },
  {
    category: "social_media",
    label: "Social Media",
    description: "Social media management.",
    defaultItems: [
      { description: "Content calendar & strategy", qty: 1, unitPrice: 500 },
      { description: "Monthly content creation & posting (2 platforms)", qty: 1, unitPrice: 1200 },
    ],
    defaultTerms: "Ad spend billed separately. Content approval required 3 business days before posting.",
  },
  {
    category: "consulting",
    label: "Consulting",
    description: "Strategic consulting engagement.",
    defaultItems: [
      { description: "Consulting (hourly)", qty: 10, unitPrice: 200 },
    ],
    defaultTerms: "Billed against the estimated hours above; unused hours refunded, overages billed at the same rate.",
  },
];

export function getTemplateCategory(category: string): ProposalTemplateCategory | undefined {
  return PROPOSAL_TEMPLATE_CATEGORIES.find((c) => c.category === category);
}
