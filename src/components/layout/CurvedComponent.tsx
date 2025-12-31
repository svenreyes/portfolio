'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface CurvedComponentProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function CurvedComponent({ children, className = '', id, style }: CurvedComponentProps) {
  const { theme, isThemed } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const hasNoBorder = isThemed && theme.noBorder;
  const hasHoverEffect = isThemed && theme.hoverColor;
  const hasGlow = isThemed && theme.glow;
  
  // extract backgroundColor from style so we can control it separately
  const { backgroundColor: styleBgColor, ...restStyle } = style || {};
  
  // hover effect takes priority over any background color
  const bgColor = isHovered && hasHoverEffect 
    ? theme.hoverColor 
    : (styleBgColor || (isThemed && theme.componentBg ? theme.componentBg : 'transparent'));
  
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
        ${hasGlow && isHovered ? 'shadow-[0_0_20px_rgba(0,197,251,0.15)]' : ''}
        ${className}
      `}
      style={{
        borderWidth: hasNoBorder ? '0px' : '1px',
        borderStyle: hasNoBorder ? 'none' : 'solid',
        borderColor,
        backgroundColor: bgColor,
        color: textColor,
        ...restStyle,
      }}
    >
      {children}
    </section>
  );
}
