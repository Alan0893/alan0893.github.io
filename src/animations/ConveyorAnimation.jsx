import React from 'react'

const ConveyorAnimation = () => {
  const contactLinks = [
    { 
      name: 'GitHub',
      url: 'https://github.com/Alan0893',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/alanl193',
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:alanl07905@gmail.com',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ]
  const duplicatedLinks = [...contactLinks, ...contactLinks, ...contactLinks] // Triple for seamless loop
  
  return (
    <div className="relative w-full h-64 overflow-hidden flex items-center justify-center">
      {/* Conveyor Belt */}
      <div className="relative w-full max-w-4xl h-28 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
      }}>
        {/* Belt lines */}
        <div className="absolute inset-0 flex" style={{ animation: 'conveyorBelt 20s linear infinite' }}>
          {[...Array(60)].map((_, i) => (
            <div key={i} className="w-16 h-full border-r border-white/10 flex-shrink-0" />
          ))}
        </div>
        
        {/* Moving contact icons */}
        <div className="absolute inset-0 flex" style={{ animation: 'conveyorItems 30s linear infinite' }}>
          {duplicatedLinks.map((contact, i) => {
            const isDisabled = !contact.url
            const baseStyle = {
              left: `${(100 / contactLinks.length) * i}%`,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.15)'
            }

            const crossedStyle = isDisabled
              ? {
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 30%, transparent 30%, transparent 70%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0.18) 100%), linear-gradient(-45deg, rgba(255,255,255,0.18) 0, rgba(255,255,255,0.18) 30%, transparent 30%, transparent 70%, rgba(255,255,255,0.18) 70%, rgba(255,255,255,0.18) 100%)',
                  backgroundBlendMode: 'screen'
                }
              : {}

            const commonProps = {
              className: `absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-xl flex items-center justify-center text-white/90 ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:text-white hover:scale-110'} transition-all duration-300 group`,
              style: { ...baseStyle, ...crossedStyle },
              title: isDisabled ? `${contact.name} (not linked)` : contact.name
            }

            if (isDisabled) {
              return (
                <div key={i} {...commonProps}>
                  {contact.icon}
                </div>
              )
            }

            return (
              <a
                key={i}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                {...commonProps}
              >
                {contact.icon}
              </a>
            )
          })}
        </div>
      </div>

      {/* Interlocking Gears on sides */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        {[{ size: 60, reverse: false }, { size: 45, reverse: true, offset: 40 }].map((gear, i) => (
          <div
            key={`left-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${gear.size}px`,
              height: `${gear.size}px`,
              left: `${gear.offset || 0}px`,
              animation: `rotate 3s linear infinite ${gear.reverse ? 'reverse' : ''}`
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id={`glassGradient-left-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.2)', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: 'rgba(255, 255, 255, 0.05)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0.1)', stopOpacity: 1 }} />
                </linearGradient>
                <filter id={`glow-left-${i}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="50" cy="50" r="30" fill={`url(#glassGradient-left-${i})`} stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
              {[...Array(8)].map((_, j) => (
                <rect
                  key={j}
                  x="46"
                  y="10"
                  width="8"
                  height="15"
                  fill="rgba(255, 255, 255, 0.15)"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  transform={`rotate(${j * 45} 50 50)`}
                  filter={`url(#glow-left-${i})`}
                />
              ))}
              <circle cx="50" cy="50" r="10" fill="rgba(255, 255, 255, 0.2)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        {[{ size: 60, reverse: true }, { size: 45, reverse: false, offset: -40 }].map((gear, i) => (
          <div
            key={`right-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${gear.size}px`,
              height: `${gear.size}px`,
              right: `${gear.offset ? Math.abs(gear.offset) : 0}px`,
              animation: `rotate 3s linear infinite ${gear.reverse ? 'reverse' : ''}`
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id={`glassGradient-right-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(255, 255, 255, 0.2)', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: 'rgba(255, 255, 255, 0.05)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(255, 255, 255, 0.1)', stopOpacity: 1 }} />
                </linearGradient>
                <filter id={`glow-right-${i}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="50" cy="50" r="30" fill={`url(#glassGradient-right-${i})`} stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
              {[...Array(8)].map((_, j) => (
                <rect
                  key={j}
                  x="46"
                  y="10"
                  width="8"
                  height="15"
                  fill="rgba(255, 255, 255, 0.15)"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="1"
                  transform={`rotate(${j * 45} 50 50)`}
                  filter={`url(#glow-right-${i})`}
                />
              ))}
              <circle cx="50" cy="50" r="10" fill="rgba(255, 255, 255, 0.2)" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
            </svg>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes conveyorBelt {
          from { transform: translateX(0); }
          to { transform: translateX(-960px); }
        }

        @keyframes conveyorItems {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ConveyorAnimation
