import React, { useState, useEffect, useRef } from 'react';
import { 
  Sliders, Smartphone, Tablet, Monitor, Play, Pause, Copy, Check, 
  Gauge, RefreshCw, Zap, Eye, ChevronLeft, ShieldAlert, ShieldCheck, 
  Sparkles, Layers, MoveHorizontal
} from 'lucide-react';
import { BREAKPOINTS } from '../data';

interface BreakpointsSectionProps {
  currentWidth: number;
  setCurrentWidth: (w: number) => void;
  isSimulating: boolean;
  setIsSimulating: (sim: boolean) => void;
  activeBreakpoint: {
    name: string;
    min: number;
    max: number | null;
    desc: string;
  };
  isPerformanceOverlayOpen: boolean;
  setIsPerformanceOverlayOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  dir?: 'rtl' | 'ltr';
}

interface OverflowIssue {
  tagName: string;
  className: string;
  scrollWidth: number;
  clientWidth: number;
  overflowPx: number;
  element: HTMLElement;
}

export default function BreakpointsSection({
  currentWidth,
  setCurrentWidth,
  isSimulating,
  setIsSimulating,
  activeBreakpoint,
  isPerformanceOverlayOpen,
  setIsPerformanceOverlayOpen,
  dir = 'rtl',
}: BreakpointsSectionProps) {
  const isEn = dir === 'ltr';
  const [isCopied, setIsCopied] = useState(false);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [cycleProgress, setCycleProgress] = useState(100);

  // Layout Stability Check States
  const [overflowIssues, setOverflowIssues] = useState<OverflowIssue[]>([]);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isHighlightingOverflow, setIsHighlightingOverflow] = useState(false);
  const [auditTimestamp, setAuditTimestamp] = useState<string | null>(null);

  // Ruler dragging state
  const rulerRef = useRef<HTMLDivElement>(null);
  const isDraggingRuler = useRef(false);

  // Auto-cycle sequence preset widths
  const CYCLE_PRESETS = [
    { name: 'base', width: 375 },
    { name: 'sm', width: 640 },
    { name: 'md', width: 768 },
    { name: 'lg', width: 1024 },
    { name: 'xl', width: 1280 },
    { name: '2xl', width: 1536 },
  ];

  const cycleIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycling logic every 3 seconds
  useEffect(() => {
    if (!isAutoCycling) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      setCycleProgress(100);
      return;
    }

    setIsSimulating(true);
    setCycleProgress(100);

    let startTime = Date.now();
    const duration = 3000;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setCycleProgress(remaining);
    }, 100);

    timerRef.current = setInterval(() => {
      cycleIndexRef.current = (cycleIndexRef.current + 1) % CYCLE_PRESETS.length;
      const nextPreset = CYCLE_PRESETS[cycleIndexRef.current];
      setCurrentWidth(nextPreset.width);
      startTime = Date.now();
      setCycleProgress(100);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoCycling]);

  // Layout Stability Check Auditor
  const runLayoutStabilityCheck = () => {
    const issues: OverflowIssue[] = [];
    const allElements = document.querySelectorAll<HTMLElement>('body *');

    allElements.forEach((el) => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        const style = window.getComputedStyle(el);
        const isScrollContainer = style.overflowX === 'auto' || style.overflowX === 'scroll';
        
        if (!isScrollContainer && el.scrollWidth > el.clientWidth + 3) {
          issues.push({
            tagName: el.tagName.toLowerCase(),
            className: el.className.toString().slice(0, 60),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            overflowPx: el.scrollWidth - el.clientWidth,
            element: el,
          });
        }
      }
    });

    setOverflowIssues(issues);
    setAuditTimestamp(new Date().toLocaleTimeString());
    setIsAuditModalOpen(true);
  };

  // Toggle outline highlights on offending elements
  useEffect(() => {
    if (!isHighlightingOverflow) {
      overflowIssues.forEach((issue) => {
        if (issue.element) {
          issue.element.style.outline = '';
        }
      });
      return;
    }

    overflowIssues.forEach((issue) => {
      if (issue.element) {
        issue.element.style.outline = '2px dashed #f43f5e';
        issue.element.style.outlineOffset = '-2px';
      }
    });
  }, [isHighlightingOverflow, overflowIssues]);

  // Breakpoint Ruler drag calculations
  const calculateWidthFromRulerEvent = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if (!rulerRef.current) return;
    const rect = rulerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clickX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = clickX / rect.width;
    
    // Ruler maps 320px to 1920px
    const minW = 320;
    const maxW = 1920;
    const calculatedWidth = Math.round(minW + percentage * (maxW - minW));

    setIsAutoCycling(false);
    setIsSimulating(true);
    setCurrentWidth(calculatedWidth);
  };

  const handleRulerMouseDown = (e: React.MouseEvent) => {
    isDraggingRuler.current = true;
    calculateWidthFromRulerEvent(e);

    const handleMouseMove = (ev: MouseEvent) => {
      if (isDraggingRuler.current) {
        calculateWidthFromRulerEvent(ev);
      }
    };

    const handleMouseUp = () => {
      isDraggingRuler.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const generateTailwindConfigJson = () => {
    const screensConfig: Record<string, string> = {};
    BREAKPOINTS.forEach((bp) => {
      if (bp.min > 0) {
        screensConfig[bp.name] = `${bp.min}px`;
      }
    });

    return JSON.stringify(
      {
        theme: {
          screens: screensConfig,
        },
      },
      null,
      2
    );
  };

  const handleCopyJson = () => {
    const jsonStr = generateTailwindConfigJson();
    navigator.clipboard.writeText(jsonStr);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleQuickSwitch = (width: number) => {
    setIsAutoCycling(false);
    setIsSimulating(true);
    setCurrentWidth(width);
  };

  // Calculate percentage of handle position on ruler
  const rulerPercentage = Math.max(0, Math.min(100, ((currentWidth - 320) / (1920 - 320)) * 100));

  return (
    <section id="breakpoints" className="scroll-mt-24 space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
              {isEn
                ? '1. Responsive Breakpoints & Interactive Control'
                : '۱. تراز نقاط شکست واکنش‌گرا (Responsive Breakpoints)'}
            </h2>
            <p className="text-[11px] text-zinc-400">
              {isEn
                ? 'Standard Tailwind CSS screen boundaries, interactive ruler & layout stability audit'
                : 'نقشه کامل مرزهای صفحه در تلویند CSS، خط‌کش تعاملی و عیب‌یابی سرریز'}
            </p>
          </div>
        </div>

        {/* Action Buttons in Header */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Stability Checker Button */}
          <button
            onClick={runLayoutStabilityCheck}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold transition-all shadow-sm"
            title={isEn ? 'Audit container overflow & mobile stability' : 'بررسی و عیب‌یابی سرریز عناصر و پایداری چیدمان'}
          >
            <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
            <span>{isEn ? 'Layout Stability Audit' : 'تست پایداری چیدمان'}</span>
          </button>

          {/* Toggle Performance Overlay */}
          <button
            onClick={() => setIsPerformanceOverlayOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isPerformanceOverlayOpen
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
            title={isEn ? 'Toggle FPS & Render Time Overlay' : 'نمایش / مخفی‌سازی پایشگر FPS و زمان رندر'}
          >
            <Gauge className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isEn ? 'FPS Monitor' : 'اورلی عملکرد (FPS)'}</span>
          </button>

          {/* Copy Tailwind Config JSON Button */}
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200 text-xs font-semibold transition-all"
            title={isEn ? 'Copy tailwind.config.js JSON' : 'کپی JSON پیکربندی breakpoints برای tailwind.config.js'}
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{isEn ? 'Copied JSON!' : 'کپی شد!'}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-cyan-400" />
                <span>{isEn ? 'Copy Config JSON' : 'کپی JSON کانفیگ'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-6">
        {/* Active Breakpoint Banner */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-950/70 border border-white/5 shadow-inner">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 block">
              {isEn ? 'Active System Breakpoint:' : 'نقطه شکست کنونی سیستم:'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xl font-black text-white bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent uppercase tracking-wider">
                {activeBreakpoint.name}
              </span>
              <span className="text-xs text-zinc-300">
                ({isEn
                  ? activeBreakpoint.name === 'base'
                    ? 'Small Mobiles (<640px)'
                    : activeBreakpoint.name === 'sm'
                    ? 'Large Phones (640px+)'
                    : activeBreakpoint.name === 'md'
                    ? 'Tablets (768px+)'
                    : activeBreakpoint.name === 'lg'
                    ? 'Laptops (1024px+)'
                    : activeBreakpoint.name === 'xl'
                    ? 'Desktops (1280px+)'
                    : 'Ultra-wide (1536px+)'
                  : activeBreakpoint.desc})
              </span>
            </div>
          </div>

          <div className={`${isEn ? 'text-left' : 'text-right'} text-xs text-zinc-400 leading-5`}>
            {isEn ? 'Simulated Width: ' : 'عرض شبیه‌سازی‌شده: '}{' '}
            <strong className="text-cyan-400 font-mono text-base">{Math.round(currentWidth)}px</strong>
            <div className="text-[11px] text-zinc-500">
              {isEn
                ? `Range: ${activeBreakpoint.min}px ${activeBreakpoint.max ? `to ${activeBreakpoint.max}px` : 'and above'}`
                : `محدوده این نقطه شکست: ${activeBreakpoint.min}px ${activeBreakpoint.max ? `تا ${activeBreakpoint.max}px` : 'به بالا'}`}
            </div>
          </div>
        </div>

        {/* 1. INTERACTIVE BREAKPOINT RULER WITH DRAGGABLE HANDLE */}
        <div className="space-y-3 p-4 rounded-xl bg-zinc-950/80 border border-cyan-500/20 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MoveHorizontal className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">
                {isEn ? 'Interactive Visual Breakpoint Ruler (Drag Handle):' : 'خط‌کش تعاملی و کششی نقاط شکست (Breakpoint Ruler):'}
              </span>
            </div>
            <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-sm">
              {Math.round(currentWidth)} px ({activeBreakpoint.name.toUpperCase()})
            </span>
          </div>

          {/* Interactive Ruler Container */}
          <div
            ref={rulerRef}
            onMouseDown={handleRulerMouseDown}
            className="relative h-14 bg-zinc-900/90 rounded-xl border border-zinc-800 cursor-ew-resize select-none overflow-hidden touch-none"
          >
            {/* Ruler Scale Background Ticks */}
            <div className="absolute inset-0 flex justify-between px-2 pt-1 pointer-events-none">
              {[320, 375, 480, 640, 768, 1024, 1280, 1536, 1920].map((tick) => {
                const tickPercent = ((tick - 320) / (1920 - 320)) * 100;
                const isBpMatch =
                  (tick === 640 && activeBreakpoint.name === 'sm') ||
                  (tick === 768 && activeBreakpoint.name === 'md') ||
                  (tick === 1024 && activeBreakpoint.name === 'lg') ||
                  (tick === 1280 && activeBreakpoint.name === 'xl') ||
                  (tick === 1536 && activeBreakpoint.name === '2xl');

                return (
                  <div
                    key={tick}
                    className="absolute flex flex-col items-center top-0 bottom-0"
                    style={{ left: `${tickPercent}%` }}
                  >
                    <div className={`w-0.5 ${isBpMatch ? 'h-5 bg-cyan-400' : 'h-3 bg-zinc-700'}`} />
                    <span className={`text-[9px] font-mono mt-0.5 ${isBpMatch ? 'text-cyan-300 font-bold' : 'text-zinc-500'}`}>
                      {tick}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Draggable Active Handle Indicator */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-cyan-400 z-10 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all ease-out"
              style={{ left: `${rulerPercentage}%` }}
            >
              {/* Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-4 rounded-md bg-cyan-400 border border-white text-zinc-950 flex items-center justify-center shadow-lg font-bold text-[9px] cursor-grab active:cursor-grabbing">
                ||
              </div>
            </div>
          </div>
          <p className="text-[10px] text-zinc-400 text-center">
            {isEn
              ? 'Click or drag anywhere on the ruler bar to smoothly resize the preview container.'
              : 'روی هر قسمت از خط‌کش کلیک کنید یا دستگیره را برای تغییر عرض کانتینر درگ کنید.'}
          </p>
        </div>

        {/* 2. QUICK SWITCH PANEL (Mobile / Tablet / Desktop) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>{isEn ? 'Quick Switch Presets (One-Click Viewports):' : 'پنل سوئیچ سریع ابعاد (موبایل، تبلت، دسکتاپ):'}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Mobile Button */}
            <button
              onClick={() => handleQuickSwitch(375)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isEn ? 'text-left' : 'text-right'
              } ${
                isSimulating && currentWidth === 375
                  ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border-cyan-500/60 text-white ring-2 ring-cyan-500/30 shadow-lg'
                  : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900 text-cyan-400 border border-zinc-800">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">{isEn ? 'Mobile View' : 'نمای موبایل'}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">375px (base)</span>
                </div>
              </div>
              <ChevronLeft className={`h-4 w-4 text-zinc-500 ${!isEn ? '' : 'rotate-180'}`} />
            </button>

            {/* Tablet Button */}
            <button
              onClick={() => handleQuickSwitch(768)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isEn ? 'text-left' : 'text-right'
              } ${
                isSimulating && currentWidth === 768
                  ? 'bg-gradient-to-r from-indigo-500/20 to-sky-500/10 border-indigo-500/60 text-white ring-2 ring-indigo-500/30 shadow-lg'
                  : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900 text-indigo-400 border border-zinc-800">
                  <Tablet className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">{isEn ? 'Tablet View' : 'نمای تبلت'}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">768px (md)</span>
                </div>
              </div>
              <ChevronLeft className={`h-4 w-4 text-zinc-500 ${!isEn ? '' : 'rotate-180'}`} />
            </button>

            {/* Desktop Button */}
            <button
              onClick={() => handleQuickSwitch(1440)}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isEn ? 'text-left' : 'text-right'
              } ${
                isSimulating && currentWidth === 1440
                  ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/10 border-purple-500/60 text-white ring-2 ring-purple-500/30 shadow-lg'
                  : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900 text-purple-400 border border-zinc-800">
                  <Monitor className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">{isEn ? 'Desktop View' : 'نمای دسکتاپ'}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">1440px (xl)</span>
                </div>
              </div>
              <ChevronLeft className={`h-4 w-4 text-zinc-500 ${!isEn ? '' : 'rotate-180'}`} />
            </button>
          </div>
        </div>

        {/* 3. RANGE SLIDER & AUTO-CYCLE TOOLBAR */}
        <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{isEn ? 'Smooth Custom Width Slider:' : 'اسلایدر پیوسته تنظیم عرض کانتینر:'}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                {Math.round(currentWidth)} px
              </span>
            </div>

            {/* Auto-cycle toggle button */}
            <button
              onClick={() => setIsAutoCycling(!isAutoCycling)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                isAutoCycling
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 animate-pulse shadow-md shadow-amber-500/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
              }`}
              title={isEn ? 'Auto-cycle breakpoints every 3 seconds' : 'چرخش خودکار بین نقاط شکست هر ۳ ثانیه'}
            >
              {isAutoCycling ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isEn ? 'Pause Auto-Cycle (3s)' : 'توقف چرخش خودکار (۳ ثانیه)'}</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isEn ? 'Auto-Cycle Breakpoints (3s)' : 'تست چرخش خودکار نقاط شکست (۳ ثانیه)'}</span>
                </>
              )}
            </button>
          </div>

          {/* Range Slider Control */}
          <div className="space-y-2">
            <input
              type="range"
              min={320}
              max={1920}
              step={1}
              value={currentWidth}
              onChange={(e) => {
                setIsAutoCycling(false);
                setIsSimulating(true);
                setCurrentWidth(Number(e.target.value));
              }}
              className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
            />

            {/* Slider Resolution Preset Markers */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-1">
              {[320, 480, 640, 768, 1024, 1280, 1536, 1920].map((val) => (
                <button
                  key={val}
                  onClick={() => {
                    setIsAutoCycling(false);
                    setIsSimulating(true);
                    setCurrentWidth(val);
                  }}
                  className={`hover:text-cyan-400 transition-colors ${currentWidth === val ? 'text-cyan-400 font-bold underline' : ''}`}
                >
                  {val}px
                </button>
              ))}
            </div>
          </div>

          {/* Animated Auto-Cycle Progress Bar */}
          {isAutoCycling && (
            <div className="space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-[10px] text-amber-300 font-mono">
                <span>{isEn ? 'Auto-cycling in progress...' : 'در حال چرخش و تست خودکار نقاط شکست...'}</span>
                <span>{Math.ceil((cycleProgress / 100) * 3)}s</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-100 ease-linear"
                  style={{ width: `${cycleProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 4. INTERACTIVE BREAKPOINTS TIMELINE MAP */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-zinc-400 font-bold block">
              {isEn
                ? 'Interactive Breakpoints Map (Click any zone to switch preview):'
                : 'نوار تعاملی نقاط شکست (برای تست بر روی هر بخش کلیک کنید):'}
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">
              {isEn ? 'Click any block to simulate width' : 'کلیک روی هر بخش = شبیه‌سازی دقیق عرض'}
            </span>
          </div>

          <div className="h-7 rounded-xl bg-zinc-950 overflow-hidden flex border border-white/10 p-0.5 gap-0.5 cursor-pointer shadow-inner">
            {BREAKPOINTS.map((bp) => {
              const isActive = bp.name === activeBreakpoint.name;
              const testWidth =
                bp.name === 'base'
                  ? 375
                  : bp.name === 'sm'
                  ? 640
                  : bp.name === 'md'
                  ? 768
                  : bp.name === 'lg'
                  ? 1024
                  : bp.name === 'xl'
                  ? 1280
                  : 1536;

              return (
                <button
                  key={bp.name}
                  onClick={() => {
                    setIsAutoCycling(false);
                    setIsSimulating(true);
                    setCurrentWidth(testWidth);
                  }}
                  className={`h-full relative flex items-center justify-center text-[10px] font-bold font-mono transition-all rounded-lg ${
                    isActive
                      ? 'ring-2 ring-cyan-400 shadow-lg font-black text-white scale-[1.02] z-10'
                      : 'opacity-50 hover:opacity-90 hover:scale-[1.01] text-zinc-300'
                  }`}
                  style={{
                    width:
                      bp.name === 'base'
                        ? '15%'
                        : bp.name === 'sm'
                        ? '12%'
                        : bp.name === 'md'
                        ? '15%'
                        : bp.name === 'lg'
                        ? '15%'
                        : bp.name === 'xl'
                        ? '18%'
                        : '25%',
                    backgroundColor:
                      bp.name === 'base'
                        ? '#334155'
                        : bp.name === 'sm'
                        ? '#0f766e'
                        : bp.name === 'md'
                        ? '#0369a1'
                        : bp.name === 'lg'
                        ? '#4f46e5'
                        : bp.name === 'xl'
                        ? '#7c3aed'
                        : '#be185d',
                  }}
                  title={
                    isEn
                      ? `Test ${bp.name} breakpoint (${testWidth}px)`
                      : `تست نقطه شکست ${bp.name} در عرض ${testWidth}px`
                  }
                >
                  <span className="drop-shadow uppercase tracking-wider">{bp.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. GRID OF BREAKPOINT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-white/5">
          {BREAKPOINTS.map((bp) => {
            const isActive = bp.name === activeBreakpoint.name;
            const testWidth =
              bp.name === 'base'
                ? 375
                : bp.name === 'sm'
                ? 640
                : bp.name === 'md'
                ? 768
                : bp.name === 'lg'
                ? 1024
                : bp.name === 'xl'
                ? 1280
                : 1536;

            return (
              <button
                key={bp.name}
                onClick={() => {
                  setIsAutoCycling(false);
                  setIsSimulating(true);
                  setCurrentWidth(testWidth);
                }}
                className={`flex flex-col justify-between p-3 rounded-xl border transition-all group ${
                  isEn ? 'text-left' : 'text-right'
                } ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-200 ring-2 ring-cyan-500/30 shadow-lg'
                    : 'bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      isActive ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {bp.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{bp.min}px+</span>
                </div>

                <div className={`mt-2.5 ${isEn ? 'text-left' : 'text-right'}`}>
                  <span className="text-xs font-bold block text-white group-hover:text-cyan-300 transition-colors">
                    {testWidth}px
                  </span>
                  <span className="text-[9px] text-zinc-400 block mt-0.5 line-clamp-1">
                    {isEn
                      ? bp.name === 'base'
                        ? 'Mobile'
                        : bp.name === 'sm'
                        ? 'Large Phone'
                        : bp.name === 'md'
                        ? 'Tablet'
                        : bp.name === 'lg'
                        ? 'Laptop'
                        : bp.name === 'xl'
                        ? 'Desktop'
                        : 'Ultra-Wide'
                      : bp.desc.split(' ')[0] + ' ' + (bp.desc.split(' ')[1] || '')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* LAYOUT STABILITY AUDIT MODAL */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                {overflowIssues.length === 0 ? (
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-rose-400 animate-bounce" />
                )}
                <h3 className="text-base font-bold text-white">
                  {isEn ? 'Layout Stability & Overflow Diagnostic' : 'نتایج تست پایداری چیدمان و عیب‌یابی سرریز'}
                </h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {overflowIssues.length === 0 ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs text-center space-y-1">
                  <span className="font-bold text-sm block">
                    {isEn ? '✅ Perfect Layout Stability!' : '✅ چیدمان کاملاً پایدار است!'}
                  </span>
                  <p>
                    {isEn
                      ? 'No unexpected container overflow or horizontal scroll barriers detected on this breakpoint.'
                      : 'هیچ عنصر سرریز‌کننده‌ای در این عرض پیدا نشد. صفحه کاملاً واکنش‌گرا است.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-center justify-between">
                    <div>
                      <strong>
                        {isEn
                          ? `Found ${overflowIssues.length} elements causing horizontal overflow:`
                          : `${overflowIssues.length} عنصر دارای سرریز افقی پیدا شد:`}
                      </strong>
                      <span className="text-[10px] text-zinc-400 block mt-0.5">
                        {isEn ? `Audited at ${auditTimestamp}` : `زمان تست: ${auditTimestamp}`}
                      </span>
                    </div>

                    <button
                      onClick={() => setIsHighlightingOverflow(!isHighlightingOverflow)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        isHighlightingOverflow
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {isEn
                        ? isHighlightingOverflow ? 'Hide Outlines' : 'Highlight Outlines'
                        : isHighlightingOverflow ? 'مخفی‌سازی خطوط' : 'هایلایت عناصر در صفحه'}
                    </button>
                  </div>

                  {/* List of Overflow Elements */}
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {overflowIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono flex items-center justify-between"
                      >
                        <div className="space-y-0.5 max-w-xs truncate">
                          <span className="text-cyan-400 font-bold">&lt;{issue.tagName}&gt;</span>
                          <span className="text-zinc-400 text-[10px] block truncate">
                            .{issue.className || 'no-class'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-rose-400 font-bold text-xs block">
                            +{issue.overflowPx}px overflow
                          </span>
                          <span className="text-[9px] text-zinc-500">
                            {issue.scrollWidth}px vs {issue.clientWidth}px
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-zinc-800">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 transition-all"
              >
                {isEn ? 'Close Audit' : 'بستن گزارش'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
