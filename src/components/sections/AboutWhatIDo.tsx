'use client';

import { useEffect, useRef, useState } from 'react';

export function AboutWhatIDo() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // body appears after headline animation completes
          setTimeout(() => setShowBody(true), 600);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headlineLines = ['I build software', 'with intention.'];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center p-8 md:p-12 lg:p-16"
    >
      <div className="max-w-5xl">
        {/* headline */}
        <h2 className="mb-12 md:mb-16">
          {headlineLines.map((line, i) => (
            <span
              key={i}
              className="block text-[clamp(2.5rem,8vw,6rem)] font-light leading-[1.05] tracking-tight text-white transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* body */}
        <div 
          className="max-w-2xl space-y-6 transition-all duration-700 ease-out"
          style={{
            opacity: showBody ? 0.7 : 0,
            transform: showBody ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <p className="text-base md:text-lg font-light leading-relaxed text-white">
            I'm a software engineer focused on creating systems and interfaces
            that are reliable, understandable, and built to last.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed text-white">
            My work spans backend logic, APIs, and frontend experiences —
            with an emphasis on clarity over complexity.
          </p>
        </div>
      </div>
    </div>
  );
}

