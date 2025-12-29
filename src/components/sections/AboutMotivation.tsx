'use client';

import { useEffect, useRef, useState } from 'react';

export function AboutMotivation() {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStage(1);
          setTimeout(() => setStage(2), 400);
          setTimeout(() => setStage(3), 800);
          setTimeout(() => setStage(4), 1200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative w-full py-12 md:py-20 px-6 md:px-10"
    >
      {/* mission section */}
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 mb-8">
        <div 
          className="text-md text-white/90 font-medium transition-all duration-500"
          style={{ opacity: stage >= 1 ? 1 : 0 }}
        >
          My Mission
        </div>
        <h2 
          className="text-[clamp(1.75rem,5vw,3.5rem)] font-light leading-[1.15] text-white transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          I'm building software to turn<br />
          complex ideas into systems<br />
          people can trust.
        </h2>
      </div>

      {/* divider 1 */}
      <div className="h-px bg-white/20 mb-8 origin-left transition-transform duration-700 ease-out" 
        style={{ transform: stage >= 2 ? 'scaleX(1)' : 'scaleX(0)' }}
      />

      {/* challenge section */}
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 mb-8">
        <div 
          className="flex flex-col gap-1 transition-all duration-500"
          style={{ opacity: stage >= 2 ? 1 : 0 }}
        >
          <span className="text-sm px-3 py-0.5 rounded-full border border-white/60 text-white/60 w-fit">01</span>
          <span className="text-md text-white/90 font-medium">Challenge</span>
        </div>
        <div 
          className="transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <p className="text-[clamp(1.5rem,4vw,2.75rem)] font-light leading-[1.2] text-white mb-4">
            Modern software is often overengineered,<br />
            hard to reason about, and fragile at scale.
          </p>
          <p 
            className="text-[clamp(1.5rem,4vw,2.75rem)] font-light leading-[1.2] text-white/50 transition-all duration-500"
            style={{ 
              opacity: stage >= 3 ? 1 : 0,
              transform: stage >= 3 ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            Complexity grows faster than clarity.
          </p>
        </div>
      </div>

      {/* divider 2 */}
      <div className="h-px bg-white/20 mb-8 origin-left transition-transform duration-700 ease-out" 
        style={{ transform: stage >= 3 ? 'scaleX(1)' : 'scaleX(0)' }}
      />

      {/* goal section */}
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12">
        <div 
          className="flex flex-col gap-1 transition-all duration-500"
          style={{ opacity: stage >= 4 ? 1 : 0 }}
        >
          <span className="text-sm px-3 py-0.5 rounded-full border border-white/60 text-white/60 w-fit">02</span>
          <span className="text-md text-white/90 font-medium">Goal</span>
        </div>
        <div 
          className="transition-all duration-700 ease-out"
          style={{
            opacity: stage >= 4 ? 1 : 0,
            transform: stage >= 4 ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <p className="text-[clamp(1.5rem,4vw,2.75rem)] font-light leading-[1.2] text-white mb-6">
            Build systems that are simple to understand,<br />
            resilient under pressure,<br />
            and designed with long-term ownership in mind.
          </p>
          <p className="text-base text-white/40 font-light">
            Software that works — and keeps working.
          </p>
        </div>
      </div>
    </div>
  );
}
