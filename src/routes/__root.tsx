import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/site-layout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="container-reading py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-medium tracking-tighter">This page hasn't been written.</h1>
        <p className="mt-3 text-muted-foreground">Perhaps a note that never made it into the notebook.</p>
        <div className="mt-8">
          <Link to="/" className="underline underline-offset-4">Return to the notebook</Link>
        </div>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteLayout>
      <div className="container-reading py-24 text-center">
        <h1 className="text-2xl font-medium tracking-tighter">Something broke, quietly.</h1>
        <p className="mt-3 text-muted-foreground">Try again, or head back to the notebook.</p>
        <div className="mt-8 flex justify-center gap-6 text-sm">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="underline underline-offset-4"
          >
            Try again
          </button>
          <a href="/" className="underline underline-offset-4">Home</a>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Polite Nahid — Notebook" },
      { name: "description", content: "Things I noticed. Photographs, writings, films and notes by Polite Nahid." },
      { name: "author", content: "Polite Nahid" },
      { property: "og:title", content: "Polite Nahid — Notebook" },
      { property: "og:description", content: "Things I noticed. Photographs, writings, films and notes." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Polite Nahid" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://rsms.me" },
      { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
      { rel: "alternate", type: "application/rss+xml", title: "Polite Nahid — Notebook", href: "/rss.xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Polite Nahid",
          jobTitle: "Photographer, writer, filmmaker",
          url: "/",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
