'use client';

import { useEffect, useRef, useState } from 'react';

interface ApproachBarProps {
  text: string;
  leftLabel: string;
  rightLabel: string;
}

export function ApproachBar({ text, leftLabel, rightLabel }: ApproachBarProps) {
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
      className="w-full py-4 md:py-5 px-6 md:px-8 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
      }}
    >
      <span className="text-white/40 text-[10px] md:text-xs">{leftLabel}</span>
      <span className="text-[clamp(1.25rem,4vw,3rem)] font-light text-white text-center">
        {text}
      </span>
      <span className="text-white/40 text-[10px] md:text-xs">{rightLabel}</span>
    </div>
  );
}
