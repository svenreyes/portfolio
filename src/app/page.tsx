'use client';

import { LandingShell } from '@/components/layout/LandingShell';
import { ScrollSection } from '@/components/scroll/ScrollSection';
import { SectionMarker } from '@/components/scroll/SectionMarker';
import { SectionPagination } from '@/components/scroll/SectionPagination';
import { SplitHeadline } from '@/components/typography/SplitHeadline';
import { BodyText } from '@/components/typography/BodyText';
import { useScrollProgress } from '@/hooks/useScrollProgress';

const sections = ['hero', 'hello', 'approach', 'work'];

export default function Home() {
  const { currentSection, totalSections } = useScrollProgress(sections);

  return (
    <LandingShell>
      {/* Section Pagination */}
      <SectionPagination
        currentSlide={currentSection}
        totalSlides={totalSections}
      />

      {/* Hero Section */}
      <ScrollSection sectionId="hero" className="flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-8">
          <SplitHeadline as="h1">
            {`Crafting digital\nexperiences that\nilluminate`}
          </SplitHeadline>

          <BodyText className="mt-12 max-w-2xl" size="lg">
            We are looking to bring you enlightenment. To offer illumination in stormy skies.
          </BodyText>
        </div>
      </ScrollSection>

      {/* Hello Section */}
      <ScrollSection sectionId="hello" className="py-32">
        <div className="max-w-6xl mx-auto px-8">
          <SectionMarker label="Hello" index="01" />

          <SplitHeadline as="h2" className="mb-16">
            {`We design\nwith purpose`}
          </SplitHeadline>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <BodyText>
              Every project begins with understanding. We dive deep into your vision,
              your audience, and your goals to create experiences that resonate.
            </BodyText>

            <BodyText>
              Our approach combines strategic thinking with creative execution,
              ensuring that every pixel serves a purpose.
            </BodyText>
          </div>
        </div>
      </ScrollSection>

      {/* Approach Section */}
      <ScrollSection sectionId="approach" className="py-32">
        <div className="max-w-6xl mx-auto px-8">
          <SectionMarker label="Approach" index="02" />

          <SplitHeadline as="h2" className="mb-16">
            {`Thoughtful\nby design`}
          </SplitHeadline>

          <div className="space-y-24">
            <div className="reveal">
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] text-white/90 font-light mb-6">
                Discovery
              </h3>
              <BodyText>
                We start by listening. Understanding your challenges, goals, and vision
                helps us create solutions that truly fit.
              </BodyText>
            </div>

            <div className="reveal">
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] text-white/90 font-light mb-6">
                Design
              </h3>
              <BodyText>
                Translating insights into beautiful, functional interfaces. Every decision
                is intentional, every interaction meaningful.
              </BodyText>
            </div>

            <div className="reveal">
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] text-white/90 font-light mb-6">
                Development
              </h3>
              <BodyText>
                Bringing designs to life with clean code and attention to detail.
                Performance and accessibility are never afterthoughts.
              </BodyText>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Work Section */}
      <ScrollSection sectionId="work" className="py-32">
        <div className="max-w-6xl mx-auto px-8">
          <SectionMarker label="Work" index="03" />

          <SplitHeadline as="h2" className="mb-16">
            {`Selected\nprojects`}
          </SplitHeadline>

          <BodyText className="mb-24">
            A collection of work that showcases our approach to digital design and development.
          </BodyText>

          {/* Placeholder for project cards */}
          <div className="grid grid-cols-1 gap-24">
            {[1, 2, 3].map((item) => (
              <div key={item} className="reveal group">
                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-8 
                              border border-white/10 backdrop-blur-sm
                              transition-all duration-500 group-hover:border-white/20">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/40 text-sm font-light">Project {item}</span>
                  </div>
                </div>
                <h3 className="text-[clamp(1.5rem,3vw,2rem)] text-white font-light mb-4">
                  Project Title {item}
                </h3>
                <p className="text-white/60 font-light">
                  Brief description of the project and its impact.
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>
    </LandingShell>
  );
}
