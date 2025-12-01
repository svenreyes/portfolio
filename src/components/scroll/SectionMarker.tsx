'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionMarkerProps {
  label: string;
  index: string;
  className?: string;
}

/**
 * SectionMarker - Sticky section labels that pin during scroll
 * Inspired by Raw Materials section headers
 */
export function SectionMarker({ label, index, className = '' }: SectionMarkerProps) {
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!markerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(markerRef.current, {
        scrollTrigger: {
          trigger: markerRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        opacity: 0,
        x: -30,
        ease: 'power2.out',
      });
    }, markerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={markerRef}
      className={`sticky top-8 left-0 z-40 flex items-center gap-4 mb-12 ${className}`}
    >
      <span className="text-xs text-white/40 font-light tracking-widest">
        {index}
      </span>
      <div className="h-px w-12 bg-white/20" />
      <h2 className="text-2xl text-white/90 font-light tracking-wide">
        {label}
      </h2>
    </div>
  );
}

