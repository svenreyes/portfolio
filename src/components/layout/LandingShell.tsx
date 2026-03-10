/**
 * LandingShell Component
 * 
 * Main layout wrapper providing the split-scroll interface with sidebar
 * navigation on the left (desktop) and bottom navigation (mobile).
 * Children are rendered once to avoid duplicate DOM IDs.
 */
'use client';

import { useEffect, useRef } from 'react';
import { SidebarNav } from './SidebarNav';
import { MobileBottomNav } from '@/components/navigation/MobileBottomNav';
import { useTheme } from '@/context/ThemeContext';
import { CloudyBackground } from '@/components/backgrounds/CloudyBackground';
import { NoiseCanvas } from '@/components/backgrounds/NoiseCanvas';

interface LandingShellProps {
  children?: React.ReactNode;
}

export function LandingShell({ children }: LandingShellProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const sidebar = sidebarRef.current;
    const mainContent = mainContentRef.current;

    if (!sidebar || !mainContent) return;

    document.body.style.overflow = 'hidden';

    let hoveredElement: HTMLElement | null = null;

    const handleMouseEnter = (element: HTMLElement) => {
      hoveredElement = element;
    };

    const handleMouseLeave = () => {
      hoveredElement = null;
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;

      let scrollContainer: HTMLElement | null = null;

      if (hoveredElement) {
        scrollContainer = hoveredElement;
      } else if (sidebar.contains(target)) {
        scrollContainer = sidebar;
      } else if (mainContent.contains(target)) {
        scrollContainer = mainContent;
      }

      if (!scrollContainer) return;

      e.preventDefault();
      e.stopPropagation();

      const scrollAmount = e.deltaY;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop < scrollHeight - clientHeight - 1;

      if (scrollAmount < 0 && canScrollUp) {
        scrollContainer.scrollTop += scrollAmount;
      } else if (scrollAmount > 0 && canScrollDown) {
        scrollContainer.scrollTop += scrollAmount;
      }
    };

    const sidebarEnter = () => handleMouseEnter(sidebar);
    const sidebarLeave = handleMouseLeave;
    const mainEnter = () => handleMouseEnter(mainContent);
    const mainLeave = handleMouseLeave;

    sidebar.addEventListener('mouseenter', sidebarEnter);
    sidebar.addEventListener('mouseleave', sidebarLeave);
    mainContent.addEventListener('mouseenter', mainEnter);
    mainContent.addEventListener('mouseleave', mainLeave);
    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      sidebar.removeEventListener('mouseenter', sidebarEnter);
      sidebar.removeEventListener('mouseleave', sidebarLeave);
      mainContent.removeEventListener('mouseenter', mainEnter);
      mainContent.removeEventListener('mouseleave', mainLeave);
      document.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {theme.hasCloudy && <CloudyBackground zIndex={0} />}
      
      <div 
        className="fixed inset-0 z-0 transition-colors duration-500" 
        style={{ backgroundColor: theme.hasCloudy ? 'transparent' : theme.background }}
      />
      
      {theme.hasCloudy && <NoiseCanvas />}

      <div className="relative z-10 h-screen overflow-x-visible overflow-y-hidden">
        <div className="h-full flex flex-col lg:flex-row lg:p-4 lg:gap-0 lg:overflow-visible">
          {/* Desktop sidebar */}
          <aside
            ref={sidebarRef}
            className="hidden lg:block w-[200px] flex-shrink-0 h-full overflow-y-auto overflow-x-hidden scrollbar-none relative z-10 pr-4"
          >
            <SidebarNav />
          </aside>

          {/* Main content — single instance shared by mobile and desktop */}
          <main
            ref={mainContentRef}
            data-scroll-container
            className="flex-1 h-full
                       overflow-y-auto lg:overflow-y-scroll
                       overflow-x-hidden lg:overflow-x-visible
                       px-4 pt-4 pb-[100px]
                       lg:px-0 lg:pt-0 lg:pb-0 lg:pr-4 lg:pl-[48px] lg:ml-[-48px]
                       scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
                       hover:scrollbar-thumb-white/30"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
            }}
          >
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </>
  );
}
