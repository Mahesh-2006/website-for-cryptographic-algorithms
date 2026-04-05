import { useRef, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { MorphicMesh } from './MorphicMesh'
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
    // Ramp up mesh distortion during exit
    let start = performance.now()
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ background: '#050505' }}
      >
        <ambientLight intensity={0.12} color="#ffffff" />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00f0ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#8a2be2" />
        <pointLight position={[0, -5, -3]} intensity={0.2} color="#00ff9f" />

        <MorphicMesh amplitudeOverride={amplitude} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            intensity={exiting ? 2.5 : 0.6}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.7} />
        </EffectComposer>
      </Canvas>

      {!exiting && <IntroOverlay onEnter={handleEnter} />}
    </div>
  )
}
