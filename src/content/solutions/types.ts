/** Industry landing page data shape. See src/content/solutions/industries.ts. */
export interface PainPoint {
  title: string;
  description: string;
}

export interface ToolShortcoming {
  /** A tool *category*, not a competitor product name (e.g. "Spreadsheets"). */
  tool: string;
  shortcoming: string;
}

export interface SolutionMappingItem {
  problem: string;
  solution: string;
}

export interface WorkflowStep {
  step: string;
  description: string;
}

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface Industry {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;
  painPoints: PainPoint[];
  whyToolsFail: ToolShortcoming[];
  howSarionSolves: SolutionMappingItem[];
  /** Matches FeatureSection.eyebrow values in src/lib/marketing/features.ts. */
  relevantFeatureEyebrows: string[];
  workflow: WorkflowStep[];
  faqs: IndustryFaq[];
  outcomes: string[];
  relatedBlogSlugs: string[];
  relatedResourceSlugs: string[];
  relatedIndustrySlugs: string[];
}
