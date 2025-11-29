'use client';

interface SplitHeadlineProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

/**
 * SplitHeadline - Large headlines broken across lines with controlled spacing
 * Uses CSS clamp() for responsive type scales
 * Inspired by Raw Materials typography
 */
export function SplitHeadline({ 
  children, 
  className = '', 
  as: Component = 'h1' 
}: SplitHeadlineProps) {
  const lines = children.split('\n').filter(line => line.trim());

  const sizeClasses = {
    h1: 'text-[clamp(3rem,8vw,8rem)]',
    h2: 'text-[clamp(2rem,6vw,6rem)]',
    h3: 'text-[clamp(1.5rem,4vw,4rem)]',
  };

  return (
    <Component 
      className={`headline-stack font-light leading-[0.9] tracking-tight text-white ${sizeClasses[Component]} ${className}`}
    >
      {lines.map((line, index) => (
        <span 
          key={index} 
          className="block"
          style={{ 
            animationDelay: `${index * 0.1}s` 
          }}
        >
          {line}
        </span>
      ))}
    </Component>
  );
}

