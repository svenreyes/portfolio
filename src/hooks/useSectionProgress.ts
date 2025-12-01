import { useState, useEffect } from 'react';

interface SectionProgress {
    id: string;
    progress: number;
    height: number; // Height of the section in pixels
}

interface SectionData {
    id: string;
    progress: number;
    heights: Map<string, number>; // All section heights
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

                // Store height
                heights.set(id, elementHeight);

                // Check if this section contains the center of the viewport
                if (viewportCenter >= elementTop && viewportCenter < elementBottom) {
                    currentSectionId = id;
                    currentHeight = elementHeight;

                    // Calculate progress 0-1
                    const scrollableDistance = elementHeight - containerHeight;

                    if (scrollableDistance <= 0) {
                        // Section fits in viewport, progress is 0
                        currentProgress = 0;
                    } else {
                        // Calculate how far we've scrolled into the section
                        const scrolledWithin = containerTop - elementTop;
                        currentProgress = scrolledWithin / scrollableDistance;
                    }

                    // Clamp between 0 and 1
                    currentProgress = Math.max(0, Math.min(1, currentProgress));
                }
            }

            setSectionHeights(heights);
            setActiveState({ id: currentSectionId, progress: currentProgress, height: currentHeight });
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
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
