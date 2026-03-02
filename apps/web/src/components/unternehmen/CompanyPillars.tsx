// components/unternehmen/CompanyPillars.tsx
import { Building, FileCheck2, Home, Sparkles } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = { content?: CompanyPageContent["pillars"] };

const PILLARS_FALLBACK: NonNullable<Props["content"]> = {
  title: "Wofür wir stehen",
  description:
    "Immobilien sind Vertrauenssache. Deshalb kombinieren wir Baukompetenz mit einem modernen, transparenten Verkaufsprozess – ohne unnötigen Schnickschnack.",
  items: [
    {
      icon: "Building",
      title: "Bauträger-Projekte",
      text: "Von der Idee über Planung und Bau bis zur schlüsselfertigen Übergabe – effizient, strukturiert und mit klarem Qualitätsanspruch.",
    },
    {
      icon: "Sparkles",
      title: "Kauf ab Plan",
      text: "Frühzeitige Vermarktung inkl. Visuals, Unterlagenpaket und transparenter Käuferreise – ideal für Neubauprojekte.",
    },
    {
      icon: "Home",
      title: "Schlüsselfertige Immobilien",
      text: "Ausgewählte Objekte mit hochwertiger Ausstattung – sauber präsentiert, klar dokumentiert und professionell begleitet.",
    },
    {
      icon: "FileCheck2",
      title: "Unterlagen & Prozesse",
      text: "Exposé, Bau- und Leistungsbeschreibungen, Klarheit zu Ablauf und Konditionen – damit Entscheidungen schnell und sicher möglich sind.",
    },
  ],
};

const ICONS = {
  Building,
  Sparkles,
  Home,
  FileCheck2,
} as const;

export function CompanyPillars({ content }: Props) {
  const c = content ?? PILLARS_FALLBACK;

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">{c.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          {c.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {c.items.map((p) => {
          const Icon = ICONS[p.icon];
          return (
            <div
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/15 hover:bg-white/7"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-2">
                  <Icon className="h-5 w-5 text-white/85" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  {p.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/75">{p.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
// // components/unternehmen/CompanyPillars.tsx
// import { Building, FileCheck2, Home, Sparkles } from "lucide-react";

// const pillars = [
//   {
//     icon: Building,
//     title: "Bauträger-Projekte",
//     text: "Von der Idee über Planung und Bau bis zur schlüsselfertigen Übergabe – effizient, strukturiert und mit klarem Qualitätsanspruch.",
//   },
//   {
//     icon: Sparkles,
//     title: "Vom Papier weg verkaufen",
//     text: "Frühzeitige Vermarktung inkl. Visuals, Unterlagenpaket und transparenter Käuferreise – ideal für Neubauprojekte.",
//   },
//   {
//     icon: Home,
//     title: "Schlüsselfertige Immobilien",
//     text: "Ausgewählte Objekte mit hochwertiger Ausstattung – sauber präsentiert, klar dokumentiert und professionell begleitet.",
//   },
//   {
//     icon: FileCheck2,
//     title: "Unterlagen & Prozesse",
//     text: "Exposé, Bau- und Leistungsbeschreibungen, Klarheit zu Ablauf und Konditionen – damit Entscheidungen schnell und sicher möglich sind.",
//   },
// ];

// export function CompanyPillars() {
//   return (
//     <section className="mt-12">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-white">Wofür wir stehen</h2>
//         <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
//           Immobilien sind Vertrauenssache. Deshalb kombinieren wir Baukompetenz
//           mit einem modernen, transparenten Verkaufsprozess – ohne unnötigen
//           Schnickschnack.
//         </p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         {pillars.map((p) => (
//           <div
//             key={p.title}
//             className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/15 hover:bg-white/7"
//           >
//             <div className="mb-3 flex items-center gap-3">
//               <div className="rounded-2xl border border-white/10 bg-black/20 p-2">
//                 <p.icon className="h-5 w-5 text-white/85" />
//               </div>
//               <h3 className="text-base font-semibold text-white">{p.title}</h3>
//             </div>
//             <p className="text-sm leading-relaxed text-white/75">{p.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
