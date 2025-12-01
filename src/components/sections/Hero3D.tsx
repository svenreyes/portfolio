/**
 * Hero3D Component
 * 
 * Landing hero section featuring a 3D model viewer centered in the viewport
 * with name and tagline positioned around the model.
 */
'use client';

import dynamic from 'next/dynamic';

const Simple3DViewer = dynamic(
  () => import('@/components/Simple3DViewer').then(mod => mod.Simple3DViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    )
  }
);

interface Hero3DProps {
  name?: string;
  tagline?: string;
  modelUrl?: string;
}

export function Hero3D({ 
  name = 'Sven Reyes', 
  tagline = 'we are looking to bring\nyou enlightenment\nTo offer illumination in\nstormy skies',
  modelUrl = '/3D/angel1.glb'
}: Hero3DProps) {
  return (
    <div className="relative w-full min-h-[80vh] flex items-center justify-center">
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-xl md:text-2xl font-light text-white tracking-wide">
          {name}
        </h1>
      </div>

      <div className="absolute top-8 right-8 z-10 text-right">
        {tagline.split('\n').map((line, i) => (
          <p key={i} className="text-sm md:text-base font-light text-white/80 italic leading-relaxed">
            {line}
          </p>
        ))}
      </div>

      <div className="w-full h-[75vh]">
        <Simple3DViewer 
          modelUrl={modelUrl} 
          autoRotate={true} 
          rotateSpeed={0.003}
        />
      </div>
    </div>
  );
}
