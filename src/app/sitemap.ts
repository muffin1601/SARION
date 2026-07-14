import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllPosts, getAllTags } from "@/lib/blog/posts";
import { CATEGORIES } from "@/content/categories";
import { AUTHORS } from "@/content/authors/authors";
import { RESOURCES } from "@/content/resources/resources";
import { RESOURCE_CATEGORIES } from "@/content/resources/categories";
import { INDUSTRIES } from "@/content/solutions/industries";
import { COMPARISONS } from "@/content/compare/comparisons";
import { getToolEntries } from "@/content/tools/tools";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

// Only public, indexable marketing + legal pages belong here. Authenticated
// app routes (/dashboard, /clients, …) and token-gated portals are excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: Route[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/features", changeFrequency: "monthly", priority: 0.9 },
    { path: "/features/crm", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/projects", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/client-portal", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/invoices", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/dashboard", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/team-collaboration", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/reporting", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/activity-timeline", changeFrequency: "monthly", priority: 0.8 },
    { path: "/features/tasks", changeFrequency: "monthly", priority: 0.8 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.9 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/products/claude-code-mastery", changeFrequency: "weekly", priority: 0.9 },
    { path: "/free", changeFrequency: "monthly", priority: 0.7 },
    { path: "/scorecard", changeFrequency: "monthly", priority: 0.8 },
    { path: "/portal-demo", changeFrequency: "monthly", priority: 0.6 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/resources", changeFrequency: "monthly", priority: 0.7 },
    { path: "/compare", changeFrequency: "weekly", priority: 0.8 },
    { path: "/tools", changeFrequency: "weekly", priority: 0.8 },
    { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/security", changeFrequency: "monthly", priority: 0.6 },
    { path: "/trust", changeFrequency: "monthly", priority: 0.7 },
    { path: "/changelog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/roadmap", changeFrequency: "weekly", priority: 0.6 },
    { path: "/integrations", changeFrequency: "weekly", priority: 0.6 },
    { path: "/customers", changeFrequency: "monthly", priority: 0.5 },
    { path: "/case-studies", changeFrequency: "monthly", priority: 0.5 },
    { path: "/why-sarion", changeFrequency: "monthly", priority: 0.6 },
    { path: "/enterprise", changeFrequency: "monthly", priority: 0.7 },
    { path: "/startup-program", changeFrequency: "monthly", priority: 0.5 },
    { path: "/partners", changeFrequency: "monthly", priority: 0.5 },
    { path: "/affiliate", changeFrequency: "monthly", priority: 0.5 },
    { path: "/status", changeFrequency: "daily", priority: 0.4 },
    { path: "/search", changeFrequency: "monthly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const posts = getAllPosts();
  const postRoutes: Route[] = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: post.pillar ? 0.8 : 0.6,
    lastModified: new Date(post.updated ?? post.date),
  }));

  const categoryRoutes: Route[] = CATEGORIES.map((c) => ({
    path: `/blog/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const tagRoutes: Route[] = getAllTags().map((tag) => ({
    path: `/blog/tag/${tag.slug}`,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  const authorRoutes: Route[] = AUTHORS.map((a) => ({
    path: `/blog/author/${a.id}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  const resourceRoutes: Route[] = RESOURCES.filter((r) => r.status === "live").map((r) => ({
    path: `/resources/${r.category}/${r.slug}`,
    changeFrequency: "monthly",
    priority: r.featured ? 0.7 : 0.5,
    lastModified: new Date(r.addedDate),
  }));

  const resourceCategoryRoutes: Route[] = RESOURCE_CATEGORIES.map((c) => ({
    path: `/resources/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const solutionRoutes: Route[] = INDUSTRIES.map((industry) => ({
    path: `/solutions/${industry.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const comparisonRoutes: Route[] = COMPARISONS.map((c) => ({
    path: `/compare/${c.slug}`,
    changeFrequency: "monthly",
    priority: c.featured ? 0.8 : 0.6,
    lastModified: new Date(c.addedDate),
  }));

  const toolRoutes: Route[] = getToolEntries().map(({ content }) => ({
    path: `/tools/${content.slug}`,
    changeFrequency: "monthly",
    priority: content.featured ? 0.8 : 0.6,
    lastModified: new Date(content.addedDate),
  }));

  const routes = [
    ...staticRoutes,
    ...postRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...authorRoutes,
    ...resourceRoutes,
    ...resourceCategoryRoutes,
    ...solutionRoutes,
    ...comparisonRoutes,
    ...toolRoutes,
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: r.lastModified ?? now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
