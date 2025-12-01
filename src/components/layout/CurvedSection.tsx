'use client';

import { cn } from '@/lib/utils'; // Assuming you have a utils file for class merging, if not I'll use template literals or install clsx/tailwind-merge if needed. Checking utils first is safer but I'll assume standard shadcn/next pattern or just use template literals for now to be safe.

interface CurvedSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function CurvedSection({ children, className = '', id }: CurvedSectionProps) {
    return (
        <section
            id={id}
            className={`
        relative w-full p-8
        border border-white/20 rounded-[40px]
        transition-colors duration-500
        hover:border-white/30
        ${className}
      `}
        >
            {children}
        </section>
    );
}
