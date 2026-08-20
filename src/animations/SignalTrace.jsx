import React, { useEffect, useRef } from 'react'

const SignalTrace = () => {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    let frame
    const width = 520
    const height = 56
    const mid = height / 2

    const sample = (t) => {
      const phase = t % 2.4
      const spike =
        Math.exp(-((phase - 0.35) ** 2) / 0.006) * 18 -
        Math.exp(-((phase - 0.48) ** 2) / 0.003) * 10
      return (
        mid -
        spike -
        Math.sin(t * 2.1) * 4 -
        Math.sin(t * 5.4) * 1.6
      )
    }

    const draw = (now) => {
      const t0 = now / 900
      const pts = []
      for (let i = 0; i <= 80; i++) {
        const x = (i / 80) * width
        const t = t0 + i / 28
        pts.push(`${x.toFixed(1)},${sample(t).toFixed(1)}`)
      }
      path.setAttribute('d', `M${pts.join(' L')}`)
      frame = requestAnimationFrame(draw)
    }

    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <svg
      className="h-14 w-full"
      viewBox="0 0 520 56"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line x1="0" y1="28" x2="520" y2="28" stroke="#d6cdc0" strokeWidth="0.8" />
      <path ref={pathRef} fill="none" stroke="#c2410c" strokeWidth="1.4" />
    </svg>
  )
}

export default SignalTrace
