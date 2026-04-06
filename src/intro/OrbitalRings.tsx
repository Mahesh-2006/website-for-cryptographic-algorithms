import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Small glowing dots placed along each ring */
function RingDots({ radius, count, color }: { radius: number; count: number; color: string }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      arr[i * 3] = Math.cos(angle) * radius
      arr[i * 3 + 1] = Math.sin(angle) * radius
      arr[i * 3 + 2] = 0
    }
    return arr
  }, [radius, count])

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.03} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

export function OrbitalRings() {
  const ring1 = useRef<THREE.Group>(null)
  const ring2 = useRef<THREE.Group>(null)
  const ring3 = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.12
      ring1.current.rotation.x = Math.PI / 3
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.09
      ring2.current.rotation.x = -Math.PI / 4
      ring2.current.rotation.y = Math.PI / 6
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.07
      ring3.current.rotation.y = Math.PI / 3
      ring3.current.rotation.x = Math.PI / 5
    }
  })

  return (
    <group>
      <group ref={ring1}>
        <mesh>
          <torusGeometry args={[2.3, 0.006, 8, 80]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.18} />
        </mesh>
        <RingDots radius={2.3} count={40} color="#00f0ff" />
      </group>

      <group ref={ring2}>
        <mesh>
          <torusGeometry args={[2.7, 0.005, 8, 80]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.14} />
        </mesh>
        <RingDots radius={2.7} count={32} color="#8a2be2" />
      </group>

      <group ref={ring3}>
        <mesh>
          <torusGeometry args={[3.2, 0.004, 8, 80]} />
          <meshBasicMaterial color="#00ff9f" transparent opacity={0.09} />
        </mesh>
        <RingDots radius={3.2} count={24} color="#00ff9f" />
      </group>
    </group>
  )
}
