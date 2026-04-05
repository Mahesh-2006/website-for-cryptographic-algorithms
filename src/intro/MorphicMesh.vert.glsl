uniform float uTime;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uFrequency;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

#include ../shaders/noise.glsl

void main() {
  vec3 pos = position;

  vec3 noiseInput = pos * uFrequency + vec3(uMouse * 0.5, uTime * 0.3);
  float displacement = snoise(noiseInput) * uAmplitude;
  displacement += snoise(pos * uFrequency * 3.0 + uTime * 0.5) * uAmplitude * 0.25;

  pos += normal * displacement;

  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  vDisplacement = displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
