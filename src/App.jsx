import React, { useState } from 'react';
import { NeonCursor } from './components/NeonCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UnfoldingBentoSection } from './components/UnfoldingBentoSection';
import { InteractiveDataKeyboard } from './components/InteractiveDataKeyboard';
import { SkillsMatrix } from './components/SkillsMatrix';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { PaintingCornerSection } from './components/PaintingCornerSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioCustomizerModal } from './components/PortfolioCustomizerModal';
import { PhysicsControlsWidget } from './components/PhysicsControlsWidget';
import { DriftingElementsCanvas } from './components/DriftingElementsCanvas';
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

      {/* 3. Sticky Navigation Header */}
      <Navbar
        profile={profile}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative">
        {/* 
          4. Hero Section:
          CRITICAL CONSTRAINT: Repelling effect is STRICTLY confined within this Hero Section only.
          Features Shreya Diwakar's automatic flashing neon name, DTU CSE badges, and metrics.
        */}
        <HeroSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 5. Unfolding Bento Section (Boxes unfold from single rectangle on scroll) */}
        <UnfoldingBentoSection
          profile={profile}
          education={educationData}
          skills={skillsData}
        />

        {/* 
          6. Interactive Mechanical Data Keyboard:
          Represents Shreya's data (DTU CSE, Compilers, Painting) via automatic key typing animation 
          and an interactive typing test mode!
        */}
        <InteractiveDataKeyboard />

        {/* 7. Skills Matrix in Soft Mix of Colors */}
        <SkillsMatrix skillCategories={skillsData} />

        {/* 7. Interactive Terminal Playground */}
        <InteractiveTerminal profile={profile} projects={projects} />

        {/* 8. Experience & Milestones Timeline */}
        <ExperienceTimeline experience={experienceData} />

        {/* 9. Projects Gallery with Scroll-Driven Zoom Effect */}
        <ProjectsSection projects={projects} />

        {/* 10. Creative Art Corner & Pastel Easel (Celebrating Shreya's Painting hobby) */}
        <PaintingCornerSection />

        {/* 11. Contact & Socials */}
        <ContactSection profile={profile} />
      </main>

      {/* 12. Footer */}
      <Footer profile={profile} />

      {/* 
        13. Sleepy Cat Companion:
        Walks along the bottom rail across the screen as you scroll/move down!
        When paused, it curls into a cute loaf, snoozes with 'z z Z' bubbles, and reacts with purrs/facts when clicked/pet.
      */}
      <SleepyCatCompanion
        userName={profile.name}
        college={profile.college}
      />

      {/* 14. Floating Controls for Physics & Neon Cursor */}
      <PhysicsControlsWidget
        cursorEnabled={neonCursorEnabled}
        onToggleCursor={() => setNeonCursorEnabled(!neonCursorEnabled)}
        repelMultiplier={repelForceMultiplier}
        onChangeRepelMultiplier={setRepelForceMultiplier}
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
