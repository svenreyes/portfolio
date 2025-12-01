/**
 * useSectionProgress Hook
 * 
 * Tracks scroll progress within sections. Returns the active section ID,
 * scroll progress (0-1) within that section, and a map of all section heights.
 * Used to animate progress indicators in the sidebar navigation.
 */
import { useState, useEffect } from 'react';

interface SectionProgress {
  id: string;
  progress: number;
  height: number;
}

interface SectionData {
  id: string;
  progress: number;
  heights: Map<string, number>;
}

export function useSectionProgress(sectionIds: string[]): SectionData {
  const [activeState, setActiveState] = useState<SectionProgress>({
    id: sectionIds[0] || '',
    progress: 0,
    height: 0,
  });

  const [sectionHeights, setSectionHeights] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const container = document.querySelector('[data-scroll-container]') as HTMLElement;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const viewportCenter = containerTop + containerHeight / 2;

      let currentSectionId = activeState.id;
      let currentProgress = 0;
      let currentHeight = 0;
      const heights = new Map<string, number>();

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const elementBottom = elementTop + elementHeight;

        heights.set(id, elementHeight);

        if (viewportCenter >= elementTop && viewportCenter < elementBottom) {
          currentSectionId = id;
          currentHeight = elementHeight;

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
      setActiveState({ id: currentSectionId, progress: currentProgress, height: currentHeight });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return {
    id: activeState.id,
    progress: activeState.progress,
    heights: sectionHeights,
  };
}
