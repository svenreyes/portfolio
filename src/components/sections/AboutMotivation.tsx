'use client';

import { useEffect, useRef, useState } from 'react';

export function AboutMotivation() {
  const [isVisible, setIsVisible] = useState(false);
  const [bodyStage, setBodyStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // stagger body paragraphs
          setTimeout(() => setBodyStage(1), 500);
          setTimeout(() => setBodyStage(2), 800);
          setTimeout(() => setBodyStage(3), 1100);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headlineLines = ['I enjoy turning', 'ideas into systems.'];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center p-8 md:p-12 lg:p-16"
    >
      <div className="max-w-5xl">
        {/* headline with scale-in effect */}
        <h2 className="mb-12 md:mb-16">
          {headlineLines.map((line, i) => (
            <span
              key={i}
              className="block text-[clamp(2.5rem,8vw,6rem)] font-light leading-[1.05] tracking-tight text-white transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.98)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* body paragraphs stagger in */}
        <div className="max-w-2xl space-y-6">
          <p 
            className="text-base md:text-lg font-light leading-relaxed text-white transition-all duration-600 ease-out"
            style={{
              opacity: bodyStage >= 1 ? 0.7 : 0,
              transform: bodyStage >= 1 ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            I like working on problems where structure matters —
            where small decisions compound into something meaningful.
          </p>
          <p 
            className="text-base md:text-lg font-light leading-relaxed text-white transition-all duration-600 ease-out"
            style={{
              opacity: bodyStage >= 2 ? 0.7 : 0,
              transform: bodyStage >= 2 ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            Building software gives me a way to think clearly, iterate quickly,
            and ship things that people actually use.
          </p>
          
          {/* closing line */}
          <p 
            className="text-sm font-light leading-relaxed text-white/50 pt-4 transition-all duration-600 ease-out"
            style={{
              opacity: bodyStage >= 3 ? 1 : 0,
              transform: bodyStage >= 3 ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            The process matters as much as the outcome.
          </p>
        </div>
      </div>
    </div>
  );
}

