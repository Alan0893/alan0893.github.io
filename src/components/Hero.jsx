import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ClimbingWall, { generateRoutes } from '../animations/ClimbingWall'
import BinaryRain from '../animations/BinaryRain'

const Hero = () => {
  const [routes] = useState(generateRoutes)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [displaySubtitle, setDisplaySubtitle] = useState('')
  const fullText = 'Constructing ideas into reality, one line at a time.'
  const subtitleText = 'Catch me bouldering or running from time to time'
  
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const subtitleDelay = setTimeout(() => {
      let index = 0
      const timer = setInterval(() => {
        if (index <= subtitleText.length) {
          setDisplaySubtitle(subtitleText.slice(0, index))
          index++
        } else {
          clearInterval(timer)
          setTimeout(() => setShowCursor(false), 500)
        }
      }, 60)
      return () => clearInterval(timer)
    }, fullText.length * 60 + 500)
    
    return () => clearTimeout(subtitleDelay)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 pt-12 pb-6 overflow-hidden">      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Side - Main Content */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Name */}
              <div className="mb-6">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                  <span className="text-slate-100">Alan</span>
                  <span className="text-slate-400"> Lin</span>
                </h1>
              </div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl md:text-2xl text-slate-500 font-light mb-2">
                  {displayText}
                  {showCursor && <span className="text-slate-400 animate-pulse">|</span>}
                </h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 }}
                  className="text-sm md:text-base text-slate-600 font-light tracking-wide"
                >
                  {displaySubtitle}
                  {showCursor && displaySubtitle.length > 0 && <span className="text-slate-400 animate-pulse">|</span>}
                </motion.p>

                {/* Binary Rain Animation */}
                <div className="relative h-16 w-full overflow-hidden">
                  <BinaryRain />
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <a
                  href="https://github.com/Alan0893"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/alanl193/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href="mailto:alanl07905@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Bouldering Wall */}
          <motion.div
            className="lg:col-span-2 order-1 lg:order-2 hidden lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-full h-[500px]">
              <ClimbingWall routes={routes} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
