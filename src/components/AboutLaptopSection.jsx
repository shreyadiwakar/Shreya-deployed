import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Laptop, Volume2, VolumeX, RotateCcw, CheckCircle2, Terminal } from 'lucide-react';

/**
 * AboutLaptopSection
 * - Laptop unfolding movement authentically matching https://www.youtube.com/watch?v=d55wBqEnnw8
 * - Unfolds smoothly as user scrolls down (0% -> 25%).
 * - As soon as it opens, ZOOMS IN to take the screen ALL OVER the viewport like in the video (25% -> 55%).
 * - Seamlessly fills 100% of the screen, where the About Me story is typed in real-time.
 * - Chiclet keys illuminate while keyboard is in view.
 * - 100% NO LOGO ANYWHERE.
 * - Strictly the exact text requested, zero extra text.
 */

const EXACT_ABOUT_TEXT = `I am a Computer Science and Engineering student at Delhi Technological University (DTU) with a strong interest in problem-solving.

I enjoy working on Data Structures and Algorithms and consistently practice DSA to strengthen my logical thinking and coding efficiency. Alongside this, I am actively exploring Machine Learning and Web Development, focusing on building a solid foundation through hands-on projects and continuous learning.

I am passionate about understanding real-world applications of computer science, and staying curious about emerging technologies. I am open to learning opportunities, internships, and collaborations.`;

const TOTAL_FRAMES = 41; // unfold_00.webp to unfold_40.webp

