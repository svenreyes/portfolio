'use client';

interface CurvedComponentProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function CurvedComponent({ children, className = '', id }: CurvedComponentProps) {
  return (
    <section
      id={id}
      className={`
        relative w-full
        border border-white/20 rounded-[32px]
        transition-colors duration-500
        hover:border-white/30
        ${className}
      `}
    >
      {children}
    </section>
  );
}
