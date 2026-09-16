import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, ZoomIn, Sparkles, Filter, Code2, ArrowUpRight } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const categories = ['All', 'Full-Stack', 'Systems & C++', 'Web Application'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const getSoftTheme = (accent) => {
    switch (accent) {
      case 'yellow':
        return {
          cardBg: 'bg-amber-50/90 hover:bg-amber-50',
          border: 'border-amber-200/90 hover:border-amber-300',
          badge: 'bg-amber-100 text-amber-900 border-amber-200',
          zoomBtn: 'hover:bg-amber-200/80 text-amber-900',
          iconColor: 'text-amber-600',
        };
      case 'blue':
        return {
          cardBg: 'bg-sky-50/90 hover:bg-sky-50',
          border: 'border-sky-200/90 hover:border-sky-300',
          badge: 'bg-sky-100 text-sky-900 border-sky-200',
          zoomBtn: 'hover:bg-sky-200/80 text-sky-900',
          iconColor: 'text-sky-600',
        };
      case 'green':
        return {
          cardBg: 'bg-emerald-50/90 hover:bg-emerald-50',
          border: 'border-emerald-200/90 hover:border-emerald-300',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          zoomBtn: 'hover:bg-emerald-200/80 text-emerald-900',
          iconColor: 'text-emerald-600',
        };
      case 'purple':
        return {
          cardBg: 'bg-purple-50/90 hover:bg-purple-50',
          border: 'border-purple-200/90 hover:border-purple-300',
          badge: 'bg-purple-100 text-purple-900 border-purple-200',
          zoomBtn: 'hover:bg-purple-200/80 text-purple-900',
          iconColor: 'text-purple-600',
        };
      case 'pink':
      default:
        return {
          cardBg: 'bg-pink-50/90 hover:bg-pink-50',
          border: 'border-pink-200/90 hover:border-pink-300',
          badge: 'bg-pink-100 text-pink-900 border-pink-200',
          zoomBtn: 'hover:bg-pink-200/80 text-pink-900',
          iconColor: 'text-pink-600',
        };
    }
  };

  return (
    <section id="projects-gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          Zoom-On-Scroll Showcase
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Featured <span className="text-pink-600">Projects</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          As you scroll down, each project card zooms smoothly into perspective with architectural breakdowns and live links.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              {cat === 'All' && <Filter className="w-3.5 h-3.5 text-slate-400" />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects with Scroll Zoom Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const theme = getSoftTheme(project.accentColor);

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.85, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
                scale: 1.015,
                transition: { duration: 0.15 },
              }}
              className={`group relative rounded-xl border ${theme.border} ${theme.cardBg} p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden`}
            >
              {/* Header Details */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold font-mono text-slate-700 uppercase tracking-wide">
                    {project.category}
                  </span>
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className={`p-1.5 rounded-lg bg-white/80 border border-slate-200/80 transition-colors flex items-center gap-1 text-xs font-medium text-slate-700 ${theme.zoomBtn}`}
                    title="Zoom in to inspect details"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom In</span>
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover:text-slate-950 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics Text */}
                {project.metrics && (
                  <p className="mt-3 text-xs font-mono text-slate-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{project.metrics}</span>
                  </p>
                )}
              </div>

              {/* Bottom Footer: Tech Chips & Actions */}
              <div className="mt-5 pt-4 border-t border-slate-200/70">
                <p className="text-xs font-mono text-slate-600 mb-3.5 leading-relaxed">
                  {project.techStack.join(' • ')}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </a>

                  <button
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs transition-all group-hover:bg-slate-900 group-hover:text-white"
                  >
                    <span>Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Zoom Detail Modal */}
      {activeProjectModal && (
        <ProjectDetailModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
};
