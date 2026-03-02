import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

type LocationLike = string | { label?: string; region?: string } | undefined;

type ReferenceLike = {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  location?: LocationLike;
  description: string;
  highlights: string[];
  isFeatured?: boolean;
  facts?: {
    units?: string;
    livingArea?: string;
    plotArea?: string;
    rooms?: string;
    buildTime?: string;
    status?: string;
  };
  coverImage?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

type Props = { project: ReferenceLike };

function formatLocation(loc: LocationLike) {
  if (!loc) return "";
  if (typeof loc === "string") return loc;
  return loc.label ?? loc.region ?? "";
}

type FactsStatus = ReferenceLike["facts"] extends
  | { status?: infer S }
  | undefined
  ? S
  : never;

function statusConfig(status?: FactsStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case "verkauft":
      return {
        label: "Verkauft",
        className:
          "border-[rgba(214,181,109,0.35)] bg-[rgba(214,181,109,0.12)] text-[color:var(--color-accent)]",
      };
    case "reserviert":
      return {
        label: "Reserviert",
        className: "border-white/15 bg-white/8 text-white/70",
      };
    case "in bau":
      return {
        label: "In Bau",
        className: "border-white/15 bg-white/8 text-white/70",
      };
    case "fertiggestellt":
      return {
        label: "Fertiggestellt",
        className:
          "border-[rgba(214,181,109,0.35)] bg-[rgba(214,181,109,0.12)] text-[color:var(--color-accent)]",
      };
    default:
      return {
        label: "Referenz",
        className: "border-white/15 bg-white/8 text-white/70",
      };
  }
}

export function ReferenceCard({ project }: Props) {
  const href =
    project.links?.find((l) => l.label.toLowerCase().includes("details"))
      ?.href ?? `/referenzen/${encodeURIComponent(project.slug ?? project.id)}`;

  const { label: statusLabel, className: statusClass } = statusConfig(
    project.facts?.status,
  );
  const loc = formatLocation(project.location);

  const primaryFacts = [
    project.facts?.units ? { label: "Einheiten", value: project.facts.units } : null,
    project.facts?.livingArea ? { label: "Wohnfläche", value: project.facts.livingArea } : null,
    project.facts?.plotArea
      ? { label: "Grundstück", value: project.facts.plotArea }
      : project.facts?.rooms
        ? { label: "Zimmer", value: project.facts.rooms }
        : null,
    project.facts?.buildTime ? { label: "Bauzeit", value: project.facts.buildTime } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="group rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(214,181,109,0.12)]">
    <Link
      href={href}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] transition-colors duration-300 group-hover:border-[rgba(214,181,109,0.40)]"
    >
      {/* Gold top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,181,109,0.55)] to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      {/* Hover glow — champagne gold */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(214,181,109,0.18),transparent_65%)] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* ── Image ── */}
      <div className="relative h-52 w-full overflow-hidden">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[rgba(214,181,109,0.08)] via-[color:var(--color-surface-2)] to-[color:var(--color-surface)]" />
        )}

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Side vignette on hover — transparent at bottom to avoid line artifact */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.35)_0%,transparent_30%,transparent_70%,rgba(0,0,0,0.35)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Featured star */}
        {project.isFeatured ? (
          <div className="absolute left-3 top-3 rounded-full border border-[rgba(214,181,109,0.45)] bg-[rgba(214,181,109,0.18)] px-2.5 py-1 text-[10px] font-semibold tracking-widest text-[color:var(--color-accent)] backdrop-blur">
            ★ FEATURED
          </div>
        ) : null}

        {/* Bottom image row: category + status badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <span className="inline-block rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-white/85 backdrop-blur">
              {project.category}
            </span>
            <h3 className="mt-2 truncate text-base font-semibold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:text-lg">
              {project.title}
            </h3>
          </div>
          <div
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur ${statusClass}`}
          >
            {statusLabel}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[color:var(--color-text-muted)]">
          <span className="font-semibold text-[color:var(--color-accent)]">
            {project.year}
          </span>
          {loc ? (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {loc}
            </span>
          ) : null}
          {project.subtitle ? (
            <span className="line-clamp-1 text-white/55">{project.subtitle}</span>
          ) : null}
        </div>

        {/* Description */}
        <p className="line-clamp-3 text-sm leading-relaxed text-[color:var(--color-text-muted)]">
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.highlights.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-[rgba(214,181,109,0.22)] bg-[rgba(214,181,109,0.06)] px-2.5 py-1 text-[11px] text-[color:var(--color-accent)] opacity-85"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* Facts strip */}
        {primaryFacts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-3 sm:grid-cols-4">
            {primaryFacts.map((f) => (
              <div key={f.label} className="min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-widest text-[color:var(--color-text-muted)]">
                  {f.label}
                </div>
                <div className="mt-0.5 truncate text-sm font-semibold text-[color:var(--color-text)]">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Footer CTA */}
        <div className="mt-auto flex items-center justify-end pt-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[color:var(--color-accent)] opacity-75 transition-all duration-200 group-hover:opacity-100 group-hover:gap-2">
            Details ansehen
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
    </div>
  );
}
