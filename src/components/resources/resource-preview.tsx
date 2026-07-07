import styles from "./resource-preview.module.css";

/** Structured content preview — a real excerpt of the resource's contents,
 *  framed like a document, not an invented screenshot. */
export function ResourcePreview({ lines }: { lines?: string[] }) {
  if (!lines?.length) return null;

  return (
    <div className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.label}>Preview</span>
      </div>
      <div className={styles.body}>
        {lines.map((line, i) => (
          <p key={i} className={styles.line}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
