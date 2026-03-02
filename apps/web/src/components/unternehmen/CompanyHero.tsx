// components/unternehmen/CompanyHero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = {
  content?: CompanyPageContent["hero"];
};

const HERO_FALLBACK: NonNullable<Props["content"]> = {
  badge: "BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG",
  headlineTop: "Unternehmen",
  headlineMuted: " – Immobilien, die wir",
  headlineGradient: "bauen & verkaufen.",
  description:
    "Wir verbinden Bauträger-Kompetenz mit einem klaren Verkaufsprozess: Neubau \u201eKauf ab Plan\u201c, schlüsselfertige Immobilien und ausgewählte Bestandsobjekte – professionell, transparent und hochwertig präsentiert.",
  primaryCta: { label: "Aktuelle Angebote", href: "/immobilien" },
  secondaryCta: { label: "Projekt anfragen", href: "/kontakt" },
  cards: [
    { title: "Bauträger", text: "Planung → Bau → Übergabe" },
    { title: "Verkauf", text: "Klarer Prozess & Unterlagen" },
    { title: "Qualität", text: "Saubere Ausführung & Standards" },
  ],
  images: {
    a: "/assets/images/real-estate/realestate1.jpg",
    b: "/assets/images/real-estate/realestate2.jpg",
    c: "/assets/images/real-estate/realestate3.jpg",
    d: "/assets/images/real-estate/realestate4.jpg",
  },
};

export function CompanyHero({ content }: Props) {
  const c = content ?? HERO_FALLBACK;

  return (
    <section className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      {/* ── Left: Text ── */}
      <div>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.30)] bg-[rgba(214,181,109,0.08)] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[color:var(--color-accent)] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_0_3px_rgba(214,181,109,0.20)]" />
          {c.badge}
        </div>

        {/* Headline */}
        <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-5xl">
          {c.headlineTop}
          <span className="text-[color:var(--color-text-muted)]">{c.headlineMuted}</span>{" "}
          <span className="bg-[linear-gradient(90deg,var(--color-accent),rgba(230,205,143,1),rgba(214,181,109,0.85))] bg-clip-text text-transparent">
            {c.headlineGradient}
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
          {c.description}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={c.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_28px_rgba(214,181,109,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-hover)] hover:shadow-[0_12px_36px_rgba(214,181,109,0.38)]"
          >
            {c.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={c.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] backdrop-blur transition-all duration-200 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.06)]"
          >
            {c.secondaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Info cards */}
        <div className="mt-8 grid gap-3 text-xs sm:grid-cols-3">
          {c.cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 transition-all duration-200 hover:border-[rgba(214,181,109,0.30)] hover:bg-[rgba(214,181,109,0.04)]"
            >
              <div className="mb-1 font-semibold text-[color:var(--color-accent)]">
                {card.title}
              </div>
              <div className="text-[color:var(--color-text-muted)]">{card.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Image collage ── */}
      <div className="relative">
        {/* Gold ambient glow */}
        <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(214,181,109,0.18),transparent_65%)] blur-2xl" />

        <div className="relative grid gap-3 rounded-[28px] border border-[rgba(214,181,109,0.18)] bg-[rgba(214,181,109,0.04)] p-3 backdrop-blur">
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px rounded-t-[28px] bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.50)] to-transparent" />

          <div className="grid grid-cols-2 gap-3">
            <Tile src={c.images.a} alt="Neubau Referenz" className="aspect-[4/3]" />
            <Tile src={c.images.b} alt="Immobilie Außenansicht" className="aspect-[4/3]" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Tile src={c.images.c} alt="Innenraum" className="col-span-2 aspect-[4/3]" />
            <Tile src={c.images.d} alt="Detail" className="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.15)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}
