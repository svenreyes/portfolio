'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float time;

  // 2D random noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  // Fractal Brownian Motion
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float freq = 0.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.55;
    }
    return value;
  }
  void main() {
    // Scale and animate UVs for big, soft clouds
    float loopT = 36.0; // Slow animation
    float t = mod(time, loopT);
    vec2 uv = vUv * 2.5;
    vec2 offset = vec2(
      sin(t * 2.0 * 3.14159 / loopT),
      cos(t * 2.0 * 3.14159 / loopT)
    ) * 0.8; // Subtle movement
    float n = fbm(uv + offset + 0.1 * sin(uv.yx + t * 0.1));
    float n2 = fbm(uv * 0.7 - offset * 0.3 - 0.1 * cos(uv.yx + t * 0.12));
    float cloud = smoothstep(0.3, 0.65, mix(n, n2, 0.5));
    
    // Golden palette inspired by the screenshot
    // Base paper color ~ #C49A6C / #D1A875
    // Highlight ~ #EAD0A3
    // Shadow ~ #9B7653
    vec3 color1 = vec3(0.6078, 0.4627, 0.3255); // #9B7653 (shadow)
    vec3 color2 = vec3(0.7686, 0.6039, 0.4235); // #C49A6C (base)
    vec3 color3 = vec3(0.8196, 0.6588, 0.4588); // #D1A875 (light base)
    vec3 color4 = vec3(0.9176, 0.8157, 0.6392); // #EAD0A3 (highlight)
    
    vec3 color;
    if (cloud < 0.33) {
      color = mix(color1, color2, cloud * 3.0);
    } else if (cloud < 0.66) {
      color = mix(color2, color3, (cloud - 0.33) * 3.0);
    } else {
      color = mix(color3, color4, (cloud - 0.66) * 3.0);
    }
    
    float alpha = 0.6 * cloud + 0.2;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function SmokeBackground() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          time: { value: 0 },
        },
      }),
    []
  );

  useFrame(({ clock }) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -40]} scale={[100, 60, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <primitive object={shaderMaterial} attach="material" ref={materialRef} />
    </mesh>
  );
}

