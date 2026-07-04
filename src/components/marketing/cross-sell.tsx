import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { SectionHeader } from "@/components/marketing/section-header";
import { CROSS_SELL, PRODUCT_BY_SLUG } from "@/lib/marketing/products";
import styles from "./cross-sell.module.css";

/** "People also buy" cross-sell widget — shown on individual product pages. */
export function CrossSell() {
  return (
    <section className="mSectionTight">
      <div className="mContainer">
        <SectionHeader eyebrow="More from SARION" title="People also buy" />
        <div className={styles.grid}>
          {CROSS_SELL.map((chain) => (
            <div key={chain.category} className={styles.chain}>
              <p className={styles.category}>{chain.category}</p>
              <div className={styles.items}>
                {chain.slugs.map((slug, i) => {
                  const product = PRODUCT_BY_SLUG[slug];
                  if (!product) return null;
                  return (
                    <div key={slug}>
                      {i > 0 && (
                        <div className={styles.arrow}>
                          <ArrowDown size={14} aria-hidden />
                        </div>
                      )}
                      {product.href ? (
                        <Link href={product.href} className={styles.item}>
                          {product.name}
                        </Link>
                      ) : (
                        <span className={`${styles.item} ${styles.itemMuted}`}>
                          {product.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
