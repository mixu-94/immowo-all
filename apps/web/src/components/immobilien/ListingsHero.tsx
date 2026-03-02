import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, MapPin } from "lucide-react";

export function ListingsHero({ total }: { total: number }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      {/* Champagne gold ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute -top-24 right-[-160px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.10),transparent_62%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      {/* Gold top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.55)] to-transparent" />

      <div className="relative p-6 md:p-10">
        {/* Header row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,181,109,0.28)] bg-[rgba(214,181,109,0.07)] px-3 py-1 text-[10px] font-semibold tracking-widest text-[color:var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] shadow-[0_0_0_3px_rgba(214,181,109,0.18)]" />
              IMMOBILIENÜBERSICHT · {total} OBJEKTE
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-4xl">
              Entdecken Sie{" "}
              <span className="bg-[linear-gradient(90deg,var(--color-accent),rgba(230,205,143,1))] bg-clip-text text-transparent">
                ausgewählte Angebote
              </span>
              .
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
              Schlüsselfertige Objekte, Bestandsimmobilien und Projekte „Kauf ab
              Plan". Viele Unterlagen erhalten Sie diskret{" "}
              <span className="font-semibold text-[color:var(--color-text)]">
                auf Anfrage
              </span>
              .
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#filter"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-5 text-sm font-semibold text-black shadow-[0_6px_20px_rgba(214,181,109,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)] hover:shadow-[0_10px_28px_rgba(214,181,109,0.38)] active:translate-y-0"
              >
                Filter öffnen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] px-5 text-sm font-medium text-[color:var(--color-text-muted)] backdrop-blur transition-all duration-200 hover:border-[rgba(214,181,109,0.30)] hover:text-[color:var(--color-text)]"
              >
                Beratung anfragen
              </Link>
            </div>
          </div>

          {/* Trust card — right side */}
          <div className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-4 backdrop-blur lg:w-[300px] lg:shrink-0">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
              Ihr Vorteil
            </p>
            <div className="space-y-3">
              <TrustRow
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Professionell aufbereitet"
                text="Eckdaten klar strukturiert."
              />
              <TrustRow
                icon={<FileText className="h-4 w-4" />}
                title="Unterlagen auf Anfrage"
                text="Exposé & Docs diskret nach Kontakt."
              />
              <TrustRow
                icon={<MapPin className="h-4 w-4" />}
                title="Region statt Adresse"
                text="Details im persönlichen Gespräch."
              />
            </div>
          </div>
        </div>

        {/* Image strip */}
        <div className="mt-8 hidden overflow-hidden rounded-xl border border-[color:var(--color-border)] md:block">
          <div className="flex gap-2 p-2">
            <StripImage src="/assets/images/real-estate/realestate1.jpg" alt="Immobilie 1" />
            <StripImage src="/assets/images/real-estate/realestate2.jpg" alt="Immobilie 2" />
            <StripImage src="/assets/images/real-estate/realestate3.jpg" alt="Immobilie 3" />
            <StripImage src="/assets/images/real-estate/realestate4.jpg" alt="Immobilie 4" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_80px_rgba(0,0,0,0.25)]" />
    </section>
  );
}

function StripImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[160px] flex-1 overflow-hidden rounded-lg border border-[rgba(214,181,109,0.12)] sm:h-[190px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-90 transition duration-500 hover:scale-[1.03] hover:opacity-100"
        sizes="25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

function TrustRow({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(214,181,109,0.25)] bg-[rgba(214,181,109,0.08)] text-[color:var(--color-accent)]">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-[color:var(--color-text)]">
          {title}
        </div>
        <div className="text-xs text-[color:var(--color-text-muted)]">{text}</div>
      </div>
    </div>
  );
}
