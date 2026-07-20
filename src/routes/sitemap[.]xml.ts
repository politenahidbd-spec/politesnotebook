import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllEntries } from "@/lib/content";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/notebook", "/photography", "/writing", "/films", "/notes", "/about", "/contact"];
        const entries = getAllEntries();

        const urls = [
          ...staticPaths.map((p) => ({ loc: p, changefreq: "weekly", priority: p === "/" ? "1.0" : "0.7" })),
          ...entries.map((e) => ({
            loc: `/entry/${e.category}/${e.slug}`,
            lastmod: e.date || undefined,
            changefreq: "monthly",
            priority: "0.6",
          })),
        ];

        const body = urls
          .map((u) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${u.loc}</loc>`,
              u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : null,
              `    <changefreq>${u.changefreq}</changefreq>`,
              `    <priority>${u.priority}</priority>`,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
