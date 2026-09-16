import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Keyboard as KeyboardIcon, CheckCircle2, Trophy, Gauge } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KeyDef {
  code: string;
  label: string;
  shiftLabel?: string;
  width?: string;
}

const KEYBOARD_ROWS: KeyDef[][] = [
  // Row 1: Numbers & Backspace
  [
    { code: 'Backquote', label: '`', shiftLabel: '~' },
    { code: 'Digit1', label: '1', shiftLabel: '!' },
    { code: 'Digit2', label: '2', shiftLabel: '@' },
    { code: 'Digit3', label: '3', shiftLabel: '#' },
    { code: 'Digit4', label: '4', shiftLabel: '$' },
    { code: 'Digit5', label: '5', shiftLabel: '%' },
    { code: 'Digit6', label: '6', shiftLabel: '^' },
    { code: 'Digit7', label: '7', shiftLabel: '&' },
    { code: 'Digit8', label: '8', shiftLabel: '*' },
    { code: 'Digit9', label: '9', shiftLabel: '(' },
    { code: 'Digit0', label: '0', shiftLabel: ')' },
    { code: 'Minus', label: '-', shiftLabel: '_' },
    { code: 'Equal', label: '=', shiftLabel: '+' },
    { code: 'Backspace', label: 'Bksp', width: 'w-14 sm:w-16' },
  ],
  // Row 2: QWERTY
  [
    { code: 'Tab', label: 'Tab', width: 'w-12 sm:w-14' },
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
    { code: 'BracketLeft', label: '[', shiftLabel: '{' },
    { code: 'BracketRight', label: ']', shiftLabel: '}' },
    { code: 'Backslash', label: '\\', shiftLabel: '|', width: 'w-10 sm:w-12' },
  ],
  // Row 3: ASDF
  [
    { code: 'CapsLock', label: 'Caps', width: 'w-14 sm:w-16' },
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
    { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' },
    { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';', shiftLabel: ':' },
    { code: 'Quote', label: "'", shiftLabel: '"' },
    { code: 'Enter', label: 'Enter', width: 'w-16 sm:w-20' },
  ],
  // Row 4: ZXCV
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'w-18 sm:w-22' },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',', shiftLabel: '<' },
    { code: 'Period', label: '.', shiftLabel: '>' },
    { code: 'Slash', label: '/', shiftLabel: '?' },
    { code: 'ShiftRight', label: 'Shift', width: 'w-16 sm:w-20' },
  ],
  // Row 5: Space & Modifiers
  [
    { code: 'ControlLeft', label: 'Ctrl', width: 'w-10 sm:w-12' },
    { code: 'MetaLeft', label: 'Cmd', width: 'w-10 sm:w-12' },
    { code: 'AltLeft', label: 'Alt', width: 'w-10 sm:w-12' },
    { code: 'Space', label: 'Space', width: 'flex-1 max-w-sm sm:max-w-md' },
    { code: 'AltRight', label: 'Alt', width: 'w-10 sm:w-12' },
    { code: 'MetaRight', label: 'Fn', width: 'w-10 sm:w-12' },
    { code: 'ControlRight', label: 'Ctrl', width: 'w-10 sm:w-12' },
  ],
];

interface DataPreset {
  id: string;
  name: string;
  category: string;
  text: string;
  description: string;
}

const DATA_PRESETS: DataPreset[] = [
  {
    id: 'dtu-record',
    name: 'DTU Student Record',
    category: 'Academics',
    text: 'SHREYA DIWAKAR | DTU CSE | ROLL: 24/CS/425 | GROUP G-2 | B.TECH CS 2024-2028',
    description: 'Academic roll and department verification data at Delhi Technological University.',
  },
  {
    id: 'compiler-automata',
    name: 'Automata & Compiler Lab',
    category: 'Compilers',
    text: 'NFA_TO_DFA: delta(q0, a) = {q1, q2}; LEX_STRIP_COMMENTS(/* clean */);',
    description: 'Subset construction transition function and LEX comment stripping streams.',
  },
  {
    id: 'creative-palette',
    name: 'Painting Studio Palette',
    category: 'Art',
    text: 'PALETTE: SAKURA PINK #F472B6 + SKY BLUE #38BDF8 + LINSEED OIL WASH',
    description: 'Fine art color mixtures and watercolor wash physics formulations.',
  },
];

export const InteractiveDataKeyboard: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<DataPreset>(DATA_PRESETS[0]);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const [activeKeyCode, setActiveKeyCode] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [typingSpeedMs, setTypingSpeedMs] = useState<number>(120);

  // Interactive Typing Test Mode State
  const [isTestMode, setIsTestMode] = useState<boolean>(false);
  const [testInput, setTestInput] = useState<string>('');
  const [testStartTime, setTestStartTime] = useState<number | null>(null);
  const [testWpm, setTestWpm] = useState<number>(0);
  const [testAccuracy, setTestAccuracy] = useState<number>(100);
  const [testFinished, setTestFinished] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Play synthetic mechanical click tone
  const playMechanicalClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650 + Math.random() * 80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // Audio not permitted or supported
    }
  }, [soundEnabled]);

  // Helper to map a character to key code
  const charToKeyCode = (ch: string): string => {
    const upper = ch.toUpperCase();
    if (upper >= 'A' && upper <= 'Z') return `Key${upper}`;
    if (ch >= '0' && ch <= '9') return `Digit${ch}`;
    if (ch === ' ') return 'Space';
    if (ch === '-' || ch === '_') return 'Minus';
    if (ch === '=' || ch === '+') return 'Equal';
    if (ch === '[' || ch === '{') return 'BracketLeft';
    if (ch === ']' || ch === '}') return 'BracketRight';
    if (ch === ';' || ch === ':') return 'Semicolon';
    if (ch === "'" || ch === '"') return 'Quote';
    if (ch === ',' || ch === '<') return 'Comma';
    if (ch === '.' || ch === '>') return 'Period';
    if (ch === '/' || ch === '?') return 'Slash';
    if (ch === '|' || ch === '\\') return 'Backslash';
    return 'Space';
  };

  // Automatic Key Click Animation Loop
  useEffect(() => {
    if (isTestMode || !autoPlay) return;

    const timer = setInterval(() => {
      setTypedIndex((prev) => {
        const fullText = selectedPreset.text;
        if (prev >= fullText.length) {
          // Pause brief moment then loop back
          return 0;
        }

        const nextChar = fullText[prev];
        const code = charToKeyCode(nextChar);
        setActiveKeyCode(code);
        playMechanicalClick();

        // Release key depression after 70ms
        setTimeout(() => {
          setActiveKeyCode(null);
        }, 70);

        return prev + 1;
      });
    }, typingSpeedMs);

    return () => clearInterval(timer);
  }, [autoPlay, isTestMode, selectedPreset, typingSpeedMs, playMechanicalClick]);

  // Handle Interactive Typing Test Input
  const handleTestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isTestMode || testFinished) return;

    const code = e.code;
    setActiveKeyCode(code);
    playMechanicalClick();
    setTimeout(() => setActiveKeyCode(null), 80);

    if (!testStartTime) {
      setTestStartTime(Date.now());
    }
  };

  const handleTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const target = selectedPreset.text;
    setTestInput(val);

    // Compute live stats
    if (testStartTime) {
      const elapsedMinutes = (Date.now() - testStartTime) / 60000;
      if (elapsedMinutes > 0.01) {
        const wordsTyped = val.length / 5;
        setTestWpm(Math.round(wordsTyped / elapsedMinutes));
      }
    }

    // Compute accuracy
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === target[i]) correctCount++;
    }
    const acc = val.length > 0 ? Math.round((correctCount / val.length) * 100) : 100;
    setTestAccuracy(acc);

    // Completion check
    if (val === target) {
      setTestFinished(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#f472b6', '#4ade80', '#facc15'],
      });
    }
  };

  const restartTyping = () => {
    setTypedIndex(0);
    setTestInput('');
    setTestStartTime(null);
    setTestWpm(0);
    setTestAccuracy(100);
    setTestFinished(false);
  };

  const displayedStreamText = isTestMode
    ? testInput
    : selectedPreset.text.slice(0, typedIndex);

  return (
    <section
      id="data-keyboard-section"
      ref={containerRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-slate-200">
          <KeyboardIcon className="w-3.5 h-3.5 text-slate-700" />
          Interactive Data Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Physical <span className="text-sky-600">Keyboard</span> Data Stream
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600">
          Translating structured credentials and compiler logic into real mechanical key actuations.
          Watch the keys click automatically or test your typing speed on my records.
        </p>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {DATA_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset);
                restartTyping();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                selectedPreset.id === preset.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {preset.name}
            </button>
          ))}

          {/* Typing Test Toggle Button */}
          <button
            onClick={() => {
              setIsTestMode(!isTestMode);
              restartTyping();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border flex items-center gap-1.5 ${
              isTestMode
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-300'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            {isTestMode ? 'Exit Typing Test' : 'Test Your Speed'}
          </button>
        </div>
      </div>

      {/* Main Keyboard Terminal & Chassis */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-7 shadow-xl border border-slate-800 text-white relative">
        {/* Terminal Screen / Data Readout */}
        <div className="bg-slate-950 rounded-lg p-4 sm:p-5 border border-slate-800 mb-6 font-mono relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 mb-2 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-bold uppercase tracking-wider">
                {isTestMode ? 'TEST MODE // USER INPUT' : 'AUTOMATED STREAM // CHICLET RUNNER'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>PRESET: {selectedPreset.category}</span>
              <span>CHARS: {displayedStreamText.length}/{selectedPreset.text.length}</span>
            </div>
          </div>

          {/* Stream Output Text */}
          <div className="min-h-[52px] text-sm sm:text-base text-sky-300 font-medium leading-relaxed tracking-wide break-all">
            {displayedStreamText}
            <span className="inline-block w-2.5 h-5 bg-pink-400 align-middle ml-1 animate-pulse" />
          </div>

          {/* Interactive Typing Test Input Field */}
          {isTestMode && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <input
                type="text"
                autoFocus
                placeholder="Type the data string above to test your speed..."
                value={testInput}
                onKeyDown={handleTestKeyDown}
                onChange={handleTestChange}
                disabled={testFinished}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-900 text-white placeholder-slate-500 text-sm font-mono border border-slate-700 focus:outline-hidden focus:border-sky-500"
              />

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-xs">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Gauge className="w-3.5 h-3.5 text-sky-400" />
                    Speed: <strong className="text-white text-sm">{testWpm} WPM</strong>
                  </span>
                  <span className="text-slate-300">
                    Accuracy: <strong className="text-emerald-400 text-sm">{testAccuracy}%</strong>
                  </span>
                </div>

                {testFinished && (
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    Test Completed! Outstanding work.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hardware Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1">
          <div className="flex items-center gap-2">
            {!isTestMode && (
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                {autoPlay ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                {autoPlay ? 'Pause Stream' : 'Play Stream'}
              </button>
            )}

            <button
              onClick={restartTyping}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
              Reset
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
              title="Toggle synthetic mechanical key click sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              )}
              {soundEnabled ? 'Click Audio On' : 'Audio Muted'}
            </button>
          </div>

          {!isTestMode && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Speed:</span>
              <button
                onClick={() => setTypingSpeedMs(200)}
                className={`px-2 py-0.5 rounded-md ${typingSpeedMs === 200 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                0.75x
              </button>
              <button
                onClick={() => setTypingSpeedMs(120)}
                className={`px-2 py-0.5 rounded-md ${typingSpeedMs === 120 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                1.0x
              </button>
              <button
                onClick={() => setTypingSpeedMs(60)}
                className={`px-2 py-0.5 rounded-md ${typingSpeedMs === 60 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                1.75x
              </button>
            </div>
          )}
        </div>

        {/* Physical Keyboard Layout (Chiclet / Mechanical Keybed) */}
        <div className="bg-slate-800/90 rounded-xl p-3 sm:p-4 border border-slate-700 shadow-inner overflow-x-auto">
          <div className="min-w-[620px] flex flex-col gap-1.5 sm:gap-2">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1.5 sm:gap-2 justify-center">
                {row.map((k) => {
                  const isPressed = activeKeyCode === k.code;
                  const customWidth = k.width || 'w-8 sm:w-11';

                  return (
                    <button
                      key={k.code}
                      onClick={() => {
                        setActiveKeyCode(k.code);
                        playMechanicalClick();
                        setTimeout(() => setActiveKeyCode(null), 100);
                      }}
                      className={`h-9 sm:h-11 ${customWidth} rounded-lg flex flex-col items-center justify-center text-[10px] sm:text-xs font-mono font-bold select-none transition-all duration-75 relative ${
                        isPressed
                          ? 'bg-sky-400 text-slate-950 translate-y-[3px] shadow-none border-b border-sky-300'
                          : 'bg-slate-200 hover:bg-white text-slate-800 border-b-[3.5px] border-slate-400 shadow-xs active:translate-y-[3px] active:border-b active:shadow-none'
                      }`}
                      title={k.label}
                    >
                      {k.shiftLabel && (
                        <span className="text-[8px] sm:text-[9px] text-slate-500 leading-none">
                          {k.shiftLabel}
                        </span>
                      )}
                      <span className="leading-tight">{k.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Hardware Key Switch: Animated via automated loop &amp; key events
          </span>
          <span className="text-slate-500">
            Shreya Diwakar • Interactive Portfolio Component
          </span>
        </div>
      </div>
    </section>
  );
};
