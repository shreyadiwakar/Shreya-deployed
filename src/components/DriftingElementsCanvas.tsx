import React, { useEffect, useRef } from 'react';

interface StarItem {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  points: 4 | 5 | 8;
  color: string;
  angle: number;
  vAngle: number;
  twinklePhase: number;
  twinkleSpeed: number;
  baseOpacity: number;
}

const STAR_COLORS = [
  '#fde047', // soft yellow
  '#f8fafc', // pure soft white
  '#bae6fd', // light sky blue
  '#fbcfe8', // delicate sakura pink
  '#ddd6fe', // pastel lilac
  '#fef08a', // pale gold
];

export const DriftingElementsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<StarItem[]>([]);
  const lastScrollY = useRef<number>(window.scrollY);
  const scrollVelocity = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create delicate small stars distributed across viewport
    const count = Math.min(Math.floor((width * height) / 16000), 55);
    const stars: StarItem[] = [];

    for (let i = 0; i < count; i++) {
      const pChoice = Math.random();
      const points: 4 | 5 | 8 = pChoice < 0.6 ? 4 : pChoice < 0.9 ? 5 : 8;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: 0.45 + Math.random() * 0.6, // gentle downward falling by default
        size: points === 4 ? 3 + Math.random() * 3.5 : 2.5 + Math.random() * 2.5,
        points,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.015,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.03 + Math.random() * 0.04,
        baseOpacity: 0.4 + Math.random() * 0.45,
      });
    }
    starsRef.current = stars;

    // Listen to scroll events: when scrolling down, impart upward velocity
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Positive delta = scrolling down -> impart upward velocity (stars move UP)
      // Negative delta = scrolling up -> impart downward push
      scrollVelocity.current += delta * 0.12;
      // Clamp velocity to keep motion graceful and fluid
      scrollVelocity.current = Math.max(-10, Math.min(scrollVelocity.current, 22));
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

      // Smoothly decay scroll velocity back to rest
      scrollVelocity.current *= 0.93;
      if (Math.abs(scrollVelocity.current) < 0.01) {
        scrollVelocity.current = 0;
      }

      const stars = starsRef.current;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Normal falling downward, but scrolling down causes upward motion
        const effectiveVy = star.vy - scrollVelocity.current;

        star.x += star.vx;
        star.y += effectiveVy;
        star.angle += star.vAngle;

        // Wrap around top/bottom edges
        if (star.y > height + 20) {
          star.y = -15;
          star.x = Math.random() * width;
        } else if (star.y < -20) {
          star.y = height + 15;
          star.x = Math.random() * width;
        }

        if (star.x > width + 20) {
          star.x = -15;
        } else if (star.x < -20) {
          star.x = width + 15;
        }

        // Calculate twinkling opacity
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const opacity = Math.max(0.15, Math.min(0.95, star.baseOpacity + twinkle * 0.25));

        // Draw small star shape
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.angle);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = star.color;

        const s = star.size;

        if (star.points === 4) {
          // Delicate 4-pointed diamond star
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.closePath();
          ctx.fill();

          // Tiny center specular dot
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
          ctx.fill();
        } else if (star.points === 5) {
          // Classic 5-pointed micro star
          ctx.beginPath();
          for (let p = 0; p < 5; p++) {
            const outerAngle = (p * 4 * Math.PI) / 5 - Math.PI / 2;
            const innerAngle = outerAngle + (2 * Math.PI) / 10;
            const rOuter = s;
            const rInner = s * 0.42;

            if (p === 0) {
              ctx.moveTo(Math.cos(outerAngle) * rOuter, Math.sin(outerAngle) * rOuter);
            } else {
              ctx.lineTo(Math.cos(outerAngle) * rOuter, Math.sin(outerAngle) * rOuter);
            }
            ctx.lineTo(Math.cos(innerAngle) * rInner, Math.sin(innerAngle) * rInner);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // 8-point cross star sparkle
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s * 0.7, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s * 0.7, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 0.7);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 0.7);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 block w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};
