import { AlertTriangle } from "lucide-react";

import styles from "./common-mistakes.module.css";

export function CommonMistakes({ items }: { items: string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          <AlertTriangle size={16} aria-hidden className={styles.icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
