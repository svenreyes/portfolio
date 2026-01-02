'use client';

import { Canvas } from '@react-three/fiber';
import { SmokeBackground } from './SmokeBackground';

interface CloudyBackgroundProps {
  zIndex?: number;
  height?: string;
}

export function CloudyBackground({ zIndex = 0, height = '100vh' }: CloudyBackgroundProps) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height,
        zIndex,
        pointerEvents: 'none',
      }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <SmokeBackground />
    </Canvas>
  );
}

