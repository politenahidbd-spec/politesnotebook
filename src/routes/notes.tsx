import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getEntriesByCategory, formatDate } from "@/lib/content";

export const Route = createFileRoute("/notes")({
  component: Notes,
  head: () => ({
    meta: [
      { title: "Notes — Polite Nahid" },
      { name: "description", content: "Short observations. Notebook pages." },
    ],
    links: [{ rel: "canonical", href: "/notes" }],
  }),
});

function Notes() {
  const items = getEntriesByCategory("notes");
  return (
    <SiteLayout>
      <section className="container-reading pt-16 pb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Notes</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest">Small things, kept.</h1>
      </section>

      <div className="border-t border-rule mt-8" />

      <section className="container-reading py-12">
        <ul className="divide-y divide-rule">
          {items.map((n) => (
            <li key={n.slug} className="py-8">
              <time className="block text-xs uppercase tracking-widest text-muted-foreground" dateTime={n.date}>
                {formatDate(n.date)}
              </time>
              <h2 className="mt-2 text-lg font-medium tracking-tighter">{n.title}</h2>
              <div className="mt-3 prose-notebook" dangerouslySetInnerHTML={{ __html: n.html }} />
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="text-muted-foreground">No notes yet.</p> : null}
      </section>
    </SiteLayout>
  );
}
