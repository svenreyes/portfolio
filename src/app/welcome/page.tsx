import { LandingShell } from '@/components/layout/LandingShell';

export default function WelcomePage() {
  return (
    <LandingShell>
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white/80">
          <h2 className="text-4xl font-light mb-4">Welcome</h2>
          <p className="text-lg">Content coming soon...</p>
        </div>
      </div>
    </LandingShell>
  );
}

