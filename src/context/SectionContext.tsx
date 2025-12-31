'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SectionProgress {
  id: string;
  progress: number;
  heights: Map<string, number>;
}

const SECTION_IDS = ['hero', 'about', 'approach', 'experience', 'projects', 'contact'];

const SectionContext = createContext<SectionProgress>({
  id: 'hero',
  progress: 0,
  heights: new Map(),
});

export function SectionProvider({ children }: { children: ReactNode }) {
  const [activeState, setActiveState] = useState({
    id: SECTION_IDS[0],
    progress: 0,
  });
  const [sectionHeights, setSectionHeights] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const container = document.querySelector('[data-scroll-container]') as HTMLElement;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const viewportCenter = containerTop + containerHeight / 2;

        let currentSectionId = activeState.id;
        let currentProgress = 0;
        const heights = new Map<string, number>();

        for (const id of SECTION_IDS) {
          const element = document.getElementById(id);
          if (!element) continue;

          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const elementBottom = elementTop + elementHeight;

          heights.set(id, elementHeight);

          if (viewportCenter >= elementTop && viewportCenter < elementBottom) {
            currentSectionId = id;

            const scrollableDistance = elementHeight - containerHeight;

            if (scrollableDistance <= 0) {
              currentProgress = 0;
            } else {
              const scrolledWithin = containerTop - elementTop;
              currentProgress = scrolledWithin / scrollableDistance;
            }

            currentProgress = Math.max(0, Math.min(1, currentProgress));
          }
        }

        setSectionHeights(heights);
        setActiveState({ id: currentSectionId, progress: currentProgress });
        ticking = false;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <SectionContext.Provider value={{ 
      id: activeState.id, 
      progress: activeState.progress, 
      heights: sectionHeights 
    }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSectionContext() {
  return useContext(SectionContext);
}

export { SECTION_IDS };

