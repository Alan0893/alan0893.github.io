import React, { useCallback, useEffect, useRef, useState } from 'react'

const WIDTH = 768
const HEIGHT = 340
const K = 3
const COLORS = ['var(--color-ink)', 'var(--color-accent)', 'var(--color-muted)']
const PAD = 18

const rand = (min, max) => min + Math.random() * (max - min)

const seedPoints = (n) =>
  Array.from({ length: n }, (_, id) => ({
    id,
    x: rand(PAD, WIDTH - PAD),
    y: rand(PAD, HEIGHT - PAD),
    cluster: 0,
  }))

const seedCentroids = () =>
  Array.from({ length: K }, () => ({
    x: rand(PAD, WIDTH - PAD),
    y: rand(PAD, HEIGHT - PAD),
  }))

const ClusterPlate = () => {
  const svgRef = useRef(null)
  const drawing = useRef(false)
  const lastAdd = useRef(0)
  const nextId = useRef(40)
  const pointsRef = useRef(seedPoints(40))
  const centroidsRef = useRef(seedCentroids())
  const [view, setView] = useState({
    points: pointsRef.current,
    centroids: centroidsRef.current,
  })

  const toSvgPoint = (event) => {
    const svg = svgRef.current
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = event.clientX
    pt.y = event.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    const loc = pt.matrixTransform(ctm.inverse())
    return {
      x: Math.min(WIDTH - PAD, Math.max(PAD, loc.x)),
      y: Math.min(HEIGHT - PAD, Math.max(PAD, loc.y)),
    }
  }

  const addPoint = useCallback((x, y, force = false) => {
    const now = performance.now()
    if (!force && now - lastAdd.current < 32) return
    lastAdd.current = now
    const point = { id: nextId.current, x, y, cluster: 0 }
    nextId.current += 1
    pointsRef.current = [...pointsRef.current, point]
  }, [])

  const reset = useCallback(() => {
    nextId.current = 40
    pointsRef.current = seedPoints(40)
    centroidsRef.current = seedCentroids()
    setView({ points: pointsRef.current, centroids: centroidsRef.current })
  }, [])

  useEffect(() => {
    let frame
    const step = () => {
      const points = pointsRef.current
      const centroids = centroidsRef.current

      const assigned = points.map((p) => {
        let best = 0
        let bestD = Infinity
        centroids.forEach((c, i) => {
          const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2
          if (d < bestD) {
            bestD = d
            best = i
          }
        })
        return { ...p, cluster: best }
      })

      const nextCentroids = centroids.map((c, i) => {
        const members = assigned.filter((p) => p.cluster === i)
        if (!members.length) return c
        const mx = members.reduce((s, p) => s + p.x, 0) / members.length
        const my = members.reduce((s, p) => s + p.y, 0) / members.length
        const x = c.x + (mx - c.x) * 0.12
        const y = c.y + (my - c.y) * 0.12
        return {
          x: Math.min(WIDTH - PAD, Math.max(PAD, x)),
          y: Math.min(HEIGHT - PAD, Math.max(PAD, y)),
        }
      })

      pointsRef.current = assigned
      centroidsRef.current = nextCentroids
      setView({ points: assigned, centroids: nextCentroids })
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  const onPointerDown = (event) => {
    if (event.detail > 1) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drawing.current = true
    const loc = toSvgPoint(event)
    if (loc) addPoint(loc.x, loc.y, true)
  }

  const onPointerMove = (event) => {
    if (!drawing.current) return
    const loc = toSvgPoint(event)
    if (loc) addPoint(loc.x, loc.y)
  }

  const onPointerUp = () => {
    drawing.current = false
  }

  return (
    <svg
      ref={svgRef}
      className="block h-full w-full max-w-full cursor-crosshair touch-none select-none"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      overflow="hidden"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onDoubleClick={(event) => {
        event.preventDefault()
        reset()
      }}
    >
      <defs>
        <clipPath id="cluster-plate-clip">
          <rect width={WIDTH} height={HEIGHT} />
        </clipPath>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill="var(--color-paper)" />
      <g clipPath="url(#cluster-plate-clip)">
        {view.points.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r="4.5"
            fill={COLORS[p.cluster]}
            opacity="0.9"
          />
        ))}
        {view.centroids.map((c, i) => (
          <g key={i} stroke={COLORS[i]} strokeWidth="1.8" fill="none">
            <circle cx={c.x} cy={c.y} r="9" />
            <line x1={c.x - 13} y1={c.y} x2={c.x + 13} y2={c.y} />
            <line x1={c.x} y1={c.y - 13} x2={c.x} y2={c.y + 13} />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default ClusterPlate
