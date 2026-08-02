import React, { useState } from 'react';
import { Z_INDEX_SCALE, POSITIONS, OVERFLOWS } from '../data';
import { Layers, Copy, Check } from 'lucide-react';

interface PositioningZIndexProps {
  dir?: 'rtl' | 'ltr';
}

export default function PositioningZIndex({ dir = 'rtl' }: PositioningZIndexProps) {
  const isEn = dir === 'ltr';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeZIndex, setActiveZIndex] = useState<string>('z-20');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <section id="positioning-zindex" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            {isEn
              ? '18 - 20. Layer Stacking, Positioning & Overflow (Z-Index, Position, Overflow)'
              : '۱۸ تا ۲۰. مدیریت لایه‌ها، موقعیت و سرریز (Z-Index, Position & Overflow)'}
          </h2>
        </div>
        <span className="text-xs text-zinc-400 shrink-0">
          {isEn ? '3D Stacking & Floating Layout Inspection' : 'بررسی ویژگی‌های چیدمان سه‌بعدی و شناورسازی'}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Z-Index scale - Section 18 */}
        <div id="z-index" className="scroll-mt-24 glass-panel rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-cyan-400">
              {isEn ? '18. Stacking Order (Z-Index)' : '۱۸. ارتفاع لایه‌گذاری (Z-Index)'}
            </h3>
            <p className="text-[11px] text-zinc-400 leading-5 mt-1.5">
              {isEn
                ? 'Controls the 3D stacking order of element layers. Click any button to adjust the active card depth.'
                : 'ترتیب قرارگیری سه بعدی المان‌ها روی هم. با کلیک بر روی هر دکمه، ارتفاع کارت زرد رنگ را تغییر دهید.'}
            </p>
          </div>

          {/* Interactive Stack Visualizer */}
          <div className="relative h-44 bg-zinc-950/60 rounded-xl p-4 flex items-center justify-center overflow-hidden">
            {/* Base Red Card (Z-10) */}
            <div className={`absolute top-10 ${isEn ? 'left-10' : 'right-10'} h-20 w-32 rounded-lg bg-rose-500/80 border border-rose-400 shadow-xl flex items-center justify-center text-[10px] font-bold text-white z-10 select-none`}>
              {isEn ? 'Red Card (z-10)' : 'کارت قرمز (z-10)'}
            </div>

            {/* Interactive Amber Card */}
            <div 
              className={`absolute top-16 ${isEn ? 'left-20' : 'right-20'} h-20 w-32 rounded-lg bg-amber-500/90 border border-amber-300 shadow-2xl flex items-center justify-center text-[10px] font-black text-zinc-950 transition-all duration-300 select-none ${activeZIndex}`}
            >
              {isEn ? `Amber (${activeZIndex})` : `کارت زرد (${activeZIndex})`}
            </div>

            {/* Base Indigo Card (Z-30) */}
            <div className={`absolute top-22 ${isEn ? 'left-32' : 'right-32'} h-20 w-32 rounded-lg bg-indigo-600/80 border border-indigo-400 shadow-xl flex items-center justify-center text-[10px] font-bold text-white z-30 select-none`}>
              {isEn ? 'Blue Card (z-30)' : 'کارت آبی (z-30)'}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 block font-bold">
              {isEn ? 'Select active z-index:' : 'انتخاب ارتفاع زرد:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Z_INDEX_SCALE.map((z) => (
                <button
                  key={z.name}
                  onClick={() => setActiveZIndex(z.name)}
                  className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                    activeZIndex === z.name
                      ? 'bg-amber-400 text-zinc-950 shadow-md'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {z.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Position mode - Section 19 */}
        <div id="positioning" className="scroll-mt-24 glass-panel rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-cyan-400">
              {isEn ? '19. Positioning (position)' : '۱۹. موقعیت المان (Position)'}
            </h3>
            <p className="text-[11px] text-zinc-400 leading-5 mt-1.5">
              {isEn
                ? 'Defines how an element is positioned in the DOM flow relative to parent elements.'
                : 'نحوه قرارگیری المان در جریان صفحه نسبت به المان‌های والدین.'}
            </p>
          </div>

          <div className="space-y-2">
            {POSITIONS.map((p) => {
              const isCopied = copiedKey === p.name;
              return (
                <div key={p.name} className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 mx-2 font-mono">({p.val})</span>
                  </div>
                  <button onClick={() => handleCopy(p.name)} className="text-zinc-500 hover:text-white">
                    {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overflow mode - Section 20 */}
        <div id="overflow" className="scroll-mt-24 glass-panel rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-cyan-400">
              {isEn ? '20. Overflow Handling' : '۲۰. سرریز محتوا (Overflow)'}
            </h3>
            <p className="text-[11px] text-zinc-400 leading-5 mt-1.5">
              {isEn
                ? 'Manages content scrolling or clipping when content exceeds element bounds.'
                : 'مدیریت نحوه نمایش محتوای اضافی از کادر بیرونی المان.'}
            </p>
          </div>

          <div className="space-y-2">
            {OVERFLOWS.map((o) => {
              const isCopied = copiedKey === o.name;
              return (
                <div key={o.name} className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded px-2 py-0.5">
                      {o.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 mx-2 font-mono">({o.val})</span>
                  </div>
                  <button onClick={() => handleCopy(o.name)} className="text-zinc-500 hover:text-white">
                    {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
