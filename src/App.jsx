import React, { useState } from 'react';
import { NeonCursor } from './components/NeonCursor';
import { HeroSection } from './components/HeroSection';
import { InteractiveDataKeyboard } from './components/InteractiveDataKeyboard';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioCustomizerModal } from './components/PortfolioCustomizerModal';
import { PhysicsControlsWidget } from './components/PhysicsControlsWidget';
import { DriftingElementsCanvas } from './components/DriftingElementsCanvas';
import { MovingCloudsOverlay } from './components/MovingCloudsOverlay';
import { AboutMeSection } from './components/AboutMeSection';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { BeyondCodeSection } from './components/BeyondCodeSection';
import { SleepyCatCompanion } from './components/SleepyCatCompanion';

import {
  initialProfile,
  initialProjects,
  skillsData,
  educationData,
  experienceData,
} from './data/portfolioData';

export default function App() {
  // Load saved profile or fallback
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('shreya_portfolio_profile_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
    return initialProfile;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('shreya_portfolio_projects_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return initialProjects;
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [neonCursorEnabled, setNeonCursorEnabled] = useState(true);
  const [repelForceMultiplier, setRepelForceMultiplier] = useState(1.0);

  const handleSaveProfile = (updated) => {
    setProfile(updated);
    localStorage.setItem('shreya_portfolio_profile_v2', JSON.stringify(updated));
  };

  const handleResetProfile = () => {
    setProfile(initialProfile);
    setProjects(initialProjects);
    localStorage.removeItem('shreya_portfolio_profile_v2');
    localStorage.removeItem('shreya_portfolio_projects_v2');
    localStorage.removeItem('shreya_portfolio_profile');
    localStorage.removeItem('shreya_portfolio_projects');
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-200 selection:text-slate-900">
      {/* 1. Interactive Neon Cursor */}
      <NeonCursor enabled={neonCursorEnabled} />

      {/* 
        2. Drifting Elements:
        Normally gentle drifting down; when user scrolls down, an upward draft moves them up!
        Includes cute mini anime kittens, paws, pastel petals, and watercolor drops.
      */}
      <DriftingElementsCanvas />

      {/* Main Content Area */}
      <main className="relative">
        {/* 1. Hero Section */}
        <HeroSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* 
          Sunset Sky Background Wrapper:
          Applied to ALL sections except HeroSection as requested ("put in bg except hero section").
          Features high-resolution pastel sunset sky, subtle readable scrim, and moving cloud effect.
        */}
        <div
          className="relative w-full overflow-hidden bg-[#F8F4EB]"
          style={{ backgroundColor: '#F8F4EB' }}
        >
          {/* Plain flat background; no gradient or cloud overlay to keep it clean. */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-[#F8F4EB]" />

          {/* Foreground Sections */}
          <div className="relative z-10">
            {/* 1. About Me Section (blue accent with full story & personal facts) */}
            <AboutMeSection />

            {/* 2. My Technical Skills Section */}
            <TechnicalSkillsSection />

            {/* 3. Things I have built (Projects Section) */}
            <ProjectsSection projects={projects} />

            {/* 4. Interactive Mechanical Data Keyboard (Let's connect) */}
            <InteractiveDataKeyboard />

            {/* 5. Beyond Code Section (Hobbies & Creative side) */}
            <BeyondCodeSection />

            {/* 6. Footer */}
            <Footer profile={profile} />
          </div>
        </div>
      </main>

      {/* 
        13. Sleepy Cat Companion:
        Walks along the bottom rail across the screen as you scroll/move down!
        When paused, it curls into a cute loaf, snoozes with 'z z Z' bubbles, and reacts with purrs/facts when clicked/pet.
      */}
      <SleepyCatCompanion
        userName={profile.name}
        college={profile.college}
      />

      {/* 15. Printable Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        education={educationData}
        experience={experienceData}
        projects={projects}
        skills={skillsData}
      />

      {/* 16. Quick Customizer Modal */}
      <PortfolioCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
