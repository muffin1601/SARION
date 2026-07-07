import styles from "./who-its-for.module.css";

export function WhoItsFor({
  sarionName,
  competitorName,
  sarionBestFor,
  competitorBestFor,
}: {
  sarionName: string;
  competitorName: string;
  sarionBestFor: string[];
  competitorBestFor: string[];
}) {
  return (
    <div className={styles.grid}>
      <div className={styles.column}>
        <span className="mBadge mBadgeSuccess">{sarionName}</span>
        <ul className={styles.list}>
          {sarionBestFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <span className="mBadge mBadgeInfo">{competitorName}</span>
        <ul className={styles.list}>
          {competitorBestFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
