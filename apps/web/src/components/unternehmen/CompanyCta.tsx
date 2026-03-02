// components/unternehmen/CompanyCta.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CompanyPageContent } from "@/lib/cms/companyPage";

type Props = { content?: CompanyPageContent["cta"] };

const CTA_FALLBACK: NonNullable<Props["content"]> = {
  title: "Bereit für den nächsten Schritt?",
  description:
    "Ob Neubau (Kauf ab Plan) oder schlüsselfertiges Objekt – wir geben Ihnen schnell Klarheit zu Ablauf, Unterlagen und Möglichkeiten.",
  primaryCta: { label: "Kontakt aufnehmen", href: "/kontakt" },
  secondaryCta: { label: "Angebote ansehen", href: "/immobilien" },
};

export function CompanyCta({ content }: Props) {
  const c = content ?? CTA_FALLBACK;

  return (
    <section className="relative mt-16 overflow-hidden rounded-2xl border border-[rgba(214,181,109,0.22)] bg-[color:var(--color-surface)]">
      {/* Gold ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.14),transparent_65%)] blur-2xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.10),transparent_65%)] blur-2xl" />
      </div>

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.60)] to-transparent" />

      <div className="relative flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.07)] px-3 py-1 text-[10px] font-semibold tracking-widest text-[color:var(--color-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
            IMMOWO VENTURES
          </div>
          <h2 className="text-xl font-semibold text-[color:var(--color-text)] md:text-2xl">
            {c.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
            {c.description}
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={c.primaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_28px_rgba(214,181,109,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-hover)] hover:shadow-[0_12px_36px_rgba(214,181,109,0.38)]"
          >
            {c.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={c.secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-transparent px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] transition-all duration-200 hover:border-[rgba(214,181,109,0.35)] hover:bg-[rgba(214,181,109,0.06)]"
          >
            {c.secondaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
