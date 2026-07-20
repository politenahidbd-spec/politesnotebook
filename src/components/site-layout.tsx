import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Notebook" },
  { to: "/photography", label: "Photography" },
  { to: "/writing", label: "Writing" },
  { to: "/films", label: "Films" },
  { to: "/notes", label: "Notes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="border-b border-rule">
        <div className="container-editorial py-6 md:py-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <Link to="/" className="text-sm tracking-tighter font-medium">
            Polite Nahid <span className="text-muted-foreground">— Notebook</span>
          </Link>
          <nav aria-label="Primary">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "text-foreground" }}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 fade-in">{children}</main>

      <footer className="border-t border-rule mt-24">
        <div className="container-editorial py-10 flex flex-col md:flex-row md:justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Polite Nahid. A notebook, still being written.</p>
          <p>
            <a href="/rss.xml" className="hover:text-foreground">RSS</a>
            <span className="mx-2">·</span>
            <a href="/admin/" className="hover:text-foreground">Admin</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
