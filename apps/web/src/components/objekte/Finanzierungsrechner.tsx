'use client'

import { useMemo, useState } from 'react'

type Props = {
  initialPrice?: number | null
}

function formatEur(n: number) {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  display?: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>
          {display ?? `${value}${unit ?? ''}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: 'var(--color-accent)',
          height: '4px',
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.68rem',
          color: 'var(--color-text-muted)',
          marginTop: '2px',
          opacity: 0.6,
        }}
      >
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  )
}

function ResultCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: accent ? 'rgba(214,181,109,0.08)' : 'var(--color-surface)',
        border: `1px solid ${accent ? 'rgba(214,181,109,0.25)' : 'var(--color-border)'}`,
        borderRadius: '10px',
        padding: '14px 16px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '0.72rem',
          color: 'var(--color-text-muted)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: accent ? '1.4rem' : '1.05rem',
          fontWeight: 700,
          color: accent ? 'var(--color-accent)' : 'var(--color-text)',
        }}
      >
        {value}
      </div>
    </div>
  )
}

export function Finanzierungsrechner({ initialPrice }: Props) {
  const defaultPrice = initialPrice && initialPrice > 0 ? initialPrice : 450000
  const [kaufpreis, setKaufpreis] = useState(defaultPrice)
  const [eigenkapitalPct, setEigenkapitalPct] = useState(20)
  const [zinssatz, setZinssatz] = useState(3.5)
  const [laufzeit, setLaufzeit] = useState(25)

  const calc = useMemo(() => {
    const eigenkapital = kaufpreis * (eigenkapitalPct / 100)
    const darlehen = kaufpreis - eigenkapital
    const r = zinssatz / 100 / 12 // monthly rate
    const n = laufzeit * 12       // months

    let monatlicheRate: number
    if (r === 0) {
      monatlicheRate = darlehen / n
    } else {
      monatlicheRate = (darlehen * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    }

    const gesamtRueckzahlung = monatlicheRate * n
    const gesamtZinsen = gesamtRueckzahlung - darlehen
    const tilgungspct = ((monatlicheRate - darlehen * r) / darlehen) * 100 * 12

    return {
      eigenkapital,
      darlehen,
      monatlicheRate,
      gesamtRueckzahlung,
      gesamtZinsen,
      tilgungspct: Math.max(0, tilgungspct),
    }
  }, [kaufpreis, eigenkapitalPct, zinssatz, laufzeit])

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '28px',
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: '0 0 4px',
          }}
        >
          Finanzierungsrechner
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
          Richtwert — individuelle Konditionen auf Anfrage
        </p>
      </div>

      {/* Sliders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
        <SliderInput
          label="Kaufpreis"
          value={kaufpreis}
          min={100000}
          max={3000000}
          step={10000}
          display={formatEur(kaufpreis)}
          onChange={setKaufpreis}
        />
        <SliderInput
          label="Eigenkapital"
          value={eigenkapitalPct}
          min={0}
          max={60}
          step={1}
          unit="%"
          display={`${eigenkapitalPct}% (${formatEur(calc.eigenkapital)})`}
          onChange={setEigenkapitalPct}
        />
        <SliderInput
          label="Zinssatz p.a."
          value={zinssatz}
          min={0.5}
          max={8}
          step={0.1}
          display={`${zinssatz.toFixed(1)} %`}
          onChange={setZinssatz}
        />
        <SliderInput
          label="Laufzeit"
          value={laufzeit}
          min={5}
          max={35}
          step={1}
          unit=" Jahre"
          onChange={setLaufzeit}
        />
      </div>

      {/* Results */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
          marginBottom: '16px',
        }}
      >
        <ResultCard
          label="Monatliche Rate"
          value={formatEur(calc.monatlicheRate)}
          accent
        />
        <ResultCard label="Darlehensbetrag" value={formatEur(calc.darlehen)} />
        <ResultCard label="Gesamtzinsen" value={formatEur(calc.gesamtZinsen)} />
        <ResultCard label="Gesamtrückzahlung" value={formatEur(calc.gesamtRueckzahlung)} />
      </div>

      <p
        style={{
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
          margin: '0',
          opacity: 0.7,
          textAlign: 'center',
        }}
      >
        * Berechnung ohne Nebenkosten (Grunderwerbsteuer, Notar, Makler). Kein Finanzierungsangebot.
      </p>
    </div>
  )
}
