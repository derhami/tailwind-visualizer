import React, { useState } from 'react';
import { WIDTH_UTILITIES, MAX_WIDTH_UTILITIES, HEIGHT_UTILITIES } from '../data';
import { Layout, Copy, Check } from 'lucide-react';

interface LayoutUtilitiesProps {
  dir?: 'rtl' | 'ltr';
}

export default function LayoutUtilities({ dir = 'rtl' }: LayoutUtilitiesProps) {
  const isEn = dir === 'ltr';
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      {/* SECTION 12: WIDTH UTILITIES */}
      <section id="width-utils" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Layout className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              {isEn ? '12. Width Utilities (w-*)' : '۱۲. کلاس‌های پرکاربرد عرض (Width Utilities)'}
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800/80 rounded-xl p-1 max-w-full overflow-x-auto shrink-0">
            <button onClick={() => scrollToAnchor('width-utils')} className="rounded-lg px-2.5 py-1 text-xs font-bold bg-cyan-500 text-zinc-950">
              {isEn ? 'Width (12)' : 'عرض (۱۲)'}
            </button>
            <button onClick={() => scrollToAnchor('max-width-utils')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Max Width (13)' : 'حداکثر عرض (۱۳)'}
            </button>
            <button onClick={() => scrollToAnchor('height-utils')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Height (14)' : 'ارتفاع (۱۴)'}
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="space-y-4">
            {WIDTH_UTILITIES.map((w) => {
              const isCopied = copiedKey === w.name;
              return (
                <div 
                  key={w.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 transition-all flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4"
                >
                  <div className="w-full xl:w-80 shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                        {w.name}
                      </span>
                      <button onClick={() => handleCopy(w.name)} className="text-zinc-500 hover:text-white">
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">
                      CSS: <span className="text-cyan-300">{w.val}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      {isEn ? `Spec: ${w.val}` : w.desc}
                    </p>
                  </div>

                  <div className="flex-1 bg-zinc-950 p-2 rounded-lg overflow-hidden border border-zinc-800/40">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-teal-400 h-8 rounded-md flex items-center justify-center font-mono text-[10px] text-zinc-950 font-bold shadow-md transition-all"
                      style={{ width: w.val.includes('%') || w.val.includes('vw') || w.val.includes('100%') ? w.val : (w.val.includes('rem') ? `${parseFloat(w.val)*16}px` : w.val) }}
                    >
                      {w.name} ({w.val})
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 13: MAX WIDTH UTILITIES */}
      <section id="max-width-utils" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '13. Max Width Scales (max-w-*)' : '۱۳. مقیاس حداکثر عرض (Max Width)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MAX_WIDTH_UTILITIES.map((mw) => {
              const isCopied = copiedKey === mw.name;
              return (
                <div 
                  key={mw.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                      {mw.name}
                    </span>
                    <button onClick={() => handleCopy(mw.name)} className="text-zinc-500 hover:text-white">
                      {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>

                  <div className="text-xs text-zinc-300 font-mono">
                    {isEn ? 'Max Width:' : 'حداکثر عرض:'} <strong className="text-white">{mw.val}</strong>
                  </div>
                  <p className="text-[10px] text-zinc-500">
                    {isEn ? `Calculated spec boundary: ${mw.val}` : mw.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 14: HEIGHT UTILITIES */}
      <section id="height-utils" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '14. Height Utilities (h-*)' : '۱۴. ابزارهای ارتفاع (Height Utilities)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {HEIGHT_UTILITIES.map((h) => {
              const isCopied = copiedKey === h.name;
              return (
                <div 
                  key={h.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                      {h.name}
                    </span>
                    <button onClick={() => handleCopy(h.name)} className="text-zinc-500 hover:text-white">
                      {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>

                  <div className="text-xs text-zinc-300 font-mono">
                    CSS: <span className="text-cyan-300">{h.val}</span>
                  </div>

                  <div className="h-20 bg-zinc-950 rounded-lg p-2 flex items-end justify-center border border-zinc-800/40">
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-500 to-teal-400 rounded-md flex items-center justify-center font-mono text-[9px] text-zinc-950 font-bold shadow-md"
                      style={{ height: h.val.includes('vh') || h.val.includes('%') || h.val.includes('100%') ? '100%' : (h.val.includes('rem') ? `${parseFloat(h.val)*12}px` : h.val) }}
                    >
                      {h.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
