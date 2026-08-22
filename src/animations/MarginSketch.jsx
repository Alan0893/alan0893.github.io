import React, { useEffect, useMemo, useState } from 'react'

const GROUND = 690
const INK = '#1a1614'
const PAPER = '#f4efe6'

const mulberry = (seed) => {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const wobbleLine = (x1, y1, x2, y2, rand, steps = 4, amt = 1.1) => {
  let d = `M${x1.toFixed(1)} ${y1.toFixed(1)}`
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const x = x1 + (x2 - x1) * t + (rand() - 0.5) * amt * 2
    const y = y1 + (y2 - y1) * t + (rand() - 0.5) * amt * 2
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

const cloudPath = (cx, cy, s, rand) => {
  const humps = [
    [cx - s * 0.7, cy + 2, s * 0.45, s * 0.22],
    [cx, cy - 2, s * 0.55, s * 0.28],
    [cx + s * 0.65, cy + 1, s * 0.4, s * 0.2],
  ]
  return humps.map(([x, y, rx, ry]) => {
    const j = () => (rand() - 0.5) * 1.6
    return `M${x - rx} ${y}
      C${x - rx + j()} ${y - ry + j()} ${x + j()} ${y - ry + j()} ${x + rx} ${y}
      C${x + rx + j()} ${y + ry * 0.55 + j()} ${x - rx + j()} ${y + ry * 0.55 + j()} ${x - rx} ${y}`
  }).join(' ')
}

const winGrid = (x, y, cols, rows, w, h, gx, gy) => {
  const cells = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({ x: x + col * gx, y: y + row * gy, w, h })
    }
  }
  return cells
}

const BUILDINGS = [
  {
    id: 'brownstones',
    parts: [
      { type: 'rect', x: 12, y: 598, w: 16, h: GROUND - 598 },
      { type: 'rect', x: 31, y: 584, w: 18, h: GROUND - 584 },
      { type: 'rect', x: 52, y: 592, w: 18, h: GROUND - 592 },
      { type: 'line', x1: 12, y1: 606, x2: 28, y2: 606 },
      { type: 'line', x1: 31, y1: 594, x2: 49, y2: 594 },
      { type: 'line', x1: 52, y1: 602, x2: 70, y2: 602 },
      { type: 'rect', x: 17, y: 668, w: 6, h: GROUND - 668 },
      { type: 'rect', x: 37, y: 668, w: 6, h: GROUND - 668 },
      { type: 'rect', x: 57, y: 668, w: 6, h: GROUND - 668 },
    ],
    windows: [
      ...winGrid(16, 614, 2, 3, 4, 7, 6, 16),
      ...winGrid(35, 600, 2, 4, 4, 7, 7, 16),
      ...winGrid(56, 608, 2, 3, 4, 7, 7, 16),
    ],
  },
  {
    id: 'old-north',
    parts: [
      { type: 'rect', x: 76, y: 548, w: 24, h: GROUND - 548 },
      { type: 'rect', x: 82, y: 520, w: 12, h: 28 },
      { type: 'rect', x: 85, y: 498, w: 6, h: 22 },
      { type: 'poly', points: '85,498 88,468 91,498' },
      { type: 'line', x1: 88, y1: 468, x2: 88, y2: 458 },
    ],
    windows: [
      { x: 84, y: 560, w: 8, h: 11 },
      { x: 84, y: 580, w: 8, h: 11 },
      { x: 84, y: 600, w: 8, h: 11 },
    ],
  },
  {
    id: 'state-house',
    parts: [
      { type: 'rect', x: 106, y: 612, w: 50, h: GROUND - 612 },
      { type: 'poly', points: '106,612 131,590 156,612' },
      { type: 'rect', x: 124, y: 572, w: 14, h: 18 },
      { type: 'ellipse', cx: 131, cy: 566, rx: 13, ry: 10, fill: 'rgba(30,64,175,0.18)' },
      { type: 'line', x1: 131, y1: 556, x2: 131, y2: 546 },
      { type: 'line', x1: 114, y1: 612, x2: 114, y2: 640 },
      { type: 'line', x1: 122, y1: 612, x2: 122, y2: 640 },
      { type: 'line', x1: 131, y1: 612, x2: 131, y2: 640 },
      { type: 'line', x1: 140, y1: 612, x2: 140, y2: 640 },
      { type: 'line', x1: 148, y1: 612, x2: 148, y2: 640 },
      { type: 'line', x1: 118, y1: GROUND, x2: 144, y2: GROUND },
    ],
    windows: winGrid(112, 648, 4, 1, 7, 10, 12, 16),
  },
  {
    id: 'custom-house',
    parts: [
      { type: 'rect', x: 162, y: 500, w: 32, h: GROUND - 500 },
      { type: 'poly', points: '166,500 178,418 190,500' },
      { type: 'line', x1: 178, y1: 418, x2: 178, y2: 406 },
      { type: 'circle', cx: 178, cy: 478, r: 6.5 },
      { type: 'line', x1: 178, y1: 478, x2: 178, y2: 473 },
      { type: 'line', x1: 178, y1: 478, x2: 182, y2: 478 },
    ],
    windows: winGrid(168, 512, 3, 9, 5, 8, 8, 18),
  },
  {
    id: 'prudential',
    parts: [
      { type: 'rect', x: 200, y: 348, w: 36, h: GROUND - 348 },
      { type: 'rect', x: 204, y: 340, w: 28, h: 8 },
      { type: 'line', x1: 210, y1: 340, x2: 210, y2: 318 },
      { type: 'line', x1: 226, y1: 340, x2: 226, y2: 322 },
    ],
    windows: winGrid(206, 358, 4, 17, 4, 9, 7, 18),
  },
  {
    id: 'hancock',
    parts: [
      { type: 'poly', points: `242,${GROUND} 242,268 288,246 288,${GROUND}` },
    ],
    windows: Array.from({ length: 21 }, (_, row) => ({
      x: 248,
      y: 278 + row * 18,
      w: 32,
      h: 2,
    })),
  },
  {
    id: 'pier',
    parts: [
      { type: 'rect', x: 294, y: 636, w: 22, h: GROUND - 636 },
      { type: 'rect', x: 300, y: 658, w: 10, h: GROUND - 658 },
    ],
    windows: [
      { x: 298, y: 644, w: 5, h: 6 },
      { x: 307, y: 644, w: 5, h: 6 },
    ],
  },
]

