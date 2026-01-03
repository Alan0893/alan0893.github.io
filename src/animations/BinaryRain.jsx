import React, { useEffect, useRef } from 'react'

const BinaryRain = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size to match container
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const streamLength = 8
        
        for (let j = 0; j < streamLength; j++) {
          const text = Math.random() > 0.5 ? '1' : '0'
          const y = (drops[i] - j) * fontSize
          
          if (y > 0 && y < canvas.height) {
            const opacity = 1 - (j / streamLength)
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.font = `${fontSize}px monospace`
            ctx.fillText(text, i * fontSize, y)
          }
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 70)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  )
}

export default BinaryRain
