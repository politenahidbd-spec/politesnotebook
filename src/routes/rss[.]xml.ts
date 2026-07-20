import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllEntries } from "@/lib/content";

const BASE_URL = "";
const SITE_TITLE = "Polite Nahid — Notebook";
const SITE_DESCRIPTION = "Things I noticed. Photographs, writings, films and notes.";

function escapeXml(s: string): string {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);
}

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = getAllEntries().slice(0, 50);

        const items = entries
          .map(
            (e) => `  <item>
    <title>${escapeXml(e.title)}</title>
    <link>${BASE_URL}/entry/${e.category}/${e.slug}</link>
    <guid isPermaLink="false">${e.category}/${e.slug}</guid>
    <pubDate>${e.date ? new Date(e.date).toUTCString() : ""}</pubDate>
    <category>${e.category}</category>
    <description>${escapeXml(e.excerpt ?? "")}</description>
  </item>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escapeXml(SITE_TITLE)}</title>
  <link>${BASE_URL}/</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>en</language>
${items}
</channel>
</rss>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
