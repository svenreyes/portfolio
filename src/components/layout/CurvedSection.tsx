/**
 * CurvedSection Component
 * 
 * A content container with rounded corners and subtle border styling.
 * Used to wrap section content in the main panel with consistent
 * glass-morphism aesthetics.
 */
'use client';

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
