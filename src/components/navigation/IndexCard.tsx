'use client';

import { useCallback, useRef, useEffect } from 'react';

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
            }}
            className={`
        group relative w-full
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
            {/* Content Container - Pinned to top */}
            <div className="absolute top-0 left-0 w-full p-6 flex flex-col items-start gap-2 z-10">
                {/* Index Number */}
                <span
                    className={`
            text-[11px] font-light tracking-[0.15em] uppercase
            transition-colors duration-300
            ${isActive ? 'text-white/90' : 'text-white/50 group-hover:text-white/70'}
          `}
                >
                    {index}
                </span>

                {/* Label */}
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

            {/* Active indicator bar (Left side) */}
            <div
                className={`
                    absolute left-0 top-6 w-1 h-12 bg-white/60 rounded-r-full
                    transition-all duration-300
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                `}
            />
        </button>
    );
}
