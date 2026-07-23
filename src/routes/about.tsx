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

        <p>
          Nothing here is finished. Neither am I. I'm Polite Nahid.
<br>
Most weekdays, you'll find me working full-time as a Video Journalist. In between deadlines, I somehow manage to stay enrolled in a Journalism and Media Studies program. Whatever time survives after those two, I spend on whatever feels worth doing that day.
<br>
Sometimes that means carrying a camera.
Sometimes reading a novel I should've finished weeks ago.
Sometimes watching a film just to admire a single scene.
And sometimes... absolutely nothing useful.
<br>
On days off, if work doesn't find me first, I might walk 10 or 15 kilometers with no destination in mind. Other days, I'll end up at Chandrima Udyan, lying beside the lake, watching crows argue in the trees as if they have somewhere far more important to be than the rest of us. They probably don't. Neither do I.
<br>
I'm interested in stories that don't announce themselves. The quiet ones. The ordinary ones. The people who rarely become headlines, yet somehow carry the weight of entire cities.
Photography taught me to notice. Journalism taught me to ask. Cinema taught me that silence can sometimes say more than dialogue ever could. I'm still trying to learn how to combine all three without getting in their way.
<br>
This website isn't a portfolio pretending everything here is my best work. It's closer to a notebook. A place where photographs, writing, ideas, and unfinished thoughts end up before I completely figure them out. Some pieces will feel polished. Others will probably remain beautifully incomplete.
<br>
I'm still learning, still changing my mind, still chasing stories, and still convinced that taking "just one more photo" is a perfectly reasonable decision.
If you made it this far, thanks for spending a few minutes in my little corner of the internet.
        </p>
      </article>
    </SiteLayout>
  );
}
