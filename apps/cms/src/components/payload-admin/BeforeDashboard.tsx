'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@payloadcms/ui'

type CountState = {
  verfuegbar: number
  reserviert: number
  verkauft: number
  drafts: number
}

type RecentItem = {
  id: string | number
  title?: string
  slug?: string
  updatedAt?: string
  _status?: 'draft' | 'published'
  vermarktungsStatus?: string
}

function formatDate(input?: string) {
  if (!input) return '—'
  const d = new Date(input)
  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
}

async function fetchCount(url: string) {
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) throw new Error(`Count fetch failed: ${res.status}`)
  const data = (await res.json()) as { totalDocs?: number }
  return data.totalDocs ?? 0
}

export default function BeforeDashboard() {
  const { user } = useAuth()
  const isMakler = (user as any)?.role === 'makler'

  const [counts, setCounts] = useState<CountState>({
    verfuegbar: 0,
    reserviert: 0,
    verkauft: 0,
    drafts: 0,
  })
  const [recent, setRecent] = useState<RecentItem[]>([])
  const [loading, setLoading] = useState(true)

  // Build URLs (Payload REST)
  const urls = useMemo(() => {
    // published + status counts
    const base = '/api/immobilien?limit=0'
    const published = '&where[_status][equals]=published'
    return {
      verfuegbar: `${base}${published}&where[vermarktungsStatus][equals]=verfuegbar`,
      reserviert: `${base}${published}&where[vermarktungsStatus][equals]=reserviert`,
      verkauft: `${base}${published}&where[vermarktungsStatus][equals]=verkauft`,
      drafts: `${base}&where[_status][equals]=draft`,
      recent: '/api/immobilien?limit=6&sort=-updatedAt',
    }
  }, [])

  useEffect(() => {
    let mounted = true

    async function run() {
      try {
        setLoading(true)
        const [verfuegbar, reserviert, verkauft, drafts] = await Promise.all([
          fetchCount(urls.verfuegbar),
          fetchCount(urls.reserviert),
          fetchCount(urls.verkauft),
          fetchCount(urls.drafts),
        ])

        const recentRes = await fetch(urls.recent, { credentials: 'include' })
        const recentJson = (await recentRes.json()) as { docs?: RecentItem[] }
        const docs = recentJson.docs ?? []

        if (!mounted) return
        setCounts({ verfuegbar, reserviert, verkauft, drafts })
        setRecent(docs)
      } catch {
        // If access rules block public fetch, we still render UI.
        if (!mounted) return
      } finally {
        if (mounted) setLoading(false)
      }
    }

    run()
    return () => {
      mounted = false
    }
  }, [urls])

  return (
    <section className="mb-6 space-y-4">
      {/* Hero */}
      <div
        className="
          rounded-[22px]
          border border-[rgba(255,255,255,0.10)]
          bg-[rgba(255,255,255,0.04)]
          p-5
          shadow-[0_24px_70px_rgba(0,0,0,0.45)]
        "
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[var(--immowo-accent)]" />
              {isMakler ? 'MAKLER \u2022 PORTAL' : 'IMMOBILIEN \u2022 DASHBOARD'}
            </div>

            <h1 className="mt-3 text-lg font-semibold tracking-tight text-white md:text-xl">
              {isMakler
                ? 'Willkommen im Makler-Portal'
                : '\u00dcberblick & Verwaltung'}
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/70">
              {isMakler
                ? 'Immobilien anlegen und verwalten \u2013 Ihr pers\u00f6nliches Portal bei Immowo Ventures.'
                : 'Immobilien anlegen, pflegen und ver\u00f6ffentlichen \u2013 inklusive Medien, Expos\u00e9 und SEO.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/collections/immobilien/create"
              className="
                inline-flex items-center justify-center rounded-full
                bg-[var(--immowo-accent)] px-5 py-2.5 text-sm font-semibold text-black
                transition hover:brightness-110 active:scale-[0.99]
              "
            >
              + Neue Immobilie
            </Link>
            <Link
              href="/admin/collections/immobilien"
              className="
                inline-flex items-center justify-center rounded-full
                border border-[rgba(214,181,109,0.28)]
                bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/90
                transition hover:bg-white/[0.06] active:scale-[0.99]
              "
            >
              Immobilien verwalten
            </Link>
            {!isMakler && (
              <Link
                href="/admin/collections/media"
                className="
                  inline-flex items-center justify-center rounded-full
                  border border-white/10 bg-white/[0.03]
                  px-5 py-2.5 text-sm font-semibold text-white/80
                  transition hover:bg-white/[0.06] active:scale-[0.99]
                "
              >
                Medien
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Makler-Kalender-Teaser */}
      {isMakler && (
        <div className="rounded-2xl border border-[rgba(214,181,109,0.20)] bg-white/[0.04] p-5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Kalender & Terminvergabe</span>
            <span className="rounded-full border border-[rgba(214,181,109,0.30)] bg-[rgba(214,181,109,0.08)] px-2 py-0.5 text-[11px] font-semibold text-[var(--immowo-accent)]">
              Demnächst
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Automatische Terminvergabe f\u00fcr Besichtigungen direkt \u00fcber die Website \u2013 dieses Feature kommt bald.
          </p>
        </div>
      )}

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Verfügbar"
          value={loading ? '…' : String(counts.verfuegbar)}
          subtitle="Aktive Objekte"
        />
        <KpiCard
          title="Reserviert"
          value={loading ? '…' : String(counts.reserviert)}
          subtitle="Mit Reservierung"
        />
        <KpiCard
          title="Verkauft"
          value={loading ? '…' : String(counts.verkauft)}
          subtitle="Abgeschlossen"
        />
        <KpiCard
          title="Entwürfe"
          value={loading ? '…' : String(counts.drafts)}
          subtitle="Noch nicht live"
          accent
        />
      </div>

      {/* Recent + Tips */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">Zuletzt bearbeitet</div>
            <Link
              href="/admin/collections/immobilien"
              className="text-xs font-semibold text-white/70 underline underline-offset-4 hover:text-white"
            >
              Alle ansehen
            </Link>
          </div>

          <div className="mt-3 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/20">
            {recent.length === 0 ? (
              <div className="p-4 text-sm text-white/65">
                Noch keine Einträge – legen Sie eine Immobilie an.
              </div>
            ) : (
              recent.map((r) => (
                <Link
                  key={String(r.id)}
                  href={`/admin/collections/immobilien/${r.id}`}
                  className="flex items-center justify-between gap-3 p-4 hover:bg-white/[0.04]"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">
                      {r.title ?? 'Ohne Titel'}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                      <span>Aktualisiert: {formatDate(r.updatedAt)}</span>
                      <Dot />
                      <StatusPill status={r._status} />
                      {r.vermarktungsStatus ? (
                        <>
                          <Dot />
                          <span className="font-semibold text-white/70">
                            {labelVermarktung(r.vermarktungsStatus)}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-white/60">Öffnen →</span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(214,181,109,0.20)] bg-white/[0.04] p-5">
          <div className="text-sm font-semibold text-white">Schnellstart</div>
          <ul className="mt-2 space-y-2 text-sm text-white/70">
            <li>1) Objekt anlegen (Titel, Ort, Status)</li>
            <li>2) Medien hochladen &amp; zuweisen</li>
            <li>3) Entwurf prüfen → veröffentlichen</li>
          </ul>

          <div className="my-4 h-px w-full bg-[linear-gradient(90deg,rgba(214,181,109,0.06),rgba(255,255,255,0.10),rgba(214,181,109,0.06))]" />

          <p className="text-sm leading-relaxed text-white/70">
            Tipp: Achten Sie auf vollständige Eckdaten und einen guten Alt-Text bei Bildern – das
            wirkt professionell und verbessert SEO.
          </p>
        </div>
      </div>
    </section>
  )
}

function KpiCard({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string
  value: string
  subtitle: string
  accent?: boolean
}) {
  return (
    <div
      className={[
        'rounded-2xl border bg-white/[0.04] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.28)]',
        accent ? 'border-[rgba(214,181,109,0.25)]' : 'border-white/10',
      ].join(' ')}
    >
      <div className="text-xs font-semibold uppercase tracking-widest text-white/60">{title}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-sm text-white/65">{subtitle}</div>
      <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,rgba(214,181,109,0.06),rgba(255,255,255,0.10),rgba(214,181,109,0.06))]" />
      <div className="mt-3 text-xs text-white/55">
        Öffnen Sie die Liste, um Status &amp; Veröffentlichungen schnell zu verwalten.
      </div>
    </div>
  )
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-white/30" />
}

function StatusPill({ status }: { status?: 'draft' | 'published' }) {
  const s = status ?? 'draft'
  const label = s === 'published' ? 'Veröffentlicht' : 'Entwurf'
  const cls =
    s === 'published'
      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
      : 'border-white/15 bg-white/[0.04] text-white/70'

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${cls}`}
    >
      {label}
    </span>
  )
}

function labelVermarktung(v: string) {
  switch (v) {
    case 'verfuegbar':
      return 'Verfügbar'
    case 'reserviert':
      return 'Reserviert'
    case 'verkauft':
      return 'Verkauft'
    case 'in_bau':
      return 'In Bau'
    default:
      return v
  }
}
