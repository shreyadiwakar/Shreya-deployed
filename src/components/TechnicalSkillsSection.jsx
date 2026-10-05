import React from 'react';
import { motion } from 'motion/react';
import { Code2, Code, Wrench, Cpu } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const TechnicalSkillsSection = () => {
  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      badgeBg: 'bg-rose-200/50 text-rose-700 border border-white/70',
      chipStyle: 'text-rose-950 bg-rose-200/40 hover:bg-rose-200/60',
      icon: Code2,
      skills: ['C', 'C++', 'JavaScript', 'Python'],
    },
    {
      id: 'development',
      title: 'Development',
      badgeBg: 'bg-amber-200/50 text-amber-700 border border-white/70',
      chipStyle: 'text-amber-950 bg-amber-200/40 hover:bg-amber-200/60',
      icon: Code,
      skills: ['HTML', 'CSS', 'React.js', 'Node.js', 'REST APIs', 'SQL (MySQL)', 'MongoDB'],
    },
    {
      id: 'tools',
      title: 'Tools',
      badgeBg: 'bg-emerald-200/50 text-emerald-700 border border-white/70',
      chipStyle: 'text-emerald-950 bg-emerald-200/40 hover:bg-emerald-200/60',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'Docker', 'Playwright', 'Test Automation', 'Docker Compose', 'Figma'],
    },
    {
      id: 'core-cs',
      title: 'Core CS',
      badgeBg: 'bg-purple-200/50 text-purple-700 border border-white/70',
      chipStyle: 'text-purple-950 bg-purple-200/40 hover:bg-purple-200/60',
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

      {/* 4 Frosted Blurred Glass Category Cards matching Reference Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon;

          return (
            <RevealOnScroll key={category.id} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                style={{
                  backdropFilter: 'blur(28px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.68) 100%)',
                  boxShadow: '0 12px 36px 0 rgba(31, 38, 135, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.55)',
                }}
                className="rounded-3xl border border-white/80 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)] flex flex-col justify-start h-full"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/40">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs backdrop-blur-md ${category.badgeBg}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Frosted Glass Pill Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded-xl text-xs font-mono font-medium border border-white/60 shadow-2xs backdrop-blur-md transition-colors select-none ${category.chipStyle}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
};
