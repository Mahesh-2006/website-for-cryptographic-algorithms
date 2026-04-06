import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 400

export function Particles() {
  const ref = useRef<THREE.Points>(null)

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 14
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 3 + 0.5
    }
    return { positions, sizes }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#00f0ff') },
      uColor2: { value: new THREE.Color('#8a2be2') },
    }),
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={COUNT} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float aSize;
          uniform float uTime;
          varying float vAlpha;
          varying float vColorMix;

          void main() {
            vec3 pos = position;
            pos.y += sin(uTime * 0.25 + position.x * 0.4) * 0.4;
            pos.x += cos(uTime * 0.18 + position.z * 0.3) * 0.3;
            pos.z += sin(uTime * 0.12 + position.y * 0.25) * 0.2;

            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * (220.0 / -mv.z);

            float twinkle = sin(uTime * 1.2 + position.x * 3.0 + position.y * 2.0) * 0.5 + 0.5;
            vAlpha = (0.25 + 0.75 * twinkle) * smoothstep(16.0, 4.0, length(position));
            vColorMix = sin(position.x * 0.5 + position.z * 0.3 + uTime * 0.15) * 0.5 + 0.5;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vAlpha;
          varying float vColorMix;

          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float soft = smoothstep(0.5, 0.05, d);
            vec3 col = mix(uColor1, uColor2, vColorMix);
            gl_FragColor = vec4(col, soft * vAlpha);
          }
        `}
      />
    </points>
  )
}
