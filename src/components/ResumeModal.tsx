import React from 'react';
import { X, Download, Printer, CheckCircle, ExternalLink, Mail, MapPin } from 'lucide-react';
import { ProfileData, EducationItem, ExperienceItem, Project, SkillCategory } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: Project[];
  skills: SkillCategory[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  education,
  experience,
  projects,
  skills,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="font-bold text-sm sm:text-base text-slate-800">
              {profile.name} — Curriculum Vitae
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document View */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-800 space-y-6 bg-white font-sans text-xs sm:text-sm print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 pb-5 text-center sm:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profile.name}</h1>
            <p className="text-sm font-semibold text-sky-700 mt-0.5">{profile.title}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {profile.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-slate-700 underline">
                github.com/shreyadiwakar
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-pink-700 border-b border-pink-200 pb-1 mb-3">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline font-semibold">
                  <span className="text-slate-900">{edu.degree}</span>
                  <span className="text-xs font-mono text-slate-500">{edu.period}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{edu.institution}</span>
                  <span className="font-bold text-emerald-700">{edu.gradeOrGpa}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  <strong>Coursework:</strong> {edu.coursework.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-sky-700 border-b border-sky-200 pb-1 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline font-semibold">
                    <span className="text-slate-900">{exp.role} — <span className="font-normal text-slate-700">{exp.company}</span></span>
                    <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs pl-1">
                    {exp.description.map((b, bI) => (
                      <li key={bI}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 border-b border-emerald-200 pb-1 mb-3">
              Key Engineering Projects
            </h2>
            <div className="space-y-3">
              {projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <span className="text-xs font-mono text-slate-500">{proj.techStack.slice(0, 4).join(', ')}</span>
                  </div>
                  <p className="text-xs text-slate-600">{proj.tagline}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-amber-700 border-b border-amber-200 pb-1 mb-2">
              Technical Skills & Proficiencies
            </h2>
            <div className="text-xs text-slate-700 space-y-1">
              <p><strong>Languages:</strong> TypeScript, Python, C++, Java, JavaScript, SQL, Bash</p>
              <p><strong>Frameworks & Libraries:</strong> React 19, Next.js, Node.js, Express, Tailwind CSS, Motion</p>
              <p><strong>Database & Cloud:</strong> PostgreSQL, Redis Streams, MongoDB, Docker, Git, CI/CD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
