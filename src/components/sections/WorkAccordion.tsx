'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurvedComponent } from '@/components/layout/CurvedComponent';

interface WorkItem {
  id: string;
  company: string;
  role: string;
  description: string;
  color: string;
  video?: string;
}

const workItems: WorkItem[] = [
  { 
    id: 'sas', 
    company: 'SAS', 
    role: 'Software Engineering Intern',
    description: 'Built and tested production-level software systems with a focus on reliability, correctness, and maintainability in large-scale codebases.',
    color: '#1E6AE1',
    video: '/video/SAS.mp4',
  },
  { 
    id: 'extend', 
    company: 'Extend', 
    role: 'Solution Engineer Intern',
    description: 'Developed and debugged real-world API integrations at a fast-moving startup, working closely with product and customer teams to ship solutions quickly.',
    color: '#00C5FB',
  },
  { 
    id: 'skulpt', 
    company: 'SKULPT', 
    role: 'Co-Founder · Creative Technology',
    description: 'Co-founded and engineered interactive web experiences, owning technical architecture while collaborating across design, branding, and product direction.',
    color: '#CBD1D6',
  },
  { 
    id: 'blockchain', 
    company: 'Blockchain Research — ECU', 
    role: 'Undergraduate Research',
    description: 'Researched smart contract reliability through metamorphic testing, evaluating how behavioral properties change across transformations in blockchain systems.',
    color: '#D4AF37',
  },
  { 
    id: 'cv', 
    company: 'Computer Vision Research — ECU', 
    role: 'Undergraduate Research',
    description: 'Conducted depth-based computer vision research using an Arducam with infrared illumination, designing experiments to analyze spatial perception and depth inference.',
    color: '#7B5CFF',
  },
];

// paper colors from back to front
const paperColors = [
  'bg-orange-500',  // back
  'bg-cyan-400',
  'bg-purple-500',
  'bg-green-500',   // front
];

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // autoplay blocked, that's ok
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="absolute bottom-0 left-0 w-full min-h-full object-cover"
      />
      {/* centered logo overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="/Asset 1.svg" 
          alt="" 
          className="w-40 h-auto opacity-90"
        />
      </div>
    </div>
  );
}

export function WorkAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div 
      className="flex flex-col gap-4" 
      style={{ overflow: 'visible' }}
    >
      {workItems.map((item) => (
        <WorkPill
          key={item.id}
          item={item}
          isExpanded={expandedId === item.id}
          isDimmed={expandedId !== null && expandedId !== item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}

interface WorkPillProps {
  item: WorkItem;
  isExpanded: boolean;
  isDimmed: boolean;
  onToggle: () => void;
}

function WorkPill({ item, isExpanded, isDimmed, onToggle }: WorkPillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showPeek = isHovered && !isExpanded;

  return (
    <div
      className={`
        relative w-full flex flex-col gap-4
        transition-opacity duration-300
        ${isDimmed ? 'opacity-50' : 'opacity-100'}
      `}
      style={{ 
        overflow: 'visible',
        zIndex: isHovered ? 9999 : 1,
        position: 'relative',
      }}
    >
      {/* container with perspective */}
      <div 
        className="relative"
        style={{ 
          perspective: '8000px', 
          overflow: 'visible',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* stacked paper tabs - each one leans progressively more */}
        {paperColors.map((color, i) => {
          const rotation = i * 12;
          
          return (
            <motion.div
              key={i}
              className={`absolute inset-x-0 top-0 bottom-0 ${color} rounded-[16px]`}
              style={{ 
                zIndex: i + 1,
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, rotateX: 0 }}
              animate={{ 
                opacity: showPeek ? 1 : 0,
                rotateX: showPeek ? -rotation : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          );
        })}

        {/* main pill cover */}
        <motion.div
          className="relative w-full rounded-[16px] border border-white/20 bg-black"
          animate={{
            rotateX: showPeek ? -50 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ 
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
        >
          <button
            onClick={onToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle();
              }
            }}
            aria-expanded={isExpanded}
            className="w-full flex flex-col p-8 md:p-10 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-inset"
          >
            {/* top row with company, role, icon */}
            <div className="w-full flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-medium text-white">
                {item.company}
              </h3>

              <span className="hidden md:block text-sm text-white/50">
                {item.role}
              </span>

              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-base font-medium border border-white/20">
                {item.company.charAt(0)}
              </div>
            </div>

            {/* mobile role */}
            <div className="md:hidden mt-2">
              <span className="text-sm text-white/50">{item.role}</span>
            </div>

            {/* expanded description inside the pill */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="text-xl md:text-2xl font-light leading-relaxed"
                  style={{ color: item.color }}
                >
                  {item.description}
                </motion.p>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* expanded content - 3 separate CurvedComponents */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex flex-col gap-4 overflow-hidden"
          >
            {/* video component if available */}
            {item.video && (
              <CurvedComponent className="p-0 overflow-hidden">
                <VideoPlayer src={item.video} />
              </CurvedComponent>
            )}
            <CurvedComponent className="p-6">
              <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2">Overview</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Built and maintained production systems, collaborated with cross-functional teams, 
                and delivered high-quality code that improved platform reliability.
              </p>
            </CurvedComponent>

            <CurvedComponent className="p-6">
              <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2">What I worked on</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Developed microservices and APIs, implemented testing strategies, 
                optimized database queries, and shipped features used by thousands of users.
              </p>
            </CurvedComponent>

            <CurvedComponent className="p-6">
              <h4 className="text-sm uppercase tracking-wider text-white/40 mb-3">Focus</h4>
              <div className="flex flex-wrap gap-2">
                {['Backend', 'APIs', 'Testing', 'Performance'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CurvedComponent>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
