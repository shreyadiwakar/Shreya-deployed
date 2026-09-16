import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Volume2, VolumeX, Heart, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SleepyCatCompanionProps {
  userName?: string;
  college?: string;
}

const CAT_THOUGHTS = [
  'Zzz... dreaming in C++ and pastel watercolors...',
  'Purrrr! Shreya says hello from Delhi Technological University (DTU)!',
  'Walking across your screen... watching the NFA turn into a DFA!',
  'Taking a cozy nap while the LEX comment stripper runs...',
  'Did you know? Shreya’s passion is painting and fine art!',
  'Meow! Good job scrolling through all those engineering milestones!',
  'Purrrr... DTU CSE Roll 24/CS/425 verified.',
  'Snuggling up on this warm screen... zzz...',
];

export const SleepyCatCompanion: React.FC<SleepyCatCompanionProps> = ({
  userName = 'Shreya',
  college = 'Delhi Technological University',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [walkFrame, setWalkFrame] = useState(0);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [isSleeping, setIsSleeping] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<number | null>(null);
  const bubbleTimeout = useRef<number | null>(null);

  // Play gentle Web Audio API purr / melodic chime
  const playCatChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();

      // Gentle pastel synth notes
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
      });
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Track scroll position and movement
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        const pct = Math.max(0, Math.min(1, currentScroll / totalScroll));
        setScrollProgress(pct);
      }

      // Determine movement direction
      const delta = currentScroll - lastScrollY.current;
      if (Math.abs(delta) > 1.5) {
        setDirection(delta > 0 ? 'right' : 'left');
        setIsWalking(true);
        setIsSleeping(false);

        // Step animation frame
        setWalkFrame((prev) => (prev + 1) % 4);
      }
      lastScrollY.current = currentScroll;

      // Clear existing idle timer
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      // Settle into sleep after 600ms idle
      scrollTimeout.current = window.setTimeout(() => {
        setIsWalking(false);
        setIsSleeping(true);
      }, 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Pet the cat
  const handlePetCat = () => {
    setPetCount((prev) => prev + 1);
    playCatChime();

    // Trigger random dialogue
    const randomThought = CAT_THOUGHTS[Math.floor(Math.random() * CAT_THOUGHTS.length)];
    setSpeechBubble(randomThought);

    if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = window.setTimeout(() => {
      setSpeechBubble(null);
    }, 4000);

    // Mini pastel hearts confetti
    confetti({
      particleCount: 18,
      spread: 45,
      origin: { y: 0.9, x: Math.max(0.1, Math.min(0.9, scrollProgress)) },
      colors: ['#f472b6', '#bae6fd', '#fde047', '#ddd6fe', '#bbf7d0'],
    });
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-3 left-4 z-40 px-3 py-1.5 rounded-full bg-white/95 border border-pink-200 text-slate-700 shadow-md flex items-center gap-1.5 text-xs font-mono hover:scale-105 transition-all"
        title="Wake up the sleepy cat"
      >
        <span>🐱</span>
        <span className="font-medium text-[11px] text-pink-600">Sleepy Cat (Zzz)</span>
      </button>
    );
  }

  // Calculate cat position horizontally (clamped between 3% and 92% of screen)
  const leftPercent = 3 + scrollProgress * 89;

  return (
    <aside aria-label="Sleepy cat scroll companion" className="fixed bottom-0 left-0 right-0 z-35 pointer-events-none select-none">
      {/* Delicate bottom ledge rail for cat to walk on */}
      <div className="relative w-full h-1 bg-gradient-to-r from-pink-200 via-sky-200 to-emerald-200 opacity-60">
        {/* Subtle filled progress line */}
        <div
          className="h-full bg-gradient-to-r from-pink-400 via-sky-400 to-emerald-400 transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Walking / Sleeping Cat Container */}
      <div
        className="absolute bottom-1 pointer-events-auto transition-all duration-150"
        style={{
          left: `${leftPercent}%`,
          transform: `translateX(-50%) ${direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
        }}
      >
        {/* Thought / Speech Bubble */}
        {speechBubble && (
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-52 sm:w-64 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-200 text-[11px] font-sans text-slate-800 shadow-lg text-center leading-tight animate-fade-in z-50 pointer-events-none"
            style={{ transform: direction === 'left' ? 'translateX(-50%) scaleX(-1)' : 'translateX(-50%)' }}
          >
            <div className="relative">
              {speechBubble}
              {/* Little arrow at bottom of bubble */}
              <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-pink-200 rotate-45" />
            </div>
          </div>
        )}

        {/* Floating "Z z Z" bubbles when sleeping */}
        {isSleeping && !isWalking && (
          <div
            className="absolute -top-6 -right-1 text-[11px] font-mono font-bold text-pink-400 animate-bounce pointer-events-none"
            style={{ transform: direction === 'left' ? 'scaleX(-1)' : 'none' }}
          >
            <span className="inline-block animate-pulse">z</span>
            <span className="inline-block animate-pulse delay-100 text-[13px] text-sky-400">Z</span>
            <span className="inline-block animate-pulse delay-200 text-[15px] text-purple-400">z</span>
          </div>
        )}

        {/* Interactive Cat SVG Graphic */}
        <button
          onClick={handlePetCat}
          onMouseEnter={() => {
            if (!speechBubble) {
              setSpeechBubble('Purrrr... Pet me! 🐾 (Click for DTU facts)');
            }
          }}
          className="group relative cursor-pointer focus:outline-none p-1 transition-transform active:scale-95"
          title="Click to pet Shreya's sleepy companion cat!"
        >
          {/* Animated SVG Cat */}
          <svg
            width="56"
            height="44"
            viewBox="0 0 56 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm filter"
          >
            {/* Soft Warm Pastel Coat */}
            <defs>
              <linearGradient id="catCoat" x1="0" y1="0" x2="56" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fed7aa" /> {/* Warm pastel peach */}
                <stop offset="1" stopColor="#fdba74" />
              </linearGradient>
              <linearGradient id="catBelly" x1="0" y1="0" x2="30" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="1" stopColor="#fef3c7" />
              </linearGradient>
            </defs>

            {/* Tail */}
            <path
              d={
                isWalking
                  ? walkFrame % 2 === 0
                    ? 'M 10 26 Q 2 18, 4 10 Q 6 6, 9 10'
                    : 'M 10 26 Q 4 22, 2 14 Q 3 8, 7 12'
                  : 'M 10 28 Q 6 32, 12 34 Q 18 34, 16 30'
              }
              stroke="#ea580c"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-200"
            />

            {/* Cat Body */}
            {isSleeping && !isWalking ? (
              // Loaf / curled sleeping body
              <ellipse cx="26" cy="28" rx="16" ry="11" fill="url(#catCoat)" />
            ) : (
              // Active walking body
              <ellipse cx="28" cy="25" rx="17" ry="12" fill="url(#catCoat)" />
            )}

            {/* Light pastel belly patch */}
            <ellipse cx="28" cy="27" rx="10" ry="7" fill="url(#catBelly)" opacity="0.8" />

            {/* Walking Legs with Stride Animation */}
            {isWalking ? (
              <g className="transition-all">
                {/* Back Left Leg */}
                <path
                  d={walkFrame % 2 === 0 ? 'M 16 32 L 13 41' : 'M 16 32 L 19 40'}
                  stroke="#ea580c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Back Right Leg */}
                <path
                  d={walkFrame % 2 === 0 ? 'M 22 33 L 25 40' : 'M 22 33 L 19 41'}
                  stroke="#c2410c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Front Left Leg */}
                <path
                  d={walkFrame % 2 === 0 ? 'M 35 32 L 39 41' : 'M 35 32 L 32 40'}
                  stroke="#ea580c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Front Right Leg */}
                <path
                  d={walkFrame % 2 === 0 ? 'M 40 33 L 37 40' : 'M 40 33 L 43 41'}
                  stroke="#c2410c"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              // Resting little tucked paws
              <g>
                <ellipse cx="20" cy="36" rx="4" ry="2.5" fill="#f97316" />
                <ellipse cx="36" cy="36" rx="4" ry="2.5" fill="#f97316" />
              </g>
            )}

            {/* Cat Head */}
            <circle cx="41" cy="21" r="10" fill="url(#catCoat)" />

            {/* Ears */}
            <polygon points="35,14 38,5 42,12" fill="#ea580c" />
            <polygon points="37,13 39,8 41,12" fill="#fbcfe8" /> {/* Inner pink ear */}

            <polygon points="43,12 47,5 49,14" fill="#ea580c" />
            <polygon points="44,12 46,8 48,13" fill="#fbcfe8" />

            {/* Eyes */}
            {isSleeping && !isWalking ? (
              // Happy sleeping eyes (^ ^)
              <g stroke="#7c2d12" strokeWidth="1.6" strokeLinecap="round">
                <path d="M 37 20 Q 39 17, 41 20" />
                <path d="M 44 20 Q 46 17, 48 20" />
              </g>
            ) : (
              // Open curious eyes
              <g>
                <ellipse cx="39" cy="20" rx="2" ry="2.4" fill="#0f172a" />
                <circle cx="39.5" cy="19.2" r="0.8" fill="#ffffff" />
                <ellipse cx="46" cy="20" rx="2" ry="2.4" fill="#0f172a" />
                <circle cx="46.5" cy="19.2" r="0.8" fill="#ffffff" />
              </g>
            )}

            {/* Little Pink Nose & Mouth */}
            <polygon points="42,23 44,23 43,24.5" fill="#f43f5e" />
            <path d="M 43 24.5 Q 41.5 26.5, 40 25.5" stroke="#7c2d12" strokeWidth="1" fill="none" />
            <path d="M 43 24.5 Q 44.5 26.5, 46 25.5" stroke="#7c2d12" strokeWidth="1" fill="none" />

            {/* Whiskers */}
            <line x1="33" y1="22" x2="28" y2="21" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />
            <line x1="33" y1="24" x2="28" y2="25" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />
            <line x1="49" y1="22" x2="54" y2="21" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />
            <line x1="49" y1="24" x2="54" y2="25" stroke="#fed7aa" strokeWidth="1" strokeLinecap="round" />

            {/* Cute Artist Beret or Flower for Painting! */}
            <circle cx="41" cy="11" r="3.5" fill="#f472b6" opacity="0.9" />
            <circle cx="41" cy="11" r="1.5" fill="#fef08a" />
          </svg>
        </button>

        {/* Small Progress Paws Indicator */}
        <div
          className="text-center text-[9px] font-mono text-slate-400 bg-white/80 px-1.5 py-0.5 rounded-md border border-slate-200/60 shadow-2xs mt-0.5 whitespace-nowrap"
          style={{ transform: direction === 'left' ? 'scaleX(-1)' : 'none' }}
        >
          {isWalking ? (
            <span className="text-emerald-600 font-semibold">🐾 Walking... {Math.round(scrollProgress * 100)}%</span>
          ) : (
            <span className="text-slate-500">💤 Loafing ({petCount > 0 ? `${petCount} pets` : 'click to pet'})</span>
          )}
        </div>
      </div>

      {/* Mini Controls on the bottom-right corner for mute / minimize */}
      <div className="fixed bottom-2 right-3 pointer-events-auto flex items-center gap-1.5 z-40 bg-white/80 backdrop-blur-xs px-2 py-1 rounded-full border border-slate-200 text-slate-600 text-[11px] font-mono shadow-xs">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-1 rounded-full transition-colors ${
            soundEnabled ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-600'
          }`}
          title={soundEnabled ? 'Cat sounds enabled (click to mute)' : 'Enable gentle cat purr synth'}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </button>

        <button
          onClick={handlePetCat}
          className="px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 hover:bg-pink-100 transition-all font-semibold flex items-center gap-1 text-[10px]"
          title="Pet Shreya's cat"
        >
          <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" />
          Pet
        </button>

        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 rounded-full text-slate-400 hover:text-slate-600 text-[10px]"
          title="Minimize cat"
        >
          ×
        </button>
      </div>
    </aside>
  );
};
