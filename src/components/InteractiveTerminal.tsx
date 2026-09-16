import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData, Project } from '../types';

interface InteractiveTerminalProps {
  profile: ProfileData;
  projects: Project[];
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ profile, projects }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'shreya --init',
      output: (
        <div className="text-slate-700 text-xs sm:text-sm space-y-1">
          <p className="text-emerald-700 font-semibold">
            ✓ Initialized Shreya Diwakar developer terminal environment (v2.4.0)
          </p>
          <p className="text-slate-600">
            Type <span className="font-mono bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">help</span> to view available commands or click quick suggestions below.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1">
            <p className="font-semibold text-slate-900">Available commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs">
              <div><span className="text-pink-600 font-bold">about</span> - Background & bio</div>
              <div><span className="text-sky-600 font-bold">dtu</span> - Delhi Tech Univ academic record</div>
              <div><span className="text-emerald-600 font-bold">skills</span> - Technical capabilities</div>
              <div><span className="text-amber-600 font-bold">projects</span> - Showcase of builds</div>
              <div><span className="text-purple-600 font-bold">paint</span> - Creative painting studio</div>
              <div><span className="text-rose-600 font-bold">cat</span> - Sleepy companion dialogue</div>
              <div><span className="text-blue-600 font-bold">contact</span> - Email & socials</div>
              <div><span className="text-slate-600 font-bold">clear</span> - Clear terminal window</div>
            </div>
          </div>
        );
        break;

      case 'dtu':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1 bg-sky-50/80 p-2.5 rounded-lg border border-sky-200">
            <p className="font-bold text-sky-900">Delhi Technological University (DTU)</p>
            <p className="text-slate-700 font-mono text-xs">Department: Computer Science &amp; Engineering</p>
            <p className="text-slate-700 font-mono text-xs">Student Roll No: 24/CS/425 • Section/Group: G-2</p>
            <p className="text-slate-700 font-mono text-xs">Course Focus: Compiler Construction (CS 301), Automata &amp; Formal Languages</p>
          </div>
        );
        break;

      case 'paint':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1 bg-pink-50/80 p-2.5 rounded-lg border border-pink-200">
            <p className="font-bold text-pink-900">Personal Passion: Painting</p>
            <p className="text-slate-700 text-xs leading-relaxed">
              &quot;My hobby is painting&quot; — working primarily in soft digital watercolor, acrylic wash, and gouache. Blending visual aesthetic balance with algorithmic architecture.
            </p>
          </div>
        );
        break;

      case 'cat':
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.7 },
          colors: ['#f472b6', '#fed7aa', '#fde047'],
        });
        output = (
          <div className="text-xs sm:text-sm text-amber-900 space-y-1 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 font-mono">
            <p className="font-bold">Sleepy Cat: [walking along screen]</p>
            <p>&quot;Purrrr! Walking along with Shreya at DTU... Zzz... dreaming of clean regex tokens!&quot;</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1">
            <p className="font-bold text-slate-900">{profile.name}</p>
            <p className="text-sky-700 font-mono text-xs">{profile.title}</p>
            <p className="mt-1 leading-relaxed">{profile.bio}</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1">
            <p className="font-bold text-slate-900">Technical Arsenal:</p>
            <p className="text-xs font-mono text-slate-600">
              Languages: TypeScript, Python, C++, Java, JavaScript, SQL<br />
              Frontend: React 19, Tailwind CSS, Motion, HTML5 Canvas<br />
              Backend: Node.js, Express, Redis, PostgreSQL, WebSockets<br />
              DevOps: Docker, Git, Linux, GitHub Actions
            </p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1.5">
            <p className="font-bold text-slate-900">Featured Builds:</p>
            {projects.map((p, idx) => (
              <div key={p.id} className="text-xs font-mono">
                <span className="text-pink-600">[{idx + 1}]</span> <strong>{p.title}</strong> — {p.tagline}
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs sm:text-sm text-slate-700 space-y-1 font-mono">
            <p>Email: <span className="text-pink-600">{profile.email}</span></p>
            <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-sky-600 underline">{profile.github}</a></p>
            <p>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sky-600 underline">{profile.linkedin}</a></p>
          </div>
        );
        break;

      case 'binary':
        output = (
          <div className="text-xs font-mono text-emerald-600 break-all leading-snug">
            01010011 01101000 01110010 01100101 01111001 01100001 00100000 01000100 01101001 01110111 01100001 01101011 01100001 01110010 (Shreya Diwakar in ASCII Binary)
          </div>
        );
        break;

      case 'sudo hire':
      case 'hire':
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#38bdf8', '#4ade80', '#facc15', '#a855f7'],
        });
        output = (
          <div className="text-xs sm:text-sm text-emerald-700 font-semibold p-2 bg-emerald-50 rounded-lg border border-emerald-200">
            Offer accepted! Let's build remarkable software together. Sending contact signal...
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs text-rose-600 font-mono">
            Command not recognized: "{cmdText}". Type <span className="font-bold underline">help</span> for commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmdText,
        output,
      },
    ]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  return (
    <section id="terminal-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
          <TerminalIcon className="w-3.5 h-3.5 text-amber-600" />
          Interactive CS Terminal
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          CLI <span className="text-amber-600">Playground</span>
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Explore my background and repositories through an interactive developer shell.
        </p>
      </div>

      {/* Terminal Shell Container */}
      <div className="rounded-xl border border-slate-300 bg-white/95 shadow-lg overflow-hidden flex flex-col font-mono">
        {/* Terminal Header Bar */}
        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs text-slate-600 font-medium">shreya@macbook-pro: ~ (bash)</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleCommand('clear')}
              className="text-[11px] text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded hover:bg-slate-200 transition-colors"
            >
              clear
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 min-h-[260px] max-h-[380px] overflow-y-auto space-y-4 bg-slate-50/60 text-xs sm:text-sm">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 font-semibold">
                <span className="text-pink-500 font-bold">&gt;</span>
                <span className="text-slate-800">{log.command}</span>
              </div>
              <div className="pl-4 font-sans">{log.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 text-[11px] mr-1">Try:</span>
          {['help', 'about', 'skills', 'projects', 'contact', 'binary', 'sudo hire'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 text-[11px] font-mono transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <span className="text-pink-500 font-bold pl-2">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command (e.g., 'help', 'projects', 'sudo hire')..."
            className="flex-1 bg-transparent text-slate-800 text-xs sm:text-sm outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            aria-label="Run command"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
};
