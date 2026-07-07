import { DownloadGateForm } from "@/components/email-capture/download-gate-form";
import type { Resource } from "@/content/resources/types";
import styles from "./download-panel.module.css";

export function DownloadPanel({ resource }: { resource: Resource }) {
  return (
    <div className={styles.panel}>
      <div className={styles.meta}>
        <div>
          <p className={styles.metaLabel}>File type</p>
          <p className={styles.metaValue}>{resource.fileType}</p>
        </div>
        <div>
          <p className={styles.metaLabel}>Estimated time saved</p>
          <p className={styles.metaValue}>{resource.estimatedTimeSaved}</p>
        </div>
      </div>

      <div className={styles.included}>
        <p className={styles.metaLabel}>What&apos;s included</p>
        <ul>
          {resource.whatsIncluded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.form}>
        <DownloadGateForm resourceTitle={resource.title} />
      </div>
    </div>
  );
}
