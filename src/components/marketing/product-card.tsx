import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { ProductSummary } from "@/lib/marketing/products";
import styles from "./product-card.module.css";

export function ProductCard({ product }: { product: ProductSummary }) {
  const available = product.status === "available";

  return (
    <div className={styles.card} data-status={product.status}>
      <div className={styles.top}>
        <span className={styles.category}>{product.category}</span>
        {available ? (
          <Badge variant="success">Available</Badge>
        ) : (
          <Badge variant="secondary">Coming Soon</Badge>
        )}
      </div>

      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>

      <ul className={styles.features}>
        {product.features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <Check size={16} className={styles.featureCheck} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      <div className={styles.footer} data-align={available && product.price ? "split" : "end"}>
        {available && product.price && <span className={styles.price}>${product.price}</span>}
        {available && product.href ? (
          <Link href={product.href} className="mBtn mBtnPrimary">
            Learn More
          </Link>
        ) : (
          <span className="mBtn mBtnGhost" aria-disabled>
            Notify Me
          </span>
        )}
      </div>
    </div>
  );
}
