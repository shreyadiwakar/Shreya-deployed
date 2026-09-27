import React from 'react';
import { motion } from 'motion/react';
import { Code2, Code, Wrench, Cpu } from 'lucide-react';

export const TechnicalSkillsSection = () => {
  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      badgeBg: 'bg-rose-100/90 text-rose-600 border border-rose-200/70',
      border: 'border-white/70 hover:border-rose-300/80',
      cardBg: 'bg-white/40 hover:bg-white/55',
      chipStyle: 'border-rose-200/80 text-rose-950 bg-rose-100/40 hover:bg-rose-100/75 hover:border-rose-300 shadow-2xs',
      icon: Code2,
      skills: ['C', 'C++', 'JavaScript', 'Python'],
    },
    {
      id: 'development',
      title: 'Development',
      badgeBg: 'bg-amber-100/90 text-amber-600 border border-amber-200/70',
      border: 'border-white/70 hover:border-amber-300/80',
      cardBg: 'bg-white/40 hover:bg-white/55',
      chipStyle: 'border-amber-200/80 text-amber-950 bg-amber-100/40 hover:bg-amber-100/75 hover:border-amber-300 shadow-2xs',
      icon: Code,
      skills: ['HTML', 'CSS', 'React.js', 'Node.js', 'REST APIs', 'SQL (MySQL)', 'MongoDB'],
    },
    {
      id: 'tools',
      title: 'Tools',
      badgeBg: 'bg-emerald-100/90 text-emerald-600 border border-emerald-200/70',
      border: 'border-white/70 hover:border-emerald-300/80',
      cardBg: 'bg-white/40 hover:bg-white/55',
      chipStyle: 'border-emerald-200/80 text-emerald-950 bg-emerald-100/40 hover:bg-emerald-100/75 hover:border-emerald-300 shadow-2xs',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'Docker', 'Playwright', 'Test Automation', 'Docker Compose', 'Figma'],
    },
    {
      id: 'core-cs',
      title: 'Core CS',
      badgeBg: 'bg-purple-100/90 text-purple-600 border border-purple-200/70',
      border: 'border-white/70 hover:border-purple-300/80',
      cardBg: 'bg-white/40 hover:bg-white/55',
      chipStyle: 'border-purple-200/80 text-purple-950 bg-purple-100/40 hover:bg-purple-100/75 hover:border-purple-300 shadow-2xs',
      icon: Cpu,
      skills: [
        'Object-Oriented Programming (OOP)',
        'DSA',
        'Operating Systems',
        'DBMS',
        'Computer Networks',
        'Software Engineering',
        'Computer Architecture',
      ],
    },
  ];

  return (
    <section id="skills-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          My technical <span className="text-sky-600">skills</span>
        </h2>
      </div>

      {/* 4 Frosted Blurred Glass Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              style={{
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              }}
              className={`rounded-2xl sm:rounded-3xl border ${category.border} ${category.cardBg} p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] transition-colors duration-200 flex flex-col justify-start`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200/40">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${category.badgeBg}`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Tinted Translucent Skill Badges */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border shadow-2xs transition-colors select-none ${category.chipStyle}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
