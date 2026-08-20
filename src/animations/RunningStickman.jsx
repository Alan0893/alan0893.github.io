import { useState, useEffect } from 'react'

const RunningStickman = () => {
  const [position, setPosition] = useState(-50)
  const [runCycle, setRunCycle] = useState(0)
  const [clouds, setClouds] = useState([
    { x: 100, y: 20, size: 40, speed: 0.3 },
    { x: 400, y: 35, size: 55, speed: 0.25 },
    { x: 700, y: 15, size: 45, speed: 0.35 },
    { x: 1000, y: 30, size: 50, speed: 0.28 },
  ])
  const [velocity, setVelocity] = useState(6)
  const [speedChangeCounter, setSpeedChangeCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeedChangeCounter(prev => {
        const newCounter = prev + 1
        if (newCounter > Math.random() * 50 + 30) {
          const speedOptions = [0, 2, 3, 4, 6, 6, 6, 8, 9, 10]
          setVelocity(speedOptions[Math.floor(Math.random() * speedOptions.length)])
          return 0
        }
        return newCounter
      })

      setPosition(prev => (prev > 1200 ? -50 : prev + velocity))

      setClouds(prevClouds =>
        prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x - cloud.speed < -100 ? 1300 : cloud.x - cloud.speed
        }))
      )

      setRunCycle(prev => velocity > 0 ? (prev + 1) % 8 : prev)
    }, 50)

    return () => clearInterval(interval)
  }, [velocity])

  const getLimbPosition = (cycle, isForward) => {
    const t = (cycle % 8) / 8
    const phase = isForward ? t : (t + 0.5) % 1
    const angle = Math.sin(phase * Math.PI * 2) * 50
    return {
      x: Math.sin(angle * Math.PI / 180) * 15,
      y: Math.abs(Math.cos(angle * Math.PI / 180)) * 10
    }
  }

  const bodyBob = Math.sin((runCycle / 8) * Math.PI * 2) * 2
  const leftLeg = getLimbPosition(runCycle, true)
  const rightLeg = getLimbPosition(runCycle, false)
  const leftArm = getLimbPosition(runCycle, false)
  const rightArm = getLimbPosition(runCycle, true)
  const ink = '#1a1614'

  return (
    <div className="relative w-full h-40 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid meet">
        {clouds.map((cloud, i) => (
          <g key={i} opacity="0.25" transform={`translate(${cloud.x}, ${cloud.y})`}>
            <ellipse cx="0" cy="0" rx={cloud.size * 0.6} ry={cloud.size * 0.3} fill={ink} />
            <ellipse cx={cloud.size * 0.4} cy="0" rx={cloud.size * 0.5} ry={cloud.size * 0.35} fill={ink} />
            <ellipse cx={cloud.size * -0.3} cy="0" rx={cloud.size * 0.45} ry={cloud.size * 0.32} fill={ink} />
          </g>
        ))}

        <g opacity="0.35" stroke={ink} fill="none">
          <line x1="150" y1="130" x2="150" y2="90" strokeWidth="2" />
          <circle cx="150" cy="85" r="12" />
          <line x1="450" y1="130" x2="450" y2="85" strokeWidth="2" />
          <circle cx="450" cy="78" r="15" />
          <line x1="750" y1="130" x2="750" y2="95" strokeWidth="2" />
          <circle cx="750" cy="90" r="11" />
          <line x1="1000" y1="130" x2="1000" y2="88" strokeWidth="2" />
          <circle cx="1000" cy="82" r="13" />
        </g>

        <line x1="0" y1="130" x2="1200" y2="130" stroke={ink} strokeWidth="1.5" />

        <g
          stroke={ink}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transform: `translateX(${position}px) translateY(${bodyBob}px)` }}
        >
          <circle cx="100" cy="75" r="10" />
          <line x1="100" y1="85" x2="102" y2="112" />
          <line
            x1="100"
            y1="90"
            x2={leftArm.x < 0 ? 95 + leftArm.x : 105 + rightArm.x}
            y2={leftArm.x < 0 ? 100 + leftArm.y : 100 + rightArm.y}
            opacity="0.4"
          />
          <line
            x1="102"
            y1="112"
            x2={leftLeg.x < 0 ? 97 + leftLeg.x : 107 + rightLeg.x}
            y2={leftLeg.x < 0 ? 135 + leftLeg.y : 135 + rightLeg.y}
            opacity="0.4"
          />
          <line
            x1="100"
            y1="90"
            x2={leftArm.x >= 0 ? 95 + leftArm.x : 105 + rightArm.x}
            y2={leftArm.x >= 0 ? 100 + leftArm.y : 100 + rightArm.y}
          />
          <line
            x1="102"
            y1="112"
            x2={leftLeg.x >= 0 ? 97 + leftLeg.x : 107 + rightLeg.x}
            y2={leftLeg.x >= 0 ? 135 + leftLeg.y : 135 + rightLeg.y}
          />
        </g>
      </svg>
    </div>
  )
}

export default RunningStickman
