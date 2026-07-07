export type ChangelogType = "feature" | "fix" | "announcement";

export interface ChangelogEntry {
  slug: string;
  date: string;
  type: ChangelogType;
  title: string;
  description: string;
  tags: string[];
}
