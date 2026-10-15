import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { VideoCursorCharacter } from './VideoCursorCharacter';

export const HeroSection = ({ profile, onOpenResume, onOpenCustomizer }) => {
  const heroRef = useRef(null);

  const scrollTo = (ids) => {
    const targetIds = Array.isArray(ids) ? ids : [ids];

    for (const id of targetIds) {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -30;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
  };

  const displayName = profile?.name ? profile.name.split(' ')[0] : 'Shreya';

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen w-full bg-gradient-to-r from-[#e2dcd5] via-[#ded7cf] to-[#c7c1b8] text-neutral-900 overflow-hidden select-none"
    >
      <div className="fixed left-1/2 top-4 sm:top-6 -translate-x-1/2 z-50 flex items-center justify-center px-3 sm:px-4 pointer-events-none">
        <div className="frosted-pill flex items-center justify-center gap-3 sm:gap-8 px-4 sm:px-7 py-2.5 rounded-full transition-all pointer-events-auto w-[min(92vw,540px)] shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
          <button onClick={() => scrollTo('about-section')} className="text-[11px] sm:text-sm font-bold tracking-[0.16em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-about">
            ABOUT
          </button>
          <span className="text-neutral-400 text-base sm:text-lg">•</span>
          <button onClick={() => scrollTo('skills-section')} className="text-[11px] sm:text-sm font-bold tracking-[0.16em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-skills">
            SKILLS
          </button>
          <span className="text-neutral-400 text-base sm:text-lg">•</span>
          <button onClick={() => scrollTo('projects-gallery')} className="text-[11px] sm:text-sm font-bold tracking-[0.16em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-work">
            WORK
          </button>
          <span className="text-neutral-400 text-base sm:text-lg">•</span>
          <button onClick={() => scrollTo(['contact-section', 'data-keyboard-section', 'footer'])} className="text-[11px] sm:text-sm font-bold tracking-[0.16em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-contact">
            CONNECT
          </button>
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
        3. Foreground Overlay Content (Left side on desktop, compact bottom card on mobile)
        Guaranteed zero overlap over the 3D character with constrained width.
      */}
      <div className="relative z-20 max-w-7xl mx-auto min-h-screen flex flex-col justify-end md:justify-center px-4 sm:px-8 lg:px-14 pb-5 sm:pb-8 md:pb-0 pointer-events-none">
        {/* Left Side Content Card / Typography */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full sm:max-w-[340px] md:max-w-[360px] lg:max-w-[380px] pointer-events-none space-y-2 sm:space-y-3.5 text-left bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 sm:p-5 md:p-0 rounded-2xl md:rounded-none border border-white/70 md:border-none shadow-lg md:shadow-none"
        >
          {/* Small Top Label */}
          <div className="inline-flex items-center gap-1.5 pointer-events-none">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-neutral-800 uppercase font-mono">
              HI, I'M
            </span>
          </div>

          {/* Large Script Cursive Name - Clean 2-line stack prevents spreading into character area */}
          <h1
            id="hero-script-name"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 font-normal leading-[1.02] tracking-tight font-['Pacifico',cursive] drop-shadow-sm select-none py-0.5 pointer-events-none"
          >
            <span className="block">Shreya</span>
            <span className="block">Diwakar</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-semibold text-neutral-800 leading-snug pointer-events-none">
            I code. I create. I’m always learning.
          </p>

          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pointer-events-none">
            Third-year Computer Science student at <br className="hidden sm:inline" />
            Delhi Technological University (DTU).
          </p>

          <p className="text-[11px] sm:text-xs italic text-neutral-600 leading-relaxed pointer-events-none">
            Turning ideas into things that work.
          </p>

          <div className="pt-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo(['contact-section', 'data-keyboard-section', 'footer'])}
              className="soft-button px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/90 hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 text-[11px] sm:text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-md transition-all flex items-center gap-2 cursor-pointer pointer-events-auto"
              id="hero-letstalk-pill"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>
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
