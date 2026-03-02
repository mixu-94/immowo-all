// components/unternehmen/CompanyHighlights.tsx
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = {
  content?: CompanyPageContent["highlights"];
};

const HIGHLIGHTS_FALLBACK: NonNullable<Props["content"]> = {
  image: {
    src: "/assets/images/real-estate/realestate6.jpg",
    alt: "Immobilienqualität und Baukompetenz",
  },
  title: "Warum Kunden mit uns arbeiten",
  description:
    "Weil wir Immobilien nicht nur „vermitteln“, sondern ganzheitlich denken: Bau, Qualität, Dokumentation und ein sauberer Prozess sind entscheidend.",
  bullets: [
    "Bauträger-Projekte von der Planung bis zur Übergabe",
    "Verkauf schlüsselfertiger Immobilien & ausgewählter Bestandsobjekte",
    "Saubere Unterlagen, klare Kommunikation, strukturierte Abwicklung",
    "Hochwertige Präsentation für schnelle, sichere Entscheidungen",
  ],
};

export function CompanyHighlights({ content }: Props) {
  const c = content ?? HIGHLIGHTS_FALLBACK;

  return (
    <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="relative aspect-[4/3]">
          <Image
            src={c.image.src}
            alt={c.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white">{c.title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
          {c.description}
        </p>

        <ul className="mt-5 grid gap-3">
          {c.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/70" />
              <span className="text-sm text-white/80">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// // components/unternehmen/CompanyHighlights.tsx
// import Image from "next/image";
// import { CheckCircle2 } from "lucide-react";

// const img = "/assets/images/real-estate/realestate6.jpg";

// const bullets = [
//   "Bauträger-Projekte von der Planung bis zur Übergabe",
//   "Verkauf schlüsselfertiger Immobilien & ausgewählter Bestandsobjekte",
//   "Saubere Unterlagen, klare Kommunikation, strukturierte Abwicklung",
//   "Hochwertige Präsentation für schnelle, sichere Entscheidungen",
// ];

// export function CompanyHighlights() {
//   return (
//     <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
//       <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
//         <div className="relative aspect-[4/3]">
//           <Image
//             src={img}
//             alt="Immobilienqualität und Baukompetenz"
//             fill
//             className="object-cover"
//             sizes="(max-width: 768px) 100vw, 50vw"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
//         </div>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold text-white">
//           Warum Kunden mit uns arbeiten
//         </h2>
//         <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
//           Weil wir das Thema Immobilien nicht nur “vermitteln”, sondern
//           verstehen: Bau, Qualität, Dokumentation und ein sauberer Prozess sind
//           entscheidend.
//         </p>

//         <ul className="mt-5 grid gap-3">
//           {bullets.map((b) => (
//             <li
//               key={b}
//               className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
//             >
//               <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/70" />
//               <span className="text-sm text-white/80">{b}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }
