import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { ExperienceItem } from '../types';
import { achievements } from '../data/portfolioData';

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  const getAccent = (accent: ExperienceItem['accent']) => {
    switch (accent) {
      case 'yellow':
        return 'border-amber-300 bg-amber-50/70 text-amber-900';
      case 'green':
        return 'border-emerald-300 bg-emerald-50/70 text-emerald-900';
      case 'pink':
        return 'border-pink-300 bg-pink-50/70 text-pink-900';
      case 'purple':
        return 'border-purple-300 bg-purple-50/70 text-purple-900';
      case 'blue':
      default:
        return 'border-sky-300 bg-sky-50/70 text-sky-900';
    }
  };

  return (
    <section id="experience-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold uppercase tracking-wider mb-3">
          <Briefcase className="w-3.5 h-3.5 text-purple-600" />
          Milestones & Experience
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Practical <span className="text-purple-600">Impact</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Work history, open-source maintainership, and recognized honors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Left Column: Work Experience */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-sky-600" />
            Industry & Open Source Roles
          </h3>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-9">
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-sky-400" />

                <div className={`p-6 rounded-3xl border-2 ${getAccent(exp.accent)} shadow-xs hover:shadow-sm transition-all`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/90 text-slate-700 border border-slate-200 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mt-1 flex items-center gap-2">
                    <span className="text-slate-900">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500 font-normal">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Achievements & Honors */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amber-500" />
            Honors & Achievements
          </h3>

          <div className="space-y-4">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">{item.title}</h4>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{item.org}</p>
                  </div>
                  <span className="p-2 rounded-xl bg-amber-100/60 text-amber-700">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
