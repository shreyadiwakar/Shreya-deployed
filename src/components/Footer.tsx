import React from 'react';
import { ArrowUp, Heart, Sparkles, Terminal, Code2 } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 bg-white/90 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-800 text-sm bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              &lt;{profile.name} /&gt;
            </span>
            <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              status: 200 OK
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1.5 max-w-sm">
            Designed with light mode soft pastel tones (yellow, blue, green, pink, purple), physics repelling background elements, and scroll unfolding animations.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 shadow-2xs hover:scale-105"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-mono">
        © {new Date().getFullYear()} {profile.name} • All Systems Operational
      </div>
    </footer>
  );
};
