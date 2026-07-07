/** Educational content shell for a tool page — pairs 1:1 with a calculator
 *  in src/lib/tools/calculators/ by matching `slug`. */
export interface ToolBenchmark {
  label: string;
  value: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolContent {
  slug: string;
  title: string;
  featured?: boolean;
  addedDate: string;

  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubhead: string;

  whatItMeans: string;
  whyItMatters: string;
  benchmarks: ToolBenchmark[];
  howToImprove: string[];
  commonMistakes: string[];

  faqs: ToolFaq[];
  relatedResourceSlugs: string[];
  relatedBlogSlugs: string[];
  relatedIndustrySlugs: string[];
  relatedComparisonSlugs: string[];
  relatedToolSlugs: string[];
}
