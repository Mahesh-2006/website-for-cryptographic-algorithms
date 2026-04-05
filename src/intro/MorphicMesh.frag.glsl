uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  vec3 color = mix(uColorA, uColorB, fresnel + vDisplacement * 0.5);

  // Rim glow
  color += fresnel * vec3(0.0, 0.94, 1.0) * 0.5;

  // Subtle iridescence shift over time
  float iridescence = sin(vDisplacement * 10.0 + uTime * 0.5) * 0.1;
  color += vec3(iridescence, iridescence * 0.5, -iridescence) * fresnel;

  float alpha = 0.82 + fresnel * 0.18;
  gl_FragColor = vec4(color, alpha);
}
