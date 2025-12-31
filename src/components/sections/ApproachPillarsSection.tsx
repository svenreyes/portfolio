'use client';

import { useState } from 'react';

const pillars = [
  {
    id: '01',
    title: 'Systems Thinking',
    content: {
      before: 'I focus on how ',
      highlight: 'components interact',
      after: ' not just how they work in isolation. From data flow to failure modes, I design with the full system in mind.',
    },
  },
  {
    id: '02',
    title: 'Backend & Infrastructure',
    content: {
      before: 'I build ',
      highlight: 'reliable systems',
      after: ', APIs, and services that form a solid foundation, emphasizing correctness, performance, and maintainability.',
    },
  },
  {
    id: '03',
    title: 'Web & Interfaces',
    content: {
      before: 'On the frontend, I prioritize ',
      highlight: 'clarity and speed',
      after: '. Interfaces should feel intentional, fast, and easy to reason about.',
    },
  },
  {
    id: '04',
    title: 'Ownership & Iteration',
    content: {
      before: 'I own problems ',
      highlight: 'end-to-end',
      after: ' iterating quickly, learning from feedback, and refining over time instead of overengineering upfront.',
    },
  },
];

export function ApproachPillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full">
      {/* tabs row - no gap */}
      <div className="flex">
        {pillars.map((pillar, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={pillar.id}
              onClick={() => setActiveIndex(i)}
              className={`
                flex-1 flex items-center justify-between py-4 px-5
                border border-white/20 rounded-t-2xl
                transition-all duration-300
                cursor-pointer
                ${isActive ? 'border-b-transparent' : ''}
                ${i > 0 ? '-ml-[1px]' : ''}
              `}
            >
              <span className={`
                text-sm font-medium transition-all duration-300
                ${isActive ? 'text-white' : 'text-white/40'}
              `}>
                {pillar.title}
              </span>
              
              <span className={`
                text-xs px-3 py-1 rounded-full border transition-all duration-300
                ${isActive 
                  ? 'border-white text-white' 
                  : 'border-white/30 text-white/40'
                }
              `}>
                {pillar.id}
              </span>
            </button>
          );
        })}
      </div>

      {/* content area */}
      <div className="border border-white/20 border-t-0 rounded-b-[16px] p-8 md:p-12 min-h-[50vh] flex flex-col justify-between">
        {/* main content */}
        <div className="flex-1 flex items-center">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              className={`
                transition-all duration-500 ease-out
                ${activeIndex === i ? 'block' : 'hidden'}
              `}
            >
              <p className="text-[clamp(1.5rem,5vw,4rem)] font-light text-white leading-[1.2]">
                {pillar.content.before}
                <span className="text-white/50">{pillar.content.highlight}</span>
                {pillar.content.after}
              </p>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="flex justify-between items-center pt-8">
          <span className="text-white/40 text-sm">(Approach)</span>
          <span className="text-white/40 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            0{activeIndex + 1} / 0{pillars.length}
          </span>
        </div>
      </div>
    </div>
  );
}
