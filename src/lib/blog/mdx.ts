import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import GithubSlugger from "github-slugger";

import type { TocItem } from "@/components/blog/table-of-contents";

/** Shared remark/rehype pipeline every post body compiles through. */
export const MDX_OPTIONS = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }] as [
        typeof rehypeAutolinkHeadings,
        Record<string, unknown>,
      ],
    ],
  },
};

/**
 * Extracts h2/h3 headings from raw markdown for the table of contents. Uses
 * the same slugger rehype-slug uses internally, so ids match the anchors
 * actually rendered in the compiled post body.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;

  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(markdown)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    items.push({ id: slugger.slug(text), text, depth });
  }

  return items;
}
