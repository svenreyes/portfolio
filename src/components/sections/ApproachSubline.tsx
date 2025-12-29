'use client';

import { useEffect, useRef, useState } from 'react';

export function ApproachSubline() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="w-full py-3 px-6 flex items-center justify-between transition-all duration-400"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      <span className="text-white/40 text-sm">↓</span>
      <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest text-center">
        A practical approach to building software that scales.
      </p>
      <span className="text-white/40 text-sm">↓</span>
    </div>
  );
}
