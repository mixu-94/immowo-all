export default function Loading() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Header skeleton */}
        <div className="mb-10 space-y-4">
          <div className="h-3 w-20 animate-pulse rounded-full bg-[color:var(--color-surface-2)]" />
          <div className="h-8 w-64 animate-pulse rounded-xl bg-[color:var(--color-surface-2)]" />
          <div className="h-4 w-96 animate-pulse rounded-full bg-[color:var(--color-surface)]" />
        </div>
        {/* Content skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 w-full animate-pulse rounded-2xl bg-white/5"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
