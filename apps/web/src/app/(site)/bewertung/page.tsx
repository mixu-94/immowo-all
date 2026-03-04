import type { Metadata } from 'next'
import { BewertungForm } from '@/components/bewertung/BewertungForm'

export const metadata: Metadata = {
  title: 'Kostenlose Immobilienbewertung | Immowo Ventures',
  description:
    'Lassen Sie Ihre Immobilie unverbindlich und kostenlos bewerten. Unsere Experten in Schwaben und der Region Augsburg/G\u00fcnzburg sch\u00e4tzen den Marktwert Ihrer Immobilie.',
  robots: { index: true, follow: true },
}

export default function BewertungPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(214,181,109,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: '1px solid rgba(214,181,109,0.35)',
              color: 'var(--color-accent)',
              background: 'rgba(214,181,109,0.07)',
            }}
          >
            Kostenlos &amp; unverbindlich
          </span>
          <h1
            className="mb-4 text-3xl font-bold md:text-4xl"
            style={{ color: 'var(--color-text)' }}
          >
            Was ist Ihre Immobilie wert?
          </h1>
          <p
            className="mx-auto max-w-xl text-base leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Unsere Experten für die Region Schwaben analysieren Marktlage, Zustand und Lage Ihrer
            Immobilie und geben Ihnen eine fundierte Einschätzung — kostenlos und ohne
            Verpflichtung.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        className="pb-24"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="mx-auto max-w-2xl px-6">
          <BewertungForm />
        </div>
      </section>

      {/* Trust */}
      <section
        className="border-t py-16"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 text-center md:grid-cols-3">
            {[
              { label: '100\u00a0%', sub: 'Kostenlos &amp; unverbindlich' },
              { label: '48\u00a0h', sub: 'R\u00fcckmeldung innerhalb von 48 Stunden' },
              { label: '15+ Jahre', sub: 'Marktkenntnis in der Region' },
            ].map(({ label, sub }) => (
              <div key={label}>
                <div
                  className="mb-1 text-2xl font-bold"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {label}
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                  dangerouslySetInnerHTML={{ __html: sub }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
