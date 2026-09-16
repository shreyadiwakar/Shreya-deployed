import React, { useEffect, useRef } from 'react';

type SymmetricShapeType =
  | 'hexagon_inscribed'
  | 'octagram'
  | 'automata_ring'
  | 'rosette_petals'
  | 'faceted_diamond'
  | 'crystal_cross';

interface GeometricObject {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  shapeType: SymmetricShapeType;
  color: string;
  size: number;
  angle: number;
  rotationSpeed: number;
  baseAlpha: number;
  scale: number;
}

const SYMMETRIC_PALETTE = [
  'rgba(236, 72, 153, 0.55)', // soft rose/pink
  'rgba(14, 165, 233, 0.55)', // soft sky blue
  'rgba(16, 185, 129, 0.55)', // soft emerald
  'rgba(234, 179, 8, 0.55)',  // soft amber
  'rgba(168, 85, 247, 0.55)', // soft lavender/purple
  'rgba(99, 102, 241, 0.55)', // soft indigo
];

interface RepellingBackgroundProps {
  repelForceMultiplier?: number;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export const RepellingBackground: React.FC<RepellingBackgroundProps> = ({
  repelForceMultiplier = 1.0,
  containerRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const objectsRef = useRef<GeometricObject[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getBounds = () => {
      if (containerRef && containerRef.current) {
        return containerRef.current.getBoundingClientRect();
      }
      return canvas.getBoundingClientRect();
    };

    let bounds = getBounds();
    let width = (canvas.width = bounds.width);
    let height = (canvas.height = bounds.height);

    const shapeTypes: SymmetricShapeType[] = [
      'hexagon_inscribed',
      'octagram',
      'automata_ring',
      'rosette_petals',
      'faceted_diamond',
      'crystal_cross',
    ];

    // Distribute symmetric objects in a balanced geometric lattice
    const objects: GeometricObject[] = [];
    const cols = Math.max(4, Math.floor(width / 130));
    const rows = Math.max(3, Math.floor(height / 120));
    const cellW = width / cols;
    const cellH = height / rows;

    let shapeIdx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Slight organic offset within cell
        const originX = (c + 0.5) * cellW + (Math.random() - 0.5) * (cellW * 0.35);
        const originY = (r + 0.5) * cellH + (Math.random() - 0.5) * (cellH * 0.35);
        const shapeType = shapeTypes[shapeIdx % shapeTypes.length];
        shapeIdx++;

        objects.push({
          x: originX,
          y: originY,
          originX,
          originY,
          vx: 0,
          vy: 0,
          shapeType,
          color: SYMMETRIC_PALETTE[Math.floor(Math.random() * SYMMETRIC_PALETTE.length)],
          size: 14 + Math.random() * 8, // radius
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          baseAlpha: 0.45 + Math.random() * 0.35,
          scale: 1,
        });
      }
    }
    objectsRef.current = objects;

    // Mouse events strictly bound to hero container
    const handleMouseMove = (e: MouseEvent) => {
      bounds = getBounds();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (
        clientX >= bounds.left &&
        clientX <= bounds.right &&
        clientY >= bounds.top &&
        clientY <= bounds.bottom
      ) {
        mouseRef.current = {
          x: clientX - bounds.left,
          y: clientY - bounds.top,
          active: true,
        };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      bounds = getBounds();
      width = canvas.width = bounds.width;
      height = canvas.height = bounds.height;
    };

    const targetElement = containerRef?.current || window;
    targetElement.addEventListener('mousemove', handleMouseMove as EventListener);
    targetElement.addEventListener('mouseleave', handleMouseLeave as EventListener);
    window.addEventListener('resize', handleResize);

    // Drawing helpers for each symmetric object
    const drawHexagonInscribed = (c: CanvasRenderingContext2D, s: number) => {
      // Outer regular hexagon
      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.stroke();

      // Inscribed 6-point star (two interlaced triangles)
      c.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI) / 3 - Math.PI / 6;
        const px = Math.cos(a) * s * 0.95;
        const py = Math.sin(a) * s * 0.95;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.stroke();

      c.beginPath();
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI) / 3 + Math.PI / 6;
        const px = Math.cos(a) * s * 0.95;
        const py = Math.sin(a) * s * 0.95;
        if (i === 0) c.moveTo(px, py);
        else c.lineTo(px, py);
      }
      c.closePath();
      c.stroke();

