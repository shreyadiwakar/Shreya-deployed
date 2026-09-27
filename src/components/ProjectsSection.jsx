import React from 'react';
import { motion } from 'motion/react';
import { Github, Code2 } from 'lucide-react';

export const ProjectsSection = () => {
  const projectsList = [
    {
      id: 'social-media-app',
      title: 'Social Media Web App',
      accentColor: 'pink',
      githubUrl: 'https://github.com/shreyadiwakar/Social-Media-App',
      bullets: [
        'Developed a full-stack Social Media Application where users can create profiles, share posts, like, comment, change personal information and follow other users.',
      ],
      technologies: [
        'React.js',
        'SCSS / CSS',
        'Context API',
        'Node.js',
        'Express.js',
        'MySQL',
        'bcryptjs',
        'Responsive Design',
      ],
    },
    {
      id: 'elearning-platform-cpp',
      title: 'E-Learning System',
      accentColor: 'purple',
      githubUrl: 'https://github.com/shreyadiwakar/E-Learning-System',
      bullets: [
        'A console-based E-Learning System built in C++, demonstrating various Object-Oriented Programming concepts. Students can register, take quizzes, submit assignments, and track progress — while instructors can create courses, manage quizzes, and grade submissions.',
      ],
      technologies: ['C++', 'STL', 'OOP', 'File Handling'],
    },
    {
      id: 'employee-record-management',
      title: 'Employee Record management system',
      accentColor: 'blue',
      githubUrl: 'https://github.com/shreyadiwakar/Employee-Record-Management-System',
      bullets: [
        'A full-stack Employee Management Web Application that allows users to perform CRUD operations (Create, Read, Update, Delete) on employee records.',
      ],
      technologies: ['React (Vite)', 'Bootstrap', 'Node.js', 'Express.js', 'MySQL'],
    },
  ];

  // Project cards styled in the exact warm neutral/taupe tone of the Hero section as attached in image (#e2dcd5 / #ded7cf)
  const heroCardTheme = {
    cardBg: 'bg-[#e2dcd5]/95 hover:bg-[#ded7cf]',
    border: 'border-[#ccc4b8] hover:border-[#bbb2a5]',
    bulletColor: 'text-neutral-700',
    techChip: 'border-[#ccc4b8] text-neutral-800 bg-white/90 hover:bg-white hover:border-[#b8b0a5]',
  };

  return (
    <section id="projects-gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Things I have <span className="text-sky-600">built.</span>
        </h2>
      </div>

      {/* Side-by-Side Boxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {projectsList.map((item, index) => {
          const theme = heroCardTheme;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.1,
                ease: 'easeOut',
              }}
              className={`group relative rounded-2xl border ${theme.border} ${theme.cardBg} p-6 sm:p-7 shadow-xs transition-colors duration-200 flex flex-col justify-between overflow-hidden h-full`}
            >
              {/* Top Content Area */}
              <div>
                {/* Header: Title */}
                <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-slate-200/70">
                  <span className="text-slate-400 text-lg leading-none select-none">•</span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Descriptive Bullets */}
                <ul className="space-y-2.5 font-body text-slate-700 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className={`${theme.bulletColor} text-base leading-none select-none mt-0.5 shrink-0`}>◦</span>
                      <span className="break-words">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Stylish Technologies Used Section */}
                <div className="mt-4 pt-3.5 border-t border-slate-200/70">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Code2 className={`w-3.5 h-3.5 ${theme.bulletColor}`} />
                    <span className="text-xs font-semibold text-slate-800 font-body">
                      Technologies used:
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium border shadow-2xs transition-colors select-none ${theme.techChip}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Pinned Footer: GitHub Button */}
              <div className="mt-auto pt-5 border-t border-slate-200/70 flex items-center justify-between">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-white/90 hover:bg-white px-3 py-1.5 rounded-lg border border-[#ccc4b8] shadow-2xs transition-colors cursor-pointer"
                  title={`View ${item.title} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5 text-slate-900" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
