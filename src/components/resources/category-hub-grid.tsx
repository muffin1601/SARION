import type { Resource } from "@/content/resources/types";
import { ResourceCard } from "./resource-card";
import styles from "./category-hub-grid.module.css";

export function CategoryHubGrid({ resources }: { resources: Resource[] }) {
  if (!resources.length) {
    return <p className={styles.empty}>Nothing here yet — check back soon.</p>;
  }

  return (
    <div className={styles.grid}>
      {resources.map((resource) => (
        <ResourceCard key={resource.slug} resource={resource} />
      ))}
    </div>
  );
}
