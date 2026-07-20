import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";
import { EntryCard } from "@/components/entry-card";
import { getAllEntries } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const entries = getAllEntries();
  const [featured, ...rest] = entries;

  return (
    <SiteLayout>
      <section className="container-editorial pt-16 md:pt-24 pb-12">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">The notebook</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-medium tracking-tightest leading-[1.05] max-w-3xl">
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
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/photography" className="hover:text-foreground">Photography</Link>
          <span aria-hidden>·</span>
          <Link to="/writing" className="hover:text-foreground">Writing</Link>
          <span aria-hidden>·</span>
          <Link to="/films" className="hover:text-foreground">Films</Link>
          <span aria-hidden>·</span>
          <Link to="/notes" className="hover:text-foreground">Notes</Link>
        </div>
      </section>

      <div className="border-t border-rule" />

      <section className="container-editorial py-12 md:py-16">
        {featured ? (
          <div className="mb-16 md:mb-24">
            <EntryCard entry={featured} priority />
          </div>
        ) : null}

        <div className="grid gap-14 md:gap-20 md:grid-cols-2">
          {rest.map((entry) => (
            <EntryCard key={`${entry.category}-${entry.slug}`} entry={entry} />
          ))}
        </div>

        {entries.length === 0 ? (
          <p className="text-muted-foreground">The notebook is empty. Add your first entry in <a className="underline" href="/admin/">the admin</a>.</p>
        ) : null}
      </section>
    </SiteLayout>
  );
}
