import Link from "next/link";

export function ReferencesHeader() {
  return (
    <section className="mb-10 md:mb-12">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.28)] bg-[rgba(214,181,109,0.07)] px-3 py-1 text-xs text-[color:var(--color-accent)] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_0_3px_rgba(214,181,109,0.18)]" />
        Referenzen · Neubau · Sanierung · Projektentwicklung · Verkauf
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
        <div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-5xl">
            Immobilien, die{" "}
            <span className="text-[color:var(--color-text-muted)]">
              nicht nur gut aussehen –
            </span>{" "}
            <span className="bg-[linear-gradient(90deg,var(--color-accent),rgba(230,205,143,1))] bg-clip-text text-transparent">
              sondern geliefert werden.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
            Eine Auswahl abgeschlossener Projekte: schlüsselfertige Immobilien,
            Sanierungen sowie Entwicklungen „vom Papier weg" – mit Fokus auf
            Qualität, Zeitplan und Klarheit in der Abwicklung.
          </p>
        </div>

        <div className="flex items-center gap-3 md:justify-end">
          <Link
            href="/kontakt"
            className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(214,181,109,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)] hover:shadow-[0_12px_32px_rgba(214,181,109,0.38)] active:translate-y-0 active:shadow-none"
          >
            Beratung anfragen
          </Link>
          <Link
            href="/immobilien"
            className="rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-5 py-3 text-sm font-medium text-[color:var(--color-text-muted)] backdrop-blur transition hover:border-[rgba(214,181,109,0.30)] hover:text-[color:var(--color-text)]"
          >
            Aktuelle Angebote
          </Link>
        </div>
      </div>

      {/* Gold divider */}
      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.35)] to-transparent" />
    </section>
  );
}
