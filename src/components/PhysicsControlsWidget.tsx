import React, { useState } from 'react';
import { Magnet, Sparkles, MousePointer, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';

interface PhysicsControlsWidgetProps {
  cursorEnabled: boolean;
  onToggleCursor: () => void;
  repelMultiplier: number;
  onChangeRepelMultiplier: (val: number) => void;
}

export const PhysicsControlsWidget: React.FC<PhysicsControlsWidgetProps> = ({
  cursorEnabled,
  onToggleCursor,
  repelMultiplier,
  onChangeRepelMultiplier,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-12 right-3 z-40">
      <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-md p-2 text-xs font-mono transition-all">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-2 py-1 text-slate-700 hover:text-slate-900 font-semibold"
          title="Interactive Effects & Physics"
        >
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <Magnet className="w-3.5 h-3.5 text-sky-500" />
          <span>Physics & Neon</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-200 space-y-2.5 px-2 pb-1 w-56">
            {/* Repelling force slider */}
            <div>
              <div className="flex justify-between items-center text-[11px] text-slate-600 mb-1">
                <span>CS Repel Force:</span>
                <strong className="text-slate-900 font-bold">{repelMultiplier}x</strong>
              </div>
              <input
                type="range"
                min="0.4"
                max="2.5"
                step="0.1"
                value={repelMultiplier}
                onChange={(e) => onChangeRepelMultiplier(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
            </div>

            {/* Neon Cursor toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-600 flex items-center gap-1">
                <MousePointer className="w-3 h-3 text-pink-500" />
                Neon Cursor:
              </span>
              <button
                onClick={onToggleCursor}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                  cursorEnabled
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {cursorEnabled ? 'ACTIVE' : 'OFF'}
              </button>
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              Move cursor near binary numbers &amp; &lt;&gt; symbols in the background to repel them!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
