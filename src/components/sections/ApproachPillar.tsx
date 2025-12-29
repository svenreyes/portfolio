'use client';

interface PillarData {
  id: string;
  title: string;
  description: string[];
}

const allPillars: PillarData[] = [
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

interface ApproachPillarProps {
  pillarIndex: number;
}

export function ApproachPillar({ pillarIndex }: ApproachPillarProps) {
  const pillar = allPillars[pillarIndex];

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* tabs at top */}
      <div className="w-full border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {allPillars.map((p, i) => (
            <div
              key={p.id}
              className={`
                flex items-center justify-between py-4 px-4 md:px-6 
                border-r border-white/10 last:border-r-0
                ${i === pillarIndex 
                  ? 'bg-white/10' 
                  : 'bg-transparent opacity-40'
                }
              `}
            >
              <span className={`
                text-sm md:text-base font-light
                ${i === pillarIndex ? 'text-white' : 'text-white/70'}
              `}>
                {p.title}
              </span>
              <span className={`
                text-xs px-2 py-1 rounded-full border
                ${i === pillarIndex 
                  ? 'border-white/40 text-white' 
                  : 'border-white/20 text-white/50'
                }
              `}>
                {p.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl">
          <h3 className="text-[clamp(2.5rem,7vw,6rem)] font-light text-white leading-[1.05] mb-8 md:mb-12">
            {pillar.title}
          </h3>
          <div className="space-y-4">
            {pillar.description.map((para, j) => (
              <p 
                key={j} 
                className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-2xl"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="flex justify-between items-center p-8 md:p-12 lg:p-16 pt-0 border-t border-white/10 mx-8 md:mx-12 lg:mx-16">
        <span className="text-white/40 text-sm">(Approach)</span>
        <div className="flex gap-2">
          {allPillars.map((_, i) => (
            <span
              key={i}
              className={`
                w-2 h-2 rounded-full
                ${i === pillarIndex ? 'bg-white' : 'bg-white/30'}
              `}
            />
          ))}
        </div>
        <span className="text-white/40 text-sm">{pillar.id} / 04</span>
      </div>
    </div>
  );
}

