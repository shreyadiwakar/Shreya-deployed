import React from 'react';
import { motion } from 'motion/react';
import { Palette, Video, Headphones, Camera } from 'lucide-react';

export const BeyondCodeSection = () => {
  const hobbies = [
    {
      id: 'creativity',
      title: 'Creativity',
      badgeBg: 'bg-rose-100/90 text-rose-600 border border-rose-200/70',
      icon: Palette,
      description:
        'I enjoy exploring ideas through visual creativity, experimenting with different styles, and finding new ways to bring ideas to life.',
    },
    {
      id: 'video-editing',
      title: 'Video Editing and Creating Content',
      badgeBg: 'bg-purple-100/90 text-purple-600 border border-purple-200/70',
      icon: Video,
      description:
        'I enjoy turning raw clips and ideas into something engaging through editing, transitions, music, and experimenting with different ways to present ideas creatively.',
    },
    {
      id: 'music',
      title: 'Listening to Music',
      badgeBg: 'bg-sky-100/90 text-sky-600 border border-sky-200/70',
      icon: Headphones,
      description:
        "Music is a constant part of my day — whether I'm coding, travelling, creating, or just taking a break.",
    },
    {
      id: 'photography',
      title: 'Photography',
      badgeBg: 'bg-amber-100/90 text-amber-600 border border-amber-200/70',
      icon: Camera,
      description:
        'I enjoy capturing interesting moments and perspectives, especially skies, sunsets, and little details that catch my eye.',
    },
  ];

  return (
    <section id="beyond-code-section" className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header (Compact) */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Beyond <span className="text-sky-600">Code</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 font-body max-w-md mx-auto">
          There's more to me than semicolons and segmentation faults.
        </p>
      </div>

      {/* Compact 4-Card Frosted Blurred Glass Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
        {hobbies.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              style={{
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              }}
              className="rounded-2xl border border-white/70 bg-white/40 hover:bg-white/55 p-4 sm:p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.06)] transition-colors duration-200 flex flex-col justify-start"
            >
              {/* Header with Icon Badge */}
              <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-200/40">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${item.badgeBg}`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Description Body */}
              <p className="font-body text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