export const AboutLaptopSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const screenContentRef = useRef(null);
  const audioCtxRef = useRef(null);

  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);

  // Dynamic zoom scale calculated to cover 100% of any viewport
  const [targetMaxScale, setTargetMaxScale] = useState(3.2);
  const [currentZoomProgress, setCurrentZoomProgress] = useState(0);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeKeyPos, setActiveKeyPos] = useState(null);
  const [autoPlayTyping, setAutoPlayTyping] = useState(false);
  const [typedIndex, setTypedIndex] = useState(0);
  const hasTriggeredAutoPlay = useRef(false);

  // 1. Calculate required scale to cover 100% of viewport
  useEffect(() => {
    const calculateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Laptop container max-w-[960px] aspect-[1280/800]
      const containerW = Math.min(vw * 0.95, 960);
      const containerH = containerW * (800 / 1280);

      // Laptop screen cutout in container: width 67.89%, height 63.88%
      const screenW = containerW * 0.6789;
      const screenH = containerH * 0.6388;

      const scaleX = vw / screenW;
      const scaleY = vh / screenH;
      // Safety margin to ensure bezels completely move outside viewport
      const needed = Math.max(scaleX, scaleY) * 1.08;
      setTargetMaxScale(Math.max(2.8, needed));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // 2. Preload 41 transparent WebP frames from Computer opening greenscreen
  useEffect(() => {
    let loaded = 0;
    const imgs = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(2, '0');
      img.src = `/laptop_unfold/unfold_${numStr}.webp`;
      img.onload = () => {
        imgs[i] = img;
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
    }

    return () => {
      imagesRef.current = [];
    };
  }, []);

  // 3. Track scroll through container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  // Mechanical typing audio generator via Web Audio API
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520 + Math.random() * 140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.024);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.024);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.024);
    } catch {}
  }, [soundEnabled]);

  // Key position mapper on the keyboard deck (percentages within the keyboard area)
  const getKeyPosition = useCallback((char) => {
    if (!char) return null;
    const c = char.toUpperCase();
    if (c === ' ') {
      // Spacebar
      return { left: 34, top: 72, width: 32, height: 24 };
    }
    // Chiclet key mapping across the keyboard grid
    const code = c.charCodeAt(0);
    const col = (code * 7) % 13;
    const row = (code * 3) % 4;
    return {
      left: 6 + col * 6.8,
      top: 8 + row * 22,
      width: 5.5,
      height: 20,
    };
  }, []);

  // 4. Sync scroll to laptop unfolding, camera zoom-in, and typing
  useEffect(() => {
    const unsub = smoothProgress.on('change', (latest) => {
      // Milestone 1 (0.00 -> 0.24): Unfold laptop frames 0..40
      let frameIdx = 0;
      if (latest < 0.01) {
        frameIdx = 0;
      } else if (latest < 0.24) {
        const ratio = (latest - 0.01) / 0.23;
        frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(ratio * TOTAL_FRAMES));
      } else {
        frameIdx = TOTAL_FRAMES - 1; // fully open
      }
      setCurrentFrameIdx(frameIdx);

      // Milestone 2 (0.24 -> 0.54): Zoom in camera directly into screen
      let zoom = 0;
      if (latest < 0.24) {
        zoom = 0;
      } else if (latest < 0.54) {
        // Smooth easeInOut curve for cinematic zoom
        const t = (latest - 0.24) / 0.30;
        zoom = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      } else {
        zoom = 1; // 100% full screen
      }
      setCurrentZoomProgress(zoom);

      // Milestone 3: Typing begins as soon as laptop is open (scroll >= 0.24)
      if (latest < 0.22) {
        setTypedIndex(0);
        setActiveKeyPos(null);
        setAutoPlayTyping(false);
        hasTriggeredAutoPlay.current = false;
      } else {
        // Trigger auto-typing when laptop opens up
        if (!hasTriggeredAutoPlay.current) {
          hasTriggeredAutoPlay.current = true;
          setAutoPlayTyping(true);
        }

        // Allow scroll scrubbing as well once zoom is underway or complete
        if (latest >= 0.30 && !autoPlayTyping) {
          const typingRatio = Math.min(1, Math.max(0, (latest - 0.30) / 0.62));
          const targetLen = Math.floor(typingRatio * EXACT_ABOUT_TEXT.length);
          setTypedIndex((prev) => {
            if (targetLen !== prev && targetLen > prev) {
              const char = EXACT_ABOUT_TEXT[targetLen - 1] || '';
              setActiveKeyPos(getKeyPosition(char));
              playClick();
            }
            return targetLen;
          });
        }
      }
    });

    return () => unsub();
  }, [smoothProgress, autoPlayTyping, getKeyPosition, playClick]);

  // 5. Smooth automatic typing effect once laptop opens
  useEffect(() => {
    if (!autoPlayTyping) return;

    if (typedIndex >= EXACT_ABOUT_TEXT.length) {
      setAutoPlayTyping(false);
      setActiveKeyPos(null);
      return;
    }

    const timer = setTimeout(() => {
      const nextChar = EXACT_ABOUT_TEXT[typedIndex] || '';
      setActiveKeyPos(getKeyPosition(nextChar));
      playClick();
      setTypedIndex((prev) => Math.min(EXACT_ABOUT_TEXT.length, prev + 1));
    }, 20);

    return () => clearTimeout(timer);
  }, [autoPlayTyping, typedIndex, getKeyPosition, playClick]);

  // 6. Draw active frame onto HTML5 Canvas
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[currentFrameIdx];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [imagesLoaded, currentFrameIdx]);

  // Auto-scroll screen content to active typing line
  useEffect(() => {
    if (screenContentRef.current) {
      screenContentRef.current.scrollTop = screenContentRef.current.scrollHeight;
    }
  }, [typedIndex]);

  const displayedText = useMemo(() => {
    return EXACT_ABOUT_TEXT.slice(0, typedIndex);
  }, [typedIndex]);

  // Screen is active when laptop is open (frame 38..40)
  const isScreenActive = currentFrameIdx >= 38;

  // Active scale for the zoom effect: goes from 1.0 up to targetMaxScale
  const activeScale = 1.0 + currentZoomProgress * (targetMaxScale - 1.0);

  const toggleSound = () => {
    if (!soundEnabled && !audioCtxRef.current) {
      try {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioClass();
      } catch {}
    }
    setSoundEnabled(!soundEnabled);
  };

  const handleReplay = () => {
    setTypedIndex(0);
    setAutoPlayTyping(true);
  };

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative min-h-[290vh] bg-gradient-to-b from-[#ded7cf] via-[#1c2027] to-[#0c0f13] text-neutral-100 select-none overflow-visible"
    >
      {/* 
        Sticky Viewport:
        Keeps the laptop pinned in view as the user scrolls through unfolding and zooming
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6">
        
        {/* Soft Ambient Studio Lighting Glow */}
        <div className="absolute w-[600px] sm:w-[850px] h-[350px] rounded-full bg-sky-500/10 blur-[140px] pointer-events-none -translate-y-8" />

        {/* 
          Full Screen Background Transition:
          Smoothly darkens to match the laptop screen as the zoom completes
        */}
        <div
          className="absolute inset-0 bg-[#14171c] pointer-events-none transition-opacity duration-150"
          style={{ opacity: Math.max(0, (currentZoomProgress - 0.6) / 0.4) }}
        />

        {/* Top Minimal Badge & Controls */}
        <div className="absolute top-16 sm:top-20 z-40 flex items-center gap-2 sm:gap-2.5">
          <span className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-mono tracking-widest text-neutral-200 uppercase flex items-center gap-2 shadow-lg">
            <Laptop className="w-3.5 h-3.5 text-sky-400" />
            <span>ABOUT ME • DTU CSE</span>
          </span>

          <button
            onClick={toggleSound}
            className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Keystroke Audio' : 'Enable Mechanical Keystrokes Audio'}
            id="about-sound-toggle"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          <button
            onClick={handleReplay}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Replay Typing Animation"
            id="about-auto-type-btn"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Replay</span>
          </button>
        </div>

        {/* 
          LAPTOP CONTAINER:
          Scales dynamically with transform-origin centered on the laptop screen (50.2% 44.3%).
          When zoomed in (activeScale ~ 3.2x), the screen covers 100% of the viewport!
        */}
        <div
          className="relative w-full max-w-[960px] aspect-[1280/800] flex items-center justify-center will-change-transform"
          style={{
            transform: `scale(${activeScale})`,
            transformOrigin: '50.2% 44.3%',
            transition: 'transform 0.08s ease-out',
          }}
        >
          
          {/* HTML5 Canvas rendering transparent unfolding frames */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={800}
            className="w-full h-full block object-contain pointer-events-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
          />

          {/* 
            SCREEN DISPLAY OVERLAY:
            Mapped exactly to the screen cutout in frame 40:
            left: 16.25%, top: 12.38%, width: 67.89%, height: 63.88%
            When zoomed, fills 100% of the viewport!
          */}
          <div
            className={`absolute transition-opacity duration-300 pointer-events-auto rounded-t-[6px] overflow-hidden flex flex-col shadow-2xl ${
              isScreenActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              left: '16.25%',
              top: '12.38%',
              width: '67.89%',
              height: '63.88%',
              backgroundColor: '#14171c',
            }}
          >
            {/* Minimal Window Header Bar */}
            <div className="h-6 sm:h-7 px-3 bg-[#1d2026] border-b border-[#2a2e37] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ef4444]" />
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#f59e0b]" />
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#10b981]" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-neutral-300 font-medium">
                <Terminal className="w-3 h-3 text-sky-400" />
                <span>about_shreya.md</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400">
                {Math.round((typedIndex / EXACT_ABOUT_TEXT.length) * 100)}%
              </div>
            </div>

            {/* 
              Screen Content Area:
              Font size adapts proportionally to stay crisp and readable at all zoom levels!
            */}
            <div
              ref={screenContentRef}
              className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto font-sans leading-relaxed text-neutral-100 space-y-3.5 scroll-smooth select-text"
              style={{
                fontSize: `${Math.max(8.5, 13.5 / (1 + currentZoomProgress * 0.45))}px`,
                lineHeight: 1.65,
              }}
            >
              {displayedText.split('\n\n').map((para, i, arr) => (
                <p key={i} className="text-neutral-100 font-normal tracking-wide">
                  {para}
                  {/* Blinking cyan cursor at current typing point */}
                  {i === arr.length - 1 && typedIndex < EXACT_ABOUT_TEXT.length && (
                    <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 ml-0.5 bg-sky-400 animate-pulse align-middle" />
                  )}
                </p>
              ))}

              {/* Ready confirmation on completion */}
              {typedIndex >= EXACT_ABOUT_TEXT.length && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-emerald-400"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ready for learning opportunities, internships &amp; collaborations.</span>
                </motion.div>
              )}
            </div>

            {/* Subtle Glass Sheen Gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.035] pointer-events-none" />
          </div>

          {/* 
            KEYBOARD TYPING GLOW OVERLAY:
            Mapped to the chiclet keyboard tray area:
            left: 17.19%, top: 78.13%, width: 66.02%, height: 7.88%
            Visible while laptop is in unzoomed or initial zoom view
          */}
          <div
            className={`absolute pointer-events-none transition-opacity duration-300 ${
              isScreenActive && currentZoomProgress < 0.6 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: '17.19%',
              top: '78.13%',
              width: '66.02%',
              height: '7.88%',
            }}
          >
            {/* Active Key Depression & Mechanical Backlight Glow */}
            {activeKeyPos && (
              <motion.div
                key={typedIndex}
                initial={{ opacity: 0.95, scale: 1.12 }}
                animate={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute rounded-[2px] bg-gradient-to-r from-sky-400 to-amber-300 shadow-[0_0_10px_rgba(56,189,248,0.9)] border border-white/80"
                style={{
                  left: `${activeKeyPos.left}%`,
                  top: `${activeKeyPos.top}%`,
                  width: `${activeKeyPos.width}%`,
                  height: `${activeKeyPos.height}%`,
                }}
              />
            )}
          </div>

        </div>

        {/* Bottom Scroll Progress & Instruction */}
        <div className="absolute bottom-5 sm:bottom-7 z-30 flex flex-col items-center gap-1 text-neutral-400 text-[11px] sm:text-xs font-mono tracking-widest uppercase">
          <span>
            {currentFrameIdx < 38
              ? 'Scroll down to unfold laptop'
              : currentZoomProgress < 0.85
              ? 'Zooming into screen...'
              : typedIndex < EXACT_ABOUT_TEXT.length
              ? 'Typing About Me story...'
              : 'About Me complete • Continue scroll'}
          </span>
          <div className="w-24 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-sky-400 transition-all duration-150"
              style={{
                width: `${
                  currentFrameIdx < 38
                    ? Math.round((currentFrameIdx / 38) * 35)
                    : currentZoomProgress < 0.85
                    ? 35 + Math.round(currentZoomProgress * 30)
                    : 65 + Math.round((typedIndex / EXACT_ABOUT_TEXT.length) * 35)
                }%`,
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
