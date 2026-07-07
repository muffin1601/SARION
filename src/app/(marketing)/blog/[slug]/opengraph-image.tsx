import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { getPostBySlug } from "@/lib/blog/posts";

// Standalone Node deploy (Coolify/Docker) — matches src/app/opengraph-image.tsx.
export const runtime = "nodejs";

export const alt = `${siteConfig.name} Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "white", fontSize: 36, fontWeight: 700 }}>{siteConfig.name} Blog</div>
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 950,
          }}
        >
          {post?.title ?? siteConfig.tagline}
        </div>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 28, fontWeight: 500 }}>
          trysarion.com/blog
        </div>
      </div>
    ),
    { ...size },
  );
}
