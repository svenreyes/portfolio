'use client';

import { useCallback } from 'react';

interface IndexCardProps {
    index: string;
    label: string;
    isActive: boolean;
    progress?: number; // 0 to 1
    cardHeight?: number; // Dynamic height in pixels
    onClick: () => void;
}

/**
 * Index Card Component - Matches Raw Materials styling
 * - Fixed height proportions
 * - Small index number + larger label
 * - Distinct hover and active states
 * - Expands when active with scroll progress indicator
 */
export function IndexCard({ index, label, isActive, progress = 0, cardHeight = 100, onClick }: IndexCardProps) {
    const handleClick = useCallback(() => {
        onClick();
    }, [onClick]);

    return (
        <button
            onClick={handleClick}
            style={{
                height: `${cardHeight}px`,
                minHeight: `${cardHeight}px`,
            }}
            className={`
        group relative w-full flex-shrink-0
        flex flex-col items-start 
        rounded-2xl border
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        overflow-hidden
        ${isActive
                    ? 'bg-white/10 border-white/40 backdrop-blur-md'
                    : 'bg-white/[0.03] border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20'
                }
      `}
        >
            {/* Content Container - Full height with space between */}
            <div className="absolute inset-0 p-4git flex flex-col items-start justify-between z-10">
                {/* Index Number - Top Left */}
                <span
                    className={`
            text-[11px] font-light tracking-[0.15em] uppercase
            transition-colors duration-300
            ${isActive ? 'text-white/90' : 'text-white/50 group-hover:text-white/70'}
          `}
                >
                    {index}
                </span>

                {/* Label - Bottom Left */}
                <span
                    className={`
            text-base font-normal tracking-wide
            transition-colors duration-300
            ${isActive ? 'text-white font-medium' : 'text-white/80 group-hover:text-white/95'}
          `}
                >
                    {label}
                </span>
            </div>

            {/* Progress Track (Only visible when active) */}
            <div
                className={`
                    absolute right-6 top-6 bottom-6 w-[1px]
                    transition-opacity duration-500 delay-100
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                `}
            >
                {/* Moving Circle Indicator */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{
                        top: `${progress * 100}%`,
                        transition: 'top 0.1s linear' // Smooth movement
                    }}
                />
            </div>

        </button>
    );
}
