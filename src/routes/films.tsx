import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getEntriesByCategory, formatDate } from "@/lib/content";

export const Route = createFileRoute("/films")({
  component: Films,
  head: () => ({
    meta: [
      { title: "Films — Polite Nahid" },
      { name: "description", content: "Short films, documentary sketches and moving-image work by Polite Nahid — each piece documented with notes on how and why it was made." },
      { property: "og:title", content: "Films — Polite Nahid" },
      { property: "og:description", content: "Short films and documentary sketches, each shown alongside production notes and stills." },
      { property: "og:url", content: "/films" },
    ],
    links: [{ rel: "canonical", href: "/films" }],
  }),
});

function Films() {
  const items = getEntriesByCategory("films");
  return (
    <SiteLayout>
      <section className="container-editorial pt-16 pb-8">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Films</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest max-w-2xl">Documented works.</h1>
      </section>

      <div className="border-t border-rule" />

      <section className="container-editorial py-12 md:py-16 grid gap-16 md:grid-cols-2">
        {items.map((f) => (
          <article key={f.slug}>
            <Link to="/entry/$category/$slug" params={{ category: "films", slug: f.slug }} className="group block">
              {f.cover ? (
                <div className="mb-5 overflow-hidden bg-muted aspect-video">
                  <img src={f.cover} alt="" loading="lazy" width={1600} height={900} className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90" />
                </div>
              ) : null}
              <div className="flex items-baseline gap-4 text-xs text-muted-foreground">
                {f.year ? <span>{f.year}</span> : <time>{formatDate(f.date)}</time>}
                {f.duration ? <><span aria-hidden>·</span><span>{f.duration}</span></> : null}
              </div>
              <h2 className="mt-2 text-xl md:text-2xl font-medium tracking-tighter">{f.title}</h2>
              {f.excerpt ? <p className="mt-2 text-muted-foreground leading-relaxed">{f.excerpt}</p> : null}
            </Link>
          </article>
        ))}
        {items.length === 0 ? <p className="text-muted-foreground">No films yet.</p> : null}
      </section>
    </SiteLayout>
  );
}
