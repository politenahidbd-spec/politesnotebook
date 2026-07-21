import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getEntriesByCategory, formatDate } from "@/lib/content";

export const Route = createFileRoute("/photography")({
  component: Photography,
  head: () => ({
    meta: [
      { title: "Photography — Polite Nahid" },
      { name: "description", content: "Photographic collections and visual stories by Polite Nahid — portraits, street scenes and long-form documentary work, shown in sequence rather than as galleries." },
      { property: "og:title", content: "Photography — Polite Nahid" },
      { property: "og:description", content: "Long-form photographic collections and documentary sequences — portraits, streets and quiet observations." },
      { property: "og:url", content: "/photography" },
    ],
    links: [{ rel: "canonical", href: "/photography" }],
  }),
});

function Photography() {
  const items = getEntriesByCategory("photography");
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 pb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Photography</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest max-w-2xl">Collections and visual stories.</h1>
      </section>

      <div className="border-t border-rule" />

      <section className="container-editorial py-12 md:py-16 space-y-20 md:space-y-28">
        {items.map((c) => (
          <article key={c.slug} className="mx-auto max-w-[1000px]">
            <Link to="/entry/$category/$slug" params={{ category: "photography", slug: c.slug }} className="group block">
              {c.cover ? (
                <div className="mb-6 overflow-hidden bg-muted">
                  <img src={c.cover} alt={c.title} loading="lazy" decoding="async" className="w-full h-auto transition-opacity duration-500 group-hover:opacity-90" />
                </div>
              ) : null}
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {c.year ? <span>{c.year}</span> : <time>{formatDate(c.date)}</time>}
                {c.location ? <><span aria-hidden>·</span><span>{c.location}</span></> : null}
              </div>
              <h2 className="mt-3 text-xl md:text-2xl font-medium tracking-tighter">{c.title}</h2>
              {c.excerpt ? <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">{c.excerpt}</p> : null}
            </Link>
          </article>
        ))}
        {items.length === 0 ? <p className="text-muted-foreground">No collections yet.</p> : null}
      </section>
    </SiteLayout>
  );
}
