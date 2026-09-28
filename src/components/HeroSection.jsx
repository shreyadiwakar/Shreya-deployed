import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronUp, Settings } from 'lucide-react';
import { VideoCursorCharacter } from './VideoCursorCharacter';

export const HeroSection = ({ profile, onOpenResume, onOpenCustomizer }) => {
  const heroRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -30;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const displayName = profile?.name ? profile.name.split(' ')[0] : 'Shreya';

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen w-full bg-gradient-to-r from-[#e2dcd5] via-[#ded7cf] to-[#c7c1b8] text-neutral-900 overflow-hidden select-none"
    >
      {/* 
        1. Top Floating Glassmorphism Pill Navigation (Centered)
      */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 z-40 flex items-center justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-full bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-neutral-300/80 shadow-lg transition-all pointer-events-auto">
          <button
            onClick={() => scrollTo('about-section')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all cursor-pointer"
            id="hero-nav-about"
          >
            ABOUT
          </button>
          <span className="text-neutral-300 text-xs">•</span>
          <button
            onClick={() => scrollTo('skills-section')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all cursor-pointer"
            id="hero-nav-skills"
          >
            SKILLS
          </button>
          <span className="text-neutral-300 text-xs">•</span>
          <button
            onClick={() => scrollTo('projects-gallery')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all cursor-pointer"
            id="hero-nav-work"
          >
            WORK
          </button>
          <span className="text-neutral-300 text-xs">•</span>
          <button
            onClick={() => scrollTo('footer')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-all cursor-pointer"
            id="hero-nav-contact"
          >
            CONNECT
          </button>

          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="ml-1 p-1.5 rounded-full text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              title="Customize Profile"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 
        2. ZERO-GHOSTING 60 FPS ULTRA-SMOOTH CURSOR TRACKING CHARACTER
        64 high-density WebP frames + direct eye contact center deadzone
        Centered directly in the middle of the page with seamless edge-to-edge table
      */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-end justify-center">
        <VideoCursorCharacter />
      </div>

      {/* 
        3. Foreground Overlay Content (Left side & Lower Left)
        Framing the centered model, matching the exact reference photo layout.
      */}
      <div className="relative z-20 max-w-7xl mx-auto min-h-screen flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-8 pointer-events-none">
        {/* Top spacer to account for top navbar */}
        <div className="h-16 sm:h-20" />

        {/* Left Side Content Card / Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-md lg:max-w-lg pointer-events-none my-auto space-y-4 text-left"
        >
          {/* Small Top Label */}
          <div className="inline-flex items-center gap-2 pointer-events-none">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-neutral-800 uppercase font-mono">
              HI, I'M
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          </div>

          {/* Large Script Cursive Name */}
          <h1
            id="hero-script-name"
            className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-neutral-900 font-normal leading-[0.95] tracking-wide font-['Pacifico',cursive] drop-shadow-sm select-none py-1 pointer-events-none"
          >
            {displayName}
          </h1>

          {/* Subtitle Bio matching reference photo */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed font-normal tracking-wide font-sans pointer-events-none">
            Crafting modern full-stack web experiences with clean code, creative motion, and scalable digital architecture.
          </p>

          {/* Sub-tag with University & Department */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-800 font-mono pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-neutral-300/80 shadow-sm pointer-events-none">
              DTU CSE ‘28
            </span>
            <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-neutral-300/80 shadow-sm pointer-events-none">
              Roll: 24/CS/425
            </span>
            <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-neutral-300/80 shadow-sm pointer-events-none">
              Full-Stack &amp; Fine Art
            </span>
          </div>

          {/* Pill Action Buttons matching reference */}
          <div className="flex flex-wrap items-center gap-4 pt-3 pointer-events-none">
            {/* RESUME ^ Pill */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenResume}
              className="px-8 py-3.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 cursor-pointer pointer-events-auto group"
              id="hero-resume-pill"
            >
              <span>RESUME</span>
              <ChevronUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            {/* LET'S TALK Outline Pill */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact-section')}
              className="px-8 py-3.5 rounded-full bg-white/80 hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 text-xs sm:text-sm font-bold tracking-widest uppercase backdrop-blur-md shadow-lg transition-all flex items-center gap-2 cursor-pointer pointer-events-auto"
              id="hero-letstalk-pill"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Scroll Prompt */}
        <div className="pointer-events-auto flex justify-start items-center pt-4 pb-16 sm:pb-18 z-20">
          <button
            onClick={() => scrollTo('about-section')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-neutral-300/80 text-neutral-800 hover:text-neutral-950 text-xs font-mono tracking-widest uppercase shadow-md transition-all cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span className="group-hover:translate-x-0.5 transition-transform">Explore About &amp; Work</span>
          </button>
        </div>
      </div>

      {/* 
        Merge Shade Transition:
        Soft feathered gradient at the bottom of the Hero section that smoothly melts the desk 
        into the transition shade leading into the sunset sky below.
      */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-15"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(223, 211, 195, 0.3) 30%, rgba(223, 211, 195, 0.7) 70%, rgba(223, 211, 195, 0.95) 100%)',
        }}
      />
    </section>
  );
};
