import { siteConfig } from "@/config/site";
import styles from "./share-buttons.module.css";

/** Static share links — no client JS/tracking lib required. */
export function ShareButtons({ title, path }: { title: string; path: string }) {
  const url = `${siteConfig.url}${path}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Share</span>
      <a
        className="mShareBtn"
        href={`https://x.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className="mShareBtn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a className="mShareBtn" href={`mailto:?subject=${text}&body=${encodedUrl}`}>
        Email
      </a>
    </div>
  );
}
