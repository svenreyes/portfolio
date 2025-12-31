'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurvedComponent } from '@/components/layout/CurvedComponent';
import { useTheme } from '@/context/ThemeContext';
import { useSectionContext } from '@/context/SectionContext';

interface WorkItem {
  id: string;
  company: string;
  role: string;
  description: string;
  color: string;
  video?: string;
  logo?: string;
}

const workItems: WorkItem[] = [
  { 
    id: 'sas', 
    company: 'SAS', 
    role: 'Software Engineering Intern',
    description: 'Built and tested production-level software systems with a focus on reliability, correctness, and maintainability in large-scale codebases.',
    color: '#1E6AE1',
    video: '/video/SAS.mp4',
    logo: '/Asset 1.svg',
  },
  { 
    id: 'extend', 
    company: 'Extend', 
    role: 'Solution Engineer Intern',
    description: 'Developed and debugged real-world API integrations at a fast-moving startup, working closely with product and customer teams to ship solutions quickly.',
    color: '#00C5FB',
    video: '/video/extend.mp4',
    logo: '/extendlogo.svg',
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

function VideoPlayer({ src, logo }: { src: string; logo?: string }) {
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
      {/* centered logo overlay - only for SAS */}
      {logo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img 
            src={logo} 
            alt="" 
            className="w-40 h-auto opacity-90"
          />
        </div>
      )}
    </div>
  );
}

export function WorkAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { setThemeById } = useTheme();
  const { id: activeSection } = useSectionContext();

  const handleToggle = (id: string) => {
    const newId = expandedId === id ? null : id;
    setExpandedId(newId);
    setThemeById(newId);
  };

  // reset theme when scrolling away from experience section
  useEffect(() => {
    if (activeSection !== 'experience' && expandedId !== null) {
      setExpandedId(null);
      setThemeById(null);
    }
  }, [activeSection, expandedId, setThemeById]);

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
  const { theme, isThemed } = useTheme();

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
          className="relative w-full rounded-[16px] transition-colors duration-500"
          animate={{
            rotateX: showPeek ? -50 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ 
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            zIndex: 10,
            backgroundColor: isThemed ? theme.accent3 : '#000000',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: isThemed ? theme.border : 'rgba(255, 255, 255, 0.2)',
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
              <h3 
                className="text-2xl md:text-3xl font-medium transition-colors duration-500"
                style={{ color: isThemed ? theme.textPrimary : '#ffffff' }}
              >
                {item.company}
              </h3>

              <span 
                className="hidden md:block text-base transition-colors duration-500"
                style={{ color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.5)' }}
              >
                {item.role}
              </span>

              {item.logo ? (
                <div className="relative w-12 h-12 flex-shrink-0" style={{ overflow: 'visible' }}>
                  <img 
                    src={item.logo} 
                    alt={item.company} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-auto pointer-events-none"
                  />
                </div>
              ) : (
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-medium transition-colors duration-500"
                  style={{
                    backgroundColor: isThemed ? `${theme.border}20` : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: isThemed ? theme.border : 'rgba(255, 255, 255, 0.2)',
                    color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {item.company.charAt(0)}
                </div>
              )}
            </div>

            {/* mobile role */}
            <div className="md:hidden mt-2">
              <span 
                className="text-base transition-colors duration-500"
                style={{ color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.5)' }}
              >
                {item.role}
              </span>
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
              <div className="p-0 overflow-hidden rounded-[16px]" style={{ 
                borderWidth: isThemed && theme.noBorder ? '0px' : '1px',
                borderStyle: isThemed && theme.noBorder ? 'none' : 'solid',
                borderColor: isThemed && theme.noBorder ? 'transparent' : (isThemed ? theme.border : 'rgba(255, 255, 255, 0.2)'),
                backgroundColor: isThemed && theme.componentBg ? theme.componentBg : 'transparent',
              }}>
                <VideoPlayer src={item.video} logo={item.id === 'sas' ? item.logo : undefined} />
              </div>
            )}
            <CurvedComponent className="p-6">
              <h4 
                className="text-base uppercase tracking-wider mb-2 transition-colors duration-500 font-bold"
                style={{ 
                  color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.4)',
                  fontFamily: isThemed && theme.headlineFont ? theme.headlineFont : undefined,
                }}
              >
                Overview
              </h4>
              <p 
                className="text-base leading-relaxed transition-colors duration-500"
                style={{ color: isThemed ? theme.textPrimary : 'rgba(255, 255, 255, 0.7)' }}
              >
                Built and maintained production systems, collaborated with cross-functional teams, 
                and delivered high-quality code that improved platform reliability.
              </p>
            </CurvedComponent>

            <CurvedComponent className="p-6">
              <h4 
                className="text-base uppercase tracking-wider mb-2 transition-colors duration-500 font-bold"
                style={{ 
                  color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.4)',
                  fontFamily: isThemed && theme.headlineFont ? theme.headlineFont : undefined,
                }}
              >
                What I worked on
              </h4>
              <p 
                className="text-base leading-relaxed transition-colors duration-500"
                style={{ color: isThemed ? theme.textPrimary : 'rgba(255, 255, 255, 0.7)' }}
              >
                Developed microservices and APIs, implemented testing strategies, 
                optimized database queries, and shipped features used by thousands of users.
              </p>
            </CurvedComponent>

            <CurvedComponent className="p-6">
              <h4 
                className="text-base uppercase tracking-wider mb-3 transition-colors duration-500 font-bold"
                style={{ 
                  color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.4)',
                  fontFamily: isThemed && theme.headlineFont ? theme.headlineFont : undefined,
                }}
              >
                Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Backend', 'APIs', 'Testing', 'Performance'].map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full transition-colors duration-500"
                    style={{
                      backgroundColor: isThemed ? `${theme.border}10` : 'rgba(255, 255, 255, 0.05)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: isThemed ? `${theme.border}40` : 'rgba(255, 255, 255, 0.1)',
                      color: isThemed ? theme.textLight : 'rgba(255, 255, 255, 0.6)',
                    }}
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
