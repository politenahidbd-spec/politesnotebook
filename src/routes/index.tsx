import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { getAllEntries, getFeaturedEntry, categoryLabel, formatDate, type Entry } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const entries = getAllEntries();
  const featured = getFeaturedEntry();
  const archive = entries.filter(
    (e) => !(featured && e.category === featured.category && e.slug === featured.slug),
  );

  return (
    <SiteLayout>
      {featured ? <FeaturedStory entry={featured} /> : null}

      <div className="border-t border-rule" />

      <section className="container-editorial py-12 md:py-16">
        <div className="flex items-baseline justify-between mb-8 md:mb-10">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">The archive</h2>
          <Link to="/notebook" className="text-xs text-muted-foreground hover:text-foreground">
            All entries →
          </Link>
        </div>

        {archive.length === 0 ? (
          <p className="text-muted-foreground text-sm">The notebook is empty.</p>
        ) : (
          <ul className="divide-y divide-rule">
            {archive.map((entry) => (
              <ArchiveRow key={`${entry.category}-${entry.slug}`} entry={entry} />
            ))}
          </ul>
        )}
      </section>
    </SiteLayout>
  );
}

function FeaturedStory({ entry }: { entry: Entry }) {
  return (
    <section className="container-editorial pt-10 md:pt-14 pb-12 md:pb-16">
      <div className="grid gap-8 md:gap-12 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7 lg:col-span-8">
          <Link
            to="/entry/$category/$slug"
            params={{ category: entry.category, slug: entry.slug }}
            className="block group"
          >
            {entry.cover ? (
              <img
                src={entry.cover}
                alt={entry.title}
                loading="eager"
                decoding="async"
                className="block w-full h-auto max-h-[78vh] object-contain bg-muted transition-opacity duration-500 group-hover:opacity-95"
              />
            ) : (
              <div className="aspect-[4/3] bg-muted" />
            )}
          </Link>
        </div>

        <div className="md:col-span-5 lg:col-span-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Featured</p>
          <h1 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium tracking-tightest leading-[1.15]">
            <Link
              to="/entry/$category/$slug"
              params={{ category: entry.category, slug: entry.slug }}
              className="hover:underline underline-offset-4 decoration-1"
            >
              {entry.title}
            </Link>
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            <span aria-hidden>·</span>
            <span>{categoryLabel(entry.category)}</span>
          </div>
          {entry.excerpt ? (
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">{entry.excerpt}</p>
          ) : null}
          <div className="mt-8">
            <Link
              to="/entry/$category/$slug"
              params={{ category: entry.category, slug: entry.slug }}
              className="inline-block text-sm underline underline-offset-4 decoration-1 hover:decoration-foreground"
            >
              Read story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchiveRow({ entry }: { entry: Entry }) {
  return (
    <li>
      <Link
        to="/entry/$category/$slug"
        params={{ category: entry.category, slug: entry.slug }}
        className="group grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)_auto] gap-4 md:gap-6 items-center py-5 md:py-6"
      >
        <div className="w-16 h-16 md:w-24 md:h-20 bg-muted overflow-hidden shrink-0">
          {entry.cover ? (
            <img
              src={entry.cover}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            />
          ) : null}
        </div>
        <div className="min-w-0">
          <h3 className="text-base md:text-lg font-medium tracking-tighter leading-snug truncate">
            {entry.title}
          </h3>
          {entry.excerpt ? (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{entry.excerpt}</p>
          ) : null}
          <div className="mt-1 md:hidden text-xs text-muted-foreground">
            <time dateTime={entry.date}>{formatDate(entry.date)}</time>
            <span aria-hidden> · </span>
            <span>{categoryLabel(entry.category)}</span>
          </div>
        </div>
        <div className="hidden md:block text-xs text-muted-foreground text-right shrink-0">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          <div className="mt-1">{categoryLabel(entry.category)}</div>
        </div>
      </Link>
    </li>
  );
}
