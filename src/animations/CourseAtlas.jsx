import React, { useEffect, useMemo, useState } from 'react'

const SHORT = {
  'Cloud Computing': 'Cloud',
  Bioinformatics: 'Bioinfo.',
  'Machine Learning': 'ML',
  'Mobile App Development': 'Mobile',
  'Data Science Tools & Applications': 'Data Sci.',
  'Distributed Systems': 'Distributed',
  'Database Systems': 'Databases',
  'Software Engineering': 'SE',
  'Web Application Development': 'Web',
  'Analysis of Algorithms': 'Algorithms',
  'Functional Programming': 'FP',
  'Computer Systems': 'Systems',
  'Data Structures & OOP': 'DS / OOP',
}

const CourseAtlas = ({ courses = [] }) => {
  const [scan, setScan] = useState(0)

  const stars = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5))
    return courses.map((name, i) => {
      const a = i * golden - Math.PI / 2
      const r = 52 + (i % 4) * 26
      return { name, short: SHORT[name] || name, a, r, i }
    })
  }, [courses])

  useEffect(() => {
    const id = setInterval(() => {
      setScan((s) => (s + 1.6) % 360)
    }, 40)
    return () => clearInterval(id)
  }, [])

  const cx = 200
  const cy = 200
  const scanRad = (scan * Math.PI) / 180
  const wrap = (a) => {
    const twoPi = Math.PI * 2
    return ((a % twoPi) + twoPi) % twoPi
  }
  const active = stars.reduce((best, star) => {
    let diff = Math.abs(wrap(star.a) - wrap(scanRad))
    if (diff > Math.PI) diff = Math.PI * 2 - diff
    if (diff < best.diff) return { star, diff }
    return best
  }, { star: stars[0], diff: 99 })

  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g fill="none" stroke="#d6cdc0" strokeWidth="0.8">
        <path d="M16 16h16 M16 16v16" />
        <path d="M384 16h-16 M384 16v16" />
        <path d="M16 384h16 M16 384v-16" />
        <path d="M384 384h-16 M384 384v-16" />
      </g>

      <text x="28" y="40" fill="#6f675e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="1.6">
        Curriculum
      </text>
      <text x="372" y="40" fill="#6f675e" fontFamily="'IBM Plex Mono', monospace" fontSize="8" textAnchor="end" letterSpacing="1.6">
        Plate III
      </text>

      {[58, 84, 110, 136, 162].map((r) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#d6cdc0" strokeWidth="0.8" />
      ))}

      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * 18}
            y1={cy + Math.sin(a) * 18}
            x2={cx + Math.cos(a) * 162}
            y2={cy + Math.sin(a) * 162}
            stroke="#d6cdc0"
            strokeWidth="0.6"
          />
        )
      })}

      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(scanRad) * 162}
        y2={cy + Math.sin(scanRad) * 162}
        stroke="#c2410c"
        strokeWidth="1.1"
      />

      {stars.map((star) => {
        const x = cx + Math.cos(star.a) * star.r
        const y = cy + Math.sin(star.a) * star.r
        const isActive = active.star?.i === star.i
        const right = Math.cos(star.a) >= 0
        return (
          <g key={star.name}>
            <circle
              cx={x}
              cy={y}
              r={isActive ? 3.4 : 2}
              fill={isActive ? '#c2410c' : '#1a1614'}
            />
            {isActive && (
              <text
                x={x + (right ? 8 : -8)}
                y={y}
                fill="#c2410c"
                fontFamily="'IBM Plex Mono', monospace"
                fontSize="8"
                textAnchor={right ? 'start' : 'end'}
                dominantBaseline="middle"
              >
                {star.short}
              </text>
            )}
          </g>
        )
      })}

      <circle cx={cx} cy={cy} r="14" fill="#f4efe6" stroke="#1a1614" strokeWidth="1" />
      <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="#1a1614" strokeWidth="0.8" />
      <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="#1a1614" strokeWidth="0.8" />
      <text
        x={cx}
        y={368}
        textAnchor="middle"
        fill="#6f675e"
        fontFamily="'IBM Plex Mono', monospace"
        fontSize="8"
        letterSpacing="1.8"
      >
        {active.star?.name ?? ''}
      </text>
    </svg>
  )
}

export default CourseAtlas
