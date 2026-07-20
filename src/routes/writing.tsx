import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getEntriesByCategory, formatDate } from "@/lib/content";

export const Route = createFileRoute("/writing")({
  component: Writing,
  head: () => ({
    meta: [
      { title: "Writing — Polite Nahid" },
      { name: "description", content: "Essays and short pieces, meant to be read slowly." },
    ],
    links: [{ rel: "canonical", href: "/writing" }],
  }),
});

function Writing() {
  const items = getEntriesByCategory("writing");
  return (
    <SiteLayout>
      <section className="container-reading pt-16 pb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Writing</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest">Essays, meant to be read slowly.</h1>
      </section>

      <div className="border-t border-rule mt-8" />

      <section className="container-reading py-12">
        <ul className="divide-y divide-rule">
          {items.map((p) => (
            <li key={p.slug} className="py-10">
              <Link to="/entry/$category/$slug" params={{ category: "writing", slug: p.slug }} className="group block">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{p.readingTime} min read</span>
                </div>
                <h2 className="mt-2 text-2xl font-medium tracking-tighter group-hover:underline underline-offset-4">
                  {p.title}
                </h2>
                {p.excerpt ? <p className="mt-3 text-muted-foreground leading-relaxed">{p.excerpt}</p> : null}
              </Link>
            </li>
          ))}
        </ul>
        {items.length === 0 ? <p className="text-muted-foreground">No writing yet.</p> : null}
      </section>
    </SiteLayout>
  );
}
