import Link from "next/link";

import { FLAGSHIP_CRM } from "@/lib/marketing/products";
import styles from "./flagship-card.module.css";

export function FlagshipCard() {
  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.eyebrow}>{FLAGSHIP_CRM.eyebrow}</span>
        <h3 className={styles.name}>{FLAGSHIP_CRM.name}</h3>
        <p className={styles.description}>{FLAGSHIP_CRM.description}</p>
        <div className={styles.actions}>
          <Link href={FLAGSHIP_CRM.primaryHref} className="mBtn mBtnPrimary mBtnLg">
            {FLAGSHIP_CRM.primaryLabel}
          </Link>
          <Link href={FLAGSHIP_CRM.secondaryHref} className="mBtn mBtnSecondary mBtnLg">
            {FLAGSHIP_CRM.secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
