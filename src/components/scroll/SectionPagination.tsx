'use client';

import { useEffect, useState } from 'react';

interface SectionPaginationProps {
  currentSlide: number;
  totalSlides: number;
  className?: string;
}

/**
 * SectionPagination - Displays "● 03 / 23" style pagination
 * Inspired by Raw Materials scroll indicators
 */
export function SectionPagination({ 
  currentSlide, 
  totalSlides, 
  className = '' 
}: SectionPaginationProps) {
  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 text-white/60 text-sm font-light ${className}`}
    >
      <div className="w-2 h-2 rounded-full bg-white/80" />
      <span className="tracking-wider">
        {String(currentSlide).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </span>
    </div>
  );
}

