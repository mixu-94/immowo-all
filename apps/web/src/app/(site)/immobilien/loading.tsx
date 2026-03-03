export default function ImmobilienLoading() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Page heading skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-3 w-16 animate-pulse rounded-full bg-[color:var(--color-surface-2)]" />
          <div className="h-9 w-72 animate-pulse rounded-xl bg-[color:var(--color-surface-2)]" />
          <div className="h-4 w-80 animate-pulse rounded-full bg-[color:var(--color-surface)]" />
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-8 flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full bg-[color:var(--color-surface-2)]"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>

        {/* Grid skeleton — 3x3 cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-[color:var(--color-surface-2)]" />
              {/* Content placeholder */}
              <div className="space-y-3 p-5">
                <div className="h-3 w-16 rounded-full bg-[color:var(--color-surface-2)]" />
                <div className="h-5 w-3/4 rounded-lg bg-[color:var(--color-surface-2)]" />
                <div className="h-3 w-1/2 rounded-full bg-[color:var(--color-surface-2)]" />
                <div className="mt-4 h-4 w-28 rounded-full bg-[color:var(--color-surface-2)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
