'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@payloadcms/ui'

type Termin = {
  id: string | number
  date: string
  startTime: string
  durationMinutes: number
  customerName: string
  customerEmail: string
  status: string
  makler?: string | number | { id: string | number }
  listing?: string | number | { id: string | number; title?: string }
}

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const MONTH_NAMES = [
  'Januar', 'Februar', 'M\u00e4rz', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
]

function statusLabel(s: string) {
  switch (s) {
    case 'geplant': return 'Geplant'
    case 'bestaetigt': return 'Best\u00e4tigt'
    case 'absolviert': return 'Absolviert'
    case 'storniert': return 'Storniert'
    default: return s
  }
}

function statusColor(s: string) {
  switch (s) {
    case 'bestaetigt': return 'rgba(52,211,153,0.85)'
    case 'absolviert': return 'rgba(148,163,184,0.85)'
    case 'storniert': return 'rgba(248,113,113,0.85)'
    default: return 'rgba(214,181,109,0.9)' // geplant = gold
  }
}

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function parseLocalDate(isoStr: string) {
  // Payload stores dates as ISO strings — parse just the date part
  return isoStr.slice(0, 10)
}

export default function MaklerKalender() {
  const { user } = useAuth()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [termine, setTermine] = useState<Termin[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSelectedDay(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setSelectedDay(null)

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const gte = firstDay.toISOString()
    const lte = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate(), 23, 59, 59).toISOString()

    fetch(
      `/api/termine?where[date][greater_than_equal]=${encodeURIComponent(gte)}&where[date][less_than_equal]=${encodeURIComponent(lte)}&limit=200&sort=date`,
      { credentials: 'include' },
    )
      .then((r) => r.json())
      .then((data: { docs?: Termin[] }) => {
        if (mounted) setTermine(data.docs ?? [])
      })
      .catch(() => {
        if (mounted) setTermine([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [month, year])

  // Build calendar grid (Mo–So, 5 or 6 weeks)
  const firstOfMonth = new Date(year, month, 1)
  // getDay(): 0=Sun,1=Mon,...,6=Sat → convert to Mon-based index (0=Mon,...,6=Sun)
  const startOffset = (firstOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7

  // Group termine by date string (YYYY-MM-DD)
  const termineByDay: Record<string, Termin[]> = {}
  for (const t of termine) {
    const d = parseLocalDate(t.date)
    if (!termineByDay[d]) termineByDay[d] = []
    termineByDay[d].push(t)
  }

  const todayStr = isoDate(now.getFullYear(), now.getMonth(), now.getDate())

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const selectedDayTermine = selectedDay ? (termineByDay[selectedDay] ?? []) : []

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ borderColor: 'rgba(214,181,109,0.20)', background: 'rgba(255,255,255,0.04)' }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Vorheriger Monat"
          >
            ‹
          </button>
          <h3 className="text-sm font-semibold text-white">
            {MONTH_NAMES[month]} {year}
          </h3>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="N\u00e4chster Monat"
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-[11px] text-white/40">L\u00e4dt…</span>
          )}
          <a
            href="/admin/collections/termine/create"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold text-black transition hover:brightness-110"
            style={{ background: 'var(--immowo-accent, #d6b56d)' }}
          >
            + Termin
          </a>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="mb-1 grid grid-cols-7 gap-px">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-semibold uppercase tracking-widest text-white/40">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="relative grid grid-cols-7 gap-px" ref={dropdownRef}>
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - startOffset + 1
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth
          if (!isCurrentMonth) {
            return <div key={i} className="h-14 rounded-lg" />
          }
          const dateStr = isoDate(year, month, dayNum)
          const dayTermine = termineByDay[dateStr] ?? []
          const isToday = dateStr === todayStr
          const isSelected = selectedDay === dateStr
          const hasDots = dayTermine.length > 0

          return (
            <div
              key={dateStr}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setSelectedDay(isSelected ? null : dateStr)}
                className={[
                  'flex h-14 w-full flex-col items-center justify-start rounded-lg border pt-1.5 text-[12px] font-semibold transition',
                  isToday
                    ? 'border-[rgba(214,181,109,0.50)] bg-[rgba(214,181,109,0.08)] text-white'
                    : isSelected
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-transparent bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-white',
                ].join(' ')}
              >
                <span>{dayNum}</span>
                {hasDots && (
                  <div className="mt-1 flex gap-0.5">
                    {dayTermine.slice(0, 3).map((t) => (
                      <span
                        key={t.id}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: statusColor(t.status) }}
                      />
                    ))}
                    {dayTermine.length > 3 && (
                      <span className="text-[9px] leading-none text-white/50">+{dayTermine.length - 3}</span>
                    )}
                  </div>
                )}
              </button>

              {/* Dropdown for selected day */}
              {isSelected && (
                <div
                  className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl border border-white/15 p-3 shadow-2xl"
                  style={{ background: 'rgba(10,20,40,0.97)', backdropFilter: 'blur(12px)' }}
                >
                  <div className="mb-2 text-[11px] font-semibold text-white/60">
                    {new Intl.DateTimeFormat('de-DE', { dateStyle: 'long' }).format(new Date(year, month, dayNum))}
                  </div>
                  {selectedDayTermine.length === 0 ? (
                    <p className="text-xs text-white/50">Keine Termine</p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedDayTermine.map((t) => (
                        <li key={t.id}>
                          <a
                            href={`/admin/collections/termine/${t.id}`}
                            className="block rounded-lg border border-white/8 bg-white/5 px-2.5 py-2 hover:bg-white/10"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ background: statusColor(t.status) }}
                              />
                              <span className="text-[12px] font-semibold text-white">
                                {t.startTime} — {t.customerName}
                              </span>
                            </div>
                            <div className="mt-0.5 text-[11px] text-white/50">
                              {statusLabel(t.status)} · {t.durationMinutes} Min.
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={`/admin/collections/termine/create`}
                    className="mt-2 block rounded-lg border border-white/10 px-2.5 py-1.5 text-center text-[11px] font-semibold text-white/70 hover:bg-white/8 hover:text-white"
                  >
                    + Termin hinzuf\u00fcgen
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-3 border-t border-white/8 pt-3">
        {[
          { label: 'Geplant', color: 'rgba(214,181,109,0.9)' },
          { label: 'Best\u00e4tigt', color: 'rgba(52,211,153,0.85)' },
          { label: 'Storniert', color: 'rgba(248,113,113,0.85)' },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] text-white/50">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-white/30">
          {termine.length > 0 ? `${termine.length} Termin${termine.length !== 1 ? 'e' : ''} im Monat` : ''}
        </span>
      </div>
    </div>
  )
}
