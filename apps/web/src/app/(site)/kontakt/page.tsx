// app/kontakt/page.tsx
import type { Metadata } from "next";
import { ContactPage } from "@/components/kontakt/ContactPage";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie Immowo Ventures \u2013 Expos\u00e9 anfordern, R\u00fcckruf vereinbaren oder eine Frage stellen. Wir antworten schnell und pers\u00f6nlich.",
  openGraph: {
    title: "Kontakt | Immowo Ventures",
    description:
      "Expos\u00e9 anfordern, R\u00fcckruf vereinbaren oder eine Frage stellen. Pers\u00f6nliche Beratung bei Immowo Ventures.",
  },
};

export default function Page() {
  return <ContactPage />;
}