const inkStroke = {
  fill: PAPER,
  stroke: INK,
  strokeWidth: 1.25,
  strokeLinejoin: 'miter',
  strokeLinecap: 'square',
}

const Part = ({ part }) => {
  if (part.type === 'rect') {
    return <rect x={part.x} y={part.y} width={part.w} height={part.h} {...inkStroke} />
  }
  if (part.type === 'poly') {
    return <polygon points={part.points} {...inkStroke} />
  }
  if (part.type === 'ellipse') {
    return (
      <ellipse
        cx={part.cx}
        cy={part.cy}
        rx={part.rx}
        ry={part.ry}
        fill={part.fill || PAPER}
        stroke={INK}
        strokeWidth="1.2"
      />
    )
  }
  if (part.type === 'circle') {
    return <circle cx={part.cx} cy={part.cy} r={part.r} fill={PAPER} stroke={INK} strokeWidth="1.2" />
  }
  return (
    <line
      x1={part.x1}
      y1={part.y1}
      x2={part.x2}
      y2={part.y2}
      stroke={INK}
      strokeWidth="1.2"
      strokeLinecap="square"
    />
  )
}

const DrawStroke = ({ d, delay, duration = 1.15, width = 1.25, opacity = 1, color = INK }) => (
  <path
    d={d}
    pathLength="1"
    fill="none"
    className="skyline-draw"
    style={{
      stroke: color,
      strokeWidth: width,
      opacity,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  />
)

const Plane = () => (
  <g fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-18 0 H-6" opacity="0.28" strokeDasharray="2.4 3.2" />
    <ellipse cx="8" cy="0" rx="11.5" ry="2.15" fill={PAPER} />
    <path d="M14 -2 Q18 -4.8 22 -1.6" />
    <path d="M5 1.1 L-1 6.2 H3 L12 1.1" fill={PAPER} />
    <path d="M-2.2 -0.2 L-7.5 -5.6 L2 -1.6" fill={PAPER} />
    <path d="M-2.4 0.5 L-6.2 3.2" />
    <circle cx="15.2" cy="-0.55" r="0.55" fill={INK} stroke="none" />
    <circle cx="12.4" cy="-0.55" r="0.55" fill={INK} stroke="none" />
    <g transform="translate(20 0)">
      <ellipse className="skyline-prop" cx="0" cy="0" rx="0.4" ry="3.6" fill={INK} stroke="none" />
    </g>
  </g>
)

const Bird = () => (
  <path
    d="M-6 1.5 Q-3 -3.5 0 1 Q3 -3.5 6 1.5"
    fill="none"
    stroke={INK}
    strokeWidth="1.05"
    strokeLinecap="round"
  />
)

const Person = ({ pose = 'stand' }) => {
  const body = (
    <>
      <circle cx="0" cy="-13.4" r="2" fill="none" />
      <path d="M0 -11.3 V-4.2" />
    </>
  )

  if (pose === 'sit') {
    return (
      <g fill="none" stroke={INK} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="0" cy="-9.2" r="1.9" fill="none" />
        <path d="M0 -7.2 V-3 H5.5 V0" />
        <path d="M0 -5 L-3.2 -2.2" />
        <path d="M0 -5 L3.4 -3" />
      </g>
    )
  }

  if (pose === 'walk') {
    return (
      <g fill="none" stroke={INK} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        {body}
        <g className="skyline-stride-a" style={{ transformOrigin: '0px -4.2px' }}>
          <path d="M0 -4.2 L0 0" />
        </g>
        <g className="skyline-stride-b" style={{ transformOrigin: '0px -4.2px' }}>
          <path d="M0 -4.2 L0 0" />
        </g>
        <g className="skyline-stride-b" style={{ transformOrigin: '0px -8.6px' }}>
          <path d="M0 -8.6 L0 -4.8" />
        </g>
        <g className="skyline-stride-a" style={{ transformOrigin: '0px -8.6px' }}>
          <path d="M0 -8.6 L0 -4.8" />
        </g>
      </g>
    )
  }

  if (pose === 'wave') {
    return (
      <g fill="none" stroke={INK} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        {body}
        <path d="M0 -4.2 L-2.2 0" />
        <path d="M0 -4.2 L2.4 0" />
        <path d="M0 -8.8 L-3.2 -6" />
        <g className="skyline-wave-arm" style={{ transformOrigin: '0px -8.8px' }}>
          <path d="M0 -8.8 L3.4 -12.4" />
        </g>
      </g>
    )
  }

  return (
    <g fill="none" stroke={INK} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      {body}
      <path d="M0 -4.2 L-2.4 0" />
      <path d="M0 -4.2 L2.4 0" />
      <path d="M0 -8.6 L-3.4 -5.6" />
      <path d="M0 -8.6 L3.4 -5.6" />
    </g>
  )
}

const Dog = () => (
  <g fill="none" stroke={INK} strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 0 V-3 H6 L8 -1.2 V0" />
    <path d="M0 -3 L-1.4 -5.2" />
    <path d="M6 -3 L8.4 -4.6" />
    <g className="skyline-wag" style={{ transformOrigin: '8px -1.2px' }}>
      <path d="M8 -1.2 L9.4 -3.6" />
    </g>
  </g>
)

const Boat = () => (
  <g fill={PAPER} stroke={INK} strokeWidth="1.2" strokeLinejoin="miter" strokeLinecap="square">
    <path d="M2 16 L6 22 H24 L26 16 Z" />
    <line x1="14" y1="16" x2="14" y2="2" />
    <path d="M14 3 L14 16 L26 16 Z" fill={PAPER} />
  </g>
)

const MarginSketch = () => {
  const scene = useMemo(() => {
    const rand = mulberry(42)
    return {
      ground: `M8 ${GROUND} H318`,
      water: [
        wobbleLine(14, GROUND + 14, 314, GROUND + 18, rand, 11, 1.4),
        wobbleLine(24, GROUND + 28, 300, GROUND + 32, rand, 10, 1.6),
        wobbleLine(40, GROUND + 42, 280, GROUND + 44, rand, 8, 1.2),
      ],
      clouds: [
        { d: cloudPath(56, 72, 34, rand), delay: 5.8 },
        { d: cloudPath(180, 54, 28, rand), delay: 6.3 },
        { d: cloudPath(124, 112, 22, rand), delay: 6.8 },
        { d: cloudPath(260, 140, 26, rand), delay: 7.2 },
      ],
      sun: 'M286 44 a10 10 0 1 1 0.1 0',
    }
  }, [])

  const [life, setLife] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLife(true)
      return undefined
    }
    const id = window.setTimeout(() => setLife(true), 6200)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <aside
      className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden w-[22rem] pr-3 pt-14 min-[1440px]:block 2xl:w-[26rem] 2xl:pr-5 2xl:pt-16"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 820"
        className="h-full w-full overflow-visible"
        fill="none"
        preserveAspectRatio="xMinYMin meet"
      >
        <DrawStroke d={scene.sun} delay={0.2} duration={1.4} width={1.15} color="var(--color-accent)" opacity={0.7} />

        {scene.clouds.map((cloud, i) => (
          <g key={i} className="skyline-cloud">
            <DrawStroke d={cloud.d} delay={cloud.delay} duration={1.8} width={1.05} opacity={0.38} />
          </g>
        ))}

        {life && (
          <>
            <g className="skyline-flock">
              <g transform="translate(0 0)"><g className="skyline-bird"><Bird /></g></g>
              <g transform="translate(14 5)"><g className="skyline-bird"><Bird /></g></g>
              <g transform="translate(26 -2)"><g className="skyline-bird"><Bird /></g></g>
              <g transform="translate(38 4)"><g className="skyline-bird"><Bird /></g></g>
              <g transform="translate(11 12)"><g className="skyline-bird"><Bird /></g></g>
            </g>
            <g className="skyline-flock-late">
              <g transform="scale(-0.85 0.85)">
                <g transform="translate(0 0)"><g className="skyline-bird"><Bird /></g></g>
                <g transform="translate(12 4)"><g className="skyline-bird"><Bird /></g></g>
                <g transform="translate(22 -3)"><g className="skyline-bird"><Bird /></g></g>
              </g>
            </g>
            <g className="skyline-plane">
              <Plane />
            </g>
            <g className="skyline-plane-late">
              <g transform="scale(-1 1)">
                <Plane />
              </g>
            </g>
          </>
        )}

        <DrawStroke d={scene.ground} delay={0.1} duration={1.2} width={1.35} />
        {scene.water.map((d, i) => (
          <DrawStroke key={i} d={d} delay={0.35 + i * 0.25} duration={1.5} width={0.9} opacity={0.35} />
        ))}

        {BUILDINGS.map((building, i) => (
          <g
            key={building.id}
            className="skyline-rise"
            style={{ animationDelay: `${0.55 + i * 0.55}s` }}
          >
            {building.parts.map((part, j) => (
              <Part key={j} part={part} />
            ))}
            {building.windows.map((win, j) => (
              <rect
                key={j}
                x={win.x}
                y={win.y}
                width={win.w}
                height={win.h}
                fill="none"
                stroke={INK}
                strokeWidth="0.85"
                opacity="0.55"
              />
            ))}
          </g>
        ))}

        <g className="skyline-rise" style={{ animationDelay: '5.8s' }}>
          <line x1="72" y1={GROUND} x2="72" y2="656" stroke={INK} strokeWidth="1.2" strokeLinecap="square" />
          <line x1="72" y1="656" x2="78" y2="656" stroke={INK} strokeWidth="1.2" strokeLinecap="square" />
          <circle cx="78" cy="653" r="3" fill="none" stroke={INK} strokeWidth="1.2" />
          <line x1="214" y1={GROUND - 7} x2="232" y2={GROUND - 7} stroke={INK} strokeWidth="1.2" strokeLinecap="square" />
          <line x1="214" y1={GROUND - 7} x2="214" y2={GROUND} stroke={INK} strokeWidth="1.2" strokeLinecap="square" />
          <line x1="232" y1={GROUND - 7} x2="232" y2={GROUND} stroke={INK} strokeWidth="1.2" strokeLinecap="square" />
          <line x1="216" y1={GROUND - 11} x2="230" y2={GROUND - 11} stroke={INK} strokeWidth="1.2" strokeLinecap="square" />
        </g>

        <g className="skyline-boat">
          <g transform="translate(28 702)">
            <Boat />
          </g>
        </g>

        <g transform={`translate(22 ${GROUND})`}>
          <g className="skyline-life skyline-idle">
            <Person pose="wave" />
          </g>
        </g>
        <g transform={`translate(30 ${GROUND})`}>
          <g className="skyline-life skyline-idle-late">
            <Person />
          </g>
        </g>
        <g transform={`translate(38 ${GROUND})`}>
          <g className="skyline-life">
            <Dog />
          </g>
        </g>
        <g transform={`translate(223 ${GROUND - 1})`}>
          <g className="skyline-life skyline-sit">
            <Person pose="sit" />
          </g>
        </g>
        <g transform={`translate(132 ${GROUND})`}>
          <g className="skyline-life skyline-idle">
            <Person />
          </g>
        </g>
        {life && (
          <g className="skyline-walker">
            <Person pose="walk" />
          </g>
        )}
      </svg>
    </aside>
  )
}

export default MarginSketch
