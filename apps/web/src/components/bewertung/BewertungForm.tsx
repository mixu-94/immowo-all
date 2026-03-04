'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const IMMOBILIEN_TYPEN = [
  'Eigentumswohnung',
  'Einfamilienhaus',
  'Mehrfamilienhaus',
  'Doppelhaushälfte',
  'Reihenhaus',
  'Grundstück',
  'Gewerbeimmobilie',
]

const ZUSTAND_OPTIONS = [
  'Erstbezug / Neubau',
  'Sehr gut (saniert)',
  'Gut (gepflegt)',
  'Befriedigend (teilsaniert)',
  'Renovierungsbedürftig',
]

function Input({
  label,
  required,
  ...props
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          marginBottom: '5px',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}
      </label>
      <input
        {...props}
        required={required}
        style={{
          width: '100%',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '0.9rem',
          color: 'var(--color-text)',
          outline: 'none',
          boxSizing: 'border-box',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(214,181,109,0.50)' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)' }}
      />
    </div>
  )
}

function Select({
  label,
  required,
  options,
  ...props
}: {
  label: string
  required?: boolean
  options: string[]
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          marginBottom: '5px',
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--color-accent)', marginLeft: '3px' }}>*</span>}
      </label>
      <select
        {...props}
        required={required}
        style={{
          width: '100%',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '0.9rem',
          color: 'var(--color-text)',
          outline: 'none',
          boxSizing: 'border-box',
          cursor: 'pointer',
        }}
      >
        <option value="">Bitte wählen …</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

export function BewertungForm() {
  const [state, setState] = useState<FormState>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setError('')

    const fd = new FormData(e.currentTarget)
    const region = fd.get('region') as string
    const typ = fd.get('typ') as string
    const flaeche = fd.get('flaeche') as string
    const baujahr = fd.get('baujahr') as string
    const zustand = fd.get('zustand') as string
    const name = fd.get('name') as string
    const email = fd.get('email') as string
    const phone = fd.get('phone') as string

    const message = [
      'IMMOBILIENBEWERTUNG ANFRAGE',
      '',
      `Objekttyp: ${typ}`,
      `Region / Adresse: ${region}`,
      `Wohnfläche: ${flaeche} m²`,
      `Baujahr: ${baujahr || '-'}`,
      `Zustand: ${zustand || '-'}`,
    ].join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          topic: 'verkauf',
          message,
          callbackRequested: Boolean(phone),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as any).error ?? 'Unbekannter Fehler')
      }

      setState('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Senden fehlgeschlagen.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'var(--color-surface)',
          border: '1px solid rgba(214,181,109,0.25)',
          borderRadius: '16px',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>&#10003;</div>
        <h2
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: '8px',
          }}
        >
          Anfrage erhalten
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto' }}>
          Vielen Dank! Wir melden uns innerhalb von 48 Stunden bei Ihnen mit einer ersten
          Einschätzung.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      {/* Section: Immobilie */}
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '14px',
        }}
      >
        Ihre Immobilie
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
        <Select label="Immobilientyp" name="typ" required options={IMMOBILIEN_TYPEN} />
        <Input
          label="Region / Adresse (Stadt oder Ortsteil genügt)"
          name="region"
          required
          placeholder="z. B. Günzburg, Augsburg-Süd, Ulm"
          type="text"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <Input
            label="Wohnfläche (m²)"
            name="flaeche"
            required
            type="number"
            min="10"
            max="2000"
            placeholder="z. B. 120"
          />
          <Input
            label="Baujahr (optional)"
            name="baujahr"
            type="number"
            min="1850"
            max={new Date().getFullYear()}
            placeholder="z. B. 1998"
          />
        </div>
        <Select label="Zustand (optional)" name="zustand" options={ZUSTAND_OPTIONS} />
      </div>

      {/* Section: Kontakt */}
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '14px',
        }}
      >
        Ihre Kontaktdaten
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
        <Input label="Ihr Name" name="name" required type="text" placeholder="Vorname Nachname" />
        <Input label="E-Mail-Adresse" name="email" required type="email" placeholder="ihre@email.de" />
        <Input
          label="Telefon (optional — für Rückruf)"
          name="phone"
          type="tel"
          placeholder="+49 ..."
        />
      </div>

      {/* Hinweis */}
      <p
        style={{
          fontSize: '0.72rem',
          color: 'var(--color-text-muted)',
          marginBottom: '20px',
          opacity: 0.8,
        }}
      >
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{' '}
        <a
          href="/datenschutz"
          style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
        >
          Datenschutzerklärung
        </a>{' '}
        zu.
      </p>

      {state === 'error' && error && (
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(248,113,113,0.10)',
            border: '1px solid rgba(248,113,113,0.25)',
            color: '#FCA5A5',
            fontSize: '0.83rem',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        style={{
          padding: '13px 28px',
          borderRadius: '10px',
          fontSize: '0.9rem',
          fontWeight: 700,
          border: 'none',
          cursor: state === 'loading' ? 'not-allowed' : 'pointer',
          background:
            state === 'loading'
              ? 'rgba(214,181,109,0.35)'
              : 'var(--color-accent)',
          color: '#0A0F1E',
          transition: 'background 0.15s',
          width: '100%',
        }}
      >
        {state === 'loading' ? 'Wird gesendet …' : 'Kostenlose Bewertung anfordern'}
      </button>
    </form>
  )
}
