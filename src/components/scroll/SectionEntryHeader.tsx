/**
 * SectionEntryHeader Component
 * 
 * Displays at the start of each section with a small banner announcing
 * the section and a large hero card showing the section number and name.
 * Styled to match the glass-morphism design with white outlines.
 */
'use client';

import { SECTIONS } from '@/config/sections.config';

interface SectionEntryHeaderProps {
  sectionId: string;
}

export function SectionEntryHeader({ sectionId }: SectionEntryHeaderProps) {
  const section = SECTIONS.find(s => s.id === sectionId);
  const totalSections = SECTIONS.length;
  
  if (!section) return null;

  return (
    <div className="flex flex-col gap-4">
      <div 
        className="
          w-full px-6 py-3 rounded-2xl
          flex items-center justify-between
          border border-white/20 backdrop-blur-sm
          transition-colors duration-500 hover:border-white/30
        "
      >
        <span className="text-sm font-light tracking-wide text-white/70">
          You are now entering <span className="font-medium text-white/90">( {section.label} )</span> section
        </span>
        <span className="text-sm font-medium text-white/80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/60" />
          {section.index} / {String(totalSections - 1).padStart(2, '0')}
        </span>
      </div>

      <div 
        className="
          w-full min-h-[70vh] p-12 rounded-[16px]
          flex flex-col justify-between
          border border-white/20 backdrop-blur-sm
          transition-colors duration-500 hover:border-white/30
        "
      >
        <span className="text-[clamp(4rem,10vw,8rem)] font-light leading-none text-white/90">
          {section.index}
        </span>

        <span className="text-[clamp(4rem,12vw,10rem)] font-normal leading-none text-white">
          {section.label}
        </span>
      </div>
    </div>
  );
}
