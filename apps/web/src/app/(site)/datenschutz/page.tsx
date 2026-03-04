// src/app/(site)/datenschutz/page.tsx
import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";
import { fetchDatenschutz } from "@/lib/cms/legalPages";
import { RichTextRenderer } from "@/components/legal/RichTextRenderer";

export const metadata: Metadata = {
  title: "Datenschutzerkl\u00e4rung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO sowie zu Cookies, externen Inhalten und Kontaktanfragen.",
  openGraph: {
    title: "Datenschutzerkl\u00e4rung | Immowo Ventures",
    description:
      "Datenschutzerkl\u00e4rung der Immowo Ventures GmbH gem\u00e4\u00df DSGVO.",
  },
  robots: { index: false, follow: false },
};

export default async function DatenschutzPage() {
  const data = await fetchDatenschutz();
  const hasDpo = data.dpo?.name || data.dpo?.email;

  return (
    <LegalPage title="Datenschutzerkl\u00e4rung" lastUpdated="23.02.2026">
      {data.content ? (
        <RichTextRenderer content={data.content} />
      ) : (
        <p className="text-[color:var(--color-text-muted)]">
          Die Datenschutzerklärung wird gerade aktualisiert. Bitte kommen Sie später zurück.
        </p>
      )}

      {hasDpo && (
        <div
          className="mt-8 rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] p-6 border-t-2"
          style={{ borderTopColor: 'rgba(214,181,109,0.3)' }}
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-accent)]">
            Datenschutzbeauftragter
          </h2>
          <dl className="space-y-3 text-sm">
            {data.dpo?.name && (
              <div className="grid grid-cols-[140px_1fr] gap-3">
                <dt className="text-[color:var(--color-text-muted)]">Name</dt>
                <dd className="font-medium text-[color:var(--color-text)]">{data.dpo.name}</dd>
              </div>
            )}
            {data.dpo?.email && (
              <div className="grid grid-cols-[140px_1fr] gap-3">
                <dt className="text-[color:var(--color-text-muted)]">E-Mail</dt>
                <dd className="font-medium text-[color:var(--color-text)]">
                  <a href={`mailto:${data.dpo.email}`} className="text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]">
                    {data.dpo.email}
                  </a>
                </dd>
              </div>
            )}
            {data.dpo?.phone && (
              <div className="grid grid-cols-[140px_1fr] gap-3">
                <dt className="text-[color:var(--color-text-muted)]">Telefon</dt>
                <dd className="font-medium text-[color:var(--color-text)]">{data.dpo.phone}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </LegalPage>
  );
}
