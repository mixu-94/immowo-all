"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, BarChart3, Globe, Settings2 } from "lucide-react";
import { useConsent } from "./ConsentProvider";
import CookieSettingsDialog from "./CookieSettingsDialog";

export default function CookieBanner() {
  const { hasDecision, acceptAll, acceptNecessaryOnly } = useConsent();
  const [open, setOpen] = useState(false);

  // render dialog after mount (prevents hydration issues with Radix Portal)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const points = useMemo(
    () => [
      { icon: <ShieldCheck className="h-4 w-4" />, label: "Notwendig" },
      {
        icon: <BarChart3 className="h-4 w-4" />,
        label: "Analytics (optional)",
      },
      {
        icon: <Globe className="h-4 w-4" />,
        label: "Externe Medien (optional)",
      },
    ],
    [],
  );

  if (hasDecision) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 md:px-6 md:pb-6">
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-black/55 shadow-2xl backdrop-blur-xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Left */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                    <Cookie className="h-5 w-5 text-[color:var(--color-text)]" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--color-text)]">
                      Cookies & Datenschutz
                    </p>
                    <p className="text-xs text-[color:var(--color-text-muted)]">
                      Wir nutzen{" "}
                      <span className="font-semibold text-[color:var(--color-text)]">
                        notwendige Cookies
                      </span>{" "}
                      für den Betrieb der Website. Optional können{" "}
                      <span className="font-semibold text-[color:var(--color-text)]">
                        Analytics
                      </span>{" "}
                      (Reichweitenmessung) und{" "}
                      <span className="font-semibold text-[color:var(--color-text)]">
                        externe Medien
                      </span>{" "}
                      (z. B. Google Maps / YouTube) aktiviert werden.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {points.map((p) => (
                    <span
                      key={p.label}
                      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text)]"
                    >
                      <span className="text-[color:var(--color-text-muted)]">{p.icon}</span>
                      {p.label}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-[11px] leading-relaxed text-[color:var(--color-text-muted)]">
                  Du kannst deine Auswahl jederzeit in den{" "}
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="font-semibold text-[color:var(--color-text)] underline underline-offset-4 hover:text-white"
                  >
                    Cookie-Einstellungen
                  </button>{" "}
                  ändern oder widerrufen. Details findest du in unserer{" "}
                  <Link
                    href="/datenschutz"
                    className="font-semibold text-[color:var(--color-text)] underline underline-offset-4 hover:text-white"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </div>
              </div>

              {/* Right */}
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => acceptNecessaryOnly()}
                  className="inline-flex items-center justify-center rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] backdrop-blur transition hover:bg-[color:var(--color-surface-2)]"
                >
                  Nur notwendig
                </button>

                <button
                  type="button"
                  onClick={() => acceptAll()}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Alle akzeptieren
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] backdrop-blur transition hover:bg-[color:var(--color-surface-2)]"
                >
                  <Settings2 className="h-4 w-4" />
                  Einstellungen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mounted ? (
        <CookieSettingsDialog open={open} onOpenChange={setOpen} />
      ) : null}
    </>
  );
}
