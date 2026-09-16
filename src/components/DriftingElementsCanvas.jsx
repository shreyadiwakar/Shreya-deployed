import React, { useEffect, useRef } from 'react';

const STAR_COLORS = [
  '#fde047', // soft yellow
  '#f8fafc', // pure soft white
  '#bae6fd', // light sky blue
  '#fbcfe8', // delicate sakura pink
  '#ddd6fe', // pastel lilac
  '#fef08a', // pale gold
];

export const DriftingElementsCanvas = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const lastScrollY = useRef(window.scrollY);
  const scrollVelocity = useRef(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Confine stars strictly to side margins (0 - 15% and 85 - 100%)
    const getSidePosition = (w, isLeft) => {
      const margin = Math.max(w * 0.15, 120);
      return isLeft
        ? Math.random() * margin
        : w - margin + Math.random() * margin;
    };

    const count = Math.min(Math.floor((width * height) / 24000), 32);
    const stars = [];

    for (let i = 0; i < count; i++) {
      const isLeft = i % 2 === 0;
      stars.push({
        x: getSidePosition(width, isLeft),
        y: Math.random() * height,
        isLeft,
        vx: (Math.random() - 0.5) * 0.15,
        vy: 0.4 + Math.random() * 0.5,
        size: 2.5 + Math.random() * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.03,
      });
    }
    starsRef.current = stars;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;
      scrollVelocity.current += delta * 0.1;
      scrollVelocity.current = Math.max(-10, Math.min(scrollVelocity.current, 15));
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      scrollVelocity.current *= 0.94;
      if (Math.abs(scrollVelocity.current) < 0.01) {
        scrollVelocity.current = 0;
      }

      const stars = starsRef.current;
      const margin = Math.max(width * 0.15, 120);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const effectiveVy = star.vy - scrollVelocity.current;

        star.x += star.vx;
        star.y += effectiveVy;

        // Keep strictly on side
        if (star.isLeft) {
          if (star.x > margin) star.x = margin;
          if (star.x < 0) star.x = 0;
        } else {
          if (star.x < width - margin) star.x = width - margin;
          if (star.x > width) star.x = width;
        }

        if (star.y > height + 20) {
          star.y = -15;
          star.x = getSidePosition(width, star.isLeft);
        } else if (star.y < -20) {
          star.y = height + 15;
          star.x = getSidePosition(width, star.isLeft);
        }

        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const opacity = Math.max(0.2, Math.min(0.9, 0.5 + twinkle * 0.3));

        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = star.color;

        const s = star.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 block w-full h-full"
    />
  );
};
