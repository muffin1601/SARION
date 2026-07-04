import { SectionHeader } from "@/components/marketing/section-header";
import { ProductCard } from "@/components/marketing/product-card";
import type { CollectionMeta, ProductSummary } from "@/lib/marketing/products";
import styles from "./collection-section.module.css";

export function CollectionSection({
  collection,
  products,
}: {
  collection: CollectionMeta;
  products: ProductSummary[];
}) {
  return (
    <section className="mSectionTight">
      <div className="mContainer">
        <SectionHeader eyebrow="Collection" title={collection.title} description={collection.description} />
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
