import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Copy, Check, FolderGit2, Palette, GraduationCap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData } from '../types';
import { RepellingBackground } from './RepellingBackground';
import { CartoonGirlBoard } from './CartoonGirlBoard';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onOpenArtCanvas?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onOpenResume, onOpenArtCanvas }) => {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  // Rotating roles with clean typography
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [profile.roles]);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#cbd5e1', '#f472b6'],
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToJourney = () => {
    const el = document.getElementById('unfolding-journey');
    if (el) {
      const yOffset = -40;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects-gallery');
    if (el) {
      const yOffset = -40;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToArt = () => {
    const el = document.getElementById('creative-art-studio');
    if (el) {
      const yOffset = -40;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (onOpenArtCanvas) {
      onOpenArtCanvas();
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[94vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-8 pb-16 z-10 overflow-hidden"
    >
      {/* 
        Symmetric geometric objects repelling background strictly confined in Hero Section!
      */}
      <RepellingBackground containerRef={heroRef} />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Status Badges in clean, disciplined style with zero emojis */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white text-slate-800 border border-slate-200 text-xs font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Delhi Technological University (DTU)
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-800 border border-slate-200 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
            CSE • Roll: 24/CS/425 (G-2)
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-slate-800 border border-slate-200 text-xs font-medium">
            <Palette className="w-3 h-3 text-pink-600" />
            Fine Art &amp; Creative Tech
          </div>
        </div>

        {/* Plain, Authoritative Name Heading without flashing or weird animations */}
        <div className="relative my-2">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-mono text-slate-500 mb-2">
            Computer Science Engineer &amp; Visual Artist
          </p>

          <h1
            id="hero-plain-name"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 select-none py-1"
          >
            {profile.name}
          </h1>

          {/* Dynamic Role Subtitle */}
          <div className="h-9 mt-2 flex items-center justify-center">
            <span className="font-mono text-base sm:text-lg md:text-xl text-slate-700 font-semibold flex items-center gap-2">
              <span className="text-sky-600 font-bold">&gt;</span>
              <span className="border-b border-dashed border-slate-400 pb-0.5 transition-all duration-300">
                {profile.roles[roleIndex]}
              </span>
              <span className="inline-block w-2 h-5 bg-slate-400 animate-pulse" />
            </span>
          </div>

          {/* Plain, refined bio */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Pursuing Computer Science &amp; Engineering at{' '}
            <strong className="text-slate-800 font-semibold">Delhi Technological University (DTU)</strong>.
            Balancing formal compiler construction and automata theory with the deliberate brushwork of digital and acrylic painting.
          </p>
        </div>

        {/* 
          CARTOON GIRL & STANDING BOARD:
          Anchored in the hero section, stands like a physical presentation board as you scroll!
        */}
        <CartoonGirlBoard profile={profile} />

        {/* Action Buttons with reduced rounds and clean borders */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 max-w-xl">
          {/* Unfolding Journey Primary CTA */}
          <button
            id="hero-unfold-cta"
            onClick={scrollToJourney}
            className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-xs hover:shadow-sm transition-all flex items-center gap-2 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Unfold Bento Device
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Keyboard Data Stream CTA */}
          <button
            onClick={() => {
              const el = document.getElementById('data-keyboard-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 40;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95"
          >
            Keyboard Data Stream
          </button>

          {/* Projects CTA */}
          <button
            id="hero-projects-cta"
            onClick={scrollToProjects}
            className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-slate-600" />
            Projects
          </button>

          {/* Art Corner CTA */}
          <button
            id="hero-art-cta"
            onClick={scrollToArt}
            className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Palette className="w-3.5 h-3.5 text-pink-600" />
            Painting Corner
          </button>

          {/* Copy Email Button */}
          <button
            id="hero-copy-email-btn"
            onClick={copyEmail}
            className="px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.email}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
