import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { EntryCard } from "@/components/entry-card";
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
      <section className="container-editorial pt-16 md:pt-24 pb-10 md:pb-14">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">The notebook</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest leading-[1.1] max-w-3xl">
          Things I noticed.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
          Photographs, writings, films and notes. By{" "}
          <Link
            to="/about"
            className="font-semibold text-foreground underline underline-offset-4 decoration-1 hover:decoration-foreground"
          >
            Polite Nahid
          </Link>
          .
        </p>
      </section>

      <div className="border-t border-rule" />

      {featured ? <FeaturedStory entry={featured} /> : null}

      <div className="border-t border-rule" />

      <section className="container-editorial py-12 md:py-16">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-8 md:mb-10">
          The notebook
        </h2>

        {archive.length === 0 ? (
          <p className="text-muted-foreground text-sm">The notebook is empty.</p>
        ) : (
          <div className="grid gap-12 md:gap-16 md:grid-cols-2">
            {archive.map((entry) => (
              <EntryCard key={`${entry.category}-${entry.slug}`} entry={entry} />
            ))}
          </div>
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

