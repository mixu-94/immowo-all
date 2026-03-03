import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";
import { fetchCookies } from "@/lib/cms/legalPages";
import { RichTextRenderer } from "@/components/legal/RichTextRenderer";

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

export default async function CookiesPage() {
  const data = await fetchCookies();

  return (
    <LegalPage title="Cookie-Richtlinien" lastUpdated="23.02.2026">
      {data.content ? (
        <RichTextRenderer content={data.content} />
      ) : (
        <p className="text-[color:var(--color-text-muted)]">
          Die Cookie-Richtlinien werden gerade aktualisiert. Bitte kommen Sie sp\u00e4ter zur\u00fcck.
        </p>
      )}
    </LegalPage>
  );
}
