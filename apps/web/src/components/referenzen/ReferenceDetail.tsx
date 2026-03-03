// components/referenzen/ReferenceDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { ReferencesShell } from "./ReferencesShell";
import { ShareBar } from "@/components/ui/ShareBar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "";
import type { Reference } from "@/lib/types/references";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  FileText,
  Grid3X3,
  Home,
  Landmark,
  Lock,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  Timer,
  Wrench,
} from "lucide-react";

type Props = { project: Reference };

function locationText(loc: Reference["location"]) {
  return loc?.label ?? loc?.region ?? "";
}

export function ReferenceDetail({ project }: Props) {
  const loc = locationText(project.location);
  const gallery = project.media?.gallery ?? [];
  const caseStudyPdf = project.documents?.caseStudyPdfUrl;

  const status = project.facts?.status ?? "fertiggestellt";
  const statusLabel = formatStatus(status);

  return (
    <ReferencesShell>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/referenzen"
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2 text-xs font-semibold tracking-widest text-[color:var(--color-text-muted)] backdrop-blur transition hover:bg-[color:var(--color-surface-2)]"
        >
          <span className="text-[color:var(--color-text-muted)]">←</span> ZURÜCK ZU REFERENZEN
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-black/20 px-4 py-2 text-xs font-semibold tracking-widest text-[color:var(--color-text-muted)] backdrop-blur md:inline-flex">
          <BadgeCheck className="h-4 w-4" />
          CASE STUDY
        </div>
      </div>

      <article className="overflow-hidden rounded-[36px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] backdrop-blur">
        {/* HERO */}
        <header className="relative">
          <div className="relative h-[360px] w-full md:h-[520px]">
            {project.coverImage ? (
              <Image
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
            )}

            {/* cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.55)]" />

            {/* top-right status pill */}
            <div className="absolute right-5 top-5 z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] px-4 py-2 text-xs font-semibold tracking-widest text-[color:var(--color-text)] backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                {statusLabel}
              </span>
            </div>

            {/* bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <Pill
                  icon={<Sparkles className="h-4 w-4" />}
                  text={project.category}
                />
                <Pill
                  icon={<CalendarDays className="h-4 w-4" />}
                  text={project.year}
                />
                {loc ? (
                  <Pill icon={<MapPin className="h-4 w-4" />} text={loc} />
                ) : null}
              </div>

              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-5xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
                {project.title}
              </h1>

              {project.subtitle ? (
                <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
                  {project.subtitle}
                </p>
              ) : null}

              {/* Highlights */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.highlights.slice(0, 10).map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-[color:var(--color-border)] bg-black/25 px-3 py-1.5 text-xs font-semibold text-[color:var(--color-text-muted)] backdrop-blur"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fade into page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32">
            <div
              className="
                absolute inset-0
                backdrop-blur-xl
                bg-black/20
                [mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
                [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
              "
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[color:var(--color-bg)]" />
          </div>
        </header>

        {/* BODY */}
        <div className="grid gap-8 px-6 pb-10 pt-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:pb-12">
          {/* LEFT: Case Study */}
          <div className="space-y-8">
            {/* Overview */}
            <Section
              icon={<Home className="h-5 w-5" />}
              title="Projektüberblick"
              subtitle="Kurz und klar – worum ging es bei diesem Projekt?"
            >
              <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
                {project.description}
              </p>
            </Section>

            {/* Case Study blocks */}
            {project.caseStudy?.challenge ||
            project.caseStudy?.approach ||
            project.caseStudy?.result ? (
              <div className="grid gap-4 md:grid-cols-3">
                {project.caseStudy?.challenge ? (
                  <MiniCard
                    icon={<Landmark className="h-5 w-5 text-[color:var(--color-text-muted)]" />}
                    title="Ausgangslage"
                    text={project.caseStudy.challenge}
                  />
                ) : null}
                {project.caseStudy?.approach ? (
                  <MiniCard
                    icon={<Wrench className="h-5 w-5 text-[color:var(--color-text-muted)]" />}
                    title="Vorgehen"
                    text={project.caseStudy.approach}
                  />
                ) : null}
                {project.caseStudy?.result ? (
                  <MiniCard
                    icon={<BadgeCheck className="h-5 w-5 text-[color:var(--color-text-muted)]" />}
                    title="Ergebnis"
                    text={project.caseStudy.result}
                  />
                ) : null}
              </div>
            ) : null}

            {/* Long sections */}
            {project.sections?.length ? (
              <Section
                icon={<Grid3X3 className="h-5 w-5" />}
                title="Details & Einordnung"
                subtitle="Mehr Kontext – ideal für größere Referenzen."
              >
                <div className="space-y-4">
                  {project.sections.map((s) => (
                    <div
                      key={s.heading}
                      className="rounded-3xl border border-[color:var(--color-border)] bg-black/20 p-5"
                    >
                      <div className="text-sm font-semibold text-[color:var(--color-text)]">
                        {s.heading}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                        {s.content}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            ) : null}

            {/* Services */}
            {project.services?.length ? (
              <Section
                icon={<Wrench className="h-5 w-5" />}
                title="Leistungsumfang"
                subtitle="Welche Leistungen wurden im Projekt abgedeckt?"
              >
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-xs font-semibold text-[color:var(--color-text-muted)]"
                    >
                      <Wrench className="h-4 w-4 text-[color:var(--color-text-muted)]" />
                      {s}
                    </span>
                  ))}
                </div>
              </Section>
            ) : null}

            {/* Timeline */}
            {project.timeline?.length ? (
              <Section
                icon={<Timer className="h-5 w-5" />}
                title="Ablauf"
                subtitle="So lief das Projekt strukturiert ab."
              >
                <ol className="space-y-3">
                  {project.timeline.map((t, idx) => (
                    <li
                      key={`${t.title}-${idx}`}
                      className="flex gap-3 rounded-3xl border border-[color:var(--color-border)] bg-black/20 p-5"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                        <span className="text-xs font-bold">{idx + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[color:var(--color-text)]">
                          {t.title}
                        </div>
                        <div className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                          {t.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>
            ) : null}

            {/* Gallery */}
            {gallery.length ? (
              <Section
                icon={<Grid3X3 className="h-5 w-5" />}
                title="Galerie"
                subtitle="Eindrücke – diskret und hochwertig."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {gallery
                    .filter((m) => m.type === "image")
                    .slice(0, 8)
                    .map((m, i) => (
                      <div
                        key={`${m.type}-${m.src}-${i}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[color:var(--color-border)]"
                      >
                        <Image
                          src={m.src}
                          alt={m.alt ?? project.title}
                          fill
                          className="object-cover opacity-95 transition duration-500 hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      </div>
                    ))}
                </div>
              </Section>
            ) : null}

            {/* Testimonial */}
            {project.testimonial?.quote ? (
              <section className="rounded-[36px] border border-[color:var(--color-border)] bg-black/20 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
                  <Quote className="h-5 w-5 text-[color:var(--color-text-muted)]" />
                  Stimme zum Projekt
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-text-muted)] md:text-base">
                  “{project.testimonial.quote}”
                </p>
                {project.testimonial.author || project.testimonial.role ? (
                  <div className="mt-3 text-xs font-semibold tracking-widest text-[color:var(--color-text-muted)]">
                    {project.testimonial.author ?? "—"}
                    {project.testimonial.role
                      ? ` • ${project.testimonial.role}`
                      : ""}
                  </div>
                ) : null}
              </section>
            ) : null}
          </div>

          {/* RIGHT: Sidebar */}
          <aside className="space-y-4 md:sticky md:top-6 md:self-start">
            {/* KPIs */}
            {project.kpis?.length ? (
              <div className="rounded-[36px] border border-[color:var(--color-border)] bg-black/20 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
                  <ShieldCheck className="h-5 w-5 text-[color:var(--color-text-muted)]" />
                  Kennzahlen
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {project.kpis.slice(0, 8).map((k) => (
                    <div
                      key={k.label}
                      className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
                        {k.label}
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[color:var(--color-text)]">
                        {k.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Facts */}
            {project.facts ? (
              <div className="rounded-[36px] border border-[color:var(--color-border)] bg-black/20 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
                  <Home className="h-5 w-5 text-[color:var(--color-text-muted)]" />
                  Fakten
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {project.facts.units ? (
                    <Fact
                      icon={<Home className="h-4 w-4" />}
                      label="Einheiten"
                      value={project.facts.units}
                    />
                  ) : null}
                  {project.facts.livingArea ? (
                    <Fact
                      icon={<Grid3X3 className="h-4 w-4" />}
                      label="Wohnfläche"
                      value={project.facts.livingArea}
                    />
                  ) : null}
                  {project.facts.plotArea ? (
                    <Fact
                      icon={<MapPin className="h-4 w-4" />}
                      label="Grundstück"
                      value={project.facts.plotArea}
                    />
                  ) : null}
                  {project.facts.rooms ? (
                    <Fact
                      icon={<Home className="h-4 w-4" />}
                      label="Zimmer"
                      value={project.facts.rooms}
                    />
                  ) : null}
                  {project.facts.buildTime ? (
                    <Fact
                      icon={<Timer className="h-4 w-4" />}
                      label="Dauer"
                      value={project.facts.buildTime}
                    />
                  ) : null}
                  {project.facts.status ? (
                    <Fact
                      icon={<ShieldCheck className="h-4 w-4" />}
                      label="Status"
                      value={formatStatus(project.facts.status)}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Documents */}
            <div className="rounded-[36px] border border-[color:var(--color-border)] bg-black/20 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
                <FileText className="h-5 w-5 text-[color:var(--color-text-muted)]" />
                Unterlagen
              </div>

              <div className="mt-4 space-y-3">
                <DocRow
                  title="Case Study (PDF)"
                  available={Boolean(caseStudyPdf)}
                />
              </div>

              {/* If PDF exists, provide direct download. Otherwise route to contact with context */}
              {caseStudyPdf ? (
                <a
                  href={caseStudyPdf}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
                >
                  PDF herunterladen <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={`/kontakt?reference=${encodeURIComponent(project.slug)}&title=${encodeURIComponent(project.title)}`}
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
                >
                  Unterlagen anfragen <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}

              <p className="mt-3 text-xs text-[color:var(--color-text-muted)]">
                Hinweis: Referenzen sind teils anonymisiert (Region/Typ), um
                Privatsphäre zu wahren.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-[36px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 backdrop-blur">
              <div className="text-sm font-semibold text-[color:var(--color-text)]">
                Ähnliches Projekt geplant?
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                Sprechen wir über Ziel, Budget und Zeitplan. Wir melden uns
                zeitnah mit einem konkreten nächsten Schritt.
              </p>
              <Link
                href="/kontakt"
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] px-4 text-sm font-semibold text-[color:var(--color-text)] backdrop-blur transition hover:bg-[color:var(--color-surface-2)]"
              >
                Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>
      {/* Share Buttons */}
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
          <span className="text-sm text-[color:var(--color-text-muted)]">Referenz teilen:</span>
          <ShareBar
            url={`${SITE_URL}/referenzen/${project.slug}`}
            title={project.title}
          />
        </div>
      </div>
    </ReferencesShell>
  );
}

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[36px] border border-[color:var(--color-border)] bg-black/20 p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-2">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold text-[color:var(--color-text)]">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-sm text-[color:var(--color-text-muted)]">{subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Pill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] px-3 py-1 text-xs font-semibold tracking-widest text-[color:var(--color-text)] backdrop-blur">
      {icon}
      {text}
    </span>
  );
}

function MiniCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-[color:var(--color-border)] bg-black/20 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
        {icon}
        {title}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-text-muted)]">{text}</p>
    </div>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
        <span className="text-[color:var(--color-text-muted)]">{icon}</span>
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-[color:var(--color-text)]">{value}</div>
    </div>
  );
}

function DocRow({ title, available }: { title: string; available: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--color-text)]">
        <Lock className="h-4 w-4 text-[color:var(--color-text-muted)]" />
        {title}
      </div>
      <span className="rounded-full border border-[color:var(--color-border)] bg-black/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-[color:var(--color-text-muted)]">
        {available ? "DOWNLOAD" : "AUF ANFRAGE"}
      </span>
    </div>
  );
}

function formatStatus(status: string) {
  switch (status) {
    case "verkauft":
      return "Verkauft";
    case "reserviert":
      return "Reserviert";
    case "in bau":
      return "In Bau";
    case "fertiggestellt":
      return "Fertiggestellt";
    default:
      return status;
  }
}
