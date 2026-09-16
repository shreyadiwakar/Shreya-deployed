import React from 'react';
import { ArrowUp, Heart, Github, Linkedin, Mail, Phone, GraduationCap } from 'lucide-react';

export const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-200 text-slate-700 pt-12 pb-8 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-100">
          {/* Brand and Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                {profile?.name || 'Shreya Diwakar'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-3">
              Computer Science &amp; Engineering undergraduate at Delhi Technological University (DTU).
              Passionate about systems architecture, full-stack engineering, and creative technology.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
              <span>DTU CSE • Roll: 24/CS/425 (G-2)</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-6 md:justify-around">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-3">
                Sections
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <a href="#hero-section" className="hover:text-slate-900 transition-colors">
                    Hero Overview
                  </a>
                </li>
                <li>
                  <a href="#unfolding-journey" className="hover:text-slate-900 transition-colors">
                    Modular Pillars
                  </a>
                </li>
                <li>
                  <a href="#data-keyboard-section" className="hover:text-slate-900 transition-colors">
                    Interactive Keyboard
                  </a>
                </li>
                <li>
                  <a href="#skills-matrix" className="hover:text-slate-900 transition-colors">
                    Skills Matrix
                  </a>
                </li>
                <li>
                  <a href="#experience-timeline" className="hover:text-slate-900 transition-colors">
                    Experience &amp; C-DOT
                  </a>
                </li>
                <li>
                  <a href="#projects-gallery" className="hover:text-slate-900 transition-colors">
                    Featured Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-3">
                Connect
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>
                  <a
                    href={`mailto:${profile?.email || 'diwakar.shreya.2006@gmail.com'}`}
                    className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-sky-600" />
                    <span>Email</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${profile?.phone || '+918851493754'}`}
                    className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>Phone</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/shreyadiwakar"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                  >
                    <Github className="w-3 h-3 text-slate-800" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/shreya-diwakar"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
                  >
                    <Linkedin className="w-3 h-3 text-sky-600" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Back to Top CTA */}
          <div className="flex flex-col items-start md:items-end justify-between">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            >
              <ArrowUp className="w-3.5 h-3.5 text-slate-600" />
              <span>Back to Top</span>
            </button>

            <div className="mt-4 md:mt-0 text-left md:text-right">
              <span className="inline-block px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
                Delhi Technological University (DTU)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© {currentYear} {profile?.name || 'Shreya Diwakar'}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React &amp; Tailwind CSS • Crafted with
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            for Engineering &amp; Design
          </p>
        </div>
      </div>
    </footer>
  );
};
