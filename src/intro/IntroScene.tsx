import { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { MorphicMesh } from './MorphicMesh'
import { Particles } from './Particles'
import { OrbitalRings } from './OrbitalRings'
import { IntroOverlay } from './IntroOverlay'

interface IntroSceneProps {
  onEnter: () => void
}

export function IntroScene({ onEnter }: IntroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [exiting, setExiting] = useState(false)
  const [amplitude, setAmplitude] = useState(0.3)

  const handleEnter = useCallback(() => {
    setExiting(true)
    const start = performance.now()
    const animate = () => {
      const elapsed = (performance.now() - start) / 1000
      if (elapsed < 1.2) {
        setAmplitude(0.3 + elapsed * 1.5)
        requestAnimationFrame(animate)
      } else {
        onEnter()
      }
    }
    requestAnimationFrame(animate)
  }, [onEnter])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--bg)',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.8s ease-out' : undefined,
      }}
    >
      {/* Subtle animated nebula backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(0,240,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(138,43,226,0.07) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0,255,159,0.03) 0%, transparent 60%)
          `,
          animation: '_nebulaShift 12s ease-in-out infinite alternate',
          pointerEvents: 'none',
        }}
      />
      <style>{`
        @keyframes _nebulaShift {
          0%   { opacity: 0.7; transform: scale(1) rotate(0deg); }
          100% { opacity: 1;   transform: scale(1.1) rotate(2deg); }
        }
      `}</style>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: '#050505' }}
      >
        {/* Ambient fill */}
        <ambientLight intensity={0.1} color="#ffffff" />

        {/* Key lights – cyan, purple, green — boosted for more presence */}
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.7} color="#8a2be2" />
        <pointLight position={[0, -5, -3]} intensity={0.35} color="#00ff9f" />

        {/* Rim / accent lights — warmer tones for depth */}
        <pointLight position={[3, -4, -5]} intensity={0.4} color="#ff4488" />
        <pointLight position={[-4, 4, -2]} intensity={0.3} color="#00f0ff" />
        <pointLight position={[0, 6, -4]} intensity={0.2} color="#ff8800" />

        {/* Background particle field */}
        <Particles />

        {/* Orbital rings around the mesh */}
        <OrbitalRings />

        {/* Central morphing sphere */}
        <MorphicMesh amplitudeOverride={amplitude} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={exiting ? 3.5 : 1.1}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(exiting ? 0.006 : 0.001, exiting ? 0.006 : 0.001)}
            radialModulation={false}
            modulationOffset={0.0}
          />
          <Vignette eskil={false} offset={0.12} darkness={0.8} />
        </EffectComposer>
      </Canvas>

      {!exiting && <IntroOverlay onEnter={handleEnter} />}
    </div>
  )
}
