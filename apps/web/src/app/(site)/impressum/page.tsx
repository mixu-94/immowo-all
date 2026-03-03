import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";
import { fetchImpressum } from "@/lib/cms/legalPages";
import { RichTextRenderer } from "@/components/legal/RichTextRenderer";

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

// Hilfsfunktion fuer einzelne Info-Zeile
function InfoRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
      <dt className="text-[color:var(--color-text-muted)]">{label}</dt>
      <dd className="font-medium text-[color:var(--color-text)]">{value}</dd>
    </div>
  );
}

// Hilfsfunktion fuer Platzhalter-Zeile (wenn Feld leer ist)
function PlaceholderRow({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
      <dt className="text-[color:var(--color-text-muted)]">{label}</dt>
      <dd className="italic text-[color:var(--color-text-muted)] opacity-50">{placeholder}</dd>
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] p-6 border-t-2"
      style={{ borderTopColor: 'rgba(214,181,109,0.3)' }}
    >
      {children}
    </div>
  );
}

function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-accent)]">
      {children}
    </h2>
  );
}

export default async function ImpressumPage() {
  const data = await fetchImpressum();

  const company = data.company || "Immowo Ventures GmbH";
  const streetAddress = data.streetAddress || "Dossenbergerstra\u00dfe 5";
  const city = data.city || "89312 G\u00fcnzburg";
  const country = data.country || "Deutschland";
  const ceo = data.ceo || "Johannes Wopfner";
  const responsible = data.responsible || ceo;
  const lastUpdated = data.lastUpdated || "23.02.2026";

  return (
    <LegalPage title="Impressum" lastUpdated={lastUpdated}>
      <section className="space-y-6">
        {/* Angaben gemaess § 5 TMG */}
        <InfoCard>
          <CardHeading>Angaben gem\u00e4\u00df \u00a7 5 TMG</CardHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Adresse */}
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
              <p className="text-base font-semibold text-[color:var(--color-text)]">{company}</p>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                {streetAddress}
                <br />
                {city}
                <br />
                {country}
              </p>
            </div>

            {/* Quick Facts */}
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
              <dl className="space-y-3">
                <InfoRow label="Gesch\u00e4ftsf\u00fchrer" value={ceo} />
                <InfoRow label="Inhaltl. verantwortlich" value={responsible} />
              </dl>
            </div>
          </div>
        </InfoCard>

        {/* Kontakt */}
        <InfoCard>
          <CardHeading>Kontakt</CardHeading>
          <dl className="space-y-3">
            {data.phone ? (
              <InfoRow label="Telefon" value={data.phone} />
            ) : (
              <PlaceholderRow label="Telefon" placeholder="Bitte im CMS erg\u00e4nzen" />
            )}
            {data.email ? (
              <InfoRow label="E-Mail" value={data.email} />
            ) : (
              <PlaceholderRow label="E-Mail" placeholder="Bitte im CMS erg\u00e4nzen" />
            )}
          </dl>
        </InfoCard>

        {/* Registereintrag */}
        <InfoCard>
          <CardHeading>Registereintrag</CardHeading>
          <dl className="space-y-3">
            {data.registergericht ? (
              <InfoRow label="Handelsregister" value={data.registergericht} />
            ) : (
              <PlaceholderRow label="Handelsregister" placeholder="Registergericht bitte im CMS erg\u00e4nzen" />
            )}
            {data.hrb ? (
              <InfoRow label="Registernummer" value={data.hrb} />
            ) : (
              <PlaceholderRow label="Registernummer" placeholder="HRB-Nummer bitte im CMS erg\u00e4nzen" />
            )}
          </dl>
        </InfoCard>

        {/* Umsatzsteuer */}
        <InfoCard>
          <CardHeading>Umsatzsteuer</CardHeading>
          <dl>
            {data.ustId ? (
              <InfoRow label="USt-IdNr." value={data.ustId} />
            ) : (
              <PlaceholderRow
                label="USt-IdNr."
                placeholder="USt-IdNr. bitte im CMS erg\u00e4nzen (falls vorhanden)"
              />
            )}
          </dl>
        </InfoCard>

        {/* § 34c GewO Erlaubnis */}
        <InfoCard>
          <CardHeading>
            Aufsichtsbeh\u00f6rde / Erlaubnis
            <span className="ml-2 text-xs font-normal text-white/40">(\u00a7 34c GewO)</span>
          </CardHeading>
          {data.gewo34cText ? (
            <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">{data.gewo34cText}</p>
          ) : (
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-sm italic text-[color:var(--color-text-muted)] opacity-50">
              Angaben zur Erlaubnis nach \u00a7 34c GewO bitte im CMS erg\u00e4nzen.
            </div>
          )}
        </InfoCard>

        {/* Streitbeilegung */}
        <InfoCard>
          <CardHeading>Verbraucherschlichtung</CardHeading>
          {data.streitbeilegung ? (
            <div className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              <RichTextRenderer content={data.streitbeilegung} />
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          )}
        </InfoCard>
      </section>
    </LegalPage>
  );
}
