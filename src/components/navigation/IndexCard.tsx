// nav card with progress indicator
'use client';

import { useCallback, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface IndexCardProps {
  index: string;
  label: string;
  isActive: boolean;
  progress?: number;
  cardHeight?: number;
  onClick: () => void;
}

export function IndexCard({ 
  index, 
  label, 
  isActive, 
  progress = 0, 
  cardHeight = 100, 
  onClick 
}: IndexCardProps) {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);
  
  const { theme, isThemed } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  
  const hasNoBorder = isThemed && theme.noBorder;
  const hasHoverEffect = isThemed && theme.hoverColor;
  const hasGlow = isThemed && theme.glow;
  
  const bgColor = isThemed && theme.componentBg 
    ? (isHovered && hasHoverEffect ? theme.hoverColor : theme.componentBg)
    : (isActive
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(255, 255, 255, 0.03)');
  
  const borderColor = hasNoBorder 
    ? 'transparent'
    : (isActive
        ? 'rgba(255, 255, 255, 0.4)'
        : 'rgba(255, 255, 255, 0.1)');
  
  const textColor = isHovered && hasHoverEffect && theme.hoverTextColor
    ? theme.hoverTextColor
    : (isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)');
  
  const indexTextColor = isHovered && hasHoverEffect && theme.hoverTextColor
    ? theme.hoverTextColor
    : (isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)');

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: `${cardHeight}px`,
        minHeight: `${cardHeight}px`,
        backgroundColor: bgColor,
        borderWidth: hasNoBorder ? '0px' : '1px',
        borderStyle: hasNoBorder ? 'none' : 'solid',
        borderColor,
      }}
      className={`
        group relative w-full flex-shrink-0
        flex flex-col items-start 
        rounded-[16px]
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        overflow-hidden
        ${hasHoverEffect && isHovered ? 'shadow-[0_0_30px_rgba(0,197,251,0.3)]' : ''}
        ${!isThemed && isActive ? 'backdrop-blur-md' : ''}
        ${!isThemed && !isActive ? 'backdrop-blur-sm hover:bg-white/[0.06]' : ''}
      `}
    >
      <div className="absolute inset-0 p-4 flex flex-col items-start justify-between z-10">
        <span
          style={{ color: indexTextColor }}
          className={`
            text-[11px] font-bold tracking-[0.15em] uppercase
            transition-colors duration-300
          `}
        >
          {index}
        </span>

        <span
          style={{ color: textColor }}
          className={`
            text-base font-bold tracking-wide
            transition-colors duration-300
          `}
        >
          {label}
        </span>
      </div>

      <div
        className={`
          absolute right-6 top-6 bottom-6 w-[1px]
          transition-opacity duration-500 delay-100
          ${isActive ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div
          className="absolute left-3 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ top: `${progress * 100}%` }}
        />
      </div>
    </button>
  );
}
