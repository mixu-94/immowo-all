import React from 'react'

export default function Logo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '4px 0',
      }}
    >
      {/* Gold diamond icon */}
      <div
        style={{
          width: '28px',
          height: '28px',
          background: 'linear-gradient(135deg, #C9A96E 0%, #E0C990 50%, #C9A96E 100%)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transform: 'rotate(45deg)',
        }}
      >
        <div
          style={{
            width: '10px',
            height: '10px',
            background: '#050B1A',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Wordmark */}
      <div style={{ lineHeight: 1 }}>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.02em',
          }}
        >
          Immowo
        </div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 500,
            color: '#C9A96E',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Ventures
        </div>
      </div>
    </div>
  )
}
