import React from 'react';
import { X, Printer, Phone, Mail, MapPin, ExternalLink, Github, Linkedin, Code } from 'lucide-react';
import { achievements } from '../data/portfolioData';

export const ResumeModal = ({
  isOpen,
  onClose,
  profile,
  education,
  experience,
  projects,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Modal Control Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-sm text-slate-800 font-mono">
              {profile.name} — Official Resume
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Authentic Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-900 space-y-5 bg-white font-sans text-xs sm:text-sm print:p-0 print:overflow-visible">
          {/* Resume Header */}
          <div className="border-b border-slate-300 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-slate-950">
                  {profile.name}
                </h1>
                <p className="text-xs font-semibold text-slate-700 mt-0.5 font-mono">
                  {profile.rollNo}
                </p>
                <p className="text-xs text-slate-800 font-medium">
                  Bachelor of Technology • Computer Science Engineering
                </p>
                <p className="text-xs text-slate-600">
                  Delhi Technological University, formerly DCE
                </p>
              </div>

              <div className="text-xs text-left sm:text-right space-y-1 font-mono text-slate-700">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{profile.phone || '+91-8851493754'}</span>
                </p>
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>{profile.email}</span>
                </p>
                <div className="flex items-center sm:justify-end gap-2 text-[11px] pt-0.5">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-700 hover:underline flex items-center gap-0.5"
                  >
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-800 hover:underline flex items-center gap-0.5"
                  >
                    GitHub
                  </a>
                  <span>•</span>
                  <a
                    href={profile.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 hover:underline flex items-center gap-0.5"
                  >
                    LeetCode
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* EDUCATION TABLE */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 border-l-3 border-slate-900 mb-2.5">
              Education
            </h2>
            <div className="overflow-x-auto border border-slate-300 rounded-md">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 font-semibold text-slate-800 text-[11px]">
                    <th className="py-2 px-3">Degree</th>
                    <th className="py-2 px-3">University/ Board</th>
                    <th className="py-2 px-3">Institute</th>
                    <th className="py-2 px-3">Year</th>
                    <th className="py-2 px-3 text-right">CGPA/ Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {education.map((edu, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-3 font-semibold text-slate-900">{edu.degree}</td>
                      <td className="py-2 px-3 text-slate-700">{edu.board || 'DTU'}</td>
                      <td className="py-2 px-3 text-slate-700">{edu.institution}</td>
                      <td className="py-2 px-3 font-mono text-slate-600">{edu.period}</td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900 text-right">
                        {edu.gradeOrGpa}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* INTERNSHIPS */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 border-l-3 border-slate-900 mb-2.5">
              Internships
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-bold text-slate-900 text-sm">
                      • {exp.company} <span className="font-semibold text-slate-700">| {exp.role}</span>
                      <span className="text-slate-500 font-normal"> | {exp.location}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-600 font-medium shrink-0">
                      ({exp.period})
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-2">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 border-l-3 border-slate-900 mb-2">
              Technical Skills
            </h2>
            <ul className="space-y-1 text-xs text-slate-800">
              <li>
                <strong>• Programming Languages:</strong> C, C++, JavaScript, Python
              </li>
              <li>
                <strong>• Web Development:</strong> HTML, CSS, React.js, Node.js, REST APIs
              </li>
              <li>
                <strong>• Databases:</strong> SQL (MySQL), MongoDB
              </li>
              <li>
                <strong>• Concepts:</strong> Object-Oriented Programming (OOP), DSA, Operating Systems, DBMS, Computer Networks, Software Engineering, Computer Architecture
              </li>
              <li>
                <strong>• Tools &amp; Technologies:</strong> Git, GitHub, Docker, Playwright, Test Automation, Docker Compose, Figma
              </li>
            </ul>
          </div>

          {/* PROJECTS */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 border-l-3 border-slate-900 mb-2.5">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">
                        • {proj.title}
                      </h3>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 hover:underline text-xs font-mono"
                      >
                        GitHub
                      </a>
                    </div>
                    {proj.date && (
                      <span className="text-xs font-mono text-slate-600 font-medium shrink-0">
                        ({proj.date})
                      </span>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-2">
                    <li className="leading-relaxed">{proj.description}</li>
                    {proj.architectureHighlights && proj.architectureHighlights.length > 0 && (
                      <div className="pl-4 space-y-0.5 text-[11px] text-slate-600">
                        {proj.architectureHighlights.slice(0, 2).map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-1.5">
                            <span className="text-slate-400">•</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <li className="text-[11px] font-mono text-slate-600">
                      <strong>Technologies used:</strong> {proj.techStack.join(', ')}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS AND EXTRA CURRICULARS */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 border-l-3 border-slate-900 mb-2">
              Achievements and Extra Curriculars
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-800 pl-1">
              {achievements.map((ach, idx) => (
                <li key={idx} className="leading-relaxed">
                  <strong>{ach.title}:</strong> {ach.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
