import React, { useEffect, useRef, useState } from 'react'

const BouncingBalls = () => {
  const ballTrackRef = useRef(null)
  const ballsRef = useRef([])
  const [ballState, setBallState] = useState([])
  const BALL_RADIUS = 8
  const BALL_COUNT = 3
  const obstacles = [
    { x: 0.22, y: 0.5, w: 0.12, h: 0.12 },
    { x: 0.5, y: 0.35, w: 0.1, h: 0.1 },
    { x: 0.72, y: 0.58, w: 0.13, h: 0.11 },
  ]

  useEffect(() => {
    const track = ballTrackRef.current
    if (!track) return

    const rand = (min, max) => min + Math.random() * (max - min)

    let width = track.offsetWidth
    let height = track.offsetHeight
    let ground = height - BALL_RADIUS
    const g = 1800 // gravity (px/s^2)

    const spawnBall = () => ({
      x: rand(-60, width * 0.8), 
      y: rand(-height * 0.4, -BALL_RADIUS * 2), 
      vx: rand(170, 260),
      vy: rand(0, 120),
      bounce: rand(0.6, 0.75),
      id: Math.random(),
    })

    ballsRef.current = Array.from({ length: BALL_COUNT }, spawnBall)
    setBallState(ballsRef.current.map(({ x, y, id }) => ({ x, y, id })))

    let last = performance.now()
    let rafId

    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05) 
      last = now

      // Integrate motion and handle ground/reset
      for (const b of ballsRef.current) {
        b.vy += g * dt
        b.x += b.vx * dt
        b.y += b.vy * dt

        if (b.y > ground) {
          b.y = ground
          b.vy *= -b.bounce
        }

        if (b.x > width + BALL_RADIUS * 2 || b.x < -BALL_RADIUS * 4) {
          const refreshed = spawnBall()
          b.x = refreshed.x
          b.y = refreshed.y
          b.vx = refreshed.vx
          b.vy = refreshed.vy
          b.bounce = refreshed.bounce
          b.id = refreshed.id
        }
      }

      // Pairwise collisions (elastic, equal mass)
      for (let i = 0; i < ballsRef.current.length; i++) {
        for (let j = i + 1; j < ballsRef.current.length; j++) {
          const a = ballsRef.current[i]
          const b = ballsRef.current[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const distSq = dx * dx + dy * dy
          const minDist = BALL_RADIUS * 2
          if (distSq > 0 && distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq)
            const nx = dx / dist
            const ny = dy / dist
            const overlap = minDist - dist

            // Separate to avoid sticking
            a.x -= nx * overlap * 0.5
            a.y -= ny * overlap * 0.5
            b.x += nx * overlap * 0.5
            b.y += ny * overlap * 0.5

            // Relative velocity along normal
            const dvx = b.vx - a.vx
            const dvy = b.vy - a.vy
            const relVel = dvx * nx + dvy * ny

            if (relVel < 0) {
              const impulse = relVel
              a.vx += impulse * nx
              a.vy += impulse * ny
              b.vx -= impulse * nx
              b.vy -= impulse * ny
            }
          }
        }
      }

      // Obstacle collisions
      const scaledObstacles = obstacles.map(o => ({
        left: o.x * width,
        top: o.y * height,
        right: (o.x + o.w) * width,
        bottom: (o.y + o.h) * height,
      }))

      for (const b of ballsRef.current) {
        for (const ob of scaledObstacles) {
          const left = ob.left - BALL_RADIUS
          const right = ob.right + BALL_RADIUS
          const top = ob.top - BALL_RADIUS
          const bottom = ob.bottom + BALL_RADIUS
          if (b.x >= left && b.x <= right && b.y >= top && b.y <= bottom) {
            const overlapX = Math.min(right - b.x, b.x - left)
            const overlapY = Math.min(bottom - b.y, b.y - top)
            if (overlapX < overlapY) {
              // Resolve on X axis
              if (b.x > (ob.left + ob.right) / 2) {
                b.x = right
              } else {
                b.x = left
              }
              b.vx *= -b.bounce
            } else {
              // Resolve on Y axis
              if (b.y > (ob.top + ob.bottom) / 2) {
                b.y = bottom
              } else {
                b.y = top
              }
              b.vy *= -b.bounce
            }
          }
        }
      }

      setBallState(ballsRef.current.map(({ x, y, id }) => ({ x, y, id })))
      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame((now) => {
      last = now
      rafId = requestAnimationFrame(step)
    })

    const handleResize = () => {
      width = track.offsetWidth
      height = track.offsetHeight
      ground = height - BALL_RADIUS
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={ballTrackRef} className="relative w-full h-full overflow-hidden">
      {obstacles.map((o, idx) => (
        <div
          key={idx}
          className="absolute rounded-sm"
          style={{
            left: `${o.x * 100}%`,
            top: `${o.y * 100}%`,
            width: `${o.w * 100}%`,
            height: `${o.h * 100}%`,
            backgroundColor: 'rgba(148,163,184,0.25)',
            border: '1px solid rgba(148,163,184,0.4)'
          }}
        />
      ))}
      {ballState.map((b, idx) => (
        <div
          key={b.id || idx}
          className="absolute"
          style={{
            transform: `translate3d(${b.x - BALL_RADIUS}px, ${b.y - BALL_RADIUS}px, 0)`
          }}
        >
          <div
            className="w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: ['#cbd5e1', '#94a3b8', '#e2e8f0'][idx % 3] }}
          />
          <div className="w-6 h-[2px] bg-slate-900/50 blur-sm mx-auto mt-1" />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-700" />
    </div>
  )
}

export default BouncingBalls
