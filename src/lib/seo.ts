export const SITE_URL = "https://politesnotebook.lovable.app";
export const SITE_NAME = "Polite Nahid — Notebook";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function pageTitle(title?: string): string {
  return title ? `${title} — Polite Nahid` : SITE_NAME;
}
