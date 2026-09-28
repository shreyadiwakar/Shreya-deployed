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
              style={{
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.16) 100%)',
                boxShadow: '0 12px 36px 0 rgba(31, 38, 135, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
              }}
              className="rounded-3xl border border-white/60 p-6 sm:p-7 transition-colors duration-200 flex flex-col justify-between overflow-hidden h-full"
            >
              {/* Top Content Area */}
              <div>
                {/* Header: Title */}
                <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-white/40">
                  <span className="text-slate-400 text-lg leading-none select-none">•</span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Descriptive Bullets */}
                <ul className="space-y-2.5 font-body text-slate-700 text-xs sm:text-sm leading-relaxed mb-4">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-sky-600 text-base leading-none select-none mt-0.5 shrink-0">◦</span>
                      <span className="break-words">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Stylish Technologies Used Section */}
                <div className="mt-4 pt-3.5 border-t border-white/40">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Code2 className="w-3.5 h-3.5 text-sky-600" />
                    <span className="text-xs font-semibold text-slate-800 font-body">
                      Technologies used:
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-mono font-medium border border-white/60 text-slate-800 bg-white/45 hover:bg-white/65 shadow-2xs backdrop-blur-md transition-colors select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Pinned Footer: GitHub Button */}
              <div className="mt-auto pt-5 border-t border-white/40 flex items-center justify-between">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-white/60 hover:bg-white/80 px-3.5 py-1.5 rounded-xl border border-white/70 shadow-2xs backdrop-blur-md transition-colors cursor-pointer"
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
