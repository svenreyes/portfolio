'use client';

import './MainPanel.css';

interface MainPanelProps {
  children?: React.ReactNode;
}

export function MainPanel({ children }: MainPanelProps) {
  return (
    <div className="glass-main-panel">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        {/* Left: Name */}
        <h1 className="text-3xl md:text-4xl text-white font-light tracking-wide">
          Sven Reyes
        </h1>
        
        {/* Right: Poem */}
        <div className="text-right text-white/80 text-sm md:text-base leading-relaxed max-w-xs">
          <p className="font-light">
            we are looking to bring<br />
            you enlightenment<br />
            To offer illumination in<br />
            stormy skies
          </p>
        </div>
      </div>

      {/* Center: 3D Model Placeholder */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {children || (
          <div className="glass-placeholder">
            <div className="text-white/40 text-center relative z-10">
              <div className="text-6xl mb-4">✨</div>
              <p className="text-sm font-light">3D Model Placeholder</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

