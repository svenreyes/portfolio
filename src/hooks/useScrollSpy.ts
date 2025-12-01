/**
 * useScrollSpy Hook
 * 
 * Tracks which section is currently visible using IntersectionObserver.
 * Returns the ID of the most visible section based on intersection ratio.
 * 
 * useScrollToSection Hook
 * 
 * Provides instant navigation to a section by ID within a scroll container.
 */
'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
}

export function useScrollSpy({
  sectionIds,
  rootMargin = '-20% 0px -35% 0px',
}: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const sectionRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;

          if (entry.isIntersecting) {
            sectionRatios.set(sectionId, entry.intersectionRatio);
          } else {
            sectionRatios.set(sectionId, 0);
          }
        });

        let maxRatio = 0;
        let topSection = activeSection;

        sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            topSection = id;
          }
        });

        if (topSection && topSection !== activeSection) {
          setActiveSection(topSection);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    const sectionElements: Element[] = [];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        sectionElements.push(element);
      }
    });

    return () => {
      sectionElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [sectionIds, rootMargin, activeSection]);

  return activeSection;
}

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string, offset: number = 0) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const container = element.closest('[data-scroll-container]') as HTMLElement;
    if (!container) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' });
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const targetScrollTop =
      container.scrollTop + elementRect.top - containerRect.top - offset;

    container.scrollTo({
      top: targetScrollTop,
      behavior: 'instant',
    });
  }, []);

  return scrollToSection;
}
