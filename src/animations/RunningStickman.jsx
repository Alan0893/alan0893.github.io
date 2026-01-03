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
      // Randomly change speed every 30-80 frames
      setSpeedChangeCounter(prev => {
        const newCounter = prev + 1
        if (newCounter > Math.random() * 50 + 30) {
          // Random speed: 0 (stop), 2-4 (slow), 6 (normal), 8-10 (fast)
          const speedOptions = [
            0,        // Stop for a moment
            2, 3, 4,  // Slow down
            6, 6, 6,  // Normal speed 
            8, 9, 10  // Speed up
          ]
          const newSpeed = speedOptions[Math.floor(Math.random() * speedOptions.length)]
          setVelocity(newSpeed)
          return 0
        }
        return newCounter
      })

      setPosition(prev => {
        if (prev > 1200) {
          return -50
        }
        return prev + velocity
      })

      // Update clouds
      setClouds(prevClouds => 
        prevClouds.map(cloud => ({
          ...cloud,
          x: cloud.x - cloud.speed < -100 ? 1300 : cloud.x - cloud.speed
        }))
      )

      // Only advance run cycle if moving
      setRunCycle(prev => velocity > 0 ? (prev + 1) % 8 : prev)
    }, 50)

    return () => clearInterval(interval)
  }, [velocity])

  // Smooth movement for natural running
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

  return (
    <div className="relative w-full h-40 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 160" preserveAspectRatio="xMidYMid meet">
        {/* Filters */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="groundGradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
            <stop offset="50%" stopColor="rgba(20, 184, 166, 0.4)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.4)" />
          </linearGradient>
        </defs>

        <g opacity="0.15">
          <circle cx="200" cy="40" r="30" fill="url(#orbGradient1)" filter="url(#blur)" />
          <circle cx="600" cy="60" r="40" fill="url(#orbGradient2)" filter="url(#blur)" />
          <circle cx="950" cy="35" r="35" fill="url(#orbGradient1)" filter="url(#blur)" />
        </g>
        
        <defs>
          <linearGradient id="orbGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.3)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.3)" />
          </linearGradient>
          <linearGradient id="orbGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="8"/>
          </filter>
        </defs>

        {/* Clouds - more transparent */}
        {clouds.map((cloud, i) => (
          <g key={i} opacity="0.12" transform={`translate(${cloud.x}, ${cloud.y})`}>
            <ellipse cx="0" cy="0" rx={cloud.size * 0.6} ry={cloud.size * 0.3} fill="rgba(148, 163, 184, 0.6)" />
            <ellipse cx={cloud.size * 0.4} cy="0" rx={cloud.size * 0.5} ry={cloud.size * 0.35} fill="rgba(148, 163, 184, 0.6)" />
            <ellipse cx={cloud.size * -0.3} cy="0" rx={cloud.size * 0.45} ry={cloud.size * 0.32} fill="rgba(148, 163, 184, 0.6)" />
          </g>
        ))}

        {/* Trees in background */}
        <g opacity="0.2">
          {/* Tree 1 */}
          <line x1="150" y1="130" x2="150" y2="90" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" />
          <circle cx="150" cy="85" r="12" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="145" cy="80" r="10" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="155" cy="80" r="10" fill="rgba(255, 255, 255, 0.2)" />
          
          {/* Tree 2 */}
          <line x1="450" y1="130" x2="450" y2="85" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="4" />
          <circle cx="450" cy="78" r="15" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="442" cy="72" r="12" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="458" cy="72" r="12" fill="rgba(255, 255, 255, 0.2)" />
          
          {/* Tree 3 */}
          <line x1="750" y1="130" x2="750" y2="95" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" />
          <circle cx="750" cy="90" r="11" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="745" cy="85" r="9" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="755" cy="85" r="9" fill="rgba(255, 255, 255, 0.2)" />
          
          {/* Tree 4 */}
          <line x1="1000" y1="130" x2="1000" y2="88" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3.5" />
          <circle cx="1000" cy="82" r="13" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="993" cy="76" r="11" fill="rgba(255, 255, 255, 0.2)" />
          <circle cx="1007" cy="76" r="11" fill="rgba(255, 255, 255, 0.2)" />
        </g>

        {/* Ground platform */}
        <rect
          x="0"
          y="125"
          width="1200"
          height="35"
          fill="url(#groundGradient)"
          opacity="0.15"
          rx="2"
        />
        
        {/* Ground top line */}
        <line
          x1="0"
          y1="130"
          x2="1200"
          y2="130"
          stroke="url(#groundGradient)"
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* Ground bottom accent line */}
        <line
          x1="0"
          y1="158"
          x2="1200"
          y2="158"
          stroke="url(#groundGradient)"
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* Subtle glow under ground */}
        <line
          x1="0"
          y1="131"
          x2="1200"
          y2="131"
          stroke="url(#groundGradient)"
          strokeWidth="8"
          opacity="0.1"
          filter="url(#blur)"
        />
        
        {/* Shadow cast by ground */}
        <rect
          x="0"
          y="158"
          width="1200"
          height="2"
          fill="rgba(0, 0, 0, 0.2)"
          opacity="0.5"
        />

        {/* Motion lines behind runner */}
        <g opacity="0.2">
          {[...Array(3)].map((_, i) => (
            <line
              key={i}
              x1={position - 20 - i * 15}
              y1={100 + i * 8}
              x2={position - 40 - i * 15}
              y2={100 + i * 8}
              stroke="rgba(99, 102, 241, 0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glow)"
            />
          ))}
        </g>

        {/* Stickman */}
        <g
          style={{
            transform: `translateX(${position}px) translateY(${bodyBob}px)`,
          }}
        >
          {/* Head */}
          <circle
            cx="100"
            cy="75"
            r="10"
            fill="rgba(255, 255, 255, 0.05)"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2.5"
            filter="url(#glow)"
          />
          
          {/* Inner head */}
          <circle
            cx="100"
            cy="75"
            r="8"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />

          {/* Body */}
          <line
            x1="100"
            y1="85"
            x2="102"
            y2="112"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.9"
          />
          
          {/* Body*/}
          <line
            x1="100"
            y1="85"
            x2="102"
            y2="112"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Back arm */}
          <line
            x1="100"
            y1="90"
            x2={leftArm.x < 0 ? 95 + leftArm.x : 105 + rightArm.x}
            y2={leftArm.x < 0 ? 100 + leftArm.y : 100 + rightArm.y}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
            filter="url(#glow)"
          />

          {/* Back leg */}
          <line
            x1="102"
            y1="112"
            x2={leftLeg.x < 0 ? 97 + leftLeg.x : 107 + rightLeg.x}
            y2={leftLeg.x < 0 ? 135 + leftLeg.y : 135 + rightLeg.y}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
            filter="url(#glow)"
          />

          {/* Front arm */}
          <line
            x1="100"
            y1="90"
            x2={leftArm.x >= 0 ? 95 + leftArm.x : 105 + rightArm.x}
            y2={leftArm.x >= 0 ? 100 + leftArm.y : 100 + rightArm.y}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Front arm */}
          <line
            x1="100"
            y1="90"
            x2={leftArm.x >= 0 ? 95 + leftArm.x : 105 + rightArm.x}
            y2={leftArm.x >= 0 ? 100 + leftArm.y : 100 + rightArm.y}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Front leg */}
          <line
            x1="102"
            y1="112"
            x2={leftLeg.x >= 0 ? 97 + leftLeg.x : 107 + rightLeg.x}
            y2={leftLeg.x >= 0 ? 135 + leftLeg.y : 135 + rightLeg.y}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          
          {/* Front leg */}
          <line
            x1="102"
            y1="112"
            x2={leftLeg.x >= 0 ? 97 + leftLeg.x : 107 + rightLeg.x}
            y2={leftLeg.x >= 0 ? 135 + leftLeg.y : 135 + rightLeg.y}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

export default RunningStickman
