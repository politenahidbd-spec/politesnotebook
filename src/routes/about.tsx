import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Polite Nahid" },
      { name: "description", content: "A personal note from Polite Nahid — photographer, writer and filmmaker — on why this notebook exists and how it's kept." },
      { property: "og:title", content: "About Polite Nahid" },
      { property: "og:description", content: "Why this public notebook exists — a working record of photographs, writing and short films by Polite Nahid." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  return (
    <SiteLayout>
      <article className="container-reading pt-16 md:pt-24 pb-24 prose-notebook">
        <p className="text-xs uppercase tracking-widest text-muted-foreground not-prose">About</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest">A short note.</h1>

        <section class="about">
  <p><strong>Nothing here is finished. Neither am I. I'm Polite Nahid.</strong></p>

  <p>
    Most weekdays, I'm working full-time as a Video Journalist while trying to
    survive a Journalism and Media Studies degree. Whatever time remains, I
    spend on whatever feels worth doing.
  </p>

  <p>
    Sometimes that's carrying a camera. Sometimes reading a novel I should've
    finished weeks ago. Sometimes watching a film for a single unforgettable
    scene.
  </p>

  <p>
    On days off, if work doesn't find me first, I might walk 10 or 15 kilometers
    with no destination in mind. Other days, I'll end up at Chandrima Udyan,
    lying beside the lake, watching crows argue in the trees as if they have
    somewhere far more important to be. They probably don't. Neither do I.
  </p>

  <p>
    I'm drawn to stories that don't announce themselves. The ordinary people who
    rarely become headlines. Photography taught me to notice. Journalism taught
    me to ask. Cinema taught me that silence can speak louder than dialogue.
    I'm still learning how to bring those three together.
  </p>

  <p>
    This isn't a polished portfolio. It's a notebook. A place for photographs,
    writing, ideas, and unfinished thoughts. Some pieces are finished. Most are
    still becoming.
  </p>

  <p>
    If you've made it this far, thanks for spending a little time in my corner
    of the internet.
  </p>
</section>
      </article>
    </SiteLayout>
  );
}
