import React from 'react';

export const AboutMeSection = () => {
  return (
    <section id="about-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Side: About me + Main Bio Paragraphs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            About <span className="text-sky-600">me</span>
          </h2>

          <div className="space-y-4 font-body text-slate-800 text-sm sm:text-base leading-relaxed">
            <p>
              Hey! I'm Shreya, a Computer Science student at Delhi Technological University who enjoys turning ideas into things that actually work. I'm interested in software development, problem solving and exploring AI/ML.
            </p>

            <p>
              I like learning by building, experimenting with new technologies, and figuring out how things work under the hood. Outside academics, I enjoy the process of figuring things out, one bug and one idea at a time, get excited about a good design, and somehow have 15 tabs open while working on one thing.
            </p>
          </div>
        </div>

        {/* Right Side: A few things about me + Small Text */}
        <div className="lg:col-span-5 space-y-5 text-center lg:text-left pt-2 lg:pt-3">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            A few things about me
          </h3>

          <div className="space-y-5 font-body">
            <div>
              <p className="font-body font-semibold text-slate-900 text-xs sm:text-sm mb-1">
                One thing I dislike:
              </p>
              <p className="font-heading italic text-slate-700 text-sm sm:text-base leading-relaxed">
                "Code that makes sense in my head but not on the screen."
              </p>
            </div>

            <div>
              <p className="font-body font-semibold text-slate-900 text-xs sm:text-sm mb-1">
                One thing I need:
              </p>
              <p className="font-heading italic text-slate-700 text-sm sm:text-base leading-relaxed">
                "A good playlist while coding."
              </p>
            </div>

            <div>
              <p className="font-body font-semibold text-slate-900 text-xs sm:text-sm mb-1">
                One thing I'm always doing:
              </p>
              <p className="font-heading italic text-slate-700 text-sm sm:text-base leading-relaxed">
                "Learning something I probably didn't need to learn at 2 AM."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
