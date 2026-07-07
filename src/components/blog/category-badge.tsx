import Link from "next/link";

import { getCategoryBySlug } from "@/content/categories";

export function CategoryBadge({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  return (
    <Link href={`/blog/category/${category.slug}`} className="mBadge mBadgeInfo">
      {category.name}
    </Link>
  );
}
