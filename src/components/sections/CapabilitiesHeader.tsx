'use client';

import { useEffect, useRef, useState } from 'react';

export function CapabilitiesHeader() {
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
      className="w-full py-6 md:py-8 px-6 md:px-8 flex items-center justify-between border border-white/20 rounded-[16px] transition-all duration-500 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
      }}
    >
      <span className="text-white/40 text-xs">(Software)</span>
      <span className="text-[clamp(1.5rem,5vw,4rem)] font-light text-white text-center">
        Capabilities
      </span>
      <span className="text-white/40 text-xs">(Engineering)</span>
    </div>
  );
}

