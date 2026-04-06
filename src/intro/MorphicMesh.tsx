import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMouse } from '../hooks/useMouse'

const NOISE_GLSL = /* glsl */ `
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const vertexShader = NOISE_GLSL + /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uFrequency;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;
varying vec3 vWorldPos;

void main() {
  vec3 pos = position;
  vec3 noiseInput = pos * uFrequency + vec3(uMouse * 0.5, uTime * 0.3);
  float displacement = snoise(noiseInput) * uAmplitude;
  displacement += snoise(pos * uFrequency * 3.0 + uTime * 0.5) * uAmplitude * 0.25;
  // Third octave for micro-detail
  displacement += snoise(pos * uFrequency * 6.0 + uTime * 0.8) * uAmplitude * 0.08;
  pos += normal * displacement;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  vWorldPos = pos;
  vDisplacement = displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;
varying vec3 vWorldPos;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  // Three-color gradient based on fresnel + displacement
  float t = clamp(fresnel + vDisplacement * 0.5, 0.0, 1.0);
  vec3 color;
  if (t < 0.5) {
    color = mix(uColorA, uColorB, t * 2.0);
  } else {
    color = mix(uColorB, uColorC, (t - 0.5) * 2.0);
  }

  // Rim glow – brighter, multi-hued
  color += fresnel * vec3(0.0, 0.94, 1.0) * 0.6;
  color += fresnel * fresnel * vec3(0.54, 0.17, 0.89) * 0.3;

  // Enhanced iridescence with two wave frequencies
  float iri1 = sin(vDisplacement * 12.0 + uTime * 0.5) * 0.12;
  float iri2 = sin(vWorldPos.y * 8.0 + uTime * 0.3) * 0.06;
  color += vec3(iri1, iri1 * 0.5 + iri2, -iri1 + iri2) * fresnel;

  // Subtle energy pulse
  float pulse = sin(uTime * 1.5) * 0.04 + 0.04;
  color += pulse * vec3(0.0, 0.94, 1.0);

  float alpha = 0.85 + fresnel * 0.15;
  gl_FragColor = vec4(color, alpha);
}
`

/* Inner glow core fragment */
const coreFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uCoreColor;

varying vec3 vNormal;
varying vec3 vPos;

void main() {
  vec3 viewDir = normalize(-vPos);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0);
  float pulse = 0.6 + 0.4 * sin(uTime * 2.0);
  float alpha = fresnel * pulse * 0.35;
  gl_FragColor = vec4(uCoreColor, alpha);
}
`

const coreVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vPos;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

interface MorphicMeshProps {
  amplitudeOverride?: number
}

const SURFACE_DETAIL = 4
const WIREFRAME_DETAIL = 2

export function MorphicMesh({ amplitudeOverride }: MorphicMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const coreMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const mouse = useMouse()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uAmplitude: { value: 0.3 },
    uFrequency: { value: 1.5 },
    uColorA: { value: new THREE.Color('#00f0ff') },
    uColorB: { value: new THREE.Color('#8a2be2') },
    uColorC: { value: new THREE.Color('#00ff9f') },
  }), [])

  const coreUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCoreColor: { value: new THREE.Color('#00f0ff') },
  }), [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Subtle breathing scale
    const breath = 1.0 + Math.sin(t * 0.8) * 0.015

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t
      materialRef.current.uniforms.uMouse.value.set(mouse.x, mouse.y)
      if (amplitudeOverride !== undefined) {
        materialRef.current.uniforms.uAmplitude.value = amplitudeOverride
      }
    }

    if (coreMaterialRef.current) {
      coreMaterialRef.current.uniforms.uTime.value = t
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.15
      meshRef.current.scale.setScalar(breath)
    }

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08
      wireRef.current.rotation.x = Math.sin(t * 0.05) * 0.15
      wireRef.current.scale.setScalar(breath * 1.01)
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.08
      coreRef.current.rotation.x = Math.sin(t * 0.05) * 0.15
      coreRef.current.scale.setScalar(breath * 0.7)
    }
  })

  return (
    <group>
      {/* Main surface */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, SURFACE_DETAIL]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef} scale={1.01}>
        <icosahedronGeometry args={[1.5, WIREFRAME_DETAIL]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Inner glow core */}
      <mesh ref={coreRef} scale={0.7}>
        <icosahedronGeometry args={[1.5, 3]} />
        <shaderMaterial
          ref={coreMaterialRef}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
