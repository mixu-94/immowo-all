// components/unternehmen/CompanyProcess.tsx
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
    <section className="mt-16">
      {/* Section header */}
      <div className="mb-8 flex items-start gap-4">
        <div className="mt-1 h-8 w-px shrink-0 bg-gradient-to-b from-[color:var(--color-accent)] to-transparent" />
        <div>
          <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
            {c.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[color:var(--color-text-muted)]">
            {c.description}
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.45)] to-transparent" />

        <div className="grid gap-0 divide-y divide-[color:var(--color-border)] md:grid-cols-2 md:divide-x md:divide-y-0">
          {c.steps.map((s, idx) => (
            <div
              key={s.title}
              className="group relative flex gap-4 p-5 transition-colors duration-200 hover:bg-[rgba(214,181,109,0.03)] md:p-6"
            >
              {/* Step number */}
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-accent)] shadow-[0_0_0_3px_rgba(214,181,109,0.15)]">
                <span className="text-[11px] font-bold text-black">{idx + 1}</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                  {s.text}
                </p>
              </div>

              {/* Subtle right-arrow indicator on last item */}
              {idx === c.steps.length - 1 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--color-accent)] opacity-30">
                  ✦
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
