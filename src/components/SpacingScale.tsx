import React, { useState } from 'react';
import { SPACING_SCALE } from '../data';
import { Move, Copy, Check } from 'lucide-react';

interface SpacingScaleProps {
  dir?: 'rtl' | 'ltr';
}

export default function SpacingScale({ dir = 'rtl' }: SpacingScaleProps) {
  const isEn = dir === 'ltr';
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <section id="spacing" className="scroll-mt-24 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2">
          <Move className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            {isEn ? '3. Spacing Scale & Utilities' : '۳. مقیاس فاصله‌ها و ابزارها (Spacing Scale)'}
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-medium">
          {isEn ? 'Tailwind 4px Grid Foundation' : 'مبنای طراحی ۴ پیکسلی تلویند'}
        </span>
      </div>

      <div className="glass-panel rounded-2xl p-6">
        <p className="text-xs text-zinc-400 leading-6 mb-6">
          {isEn
            ? 'Tailwind CSS is built on a standard 4px grid system. The default unit of 1 equals 0.25rem or 4px. Click any utility class button to copy.'
            : 'تلویند بر اساس سیستم شبکه‌ای ۴ پیکسلی بنا شده است. مقدار پیش‌فرض 1 برابر با 0.25rem یا همان 4px است. هر ردیف را می‌توانید برای کپی کردن کلاس آن کپی کنید.'}
        </p>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {SPACING_SCALE.map((space, index) => {
            const isCopied = copiedIndex === index;
            return (
              <div 
                key={space.name}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-zinc-800/30 border border-transparent hover:border-zinc-800/60 transition-all"
              >
                {/* Info block */}
                <div className="flex items-center gap-4 w-48 shrink-0">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                    {space.name}
                  </span>
                  <div className="text-xs font-semibold text-white">
                    {space.px}px
                    <span className="text-zinc-500 text-[10px] mx-1.5 font-normal">({space.rem})</span>
                  </div>
                </div>

                {/* Progress Visualizer Bar */}
                <div className="flex-1 bg-zinc-950 rounded-lg h-6 p-1 flex items-center overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full rounded-md relative group-hover:from-cyan-400 group-hover:to-cyan-200 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                    style={{ width: `${Math.min((space.px / 384) * 100, 100)}%`, minWidth: space.px > 0 ? '4px' : '0' }}
                  >
                    {space.px > 60 && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-bold text-zinc-950 px-1 rounded bg-white/70">
                        {space.px}px
                      </span>
                    )}
                  </div>
                </div>

                {/* Copier Actions */}
                <div className="flex gap-1.5 justify-end">
                  <button
                    onClick={() => handleCopy(`p-${space.name}`, index)}
                    className="flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 px-2 py-1 text-[10px] text-zinc-300 transition-all"
                  >
                    {isCopied && copiedIndex === index ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>p-{space.name}</span>
                  </button>
                  <button
                    onClick={() => handleCopy(`m-${space.name}`, index)}
                    className="flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 px-2 py-1 text-[10px] text-zinc-300 transition-all"
                  >
                    {isCopied && copiedIndex === index ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>m-{space.name}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
