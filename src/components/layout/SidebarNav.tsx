'use client';

import { useEffect, useRef } from 'react';
import { useScrollToSection } from '@/hooks/useScrollSpy';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { SECTIONS } from '@/config/sections.config';
import { IndexCard } from '@/components/navigation/IndexCard';

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function SidebarNav() {
  // Use the new progress hook which gives us both the active ID and the progress
  const { id: activeSectionId, progress, heights } = useSectionProgress(SECTION_IDS);

  const scrollToSection = useScrollToSection();
  
  // Refs for each card to enable auto-scrolling
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Auto-scroll to active card when it changes
  useEffect(() => {
    if (!activeSectionId) return;
    
    const activeCardRef = cardRefs.current.get(activeSectionId);
    if (activeCardRef) {
      activeCardRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSectionId]);

  // Calculate dynamic card height based on section length
  const getCardHeight = (sectionId: string, isActive: boolean): number => {
    if (!isActive) return 120; // Collapsed height (increased from 100)

    const sectionHeight = heights.get(sectionId) || 0;

    // Calculate proportional height
    // Min card height: 140px (when section is ~70vh)
    // Max card height: 320px (when section is ~180vh)
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const minSectionHeight = viewportHeight * 0.7;
    const maxSectionHeight = viewportHeight * 1.8;

    const minCardHeight = 140;
    const maxCardHeight = 320;

    // Linear interpolation
    const ratio = (sectionHeight - minSectionHeight) / (maxSectionHeight - minSectionHeight);
    const clampedRatio = Math.max(0, Math.min(1, ratio));
    const calculatedHeight = minCardHeight + (maxCardHeight - minCardHeight) * clampedRatio;

    return Math.round(calculatedHeight);
  };

  return (
    <nav className="w-full h-full flex flex-col gap-4 p-4">
      {SECTIONS.map((section) => {
        const isActive = activeSectionId === section.id;
        const cardHeight = getCardHeight(section.id, isActive);

        return (
          <div
            key={section.id}
            ref={(el) => {
              if (el) {
                cardRefs.current.set(section.id, el);
              } else {
                cardRefs.current.delete(section.id);
              }
            }}
          >
            <IndexCard
              index={section.index}
              label={section.label}
              isActive={isActive}
              progress={isActive ? progress : 0}
              cardHeight={cardHeight}
              onClick={() => scrollToSection(section.id, 0)}
            />
          </div>
        );
      })}
    </nav>
  );
}


