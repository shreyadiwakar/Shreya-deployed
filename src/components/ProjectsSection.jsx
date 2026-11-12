import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Github, Code2, ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const projectsList = [
    {
      id: 'revive-recycling-platform',
      title: 'ReVive - Turn Waste into Worth',
      category: 'Full-Stack / Cloud',
      date: 'October 2026',
      accentColor: 'green',
      githubUrl: 'https://github.com/shreyadiwakar/ReVive',
      liveUrl: 'https://main.d1cvotnz34cia5.amplifyapp.com/',
      description: 'A web platform that helps residents, drivers, and recycling centers work together to collect and recycle waste easily.',
      longDescription: 'ReVive is a web app designed to make recycling simple. Residents can schedule garbage pickups from home, delivery partners can collect and verify the waste, and recycling centers can process it. Users also earn rewards whenever they recycle.',
      architectureHighlights: [
        'Separate dashboards and logins for residents, delivery drivers, and recycling centers',
        'Built with AWS serverless services (Lambda, API Gateway, DynamoDB, Cognito) for fast and reliable performance',
        'Easy pickup scheduling with reward points to encourage more recycling',
        'Interactive maps using Leaflet to help drivers easily find pickup locations',
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
      id: 'drishart-virtual-art-gallery',
      title: 'DrishArt: A Virtual Art Gallery',
      category: '3D & WebGL',
      date: 'May 2026',
      accentColor: 'purple',
      githubUrl: 'https://github.com/shreyadiwakar/DrishArt.git',
      liveUrl: 'https://drishart.vercel.app/',
      description: 'A 3D virtual art gallery where visitors can walk around, explore original artworks in an exhibition room, and send enquiries.',
      longDescription: 'DrishArt is a virtual museum I created to share my passion for art. Visitors can walk around the 3D gallery just like a real museum, view each artwork under realistic gallery spotlights, and send messages or purchase enquiries through a contact form.',
      architectureHighlights: [
        'Built a 3D gallery using Three.js and WebGL with realistic lighting, shadows, and canvas textures',
        'First-person controls that let visitors walk through the rooms using keyboard and mouse',
        'Built-in enquiry form using Web3Forms so visitors can message the artist directly',
        'Fast loading with CDN-hosted 3D libraries and deployed live on Vercel',
      ],
      technologies: [
        'HTML5',
        'CSS3',
        'Vanilla JavaScript',
        'Three.js (r128)',
        'WebGL',
        'Web3Forms API',
      ],
    },
    {
      id: 'social-media-app',
      title: 'Social Media Web App',
      category: 'Full-Stack',
      date: 'April 2026',
      accentColor: 'pink',
      githubUrl: 'https://github.com/shreyadiwakar/Social-Media-App',
      liveUrl: '',
      description: 'A full-stack social media website where users can create profiles, share posts, like, comment, and follow friends.',
      longDescription: 'A modern social media web app where users can create personal profiles, publish posts, like and comment on friends’ content, and follow other people. Built with React and Node.js with a clean design that works on phones, tablets, and laptops.',
      architectureHighlights: [
        'Live home feed for creating posts, adding comments, liking pictures, and updating profiles',
        'Secure user accounts with encrypted passwords using bcryptjs',
        'Relational MySQL database to connect users, followers, posts, and comments cleanly',
        'Fast state management with React Context API and fully responsive layouts',
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
      category: 'Systems & C++',
      date: 'Nov 2025',
      accentColor: 'purple',
      githubUrl: 'https://github.com/shreyadiwakar/E-Learning-System',
      liveUrl: '',
      description: 'A terminal-based learning system in C++ with separate portals for students to take quizzes and teachers to grade work.',
      longDescription: 'A console application written in modern C++ that manages an online school. Students can sign up, join courses, take timed quizzes, and track their grades, while instructors can create courses, post assignments, and grade student submissions.',
      architectureHighlights: [
        'Student portal for easy registration, course enrollment, timed quizzes, and grade viewing',
        'Instructor portal to publish new lessons, design quizzes, and grade homework',
        'File storage system in C++ to save student records, courses, and marks safely on the computer',
        'Organized with clean object-oriented programming (OOP) classes and C++ STL data structures',
      ],
      technologies: ['C++', 'STL', 'OOP', 'File Handling', 'CLI Architecture'],
    },
    {
      id: 'employee-record-management',
      title: 'Employee Record management system',
      category: 'Web Application',
      date: 'March 2026',
      accentColor: 'blue',
      githubUrl: 'https://github.com/shreyadiwakar/Employee-Record-Management-System',
      liveUrl: '',
      description: 'A web dashboard for office administrators to easily add, view, search, edit, and delete employee records.',
      longDescription: 'A full-stack employee management dashboard that helps companies manage staff records in one place. Admins can quickly search employees, add new team members, edit existing details, and remove records with immediate updates.',
      architectureHighlights: [
        'Complete record management to add, view, edit, and delete employee records',
        'Fast and responsive table layout made with React, Vite, and Bootstrap',
        'Node.js and Express backend REST API with clear input checks',
        'Pop-up edit windows with instant table updates without needing page refreshes',
      ],
      technologies: ['React (Vite)', 'Bootstrap', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
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
      setTimeout(checkScrollState, 350);
    }
  };

  return (
    <section id="projects-gallery" className="relative py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 scroll-mt-28">
      {/* Section Heading (Centered) */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Things I have <span className="text-sky-600">built.</span>
        </h2>
      </div>

      {/* Carousel Wrapper with Flanking Floating Arrow Buttons on Sides */}
      <div className="relative">
        {/* Left Floating Arrow Button */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="flex absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[2px] border-[#a9988c] bg-[#FAF7F0] hover:bg-white text-neutral-800 shadow-[0_6px_18px_rgba(45,41,38,0.15)] items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none backdrop-blur-md"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-800" />
        </button>

        {/* Right Floating Arrow Button */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="flex absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[2px] border-[#a9988c] bg-[#FAF7F0] hover:bg-white text-neutral-800 shadow-[0_6px_18px_rgba(45,41,38,0.15)] items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-20 disabled:pointer-events-none backdrop-blur-md"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-800" />
        </button>

        {/* Horizontal Scrollable Row with Margin Bounds */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollState}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#a9988c transparent',
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
              onClick={() => setSelectedProject(item)}
              style={{
                backdropFilter: 'blur(28px) saturate(190%)',
                WebkitBackdropFilter: 'blur(28px) saturate(190%)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.72) 100%)',
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
              }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start rounded-3xl border-[2px] border-[#a9988c] hover:border-sky-500/80 p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1"
            >
              {/* Top Content Area */}
              <div>
                {/* Header: Title + Expand Cue */}
                <div className="flex items-start justify-between gap-2 pb-3 mb-3 border-b border-white/50">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-lg leading-none select-none">•</span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span
                    className="shrink-0 p-1.5 rounded-xl bg-white/70 text-slate-400 group-hover:text-sky-600 group-hover:bg-white shadow-2xs transition-all"
                    title="Click to view full data"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Compact Description Only */}
                <p className="font-body text-slate-700 text-xs sm:text-sm leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Visual Click Cue */}
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-700/80 group-hover:text-sky-800 transition-colors">
                  <span>View full details</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                </div>
              </div>

              {/* Bottom Pinned Footer: Links Only */}
              <div className="mt-5 pt-3.5 border-t border-white/50 flex items-center justify-between gap-2">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 bg-white/70 hover:bg-white px-3 py-1.5 rounded-xl border border-[#a9988c]/60 shadow-2xs backdrop-blur-md transition-colors cursor-pointer"
                  title={`View ${item.title} on GitHub`}
                >
                  <Github className="w-3.5 h-3.5 text-slate-900" />
                  <span>GitHub</span>
                </a>

                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-black bg-[#e8dfd5]/90 hover:bg-[#ded7cf] px-3 py-1.5 rounded-xl border border-[#a9988c] shadow-2xs backdrop-blur-md transition-colors cursor-pointer"
                    title={`Visit ${item.title} Live`}
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>

      {/* Project Full Data Modal portaled to document.body to avoid stacking context glitches */}
      {selectedProject && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-28 pb-8 px-4 sm:px-6 bg-neutral-950/50 backdrop-blur-md animate-fade-in overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[calc(100vh-8.5rem)] flex flex-col bg-[#FAF7F0] rounded-3xl border-[2px] border-[#a9988c] shadow-[0_24px_60px_rgba(45,41,38,0.28)] overflow-hidden animate-scale-up my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header Bar with Project Title at the top */}
            <div className="px-6 py-4 border-b border-[#a9988c]/30 bg-[#F4EFE6]/90 flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[#a9988c] text-lg leading-none select-none shrink-0">•</span>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-[#e8dfd5] transition-colors cursor-pointer shrink-0 mt-0.5 sm:mt-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-5 text-neutral-900">
              <div>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-body">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Architecture & Feature Highlights */}
              {selectedProject.architectureHighlights && selectedProject.architectureHighlights.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-800 mb-2.5">
                    Key Architecture &amp; Highlights
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-700 font-body">
                    {selectedProject.architectureHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#a9988c] text-base leading-none select-none mt-0.5 shrink-0">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Used */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <Code2 className="w-4 h-4 text-[#8c7b6d]" />
                    <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-800">
                      Technologies Used
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-xl text-xs font-mono font-medium border border-[#a9988c]/40 bg-white/80 text-neutral-800 shadow-2xs backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer: Action Buttons */}
            <div className="px-6 py-4 border-t border-[#a9988c]/30 bg-[#F4EFE6]/90 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold bg-white hover:bg-neutral-50 text-neutral-900 border border-[#a9988c] shadow-2xs transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4 text-neutral-900" />
                  <span>View Repository</span>
                </a>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold bg-[#2d2926] hover:bg-[#1a1816] text-[#F8F4EB] border border-[#2d2926] shadow-2xs transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#F8F4EB]" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-2xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-[#e8dfd5] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