      // Center ring
      c.beginPath();
      c.arc(0, 0, s * 0.28, 0, Math.PI * 2);
      c.stroke();
    };

    const drawOctagram = (c: CanvasRenderingContext2D, s: number) => {
      // Two overlapping squares rotated 45 deg
      c.strokeRect(-s * 0.65, -s * 0.65, s * 1.3, s * 1.3);

      c.save();
      c.rotate(Math.PI / 4);
      c.strokeRect(-s * 0.65, -s * 0.65, s * 1.3, s * 1.3);
      c.restore();

      // 8 satellite symmetric micro-dots
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const px = Math.cos(a) * s;
        const py = Math.sin(a) * s;
        c.beginPath();
        c.arc(px, py, 1.6, 0, Math.PI * 2);
        c.fill();
      }
    };

    const drawAutomataRing = (c: CanvasRenderingContext2D, s: number) => {
      // Concentric acceptance state rings (formal automata)
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.stroke();

      c.beginPath();
      c.arc(0, 0, s * 0.72, 0, Math.PI * 2);
      c.stroke();

      // 4 cardinal directional ticks
      c.beginPath();
      c.moveTo(0, -s * 1.2);
      c.lineTo(0, -s * 0.85);
      c.moveTo(0, s * 0.85);
      c.lineTo(0, s * 1.2);
      c.moveTo(-s * 1.2, 0);
      c.lineTo(-s * 0.85, 0);
      c.moveTo(s * 0.85, 0);
      c.lineTo(s * 1.2, 0);
      c.stroke();

      // Center node
      c.beginPath();
      c.arc(0, 0, 2, 0, Math.PI * 2);
      c.fill();
    };

    const drawRosettePetals = (c: CanvasRenderingContext2D, s: number) => {
      // 6-petal sacred geometry rosette
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const cx = Math.cos(a) * s * 0.5;
        const cy = Math.sin(a) * s * 0.5;
        c.beginPath();
        c.arc(cx, cy, s * 0.5, 0, Math.PI * 2);
        c.stroke();
      }
      c.beginPath();
      c.arc(0, 0, s, 0, Math.PI * 2);
      c.stroke();
    };

    const drawFacetedDiamond = (c: CanvasRenderingContext2D, s: number) => {
      // Faceted 8-point isometric diamond
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(s * 0.7, 0);
      c.lineTo(0, s);
      c.lineTo(-s * 0.7, 0);
      c.closePath();
      c.stroke();

      // Internal facet lines
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.moveTo(-s * 0.7, 0);
      c.lineTo(s * 0.7, 0);
      c.stroke();

      c.beginPath();
      c.arc(0, 0, s * 0.35, 0, Math.PI * 2);
      c.stroke();
    };

    const drawCrystalCross = (c: CanvasRenderingContext2D, s: number) => {
      // 4-fold crystal cross with diamond finials
      c.beginPath();
      c.moveTo(0, -s * 1.1);
      c.lineTo(s * 0.25, -s * 0.6);
      c.lineTo(0, 0);
      c.lineTo(-s * 0.25, -s * 0.6);
      c.closePath();
      c.stroke();

      c.beginPath();
      c.moveTo(0, s * 1.1);
      c.lineTo(s * 0.25, s * 0.6);
      c.lineTo(0, 0);
      c.lineTo(-s * 0.25, s * 0.6);
      c.closePath();
      c.stroke();

      c.beginPath();
      c.moveTo(-s * 1.1, 0);
      c.lineTo(-s * 0.6, s * 0.25);
      c.lineTo(0, 0);
      c.lineTo(-s * 0.6, -s * 0.25);
      c.closePath();
      c.stroke();

      c.beginPath();
      c.moveTo(s * 1.1, 0);
      c.lineTo(s * 0.6, s * 0.25);
      c.lineTo(0, 0);
      c.lineTo(s * 0.6, -s * 0.25);
      c.closePath();
      c.stroke();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const repelRadius = 150;
      const springK = 0.04;
      const friction = 0.88;

      const objects = objectsRef.current;

      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];

        // Ambient rotation
        obj.angle += obj.rotationSpeed;

        // Repel physics from mouse
        if (mouse.active) {
          const dx = obj.x - mouse.x;
          const dy = obj.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0.001) {
            const force = (1 - dist / repelRadius) * 4.8 * repelForceMultiplier;
            const nx = dx / dist;
            const ny = dy / dist;

            obj.vx += nx * force;
            obj.vy += ny * force;

            // Torque reaction: spin faster when repelled
            obj.angle += (nx - ny) * 0.02;
            obj.scale = Math.min(1.25, obj.scale + 0.04);
          }
        }

        // Spring pull towards origin lattice
        const ox = obj.originX - obj.x;
        const oy = obj.originY - obj.y;

        obj.vx += ox * springK;
        obj.vy += oy * springK;

        obj.vx *= friction;
        obj.vy *= friction;

        obj.x += obj.vx;
        obj.y += obj.vy;

        // Decay scale back to 1
        obj.scale += (1 - obj.scale) * 0.1;

        // Draw symmetric shape
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(obj.angle);
        ctx.scale(obj.scale, obj.scale);

        ctx.strokeStyle = obj.color;
        ctx.fillStyle = obj.color;
        ctx.lineWidth = 1.35;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        const s = obj.size;

        switch (obj.shapeType) {
          case 'hexagon_inscribed':
            drawHexagonInscribed(ctx, s);
            break;
          case 'octagram':
            drawOctagram(ctx, s);
            break;
          case 'automata_ring':
            drawAutomataRing(ctx, s);
            break;
          case 'rosette_petals':
            drawRosettePetals(ctx, s);
            break;
          case 'faceted_diamond':
            drawFacetedDiamond(ctx, s);
            break;
          case 'crystal_cross':
            drawCrystalCross(ctx, s);
            break;
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      targetElement.removeEventListener('mousemove', handleMouseMove as EventListener);
      targetElement.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [containerRef, repelForceMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0 block w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};
