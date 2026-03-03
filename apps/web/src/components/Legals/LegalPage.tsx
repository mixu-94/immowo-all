import React from "react";

type LegalPageProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="w-full bg-[color:var(--color-bg)]">
      <div className="container mx-auto max-w-4xl px-4 pb-16 pt-24">
        {/* Header */}
        <header className="mb-10">
          <div className="border-l-2 border-l-[color:var(--color-accent)] pl-4">
            <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--color-text)]">
              {title}
            </h1>
            {lastUpdated ? (
              <span
                className="mt-3 inline-block rounded-full border px-3 py-0.5 text-xs text-[color:var(--color-accent)]"
                style={{ borderColor: 'rgba(214,181,109,0.4)', backgroundColor: 'rgba(214,181,109,0.05)' }}
              >
                Stand: {lastUpdated}
              </span>
            ) : null}
          </div>
        </header>

        {/* Content Card */}
        <section
          className="rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface-2)] p-6 sm:p-8 border-t-2"
          style={{ borderTopColor: 'rgba(214,181,109,0.3)' }}
        >
          <article
            className={[
              "prose prose-invert max-w-none",
              "prose-p:leading-relaxed prose-p:text-[color:var(--color-text-muted)]",
              "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h2:text-[color:var(--color-accent)]",
              "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-semibold",
              "prose-ul:my-4 prose-ol:my-4",
              "prose-li:my-1 prose-li:text-[color:var(--color-text-muted)]",
              "prose-a:text-[color:var(--color-link)] hover:prose-a:text-[color:var(--color-link-hover)] prose-a:no-underline hover:prose-a:underline",
              "prose-h2:border-b prose-h2:border-[color:var(--color-border)] prose-h2:pb-3",
              "prose-strong:text-[color:var(--color-text)]",
              "prose-blockquote:border-l-[color:var(--color-accent)] prose-blockquote:text-[color:var(--color-text-muted)]",
            ].join(" ")}
          >
            {children}
          </article>
        </section>
      </div>
    </main>
  );
}
