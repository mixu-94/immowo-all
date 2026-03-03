// app/unternehmen/page.tsx
import type { Metadata } from "next";
import CompanyPage from "@/components/unternehmen/CompanyPage";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Immowo Ventures \u2013 Ihr Partner f\u00fcr schl\u00fcsselfertige Immobilien, Bautr\u00e4gerprojekte und Bestandsobjekte. Pers\u00f6nliche Beratung & transparente Abwicklung.",
  openGraph: {
    title: "Unternehmen | Immowo Ventures",
    description:
      "Lernen Sie Immowo Ventures kennen \u2013 Ihr Immobilienmakler f\u00fcr hochwertige Objekte in Bayern und Schwaben.",
  },
};

export default function Page() {
  return <CompanyPage />;
}
