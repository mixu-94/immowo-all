'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import deLocale from '@fullcalendar/core/locales/de'
import type { DatesSetArg, EventClickArg, EventInput } from '@fullcalendar/core'
import { useAuth } from '@payloadcms/ui'

// ─── Types ────────────────────────────────────────────────────────────────────

type TerminDoc = {
  id: number | string
  date: string
  startTime?: string
  durationMinutes?: number
  status?: 'geplant' | 'bestaetigt' | 'absolviert' | 'storniert'
  customerName?: string
  makler?: { id: number | string; name?: string } | number | string | null
}

type FilterMode = 'all' | 'own'

// ─── Status colors ────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  geplant:    { bg: '#D6B56D', text: '#0A0F1E' },
  bestaetigt: { bg: '#34D399', text: '#0A0F1E' },
  absolviert: { bg: '#64748B', text: '#ffffff' },
  storniert:  { bg: '#F87171', text: '#ffffff' },
}

const STATUS_LABELS: Record<string, string> = {
  geplant:    'Geplant',
  bestaetigt: 'Best\u00e4tigt',
  absolviert: 'Absolviert',
  storniert:  'Storniert',
}

// ─── Convert Termin to FullCalendar EventInput ────────────────────────────────

function terminToEvent(t: TerminDoc, ownMaklerId: string | null): EventInput {
  const dateStr = t.date ? t.date.split('T')[0] : ''
  const time = t.startTime ?? '09:00'
  const start = dateStr ? `${dateStr}T${time}` : dateStr

  const durationMs = (t.durationMinutes ?? 30) * 60 * 1000
  const endDate = start
    ? new Date(new Date(start).getTime() + durationMs).toISOString()
    : undefined

  const s = t.status ?? 'geplant'
  const colors = STATUS_COLORS[s] ?? STATUS_COLORS.geplant

  const maklerId =
    t.makler == null
      ? null
      : typeof t.makler === 'object' && 'id' in t.makler
        ? String((t.makler as { id: number | string }).id)
        : String(t.makler)

  const maklerName =
    t.makler != null && typeof t.makler === 'object' && 'name' in t.makler
      ? (t.makler as { name?: string }).name ?? null
      : null

  return {
    id: String(t.id),
    title: t.customerName ?? 'Termin',
    start,
    end: endDate,
    backgroundColor: colors.bg,
    borderColor: colors.bg,
    textColor: colors.text,
    extendedProps: {
      status: s,
      maklerName,
      maklerId,
      time,
      isOwn: ownMaklerId != null && maklerId === ownMaklerId,
    },
  }
}

// ─── Inject dark-theme CSS once ───────────────────────────────────────────────

const CALENDAR_CSS = `
.imw-fc .fc {
  --fc-border-color: rgba(255,255,255,0.10);
  --fc-button-bg-color: rgba(255,255,255,0.06);
  --fc-button-border-color: rgba(255,255,255,0.14);
  --fc-button-hover-bg-color: rgba(255,255,255,0.10);
  --fc-button-hover-border-color: rgba(255,255,255,0.22);
  --fc-button-active-bg-color: rgba(214,181,109,0.20);
  --fc-button-active-border-color: rgba(214,181,109,0.50);
  --fc-button-text-color: rgba(255,255,255,0.80);
  --fc-today-bg-color: rgba(214,181,109,0.07);
  --fc-page-bg-color: transparent;
  --fc-neutral-bg-color: rgba(255,255,255,0.03);
  --fc-list-event-hover-bg-color: rgba(255,255,255,0.06);
  font-family: inherit;
}
.imw-fc .fc-theme-standard td,
.imw-fc .fc-theme-standard th,
.imw-fc .fc-theme-standard .fc-scrollgrid { border-color: rgba(255,255,255,0.08); }
.imw-fc .fc-col-header-cell-cushion,
.imw-fc .fc-daygrid-day-number,
.imw-fc .fc-list-event-title,
.imw-fc .fc-list-event-time,
.imw-fc .fc-list-day-text,
.imw-fc .fc-list-day-side-text { color: rgba(255,255,255,0.70); text-decoration: none; }
.imw-fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number { color: #D6B56D; font-weight: 700; }
.imw-fc .fc-button { text-transform: capitalize; font-size: 0.78rem; padding: 3px 10px; border-radius: 6px; font-weight: 500; }
.imw-fc .fc-button-primary:not(:disabled).fc-button-active,
.imw-fc .fc-button-primary:not(:disabled):active { background-color: rgba(214,181,109,0.20) !important; border-color: rgba(214,181,109,0.45) !important; color: #D6B56D !important; }
.imw-fc .fc-toolbar-title { font-size: 0.95rem; font-weight: 600; color: rgba(255,255,255,0.88); }
.imw-fc .fc-daygrid-day-number { font-size: 0.78rem; padding: 4px 6px; }
.imw-fc .fc-event { cursor: pointer; border-radius: 4px; font-size: 0.72rem; padding: 1px 4px; }
.imw-fc .fc-event:hover { filter: brightness(1.1); }
.imw-fc .fc-timegrid-slot { height: 2em; }
.imw-fc .fc-timegrid-axis, .imw-fc .fc-timegrid-slot-label { color: rgba(255,255,255,0.40); font-size: 0.72rem; }
.imw-fc .fc-list-event td { border-color: rgba(255,255,255,0.05); }
.imw-fc .fc-list-day-cushion { background: rgba(255,255,255,0.04); }
.imw-fc .fc-direction-ltr .fc-list-day-side-text { color: rgba(214,181,109,0.80); }
.imw-fc .fc-more-link { color: rgba(214,181,109,0.80); font-size: 0.68rem; }
`

