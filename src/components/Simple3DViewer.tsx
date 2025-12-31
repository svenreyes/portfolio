/**
 * Simple3DViewer Component
 * 
 * A 3D model viewer with mouse parallax, hover rotation, drag rotation, and auto-rotation.
 * Uses @react-three/fiber and @react-three/drei for rendering GLB/GLTF models.
 * Only loads and renders when in viewport for performance.
 */
'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  mousePos: { x: number; y: number };
  dragRotation: { x: number; y: number };
  isDragging: boolean;
  scale?: number;
}

function Model({ 
  url, 
  autoRotate = true, 
  rotateSpeed = 0.0005, 
  mousePos, 
  dragRotation,
  isDragging,
  scale = 1.8
}: ModelProps) {
  const { scene, materials } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const baseRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.isMeshStandardMaterial) {
            mat.metalness = 0.9;
            mat.roughness = 0.15;
            mat.envMapIntensity = 2.5;
            mat.needsUpdate = true;
          }
        }
      }
    });
  }, [scene, materials]);

  useFrame(() => {
    if (!groupRef.current) return;

    // Auto rotation (only when not dragging)
    if (autoRotate && !isDragging) {
      baseRotation.current.y += rotateSpeed;
    }

    // Mouse parallax and hover rotation (reduced when dragging)
    const parallaxStrength = isDragging ? 0 : 0.15;
    const hoverStrength = isDragging ? 0 : 0.3;
    
    targetRotation.current.x = mousePos.y * hoverStrength;
    targetRotation.current.y = mousePos.x * hoverStrength;

    // Smooth interpolation
    const ease = 0.08;
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * ease;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * ease;

    // Apply rotations: base (auto + drag) + hover effects
    groupRef.current.rotation.x = dragRotation.x + currentRotation.current.x;
    groupRef.current.rotation.y = baseRotation.current.y + dragRotation.y + currentRotation.current.y;

    // Parallax position offset
    groupRef.current.position.x = mousePos.x * parallaxStrength * 0.5;
    groupRef.current.position.y = -mousePos.y * parallaxStrength * 0.3;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#ffeedd" />
      <directionalLight position={[0, -10, 5]} intensity={0.5} color="#aaccff" />
      <spotLight 
        position={[5, 10, 5]} 
        intensity={1} 
        angle={0.3} 
        penumbra={1} 
        color="#ffffff"
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffddcc" />
    </>
  );
}

interface Simple3DViewerProps {
  modelUrl: string;
  autoRotate?: boolean;
  rotateSpeed?: number;
  scale?: number;
  className?: string;
}

export function Simple3DViewer({ 
  modelUrl, 
  autoRotate = true, 
  rotateSpeed = 0.0005,
  scale = 1.8,
  className = ''
}: Simple3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // only load when in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasLoaded(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // mouse tracking only when visible
  useEffect(() => {
    if (!isVisible) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });

      // Handle drag rotation
      if (isDragging) {
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;
        
        setDragRotation(prev => ({
          x: Math.max(-1.5, Math.min(1.5, prev.x + deltaY * 0.003)),
          y: prev.y + deltaX * 0.008
        }));
        
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      ) {
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isVisible]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {hasLoaded && (
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 50 }}
          style={{ background: 'transparent' }}
          frameloop={isVisible ? 'always' : 'demand'}
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
        >
          <Lights />
          
          <Suspense fallback={null}>
            <Model 
              url={modelUrl} 
              autoRotate={autoRotate} 
              rotateSpeed={rotateSpeed}
              mousePos={mousePos}
              dragRotation={dragRotation}
              isDragging={isDragging}
              scale={scale}
            />
            <Environment preset="studio" background={false} />
          </Suspense>
        </Canvas>
      )}
      
      {!hasLoaded && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white/40 text-sm">Loading 3D model...</div>
        </div>
      )}
    </div>
  );
}
