import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Sparkles, Palette, Code, CheckCircle2 } from 'lucide-react';
import { ProfileData } from '../types';

interface CartoonGirlBoardProps {
  profile: ProfileData;
}

export const CartoonGirlBoard: React.FC<CartoonGirlBoardProps> = ({ profile }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [speechBubbleText, setSpeechBubbleText] = useState('Welcome to my portfolio! 👋');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle scroll tilt and perspective so the character & board "stand" upright with depth
  const heroProgress = Math.min(scrollY / 600, 1);
  const boardTilt = -4 + heroProgress * 6; // gentle tilt adjustment
  const boardLift = heroProgress * -20; // standing anchor displacement

  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-center gap-6 my-6 max-w-2xl mx-auto z-20 select-none"
      onMouseEnter={() => {
        setIsHovered(true);
        setSpeechBubbleText('DTU CSE ‘28 • Compiler & Fine Art');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpeechBubbleText('Welcome to my portfolio! 👋');
      }}
    >
      {/* Cartoon Girl Vector Character */}
      <div className="relative flex flex-col items-center">
        {/* Interactive Speech Bubble */}
        <motion.div
          animate={{
            y: isHovered ? -4 : [0, -4, 0],
            opacity: 1,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
            scale: { duration: 0.2 },
          }}
          className="absolute -top-12 z-30 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-md text-xs font-medium text-slate-800 whitespace-nowrap flex items-center gap-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{speechBubbleText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45" />
        </motion.div>

        {/* Clean SVG Vector Cartoon Girl Illustration */}
        <div className="relative w-36 h-52 sm:w-40 sm:h-56">
          <svg
            viewBox="0 0 160 220"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Shadow on floor */}
            <ellipse cx="80" cy="214" rx="42" ry="6" fill="#cbd5e1" opacity="0.6" />

            {/* Legs and Shoes */}
            <rect x="66" y="152" width="10" height="52" rx="4" fill="#334155" />
            <rect x="84" y="152" width="10" height="52" rx="4" fill="#334155" />
            {/* Shoes */}
            <ellipse cx="68" cy="206" rx="8" ry="4.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
            <ellipse cx="92" cy="206" rx="8" ry="4.5" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Pleated Skirt / Trousers */}
            <path
              d="M58 138 L102 138 L108 160 L52 160 Z"
              fill="#475569"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Torso: Collegiate Sweater & DTU Lanyard */}
            <rect x="54" y="88" width="52" height="54" rx="8" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />
            {/* Collar */}
            <path d="M70 88 L80 102 L90 88" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="#ffffff" />
            {/* DTU Lanyard ribbon */}
            <path d="M72 88 L78 120 L82 120 L88 88" stroke="#0ea5e9" strokeWidth="2.5" fill="none" />
            {/* Lanyard Card ID */}
            <rect x="74" y="120" width="12" height="16" rx="2" fill="#ffffff" stroke="#0ea5e9" strokeWidth="1.2" />
            <rect x="76" y="123" width="8" height="2" fill="#0284c7" />
            <rect x="76" y="127" width="8" height="6" rx="1" fill="#bae6fd" />

            {/* Left Arm: Resting naturally */}
            <path
              d="M54 94 C44 110 44 130 52 144"
              stroke="#fbcfe8"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="52" cy="146" r="5" fill="#fde68a" />

            {/* Right Arm: Pointing towards the standing board */}
            <path
              d="M106 94 C120 108 128 116 138 112"
              stroke="#fbcfe8"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <circle cx="140" cy="112" r="5" fill="#fde68a" />

            {/* Neck */}
            <rect x="74" y="74" width="12" height="16" rx="3" fill="#fed7aa" />

            {/* Head / Face */}
            <ellipse cx="80" cy="56" rx="22" ry="24" fill="#fed7aa" />

            {/* Hair Back */}
            <path
              d="M55 58 C50 82 52 110 56 122 C64 118 68 85 64 62 Z"
              fill="#292524"
            />
            <path
              d="M105 58 C110 82 108 110 104 122 C96 118 92 85 96 62 Z"
              fill="#292524"
            />

            {/* Hair Front Bangs */}
            <path
              d="M56 46 C64 30 96 30 104 46 C98 42 90 40 80 44 C70 40 62 42 56 46 Z"
              fill="#292524"
            />
            <path
              d="M58 46 Q70 54 80 46 Q90 54 102 46 Q100 62 104 70 C98 64 96 52 92 52 C88 52 86 60 80 50 C74 60 72 52 68 52 C64 52 62 64 56 70 Z"
              fill="#292524"
            />

            {/* Eyes */}
            <ellipse cx="72" cy="56" rx="3" ry="4" fill="#1e293b" />
            <circle cx="73" cy="54.5" r="1.2" fill="#ffffff" />
            <ellipse cx="88" cy="56" rx="3" ry="4" fill="#1e293b" />
            <circle cx="89" cy="54.5" r="1.2" fill="#ffffff" />

            {/* Eyebrows */}
            <path d="M68 49 Q72 47 76 49" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M84 49 Q88 47 92 49" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Gentle Smile */}
            <path d="M76 66 Q80 70 84 66" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Soft Blush on Cheeks */}
            <ellipse cx="67" cy="62" rx="4" ry="2" fill="#fda4af" opacity="0.75" />
            <ellipse cx="93" cy="62" rx="4" ry="2" fill="#fda4af" opacity="0.75" />

            {/* Stylized Round Glasses */}
            <circle cx="72" cy="56" r="7.5" stroke="#475569" strokeWidth="1.6" fill="none" />
            <circle cx="88" cy="56" r="7.5" stroke="#475569" strokeWidth="1.6" fill="none" />
            <path d="M79.5 56 L80.5 56" stroke="#475569" strokeWidth="1.8" />
            <path d="M64.5 56 L60 54" stroke="#475569" strokeWidth="1.4" />
            <path d="M95.5 56 L100 54" stroke="#475569" strokeWidth="1.4" />

            {/* Paintbrush in Hair / Accessory */}
            <path d="M96 34 L108 22" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M108 22 L112 18" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Standing Presentation Board (anchored upright with perspective tilt) */}
      <motion.div
        style={{
          transform: `perspective(900px) rotateY(${boardTilt}deg) translateY(${boardLift}px)`,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-full max-w-sm sm:max-w-md bg-white/95 rounded-xl border border-slate-300/80 shadow-md p-5 text-left relative overflow-hidden backdrop-blur-xs"
      >
        {/* Top Board Frame Clips */}
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 ml-1">
              DTU CSE • LAB BOARD
            </span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
            24/CS/425 • G-2
          </span>
        </div>

        {/* Board Body */}
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Shreya Diwakar</span>
                <span className="text-xs font-normal text-slate-500 font-mono">B.Tech ‘28</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Delhi Technological University (DTU)
              </p>
            </div>
            <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>

          {/* Academic & Creative Pillars on the Board */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2 rounded-lg bg-purple-50/80 border border-purple-200/80 text-xs">
              <div className="font-mono font-bold text-purple-900 flex items-center gap-1">
                <Code className="w-3 h-3 text-purple-600" />
                CS 301 Compilers
              </div>
              <p className="text-[11px] text-purple-800 mt-0.5 font-mono">
                NFA to DFA Subset &amp; LEX
              </p>
            </div>

            <div className="p-2 rounded-lg bg-pink-50/80 border border-pink-200/80 text-xs">
              <div className="font-mono font-bold text-pink-900 flex items-center gap-1">
                <Palette className="w-3 h-3 text-pink-600" />
                Painting Studio
              </div>
              <p className="text-[11px] text-pink-800 mt-0.5">
                Pastel &amp; Watercolor Art
              </p>
            </div>
          </div>

          {/* Mini Status Quote */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              Standing Anchored
            </span>
            <span>Scrolls with hero</span>
          </div>
        </div>

        {/* Board Standing Easel Legs */}
        <div className="absolute -bottom-4 left-6 w-2 h-4 bg-amber-700/80 rounded-b-xs" />
        <div className="absolute -bottom-4 right-6 w-2 h-4 bg-amber-700/80 rounded-b-xs" />
      </motion.div>
    </div>
  );
};
