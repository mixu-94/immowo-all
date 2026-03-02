// src/components/Header.tsx
import type { HomeHeaderContent } from "@/cms/home";
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
                  bg-[var(--color-accent)] text-black
                  shadow-[0_18px_45px_rgba(0,0,0,0.35)]
                  transition hover:scale-[1.02] hover:bg-[var(--color-accent-hover)]
                  active:scale-[0.99]
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

// export default function Header() {
//   return (
//     <header className="relative w-full h-[60vh] min-h-[650px] overflow-hidden">
//       {/* Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         preload="metadata"
//         className="absolute inset-0 z-0 h-full w-full object-cover"
//       >
//         <source src="/assets/videos/beach.mp4" type="video/mp4" />
//       </video>

//       {/* Cinematic overlays */}
//       <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />

//       {/* Subtle color glow (navy premium) */}
//       <div className="pointer-events-none absolute inset-0 z-10">
//         <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-3xl" />
//         <div className="absolute -top-24 right-[-180px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_62%)] blur-3xl" />
//       </div>

//       {/* Fade into blur (no hard edge) */}
//       <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44">
//         <div
//           className="
//             absolute inset-0
//             backdrop-blur-xl
//             bg-black/25
//             [mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
//             [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
//           "
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
//       </div>

//       {/* Content */}
//       <div className="relative z-30 flex h-full items-center justify-center px-6">
//         <div className="max-w-4xl text-center text-white">
//           {/* Badge */}
//           <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
//             <span className="h-2 w-2 rounded-full bg-emerald-300" />
//             BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG
//           </p>

//           {/* Headline */}
//           <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-6xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
//             Immobilien, die{" "}
//             <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
//               überzeugen
//             </span>
//             .
//           </h1>

//           {/* Subline */}
//           <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 md:text-base">
//             Schlüsselfertige Objekte und Neubauprojekte{" "}
//             <span className="text-white/95 font-semibold">vom Papier weg</span>{" "}
//             – klar dokumentiert, hochwertig präsentiert und professionell
//             begleitet.
//           </p>

//           {/* Trust line */}
//           <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/75">
//             <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
//               Transparenter Prozess
//             </span>
//             <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
//               Saubere Unterlagen
//             </span>
//             <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
//               Qualität bis zur Übergabe
//             </span>
//           </div>

//           {/* Scroll hint */}
//           <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/60">
//             <span className="inline-block h-8 w-5 rounded-full border border-white/25 bg-white/5 backdrop-blur">
//               <span className="mx-auto mt-1 block h-2 w-1 rounded-full bg-white/70 animate-bounce" />
//             </span>
//             <span>Scrollen, um mehr zu entdecken</span>
//           </div>
//         </div>
//       </div>

//       {/* Subtle vignette for polish */}
//       <div className="pointer-events-none absolute inset-0 z-20 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.6)]" />
//     </header>
//   );
// }