function injectCalendarCss() {
  if (typeof document === 'undefined') return
  if (document.getElementById('imw-fc-css')) return
  const style = document.createElement('style')
  style.id = 'imw-fc-css'
  style.textContent = CALENDAR_CSS
  document.head.appendChild(style)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MaklerKalender() {
  const { user } = useAuth()
  const calRef = useRef<FullCalendar>(null)
  const mountedRef = useRef(true)

  const [allEvents, setAllEvents] = useState<EventInput[]>([])
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    injectCalendarCss()
    return () => { mountedRef.current = false }
  }, [])

  // Resolve makler profile id for "own" filter
  const ownMaklerId: string | null = (() => {
    const mp = (user as any)?.maklerProfile
    if (mp == null) return null
    if (typeof mp === 'object') return mp.id != null ? String(mp.id) : null
    return String(mp)
  })()

  const isMakler = (user as any)?.role === 'makler'

  // Fetch Termine for visible date range
  const fetchTermine = useCallback(
    async (start: Date, end: Date) => {
      if (!mountedRef.current) return
      setLoading(true)
      setError(null)
      try {
        const gte = start.toISOString().split('T')[0]
        const lte = end.toISOString().split('T')[0]
        const res = await fetch(
          `/api/termine?where[date][greater_than_equal]=${gte}&where[date][less_than_equal]=${lte}&limit=500&sort=date&depth=1`,
          { credentials: 'include' },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!mountedRef.current) return
        const docs: TerminDoc[] = json.docs ?? []
        setAllEvents(docs.map((t) => terminToEvent(t, ownMaklerId)))
      } catch {
        if (mountedRef.current) setError('Termine konnten nicht geladen werden.')
      } finally {
        if (mountedRef.current) setLoading(false)
      }
    },
    [ownMaklerId],
  )

  // Initial load
  useEffect(() => {
    const now = new Date()
    fetchTermine(
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
      new Date(now.getFullYear(), now.getMonth() + 2, 0),
    )
  }, [fetchTermine])

  const handleDatesSet = useCallback(
    (info: DatesSetArg) => { fetchTermine(info.start, info.end) },
    [fetchTermine],
  )

  const handleEventClick = useCallback((info: EventClickArg) => {
    info.jsEvent.preventDefault()
    window.location.href = `/admin/collections/termine/${info.event.id}`
  }, [])

  // Apply own/all filter
  const visibleEvents =
    filterMode === 'own' && ownMaklerId
      ? allEvents.filter((e) => (e as any).extendedProps?.isOwn)
      : allEvents

  const ownCount = ownMaklerId
    ? allEvents.filter((e) => (e as any).extendedProps?.isOwn).length
    : 0

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <FilterBtn active={filterMode === 'all'} onClick={() => setFilterMode('all')}>
            Alle Makler
          </FilterBtn>
          {(isMakler || ownMaklerId) && (
            <FilterBtn active={filterMode === 'own'} onClick={() => setFilterMode('own')}>
              Nur meine{ownCount > 0 ? ` (${ownCount})` : ''}
            </FilterBtn>
          )}
          {loading && (
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginLeft: '6px' }}>
              L\u00e4dt\u2026
            </span>
          )}
          {error && (
            <span style={{ fontSize: '0.72rem', color: '#F87171' }}>{error}</span>
          )}
        </div>

        <a
          href="/admin/collections/termine/create"
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            border: '1px solid rgba(214,181,109,0.35)',
            backgroundColor: 'rgba(214,181,109,0.10)',
            color: '#D6B56D',
            textDecoration: 'none',
          }}
        >
          + Neuer Termin
        </a>
      </div>

      {/* Calendar */}
      <div
        className="imw-fc"
        style={{
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '10px',
          padding: '12px 10px',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <FullCalendar
          ref={calRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          initialView="dayGridMonth"
          locale={deLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth',
          }}
          buttonText={{ today: 'Heute', month: 'Monat', week: 'Woche', list: 'Liste' }}
          events={visibleEvents}
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          height="auto"
          firstDay={1}
          nowIndicator
          dayMaxEvents={3}
          moreLinkText={(n) => `+${n}`}
          noEventsText="Keine Termine"
          eventTimeFormat={{ hour: '2-digit', minute: '2-digit', meridiem: false }}
          eventContent={(info) => {
            const { time, maklerName } = info.event.extendedProps as {
              time: string
              maklerName: string | null
            }
            return (
              <div style={{ padding: '1px 3px', lineHeight: 1.25, overflow: 'hidden' }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: '0.70rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {time} {info.event.title}
                </div>
                {maklerName && (
                  <div
                    style={{
                      fontSize: '0.62rem',
                      opacity: 0.75,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {maklerName}
                  </div>
                )}
              </div>
            )
          }}
        />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '3px',
                background: STATUS_COLORS[key]?.bg ?? '#888',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: '0.70rem', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Small helper component ───────────────────────────────────────────────────

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '3px 11px',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 500,
        border: '1px solid',
        cursor: 'pointer',
        borderColor: active ? 'rgba(214,181,109,0.50)' : 'rgba(255,255,255,0.14)',
        backgroundColor: active ? 'rgba(214,181,109,0.12)' : 'rgba(255,255,255,0.04)',
        color: active ? '#D6B56D' : 'rgba(255,255,255,0.60)',
        transition: 'all 0.12s',
      }}
    >
      {children}
    </button>
  )
}
