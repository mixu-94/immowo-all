// components/unternehmen/CompanyProcess.tsx
import { CheckCircle2 } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = { content?: CompanyPageContent["process"] };

const PROCESS_FALLBACK: NonNullable<Props["content"]> = {
  title: "So läuft es bei uns",
  description:
    "Ein schlanker Prozess – egal ob schlüsselfertig oder Neubauprojekt (Kauf ab Plan). Klarheit gewinnt.",
  steps: [
    {
      title: "Erstgespräch & Bedarf",
      text: "Wir klären Ziel, Budget, Zeitplan und Anforderungen – ohne Umwege.",
    },
    {
      title: "Objekt / Projekt passend wählen",
      text: "Neubau (Kauf ab Plan) oder Bestandsobjekt – mit klaren Eckdaten und Unterlagen.",
    },
    {
      title: "Unterlagenpaket & Transparenz",
      text: "Exposé, Leistungsbeschreibung, Kosten-/Zeitplan (wo relevant) – sauber und nachvollziehbar.",
    },
    {
      title: "Besichtigung / Beratung",
      text: "Effizient geplant, gut vorbereitet – damit du schnell eine fundierte Entscheidung triffst.",
    },
    {
      title: "Abwicklung bis Übergabe",
      text: "Koordiniert, dokumentiert, fair – inklusive Support bis zum Abschluss.",
    },
  ],
};

export function CompanyProcess({ content }: Props) {
  const c = content ?? PROCESS_FALLBACK;

  return (
    <section className="mt-12 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">{c.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
          {c.description}
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {c.steps.map((s, idx) => (
          <div
            key={s.title}
            className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
              <span className="text-xs font-bold">{idx + 1}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white/90">
                  {s.title}
                </h3>
                <CheckCircle2 className="h-4 w-4 text-white/50" />
              </div>
              <p className="mt-1 text-sm text-white/70">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// // components/unternehmen/CompanyProcess.tsx
// import { CheckCircle2 } from "lucide-react";

// const steps = [
//   {
//     title: "Erstgespräch & Bedarf",
//     text: "Wir klären Ziel, Budget, Zeitplan und Anforderungen – ohne Umwege.",
//   },
//   {
//     title: "Objekt / Projekt passend wählen",
//     text: "Neubau (vom Papier weg) oder Bestandsobjekt – mit klaren Eckdaten und Unterlagen.",
//   },
//   {
//     title: "Unterlagenpaket & Transparenz",
//     text: "Exposé, Leistungsbeschreibung, Kosten-/Zeitplan (wo relevant) – sauber und nachvollziehbar.",
//   },
//   {
//     title: "Besichtigung / Beratung",
//     text: "Effizient geplant, gut vorbereitet – damit du schnell eine fundierte Entscheidung triffst.",
//   },
//   {
//     title: "Abwicklung bis Übergabe",
//     text: "Koordiniert, dokumentiert, fair – inklusive Support bis zum Abschluss.",
//   },
// ];

// export function CompanyProcess() {
//   return (
//     <section className="mt-12 rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur md:p-8">
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold text-white">
//           So läuft es bei uns
//         </h2>
//         <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
//           Ein schlanker Prozess – egal ob schlüsselfertig oder Neubauprojekt.
//           Klarheit gewinnt.
//         </p>
//       </div>

//       <div className="grid gap-3 md:grid-cols-2">
//         {steps.map((s, idx) => (
//           <div
//             key={s.title}
//             className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
//           >
//             <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
//               <span className="text-xs font-bold">{idx + 1}</span>
//             </div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h3 className="text-sm font-semibold text-white/90">
//                   {s.title}
//                 </h3>
//                 <CheckCircle2 className="h-4 w-4 text-white/50" />
//               </div>
//               <p className="mt-1 text-sm text-white/70">{s.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
