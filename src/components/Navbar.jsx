import React, { useState } from 'react';
import { Terminal, FolderGit2, Sparkles, Send, FileText, Settings, Menu, X, Code2 } from 'lucide-react';

export const Navbar = ({ profile, onOpenResume, onOpenCustomizer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
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
      <div className="max-w-7xl mx-auto rounded-xl border border-slate-200 shadow-sm bg-white/90 backdrop-blur-md px-4 sm:px-6 h-15 flex items-center justify-between">
        {/* Brand */}
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-700">
          <button
            onClick={() => scrollTo('pillars-section')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            id="nav-journey-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Pillars
          </button>
          <button
            onClick={() => scrollTo('skills-matrix')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            id="nav-skills-btn"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-600" />
            Skills
          </button>
          <button
            onClick={() => scrollTo('experience-section')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            id="nav-experience-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Experience
          </button>
          <button
            onClick={() => scrollTo('projects-gallery')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            id="nav-projects-btn"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-slate-700" />
            Projects
          </button>
          <button
            onClick={() => scrollTo('contact-section')}
            className="px-2.5 py-1.5 rounded-lg hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            id="nav-contact-btn"
          >
            <Send className="w-3.5 h-3.5 text-purple-600" />
            Contact
          </button>
        </nav>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs hover:scale-105 transition-all flex items-center gap-1.5"
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
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 border border-slate-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-1.5 max-w-7xl mx-auto rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-lg p-3 space-y-1 text-sm font-medium text-slate-800">
          <button
            onClick={() => scrollTo('pillars-section')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            Pillars
          </button>
          <button
            onClick={() => scrollTo('skills-matrix')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-emerald-600" />
            Skills &amp; Tech
          </button>
          <button
            onClick={() => scrollTo('experience-section')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            Experience
          </button>
          <button
            onClick={() => scrollTo('projects-gallery')}
            className="w-full px-3 py-2 rounded-lg text-left hover:bg-slate-100 flex items-center gap-2"
          >
            <FolderGit2 className="w-4 h-4 text-slate-700" />
            Projects
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
