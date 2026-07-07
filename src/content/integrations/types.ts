export type IntegrationStatus = "coming-soon" | "requested";

export interface Integration {
  slug: string;
  name: string;
  status: IntegrationStatus;
  description: string;
  benefits: string[];
  relatedFeatureEyebrows: string[];
}
