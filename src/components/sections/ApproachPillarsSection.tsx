'use client';

import { useState } from 'react';

const pillars = [
  {
    id: '01',
    title: 'Systems Thinking',
    description: [
      'I focus on how components interact — not just how they work in isolation.',
      'From data flow to failure modes, I design with the full system in mind.',
    ],
  },
  {
    id: '02',
    title: 'Backend & Infrastructure',
    description: [
      'I enjoy building reliable backend systems, APIs, and services that form a solid foundation for products — emphasizing correctness, performance, and maintainability.',
    ],
  },
  {
    id: '03',
    title: 'Web & Interfaces',
    description: [
      'On the frontend, I prioritize clarity and responsiveness.',
      'Interfaces should feel intentional, fast, and easy to reason about.',
    ],
  },
  {
    id: '04',
    title: 'Ownership & Iteration',
    description: [
      'I like owning problems end-to-end — iterating quickly, learning from feedback, and refining solutions over time instead of overengineering upfront.',
    ],
  },
];

export function ApproachPillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full border border-white/20 rounded-[32px] overflow-hidden transition-colors duration-500 hover:border-white/30">
      {/* tabs row built into top of component */}
      <div className="grid grid-cols-4 border-b border-white/10">
        {pillars.map((pillar, i) => (
          <button
            key={pillar.id}
            onClick={() => setActiveIndex(i)}
            className={`
              flex items-center justify-between py-3 px-4
              transition-all duration-300
              ${i < pillars.length - 1 ? 'border-r border-white/10' : ''}
              ${activeIndex === i 
                ? 'bg-white/10' 
                : 'bg-transparent hover:bg-white/5'
              }
            `}
          >
            <span className={`
              text-xs md:text-sm font-medium transition-all duration-300
              ${activeIndex === i ? 'text-white' : 'text-white/40'}
            `}>
              {pillar.title}
            </span>
            
            <span className={`
              text-[10px] md:text-xs px-2 py-0.5 rounded-full border transition-all duration-300
              ${activeIndex === i 
                ? 'border-white text-white' 
                : 'border-white/30 text-white/40'
              }
            `}>
              {pillar.id}
            </span>
          </button>
        ))}
      </div>

      {/* content */}
      <div className="p-6 md:p-10 min-h-[60vh] flex flex-col justify-center">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            className={`
              transition-all duration-500 ease-out
              ${activeIndex === i ? 'block' : 'hidden'}
            `}
          >
            <h3 className="text-[clamp(2rem,6vw,5rem)] font-light text-white leading-[1.1] mb-8">
              {pillar.title}
            </h3>
            <div className="space-y-4 max-w-2xl">
              {pillar.description.map((para, j) => (
                <p 
                  key={j} 
                  className="text-base md:text-lg font-light text-white/60 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
