/** Resource platform data shape. See src/content/resources/resources.ts. */
export type ResourceCategorySlug =
  | "templates"
  | "checklists"
  | "sops"
  | "calculators"
  | "guides"
  | "prompts"
  | "playbooks";

export interface HowToStep {
  step: string;
  description: string;
}

export interface ResourceFaq {
  question: string;
  answer: string;
}

export interface Resource {
  slug: string;
  title: string;
  category: ResourceCategorySlug;
  tags: string[];
  status: "live" | "coming-soon";
  /** Shown in the hub's "Featured" section. */
  featured?: boolean;
  /** Placeholder ranking flag — same honesty pattern as /compare's "most viewed" placeholder. */
  popular?: boolean;
  /** ISO date string — drives the hub's "newest" ordering. */
  addedDate: string;

  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;

  overview: string;
  whyItMatters: string;
  whoShouldUseIt: string[];
  howToUseIt: HowToStep[];

  fileType: string;
  estimatedTimeSaved: string;
  whatsIncluded: string[];
  /** Short structured preview — real content excerpt, not an invented screenshot. */
  previewContent?: string[];

  faqs: ResourceFaq[];
  relatedResourceSlugs: string[];
  relatedBlogSlugs: string[];
  relatedComparisonSlugs: string[];
  relatedIndustrySlugs: string[];
}
