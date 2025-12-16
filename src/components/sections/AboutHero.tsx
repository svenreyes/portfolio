'use client';

export function AboutHero() {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-between p-8 md:p-12 lg:p-16">
      {/* top headline */}
      <div className="flex flex-col">
        <h2 className="text-[clamp(4rem,12vw,11rem)] font-light leading-[0.95] tracking-tight text-white text-center">
          I am
        </h2>
        
        {/* first divider */}
        <div className="w-full h-px bg-white/20 mt-8" />
      </div>

      {/* middle section */}
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 py-8">
          {/* small text left */}
          <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-[280px]">
            I design and build software<br />
            that feels intentional.
          </p>
          
          {/* large text right */}
          <span className="text-[clamp(4rem,14vw,12rem)] font-light leading-[0.85] tracking-tight text-white">
            Sven
          </span>
        </div>

        {/* second divider */}
        <div className="w-full h-px bg-white/20" />
      </div>

      {/* bottom headline */}
      <div className="flex flex-col">
        <h2 className="text-[clamp(4rem,16vw,14rem)] font-light italic leading-[0.85] tracking-tight text-white">
          Reyes
        </h2>

        {/* footer */}
        <div className="flex justify-between items-end mt-8">
          <span className="text-white/50 text-sm">(About)</span>
          <span className="text-white/50 text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            01 / 05
          </span>
        </div>
      </div>
    </div>
  );
}
