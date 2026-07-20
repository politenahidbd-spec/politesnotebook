import { Link } from "@tanstack/react-router";
import type { Entry } from "@/lib/content";
import { categoryLabel, formatDate } from "@/lib/content";

export function EntryCard({ entry, priority = false }: { entry: Entry; priority?: boolean }) {
  return (
    <article className="group">
      <Link
        to="/entry/$category/$slug"
        params={{ category: entry.category, slug: entry.slug }}
        className="block"
      >
        {entry.cover ? (
          <div className="mb-5 overflow-hidden bg-muted">
            <img
              src={entry.cover}
              alt=""
              loading={priority ? "eager" : "lazy"}
              width={1600}
              height={1067}
              className="w-full h-auto object-cover transition-opacity duration-500 group-hover:opacity-90"
            />
          </div>
        ) : null}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span>{categoryLabel(entry.category)}</span>
          <span aria-hidden>·</span>
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        </div>
        <h2 className="text-xl md:text-2xl font-medium tracking-tighter leading-snug">
          {entry.title}
        </h2>
        {entry.excerpt ? (
          <p className="mt-2 text-muted-foreground leading-relaxed">{entry.excerpt}</p>
        ) : null}
      </Link>
    </article>
  );
}
