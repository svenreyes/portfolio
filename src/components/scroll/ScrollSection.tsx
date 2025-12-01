'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
  children: ReactNode;
  sectionId: string;
  className?: string;
  pin?: boolean;
  markers?: boolean;
}

/**
 * ScrollSection - Container for scroll-driven narrative sections
 * Inspired by Raw Materials: https://www.therawmaterials.com/talent
 */
export function ScrollSection({
  children,
  sectionId,
  className = '',
  pin = false,
  markers = false
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Progressive reveal animation
      const reveals = sectionRef.current?.querySelectorAll('.reveal');

      reveals?.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            markers: markers,
          },
          opacity: 0,
          y: 60,
          ease: 'power2.out',
        });
      });

      // Stack and resolve headlines
      const headlines = sectionRef.current?.querySelectorAll('.headline-stack');

      headlines?.forEach((element, index) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1.5,
            markers: markers,
          },
          opacity: 0,
          y: 80,
          scale: 0.95,
          ease: 'power3.out',
          delay: index * 0.1,
        });
      });

      // Pin section if enabled
      if (pin && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          markers: markers,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [pin, markers]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={`min-h-screen relative ${className}`}
      data-section={sectionId}
    >
      {children}
    </section>
  );
}

