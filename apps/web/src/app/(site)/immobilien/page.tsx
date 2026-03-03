import type { Metadata } from "next";
import { ListingsPage } from "@/components/immobilien/ListingsPage";

export const metadata: Metadata = {
  title: "Immobilien",
  description:
    "Entdecken Sie schlüsselfertige Objekte, Bestandsimmobilien und Neubauprojekte (Kauf ab Plan) von Immowo Ventures. Exposé & Unterlagen auf Anfrage.",
  openGraph: {
    title: "Immobilien | Immowo Ventures",
    description:
      "Schlüsselfertige Objekte, Bestandsimmobilien und Bauträgerprojekte. Exposé & Unterlagen auf Anfrage.",
  },
};

export default function Page() {
  return <ListingsPage />;
}
