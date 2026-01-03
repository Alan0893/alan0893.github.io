import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Bouldering hold shapes
const HoldShapes = {
  jug: (size) => (
    <ellipse cx={size/2} cy={size/2} rx={size/2.2} ry={size/3} fill="currentColor" />
  ),
  crimp: (size) => (
    <rect x={size*0.1} y={size*0.35} width={size*0.8} height={size*0.3} rx={size*0.08} fill="currentColor" />
  ),
  sloper: (size) => (
    <ellipse cx={size/2} cy={size/2} rx={size/2.5} ry={size/2.8} fill="currentColor" />
  ),
  pinch: (size) => (
    <path d={`M${size*0.2},${size*0.5} Q${size*0.5},${size*0.1} ${size*0.8},${size*0.5} Q${size*0.5},${size*0.9} ${size*0.2},${size*0.5}`} fill="currentColor" />
  ),
  pocket: (size) => (
    <>
      <circle cx={size/2} cy={size/2} r={size/3} fill="currentColor" />
      <circle cx={size/2} cy={size/2} r={size/6} fill="#0f172a" />
    </>
  ),
  volume: (size) => (
    <polygon points={`${size/2},${size*0.15} ${size*0.85},${size*0.85} ${size*0.15},${size*0.85}`} fill="currentColor" />
  ),
}

// Generate climbing routes 
export const generateRoutes = () => {
  const shapes = ['jug', 'crimp', 'sloper', 'pinch', 'pocket', 'volume']
  const allHolds = []
  const minDistance = 8 
  const padding = 6 
  
  const checkOverlap = (newHold) => {
    for (const hold of allHolds) {
      const dx = newHold.x - hold.x
      const dy = newHold.y - hold.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < minDistance) return true
    }
    return false
  }
  
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val))
  
  const createHold = (baseX, baseY, color, maxAttempts = 20) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const hold = {
        x: clamp(baseX + (Math.random() - 0.5) * 12, padding, 100 - padding),
        y: clamp(baseY + (Math.random() - 0.5) * 6, padding, 100 - padding),
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        size: 2.5 + Math.random() * 2,
        rotation: (Math.random() - 0.5) * 30,
        color,
      }
      if (!checkOverlap(hold)) {
        allHolds.push(hold)
        return hold
      }
    }
    const hold = {
      x: clamp(baseX + (Math.random() - 0.5) * 20, padding, 100 - padding),
      y: clamp(baseY + (Math.random() - 0.5) * 10, padding, 100 - padding),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: 2.5 + Math.random() * 2,
      rotation: (Math.random() - 0.5) * 30,
      color,
    }
    allHolds.push(hold)
    return hold
  }
  
  const routes = [
    {
      id: 'route1',
      color: '#6366f1', // indigo - wanders left side
      holds: Array.from({ length: 7 }, (_, i) => 
        createHold(15 + Math.sin(i * 0.8) * 10, 85 - i * 10, '#6366f1')
      )
    },
    {
      id: 'route2',
      color: '#14b8a6', // teal - drifts across middle
      holds: Array.from({ length: 6 }, (_, i) => 
        createHold(30 + i * 5, 85 - i * 12, '#14b8a6')
      )
    },
    {
      id: 'route3',
      color: '#3b82f6', // blue - weaves through center
      holds: Array.from({ length: 6 }, (_, i) => 
        createHold(45 + Math.sin(i * 1.5) * 8, 82 - i * 11, '#3b82f6')
      )
    },
    {
      id: 'route4',
      color: '#f59e0b', // amber - zigzags right-center
      holds: Array.from({ length: 6 }, (_, i) => 
        createHold(60 + Math.cos(i * 1.2) * 8, 85 - i * 12, '#f59e0b')
      )
    },
    {
      id: 'route5',
      color: '#ec4899', // pink - meanders right side
      holds: Array.from({ length: 6 }, (_, i) => 
        createHold(78 - i * 3, 83 - i * 11, '#ec4899')
      )
    },
  ]
  
  return routes
}

const BoulderingHold = ({ hold, index, routeIndex, isGlowing }) => {
  const size = hold.size
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -2, 0]
      }}
      transition={{ 
        delay: index * 0.03,
        type: 'spring',
        stiffness: 200,
        damping: 15,
        y: {
          duration: 2 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2
        }
      }}
    >
      <g
        transform={`translate(${hold.x}, ${hold.y}) rotate(${hold.rotation})`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ cursor: 'default' }}
      >
        {/* Hold shadow */}
        <g transform="translate(0.3, 0.4)" opacity="0.4">
          <g style={{ color: '#000' }}>
            {HoldShapes[hold.shape](size)}
          </g>
        </g>
        
        {/* Main hold */}
        <g style={{ 
          color: hold.color,
          filter: isHovered ? 'brightness(1.4)' : isGlowing ? 'brightness(1.3) drop-shadow(0 0 4px currentColor)' : 'brightness(1)',
          transition: 'filter 0.3s ease',
        }}>
          {HoldShapes[hold.shape](size)}
        </g>
        
        {/* Highlight */}
        <g style={{ color: '#fff' }} opacity="0.2">
          <ellipse 
            cx={size/2 - size*0.1} 
            cy={size/2 - size*0.15} 
            rx={size/5} 
            ry={size/6} 
          />
        </g>
      </g>
    </motion.g>
  )
}

const ClimbingWall = ({ routes }) => {
  const [glowingRoute, setGlowingRoute] = useState(-1)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowingRoute(prev => (prev + 1) % (routes.length + 1) - 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [routes.length])

  return (
    <div className="relative w-full h-full">
      {/* Holds */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {routes.map((route, routeIdx) => (
          <g key={route.id}>
            {route.holds.map((hold, index) => (
              <BoulderingHold
                key={`${route.id}-${index}`}
                hold={hold}
                index={index}
                routeIndex={routeIdx}
                isGlowing={glowingRoute === routeIdx}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

export default ClimbingWall
