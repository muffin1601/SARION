import Link from "next/link";
import { Check } from "lucide-react";

import styles from "./pricing-card.module.css";

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  featured?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  /** Billing period label shown after the price. Defaults to "/month". */
  period?: string;
  /** Badge text shown on the card. Defaults to "Most popular" when featured. */
  badge?: string;
  /** Renders as a single, wider, premium card — use for a standalone offer. */
  solo?: boolean;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  featured = false,
  ctaLabel = "Start Free Trial",
  ctaHref = "/signup",
  period = "/month",
  badge,
  solo = false,
}: PricingCardProps) {
  const flagText = badge ?? (featured ? "Most popular" : undefined);
  return (
    <div className={styles.card} data-featured={featured} data-solo={solo || undefined}>
      {flagText && <span className={styles.flag}>{flagText}</span>}
      <div className={styles.head}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.priceRow}>
        <span className={styles.price}>${price}</span>
        <span className={styles.period}>{period}</span>
      </div>
      <Link
        href={ctaHref}
        className={`mBtn ${featured ? "mBtnPrimary" : "mBtnSecondary"}`}
      >
        {ctaLabel}
      </Link>
      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Check className={styles.check} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
