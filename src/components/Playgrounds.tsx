import React, { useState } from 'react';
import { Code2, Settings, HelpCircle, Check, Copy } from 'lucide-react';

interface PlaygroundsProps {
  currentWidth: number;
  dir?: 'rtl' | 'ltr';
}

export default function Playgrounds({ currentWidth, dir = 'rtl' }: PlaygroundsProps) {
  const isEn = dir === 'ltr';
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
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

  // --- Flex State ---
  const [flexDirection, setFlexDirection] = useState<'flex-row' | 'flex-row-reverse' | 'flex-col' | 'flex-col-reverse'>('flex-row');
  const [justifyContent, setJustifyContent] = useState<'justify-start' | 'justify-end' | 'justify-center' | 'justify-between' | 'justify-around' | 'justify-evenly'>('justify-start');
  const [alignItems, setAlignItems] = useState<'items-start' | 'items-end' | 'items-center' | 'items-baseline' | 'items-stretch'>('items-center');
  const [flexGap, setFlexGap] = useState<'gap-0' | 'gap-2' | 'gap-4' | 'gap-6' | 'gap-8'>('gap-4');
  
  // Child 1 settings
  const [childGrow, setChildGrow] = useState<'grow' | 'grow-0'>('grow-0');
  const [childShrink, setChildShrink] = useState<'shrink' | 'shrink-0'>('shrink');
  const [childBasis, setChildBasis] = useState<'basis-auto' | 'basis-1/4' | 'basis-1/2'>('basis-auto');

  // --- Grid State ---
  const [gridCols, setGridCols] = useState<number>(4);
  const [gridGap, setGridGap] = useState<'gap-0' | 'gap-2' | 'gap-4' | 'gap-6' | 'gap-8'>('gap-4');
  const [item1ColSpan, setItem1ColSpan] = useState<number>(1);
  const [item1RowSpan, setItem1RowSpan] = useState<number>(1);
  const [gridMode, setGridMode] = useState<'standard' | 'autofit' | 'autofill'>('standard');

  const flexCode = `flex ${flexDirection} ${justifyContent} ${alignItems} ${flexGap}`;

  const getGridCode = () => {
    if (gridMode === 'autofit') return `grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] ${gridGap}`;
    if (gridMode === 'autofill') return `grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] ${gridGap}`;
    return `grid grid-cols-${gridCols} ${gridGap}`;
  };

  const getGridItem1Code = () => {
    return `col-span-${item1ColSpan} row-span-${item1RowSpan}`;
  };

  return (
    <div className="space-y-12">
      {/* SECTION 15: FLEX LAB */}
      <section id="flex-playground" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              {isEn ? '15. Interactive Flexbox Laboratory (Flex Lab)' : '۱۵. آزمایشگاه تعاملی فلکس‌باکس (Flex Lab)'}
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/60 border border-white/5 rounded-xl p-1 max-w-full overflow-x-auto shrink-0">
            <button onClick={() => scrollToAnchor('flex-playground')} className="rounded-lg px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white">
              {isEn ? 'Flex (15)' : 'فلکس (۱۵)'}
            </button>
            <button onClick={() => scrollToAnchor('grid-playground')} className="rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:text-white">
              {isEn ? 'Grid (16)' : 'گرید (۱۶)'}
            </button>
            <button onClick={() => scrollToAnchor('responsive-playground')} className="rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:text-white">
              {isEn ? 'Responsive (17)' : 'ریسپانسیو (۱۷)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-5 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider">
              {isEn ? 'Flex Controls & Alignment' : 'تنظیمات تراز و ردیف فلکس'}
            </h3>
            
            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">
                {isEn ? 'Flex Direction (flex-direction)' : 'جهت چینش (flex-direction)'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'] as const).map((dirVal) => (
                  <button
                    key={dirVal}
                    onClick={() => setFlexDirection(dirVal)}
                    className={`rounded-lg py-1.5 text-[10px] font-mono font-bold border transition-all ${
                      flexDirection === dirVal 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' 
                        : 'bg-slate-950/20 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dirVal}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">
                {isEn ? 'Justify Content (justify-content)' : 'تراز اصلی (justify-content)'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly'] as const).map((just) => (
                  <button
                    key={just}
                    onClick={() => setJustifyContent(just)}
                    className={`rounded-lg py-1.5 text-[10px] font-mono border transition-all ${
                      justifyContent === just 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold' 
                        : 'bg-slate-950/20 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {just}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">
                {isEn ? 'Align Items (align-items)' : 'تراز فرعی (align-items)'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch'] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setAlignItems(item)}
                    className={`rounded-lg py-1.5 text-[10px] font-mono border transition-all ${
                      alignItems === item 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold' 
                        : 'bg-slate-950/20 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">
                {isEn ? 'Gap between items (gap)' : 'فاصله بین آیتم‌ها (gap)'}
              </label>
              <div className="grid grid-cols-5 gap-1">
                {(['gap-0', 'gap-2', 'gap-4', 'gap-6', 'gap-8'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setFlexGap(g)}
                    className={`rounded py-1 text-[10px] font-mono border transition-all ${
                      flexGap === g 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold' 
                        : 'bg-slate-950/20 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 flex flex-col justify-between glass-panel rounded-2xl p-5 min-h-[400px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <span className="text-xs font-bold text-slate-400">
                  {isEn ? 'Live Flexbox Preview' : 'پیش‌نمایش زنده فلکس‌باکس'}
                </span>
                
                <button
                  onClick={() => handleCopy(flexCode)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-1 text-xs text-indigo-300 border border-white/5 hover:border-white/15"
                >
                  {copiedText === flexCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span className="font-mono">{flexCode}</span>
                </button>
              </div>

              <div className={`bg-slate-950/40 border border-dashed border-white/10 rounded-xl p-4 min-h-[250px] flex ${flexDirection} ${justifyContent} ${alignItems} ${flexGap} transition-all duration-300`}>
                <div className={`rounded-lg bg-indigo-500/15 border border-indigo-400 p-4 flex flex-col items-center justify-center text-xs font-bold text-indigo-300 ${childGrow} ${childShrink} ${childBasis}`}>
                  {isEn ? 'Item 1' : 'آیتم ۱'}
                </div>
                <div className="rounded-lg bg-emerald-500/15 border border-emerald-400 p-4 flex flex-col items-center justify-center text-xs font-bold text-emerald-300">
                  {isEn ? 'Item 2' : 'آیتم ۲'}
                </div>
                <div className="rounded-lg bg-purple-500/15 border border-purple-400 p-4 flex flex-col items-center justify-center text-xs font-bold text-purple-300">
                  {isEn ? 'Item 3' : 'آیتم ۳'}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 bg-slate-950/30 p-2.5 rounded-lg leading-5 mt-4">
              <strong>{isEn ? 'Tip:' : 'نکته:'}</strong> {isEn 
                ? 'Use justify-content for primary axis alignment and align-items for cross axis alignment.' 
                : 'برای همراستاسازی بهتر المان‌ها، از ترکیب تراز اصلی (justify) برای محور افقی و تراز فرعی (items) برای محور عمودی استفاده کنید.'}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 16: GRID LAB */}
      <section id="grid-playground" className="scroll-mt-24 space-y-6">
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '16. Interactive 2D Grid Laboratory (Grid Lab)' : '۱۶. آزمایشگاه تعاملی گرید دو بعدی (Grid Lab)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-5 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider">
              {isEn ? 'Grid & Column Controls' : 'تنظیمات گرید و ستون‌ها'}
            </h3>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">{isEn ? 'Grid Layout Mode' : 'حالت چیدمان شبکه'}</label>
              <div className="grid grid-cols-3 gap-1">
                {(['standard', 'autofit', 'autofill'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setGridMode(mode)}
                    className={`rounded py-1 text-[10px] border transition-all ${
                      gridMode === mode 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold' 
                        : 'bg-slate-950/20 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode === 'standard' ? (isEn ? 'Fixed' : 'ثابت') : mode === 'autofit' ? 'Auto-Fit' : 'Auto-Fill'}
                  </button>
                ))}
              </div>
            </div>

            {gridMode === 'standard' && (
              <div className="space-y-1.5">
                <label className="text-[11px] text-slate-400">{isEn ? `Columns Count (cols: ${gridCols})` : `تعداد ستون‌ها (cols: ${gridCols})`}</label>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={gridCols} 
                  onChange={(e) => setGridCols(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400">{isEn ? 'Gap' : 'فاصله (gap)'}</label>
              <div className="grid grid-cols-5 gap-1">
                {(['gap-0', 'gap-2', 'gap-4', 'gap-6', 'gap-8'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGridGap(g)}
                    className={`rounded py-1 text-[10px] font-mono border transition-all ${
                      gridGap === g 
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300 font-bold' 
                        : 'bg-slate-950/20 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/5">
              <h4 className="text-[11px] font-bold text-slate-400">{isEn ? 'Card 1 Custom Span Settings' : 'تنظیمات ابعاد کارت ۱ (آبی)'}</h4>
              
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="space-y-1">
                  <span className="text-slate-500 block">{isEn ? 'Column Span' : 'عرض ستونی (span)'}</span>
                  <select 
                    value={item1ColSpan} 
                    onChange={(e) => setItem1ColSpan(parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-white/5 rounded p-1 text-slate-300 font-mono"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>col-span-{n}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 block">{isEn ? 'Row Span' : 'ارتفاع ردیفی (span)'}</span>
                  <select 
                    value={item1RowSpan} 
                    onChange={(e) => setItem1RowSpan(parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-white/5 rounded p-1 text-slate-300 font-mono"
                  >
                    {[1, 2, 3].map(n => <option key={n} value={n}>row-span-{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 flex flex-col justify-between glass-panel rounded-2xl p-5 min-h-[400px]">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
                <span className="text-xs font-bold text-slate-400">{isEn ? 'Live 2D Grid Preview' : 'پیش‌نمایش شبکه گرید ۲ بعدی'}</span>
                
                <button
                  onClick={() => handleCopy(getGridCode())}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-950 px-3 py-1 text-xs text-indigo-300 border border-white/5 hover:border-white/15"
                >
                  {copiedText === getGridCode() ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span className="font-mono">{gridMode === 'standard' ? `grid grid-cols-${gridCols}` : 'grid auto-cols'}</span>
                </button>
              </div>

               <div 
                className={`bg-slate-950/40 border border-dashed border-white/10 rounded-xl p-4 min-h-[250px] grid ${gridGap} max-w-full overflow-x-auto`}
                style={{ 
                  gridTemplateColumns: gridMode === 'autofit' ? 'repeat(auto-fit, minmax(120px, 1fr))' 
                    : gridMode === 'autofill' ? 'repeat(auto-fill, minmax(100px, 1fr))' 
                    : `repeat(${gridCols}, minmax(0, 1fr))`
                }}
              >
                <div 
                  className="rounded-lg bg-indigo-500/15 border-2 border-indigo-400 p-4 flex flex-col items-center justify-center text-center text-xs font-bold text-indigo-300"
                  style={{ 
                    gridColumn: `span ${item1ColSpan} / span ${item1ColSpan}`,
                    gridRow: `span ${item1RowSpan} / span ${item1RowSpan}`
                  }}
                >
                  <div>{isEn ? 'Card 1 (Custom)' : 'کارت ۱ (سفارشی)'}</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-1">{getGridItem1Code()}</div>
                </div>

                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 min-h-[60px] flex items-center justify-center text-xs font-bold text-emerald-300">{isEn ? 'Card 2' : 'کارت ۲'}</div>
                <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4 min-h-[60px] flex items-center justify-center text-xs font-bold text-purple-300">{isEn ? 'Card 3' : 'کارت ۳'}</div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 min-h-[60px] flex items-center justify-center text-xs font-bold text-amber-300">{isEn ? 'Card 4' : 'کارت ۴'}</div>
                <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-4 min-h-[60px] flex items-center justify-center text-xs font-bold text-cyan-300">{isEn ? 'Card 5' : 'کارت ۵'}</div>
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4 min-h-[60px] flex items-center justify-center text-xs font-bold text-rose-300">{isEn ? 'Card 6' : 'کارت ۶'}</div>
                <div className="rounded-lg bg-teal-500/10 border border-teal-500/20 p-4 min-h-[60px] flex items-center justify-center text-xs font-bold text-teal-300">{isEn ? 'Card 7' : 'کارت ۷'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: RESPONSIVE LAB */}
      <section id="responsive-playground" className="scroll-mt-24 space-y-6">
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold text-white">
            {isEn ? '17. Responsive Class Simulator Across Breakpoints' : '۱۷. آزمایشگاه شبیه‌ساز کلاس‌های واکنش‌گرا'}
          </h2>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <p className="text-xs text-slate-400 leading-6">
            {isEn
              ? `The cards below contain responsive modifier classes. Resize your browser to observe active states toggle live. Current viewport width: `
              : `کارت‌های زیر شامل کلاس‌های تغییر حالت هستند. با تغییر عرض مانیتور، حالت‌های فعال روشن و موارد غیرفعال خاموش می‌شوند. عرض فعلی نمایشی: `}
            <strong className="text-cyan-400">{Math.round(currentWidth)}px</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-slate-950/30 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[10px] text-slate-500 font-bold font-mono">CASE 1: hidden lg:block</span>
                <h4 className="text-sm font-bold text-white mt-1">{isEn ? 'Conditional Sidebar Visibility' : 'پنهان‌سازی مشروط سایدبار'}</h4>
              </div>
              <div className="flex items-center justify-between gap-2 mt-4">
                <span className={`text-[11px] font-bold rounded px-2 py-0.5 ${currentWidth < 1024 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {isEn ? 'hidden (mobile/tablet)' : 'hidden (موبایل و تبلت)'}
                </span>
                <span className={`text-[11px] font-bold rounded px-2 py-0.5 ${currentWidth >= 1024 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {isEn ? 'lg:block (desktop)' : 'lg:block (دسکتاپ)'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/30 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[10px] text-slate-500 font-bold font-mono">CASE 2: flex flex-col md:flex-row</span>
                <h4 className="text-sm font-bold text-white mt-1">{isEn ? 'Column to Row Layout Switch' : 'تغییر توزیع ستونی به ردیفی'}</h4>
              </div>
              <div className="flex items-center justify-between gap-2 mt-4">
                <span className={`text-[11px] font-bold rounded px-2 py-0.5 ${currentWidth < 768 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {isEn ? 'flex-col (stacked)' : 'flex-col زیر هم'}
                </span>
                <span className={`text-[11px] font-bold rounded px-2 py-0.5 ${currentWidth >= 768 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {isEn ? 'md:flex-row (side by side)' : 'md:flex-row کنار هم'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/30 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div>
                <span className="text-[10px] text-slate-500 font-bold font-mono">CASE 3: text-sm md:text-2xl</span>
                <h4 className="text-sm font-bold text-white mt-1">{isEn ? 'Responsive Typography Scale' : 'اندازه متن واکنش‌گرا'}</h4>
              </div>
              <div className="flex items-center justify-between gap-2 mt-4">
                <span className={`text-[11px] font-bold rounded px-2 py-0.5 ${currentWidth < 768 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {isEn ? 'text-sm (small)' : 'text-sm (کوچک)'}
                </span>
                <span className={`text-[11px] font-bold rounded px-2 py-0.5 ${currentWidth >= 768 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-900 text-slate-500'}`}>
                  {isEn ? 'md:text-2xl (large)' : 'md:text-2xl (بزرگ)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
