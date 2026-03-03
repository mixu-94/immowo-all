import Link from "next/link";
import { fetchSiteSettings } from "@/lib/cms/siteSettings";

const legalLinks = [
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerrufsrecht" },
  { href: "/cookies", label: "Cookie-Richtlinien" },
  { href: "/impressum", label: "Impressum" },
];

const Footer = async () => {
  const settings = await fetchSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative mt-10
        border-t border-[color:var(--color-border)]
        bg-[color:var(--color-bg)]
        text-[color:var(--color-text)]
      "
    >
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Footer headline + text */}
        {(settings.footerHeadline || settings.footerText) && (
          <div className="mb-10 max-w-xl">
            {settings.footerHeadline && (
              <p className="text-lg font-semibold text-[color:var(--color-text)]">
                {settings.footerHeadline}
              </p>
            )}
            {settings.footerText && (
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                {settings.footerText}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left: Legal links */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">
              Rechtliches
            </p>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {legalLinks.map((item, idx, arr) => (
                <div key={item.href} className="flex items-center gap-x-5">
                  <Link
                    href={item.href}
                    className="
                      text-sm font-semibold uppercase tracking-[0.22em]
                      text-[color:var(--color-text)]
                      transition hover:text-white
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60
                      focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]
                    "
                  >
                    <span className="border-b border-transparent pb-1 hover:border-white/60">
                      {item.label}
                    </span>
                  </Link>

                  {idx < arr.length - 1 ? (
                    <span
                      className="h-2 w-2 rounded-full bg-white/30"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              ))}
            </nav>
          </div>

          {/* Right: Social links (from SiteSettings) */}
          {settings.socials.length > 0 && (
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-text-muted)]">
                Social Media
              </p>
              <div className="flex flex-wrap gap-5">
                {settings.socials.map((social) => (
                  <Link
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-text-muted)] transition hover:text-white"
                  >
                    {social.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* bottom row */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
            &copy; {year} {settings.company} &ndash; Alle Rechte vorbehalten
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
