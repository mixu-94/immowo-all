import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";
import { fetchAgb } from "@/lib/cms/legalPages";
import { RichTextRenderer } from "@/components/legal/RichTextRenderer";

export const metadata: Metadata = {
  title: "AGB",
  description:
    "Allgemeine Gesch\u00e4ftsbedingungen der Immowo Ventures GmbH f\u00fcr die Nutzung der Website und Online-Dienste.",
  openGraph: {
    title: "AGB | Immowo Ventures",
    description:
      "Allgemeine Gesch\u00e4ftsbedingungen der Immowo Ventures GmbH.",
  },
  robots: { index: false, follow: false },
};

export default async function AGBPage() {
  const data = await fetchAgb();

  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen (AGB)"
      lastUpdated="23.02.2026"
    >
      {data.content ? (
        <RichTextRenderer content={data.content} />
      ) : (
        <p className="text-[color:var(--color-text-muted)]">
          Die AGB werden gerade aktualisiert. Bitte kommen Sie später zurück.
        </p>
      )}
    </LegalPage>
  );
}
