import type { Metadata } from "next";
import "@/styles/globals.css";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieBanner from "@/components/consent/CookieBanner";
import { Navbar } from "@/components/base/nav/Navbar";
import Footer from "@/components/base/footer/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://immowo-ventures.de";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Immowo Ventures",
  description:
    "Schl\u00fcsselfertige Immobilien, Bestandsobjekte und Bautr\u00e4gerprojekte (Kauf ab Plan). Expos\u00e9 & Unterlagen auf Anfrage.",
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dossenbergerstra\u00dfe 5",
    addressLocality: "G\u00fcnzburg",
    postalCode: "89312",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Bayern, Deutschland",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Immowo Ventures | Immobilien kaufen \u2013 schl\u00fcsselfertig, Bestand & Neubauprojekt (Kauf ab Plan)",
    template: "%s | Immowo Ventures",
  },

  description:
    "Immowo Ventures: Schl\u00fcsselfertige Immobilien, ausgew\u00e4hlte Bestandsobjekte und Bautr\u00e4ger-/Neubauprojekte (Kauf ab Plan). Expos\u00e9 & Unterlagen auf Anfrage, pers\u00f6nliche Beratung und transparente Abwicklung.",

  applicationName: "Immowo Ventures",
  category: "Real Estate",

  keywords: [
    "Immobilien kaufen",
    "schl\u00fcsselfertig",
    "Bestandsimmobilie",
    "Bautr\u00e4gerprojekt",
    "Neubauprojekt",
    "Kauf ab Plan",
    "Expos\u00e9 anfordern",
    "Immobilienangebote",
    "Immobilien Beratung",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "Immowo Ventures",
    title:
      "Immowo Ventures | Immobilien kaufen \u2013 schl\u00fcsselfertig, Bestand & Neubauprojekt (Kauf ab Plan)",
    description:
      "Schl\u00fcsselfertige Immobilien, Bestandsobjekte und Bautr\u00e4ger-/Neubauprojekte (Kauf ab Plan). Expos\u00e9 & Unterlagen auf Anfrage.",
    url: siteUrl,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Immowo Ventures \u2013 Immobilien & Bautr\u00e4gerprojekte",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Immowo Ventures | Immobilien \u2013 schl\u00fcsselfertig & Kauf ab Plan",
    description:
      "Expos\u00e9 & Unterlagen auf Anfrage \u2022 Beratung \u2022 transparente Abwicklung",
    images: ["/og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="">
      <ConsentProvider>
        <CookieBanner />
        <Navbar />
        <body className="antialiased mt-14 bg-[#050B1A]">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </body>
        <Footer />
      </ConsentProvider>
    </html>
  );
}
