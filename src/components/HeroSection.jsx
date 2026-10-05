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
      <div className="fixed left-1/2 top-4 sm:top-6 -translate-x-1/2 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div className="frosted-pill flex items-center justify-center gap-4 sm:gap-8 px-5 sm:px-7 py-2.5 rounded-full transition-all pointer-events-auto w-[min(72vw,540px)] shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
          <button onClick={() => scrollTo('about-section')} className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-about">
            ABOUT
          </button>
          <span className="text-neutral-400 text-lg">•</span>
          <button onClick={() => scrollTo('skills-section')} className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-skills">
            SKILLS
          </button>
          <span className="text-neutral-400 text-lg">•</span>
          <button onClick={() => scrollTo('projects-gallery')} className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-work">
            WORK
          </button>
          <span className="text-neutral-400 text-lg">•</span>
          <button onClick={() => scrollTo(['contact-section', 'data-keyboard-section', 'footer'])} className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer" id="hero-nav-contact">
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
          </div>

          {/* Large Script Cursive Name */}
          <h1
            id="hero-script-name"
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-neutral-900 font-normal leading-[0.95] tracking-tight font-['Pacifico',cursive] drop-shadow-sm select-none py-1 pointer-events-none"
          >
            Shreya Diwakar
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-800 leading-relaxed pointer-events-none">
            I code. I create. I’m always learning.
          </p>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed pointer-events-none">
            Third-year Computer Science student at <br></br>
            Delhi Technological University (DTU).
          </p>

          <p className="text-base sm:text-lg italic text-neutral-700 leading-relaxed pointer-events-none">
            Turning ideas into things that work.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollTo(['contact-section', 'data-keyboard-section', 'footer'])}
            className="soft-button px-8 py-3.5 rounded-full bg-white/85 hover:bg-neutral-900 text-neutral-900 hover:text-white border-2 border-neutral-900 text-xs sm:text-sm font-bold tracking-widest uppercase backdrop-blur-md shadow-lg transition-all flex items-center gap-2 cursor-pointer pointer-events-auto"
            id="hero-letstalk-pill"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
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
