'use client';

import { LandingShell } from '@/components/layout/LandingShell';
import { CurvedSection } from '@/components/layout/CurvedSection';
import { SectionEntryHeader } from '@/components/scroll/SectionEntryHeader';
import { SplitHeadline } from '@/components/typography/SplitHeadline';
import { BodyText } from '@/components/typography/BodyText';

export default function Home() {
  return (
    <LandingShell>
      <div className="flex flex-col gap-8 p-8">
        {/* Hero Section - Standard Height */}
        <CurvedSection id="hero" className="min-h-[90vh] flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-8">
            <SplitHeadline as="h1">
              {`Crafting digital\nexperiences that\nilluminate`}
            </SplitHeadline>

            <BodyText className="mt-12 max-w-2xl" size="lg">
              We are looking to bring you enlightenment. To offer illumination in stormy skies.
            </BodyText>
          </div>
        </CurvedSection>

        {/* Welcome Section - TALLER to test scroll progress */}
        <div id="welcome" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="welcome" />
          <CurvedSection className="min-h-[150vh] py-12">
            <div className="max-w-6xl mx-auto px-8 h-full flex flex-col">
              <SplitHeadline as="h2" className="mb-16">
                {`We design\nwith purpose`}
              </SplitHeadline>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-auto">
                <BodyText>
                  Every project begins with understanding. We dive deep into your vision,
                  your audience, and your goals to create experiences that resonate.
                </BodyText>

                <BodyText>
                  Our approach combines strategic thinking with creative execution,
                  ensuring that every pixel serves a purpose.
                </BodyText>
              </div>

              {/* Extra content to force scroll */}
              <div className="mt-32 p-12 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                <h3 className="text-2xl text-white mb-4">Extended Content</h3>
                <p className="text-white/60">
                  This section is intentionally taller than the viewport to demonstrate the
                  sidebar scroll progress indicator. As you scroll down past this point,
                  watch the circle in the "Hello" card move downwards.
                </p>
              </div>
            </div>
          </CurvedSection>
        </div>

        {/* Approach Section - TALLER to test scroll progress */}
        <div id="approach" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="approach" />
          <CurvedSection className="min-h-[180vh] py-12">
            <div className="max-w-6xl mx-auto px-8">
              <SplitHeadline as="h2" className="mb-16">
                {`Thoughtful\nby design`}
              </SplitHeadline>

              <div className="space-y-48"> {/* Large spacing to create height */}
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
          </CurvedSection>
        </div>

        {/* Work Section - Standard Height */}
        <div id="work" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="work" />
          <CurvedSection className="min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-8">
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
          </CurvedSection>
        </div>

        {/* Projects Section - Medium Height */}
        <div id="projects" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="projects" />
          <CurvedSection className="min-h-[120vh] py-12">
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
          </CurvedSection>
        </div>

        {/* Contact Section - Short Height */}
        <div id="contact" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="contact" />
          <CurvedSection className="min-h-[80vh] py-12">
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
          </CurvedSection>
        </div>

        {/* Resume Section - Short Height */}
        <div id="resume" className="flex flex-col gap-4">
          <SectionEntryHeader sectionId="resume" />
          <CurvedSection className="min-h-[70vh] py-12">
            <div className="max-w-6xl mx-auto px-8 text-center">
              <SplitHeadline as="h2" className="mb-16">
                {`My experience`}
              </SplitHeadline>

              <BodyText className="mb-12">
                Download my resume to learn more about my background and experience.
              </BodyText>

              <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-full
                               text-white hover:bg-white/20 transition-all duration-300
                               backdrop-blur-sm">
                Download Resume
              </button>
            </div>
          </CurvedSection>
        </div>
      </div>
    </LandingShell>
  );
}

