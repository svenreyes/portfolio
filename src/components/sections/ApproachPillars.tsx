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

export function ApproachPillars() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* tabs at top */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {pillars.map((pillar, i) => (
            <button
              key={pillar.id}
              onClick={() => setActiveIndex(i)}
              className={`
                relative flex items-center justify-between py-5 px-6 
                transition-all duration-300
                ${i < pillars.length - 1 ? 'border-r border-white/10' : ''}
                ${activeIndex === i 
                  ? 'bg-white/10' 
                  : 'bg-transparent hover:bg-white/5'
                }
              `}
            >
              {/* active indicator bar */}
              {activeIndex === i && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
              
              <span className={`
                text-sm font-medium transition-all duration-300
                ${activeIndex === i ? 'text-white' : 'text-white/50'}
              `}>
                {pillar.title}
              </span>
              
              <span className={`
                text-xs px-2.5 py-1 rounded-full border transition-all duration-300
                ${activeIndex === i 
                  ? 'border-white text-white bg-white/10' 
                  : 'border-white/30 text-white/40'
                }
              `}>
                {pillar.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* content area */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            className={`
              transition-all duration-500 ease-out
              ${activeIndex === i ? 'block' : 'hidden'}
            `}
          >
            <h3 className="text-[clamp(2.5rem,8vw,7rem)] font-light text-white leading-[1] mb-12 md:mb-16">
              {pillar.title}
            </h3>
            <div className="space-y-6 max-w-3xl">
              {pillar.description.map((para, j) => (
                <p 
                  key={j} 
                  className="text-xl md:text-2xl font-light text-white/60 leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div className="flex justify-between items-center px-8 md:px-16 py-6 border-t border-white/10">
        <span className="text-white/40 text-sm">(Approach)</span>
        <div className="flex gap-3">
          {pillars.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-300
                ${activeIndex === i ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/50'}
              `}
            />
          ))}
        </div>
        <span className="text-white/40 text-sm">0{activeIndex + 1} / 04</span>
      </div>
    </div>
  );
}
