import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export const DummyProfileCard = ({ profile }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stands upright (0 deg) as user scrolls down from 24 deg
  const progress = Math.min(scrollY / 360, 1);
  const tiltX = 24 * (1 - progress);
  const translateY = (1 - progress) * 6;
  const shadowSpread = 8 + progress * 16;
  const shadowOpacity = 0.08 + progress * 0.12;

  return (
    <div className="relative my-8 flex flex-col items-center justify-center select-none perspective-[1000px] z-20">
      <motion.div
        style={{
          transform: `perspective(1000px) rotateX(${tiltX}deg) translateY(${translateY}px)`,
          transformOrigin: 'bottom center',
          boxShadow: `0 ${shadowSpread}px 32px -6px rgba(15, 23, 42, ${shadowOpacity}), 0 4px 12px rgba(0, 0, 0, 0.04)`,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-slate-200 p-6 text-left transition-transform duration-100 ease-out relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-1.5 rounded-full bg-slate-200 inline-block" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              DTU STUDENT ID
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            VERIFIED
          </span>
        </div>

        {/* Card Main Info */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              Shreya Diwakar
            </h3>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">
              Delhi Technological University (DTU, formerly DCE)
            </p>
            <p className="text-xs font-mono text-slate-500 mt-0.5">
              B.Tech Computer Science Engineering • 2024–28
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            SD
          </div>
        </div>

        {/* Academic Credentials (No C-DOT in Hero section) */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Roll Number</span>
            <span className="font-bold text-slate-800">24/CS/425</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Academic CGPA</span>
            <span className="font-bold text-emerald-700">8.234</span>
          </div>
        </div>

        {/* Quick Contact Line */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
          <span className="truncate">{profile.email}</span>
          <span className="text-slate-700 font-bold shrink-0">+91-8851493754</span>
        </div>

        {/* Footing accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 opacity-80" />
      </motion.div>
    </div>
  );
};
