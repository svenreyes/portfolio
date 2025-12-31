'use client';

import { useEffect, useRef } from 'react';
import { useScrollToSection } from '@/hooks/useScrollSpy';
import { useSectionContext } from '@/context/SectionContext';
import { SECTIONS } from '@/config/sections.config';
import { IndexCard } from '@/components/navigation/IndexCard';

// component count and size multiplier for each section
const SECTION_WEIGHTS: Record<string, number> = {
  hero: 1,
  about: 3,
  approach: 7,
  experience: 5,  // 5 work accordion items
  projects: 1.5,
  contact: 1,
};

export function SidebarNav() {
  const { id: activeSectionId, progress } = useSectionContext();
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
    const defaultHeight = 120;
    if (!isActive) return defaultHeight;

    // get weight for this section based on component count
    const weight = SECTION_WEIGHTS[sectionId] || 1;
    
    // expanded height scales with section weight
    const minExpandedHeight = 140;
    const heightPerWeight = 40;
    const maxHeight = 400;
    
    const calculatedHeight = Math.min(
      maxHeight,
      minExpandedHeight + (weight * heightPerWeight)
    );

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
