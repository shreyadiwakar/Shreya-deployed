import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Layers, Sliders, Heart, GraduationCap, Cpu, Sparkles, ChevronRight, CheckCircle2, Shield, Laptop } from 'lucide-react';
import { ProfileData, EducationItem, SkillCategory } from '../types';

interface UnfoldingBentoSectionProps {
  profile: ProfileData;
  education: EducationItem[];
  skills: SkillCategory[];
}

export const UnfoldingBentoSection: React.FC<UnfoldingBentoSectionProps> = ({
  profile,
  education,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [manualProgress, setManualProgress] = useState<number | null>(null);
  const [isManualMode, setIsManualMode] = useState(false);

  // Track scroll through the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  const [currentProgressVal, setCurrentProgressVal] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (!isManualMode) {
        // Map scroll range [0.18, 0.72] to [0, 1]
        const clamped = Math.max(0, Math.min(1, (latest - 0.18) / 0.54));
        setCurrentProgressVal(clamped);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, isManualMode]);

  const p = isManualMode && manualProgress !== null ? manualProgress : currentProgressVal;
  const isFolded = p < 0.12;
  const unfoldPercentage = Math.round(p * 100);

  return (
    <section
      id="unfolding-journey"
      ref={containerRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
          <Layers className="w-3.5 h-3.5 text-slate-700" />
          Modular Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          The <span className="text-sky-600">Unfolding</span> Pillars
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Watch this unified identity card expand into its core pillars inside the viewport as you scroll down.
        </p>

        {/* Interactive Scrub Control Bar */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-mono text-slate-600 flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            Unfold State: <strong className="text-slate-900 font-bold">{unfoldPercentage}%</strong>
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => {
              setIsManualMode(true);
              setManualProgress(parseFloat(e.target.value));
            }}
            className="w-28 sm:w-40 accent-slate-900 cursor-pointer"
            aria-label="Interactive Unfold Slider"
          />

          <button
            onClick={() => {
              if (isManualMode) {
                setIsManualMode(false);
                setManualProgress(null);
              } else {
                setIsManualMode(true);
                setManualProgress(p > 0.5 ? 0 : 1);
              }
            }}
            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            {isManualMode ? 'Sync Scroll' : p > 0.5 ? 'Snap Fold' : 'Snap Unfold'}
          </button>
        </div>
      </div>

      {/* 
        DEVICE FRAME CONTAINER:
        Requirement: "unwrap boxes must heappen in freame of device."
        The entire unwrap process occurs strictly contained within this hardware display frame!
      */}
      <div className="w-full bg-slate-900 rounded-2xl p-2 sm:p-3 shadow-2xl border border-slate-800">
        {/* Device Top Bezel & Window Controls */}
        <div className="bg-slate-950 rounded-t-xl px-4 py-3 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
            <span className="ml-2 text-slate-400 text-[11px] hidden sm:inline-flex items-center gap-1">
              <Laptop className="w-3 h-3" />
              Device Canvas Viewport // 1200x800
            </span>
          </div>

          <div className="bg-slate-900 px-3 py-1 rounded-md text-[11px] text-slate-300 border border-slate-800 flex items-center gap-1.5 truncate max-w-xs sm:max-w-md">
            <span className="text-emerald-400">https://</span>
            <span>shreyadiwakar.dev/pillars/bento-expanded</span>
          </div>

          <div className="text-[11px] text-slate-500 hidden sm:block">
            {isFolded ? 'STATE: FOLDED' : 'STATE: EXPANDED'}
          </div>
        </div>

        {/* Device Inner Screen Canvas */}
        <div className="relative min-h-[640px] sm:min-h-[680px] bg-slate-50 rounded-b-xl p-4 sm:p-6 overflow-hidden flex items-center justify-center border border-slate-200">
          {/* FOLDED SINGLE RECTANGLE CONTAINER */}
          <motion.div
            animate={{
              opacity: isFolded ? 1 : Math.max(0, 1 - p * 2.8),
              scale: 1 - p * 0.08,
            }}
            transition={{ duration: 0.15 }}
            className={`absolute z-20 w-full max-w-md p-7 rounded-xl bg-white border border-slate-300 shadow-lg text-center flex flex-col items-center justify-center transition-all ${
              isFolded ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-white font-mono font-bold text-base flex items-center justify-center mb-3">
              SD
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 mb-2">
              Single Unified Identity
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Shreya Diwakar
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
              All academic, compiler, and artistic pillars condensed into this single card.
              Scroll to unfold inside this device.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
              <span>Scroll down to unpack</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>

          {/* THE 4 CRISP UNFOLDED BENTO BOXES */}
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-12 gap-4 relative">
            {/* BOX 1: Philosophy & Bio (Top Left) */}
            <motion.div
              style={{
                x: (1 - p) * 80,
                y: (1 - p) * 80,
                scale: 0.85 + p * 0.15,
                opacity: 0.2 + p * 0.8,
              }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              className="md:col-span-7 p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-pink-50 text-pink-800 text-xs font-mono font-semibold border border-pink-200">
                    <Heart className="w-3 h-3 text-pink-600" />
                    PILLAR 01 // BIO &amp; VALUES
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Unfolded
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Algorithmic Rigor &amp; Creative Tech
                </h3>
                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Systems Thinker
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Compiler Explorer
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Visual Artist
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Clean Architecture
                </span>
              </div>
            </motion.div>

            {/* BOX 2: DTU Academics (Top Right) */}
            <motion.div
              style={{
                x: (1 - p) * -80,
                y: (1 - p) * 80,
                scale: 0.85 + p * 0.15,
                opacity: 0.2 + p * 0.8,
              }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              className="md:col-span-5 p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 text-xs font-mono font-semibold border border-sky-200">
                    <GraduationCap className="w-3 h-3 text-sky-600" />
                    PILLAR 02 // DTU ACADEMICS
                  </span>
                  <span className="text-[11px] font-mono text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                    {education[0]?.gradeOrGpa}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {education[0]?.degree}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {education[0]?.institution}
                </p>
                <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                  Roll: {education[0]?.rollNo}
                </p>

                <div className="mt-3">
                  <p className="text-[11px] font-mono uppercase text-slate-500 mb-1">
                    Featured Coursework:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {education[0]?.coursework.slice(0, 3).map((course, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BOX 3: Core Technical Tooling (Bottom Left) */}
            <motion.div
              style={{
                x: (1 - p) * 80,
                y: (1 - p) * -80,
                scale: 0.85 + p * 0.15,
                opacity: 0.2 + p * 0.8,
              }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              className="md:col-span-5 p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold border border-emerald-200">
                    <Cpu className="w-3 h-3 text-emerald-600" />
                    PILLAR 03 // SYSTEMS ARSENAL
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700">
                    C++ / Web / LEX
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Polyglot &amp; Formal Parsers
                </h3>

                <div className="mt-2.5 space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block mb-0.5">Languages:</span>
                    <div className="flex flex-wrap gap-1">
                      {['C / C++', 'LEX & Flex', 'TypeScript', 'Python', 'SQL'].map((t) => (
                        <span key={t} className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block mb-0.5">Systems &amp; Frameworks:</span>
                    <div className="flex flex-wrap gap-1">
                      {['React 19', 'Next.js', 'Node.js', 'Linux CLI', 'Canvas 2D'].map((t) => (
                        <span key={t} className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BOX 4: Guiding Philosophy (Bottom Right) */}
            <motion.div
              style={{
                x: (1 - p) * -80,
                y: (1 - p) * -80,
                scale: 0.85 + p * 0.15,
                opacity: 0.2 + p * 0.8,
              }}
              transition={{ type: 'spring', stiffness: 130, damping: 20 }}
              className="md:col-span-7 p-5 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-xs font-mono font-semibold border border-amber-200">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    PILLAR 04 // ENGINEERING CREED
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Core Tenets
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  "{profile.philosophy}"
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center gap-1 text-slate-800 font-bold font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Complexity Rigor
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Evaluating asymptotic bounds O(n) and state closures.
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <div className="flex items-center gap-1 text-slate-800 font-bold font-mono">
                      <Shield className="w-3 h-3 text-sky-600" />
                      Deterministic Craft
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Deterministic finite states with zero unhandled transitions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
