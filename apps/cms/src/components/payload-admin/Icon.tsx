import React from 'react'

export default function Icon() {
  return (
    <div
      style={{
        width: '24px',
        height: '24px',
        background: 'linear-gradient(135deg, #C9A96E 0%, #E0C990 50%, #C9A96E 100%)',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(45deg)',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          background: '#050B1A',
          borderRadius: '2px',
        }}
      />
    </div>
  )
}
