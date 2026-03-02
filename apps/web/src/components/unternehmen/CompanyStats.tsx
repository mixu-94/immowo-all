// components/unternehmen/CompanyStats.tsx
import { ShieldCheck, Handshake, Scale, Building2 } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = { content?: CompanyPageContent["stats"] };

const STATS_FALLBACK: NonNullable<Props["content"]> = {
  items: [
    { icon: "Building2", label: "Fokus", value: "Bauträger & Verkauf" },
    { icon: "ShieldCheck", label: "Qualität", value: "Saubere Standards" },
    { icon: "Scale", label: "Transparenz", value: "Klare Unterlagen" },
    { icon: "Handshake", label: "Abwicklung", value: "Zuverlässig & fair" },
  ],
};

const ICONS = { Building2, ShieldCheck, Scale, Handshake } as const;

export function CompanyStats({ content }: Props) {
  const c = content ?? STATS_FALLBACK;

  return (
    <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {c.items.map((s) => {
        const Icon = ICONS[s.icon as keyof typeof ICONS];
        return (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-all duration-300 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.04)]"
          >
            {/* Hover gold shimmer top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.50)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.08)]">
                {Icon && <Icon className="h-4.5 w-4.5 text-[color:var(--color-accent)]" />}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                {s.label}
              </div>
            </div>

            <div className="mt-3 text-base font-semibold tracking-tight text-[color:var(--color-text)]">
              {s.value}
            </div>
          </div>
        );
      })}
    </section>
  );
}
