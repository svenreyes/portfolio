/**
 * SidebarNav Component
 * 
 * Vertical navigation sidebar containing IndexCards for each section.
 * Tracks active section based on scroll position and auto-scrolls to
 * keep the active card visible. Card heights dynamically adjust based
 * on section content length.
 */
'use client';

import { useEffect, useRef } from 'react';
import { useScrollToSection } from '@/hooks/useScrollSpy';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { SECTIONS } from '@/config/sections.config';
import { IndexCard } from '@/components/navigation/IndexCard';

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function SidebarNav() {
  const { id: activeSectionId, progress, heights } = useSectionProgress(SECTION_IDS);
  const scrollToSection = useScrollToSection();
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  const activeSectionIndex = SECTIONS.findIndex(s => s.id === activeSectionId);

  const getInactiveProgress = (sectionIndex: number): number => {
    if (sectionIndex < activeSectionIndex) return 1;
    return 0;
  };

  const getCardHeight = (sectionId: string, isActive: boolean): number => {
    if (!isActive) return 120;

    const sectionHeight = heights.get(sectionId) || 0;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const minSectionHeight = viewportHeight * 0.7;
    const maxSectionHeight = viewportHeight * 1.8;
    const minCardHeight = 140;
    const maxCardHeight = 320;

    const ratio = (sectionHeight - minSectionHeight) / (maxSectionHeight - minSectionHeight);
    const clampedRatio = Math.max(0, Math.min(1, ratio));
    const calculatedHeight = minCardHeight + (maxCardHeight - minCardHeight) * clampedRatio;

    return Math.round(calculatedHeight);
  };

  return (
    <nav className="w-full h-full flex flex-col gap-4 p-4">
      {SECTIONS.map((section, index) => {
        const isActive = activeSectionId === section.id;
        const cardHeight = getCardHeight(section.id, isActive);
        const cardProgress = isActive ? progress : getInactiveProgress(index);

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
              progress={cardProgress}
              cardHeight={cardHeight}
              onClick={() => scrollToSection(section.id, 0)}
            />
          </div>
        );
      })}
    </nav>
  );
}
