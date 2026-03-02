// components/unternehmen/CompanyHighlights.tsx
import Image from "next/image";
import { Check } from "lucide-react";
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
    "Weil wir Immobilien nicht nur \u201evermitteln\u201c, sondern ganzheitlich denken: Bau, Qualität, Dokumentation und ein sauberer Prozess sind entscheidend.",
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
    <section className="mt-16 grid gap-8 md:grid-cols-2 md:items-center">
      {/* Image */}
      <div className="relative">
        {/* Gold glow behind image */}
        <div className="absolute -inset-3 rounded-[26px] bg-[radial-gradient(ellipse_at_center,rgba(214,181,109,0.14),transparent_70%)] blur-xl" />
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.20)] bg-[color:var(--color-surface)]">
          <div className="relative aspect-[4/3]">
            <Image
              src={c.image.src}
              alt={c.image.alt}
              fill
              className="object-cover transition duration-500 hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          </div>
          {/* Bottom gold accent line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.45)] to-transparent" />
        </div>
      </div>

      {/* Text + bullets */}
      <div>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-8 w-px shrink-0 bg-gradient-to-b from-[color:var(--color-accent)] to-transparent" />
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
              {c.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--color-text-muted)]">
              {c.description}
            </p>
          </div>
        </div>

        <ul className="mt-6 grid gap-3">
          {c.bullets.map((b) => (
            <li
              key={b}
              className="group flex items-start gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 transition-all duration-200 hover:border-[rgba(214,181,109,0.30)] hover:bg-[rgba(214,181,109,0.04)]"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(214,181,109,0.35)] bg-[rgba(214,181,109,0.10)]">
                <Check className="h-3 w-3 text-[color:var(--color-accent)]" strokeWidth={2.5} />
              </div>
              <span className="text-sm leading-relaxed text-[color:var(--color-text-muted)] group-hover:text-[color:var(--color-text)]">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
