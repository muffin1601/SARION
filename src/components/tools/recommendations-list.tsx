import styles from "./recommendations-list.module.css";

export function RecommendationsList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
