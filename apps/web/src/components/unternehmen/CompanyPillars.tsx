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

const ICONS = { Building, Sparkles, Home, FileCheck2 } as const;

export function CompanyPillars({ content }: Props) {
  const c = content ?? PILLARS_FALLBACK;

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

      <div className="grid gap-4 md:grid-cols-2">
        {c.items.map((p) => {
          const Icon = ICONS[p.icon as keyof typeof ICONS];
          return (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 transition-all duration-300 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.04)]"
            >
              {/* Top gold shimmer on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.55)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.08)]">
                  {Icon && <Icon className="h-4.5 w-4.5 text-[color:var(--color-accent)]" />}
                </div>
                <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
                  {p.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                {p.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
