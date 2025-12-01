'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';

interface UseScrollSpyOptions {
    sectionIds: string[];
    offset?: number; // Offset from top of viewport (in pixels)
    rootMargin?: string; // IntersectionObserver rootMargin
}

/**
 * Custom hook to track which section is currently visible/active
 * Uses IntersectionObserver for performance
 */
export function useScrollSpy({
    sectionIds,
    offset = 0,
    rootMargin = '-20% 0px -35% 0px', // Top 20%, bottom 35% of viewport
}: UseScrollSpyOptions) {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

    useEffect(() => {
        // Store intersection ratios for all sections
        const sectionRatios = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const sectionId = entry.target.id;

                    // Update the ratio for this section
                    if (entry.isIntersecting) {
                        sectionRatios.set(sectionId, entry.intersectionRatio);
                    } else {
                        sectionRatios.set(sectionId, 0);
                    }
                });

                // Find the section with the highest intersection ratio
                let maxRatio = 0;
                let topSection = activeSection;

                sectionRatios.forEach((ratio, id) => {
                    if (ratio > maxRatio) {
                        maxRatio = ratio;
                        topSection = id;
                    }
                });

                // Update active section if changed
                if (topSection && topSection !== activeSection) {
                    setActiveSection(topSection);
                }
            },
            {
                rootMargin,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            }
        );

        // Observe all sections
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

/**
 * Helper hook to scroll to a section smoothly
 */
export function useScrollToSection() {
    const scrollToSection = useCallback((sectionId: string, offset: number = 0) => {
        const element = document.getElementById(sectionId);
        if (!element) return;

        const container = element.closest('[data-scroll-container]') as HTMLElement;
        if (!container) {
            // Fallback to element scroll
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        // Calculate target scroll position
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const targetScrollTop =
            container.scrollTop + elementRect.top - containerRect.top - offset;

        // Smooth scroll
        container.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth',
        });
    }, []);

    return scrollToSection;
}
