import type { Metadata } from "next";
import Home from "@/components/home/Home";

export const metadata: Metadata = {
  title: "Immowo Ventures | Immobilien kaufen \u2013 schl\u00fcsselfertig, Bestand & Neubauprojekt (Kauf ab Plan)",
  description:
    "Immowo Ventures: Schl\u00fcsselfertige Immobilien, ausgew\u00e4hlte Bestandsobjekte und Bautr\u00e4ger-/Neubauprojekte (Kauf ab Plan). Expos\u00e9 & Unterlagen auf Anfrage, pers\u00f6nliche Beratung und transparente Abwicklung.",
  openGraph: {
    type: "website",
    title: "Immowo Ventures | Immobilien kaufen \u2013 schl\u00fcsselfertig & Kauf ab Plan",
    description:
      "Schl\u00fcsselfertige Immobilien, Bestandsobjekte und Bautr\u00e4ger-/Neubauprojekte (Kauf ab Plan). Expos\u00e9 & Unterlagen auf Anfrage.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Immowo Ventures \u2013 Immobilien & Bautr\u00e4gerprojekte",
      },
    ],
  },
};

export default function Page() {
  return (
    <main className="text-[color:var(--color-text)] overflow-x-hidden">
      <Home />
    </main>
  );
}
