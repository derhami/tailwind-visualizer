import React, { useState } from 'react';
import { TYPOGRAPHY_SCALE, FONT_WEIGHTS, LETTER_SPACING, LINE_HEIGHTS } from '../data';
import { Type, Copy, Check } from 'lucide-react';

interface TypographySectionProps {
  dir?: 'rtl' | 'ltr';
}

export default function TypographySection({ dir = 'rtl' }: TypographySectionProps) {
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
      {/* SECTION 4: FONT SIZES */}
      <section id="typography" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              {isEn ? '4. Typography Scale & Font Sizes' : '۴. اندازه فونت‌ها (Font Sizes)'}
            </h2>
          </div>
          
          <div className="flex items-center gap-1 bg-zinc-950 border border-zinc-800/80 rounded-xl p-1 max-w-full overflow-x-auto shrink-0">
            <button onClick={() => scrollToAnchor('typography')} className="rounded-lg px-2.5 py-1 text-xs font-bold bg-cyan-500 text-zinc-950">
              {isEn ? 'Sizes (4)' : 'اندازه (۴)'}
            </button>
            <button onClick={() => scrollToAnchor('font-weights')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Weights (5)' : 'ضخامت (۵)'}
            </button>
            <button onClick={() => scrollToAnchor('letter-spacing')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Spacing (6)' : 'فاصله (۶)'}
            </button>
            <button onClick={() => scrollToAnchor('line-heights')} className="rounded-lg px-2.5 py-1 text-xs text-zinc-400 hover:text-white">
              {isEn ? 'Leading (7)' : 'ارتفاع (۷)'}
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-cyan-400">
              {isEn ? 'Standard Tailwind Font Sizes (Typography Scale)' : 'اندازه فونت استانداردهای تلویند (Font Sizes)'}
            </h3>
            <span className="text-[11px] text-zinc-500">
              {isEn ? 'rem scale relative to 16px root font' : 'مبنای رِم (rem) متناسب با اندازه ۱۶پیکسل روت'}
            </span>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {TYPOGRAPHY_SCALE.map((typo) => {
              const isCopied = copiedKey === typo.name;
              const previewText = isEn && typo.previewEn ? typo.previewEn : typo.preview;
              return (
                <div 
                  key={typo.name}
                  className="group relative p-4 rounded-xl hover:bg-zinc-850/30 border border-transparent hover:border-zinc-800/60 transition-all flex flex-col md:flex-row justify-between gap-4"
                >
                  <div className="space-y-1.5 w-64 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                        {typo.name}
                      </span>
                      <button
                        onClick={() => handleCopy(typo.name)}
                        className="text-zinc-500 hover:text-white transition-colors"
                        title={isEn ? 'Copy class' : 'کپی کلاس'}
                      >
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <div className="text-xs text-zinc-400">
                      {isEn ? 'Px:' : 'پیکسل:'} <strong className="text-white">{typo.px}px</strong> / {isEn ? 'Size:' : 'اندازه:'} <span className="font-mono">{typo.size}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {isEn ? 'Default Line Height:' : 'ارتفاع خط پیش‌فرض:'} {typo.lh}
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <p 
                      className={`${isEn ? 'text-left' : 'text-right'} truncate font-medium text-zinc-100`}
                      style={{ fontSize: typo.size }}
                    >
                      {previewText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: FONT WEIGHTS */}
      <section id="font-weights" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '5. Font Weights Scale' : '۵. ضخامت فونت‌ها (Font Weights)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FONT_WEIGHTS.map((fw) => {
              const isCopied = copiedKey === fw.name;
              const weightLabel = isEn && fw.textEn ? fw.textEn : fw.text;
              return (
                <div 
                  key={fw.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:border-zinc-700/80 hover:bg-zinc-950/80 transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                        {fw.name}
                      </span>
                      <button
                        onClick={() => handleCopy(fw.name)}
                        className="text-zinc-500 hover:text-white transition-colors"
                      >
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {isEn ? 'Numeric Weight:' : 'مقدار عددی:'} <strong className="text-white font-mono">{fw.weight}</strong>
                    </div>
                  </div>

                  <div className={`${isEn ? 'text-right' : 'text-left'} font-sans`}>
                    <span 
                      className="text-base text-zinc-100"
                      style={{ fontWeight: fw.weight }}
                    >
                      {weightLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: LETTER SPACING */}
      <section id="letter-spacing" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '6. Letter Spacing (Tracking)' : '۶. فاصله بین حروف (Letter Spacing)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="space-y-4">
            {LETTER_SPACING.map((ls) => {
              const isCopied = copiedKey === ls.name;
              const descText = isEn && ls.descEn ? ls.descEn : ls.desc;
              return (
                <div 
                  key={ls.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 hover:border-zinc-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="w-full sm:w-64 shrink-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 rounded px-2 py-0.5">
                        {ls.name}
                      </span>
                      <button onClick={() => handleCopy(ls.name)} className="text-zinc-500 hover:text-white">
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {isEn ? 'Value (em):' : 'مقدار ام (em):'} <strong className="text-white font-mono">{ls.val}</strong>
                    </div>
                    <div className="text-[10px] text-zinc-500">{descText}</div>
                  </div>

                  <div className={`flex-1 ${isEn ? 'text-left' : 'text-right'}`}>
                    <span 
                      className="text-base text-white tracking-widest font-mono font-medium block uppercase"
                      style={{ letterSpacing: ls.val }}
                    >
                      TAILWIND SYSTEM
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: LINE HEIGHTS */}
      <section id="line-heights" className="scroll-mt-24 space-y-6">
        <div className="border-b border-zinc-800/60 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '7. Line Heights (Leading)' : '۷. ارتفاع خطوط (Line Heights)'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="space-y-4">
            {LINE_HEIGHTS.map((lh) => {
              const isCopied = copiedKey === lh.name;
              const descText = isEn && lh.descEn ? lh.descEn : lh.desc;
              return (
                <div 
                  key={lh.name}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 hover:bg-zinc-950/80 hover:border-zinc-700/80 transition-all flex flex-col xl:flex-row justify-between gap-4"
                >
                  <div className="w-full xl:w-80 shrink-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 rounded px-2 py-0.5">
                        {lh.name}
                      </span>
                      <button onClick={() => handleCopy(lh.name)} className="text-zinc-500 hover:text-white">
                        {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <div className="text-xs text-zinc-400">
                      {isEn ? 'Leading Factor:' : 'ضریب ارتفاع:'} <strong className="text-white font-mono">{lh.val}</strong>
                    </div>
                    <div className="text-[11px] text-zinc-500 leading-5">{descText}</div>
                  </div>

                  <div className="flex-1 bg-zinc-950/60 p-3 rounded-lg border border-zinc-800/40">
                    <p 
                      className={`text-xs text-zinc-200 ${isEn ? 'text-left' : 'text-right'}`}
                      style={{ lineHeight: lh.val }}
                    >
                      {isEn
                        ? 'Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.'
                        : 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.'}
                    </p>
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
