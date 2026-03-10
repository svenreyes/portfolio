'use client';

import { useEffect, useRef } from 'react';
import { useScrollToSection } from '@/hooks/useScrollSpy';
import { useSectionContext } from '@/context/SectionContext';
import { SECTIONS } from '@/config/sections.config';
import { useTheme } from '@/context/ThemeContext';

const SECTION_WEIGHTS: Record<string, number> = {
  hero: 1,
  about: 3,
  approach: 7,
  experience: 5,
  contact: 1,
};

export function MobileBottomNav() {
  const { id: activeSectionId, progress } = useSectionContext();
  const scrollToSection = useScrollToSection();
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const { theme, isThemed } = useTheme();

  const activeSectionIndex = SECTIONS.findIndex(s => s.id === activeSectionId);

  useEffect(() => {
    if (!activeSectionId || !scrollRef.current) return;
    const activeCard = cardRefs.current.get(activeSectionId);
    if (!activeCard) return;

    const container = scrollRef.current;
    const cardLeft = activeCard.offsetLeft;
    const cardWidth = activeCard.offsetWidth;
    const containerWidth = container.clientWidth;
    const scrollTarget = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }, [activeSectionId]);

  const getCardWidth = (sectionId: string): number => {
    const weight = SECTION_WEIGHTS[sectionId] || 1;
    const minWidth = 70;
    const widthPerWeight = 30;
    const maxWidth = 280;
    return Math.min(maxWidth, minWidth + (weight * widthPerWeight));
  };

  const hasNoBorder = isThemed && theme.noBorder;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{ backgroundColor: theme.background || 'rgb(10, 10, 10)' }}
    >
      <div
        ref={scrollRef}
        className="flex gap-2 px-3 py-3 overflow-x-auto scrollbar-none"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {SECTIONS.map((section, index) => {
          const isActive = activeSectionId === section.id;
          const cardWidth = getCardWidth(section.id);
          const cardProgress = isActive
            ? progress
            : index < activeSectionIndex
              ? 1
              : 0;

          const bgColor = isThemed && theme.componentBg
            ? theme.componentBg
            : isActive
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.05)';

          const borderColor = hasNoBorder
            ? 'transparent'
            : isActive
              ? 'rgba(255, 255, 255, 0.4)'
              : 'rgba(255, 255, 255, 0.1)';

          const textColor = isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)';
          const indexColor = isActive
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(255, 255, 255, 0.5)';

          return (
            <button
              key={section.id}
              ref={(el) => {
                if (el) cardRefs.current.set(section.id, el);
                else cardRefs.current.delete(section.id);
              }}
              onClick={() => scrollToSection(section.id, 0)}
              className={`
                flex-shrink-0 rounded-[12px] p-3 flex flex-col justify-between
                transition-all duration-300 overflow-hidden relative
                ${!isThemed && isActive ? 'backdrop-blur-md' : ''}
                ${!isThemed && !isActive ? 'backdrop-blur-sm' : ''}
              `}
              style={{
                width: `${cardWidth}px`,
                height: '70px',
                backgroundColor: bgColor,
                borderWidth: hasNoBorder ? '0px' : '1px',
                borderStyle: hasNoBorder ? 'none' : 'solid',
                borderColor,
              }}
            >
              <span
                style={{ color: indexColor }}
                className="text-[10px] font-bold tracking-[0.15em] uppercase"
              >
                {section.index}
              </span>
              <span
                style={{ color: textColor }}
                className="text-xs font-bold tracking-wide text-left"
              >
                {section.label}
              </span>

              {isActive && (
                <div className="absolute left-3 right-3 bottom-2 h-[1px]">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    style={{ left: `${cardProgress * 100}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
