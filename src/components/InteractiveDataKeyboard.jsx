import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Github, ArrowUpRight } from 'lucide-react';

const CONNECT_TEXT = "Whether it's a project, an interesting idea, a collaboration, or just a conversation about tech, I'd love to hear from you.";

const KEYBOARD_ROWS = [
  // Row 1: Numbers & Backspace
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' },
    { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' },
    { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' },
    { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' },
    { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' },
    { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' },
    { code: 'Equal', label: '=' },
    { code: 'Backspace', label: 'Bksp', width: 'w-11 sm:w-13' },
  ],
  // Row 2: QWERTY
  [
    { code: 'Tab', label: 'Tab', width: 'w-10 sm:w-12' },
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' },
    { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' },
    { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' },
    { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[' },
    { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', width: 'w-9 sm:w-11' },
  ],
  // Row 3: ASDF
  [
    { code: 'CapsLock', label: 'Caps', width: 'w-11 sm:w-13' },
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
    { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' },
    { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';' },
    { code: 'Quote', label: "'" },
    { code: 'Enter', label: 'Enter', width: 'w-12 sm:w-15' },
  ],
  // Row 4: ZXCV
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'w-13 sm:w-16' },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' },
    { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: 'Shift', width: 'w-13 sm:w-16' },
  ],
  // Row 5: Space & Modifiers
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 'w-8 sm:w-10' },
    { code: 'MetaLeft', label: 'Cmd', width: 'w-8 sm:w-10' },
    { code: 'AltLeft', label: 'Alt', width: 'w-8 sm:w-10' },
    { code: 'Space', label: 'Space', width: 'flex-1 max-w-xs sm:max-w-sm' },
    { code: 'AltRight', label: 'Alt', width: 'w-8 sm:w-10' },
    { code: 'MetaRight', label: 'Fn', width: 'w-8 sm:w-10' },
    { code: 'ControlRight', label: 'Ctrl', width: 'w-8 sm:w-10' },
  ],
];

const CONNECT_LINKS = [
  {
    name: 'LinkedIn',
    value: 'shreyadiwakar',
    href: 'https://linkedin.com/in/shreyadiwakar',
    icon: Linkedin,
    color: 'hover:text-blue-600 hover:border-blue-300',
  },
  {
    name: 'GitHub',
    value: 'shreyadiwakar',
    href: 'https://github.com/shreyadiwakar',
    icon: Github,
    color: 'hover:text-slate-900 hover:border-slate-400',
  },
];

export const InteractiveDataKeyboard = () => {
  const [typedIndex, setTypedIndex] = useState(0);
  const [activeKeyCodes, setActiveKeyCodes] = useState([]);
  const screenRef = useRef(null);

  // Map any character to its physical keyboard key code
  const charToKeyCode = (ch) => {
    const upper = ch.toUpperCase();
    if (upper >= 'A' && upper <= 'Z') return `Key${upper}`;
    if (ch >= '0' && ch <= '9') return `Digit${ch}`;
    if (ch === ' ') return 'Space';
    if (ch === "'" || ch === '’') return 'Quote';
    if (ch === ',') return 'Comma';
    if (ch === '.') return 'Period';
    if (ch === '-') return 'Minus';
    return 'Space';
  };

  // Automated Typing Loop: Actuates keys visibly with crisp down/up clicks
  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => {
        if (prev >= CONNECT_TEXT.length) {
          // Pause at end of text before repeating
          return 0;
        }

        const nextChar = CONNECT_TEXT[prev];
        const primaryCode = charToKeyCode(nextChar);
        const isUpper = nextChar >= 'A' && nextChar <= 'Z';

        // Depress key (and Shift if uppercase)
        const keysToPress = isUpper ? [primaryCode, 'ShiftLeft'] : [primaryCode];
        setActiveKeyCodes(keysToPress);

        // Spring key back UP after 65ms for a visible mechanical click stroke
        setTimeout(() => {
          setActiveKeyCodes([]);
        }, 65);

        return prev + 1;
      });
    }, 95);

    return () => clearInterval(timer);
  }, []);

  // Automatically shift / auto-scroll the single-line text so keyboard size NEVER increases
  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollLeft = screenRef.current.scrollWidth;
    }
  }, [typedIndex]);

  // Support manual key presses on physical keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      setActiveKeyCodes([e.code]);
    };

    const handleKeyUp = () => {
      setActiveKeyCodes([]);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const displayedText = CONNECT_TEXT.slice(0, typedIndex);

  return (
    <section id="data-keyboard-section" className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
      {/* Title: -Let's connect */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
          Let's <span className="text-sky-600">connect</span>
        </h2>
      </div>

      {/* Compact Whitish Aesthetic Keyboard Container */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xl border border-white/95 max-w-3xl mx-auto">
        {/* 
          Fixed-Height Display Screen:
          Height is strictly fixed so typing text never increases keyboard size.
          Overflow text shifts horizontally to the left as it types.
        */}
        <div
          ref={screenRef}
          className="bg-slate-50/95 rounded-xl px-4 py-2 border border-slate-200/90 shadow-inner h-11 sm:h-12 flex items-center mb-3 overflow-hidden select-none whitespace-nowrap scroll-smooth"
        >
          <span className="font-mono text-slate-800 text-xs sm:text-sm font-medium tracking-wide inline-block">
            {displayedText}
          </span>
          <span className="inline-block w-1.5 h-4 bg-sky-500 ml-1 shrink-0 animate-pulse" />
        </div>

        {/* Compact Whitish Physical Keyboard Bed */}
        <div className="bg-slate-100/80 rounded-xl p-2 sm:p-3 border border-slate-200/80 shadow-inner">
          <div className="space-y-1 sm:space-y-1.5 overflow-x-auto pb-0.5">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center justify-center gap-1 sm:gap-1.5 min-w-[540px]">
                {row.map((key) => {
                  const isActive = activeKeyCodes.includes(key.code);

                  return (
                    <button
                      key={key.code}
                      onClick={() => {
                        setActiveKeyCodes([key.code]);
                        setTimeout(() => setActiveKeyCodes([]), 100);
                      }}
                      className={`
                        h-7 sm:h-8.5 rounded-md sm:rounded-lg flex items-center justify-center transition-all select-none
                        ${key.width || 'w-7 sm:w-8.5'}
                        ${
                          isActive
                            ? 'bg-sky-500 text-white font-black border border-sky-600 shadow-[0_0_12px_rgba(14,165,233,0.85)] translate-y-0.5 scale-95'
                            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 shadow-[0_1.5px_0_rgba(203,213,225,0.95)]'
                        }
                      `}
                    >
                      <span className="text-[10px] sm:text-xs font-mono font-bold leading-none">
                        {key.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links to Connect Given Below: Only LinkedIn & GitHub */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {CONNECT_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`px-5 py-2 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 font-mono text-xs sm:text-sm group ${link.color}`}
            >
              <Icon className="w-4 h-4 text-slate-600 group-hover:text-inherit transition-colors" />
              <span className="font-semibold text-slate-900 group-hover:text-inherit transition-colors">
                {link.name}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-inherit group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          );
        })}
      </div>
    </section>
  );
};
