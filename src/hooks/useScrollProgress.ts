'use client';

import { useEffect, useState } from 'react';

interface ScrollProgress {
  currentSection: number;
  totalSections: number;
  scrollProgress: number;
}

/**
 * useScrollProgress - Tracks scroll position and active section
 * State machine for section-based navigation
 */
export function useScrollProgress(sectionIds: string[]): ScrollProgress {
  const [currentSection, setCurrentSection] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Find active section based on viewport center
      const viewportCenter = scrollTop + windowHeight / 2;
      
      let activeSection = 1;
      sectionIds.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = scrollTop + rect.top;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (viewportCenter >= elementTop && viewportCenter < elementBottom) {
            activeSection = index + 1;
          }
        }
      });

      setCurrentSection(activeSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return {
    currentSection,
    totalSections: sectionIds.length,
    scrollProgress,
  };
}

