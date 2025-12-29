'use client';

import { LandingShell } from '@/components/layout/LandingShell';
import { CurvedComponent } from '@/components/layout/CurvedComponent';
import { SectionEntryHeader } from '@/components/scroll/SectionEntryHeader';
import { SplitHeadline } from '@/components/typography/SplitHeadline';
import { BodyText } from '@/components/typography/BodyText';
import { Hero3D } from '@/components/sections/Hero3D';
import { AboutHero } from '@/components/sections/AboutHero';
import { AboutWhatIDo } from '@/components/sections/AboutWhatIDo';
import { AboutMotivation } from '@/components/sections/AboutMotivation';
import { ApproachBar } from '@/components/sections/ApproachBar';
import { ApproachSubline } from '@/components/sections/ApproachSubline';
import { ApproachPillarsSection } from '@/components/sections/ApproachPillarsSection';
import { CapabilitiesHeader } from '@/components/sections/CapabilitiesHeader';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';

export default function Home() {
  return (
    <LandingShell>
      <div className="flex flex-col gap-8">
        <CurvedComponent id="hero" className="min-h-[90vh]">
          <Hero3D 
            name="Sven Reyes"
            tagline="we are looking to bring
you enlightenment
To offer illumination in
stormy skies"
          />
        </CurvedComponent>

        <div id="about" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="about" />
          <CurvedComponent className="min-h-screen">
            <AboutHero />
          </CurvedComponent>
          <CurvedComponent>
            <AboutWhatIDo />
          </CurvedComponent>
          <CurvedComponent>
            <AboutMotivation />
          </CurvedComponent>
        </div>

        <div id="approach" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="approach" />
          <CurvedComponent>
            <ApproachBar text="Systems-first" leftLabel="(Systems)" rightLabel="(First)" />
          </CurvedComponent>
          <CurvedComponent>
            <ApproachBar text="End-to-end" leftLabel="(End)" rightLabel="(End)" />
          </CurvedComponent>
          <CurvedComponent>
            <ApproachBar text="Built with intent" leftLabel="(Built)" rightLabel="(Intent)" />
          </CurvedComponent>
          <CurvedComponent>
            <ApproachSubline />
          </CurvedComponent>
          <ApproachPillarsSection />
          <CapabilitiesHeader />
          <CapabilitiesGrid />
        </div>

        <div id="experience" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="experience" />
          <CurvedComponent className="min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-8">
              <SplitHeadline as="h2" className="mb-16">
                {`Selected\nprojects`}
              </SplitHeadline>

              <BodyText className="mb-24">
                A collection of work that showcases our approach to digital design and development.
              </BodyText>

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
          </CurvedComponent>
        </div>

        <div id="projects" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="projects" />
          <CurvedComponent className="min-h-[120vh] py-12">
            <div className="max-w-6xl mx-auto px-8">
              <SplitHeadline as="h2" className="mb-16">
                {`Featured\nwork`}
              </SplitHeadline>

              <BodyText className="mb-24">
                A showcase of side projects and experiments that push the boundaries of what's possible.
              </BodyText>

              <div className="space-y-32">
                {[1, 2].map((item) => (
                  <div key={item} className="reveal">
                    <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-8 
                                  border border-white/10 backdrop-blur-sm
                                  transition-all duration-500 hover:border-white/20">
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/40 text-sm font-light">Featured Project {item}</span>
                      </div>
                    </div>
                    <h3 className="text-[clamp(1.5rem,3vw,2rem)] text-white font-light mb-4">
                      Project Name {item}
                    </h3>
                    <BodyText>
                      Description of the project, technologies used, and the impact it had.
                    </BodyText>
                  </div>
                ))}
              </div>
            </div>
          </CurvedComponent>
        </div>

        <div id="contact" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="contact" />
          <CurvedComponent className="min-h-[80vh] py-12">
            <div className="max-w-6xl mx-auto px-8 text-center">
              <SplitHeadline as="h2" className="mb-16">
                {`Let's work\ntogether`}
              </SplitHeadline>

              <BodyText className="mb-12 max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it.
              </BodyText>

              <div className="flex flex-col gap-6 items-center">
                <a
                  href="mailto:hello@svenreyes.com"
                  className="text-[clamp(1.25rem,2vw,1.5rem)] text-white/90 hover:text-white transition-colors"
                >
                  hello@svenreyes.com
                </a>
                <div className="flex gap-6 justify-center">
                  <a href="#" className="text-white/60 hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">GitHub</a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">Twitter</a>
                </div>
              </div>
            </div>
          </CurvedComponent>
        </div>

      </div>
    </LandingShell>
  );
}
