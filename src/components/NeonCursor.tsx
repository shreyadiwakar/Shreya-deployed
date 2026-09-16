import React, { useEffect, useState, useRef } from 'react';

interface NeonCursorProps {
  enabled?: boolean;
}

export const NeonCursor: React.FC<NeonCursorProps> = ({ enabled = true }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Hue rotation for living neon breathing pulse
  const [neonHue, setNeonHue] = useState<'cyan' | 'pink' | 'lime' | 'yellow'>('cyan');

  const trailRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if target or parent is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"], .interactive-element'
        );
        setIsHovering(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Animation frame for smooth trailing inertia
    let animationFrameId: number;
    const updateTrail = () => {
      // Lerp trail
      trailRef.current.x += (targetRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (targetRef.current.y - trailRef.current.y) * 0.18;
      setTrailPos({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    // Dynamic neon color cycling every few seconds
    const interval = setInterval(() => {
      setNeonHue((prev) => {
        if (prev === 'cyan') return 'pink';
        if (prev === 'pink') return 'lime';
        if (prev === 'lime') return 'yellow';
        return 'cyan';
      });
    }, 4500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  if (!enabled || isTouchDevice || !isVisible) return null;

  const getNeonColors = () => {
    switch (neonHue) {
      case 'pink':
        return {
          dot: 'bg-pink-500 shadow-[0_0_12px_#ec4899]',
          ring: 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.7),inset_0_0_10px_rgba(236,72,153,0.4)]',
          glow: 'rgba(236, 72, 153, 0.4)',
        };
      case 'lime':
        return {
          dot: 'bg-emerald-400 shadow-[0_0_12px_#34d399]',
          ring: 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.7),inset_0_0_10px_rgba(52,211,153,0.4)]',
          glow: 'rgba(52, 211, 153, 0.4)',
        };
      case 'yellow':
        return {
          dot: 'bg-amber-400 shadow-[0_0_12px_#fbbf24]',
          ring: 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7),inset_0_0_10px_rgba(251,191,36,0.4)]',
          glow: 'rgba(251, 191, 36, 0.4)',
        };
      case 'cyan':
      default:
        return {
          dot: 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]',
          ring: 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.7),inset_0_0_10px_rgba(34,211,238,0.4)]',
          glow: 'rgba(34, 211, 238, 0.4)',
        };
    }
  };

  const colors = getNeonColors();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Neon Trailing Ring */}
      <div
        id="neon-cursor-trail"
        style={{
          transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isHovering ? 1.7 : 1
          })`,
          transition: 'transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease',
        }}
        className={`fixed top-0 left-0 rounded-full border-2 transition-all duration-150 ${
          isHovering ? 'h-11 w-11 bg-white/20 backdrop-blur-[1px]' : 'h-8 w-8 bg-transparent'
        } ${colors.ring}`}
      />

      {/* Inner Sharp Neon Dot */}
      <div
        id="neon-cursor-dot"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 1.5 : isHovering ? 0.6 : 1
          })`,
        }}
        className={`fixed top-0 left-0 h-2.5 w-2.5 rounded-full transition-transform duration-75 ${colors.dot}`}
      />

      {/* Click ripple burst */}
      {isClicking && (
        <div
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          }}
          className="fixed top-0 left-0 h-16 w-16 rounded-full border border-cyan-400/80 animate-ping"
        />
      )}
    </div>
  );
};
