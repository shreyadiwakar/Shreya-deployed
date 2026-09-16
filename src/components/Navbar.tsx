import React, { useState } from 'react';
import { Terminal, FolderGit2, Sparkles, Send, FileText, Settings, Menu, X, Code2, Palette, Keyboard } from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, onOpenResume, onOpenCustomizer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all px-3 sm:px-6 pt-2 pb-1">
      {/* 
        MAGNIFYING GLASS LENS STYLING:
        Convex optical rim, highlight line, subtle refractive contrast and saturation
        simulating looking through a precision optical magnifying glass.
      */}
      <div className="max-w-7xl mx-auto rounded-xl border-t border-white/95 border-b border-slate-300/80 border-x border-slate-200/70 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.03)] bg-gradient-to-r from-white/90 via-white/85 to-white/90 backdrop-contrast-[1.07] backdrop-brightness-[1.04] backdrop-saturate-[1.25] backdrop-blur-[2px] relative overflow-hidden px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Optical Glass Specular Sweep Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-36 h-24 bg-white/40 rotate-12 blur-md pointer-events-none" />

        {/* Brand with clean monogram and plain text */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group"
          id="navbar-brand-btn"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            SD
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              DTU CSE • 24/CS/425
            </span>
          </div>
        </button>

        {/* Desktop Navigation with Magnifying Hover Effect */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-700">
          <button
            onClick={() => scrollTo('unfolding-journey')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-journey-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Unfold Pillars
          </button>
          <button
            onClick={() => scrollTo('data-keyboard-section')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-keyboard-btn"
          >
            <Keyboard className="w-3.5 h-3.5 text-indigo-600" />
            Data Keyboard
          </button>
          <button
            onClick={() => scrollTo('skills-matrix')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-skills-btn"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            Skills
          </button>
          <button
            onClick={() => scrollTo('terminal-section')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-terminal-btn"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-600" />
            Terminal
          </button>
          <button
            onClick={() => scrollTo('projects-gallery')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-projects-btn"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-slate-700" />
            Projects
          </button>
          <button
            onClick={() => scrollTo('creative-art-studio')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-art-btn"
          >
            <Palette className="w-3.5 h-3.5 text-pink-600" />
            Painting Studio
          </button>
          <button
            onClick={() => scrollTo('contact-section')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-contact-btn"
          >
            <Send className="w-3.5 h-3.5 text-purple-600" />
            Contact
          </button>
        </nav>

        {/* Right Utility Actions with reduced rounds */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs hover:scale-105 transition-all flex items-center gap-1.5"
            id="nav-resume-btn"
          >
            <FileText className="w-3.5 h-3.5 text-slate-300" />
            <span>CV</span>
          </button>

          <button
            onClick={onOpenCustomizer}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
            title="Customize Profile / Settings"
            id="nav-settings-btn"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
            id="nav-mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with matching lens style */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-1.5 max-w-7xl mx-auto rounded-xl border border-slate-300 bg-white/95 backdrop-blur-md shadow-lg p-3 space-y-1 text-sm font-medium text-slate-800">
          <button
            onClick={() => scrollTo('unfolding-journey')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            Unfold Pillars
          </button>
          <button
            onClick={() => scrollTo('data-keyboard-section')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Keyboard className="w-4 h-4 text-indigo-600" />
            Data Keyboard
          </button>
          <button
            onClick={() => scrollTo('skills-matrix')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-emerald-600" />
            Skills &amp; Tech
          </button>
          <button
            onClick={() => scrollTo('terminal-section')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-amber-600" />
            Terminal Playground
          </button>
          <button
            onClick={() => scrollTo('projects-gallery')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4 text-slate-700" />
            Projects
          </button>
          <button
            onClick={() => scrollTo('creative-art-studio')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-pink-600" />
            Painting Corner
          </button>
          <button
            onClick={() => scrollTo('contact-section')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-purple-600" />
            Contact
          </button>
        </div>
      )}
    </header>
  );
};
