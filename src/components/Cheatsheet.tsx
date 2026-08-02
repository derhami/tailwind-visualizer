import React, { useState } from 'react';
import { CHEATSHEETS } from '../data';
import { Copy, Check, Info, Map } from 'lucide-react';

interface CheatsheetProps {
  currentBreakpoint: string;
  currentWidth: number;
  dir?: 'rtl' | 'ltr';
}

export default function Cheatsheet({ currentBreakpoint, currentWidth, dir = 'rtl' }: CheatsheetProps) {
  const isEn = dir === 'ltr';
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Section 22: Calculated Design Tokens
  let containerWidth = '100%';
  if (currentWidth >= 1536) containerWidth = '1536px';
  else if (currentWidth >= 1280) containerWidth = '1280px';
  else if (currentWidth >= 1024) containerWidth = '1024px';
  else if (currentWidth >= 768) containerWidth = '768px';
  else if (currentWidth >= 640) containerWidth = '640px';

  const paddingVal = currentWidth >= 1536 ? '48px (3rem)' : currentWidth >= 1280 ? '40px (2.5rem)' : currentWidth >= 1024 ? '32px (2rem)' : currentWidth >= 768 ? '32px (2rem)' : currentWidth >= 640 ? '24px (1.5rem)' : '16px (1rem)';
  const marginVal = currentWidth >= 1536 ? `${(currentWidth - 1536) / 2}px` : currentWidth >= 1280 ? `${(currentWidth - 1280) / 2}px` : currentWidth >= 1024 ? `${(currentWidth - 1024) / 2}px` : currentWidth >= 768 ? `${(currentWidth - 768) / 2}px` : currentWidth >= 640 ? `${(currentWidth - 640) / 2}px` : '0px';
  const columnsVal = currentWidth >= 1024 
    ? (isEn ? '12 Columns' : '۱۲ ستون')
    : currentWidth >= 768 
    ? (isEn ? '8 Columns' : '۸ ستون')
    : currentWidth >= 640 
    ? (isEn ? '6 Columns' : '۶ ستون')
    : (isEn ? '4 Columns' : '۴ ستون');
  const gapVal = currentWidth >= 1536 ? '32px (2rem)' : currentWidth >= 1280 ? '24px (1.5rem)' : currentWidth >= 1024 ? '24px (1.5rem)' : currentWidth >= 768 ? '20px (1.25rem)' : currentWidth >= 640 ? '20px (1.25rem)' : '16px (1rem)';

  return (
    <section id="cheatsheet" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Section 21: Common combinations cheatsheet */}
        <div className="xl:col-span-2 glass-panel rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-2">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                {isEn ? '21. Responsive Patterns Cheatsheet' : '۲۱. تقلب‌نامه الگوهای واکنش‌گرای پرکاربرد (Cheatsheet)'}
              </h3>
            </div>
            <span className="text-[10px] text-zinc-500 shrink-0">
              {isEn ? 'Modern Tailwind Layout Blueprints' : 'الگوهای استاندارد طراحی مدرن'}
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {CHEATSHEETS.map((item, index) => {
              const isCopied = copiedIndex === index;
              return (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-bold text-zinc-200 block">
                      {isEn && item.titleEn ? item.titleEn : item.title}
                    </span>
                    <p className="text-[11px] text-zinc-400 leading-5">
                      {isEn && item.explanationEn ? item.explanationEn : item.explanation}
                    </p>
                    
                    {/* Live Preview block */}
                    <div className="mt-3 p-3 rounded bg-zinc-950/80 border border-zinc-800/60 text-xs">
                      <span className="text-[10px] text-zinc-500 block mb-1">
                        {isEn ? 'Live Interactive Preview:' : 'پیش‌نمایش زنده:'}
                      </span>
                      
                      {item.title === 'پدینگ واکنش‌گرا' && (
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded inline-block text-[11px] text-cyan-300 py-1" style={{ paddingLeft: currentWidth >= 768 ? '2rem' : '1rem', paddingRight: currentWidth >= 768 ? '2rem' : '1rem' }}>
                          {isEn ? 'Dynamic Padding Scale' : 'اندازه پدینگ متغیر است'}
                        </div>
                      )}

                      {item.title === 'اندازه فونت واکنش‌گرا' && (
                        <div className="text-white font-bold" style={{ fontSize: currentWidth >= 768 ? '1.875rem' : '1.125rem' }}>
                          {isEn ? 'Responsive Dynamic Heading Text' : 'متن من واکنش‌گراست'}
                        </div>
                      )}

                      {item.title === 'گرید ستونی واکنش‌گرا' && (
                        <div className="grid gap-2" style={{ gridTemplateColumns: currentWidth >= 1024 ? 'repeat(4, minmax(0, 1fr))' : currentWidth >= 768 ? 'repeat(2, minmax(0, 1fr))' : '1fr' }}>
                          <div className="bg-zinc-900 border border-zinc-800 p-1 text-center rounded text-[10px]">C1</div>
                          <div className="bg-zinc-900 border border-zinc-800 p-1 text-center rounded text-[10px]">C2</div>
                          {(currentWidth >= 768) && <div className="bg-zinc-900 border border-zinc-800 p-1 text-center rounded text-[10px]">C3</div>}
                          {(currentWidth >= 1024) && <div className="bg-zinc-900 border border-zinc-800 p-1 text-center rounded text-[10px]">C4</div>}
                        </div>
                      )}

                      {item.title === 'نمایش انتخابی کامپوننت' && (
                        <div className="text-[11px]">
                          {currentWidth >= 1024 ? (
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5">
                              {isEn ? 'Visible on Desktop (block)' : 'در دسکتاپ نمایش داده می‌شود (بلاک است)'}
                            </span>
                          ) : (
                            <span className="text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 rounded px-2 py-0.5">
                              {isEn ? 'Hidden on Mobile (hidden)' : 'در موبایل مخفی است (hidden)'}
                            </span>
                          )}
                        </div>
                      )}

                      {item.title === 'فلکس واکنش‌گرا' && (
                        <div className={`flex gap-2 ${currentWidth >= 768 ? 'flex-row' : 'flex-col'}`}>
                          <div className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-[10px]">
                            {isEn ? 'Item 1' : 'المان اول'}
                          </div>
                          <div className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded text-[10px]">
                            {isEn ? 'Item 2' : 'المان دوم'}
                          </div>
                        </div>
                      )}

                      {item.title === 'فاصله پویا بین المان‌ها' && (
                        <div className="flex bg-zinc-900/60 p-1.5 rounded" style={{ gap: currentWidth >= 768 ? '2rem' : '1rem' }}>
                          <div className="bg-zinc-800 h-6 w-12 rounded"></div>
                          <div className="bg-zinc-800 h-6 w-12 rounded"></div>
                        </div>
                      )}

                      {item.title === 'کارت پرمیوم برجسته' && (
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 shadow-xl hover:shadow-2xl transition-all duration-300">
                          <span className="text-white text-[10px] font-bold">
                            {isEn ? 'Elevated Luxury Card' : 'کارت لوکس آزمایشی'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    <button 
                      onClick={() => handleCopy(item.code, index)}
                      className="flex items-center gap-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 text-xs text-cyan-400 font-mono"
                    >
                      {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{item.code}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 22: Design Tokens */}
        <div id="design-tokens" className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-2 mb-4">
              <Map className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                {isEn ? '22. System Calculated Design Tokens' : '۲۲. توکن‌های کلی طراحی سیستم (Tokens)'}
              </h3>
            </div>
            <p className="text-[11px] text-zinc-400 leading-5">
              {isEn
                ? 'Calculated metrics extracted in real time from the simulated viewport width.'
                : 'مقادیر کلی و مشخصات استخراج شده از عرض نمایشی و شبیه‌سازی شده که در پروژه‌ها به کار می‌روند.'}
            </p>
          </div>

          <div className="space-y-3 mt-4 flex-1 flex flex-col justify-center">
            {[
              { label: isEn ? 'Active Breakpoint' : 'نقطه شکست اکتیو', val: currentBreakpoint, color: 'text-cyan-400 uppercase' },
              { label: isEn ? 'Viewport Width' : 'عرض مانیتور (Viewport)', val: `${Math.round(currentWidth)}px`, color: 'text-white' },
              { label: isEn ? 'Container Width' : 'عرض محفظه (Container)', val: containerWidth, color: 'text-emerald-400' },
              { label: isEn ? 'Container Padding' : 'فاصله داخلی کانتینر', val: paddingVal, color: 'text-rose-400' },
              { label: isEn ? 'Side Margins' : 'مارجین‌های کناری', val: marginVal, color: 'text-amber-400' },
              { label: isEn ? 'Grid Columns' : 'تعداد ستون‌های گرید', val: columnsVal, color: 'text-white' },
              { label: isEn ? 'Grid Gutter Gap' : 'فاصله مابین (Gutter)', val: gapVal, color: 'text-cyan-300' },
              { label: isEn ? 'Spacing Scale' : 'مقیاس فاصله‌گذاری', val: isEn ? '34 Standard Values' : '۳۴ مقدار استاندارد', color: 'text-zinc-400' },
              { label: isEn ? 'Typography Scale' : 'مقیاس تایپوگرافی', val: isEn ? '13 Default REM Sizes' : '۱۳ سایز پیش‌فرض رِم', color: 'text-zinc-400' }
            ].map((token, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                <span className="text-[11px] text-zinc-400">{token.label}</span>
                <span className={`text-xs font-bold font-mono ${token.color}`}>{token.val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
