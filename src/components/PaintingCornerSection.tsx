import React, { useState, useRef, useEffect } from 'react';
import { Palette, Sparkles, RotateCcw, Download, Brush, Heart, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

const PASTEL_PALETTES = [
  { name: 'Sakura Pink', color: '#f472b6', bg: 'bg-pink-400' },
  { name: 'Sky Blue', color: '#38bdf8', bg: 'bg-sky-400' },
  { name: 'Mint Leaf', color: '#4ade80', bg: 'bg-emerald-400' },
  { name: 'Buttercup', color: '#facc15', bg: 'bg-amber-400' },
  { name: 'Lavender', color: '#c084fc', bg: 'bg-purple-400' },
  { name: 'Warm Peach', color: '#fb923c', bg: 'bg-orange-400' },
  { name: 'Slate Ink', color: '#334155', bg: 'bg-slate-700' },
];

const PRESET_ARTWORKS = [
  {
    id: 1,
    title: 'Delhi Autumn Canopy',
    medium: 'Digital Watercolor & Pastel Wash',
    tags: ['Atmospheric', 'Light & Shade', 'DTU Campus'],
    bgGradient: 'from-amber-100 via-pink-100 to-sky-100',
    description: 'A study in golden afternoon light filtering through foliage, blending soft yellow and gentle amber hues.',
  },
  {
    id: 2,
    title: 'Automata in Pastel Hues',
    medium: 'Geometric Acrylic & Algorithmic Geometry',
    tags: ['CS Theory', 'Geometric', 'Pastel Pink & Sky'],
    bgGradient: 'from-sky-100 via-purple-100 to-pink-100',
    description: 'Visualizing state transitions and topological closures as concentric ripples of pastel watercolor.',
  },
  {
    id: 3,
    title: 'Midnight Blossom & Cat Nap',
    medium: 'Soft Gouache on Digital Canvas',
    tags: ['Character Art', 'Whimsical', 'Lavender'],
    bgGradient: 'from-purple-100 via-pink-100 to-amber-100',
    description: 'A cozy sleeping feline curled beneath blooming wisteria, capturing tranquility and quiet reflection.',
  },
];

export const PaintingCornerSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState('#f472b6');
  const [brushSize, setBrushSize] = useState(8);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeCount, setStrokeCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'canvas' | 'gallery'>('canvas');

  // Initialize canvas with clean white background
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add faint subtle greeting guide
    ctx.font = '14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#cbd5e1';
    ctx.textAlign = 'center';
    ctx.fillText('Click & drag to paint with soft pastel watercolors.', canvas.width / 2, canvas.height / 2);
    setStrokeCount(0);
  };

  useEffect(() => {
    clearCanvas();
  }, []);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);

    // If first stroke, clear placeholder text
    if (strokeCount === 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setStrokeCount((prev) => prev + 1);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Soft watercolor bleed effect
    ctx.shadowColor = selectedColor;
    ctx.shadowBlur = brushSize * 0.4;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `shreya-painting-art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f472b6', '#38bdf8', '#4ade80', '#facc15'],
    });
  };

  return (
    <section id="creative-art-studio" className="relative py-20 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-semibold mb-3">
            <Palette className="w-3.5 h-3.5 text-pink-500" />
            <span>Personal Passion • &quot;My hobby is painting&quot;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Creative Art Corner &amp; Pastel Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5">
            At Delhi Technological University, I explore the science of computation. On canvas, I celebrate the beauty of color, light, and emotion.
          </p>

          {/* Mode Switcher */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'canvas'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Brush className="w-3.5 h-3.5" />
              Interactive Pastel Easel
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Artwork Gallery
            </button>
          </div>
        </div>

        {activeTab === 'canvas' ? (
          /* Interactive Paint Easel */
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
              {/* Color Swatches */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-slate-500 mr-1">Palette:</span>
                {PASTEL_PALETTES.map((swatch) => (
                  <button
                    key={swatch.name}
                    onClick={() => setSelectedColor(swatch.color)}
                    style={{ backgroundColor: swatch.color }}
                    className={`w-6 h-6 rounded-md transition-all border ${
                      selectedColor === swatch.color
                        ? 'border-slate-900 ring-2 ring-slate-900/20 shadow-xs'
                        : 'border-slate-200 hover:scale-105'
                    }`}
                    title={swatch.name}
                  />
                ))}
              </div>

              {/* Brush size and actions */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 text-xs">
                  <span className="font-mono text-slate-500">Size:</span>
                  <input
                    type="range"
                    min="3"
                    max="28"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-20 accent-slate-900 cursor-pointer h-1.5"
                  />
                  <span className="font-mono font-bold text-slate-700 w-4 text-center">{brushSize}</span>
                </div>

                <button
                  onClick={clearCanvas}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1.5"
                  title="Clear canvas"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear
                </button>

                <button
                  onClick={downloadArtwork}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-2xs"
                  title="Download your drawing"
                >
                  <Download className="w-3.5 h-3.5 text-slate-300" />
                  Save Art
                </button>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="relative mt-4 w-full h-[360px] sm:h-[420px] rounded-lg border border-slate-200 bg-white overflow-hidden touch-none cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={900}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full block"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Brush dynamics: Soft pastel watercolor wash</span>
              <span>{strokeCount > 0 ? `${strokeCount} strokes drawn` : 'Ready for your brush'}</span>
            </div>
          </div>
        ) : (
          /* Artwork Gallery */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESET_ARTWORKS.map((art) => (
              <div
                key={art.id}
                className="group rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Artwork Canvas Simulation */}
                <div
                  className={`h-52 bg-gradient-to-br ${art.bgGradient} p-6 flex flex-col justify-between relative overflow-hidden border-b border-slate-100`}
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[11px] font-mono text-slate-700 font-semibold border border-slate-200/60">
                      Artwork #{art.id}
                    </span>
                    <span className="p-1.5 rounded-full bg-white/80 text-pink-500">
                      <Heart className="w-3.5 h-3.5 fill-pink-400" />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-pink-700 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-600">{art.medium}</p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">{art.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    {art.tags.map((tag, tI) => (
                      <span
                        key={tI}
                        className="px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-mono text-slate-600 border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
