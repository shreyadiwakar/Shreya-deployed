import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const ProjectsSection = () => {
  const projectsList = [
    {
      id: 'revive-recycling-platform',
      title: 'ReVive - Turn Waste into Worth',
      accentColor: 'green',
      githubUrl: 'https://github.com/shreyadiwakar/ReVive',
      bullets: [
        'Developed a full-stack platform connecting residents, delivery partners, and recycling centers to simplify recycling through pickup scheduling, waste verification, and rewards.',
        'Deployed on AWS, using Lambda, API Gateway, DynamoDB, and Cognito for serverless APIs, data management, and secure authentication.',
      ],
      technologies: [
        'React.js',
        'Vite',
        'Tailwind CSS',
        'Node.js',
        'TypeScript',
        'AWS Lambda',
        'API Gateway',
        'DynamoDB',
        'AWS Cognito',
        'AWS SAM',
        'Supabase',
        'Vercel',
        'Leaflet',
        'Docker',
      ],
    },
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
        'A console-based E-Learning System built in C++, demonstrating various Object-Oriented Programming concepts. Students can register, take quizzes, submit assignments, and track progress - while instructors can create courses, manage quizzes, and grade submissions.',
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


  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector('[data-project-card]');
      const cardWidth = card ? card.getBoundingClientRect().width : 360;
      const scrollAmount = cardWidth + 24; // card width + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="projects-gallery" className="relative py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 scroll-mt-28">
      {/* Section Heading & Scroll Navigation Controls */}
      <div className="relative flex items-center justify-center mb-12 sm:mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-center">
          Things I have <span className="text-sky-600">built.</span>
        </h2>

        {/* Scroll Arrow Controls */}
        <div className="hidden sm:flex items-center gap-2 absolute right-0">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border border-slate-300/80 bg-white/80 backdrop-blur-md flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'text-slate-800 hover:bg-white hover:shadow-md cursor-pointer hover:scale-105 active:scale-95'
                : 'text-slate-300 opacity-40 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border border-slate-300/80 bg-white/80 backdrop-blur-md flex items-center justify-center transition-all ${
              canScrollRight
                ? 'text-slate-800 hover:bg-white hover:shadow-md cursor-pointer hover:scale-105 active:scale-95'
                : 'text-slate-300 opacity-40 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row with Margin Bounds */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollState}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {projectsList.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              data-project-card
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
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
                boxShadow: '0 12px 24px rgba(15, 23, 42, 0.06)',
              }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start rounded-3xl border-[2px] border-[#a9988c] p-6 sm:p-7 transition-colors duration-200 flex flex-col justify-between overflow-hidden"
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
