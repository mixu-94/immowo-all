"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
          Fehler
        </p>

        <h1 className="text-3xl font-semibold text-[color:var(--color-text)]">
          Etwas ist schiefgelaufen
        </h1>

        <p className="leading-relaxed text-[color:var(--color-text-muted)]">
          Die Seite konnte nicht geladen werden. Bitte versuchen Sie es erneut
          oder kehren Sie zur Startseite zur&uuml;ck.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-xl bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-accent-hover)]"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="rounded-xl border border-[color:var(--color-border-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-2)]"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
