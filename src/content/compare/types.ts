/** Comparison landing page data shape. See src/content/compare/comparisons.ts. */
export interface ComparisonRow {
  category: string;
  sarion: string;
  competitor: string;
}

export interface FitGuidanceItem {
  title: string;
  description: string;
}

export interface WorkflowComparison {
  agencyWorkflow: ComparisonRow[];
  clientManagement: ComparisonRow[];
  projectManagement: ComparisonRow[];
  portal: ComparisonRow[];
  reporting: ComparisonRow[];
  automation: ComparisonRow[];
}

export type ComparisonCategory =
  | "project-management"
  | "all-in-one-workspace"
  | "crm"
  | "spreadsheets";

export interface Comparison {
  slug: string;
  competitorName: string;
  category: ComparisonCategory;
  /** Shown in the /compare index "Featured" section. */
  featured?: boolean;
  /** ISO date string — drives the index's "recently added" ordering. */
  addedDate: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;
  /** 2-3 sentence honest positioning paragraph. */
  quickSummary: string;
  sarionBestFor: string[];
  /** Honest — who the competitor genuinely fits. Never empty. */
  competitorBestFor: string[];
  whenSarionFits: FitGuidanceItem[];
  /** Honest — required even when it's an uncomfortable admission. */
  whenCompetitorFits: FitGuidanceItem[];
  featureMatrix: ComparisonRow[];
  workflowComparison: WorkflowComparison;
  /** Prose only — never a specific competitor dollar amount. */
  pricingPhilosophy: string;
  migrationSteps: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedBlogSlugs: string[];
  relatedResourceSlugs: string[];
  relatedIndustrySlugs: string[];
  relatedComparisonSlugs: string[];
}
