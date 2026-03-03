import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";
import { fetchWiderruf } from "@/lib/cms/legalPages";
import { RichTextRenderer } from "@/components/legal/RichTextRenderer";

export const metadata: Metadata = {
  title: "Widerrufsrecht",
  description:
    "Widerrufsbelehrung und Muster-Widerrufsformular der Immowo Ventures GmbH gem\u00e4\u00df \u00a7 312g BGB.",
  openGraph: {
    title: "Widerrufsrecht | Immowo Ventures",
    description: "Widerrufsbelehrung der Immowo Ventures GmbH.",
  },
  robots: { index: false, follow: false },
};

export default async function WiderrufPage() {
  const data = await fetchWiderruf();

  return (
    <LegalPage title="Widerrufsbelehrung" lastUpdated="23.02.2026">
      {data.content ? (
        <RichTextRenderer content={data.content} />
      ) : (
        <p className="text-[color:var(--color-text-muted)]">
          Die Widerrufsbelehrung wird gerade aktualisiert. Bitte kommen Sie sp\u00e4ter zur\u00fcck.
        </p>
      )}
    </LegalPage>
  );
}
