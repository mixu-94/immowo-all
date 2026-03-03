export default function ObjectDetailLoading() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)]">
      {/* Hero skeleton */}
      <div className="relative h-[60vh] w-full animate-pulse bg-[color:var(--color-surface)]" />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main content skeleton */}
          <div className="space-y-6">
            {/* Title + badges */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-24 animate-pulse rounded-full bg-[color:var(--color-surface-2)]" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-[color:var(--color-surface-2)]" />
              </div>
              <div className="h-9 w-3/4 animate-pulse rounded-xl bg-[color:var(--color-surface-2)]" />
              <div className="h-4 w-1/2 animate-pulse rounded-full bg-[color:var(--color-surface)]" />
            </div>

            {/* Facts grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-2xl bg-[color:var(--color-surface)]"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>

            {/* Description skeleton */}
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded-full bg-[color:var(--color-surface)]"
                  style={{
                    width: `${85 - i * 10}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded-2xl bg-[color:var(--color-surface)]" />
            <div className="h-32 animate-pulse rounded-2xl bg-[color:var(--color-surface)]" />
          </div>
        </div>
      </div>
    </main>
  );
}
