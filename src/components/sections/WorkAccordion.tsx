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
  wordmark?: string;
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
    logo: '/skulptlogo.svg',
    wordmark: '/wordmark.svg',
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
            backgroundColor: '#000000',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, 0.2)',
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
                style={{ color: '#ffffff' }}
              >
                {item.company}
              </h3>

              <span 
                className="hidden md:block text-base transition-colors duration-500"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
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
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.6)',
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
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
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
            
            {/* wordmark component if available */}
            {item.wordmark && (
              <div className="w-full py-8">
                <svg viewBox="0 0 137 77" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <path d="M37.0117 0.115234H38.5039C40.0998 0.115352 41.3533 1.36892 41.3535 2.96484V11.2314C41.3539 13.7393 44.4321 15.0501 46.1992 13.2832L58.7402 0.913086C59.3102 0.400146 59.9945 0.115356 60.7354 0.115234H65.5244C66.5502 0.115276 67.3754 0.620598 67.8682 1.34277C68.3708 0.556297 69.2494 0.0429688 70.2695 0.0429688H74.1455C75.7415 0.0429688 76.9958 1.29665 76.9961 2.89258V20.793C76.9962 26.3794 81.6137 30.9395 87.2002 30.9395C92.7867 30.9394 97.3467 26.2652 97.3467 20.6787V2.89258C97.3469 1.29668 98.6583 0.0430102 100.197 0.0429688H104.131C105.727 0.0430407 106.981 1.2967 106.981 2.89258V20.6221C106.981 26.7701 104.157 32.3243 99.7412 36.002C99.7588 36.0016 99.7763 36 99.7939 36H133.713C135.252 36.0002 136.562 37.2546 136.562 38.8506V42.7266C136.562 44.3226 135.252 45.577 133.713 45.5771H124.421C122.825 45.5771 121.571 46.8878 121.57 48.4268V72.7119C121.57 74.3079 120.259 75.5615 118.72 75.5615H114.787C113.191 75.5615 111.937 74.3079 111.937 72.7119V48.4268C111.936 46.8878 110.625 45.5771 109.086 45.5771H105.866C106.949 47.6816 107.562 50.0555 107.562 52.5625C107.505 61.1703 100.551 68.1816 91.9434 68.1816H80.4277C78.8318 68.1819 77.5782 69.4363 77.5781 71.0322V73.7119C77.5779 75.3079 76.2666 76.5615 74.7275 76.5615H70.7939C69.1981 76.5613 67.9445 75.3078 67.9443 73.7119V39.8506C67.9443 38.2545 69.198 37.0002 70.7939 37H75.873C70.77 33.4223 67.419 27.4972 67.4189 20.793V5.06152L54.75 17.9004C53.667 18.9834 53.6672 20.8075 54.75 21.8906L67.5195 34.8311C69.3437 36.6552 68.0326 39.6767 65.5244 39.6768H60.7354C59.9945 39.6766 59.3102 39.3918 58.7402 38.8789L48.252 28.5039C47.1118 27.4208 45.3442 27.4204 44.2041 28.5605L42.3232 30.499C41.6962 31.1261 41.3535 31.9242 41.3535 32.7793V36.8262C41.3535 37.3104 41.2366 37.7624 41.0312 38.1582C41.3746 38.629 41.5781 39.2117 41.5781 39.8506V64.0771C41.5781 65.6731 42.8888 66.9275 44.4277 66.9277H63.8672C65.4633 66.9278 66.7178 68.2392 66.7178 69.7783V73.7119C66.7176 75.3079 65.4632 76.5615 63.8672 76.5615H34.7939C33.2551 76.5613 31.9445 75.3078 31.9443 73.7119V39.8506C31.9443 39.3645 32.0667 38.9105 32.2793 38.5137C31.9308 38.0437 31.7197 37.4628 31.7197 36.8262V35.2578C28.5813 37.9088 23.9675 39.1104 19.2959 39.1104C18.6514 39.1104 17.9531 39.1103 17.3086 39.0566C9.93623 39.0566 6.93943 38.887 3.2041 38.8154C1.40426 38.7809 -0.0345522 37.3252 0.000976562 35.5254C0.0167229 34.7277 0.034061 33.8758 0.0498047 33.0781C0.0854334 31.2791 1.56484 29.8214 3.36426 29.8213H18.6836C22.5946 29.3324 25.3655 29.6585 26.5488 26.8613C26.5488 25.1423 25.9038 24.9269 18.1143 24.0674C10.7005 23.745 6.1871 22.2946 3.55469 19.2861C1.72847 17.1911 0.976617 14.5052 1.29883 11.2822C2.15839 2.63289 11.0518 6.52076e-05 19.5645 0C30.4626 -6.00186e-05 29.5297 6.00174e-05 37.0117 0V0.115234ZM80.4277 46.5771C78.832 46.5774 77.5784 47.888 77.5781 49.4268V55.6982C77.5784 57.2371 78.832 58.5476 80.4277 58.5479H91.8867C95.1928 58.5476 97.8717 55.9253 97.9287 52.6191C97.9285 49.313 95.2495 46.5772 91.9434 46.5771H80.4277ZM97.0469 37.8926C97.0645 37.8988 97.0821 37.9049 97.0996 37.9111C97.1067 37.8901 97.1145 37.8694 97.1221 37.8486C97.0971 37.8634 97.0719 37.8779 97.0469 37.8926ZM31.4209 8.91797C28.128 8.92512 23.62 8.91234 18.9199 9.02539C14.756 9.12554 10.5928 9.45545 10.3242 12.1953C10.1631 14.2903 11.0767 14.1287 18.8125 14.9883V15.042C24.8613 15.2612 28.9789 16.3034 31.7197 18.3135V8.91797C31.6269 8.91815 31.5273 8.91774 31.4209 8.91797Z" fill="#B0BDC5"/>
                </svg>
              </div>
            )}
            <CurvedComponent className="p-6" style={{
              backgroundColor: isThemed && theme.componentBg ? theme.componentBg : undefined,
            }}>
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

            <CurvedComponent className="p-6" style={{
              backgroundColor: isThemed && theme.componentBgAlt ? theme.componentBgAlt : undefined,
            }}>
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

            <CurvedComponent className="p-6" style={{
              backgroundColor: isThemed && theme.componentBg ? theme.componentBg : undefined,
            }}>
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
