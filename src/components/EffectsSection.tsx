import React, { useState } from 'react';
import { BORDER_RADIUS, SHADOW_SCALE, OPACITY_SCALE } from '../data';
import { Layers, Copy, Check } from 'lucide-react';

interface EffectsSectionProps {
  dir?: 'rtl' | 'ltr';
}

export default function EffectsSection({ dir = 'rtl' }: EffectsSectionProps) {
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
      {/* SECTION 8: BORDER RADIUS */}
      <section id="border-radius" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              {isEn ? '8. Border Radius Utilities' : '۸. شعاع گوشه حاشیه (Border Radius)'}
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800/80 rounded-xl p-1 max-w-full overflow-x-auto shrink-0">
            <button onClick={() => scrollToAnchor('border-radius')} className="rounded-lg px-2.5 py-1 text-xs font-bold bg-cyan-500 text-zinc-950">
              {isEn ? 'Radius (8)' : 'شعاع (۸)'}
            </button>
            <button onClick={() => scrollToAnchor('shadows')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Shadows (9)' : 'سایه (۹)'}
            </button>
            <button onClick={() => scrollToAnchor('opacity')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Opacity (10)' : 'شفافیت (۱۰)'}
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {BORDER_RADIUS.map((br) => {
              const isCopied = copiedKey === br.name;
              let radStyle = '0px';
              if (br.name === 'rounded-sm') radStyle = '2px';
              else if (br.name === 'rounded') radStyle = '4px';
              else if (br.name === 'rounded-md') radStyle = '6px';
              else if (br.name === 'rounded-lg') radStyle = '8px';
              else if (br.name === 'rounded-xl') radStyle = '12px';
              else if (br.name === 'rounded-2xl') radStyle = '16px';
              else if (br.name === 'rounded-3xl') radStyle = '24px';
              else if (br.name === 'rounded-full') radStyle = '9999px';

              const descText = isEn && br.descEn ? br.descEn : br.desc;

              return (
                <div 
                  key={br.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 hover:border-zinc-700/80 transition-all flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                        {br.name}
                      </span>
                      <button onClick={() => handleCopy(br.name)} className="text-zinc-500 hover:text-white">
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {isEn ? 'Value:' : 'مقدار:'} <strong className="text-white font-mono">{br.val}</strong>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-4">{descText}</p>
                  </div>

                  <div 
                    className="h-16 w-16 bg-gradient-to-tr from-cyan-500/20 to-teal-600/30 border border-cyan-500/30 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.1)]"
                    style={{ borderRadius: radStyle }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9: SHADOWS */}
      <section id="shadows" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '9. Box Shadow Scale' : '۹. پالت سایه‌های تلویند (Shadows)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="space-y-4">
            {SHADOW_SCALE.map((sh) => {
              const isCopied = copiedKey === sh.name;
              
              let shadowStyle = 'none';
              if (sh.name === 'shadow-sm') shadowStyle = '0 1px 2px 0 rgba(0, 0, 0, 0.4)';
              else if (sh.name === 'shadow') shadowStyle = '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)';
              else if (sh.name === 'shadow-md') shadowStyle = '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.6)';
              else if (sh.name === 'shadow-lg') shadowStyle = '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.7)';
              else if (sh.name === 'shadow-xl') shadowStyle = '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.8)';
              else if (sh.name === 'shadow-2xl') shadowStyle = '0 25px 50px -12px rgba(0, 0, 0, 0.9)';
              else if (sh.name === 'shadow-inner') shadowStyle = 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)';

              const descText = isEn && sh.descEn ? sh.descEn : sh.desc;

              return (
                <div 
                  key={sh.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="w-full sm:w-80 shrink-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                        {sh.name}
                      </span>
                      <button onClick={() => handleCopy(sh.name)} className="text-zinc-500 hover:text-white">
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">
                      CSS: <span className="text-[10px] text-cyan-300">{sh.val}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500">{descText}</div>
                  </div>

                  <div className="flex-1 flex justify-center py-4 bg-zinc-950 rounded-lg">
                    <div 
                      className="bg-zinc-900 border border-zinc-800 rounded-xl px-12 py-3 text-xs font-bold text-zinc-200"
                      style={{ boxShadow: shadowStyle }}
                    >
                      {isEn ? `Preview ${sh.name}` : `پیش‌نمایش ${sh.name}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: OPACITY */}
      <section id="opacity" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '10. Opacity Utilities' : '۱۰. شفافیت و غلظت (Opacity)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {OPACITY_SCALE.map((op) => {
              const isCopied = copiedKey === op.name;
              let valPercent = parseFloat(op.val) / 100;

              return (
                <div 
                  key={op.name}
                  className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 hover:border-zinc-700/85 transition-all text-center space-y-3"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-mono text-[10px] font-bold text-cyan-400">
                      {op.name}
                    </span>
                    <button onClick={() => handleCopy(op.name)} className="text-zinc-500 hover:text-white">
                      {isCopied ? <Check className="h-2.5 w-2.5 text-emerald-400" /> : <Copy className="h-2.5 w-2.5" />}
                    </button>
                  </div>
                  
                  <div className="relative h-12 rounded-lg bg-zinc-950 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-cyan-300" style={{ opacity: valPercent }} />
                    <span className="relative z-10 text-[10px] font-bold text-white font-mono">{op.val}</span>
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
