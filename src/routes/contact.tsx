import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Polite Nahid" },
      { name: "description", content: "Get in touch with Polite Nahid." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const links = [
  { label: "Email", href: "mailto:hello@politenahid.com", display: "hello@politenahid.com" },
  { label: "Instagram", href: "https://instagram.com/politenahid", display: "@politenahid" },
  { label: "LinkedIn", href: "https://linkedin.com/in/politenahid", display: "in/politenahid" },
  { label: "GitHub", href: "https://github.com/politenahid", display: "@politenahid" },
];

function Contact() {
  return (
    <SiteLayout>
      <section className="container-reading pt-16 md:pt-24 pb-24">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tightest">Say hello.</h1>

        <ul className="mt-12 divide-y divide-rule">
          {links.map((l) => (
            <li key={l.label} className="py-5 flex items-baseline justify-between gap-6">
              <span className="text-sm text-muted-foreground w-24">{l.label}</span>
              <a
                href={l.href}
                className="flex-1 text-right md:text-left md:flex-none underline underline-offset-4 decoration-rule hover:decoration-foreground transition-colors"
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {l.display}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
