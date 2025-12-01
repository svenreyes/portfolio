'use client';

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * BodyText - Responsive body copy with clamp() scaling
 */
export function BodyText({ 
  children, 
  className = '', 
  size = 'md' 
}: BodyTextProps) {
  const sizeClasses = {
    sm: 'text-[clamp(0.875rem,1.5vw,1rem)]',
    md: 'text-[clamp(1rem,2vw,1.25rem)]',
    lg: 'text-[clamp(1.25rem,2.5vw,1.5rem)]',
  };

  return (
    <p 
      className={`reveal font-light leading-relaxed text-white/80 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </p>
  );
}

