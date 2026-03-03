import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Immowo Ventures GmbH gem\u00e4\u00df \u00a7 5 TMG. Angaben zum Unternehmen, Gesch\u00e4ftsf\u00fchrer und Kontakt.",
  openGraph: {
    title: "Impressum | Immowo Ventures",
    description: "Rechtliche Angaben gem\u00e4\u00df \u00a7 5 TMG.",
  },
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum" lastUpdated="23.02.2026">
      {/* Intro / Firmendaten */}
      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Angaben gemäß § 5 TMG
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Adresse */}
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <p className="text-base font-semibold text-white">
                Immowo Ventures GmbH
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Dossenbergerstraße 5
                <br />
                89312 Günzburg
                <br />
                Deutschland
              </p>
            </div>

            {/* Quick Facts */}
            <div className="rounded-xl border border-white/10 bg-black/20 p-5">
              <dl className="space-y-3 text-sm">
                <div className="grid grid-cols-[140px_1fr] gap-3">
                  <dt className="text-white/60">Geschäftsführer</dt>
                  <dd className="font-medium text-white">Johannes Wopfner</dd>
                </div>

                <div className="grid grid-cols-[140px_1fr] gap-3">
                  <dt className="text-white/60">Inhaltlich verantwortlich</dt>
                  <dd className="text-white/80">
                    Johannes Wopfner{" "}
                    <span className="text-white/50">(Anschrift wie oben)</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Kontakt
          </h2>

          <dl className="space-y-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-3">
              <dt className="text-white/60">Telefon</dt>
              <dd className="font-medium text-white">
                [Telefonnummer ergänzen]
              </dd>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-3">
              <dt className="text-white/60">E-Mail</dt>
              <dd className="font-medium text-white">
                [E-Mail-Adresse ergänzen]
              </dd>
            </div>
          </dl>
        </div>

        {/* Register */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Registereintrag
          </h2>

          <dl className="space-y-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-3">
              <dt className="text-white/60">Handelsregister</dt>
              <dd className="font-medium text-white">
                [Registergericht ergänzen]
              </dd>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-3">
              <dt className="text-white/60">Registernummer</dt>
              <dd className="font-medium text-white">[HRB-Nummer ergänzen]</dd>
            </div>
          </dl>
        </div>

        {/* USt */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Umsatzsteuer
          </h2>

          <dl className="text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-3">
              <dt className="text-white/60">USt-IdNr.</dt>
              <dd className="font-medium text-white">
                [USt-IdNr. ergänzen, falls vorhanden]
              </dd>
            </div>
          </dl>
        </div>

        {/* Aufsicht */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Aufsichtsbehörde / Erlaubnis
            <span className="ml-2 text-xs font-normal text-white/40">
              (nur falls einschlägig)
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Falls Tätigkeiten nach § 34c GewO ausgeübt werden (z. B.
            Immobilienmakler), sind hier Erlaubnisdaten und zuständige
            Aufsichtsbehörde anzugeben.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white">
            [Angaben ergänzen, falls relevant]
          </div>
        </div>

        {/* Streitbeilegung */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white/60">
            Verbraucherstreitbeilegung
          </h2>

          <p className="text-sm leading-relaxed text-white/80">
            Wir sind nicht verpflichtet und nicht bereit, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.{" "}
            <span className="text-white/60">[Bei Bedarf anpassen]</span>
          </p>
        </div>
      </section>
    </LegalPage>
  );
}
