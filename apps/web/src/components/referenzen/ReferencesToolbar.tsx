"use client";

type Props = {
  tags: string[];
  query: string;
  onQueryChange: (v: string) => void;
  activeTag: string | null;
  onTagChange: (v: string | null) => void;
  resultCount: number;
};

export function ReferencesToolbar({
  tags,
  query,
  onQueryChange,
  activeTag,
  onTagChange,
  resultCount,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Projekt, Kategorie, Region, Highlights …"
          className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-2.5 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)] outline-none backdrop-blur transition focus:border-[rgba(214,181,109,0.40)] focus:ring-1 focus:ring-[rgba(214,181,109,0.20)] md:w-[380px]"
        />

        <div className="text-sm text-[color:var(--color-text-muted)]">
          {resultCount}{" "}
          {resultCount === 1 ? "Referenz" : "Referenzen"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagChange(null)}
          className={[
            "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
            activeTag === null
              ? "border border-[rgba(214,181,109,0.45)] bg-[rgba(214,181,109,0.12)] text-[color:var(--color-accent)]"
              : "border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:border-[rgba(214,181,109,0.25)] hover:text-[color:var(--color-text)]",
          ].join(" ")}
        >
          Alle
        </button>

        {tags.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onTagChange(active ? null : tag)}
              className={[
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                active
                  ? "border border-[rgba(214,181,109,0.45)] bg-[rgba(214,181,109,0.12)] text-[color:var(--color-accent)]"
                  : "border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:border-[rgba(214,181,109,0.25)] hover:text-[color:var(--color-text)]",
              ].join(" ")}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
