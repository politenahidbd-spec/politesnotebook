import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getAllEntries, getEntry, categoryLabel, formatDate, type Category } from "@/lib/content";

export const Route = createFileRoute("/entry/$category/$slug")({
  loader: ({ params }) => {
    const entry = getEntry(params.category as Category, params.slug);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${loaderData.title} — Polite Nahid` },
        { name: "description", content: loaderData.excerpt ?? loaderData.title },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/entry/${params.category}/${params.slug}` },
        ...(loaderData.cover ? [{ property: "og:image", content: loaderData.cover }, { name: "twitter:image", content: loaderData.cover }] : []),
      ],
      links: [{ rel: "canonical", href: `/entry/${params.category}/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: loaderData.title,
          datePublished: loaderData.date,
          author: { "@type": "Person", name: "Polite Nahid" },
          image: loaderData.cover,
        }),
      }],
    };
  },
  component: EntryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-reading py-24 text-center">
        <h1 className="text-2xl font-medium tracking-tighter">Entry not found</h1>
        <p className="mt-3 text-muted-foreground">This page may have been moved.</p>
      </div>
    </SiteLayout>
  ),
});

function EntryPage() {
  const entry = Route.useLoaderData();
  const all = getAllEntries();
  const idx = all.findIndex((e) => e.category === entry.category && e.slug === entry.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <SiteLayout>
      <article className="pt-12 md:pt-20 pb-20">
        <header className="container-reading">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{categoryLabel(entry.category)}</span>
            <span aria-hidden>·</span>
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            {entry.category === "writing" ? (
              <>
                <span aria-hidden>·</span>
                <span>{entry.readingTime} min read</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-medium tracking-tightest leading-[1.1]">
            {entry.title}
          </h1>
          {entry.excerpt ? (
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{entry.excerpt}</p>
          ) : null}
        </header>

        {entry.cover ? (
          <div className="mt-12 md:mt-16">
            <div className="container-editorial">
              <img src={entry.cover} alt="" width={2000} height={1333} className="w-full h-auto" />
            </div>
          </div>
        ) : null}

        {entry.category === "films" && entry.video ? (
          <div className="container-editorial mt-12">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={entry.video}
                title={entry.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null}

        <div className="container-reading mt-12 md:mt-16 prose-notebook" dangerouslySetInnerHTML={{ __html: entry.html }} />

        {entry.category === "photography" && entry.gallery && entry.gallery.length > 0 ? (
          <div className="container-editorial mt-16 space-y-16">
            {entry.gallery.map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" width={2000} height={1333} className="w-full h-auto" />
            ))}
          </div>
        ) : null}

        <nav className="container-reading mt-24 pt-8 border-t border-rule flex justify-between gap-6 text-sm">
          <div className="flex-1">
            {prev ? (
              <Link to="/entry/$category/$slug" params={{ category: prev.category, slug: prev.slug }} className="group">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">Previous</span>
                <span className="mt-1 block group-hover:underline underline-offset-4">{prev.title}</span>
              </Link>
            ) : null}
          </div>
          <div className="flex-1 text-right">
            {next ? (
              <Link to="/entry/$category/$slug" params={{ category: next.category, slug: next.slug }} className="group">
                <span className="block text-xs uppercase tracking-widest text-muted-foreground">Next</span>
                <span className="mt-1 block group-hover:underline underline-offset-4">{next.title}</span>
              </Link>
            ) : null}
          </div>
        </nav>
      </article>
    </SiteLayout>
  );
}
