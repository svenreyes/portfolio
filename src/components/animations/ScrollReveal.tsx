'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    stagger?: number; // For staggering children
    from?: {
        opacity?: number;
        y?: number;
        x?: number;
        scale?: number;
        blur?: number;
    };
}

/**
 * ScrollReveal Component
 * Animates elements in/out as they enter/exit viewport
 * Uses GSAP ScrollTrigger for smooth performance
 */
export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    stagger = 0,
    from = { opacity: 0, y: 40 },
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Skip animations
            gsap.set(element, { opacity: 1 });
            return;
        }

        // Find scroll container
        const scrollContainer = element.closest('[data-scroll-container]') as HTMLElement;

        // Setup initial state
        gsap.set(element, from);

        // Create scroll trigger
        const trigger = ScrollTrigger.create({
            trigger: element,
            scroller: scrollContainer || window,
            start: 'top 85%', // Trigger when element is 85% down viewport
            end: 'bottom 15%', // End when element is 15% from top
            toggleActions: 'play reverse play reverse',
            onEnter: () => {
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    scale: 1,
                    duration: 0.8,
                    delay,
                    ease: 'power3.out',
                });
            },
            onLeaveBack: () => {
                gsap.to(element, {
                    ...from,
                    duration: 0.5,
                    ease: 'power2.in',
                });
            },
        });

        return () => {
            trigger.kill();
        };
    }, [from, delay]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
}

interface ScrollStaggerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    from?: {
        opacity?: number;
        y?: number;
        x?: number;
    };
}

/**
 * ScrollStagger Component
 * Staggers animations for child elements
 */
export function ScrollStagger({
    children,
    className = '',
    staggerDelay = 0.1,
    from = { opacity: 0, y: 30 },
}: ScrollStaggerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.set(container.children, { opacity: 1 });
            return;
        }

        const scrollContainer = container.closest('[data-scroll-container]') as HTMLElement;

        // Set initial state for all children
        gsap.set(container.children, from);

        const trigger = ScrollTrigger.create({
            trigger: container,
            scroller: scrollContainer || window,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(container.children, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.7,
                    stagger: staggerDelay,
                    ease: 'power3.out',
                });
            },
        });

        return () => {
            trigger.kill();
        };
    }, [from, staggerDelay]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
