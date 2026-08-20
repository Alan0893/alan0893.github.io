import React, { useEffect, useMemo, useState } from 'react'

const COLS = 6
const ROWS = 6
const TW = 22
const TH = 11
const ZH = 13

const makeSkyline = (seed) => {
  const cells = []
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const n = Math.sin((x + 2.1) * 12.9898 + (y + 1.7) * 78.233 + seed) * 43758.5453
      const r = n - Math.floor(n)
      cells.push({ x, y, h: 1 + Math.floor(r * 5), id: `${x}-${y}` })
    }
  }
  return cells.sort((a, b) => a.x + a.y - (b.x + b.y))
}

const iso = (x, y, z, ox, oy) => [
  ox + (x - y) * TW,
  oy + (x + y) * TH - z * ZH,
]

const toPoly = (pts) => pts.map((p) => p.join(',')).join(' ')

const AxonometricStudy = () => {
  const [seed, setSeed] = useState(1.7)
  const [built, setBuilt] = useState(0)
  const cells = useMemo(() => makeSkyline(seed), [seed])

  useEffect(() => {
    if (built >= cells.length) {
      const pause = setTimeout(() => {
        setSeed((s) => s + 1.37)
        setBuilt(0)
      }, 2200)
      return () => clearTimeout(pause)
    }
    const tick = setTimeout(() => setBuilt((n) => n + 1), 70)
    return () => clearTimeout(tick)
  }, [built, cells.length])

  const ox = 200
  const oy = 92
  const current = cells[Math.min(built, cells.length - 1)]
  const pen = current
    ? iso(current.x + 0.5, current.y + 0.5, current.h, ox, oy)
    : iso(0, 0, 0, ox, oy)

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g fill="none" stroke="#d6cdc0" strokeWidth="0.8">
        <path d="M16 16h18 M16 16v18" />
        <path d="M384 16h-18 M384 16v18" />
        <path d="M16 384h18 M16 384v-18" />
        <path d="M384 384h-18 M384 384v-18" />
      </g>

      <text x="28" y="42" fill="#6f675e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="1.4">
        42.35°N  71.10°W
      </text>
      <text x="372" y="42" fill="#6f675e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" textAnchor="end" letterSpacing="1.4">
        BU / CS
      </text>

      {Array.from({ length: COLS + 1 }, (_, x) =>
        Array.from({ length: ROWS }, (_, y) => {
          const a = iso(x, y, 0, ox, oy)
          const b = iso(x, y + 1, 0, ox, oy)
          return (
            <line
              key={`vx-${x}-${y}`}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke="#d6cdc0"
              strokeWidth="0.6"
            />
          )
        })
      )}
      {Array.from({ length: ROWS + 1 }, (_, y) =>
        Array.from({ length: COLS }, (_, x) => {
          const a = iso(x, y, 0, ox, oy)
          const b = iso(x + 1, y, 0, ox, oy)
          return (
            <line
              key={`hx-${x}-${y}`}
              x1={a[0]}
              y1={a[1]}
              x2={b[0]}
              y2={b[1]}
              stroke="#d6cdc0"
              strokeWidth="0.6"
            />
          )
        })
      )}

      {cells.slice(0, built).map((cell) => {
        const { x, y, h } = cell
        const top = toPoly([
          iso(x, y, h, ox, oy),
          iso(x + 1, y, h, ox, oy),
          iso(x + 1, y + 1, h, ox, oy),
          iso(x, y + 1, h, ox, oy),
        ])
        const right = toPoly([
          iso(x + 1, y, 0, ox, oy),
          iso(x + 1, y + 1, 0, ox, oy),
          iso(x + 1, y + 1, h, ox, oy),
          iso(x + 1, y, h, ox, oy),
        ])
        const left = toPoly([
          iso(x, y + 1, 0, ox, oy),
          iso(x + 1, y + 1, 0, ox, oy),
          iso(x + 1, y + 1, h, ox, oy),
          iso(x, y + 1, h, ox, oy),
        ])
        return (
          <g key={cell.id}>
            <polygon points={left} fill="rgba(26,22,20,0.08)" stroke="#1a1614" strokeWidth="0.9" />
            <polygon points={right} fill="rgba(26,22,20,0.04)" stroke="#1a1614" strokeWidth="0.9" />
            <polygon points={top} fill="rgba(194,65,12,0.12)" stroke="#1a1614" strokeWidth="0.9" />
          </g>
        )
      })}

      <g transform={`translate(${pen[0]}, ${pen[1]})`} stroke="#c2410c" strokeWidth="1.2">
        <line x1="-7" y1="0" x2="7" y2="0" />
        <line x1="0" y1="-7" x2="0" y2="7" />
        <circle r="2.2" fill="#f4efe6" />
      </g>

      <text x="28" y="378" fill="#6f675e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="1.4">
        {String(Math.min(built, cells.length)).padStart(2, '0')} / {String(cells.length).padStart(2, '0')}
      </text>
      <text x="372" y="378" fill="#6f675e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" textAnchor="end" letterSpacing="1.4">
        ISO 30°
      </text>
    </svg>
  )
}

export default AxonometricStudy
