// components/unternehmen/CompanyHero.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = {
  content?: CompanyPageContent["hero"];
};

// ✅ Default Copy als Variablen oben
const HERO_FALLBACK: NonNullable<Props["content"]> = {
  badge: "BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG",
  headlineTop: "Unternehmen",
  headlineMuted: " – Immobilien, die wir",
  headlineGradient: "bauen & verkaufen.",
  description:
    "Wir verbinden Bauträger-Kompetenz mit einem klaren Verkaufsprozess: Neubau „Kauf ab Plan“, schlüsselfertige Immobilien und ausgewählte Bestandsobjekte – professionell, transparent und hochwertig präsentiert.",
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
    <section className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          {c.badge}
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          {c.headlineTop}
          <span className="text-white/70">{c.headlineMuted}</span>{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
            {c.headlineGradient}
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
          {c.description}
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href={c.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {c.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={c.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            {c.secondaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-3 text-xs text-white/60 sm:grid-cols-3">
          {c.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className="font-semibold text-white/80">{card.title}</div>
              <div className="mt-1">{card.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Image collage */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-cyan-400/15 via-fuchsia-400/10 to-indigo-400/15 blur-2xl" />
        <div className="relative grid gap-3 rounded-[36px] border border-white/10 bg-white/5 p-3 backdrop-blur">
          <div className="grid grid-cols-2 gap-3">
            <Tile
              src={c.images.a}
              alt="Neubau Referenz"
              className="aspect-[4/3]"
            />
            <Tile
              src={c.images.b}
              alt="Immobilie Außenansicht"
              className="aspect-[4/3]"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Tile
              src={c.images.c}
              alt="Innenraum"
              className="aspect-[4/3] col-span-2"
            />
            <Tile src={c.images.d} alt="Detail" className="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-95 transition duration-500 hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
// // components/unternehmen/CompanyHero.tsx
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, Sparkles } from "lucide-react";

// const imgs = {
//   a: "/assets/images/real-estate/realestate1.jpg",
//   b: "/assets/images/real-estate/realestate2.jpg",
//   c: "/assets/images/real-estate/realestate3.jpg",
//   d: "/assets/images/real-estate/realestate4.jpg",
// };

// export function CompanyHero() {
//   return (
//     <section className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
//       <div>
//         <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
//           <Sparkles className="h-4 w-4" />
//           BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG
//         </div>

//         <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
//           Unternehmen
//           <span className="text-white/70"> – Immobilien, die wir</span>{" "}
//           <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
//             bauen & verkaufen.
//           </span>
//         </h1>

//         <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
//           Wir verbinden Bauträger-Kompetenz mit einem klaren Verkaufsprozess:
//           Neubau „vom Papier weg“, schlüsselfertige Immobilien und ausgewählte
//           Bestandsobjekte – professionell, transparent und hochwertig
//           präsentiert.
//         </p>

//         <div className="mt-7 flex flex-col gap-3 sm:flex-row">
//           <Link
//             href="/immobilien"
//             className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
//           >
//             Aktuelle Angebote
//             <ArrowRight className="h-4 w-4" />
//           </Link>

//           <Link
//             href="/kontakt"
//             className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
//           >
//             Projekt anfragen
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="mt-8 grid gap-3 text-xs text-white/60 sm:grid-cols-3">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
//             <div className="font-semibold text-white/80">Bauträger</div>
//             <div className="mt-1">Planung → Bau → Übergabe</div>
//           </div>
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
//             <div className="font-semibold text-white/80">Verkauf</div>
//             <div className="mt-1">Klarer Prozess & Unterlagen</div>
//           </div>
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
//             <div className="font-semibold text-white/80">Qualität</div>
//             <div className="mt-1">Saubere Ausführung & Standards</div>
//           </div>
//         </div>
//       </div>

//       {/* Image collage */}
//       <div className="relative">
//         <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-cyan-400/15 via-fuchsia-400/10 to-indigo-400/15 blur-2xl" />
//         <div className="relative grid gap-3 rounded-[36px] border border-white/10 bg-white/5 p-3 backdrop-blur">
//           <div className="grid grid-cols-2 gap-3">
//             <Tile src={imgs.a} alt="Neubau Referenz" className="aspect-[4/3]" />
//             <Tile
//               src={imgs.b}
//               alt="Immobilie Außenansicht"
//               className="aspect-[4/3]"
//             />
//           </div>
//           <div className="grid grid-cols-3 gap-3">
//             <Tile
//               src={imgs.c}
//               alt="Innenraum"
//               className="aspect-[4/3] col-span-2"
//             />
//             <Tile src={imgs.d} alt="Detail" className="aspect-[4/3]" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Tile({
//   src,
//   alt,
//   className,
// }: {
//   src: string;
//   alt: string;
//   className: string;
// }) {
//   return (
//     <div
//       className={`relative overflow-hidden rounded-3xl border border-white/10 ${className}`}
//     >
//       <Image
//         src={src}
//         alt={alt}
//         fill
//         className="object-cover opacity-95 transition duration-500 hover:scale-[1.03]"
//         sizes="(max-width: 768px) 100vw, 50vw"
//         priority={false}
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
//     </div>
//   );
// }
