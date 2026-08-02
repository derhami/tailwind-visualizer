import React, { useState } from 'react';
import { CONTAINER_SPECS } from '../data';
import { Eye, MousePointerClick, RefreshCw } from 'lucide-react';

interface ContainerVisualizerProps {
  currentWidth: number;
  currentBreakpoint: string;
  dir?: 'rtl' | 'ltr';
}

export default function ContainerVisualizer({ currentWidth, currentBreakpoint, dir = 'rtl' }: ContainerVisualizerProps) {
  const isEn = dir === 'ltr';
  const [selectedBpOverride, setSelectedBpOverride] = useState<string | null>(null);

  // Auto spec based on current window width
  const autoSpec = CONTAINER_SPECS.find(spec => {
    if (spec.bp === 'sm' && currentWidth >= 640 && currentWidth < 768) return true;
    if (spec.bp === 'md' && currentWidth >= 768 && currentWidth < 1024) return true;
    if (spec.bp === 'lg' && currentWidth >= 1024 && currentWidth < 1280) return true;
    if (spec.bp === 'xl' && currentWidth >= 1280 && currentWidth < 1536) return true;
    if (spec.bp === '2xl' && currentWidth >= 1536) return true;
    return false;
  }) || { bp: 'base', width: '100%', padding: '16px (1rem)', cols: 4, gutter: '16px (1rem)' };

  // Use selected override or auto spec
  const activeBpName = selectedBpOverride || autoSpec.bp;
  const activeSpec = CONTAINER_SPECS.find(s => s.bp === activeBpName) || autoSpec;

  // Calculate container width based on active breakpoint
  let containerMaxWidth = currentWidth;
  if (selectedBpOverride) {
    if (selectedBpOverride === '2xl') containerMaxWidth = 1536;
    else if (selectedBpOverride === 'xl') containerMaxWidth = 1280;
    else if (selectedBpOverride === 'lg') containerMaxWidth = 1024;
    else if (selectedBpOverride === 'md') containerMaxWidth = 768;
    else if (selectedBpOverride === 'sm') containerMaxWidth = 640;
    else containerMaxWidth = 375;
  } else {
    if (currentWidth >= 1536) containerMaxWidth = 1536;
    else if (currentWidth >= 1280) containerMaxWidth = 1280;
    else if (currentWidth >= 1024) containerMaxWidth = 1024;
    else if (currentWidth >= 768) containerMaxWidth = 768;
    else if (currentWidth >= 640) containerMaxWidth = 640;
    else containerMaxWidth = currentWidth;
  }

  // Padding value
  let paddingVal = 16;
  if (activeBpName === '2xl') paddingVal = 48;
  else if (activeBpName === 'xl') paddingVal = 40;
  else if (activeBpName === 'lg') paddingVal = 32;
  else if (activeBpName === 'md') paddingVal = 24;
  else if (activeBpName === 'sm') paddingVal = 16;

  const contentWidth = containerMaxWidth - (paddingVal * 2);
  const outerMargin = Math.max((currentWidth - containerMaxWidth) / 2, 0);

  return (
    <section id="container" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            {isEn ? '2. Official Container & Breakpoint Inspector (Container)' : '۲. کانتینر رسمی و رفتارهای ریسپانسیو (Container)'}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedBpOverride && (
            <button
              onClick={() => setSelectedBpOverride(null)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
            >
              <RefreshCw className="h-3 w-3" />
              <span>{isEn ? 'Reset to Auto Viewport' : 'بازگشت به عرض زنده مرورگر'}</span>
            </button>
          )}
          <span className="badge rounded-xl px-2.5 py-1 text-[11px] bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
            {isEn ? 'Official Spec' : 'رسمی'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Specifications List */}
        <div className="glass-panel rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-400 tracking-wider">
              {isEn ? 'Tailwind Container Specs' : 'مشخصات فنی کانتینر تلویند'}
            </h3>
            <span className="text-[10px] text-cyan-400 flex items-center gap-1">
              <MousePointerClick className="h-3 w-3" />
              {isEn ? 'Click to inspect' : 'کلیک کنید'}
            </span>
          </div>

          <div className="space-y-2.5">
            {CONTAINER_SPECS.map((spec) => {
              const isActive = spec.bp === activeBpName;
              return (
                <button
                  key={spec.bp} 
                  onClick={() => setSelectedBpOverride(spec.bp)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border text-right ${
                    isActive 
                      ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-200 ring-2 ring-cyan-500/30 shadow-lg' 
                      : 'bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                      isActive ? 'bg-cyan-500 text-zinc-950 font-bold' : 'bg-zinc-900 text-zinc-400'
                    }`}>
                      {spec.bp}
                    </span>
                    <span className="text-xs font-semibold">
                      {isEn ? `Width: ${spec.width}` : `عرض کانتینر: ${spec.width}`}
                    </span>
                  </div>
                  <div className="text-right text-[10px] space-y-0.5 opacity-85">
                    <div>{isEn ? `Padding: ${spec.padding}` : `پدینگ: ${spec.padding}`}</div>
                    <div>{isEn ? `Cols: ${spec.cols}` : `ستون‌ها: ${spec.cols} ستون`}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Metrics Display */}
        <div className="xl:col-span-2 glass-panel rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/60 pb-3">
              <h3 className="text-xs font-bold text-zinc-400 tracking-wider">
                {isEn 
                  ? `Container Specs Inspection (${selectedBpOverride ? `Fixed: ${selectedBpOverride}` : `Live Viewport: ${Math.round(currentWidth)}px`})`
                  : `اندازه‌گیری تعاملی کانتینر (${selectedBpOverride ? `بررسی اختصاصی: ${selectedBpOverride}` : `عرض مرورگر: ${Math.round(currentWidth)}px`})`}
              </h3>
              
              {selectedBpOverride ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {isEn ? `Inspecting ${selectedBpOverride} spec` : `در حال بررسی مشخصات نسخه ${selectedBpOverride}`}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {isEn ? 'Syncing with Viewport' : 'همگام با اندازه مرورگر'}
                </span>
              )}
            </div>

            <p className="mt-2.5 text-xs text-zinc-400 leading-6">
              {isEn 
                ? 'Select any breakpoint above (sm, md, lg, xl, 2xl) to preview its dimensions, margins, and padding specs needed for mobile and tablet responsive layouts directly on your desktop.'
                : 'برای مشاهده اطلاعات طراحی نسخه موبایل یا تبلت رو هر کدام از نقاط شکست بالا کلیک کنید تا متغیرها، مارجین و پدینگ آن بدون نیاز به تغییر سایز مرورگر نمایش داده شود.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-400 block">{isEn ? 'Container Max Width' : 'حداکثر عرض کانتینر'}</span>
              <span className="text-sm font-bold text-emerald-400 block mt-1">{containerMaxWidth}px</span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-400 block">{isEn ? 'Content Net Width' : 'عرض خالص محتوا'}</span>
              <span className="text-sm font-bold text-cyan-400 block mt-1">{contentWidth > 0 ? contentWidth : 0}px</span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-400 block">{isEn ? 'Outer Margin' : 'حاشیه بیرونی (Margin)'}</span>
              <span className="text-sm font-bold text-amber-400 block mt-1">{Math.round(outerMargin)}px</span>
            </div>
            <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-400 block">{isEn ? 'Inner Padding' : 'پدینگ داخلی (Padding)'}</span>
              <span className="text-sm font-bold text-rose-400 block mt-1">{paddingVal}px</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded visual board matching requirement */}
      <div className="glass-panel rounded-2xl p-4 overflow-hidden relative min-h-[220px]">
        <div className="absolute top-2 right-2 text-[10px] text-zinc-500 font-mono">
          {isEn ? 'LAYOUT DIAGRAM' : 'دیاگرام تعاملی کانتینر'}
        </div>
        
        {/* Left Margin Visualization */}
        <div 
          className="absolute top-0 bottom-0 bg-amber-500/10 border-l border-dashed border-amber-500/30 flex items-center justify-center text-[10px] text-amber-500"
          style={{ right: 0, width: `${(outerMargin / currentWidth) * 100}%` }}
        >
          {outerMargin > 30 && <span>{isEn ? `Margin ${Math.round(outerMargin)}px` : `مارجین ${Math.round(outerMargin)}px`}</span>}
        </div>

        {/* Right Margin Visualization */}
        <div 
          className="absolute top-0 bottom-0 bg-amber-500/10 border-r border-dashed border-amber-500/30 flex items-center justify-center text-[10px] text-amber-500"
          style={{ left: 0, width: `${(outerMargin / currentWidth) * 100}%` }}
        >
          {outerMargin > 30 && <span>{isEn ? `Margin ${Math.round(outerMargin)}px` : `مارجین ${Math.round(outerMargin)}px`}</span>}
        </div>

        {/* Central Container Space */}
        <div 
          className="absolute top-0 bottom-0 bg-white/[0.02] border-x-2 border-emerald-500"
          style={{ 
            right: `${(outerMargin / currentWidth) * 100}%`, 
            left: `${(outerMargin / currentWidth) * 100}%` 
          }}
        >
          {/* Left Padding Shade */}
          <div 
            className="absolute top-0 bottom-0 bg-rose-500/10 border-l border-dashed border-rose-500/30 flex items-center justify-center text-[9px] text-rose-400"
            style={{ right: 0, width: `${(paddingVal / containerMaxWidth) * 100}%` }}
          >
            {paddingVal > 20 && <span>{paddingVal}px</span>}
          </div>

          {/* Right Padding Shade */}
          <div 
            className="absolute top-0 bottom-0 bg-rose-500/10 border-r border-dashed border-rose-500/30 flex items-center justify-center text-[9px] text-rose-400"
            style={{ left: 0, width: `${(paddingVal / containerMaxWidth) * 100}%` }}
          >
            {paddingVal > 20 && <span>{paddingVal}px</span>}
          </div>

          {/* Clean Columns Grid */}
          <div 
            className="absolute top-10 bottom-10 left-0 right-0 grid gap-3 px-1"
            style={{ 
              gridTemplateColumns: `repeat(${activeSpec.cols}, minmax(0, 1fr))`,
              marginRight: `${(paddingVal / containerMaxWidth) * 100}%`,
              marginLeft: `${(paddingVal / containerMaxWidth) * 100}%`
            }}
          >
            {Array.from({ length: activeSpec.cols }).map((_, i) => (
              <div key={i} className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[10px] text-cyan-300 font-bold">
                C{i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
