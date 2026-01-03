import React, { useEffect, useRef } from 'react'

const WordSphere = ({ texts }) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container || !texts?.length) return

    const ctx = canvas.getContext('2d')
    const size = Math.min(360, Math.max(280, Math.floor(window.innerWidth * 0.55)))
    const radius = size * 0.42
    const fontSize = size < 320 ? 11 : 13
    const dpr = window.devicePixelRatio || 1

    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)
    ctx.textAlign = 'center'

    const basePoints = texts.map((text, i) => {
      const k = -1 + (2 * i + 1) / texts.length
      const phi = Math.acos(k)
      const theta = Math.sqrt(texts.length * Math.PI) * phi
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      return { text, x, y, z }
    })

    const rotate = (a, b, angle) => [a * Math.cos(angle) - b * Math.sin(angle), a * Math.sin(angle) + b * Math.cos(angle)]

    let rotX = Math.PI / 9
    let rotZ = 0
    let velX = 0.008
    let velZ = 0.01
    let frameId
    let isDragging = false
    let lastX = 0
    let lastY = 0

    // Handle mouse drag events
    const handleMouseDown = (e) => {
      isDragging = true
      lastX = e.clientX
      lastY = e.clientY
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY
      velZ += deltaX * 0.0005
      velX += deltaY * 0.0005
      lastX = e.clientX
      lastY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    // Handle touch events for mobile
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true
        lastX = e.touches[0].clientX
        lastY = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return
      e.preventDefault()
      const deltaX = e.touches[0].clientX - lastX
      const deltaY = e.touches[0].clientY - lastY
      velZ += deltaX * 0.0005
      velX += deltaY * 0.0005
      lastX = e.touches[0].clientX
      lastY = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    const render = () => {
      ctx.clearRect(0, 0, size, size)

      basePoints.forEach(({ text, x, y, z }) => {
        let [rx, rz] = rotate(x, z, rotZ)
        let [ry, rzy] = rotate(y, rz, rotX)
        const [ryTilt, rzyTilt] = rotate(ry, rzy, Math.PI / 12)

        const depth = rx / radius
        const alpha = 0.55 + 0.45 * depth
        const sizeMod = fontSize + 2 + 4 * depth

        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`
        ctx.font = `${sizeMod}px 'Inter', system-ui, sans-serif`
        ctx.fillText(text, ryTilt + size / 2, -rzyTilt + size / 2)
      })

      rotX += velX
      rotZ += velZ
      
      // Gradually return to base speed
      velX += (0.008 - velX) * 0.02
      velZ += (0.01 - velZ) * 0.02
      
      frameId = window.requestAnimationFrame(render)
    }

    frameId = window.requestAnimationFrame(render)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [texts])

  return (
    <div 
      ref={containerRef} 
      className="cursor-grab active:cursor-grabbing touch-none select-none"
      style={{ display: 'inline-block' }}
    >
      <canvas ref={canvasRef} className="drop-shadow-xl" />
    </div>
  )
}

export default WordSphere
