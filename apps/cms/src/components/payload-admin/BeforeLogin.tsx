'use client'

export default function BeforeLogin() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '28px',
        gap: '12px',
      }}
    >
      {/* Logo rhombus */}
      <div
        style={{
          position: 'relative',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer rotated square — gold border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1.5px solid rgba(201,169,110,0.65)',
            borderRadius: '6px',
            transform: 'rotate(45deg)',
          }}
        />
        {/* Inner navy square */}
        <div
          style={{
            width: '18px',
            height: '18px',
            background: '#050B1A',
            border: '1.5px solid rgba(201,169,110,0.40)',
            borderRadius: '3px',
            transform: 'rotate(45deg)',
          }}
        />
      </div>

      {/* Brand name */}
      <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '-0.01em',
          }}
        >
          Immowo Ventures
        </div>
        <div
          style={{
            marginTop: '4px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(201,169,110,0.80)',
          }}
        >
          Makler-Portal
        </div>
      </div>

      {/* Gold divider */}
      <div
        style={{
          width: '64px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.45), transparent)',
        }}
      />
    </div>
  )
}
