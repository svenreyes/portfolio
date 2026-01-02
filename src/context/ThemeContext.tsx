'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CompanyTheme {
  id: string;
  background: string;
  border: string;
  textPrimary: string;
  textLight: string;
  accent1: string;
  accent2: string;
  accent3: string;
  componentBg?: string;
  componentBgAlt?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  noBorder?: boolean;
  glow?: boolean;
  headlineFont?: string;
  hasCloudy?: boolean;
}

const defaultTheme: CompanyTheme = {
  id: 'default',
  background: '#000000',
  border: 'rgba(255, 255, 255, 0.2)',
  textPrimary: '#ffffff',
  textLight: 'rgba(255, 255, 255, 0.7)',
  accent1: '#ffffff',
  accent2: '#ffffff',
  accent3: '#ffffff',
};

export const companyThemes: Record<string, CompanyTheme> = {
  default: defaultTheme,
  sas: {
    id: 'sas',
    background: '#ffffff',
    border: 'transparent',
    textPrimary: '#ffffff',
    textLight: '#ffffff',
    accent1: '#0766D1',
    accent2: '#FF66B2',
    accent3: '#FF66B2',
    componentBg: '#0766D1',
    componentBgAlt: '#FF66B2',
    noBorder: true,
    headlineFont: 'var(--font-anova-bold)',
  },
  extend: {
    id: 'extend',
    background: '#151516',
    border: 'transparent',
    textPrimary: '#ffffff',
    textLight: '#ffffff',
    accent1: '#00C5FB',
    accent2: '#00C5FB',
    accent3: '#000000',
    componentBg: '#000000',
    hoverColor: '#00C5FB',
    hoverTextColor: '#000000',
    noBorder: true,
    glow: true,
    headlineFont: 'var(--font-nunito-sans)',
  },
  skulpt: {
    id: 'skulpt',
    background: 'transparent',
    border: 'transparent',
    textPrimary: '#B0BDC5',
    textLight: '#B0BDC5',
    accent1: '#CBD1D6',
    accent2: '#CBD1D6',
    accent3: '#CBD1D6',
    componentBg: '#CBD1D6',
    noBorder: true,
    hasCloudy: true,
    headlineFont: 'var(--font-nersans)',
  },
  blockchain: {
    id: 'blockchain',
    background: '#1a1400',
    border: '#D4AF37',
    textPrimary: '#D4AF37',
    textLight: 'rgba(212, 175, 55, 0.6)',
    accent1: '#D4AF37',
    accent2: '#3d3000',
    accent3: '#ffd700',
  },
  cv: {
    id: 'cv',
    background: '#1a0a2e',
    border: '#7B5CFF',
    textPrimary: '#7B5CFF',
    textLight: 'rgba(123, 92, 255, 0.6)',
    accent1: '#7B5CFF',
    accent2: '#2d1a4d',
    accent3: '#a388ff',
  },
};

interface ThemeContextType {
  theme: CompanyTheme;
  setThemeById: (id: string | null) => void;
  isThemed: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setThemeById: () => {},
  isThemed: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeThemeId, setActiveThemeId] = useState<string | null>(null);

  const theme = activeThemeId ? (companyThemes[activeThemeId] || defaultTheme) : defaultTheme;
  const isThemed = activeThemeId !== null && activeThemeId !== 'default';

  const setThemeById = (id: string | null) => {
    setActiveThemeId(id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeById, isThemed }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

