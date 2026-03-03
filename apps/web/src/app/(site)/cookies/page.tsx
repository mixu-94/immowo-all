import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Cookie-Richtlinien der Immowo Ventures GmbH: Informationen zum Einsatz von Cookies und \u00e4hnlichen Technologien.",
  openGraph: {
    title: "Cookie-Richtlinien | Immowo Ventures",
    description: "Informationen zum Einsatz von Cookies bei Immowo Ventures.",
  },
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" lastUpdated="23.02.2026">
      <div className="not-prose space-y-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
            Kurz erklärt
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Wir verwenden aktuell{" "}
            <span className="font-semibold text-white">keine</span> Cookies für
            Analyse- oder Marketingzwecke (kein Tracking, keine personalisierte
            Werbung).
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Technisch kann es sein, dass für grundlegende Funktionen der Website
            (z. B. Sicherheit, Sitzungsverwaltung oder Darstellung){" "}
            <span className="font-semibold text-white">notwendige</span> Cookies
            oder vergleichbare Speichertechnologien eingesetzt werden.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
            Browser-Einstellungen
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Sie können Cookies über die Einstellungen Ihres Browsers löschen
            oder blockieren. Bitte beachten Sie, dass dann ggf. nicht alle
            Funktionen der Website verfügbar sind.
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/60">
            Kontakt
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            Immowo Ventures GmbH
            <br />
            Dossenbergerstraße 5, 89312 Günzburg, Deutschland
            <br />
            E-Mail:{" "}
            <span className="font-semibold text-white">[E-Mail ergänzen]</span>
            <br />
            Telefon:{" "}
            <span className="font-semibold text-white">[Telefon ergänzen]</span>
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
