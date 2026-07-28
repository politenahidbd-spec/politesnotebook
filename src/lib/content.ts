import { marked } from "marked";

export type Category = "photography" | "writing" | "films" | "notes";

export interface Entry {
  slug: string;
  category: Category;
  title: string;
  date: string;
  excerpt?: string;
  cover?: string;
  tags?: string[];
  year?: string;
  location?: string;
  duration?: string;
  video?: string;
  gallery?: string[];
  draft?: boolean;
  featured?: boolean;
  body: string;
  html: string;
  readingTime: number;
}

// Load every markdown file bundled under src/content
const raw = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(
  src: string,
): { data: Record<string, unknown>; body: string } {
  const match =
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src);

  if (!match) return { data: {}, body: src };

  const [, fm, body] = match;
  const data: Record<string, unknown> = {};
  const lines = fm.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }

    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);

    if (!kv) {
      i++;
      continue;
    }

    const key = kv[1];
    let value: string = kv[2].trim();

    if (value === "" && lines[i + 1]?.trim().startsWith("- ")) {
      const arr: string[] = [];
      i++;

      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        arr.push(
          lines[i]
            .trim()
            .slice(2)
            .replace(/^["']|["']$/g, ""),
        );
        i++;
      }

      data[key] = arr;
      continue;
    }

    // Supports multiline text created by Pages CMS.
    const continuedLines: string[] = [];

    while (
      i + 1 < lines.length &&
      /^[ \t]+/.test(lines[i + 1]) &&
      !lines[i + 1].trim().startsWith("- ")
    ) {
      continuedLines.push(lines[++i].trim());
    }

    if (continuedLines.length > 0) {
      value = [value, ...continuedLines].join(" ");
    }

    if (/^\[.*\]$/.test(value)) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else {
      data[key] = value.replace(/^["']|["']$/g, "");
    }

    i++;
  }

  return { data, body };
}

function readingTimeFrom(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

const entries: Entry[] = Object.entries(raw)
  .map(([path, src]) => {
    const { data, body } = parseFrontmatter(src);
    const parts = path.split("/");
    const filename = parts[parts.length - 1].replace(/\.md$/, "");
    const category = parts[parts.length - 2] as Category;
    const slug = (data.slug as string) || filename;

    return {
      slug,
      category,
      title: (data.title as string) || slug,
      date: (data.date as string) || "",
      excerpt: data.excerpt as string | undefined,
      cover: data.cover as string | undefined,
      tags: (data.tags as string[]) || [],
      year: data.year as string | undefined,
      location: data.location as string | undefined,
      duration: data.duration as string | undefined,
      video: data.video as string | undefined,
      gallery: data.gallery as string[] | undefined,
      draft: Boolean(data.draft),
      featured: Boolean(data.featured),
      body,
      html: marked.parse(body, { async: false }) as string,
      readingTime: readingTimeFrom(body),
    } satisfies Entry;
  })
  .filter((e) => !e.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllEntries(): Entry[] {
  return entries;
}

export function getFeaturedEntry(): Entry | undefined {
  const eligible = entries.filter((e) => e.category !== "notes");
  const marked = eligible.filter((e) => e.featured);

  if (marked.length > 0) return marked[0];

  return eligible[0];
}

export function getEntriesByCategory(cat: Category): Entry[] {
  return entries.filter((e) => e.category === cat);
}

export function getEntry(category: Category, slug: string): Entry | undefined {
  return entries.find(
    (e) => e.category === category && e.slug === slug,
  );
}

export function getEntryBySlug(slug: string): Entry | undefined {
  return entries.find((e) => e.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";

  const d = new Date(iso);

  if (isNaN(d.getTime())) return iso;

  return d.toLocaleDateString("en-US
