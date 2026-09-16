import React, { useState } from 'react';
import { Code, Layout, Server, Wrench, CheckCircle2, Sparkles } from 'lucide-react';
import { SkillCategory } from '../types';

interface SkillsMatrixProps {
  skillCategories: SkillCategory[];
}

export const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ skillCategories }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getTabStyles = (accent: SkillCategory['accent']) => {
    switch (accent) {
      case 'yellow':
        return {
          pill: 'bg-amber-100 text-amber-900 border-amber-300',
          bar: 'bg-amber-400',
          card: 'bg-amber-50/70 border-amber-200/90',
        };
      case 'blue':
        return {
          pill: 'bg-sky-100 text-sky-900 border-sky-300',
          bar: 'bg-sky-400',
          card: 'bg-sky-50/70 border-sky-200/90',
        };
      case 'green':
        return {
          pill: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          bar: 'bg-emerald-400',
          card: 'bg-emerald-50/70 border-emerald-200/90',
        };
      case 'purple':
        return {
          pill: 'bg-purple-100 text-purple-900 border-purple-300',
          bar: 'bg-purple-400',
          card: 'bg-purple-50/70 border-purple-200/90',
        };
      case 'pink':
      default:
        return {
          pill: 'bg-pink-100 text-pink-900 border-pink-300',
          bar: 'bg-pink-400',
          card: 'bg-pink-50/70 border-pink-200/90',
        };
    }
  };

  const getIcon = (title: string) => {
    if (title.includes('Language')) return <Code className="w-4 h-4" />;
    if (title.includes('Frontend')) return <Layout className="w-4 h-4" />;
    if (title.includes('Backend')) return <Server className="w-4 h-4" />;
    return <Wrench className="w-4 h-4" />;
  };

  const currentCategory = skillCategories[activeTab] || skillCategories[0];
  const styles = getTabStyles(currentCategory.accent);

  return (
    <section id="skills-matrix" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Technical Fluency
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Skills & <span className="text-emerald-600">Technologies</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Core proficiencies built through hands-on project architectures, algorithm benchmarking, and open-source contributions.
        </p>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {skillCategories.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                activeTab === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {getIcon(cat.title)}
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Grid */}
      <div className={`p-5 sm:p-7 rounded-xl border ${styles.card} max-w-4xl mx-auto transition-all`}>
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg border ${styles.pill}`}>
              {getIcon(currentCategory.title)}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{currentCategory.title}</h3>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
            {currentCategory.skills.length} core proficiencies
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentCategory.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-3 bg-white/95 rounded-lg border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {skill.name}
                </span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${styles.bar}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
