"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { ListingLike } from "./filters";
import { defaultFilters, matchesFilters } from "./filters";
import { ListingsGrid } from "./ListingsGrid";

export function ListingsToolbar({ listings }: { listings: ListingLike[] }) {
  const [filters, setFilters] = useState(defaultFilters);

  const filtered = useMemo(
    () => listings.filter((l) => matchesFilters(l, filters)),
    [listings, filters],
  );

  const isFiltered =
    filters.q !== "" ||
    filters.location !== "" ||
    filters.variant !== "any" ||
    filters.status !== "any" ||
    filters.minPrice != null ||
    filters.maxPrice != null ||
    filters.minArea != null ||
    filters.minRooms != null;

  return (
    <section className="mt-10" id="filter">
      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] backdrop-blur">
        {/* Filter header */}
        <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-5 py-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[rgba(214,181,109,0.28)] bg-[rgba(214,181,109,0.08)] text-[color:var(--color-accent)]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold text-[color:var(--color-text)]">
              Suchen &amp; filtern
            </span>
            {isFiltered && (
              <span className="rounded-full border border-[rgba(214,181,109,0.35)] bg-[rgba(214,181,109,0.10)] px-2 py-0.5 text-[10px] font-semibold text-[color:var(--color-accent)]">
                aktiv
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[color:var(--color-text-muted)]">
              <span className="font-semibold text-[color:var(--color-text)]">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "Treffer" : "Treffer"}
            </span>

            {isFiltered && (
              <button
                onClick={() => setFilters(defaultFilters)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-muted)] transition hover:border-[rgba(214,181,109,0.30)] hover:text-[color:var(--color-text)]"
              >
                <X className="h-3 w-3" />
                Zurücksetzen
              </button>
            )}
          </div>
        </div>

        {/* Filter body */}
        <div className="p-5 md:p-6">
          {/* Text search row */}
          <div className="grid gap-3 md:grid-cols-2">
            <FilterInput
              value={filters.q}
              onChange={(v) => setFilters((p) => ({ ...p, q: v }))}
              placeholder="Objekt, Features, Schlagwort …"
              label="Freitext"
            />
            <FilterInput
              value={filters.location}
              onChange={(v) => setFilters((p) => ({ ...p, location: v }))}
              placeholder="z. B. Augsburg, München, Schwaben"
              label="Region / Ort"
            />
          </div>

          {/* Select + number row */}
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <FilterSelect
              label="Typ"
              value={filters.variant}
              onChange={(v) => setFilters((p) => ({ ...p, variant: v as any }))}
              options={[
                ["any", "Alle Typen"],
                ["ready", "Schlüsselfertig"],
                ["build", "Bauprojekt"],
                ["investment", "Investment"],
              ]}
            />
            <FilterSelect
              label="Status"
              value={filters.status}
              onChange={(v) => setFilters((p) => ({ ...p, status: v as any }))}
              options={[
                ["any", "Alle Status"],
                ["verfügbar", "Verfügbar"],
                ["reserviert", "Reserviert"],
                ["in_bau", "In Bau"],
                ["verkauft", "Verkauft"],
              ]}
            />
            <FilterNumber
              label="Preis min (€)"
              value={filters.minPrice ?? ""}
              onChange={(v) => setFilters((p) => ({ ...p, minPrice: v }))}
            />
            <FilterNumber
              label="Preis max (€)"
              value={filters.maxPrice ?? ""}
              onChange={(v) => setFilters((p) => ({ ...p, maxPrice: v }))}
            />
            <FilterNumber
              label="Fläche min (m²)"
              value={filters.minArea ?? ""}
              onChange={(v) => setFilters((p) => ({ ...p, minArea: v }))}
            />
            <FilterNumber
              label="Zimmer min"
              value={filters.minRooms ?? ""}
              onChange={(v) => setFilters((p) => ({ ...p, minRooms: v }))}
            />
          </div>

          {/* Hint */}
          <p className="mt-4 text-[11px] text-[color:var(--color-text-muted)]">
            Tipp: Viele Details und Unterlagen sind „auf Anfrage" verfügbar —
            sprechen Sie uns direkt an.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        <ListingsGrid listings={filtered} />
      </div>
    </section>
  );
}

/* ── Shared field components ─────────────────────────────────────────── */

const fieldBase =
  "w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] px-3.5 py-2.5 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] outline-none transition focus:border-[rgba(214,181,109,0.40)] focus:ring-1 focus:ring-[rgba(214,181,109,0.18)]";

function FilterInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={fieldBase}
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={fieldBase}
      >
        {options.map(([v, t]) => (
          <option key={v} value={v} className="bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterNumber({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => {
          const raw = e.target.value.trim();
          if (!raw) return onChange(undefined);
          const num = globalThis.Number(raw);
          onChange(globalThis.Number.isFinite(num) ? num : undefined);
        }}
        inputMode="numeric"
        placeholder="—"
        className={fieldBase}
      />
    </div>
  );
}
