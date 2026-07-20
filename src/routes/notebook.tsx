import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site-layout";
import { EntryCard } from "@/components/entry-card";
import { getAllEntries, type Category } from "@/lib/content";

export const Route = createFileRoute("/notebook")({
  component: Notebook,
  head: () => ({
    meta: [
      { title: "Notebook — Polite Nahid" },
      { name: "description", content: "Every entry, in chronological order." },
    ],
    links: [{ rel: "canonical", href: "/notebook" }],
  }),
});

const filters: Array<{ key: Category | "all"; label: string }> = [
  { key: "all", label: "All" },
  { key: "photography", label: "Photography" },
  { key: "writing", label: "Writing" },
  { key: "films", label: "Films" },
  { key: "notes", label: "Notes" },
];

function Notebook() {
  const all = getAllEntries();
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((e) => {
      if (filter !== "all" && e.category !== filter) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        (e.excerpt ?? "").toLowerCase().includes(q) ||
        (e.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [all, filter, query]);

  return (
    <SiteLayout>
      <section className="container-editorial pt-16 pb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Notebook</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest">Everything, in order.</h1>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {filters.map((f) => (
              <li key={f.key}>
                <button
                  onClick={() => setFilter(f.key)}
                  className={
                    "transition-colors " +
                    (filter === f.key ? "text-foreground underline underline-offset-4" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
          <label className="relative md:w-72">
            <span className="sr-only">Search entries</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full border-b border-rule bg-transparent py-2 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
          </label>
        </div>
      </section>

      <div className="border-t border-rule" />

      <section className="container-editorial py-12 md:py-16">
        {shown.length === 0 ? (
          <p className="text-muted-foreground">Nothing here yet.</p>
        ) : (
          <div className="grid gap-14 md:gap-20 md:grid-cols-2">
            {shown.map((entry) => (
              <EntryCard key={`${entry.category}-${entry.slug}`} entry={entry} />
            ))}
          </div>
        )}
        <p className="mt-16 text-sm text-muted-foreground">
          <Link to="/" className="underline underline-offset-4">Back to the notebook home</Link>
        </p>
      </section>
    </SiteLayout>
  );
}
