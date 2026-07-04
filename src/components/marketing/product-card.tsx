import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { ProductSummary } from "@/lib/marketing/products";
import styles from "./product-card.module.css";

export function ProductCard({ product }: { product: ProductSummary }) {
  const available = product.status === "available";

  const body = (
    <div className={styles.card} data-status={product.status}>
      <div className={styles.top}>
        <span className={styles.eyebrow}>
          {product.collection} · {product.volume}
        </span>
        {available ? (
          <Badge variant="success">Available</Badge>
        ) : (
          <Badge variant="secondary">Coming Soon</Badge>
        )}
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.footer}>
        {available && product.price ? (
          <span className={styles.price}>${product.price}</span>
        ) : (
          <span className={styles.price}>—</span>
        )}
        {available ? (
          <span className="mBtn mBtnPrimary">Learn More</span>
        ) : (
          <span className="mBtn mBtnGhost" aria-disabled>
            Notify Me
          </span>
        )}
      </div>
    </div>
  );

  if (available && product.href) {
    return (
      <Link href={product.href} aria-label={`Learn more about ${product.name}`}>
        {body}
      </Link>
    );
  }

  return body;
}
