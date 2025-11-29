'use client';

import { useEffect, useRef } from 'react';
import { CloudyBackground } from '@/components/background/CloudyBackground';
import { SidebarNav } from './SidebarNav';
import { MainPanel } from './MainPanel';

interface LandingShellProps {
  children?: React.ReactNode;
}

export function LandingShell({ children }: LandingShellProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const mainContent = mainContentRef.current;

    if (!sidebar || !mainContent) return;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Track which element is being hovered
    let hoveredElement: HTMLElement | null = null;

    const handleMouseEnter = (element: HTMLElement) => {
      hoveredElement = element;
    };

    const handleMouseLeave = () => {
      hoveredElement = null;
    };

    // Handle scroll isolation based on hover
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;

      // Determine which container should scroll
      let scrollContainer: HTMLElement | null = null;

      if (hoveredElement) {
        scrollContainer = hoveredElement;
      } else if (sidebar.contains(target)) {
        scrollContainer = sidebar;
      } else if (mainContent.contains(target)) {
        scrollContainer = mainContent;
      }

      if (!scrollContainer) return;

      // Prevent default scroll
      e.preventDefault();
      e.stopPropagation();

      // Calculate scroll amount
      const scrollAmount = e.deltaY;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      // Check scroll bounds
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop < scrollHeight - clientHeight - 1;

      // Only scroll if we can in that direction
      if (scrollAmount < 0 && canScrollUp) {
        scrollContainer.scrollTop += scrollAmount;
      } else if (scrollAmount > 0 && canScrollDown) {
        scrollContainer.scrollTop += scrollAmount;
      }
    };

    // Create stable event handlers
    const sidebarEnter = () => handleMouseEnter(sidebar);
    const sidebarLeave = handleMouseLeave;
    const mainEnter = () => handleMouseEnter(mainContent);
    const mainLeave = handleMouseLeave;

    // Add mouse enter/leave listeners
    sidebar.addEventListener('mouseenter', sidebarEnter);
    sidebar.addEventListener('mouseleave', sidebarLeave);
    mainContent.addEventListener('mouseenter', mainEnter);
    mainContent.addEventListener('mouseleave', mainLeave);

    // Add wheel listener to document
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
      {/* Fixed background with clouds */}
      <CloudyBackground zIndex={0} />

      {/* Foreground content */}
      <div className="relative z-10 h-screen overflow-hidden">
        {/* Desktop Layout: Sidebar + Main Panel */}
        <div className="hidden lg:flex h-full p-6 gap-6">
          {/* Left Sidebar Navigation - Fixed/Sticky */}
          <aside
            ref={sidebarRef}
            className="w-80 flex-shrink-0 h-full overflow-y-auto overflow-x-hidden
                     scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
                     hover:scrollbar-thumb-white/30"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
            }}
          >
            <SidebarNav />
          </aside>

          {/* Right Main Panel - Independent Scroll */}
          <main
            ref={mainContentRef}
            className="flex-1 h-full overflow-y-auto overflow-x-hidden
                     scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
                     hover:scrollbar-thumb-white/30"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
            }}
          >
            <MainPanel>{children}</MainPanel>
          </main>
        </div>

        {/* Mobile/Tablet Layout: Stacked */}
        <div className="lg:hidden h-full overflow-y-auto p-4 flex flex-col gap-4">
          {/* Top: Condensed Navigation */}
          <div className="w-full">
            <SidebarNav />
          </div>

          {/* Bottom: Main Panel */}
          <div className="flex-1 min-h-[600px]">
            <MainPanel>{children}</MainPanel>
          </div>
        </div>
      </div>
    </>
  );
}

