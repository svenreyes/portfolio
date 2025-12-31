/**
 * LandingShell Component
 * 
 * Main layout wrapper providing the split-scroll interface with sidebar
 * navigation on the left and main content on the right. Handles independent
 * scroll isolation between panels and responsive layout for mobile/desktop.
 */
'use client';

import { useEffect, useRef } from 'react';
import { SidebarNav } from './SidebarNav';
import { useTheme } from '@/context/ThemeContext';

interface LandingShellProps {
  children?: React.ReactNode;
}

export function LandingShell({ children }: LandingShellProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
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
      <div 
        className="fixed inset-0 z-0 transition-colors duration-500" 
        style={{ backgroundColor: theme.background }}
      />

      <div className="relative z-10 h-screen overflow-x-visible overflow-y-hidden">
        <div className="hidden lg:flex h-full p-4 gap-0 overflow-visible">
          <aside
            ref={sidebarRef}
            className="w-[200px] flex-shrink-0 h-full overflow-y-auto overflow-x-hidden scrollbar-none relative z-10 pr-4"
          >
            <SidebarNav />
          </aside>

          <main
            ref={mainContentRef}
            data-scroll-container
            className="flex-1 h-full pr-4
                     scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
                     hover:scrollbar-thumb-white/30"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
              overflowY: 'scroll',
              overflowX: 'visible',
              marginLeft: '-48px',
              paddingLeft: '48px',
            }}
          >
            {children}
          </main>
        </div>

        <div className="lg:hidden h-full overflow-y-auto p-4 flex flex-col gap-4">
          <div className="w-full">
            <SidebarNav />
          </div>

          <div className="flex-1 min-h-[600px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
