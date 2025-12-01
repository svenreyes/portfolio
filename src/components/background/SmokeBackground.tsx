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
  
  // Enhanced Fractal Brownian Motion with domain warping for more detail
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // Domain warping for organic turbulence
    vec2 shift = vec2(100.0, 50.0);
    vec2 warp = vec2(0.0);
    
    // Increased octaves from 6 to 8 for more detail
    for (int i = 0; i < 8; i++) {
      // Add warping effect
      warp += noise(st * frequency + shift + time * 0.02) * amplitude * 0.5;
      value += amplitude * noise(st * frequency + warp);
      
      // Evolve parameters
      st *= 2.1; // Slightly irregular scaling for more organic look
      amplitude *= 0.48; // Slightly lower falloff for more persistent detail
      frequency *= 2.0;
      shift += vec2(0.5, -0.3); // Shift for variety
    }
    
    return value;
  }
  
  void main() {
    // Scale and animate UVs for cloud formations
    float loopT = 40.0; // Slower animation for ambient feel
    float t = mod(time, loopT);
    
    // Larger scale for bigger cloud formations
    vec2 uv = vUv * 2.2;
    
    // Slow circular drift
    vec2 offset = vec2(
      sin(t * 2.0 * 3.14159 / loopT) * 0.6,
      cos(t * 2.0 * 3.14159 / loopT) * 0.6
    );
    
    // Two layers of FBM at different scales for depth
    float n1 = fbm(uv + offset);
    float n2 = fbm(uv * 1.3 - offset * 0.7 + vec2(1.5, -0.8));
    
    // Combine layers with domain distortion
    float combined = mix(n1, n2, 0.6);
    
    // Sharper cloud edges using smoothstep with tighter range
    // This creates more defined cloud boundaries
    float cloud = smoothstep(0.35, 0.68, combined);
    
    // Add some subtle variation within clouds
    float detail = fbm(uv * 4.0 + offset * 0.5) * 0.15;
    cloud = clamp(cloud + detail * cloud, 0.0, 1.0);
    
    // DARK palette - nearly black with subtle dark tones
    // NO white or brightness
    // Darkest: Near black with brown hint
    vec3 color1 = vec3(0.08, 0.07, 0.06); // #141211
    // Dark: Very dark brown-gray
    vec3 color2 = vec3(0.12, 0.11, 0.09); // #1F1C17
    // Mid-dark: Dark brown
    vec3 color3 = vec3(0.16, 0.14, 0.12); // #29241F
    // Lightest: Still very dark brown-gray
    vec3 color4 = vec3(0.20, 0.18, 0.15); // #332E26
    
    // Smooth color gradients based on cloud density
    vec3 color;
    if (cloud < 0.25) {
      color = mix(color1, color2, cloud * 4.0);
    } else if (cloud < 0.5) {
      color = mix(color2, color3, (cloud - 0.25) * 4.0);
    } else if (cloud < 0.75) {
      color = mix(color3, color4, (cloud - 0.5) * 4.0);
    } else {
      color = color4;
    }
    
    // Add subtle color variation for depth
    float colorNoise = noise(uv * 1.5 + offset) * 0.08;
    color = clamp(color + colorNoise, 0.0, 1.0);
    
    // Alpha blending - barely visible clouds like aged parchment texture
    // Extremely subtle presence to match reference image
    float alpha = smoothstep(0.0, 0.4, cloud) * 0.25; // Very low alpha for subtle texture
    
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

