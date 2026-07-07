import { siteConfig } from "@/config/site";
import { CHANGELOG_ENTRIES } from "@/content/changelog/entries";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sorted = [...CHANGELOG_ENTRIES].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = sorted
    .map(
      (entry) => `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${siteConfig.url}/changelog#${entry.slug}</link>
      <guid>${siteConfig.url}/changelog#${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <category>${escapeXml(entry.type)}</category>
      <description>${escapeXml(entry.description)}</description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} Changelog</title>
    <link>${siteConfig.url}/changelog</link>
    <description>Feature releases, fixes, and announcements from ${escapeXml(siteConfig.name)}.</description>
    <language>en-US</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
