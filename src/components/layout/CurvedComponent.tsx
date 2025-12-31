'use client';

import { useTheme } from '@/context/ThemeContext';

interface CurvedComponentProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function CurvedComponent({ children, className = '', id }: CurvedComponentProps) {
  const { theme, isThemed } = useTheme();
  
  return (
    <section
      id={id}
      className={`
        relative w-full
        rounded-[16px]
        transition-all duration-500
        ${className}
      `}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isThemed ? theme.border : 'rgba(255, 255, 255, 0.2)',
      }}
    >
      {children}
    </section>
  );
}
