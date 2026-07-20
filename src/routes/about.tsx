import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Polite Nahid" },
      { name: "description", content: "A personal note from Polite Nahid." },
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
          I'm Polite Nahid. I take photographs, write down what I notice, and sometimes make short films.
          This place isn't a portfolio — it's a notebook I've been keeping in public.
        </p>
        <p>
          I'm curious more than I am certain. Most of what lives here started as a small observation:
          a face on a train, a paragraph I couldn't shake, a colour of light I wanted to remember.
          I try to move slowly, look closely, and leave room for the things I don't yet understand.
        </p>
        <p>
          The tools change — a camera, a pen, a lens, a piece of software — but the intention is
          simple. Pay attention. Make something honest. Come back tomorrow and try again.
        </p>
        <p>
          Thank you for reading. If something here means anything to you, that is more than enough.
        </p>
      </article>
    </SiteLayout>
  );
}
