'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './SidebarNav.css';

const navItems = [
  { index: '00', label: 'Sven Reyes', href: '/' },
  { index: '01', label: 'Welcome', href: '/welcome' },
  { index: '02', label: 'Approach', href: '/approach' },
  { index: '03', label: 'Work', href: '/work' },
  { index: '04', label: 'Contact', href: '/contact' },
  { index: '05', label: 'Resume', href: '/resume' },
  { index: '06', label: '', href: '#' }, // Placeholder
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-full flex flex-col gap-4 p-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const isPlaceholder = item.index === '06';
        
        return (
          <Link
            key={item.index}
            href={item.href}
            className={`glass-nav-card ${isActive ? 'glass-nav-card--active' : ''} ${isPlaceholder ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {/* Index number */}
            <span className="text-xs text-white/60 font-light tracking-wider relative z-10">
              {item.index}
            </span>
            
            {/* Label */}
            {item.label && (
              <span className="text-white text-base font-normal tracking-wide relative z-10">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

