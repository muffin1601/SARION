import styles from "./faq-grid.module.css";

export interface FaqGridItem {
  question: string;
  answer: string;
}

/** Two-column FAQ card grid — same visual pattern already used on /pricing. */
export function FaqGrid({ items }: { items: FaqGridItem[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.question} className={styles.item}>
          <p className={styles.question}>{item.question}</p>
          <p className={styles.answer}>{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
