// src/components/Header.tsx
import type { HomeHeaderContent } from "@/lib/cms/home";
import Link from "next/link";

type Props = {
  content?: HomeHeaderContent;
};

/** Fallback oben – wird genutzt, wenn CMS noch leer ist */
const HEADER_FALLBACK: HomeHeaderContent = {
  badge: "BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG",
  headline: { before: "Immobilien, die", highlight: "überzeugen", after: "." },
  subline: {
    text: "Schlüsselfertige Objekte und Neubauprojekte",
    highlight: "Kauf ab Plan",
  },
  trustPills: [
    "Transparenter Prozess",
    "Saubere Unterlagen",
    "Qualität bis zur Übergabe",
  ],
  scrollHint: "Scrollen, um mehr zu entdecken",
  video: { src: "/assets/videos/beach.mp4", type: "video/mp4" },
};

export default function Header({ content }: Props) {
  const c = content ?? HEADER_FALLBACK;

  return (
    <header className="relative w-full  overflow-hidden">
      {/* Height / spacing tuned for your “premium hero” */}
      <div className="relative h-[72vh] min-h-[680px] ">
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src={c.video.src} type={c.video.type} />
        </video>

        {/* Luxury overlays: deep navy + gold vignette */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55),rgba(0,0,0,0.28),rgba(0,0,0,0.62))]" />

        {/* Brand glow (Champagne Gold) based on your token palette */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute -top-56 left-1/2 h-[760px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.18),transparent_62%)] blur-3xl" />
          <div className="absolute -bottom-72 left-[-220px] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_62%)] blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center justify-center px-6 text-center">
          <div className="max-w-3xl flex-row justify-center items-center">
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2 rounded-full
                border border-[rgba(255,255,255,0.14)]
                bg-[rgba(255,255,255,0.06)]
                px-4 py-2 text-[11px] font-semibold tracking-[0.18em]
                text-[rgba(255,255,255,0.88)]
                backdrop-blur
              "
            >
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(214,181,109,0.14)]" />
              {c.badge}
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {c.headline.before}{" "}
              <span
                className="
                  bg-clip-text text-transparent
                  bg-[linear-gradient(90deg,var(--color-accent),rgba(230,205,143,1),rgba(214,181,109,0.9))]
                "
              >
                {c.headline.highlight}
              </span>
              {c.headline.after}
            </h1>

            {/* Subline */}
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-[rgba(255,255,255,0.78)] md:text-base">
              {c.subline.text}{" "}
              <span className="font-semibold text-[rgba(255,255,255,0.92)]">
                {c.subline.highlight}
              </span>{" "}
              – klar dokumentiert, hochwertig präsentiert und professionell
              begleitet.
            </p>

            {/* CTAs (match your premium button pattern) */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/immobilien"
                className="
                  inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold
                  bg-[color:var(--color-accent)] text-black font-semibold
                  shadow-[0_8px_28px_rgba(214,181,109,0.30)]
                  transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)] hover:shadow-[0_12px_36px_rgba(214,181,109,0.38)]
                  active:translate-y-0 active:shadow-none
                "
              >
                Angebote ansehen
              </Link>

              <Link
                href="/kontakt"
                className="
                  inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold
                  border border-[rgba(255,255,255,0.14)]
                  bg-[rgba(255,255,255,0.06)]
                  text-[rgba(255,255,255,0.9)]
                  backdrop-blur
                  transition hover:bg-[rgba(214,181,109,0.12)] hover:border-[rgba(214,181,109,0.35)]
                  active:scale-[0.99]
                "
              >
                Unterlagen anfordern
              </Link>
            </div>

            {/* Trust pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-[rgba(255,255,255,0.72)]">
              {" "}
              {c.trustPills.map((pill) => (
                <span
                  key={pill}
                  className="
                    rounded-full border border-[rgba(255,255,255,0.12)]
                    bg-[rgba(255,255,255,0.05)]
                    px-3 py-1.5 backdrop-blur
                  "
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="mt-10 flex items-center justify-center gap-3 text-xs text-[rgba(255,255,255,0.60)]">
              {" "}
              <span className="relative inline-flex h-9 w-6 items-start justify-center rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.05)] backdrop-blur">
                <span className="mt-2 h-2 w-1 rounded-full bg-[rgba(255,255,255,0.75)] animate-bounce" />
              </span>
              <span>{c.scrollHint}</span>
            </div>
          </div>
        </div>

        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 [box-shadow:inset_0_0_160px_rgba(0,0,0,0.65)]" />
      </div>
    </header>
  );
}
