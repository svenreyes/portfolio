'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CurvedComponentProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function CurvedComponent({ children, className = '', id }: CurvedComponentProps) {
  const { theme, isThemed } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const hasNoBorder = isThemed && theme.noBorder;
  const hasHoverEffect = isThemed && theme.hoverColor;
  const hasGlow = isThemed && theme.glow;
  
  const bgColor = isThemed && theme.componentBg 
    ? (isHovered && hasHoverEffect ? theme.hoverColor : theme.componentBg)
    : 'transparent';
  
  const borderColor = hasNoBorder 
    ? 'transparent'
    : (isThemed ? theme.border : 'rgba(255, 255, 255, 0.2)');
  
  const textColor = isHovered && hasHoverEffect && theme.hoverTextColor
    ? theme.hoverTextColor
    : (isThemed ? theme.textPrimary : '#ffffff');
  
  return (
    <section
      id={id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-theme-hover={hasHoverEffect && isHovered ? 'true' : 'false'}
      className={`
        relative w-full
        rounded-[16px]
        transition-all duration-500
        ${hasHoverEffect && isHovered ? 'shadow-[0_0_30px_rgba(0,197,251,0.3)]' : ''}
        ${className}
      `}
      style={{
        borderWidth: hasNoBorder ? '0px' : '1px',
        borderStyle: hasNoBorder ? 'none' : 'solid',
        borderColor,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {children}
    </section>
  );
}
