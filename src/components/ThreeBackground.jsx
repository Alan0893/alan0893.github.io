import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Floating geometric shapes
function FloatingShape({ position, geometry, color, speed = 1 }) {
  const meshRef = useRef()
  const initialPos = useRef(position)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed
      meshRef.current.rotation.y += 0.005 * speed
      
      // Orbital movement
      const elapsed = state.clock.elapsedTime * speed * 0.3
      meshRef.current.position.x = initialPos.current[0] + Math.sin(elapsed) * 2 + Math.cos(elapsed * 0.7) * 1.5
      meshRef.current.position.y = initialPos.current[1] + Math.sin(elapsed * 0.8) * 2
      meshRef.current.position.z = initialPos.current[2] + Math.cos(elapsed) * 1.5 + Math.sin(elapsed * 0.6) * 1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === 'octahedron' && <octahedronGeometry args={[0.5]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[0.4]} />}
      {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.45]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[0.5]} />}
      {geometry === 'torus' && <torusGeometry args={[0.3, 0.15, 16, 32]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// Particle field
function Particles({ count = 500 }) {
  const points = useRef()
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    const color1 = new THREE.Color('#6366f1') // indigo
    const color2 = new THREE.Color('#14b8a6') // teal
    const color3 = new THREE.Color('#ec4899') // pink
    const color4 = new THREE.Color('#f59e0b') // amber
    
    for (let i = 0; i < count; i++) {
      const rand = Math.random()
      let mixedColor
      if (rand < 0.25) mixedColor = color1.clone()
      else if (rand < 0.5) mixedColor = color2.clone()
      else if (rand < 0.75) mixedColor = color3.clone()
      else mixedColor = color4.clone()
      
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }
    return colors
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.02
      points.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Wireframe cube
function WireframeCube({ position, color, size = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.007
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  )
}

// Light trail
function LightTrail({ color, startPos }) {
  const lineRef = useRef()
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 50; i++) {
      pts.push(new THREE.Vector3(
        startPos[0] + Math.sin(i * 0.3) * 2,
        startPos[1] + i * 0.2 - 5,
        startPos[2] + Math.cos(i * 0.3) * 2
      ))
    }
    return pts
  }, [startPos])

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return geometry
  }, [points])

  return (
    <line ref={lineRef}>
      <primitive object={lineGeometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.4} />
    </line>
  )
}

// Mesh network (constellation)
function MeshNetwork({ count = 30 }) {
  const groupRef = useRef()
  
  const { nodes, connections } = useMemo(() => {
    const nodes = []
    for (let i = 0; i < count; i++) {
      nodes.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 5
        ],
        color: ['#6366f1', '#14b8a6', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 4)]
      })
    }
    
    const connections = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
          Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
          Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        )
        if (dist < 4) {
          connections.push({ from: nodes[i].position, to: nodes[j].position })
        }
      }
    }
    return { nodes, connections }
  }, [count])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => {
        const points = [new THREE.Vector3(...conn.from), new THREE.Vector3(...conn.to)]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial color="#6366f1" transparent opacity={0.15} />
          </line>
        )
      })}
    </group>
  )
}

// Aurora ribbon
function AuroraRibbon({ color, yOffset = 0 }) {
  const meshRef = useRef()
  
  const geometry = useMemo(() => {
    const points = []
    for (let i = 0; i < 100; i++) {
      const x = (i - 50) * 0.2
      const y = Math.sin(i * 0.1) * 2 + yOffset
      const z = -8 + Math.cos(i * 0.05) * 2
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [yOffset])

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array
      for (let i = 0; i < 100; i++) {
        positions[i * 3 + 1] = Math.sin((i * 0.1) + state.clock.elapsedTime * 0.5) * 2 + yOffset
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <line ref={meshRef}>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.3} linewidth={2} />
    </line>
  )
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef()
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.mouse.x * 5
      lightRef.current.position.y = state.mouse.y * 5
    }
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={0.5}
      color="#94a3b8"
      distance={10}
    />
  )
}

// Code Rain
function CodeRain() {
  const groupRef = useRef()
  const chars = useMemo(() => {
    const arr = []
    for (let i = 0; i < 50; i++) {
      arr.push({
        char: ['0', '1', '{', '}', '<', '>', '/', '\\'][Math.floor(Math.random() * 8)],
        x: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10 - 5,
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * 10
      })
    }
    return arr
  }, [])

  return (
    <group ref={groupRef}>
      {chars.map((c, i) => <FallingChar key={i} {...c} />)}
    </group>
  )
}

function FallingChar({ x, z, speed, offset }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = ((state.clock.elapsedTime * speed + offset) % 20) - 10
    }
  })

  return (
    <mesh ref={meshRef} position={[x, 10, z]}>
      <boxGeometry args={[0.1, 0.2, 0.05]} />
      <meshBasicMaterial color="#14b8a6" transparent opacity={0.5} />
    </mesh>
  )
}

// Main Scene
function Scene() {
  const shapes = [
    { position: [-4, 2, -2], geometry: 'octahedron', color: '#6366f1', speed: 0.8 },
    { position: [4, -1, -3], geometry: 'icosahedron', color: '#14b8a6', speed: 1.2 },
    { position: [-3, -2, -1], geometry: 'dodecahedron', color: '#ec4899', speed: 0.6 },
    { position: [3, 2, -4], geometry: 'tetrahedron', color: '#f59e0b', speed: 1 },
    { position: [0, 3, -5], geometry: 'octahedron', color: '#14b8a6', speed: 0.9 },
    { position: [-5, -1, -2], geometry: 'torus', color: '#8b5cf6', speed: 1.1 },
    { position: [5, 1, -3], geometry: 'icosahedron', color: '#ec4899', speed: 0.7 },
    { position: [-2, 4, -4], geometry: 'dodecahedron', color: '#f59e0b', speed: 1.3 },
    { position: [2, -3, -2], geometry: 'tetrahedron', color: '#06b6d4', speed: 0.8 },
    { position: [0, -2, -6], geometry: 'octahedron', color: '#6366f1', speed: 1.2 },
    { position: [-6, 2, -3], geometry: 'torus', color: '#14b8a6', speed: 0.6 },
    { position: [6, -2, -5], geometry: 'icosahedron', color: '#ec4899', speed: 1 },
  ]

  const cubes = [
    { position: [6, 2, -5], color: '#6366f1', size: 1.2 },
    { position: [-6, -1, -4], color: '#14b8a6', size: 0.8 },
  ]

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#ec4899" />
      <MouseLight />
      
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <Particles count={2500} />
      
      {/* Floating shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
      
      {/* Wireframe cubes */}
      {cubes.map((cube, index) => (
        <WireframeCube key={index} {...cube} />
      ))}
      
      {/* Light trails */}
      <LightTrail color="#6366f1" startPos={[-3, 0, -3]} />
      <LightTrail color="#14b8a6" startPos={[3, 0, -4]} />
      
      {/* Mesh network constellation */}
      <MeshNetwork count={25} />
      
      {/* Aurora ribbons */}
      <AuroraRibbon color="#6366f1" yOffset={3} />
      <AuroraRibbon color="#14b8a6" yOffset={-2} />
      <AuroraRibbon color="#ec4899" yOffset={0} />
      
      {/* Code Rain */}
      <CodeRain />
    </>
  )
}

// Export the canvas component
export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary pointer-events-none" />
    </div>
  )
}
