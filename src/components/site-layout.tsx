import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="border-b border-rule">
        <div className="container-editorial py-4 md:py-8 flex items-center justify-between gap-4 md:items-baseline">
          <Link
            to="/"
            className="text-sm tracking-tighter font-medium"
            onClick={() => setOpen(false)}
          >
            Polite Nahid <span className="text-muted-foreground">— Notebook</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
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

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 -mr-2 text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? (
                <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </g>
              ) : (
                <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </g>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav panel */}
        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Primary mobile"
            className="md:hidden border-t border-rule"
          >
            <ul className="container-editorial py-2 flex flex-col divide-y divide-rule">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "text-foreground" }}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      <main className="flex-1 fade-in">{children}</main>

      <footer className="border-t border-rule mt-20 md:mt-24">
        <div className="container-editorial py-8 md:py-10 flex flex-col md:flex-row md:justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Polite Nahid. A notebook, still being written.</p>
        </div>
      </footer>
    </div>
  );
}
