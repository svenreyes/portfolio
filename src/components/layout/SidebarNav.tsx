'use client';

import { useScrollToSection } from '@/hooks/useScrollSpy';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { SECTIONS } from '@/config/sections.config';
import { IndexCard } from '@/components/navigation/IndexCard';

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function SidebarNav() {
  // Use the new progress hook which gives us both the active ID and the progress
  const { id: activeSectionId, progress, heights } = useSectionProgress(SECTION_IDS);

  const scrollToSection = useScrollToSection();

  // Calculate dynamic card height based on section length
  const getCardHeight = (sectionId: string, isActive: boolean): number => {
    if (!isActive) return 100; // Collapsed height

    const sectionHeight = heights.get(sectionId) || 0;

    // Calculate proportional height
    // Min card height: 100px (when section is ~70vh)
    // Max card height: 300px (when section is ~180vh)
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const minSectionHeight = viewportHeight * 0.7;
    const maxSectionHeight = viewportHeight * 1.8;

    const minCardHeight = 100;
    const maxCardHeight = 300;

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
          <IndexCard
            key={section.id}
            index={section.index}
            label={section.label}
            isActive={isActive}
            progress={isActive ? progress : 0}
            cardHeight={cardHeight}
            onClick={() => scrollToSection(section.id, 0)}
          />
        );
      })}
    </nav>
  );
}


