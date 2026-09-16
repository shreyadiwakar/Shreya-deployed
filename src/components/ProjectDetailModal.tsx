import React from 'react';
import { X, ExternalLink, Github, CheckCircle, Cpu, Zap, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const getAccentStyles = (accent: Project['accentColor']) => {
    switch (accent) {
      case 'yellow':
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
          border: 'border-amber-200',
          bg: 'from-amber-50 to-white',
          btn: 'bg-amber-500 hover:bg-amber-600 text-white',
        };
      case 'blue':
        return {
          badge: 'bg-sky-100 text-sky-900 border-sky-300',
          border: 'border-sky-200',
          bg: 'from-sky-50 to-white',
          btn: 'bg-sky-500 hover:bg-sky-600 text-white',
        };
      case 'green':
        return {
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          border: 'border-emerald-200',
          bg: 'from-emerald-50 to-white',
          btn: 'bg-emerald-500 hover:bg-emerald-600 text-white',
        };
      case 'purple':
        return {
          badge: 'bg-purple-100 text-purple-900 border-purple-300',
          border: 'border-purple-200',
          bg: 'from-purple-50 to-white',
          btn: 'bg-purple-500 hover:bg-purple-600 text-white',
        };
      case 'pink':
      default:
        return {
          badge: 'bg-pink-100 text-pink-900 border-pink-300',
          border: 'border-pink-200',
          bg: 'from-pink-50 to-white',
          btn: 'bg-pink-500 hover:bg-pink-600 text-white',
        };
    }
  };

  const styles = getAccentStyles(project.accentColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border-2 ${styles.border} shadow-2xl p-6 sm:p-8 bg-gradient-to-b ${styles.bg}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white border border-slate-200 transition-colors"
          aria-label="Close Project Detail Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${styles.badge}`}>
            {project.category}
          </span>
          {project.metrics && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              {project.metrics}
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          {project.tagline}
        </p>

        {/* Deep Dive Description */}
        <div className="mt-6 space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Architecture Highlights */}
        {project.architectureHighlights && project.architectureHighlights.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xs">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-500" />
              Architectural & Engineering Solves
            </h4>
            <ul className="space-y-2">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="mt-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
            Technologies & Frameworks
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white text-slate-800 border border-slate-200 shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            View GitHub Repository
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-xs ${styles.btn}`}
            >
              <span>Launch Live Preview</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
