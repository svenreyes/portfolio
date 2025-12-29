'use client';

import { useEffect, useRef, useState } from 'react';

const columns = [
  {
    id: '01',
    title: 'ENGINEERING',
    items: [
      'Backend Development',
      'API Design & Integration',
      'Frontend Web Development',
      'Full-Stack Applications',
      'Data Modeling',
      'Performance Optimization',
      'Testing & Debugging',
    ],
  },
  {
    id: '02',
    title: 'SYSTEMS',
    items: [
      'System Design',
      'Low-Level Awareness',
      'Distributed Systems Fundamentals',
      'Concurrency & Async Workflows',
      'Memory & Performance',
      'Reliability & Failure Handling',
      'Scalability Planning',
    ],
  },
  {
    id: '03',
    title: 'TOOLS & PRACTICES',
    items: [
      'Python, Java, C++, JS / TS',
      'React, Next.js, FastAPI',
      'SQL & Relational Databases',
      'Git & Version Control',
      'Testing Frameworks',
      'CI/CD Fundamentals',
      'Developer Tooling',
    ],
  },
];

export function CapabilitiesGrid() {
  const [visibleColumns, setVisibleColumns] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          columns.forEach((_, i) => {
            setTimeout(() => setVisibleColumns(i + 1), i * 120);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {columns.map((column, i) => (
        <div
          key={column.id}
          className="border border-white/20 rounded-[24px] p-6 py-16 transition-all duration-500 ease-out hover:border-white/30 group"
          style={{
            opacity: visibleColumns > i ? 1 : 0,
            transform: visibleColumns > i ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          {/* header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base text-xl font-semibold text-white tracking-wide group-hover:font-bold transition-all duration-300">
              {column.title}
            </h3>
            <span className="text-xs px-3 py-1 rounded-full border border-white/30 text-white/50">
              {column.id}
            </span>
          </div>

          {/* list */}
          <ul className="space-y-0">
            {column.items.map((item, j) => (
              <li 
                key={j}
                className="py-3 border-t border-white/10 text-sm text-white/70 hover:text-white/90 transition-colors duration-200 cursor-default"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

