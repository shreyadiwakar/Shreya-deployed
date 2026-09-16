import React, { useEffect, useState, useRef } from 'react';

export const NeonCursor = ({ enabled = true }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const trailRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
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

    let animationFrameId;
    const updateTrail = () => {
      trailRef.current.x += (targetRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (targetRef.current.y - trailRef.current.y) * 0.18;
      setTrailPos({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled || isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {isClicking ? (
        /* Magnifying Glass shape on click with zero blur */
        <div
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-30%, -30%)`,
          }}
          className="fixed top-0 left-0 transition-transform duration-75 drop-shadow-md"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10" cy="10" r="6.5" className="stroke-slate-900 fill-sky-100/70" strokeWidth="2.5" />
            <line x1="15" y1="15" x2="21" y2="21" className="stroke-slate-900" strokeWidth="3.2" />
            <line x1="8" y1="8" x2="12" y2="8" className="stroke-sky-500" strokeWidth="1.5" />
            <line x1="10" y1="6" x2="10" y2="10" className="stroke-sky-500" strokeWidth="1.5" />
          </svg>
        </div>
      ) : (
        <>
          {/* Outer Ring - Zero Blur */}
          <div
            id="neon-cursor-trail"
            style={{
              transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) translate(-50%, -50%) scale(${
                isHovering ? 1.3 : 1
              })`,
              transition: 'transform 0.1s ease-out',
            }}
            className={`fixed top-0 left-0 rounded-full border-2 transition-all duration-150 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] ${
              isHovering ? 'h-9 w-9 bg-sky-400/10' : 'h-7 w-7 bg-transparent'
            }`}
          />

          {/* Inner Sharp Dot */}
          <div
            id="neon-cursor-dot"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
                isHovering ? 0.6 : 1
              })`,
            }}
            className="fixed top-0 left-0 h-2 w-2 rounded-full transition-transform duration-75 bg-sky-500 shadow-[0_0_8px_#0ea5e9]"
          />
        </>
      )}
    </div>
  );
};
