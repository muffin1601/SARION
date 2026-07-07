export type RoadmapStatus = "shipped" | "now" | "next" | "later";
export type RoadmapArea = "ai" | "portal" | "crm" | "mobile" | "automation";

export interface RoadmapItem {
  title: string;
  status: RoadmapStatus;
  area: RoadmapArea;
  description: string;
}
