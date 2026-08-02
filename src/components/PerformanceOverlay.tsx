import React, { useState, useEffect, useRef } from 'react';
import { Activity, X, Gauge, RefreshCw, Cpu } from 'lucide-react';

interface PerformanceOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  currentWidth: number;
  activeBreakpoint: string;
  dir?: 'rtl' | 'ltr';
}

export default function PerformanceOverlay({
  isVisible,
  onClose,
  currentWidth,
  activeBreakpoint,
  dir = 'rtl',
}: PerformanceOverlayProps) {
  const isEn = dir === 'ltr';
  const [fps, setFps] = useState<number>(60);
  const [frameTime, setFrameTime] = useState<number>(16.6);
  const [memoryUsage, setMemoryUsage] = useState<string | null>(null);

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animId = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const updateMetrics = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      frameCount.current++;

      if (delta >= 500) {
        const currentFps = Math.round((frameCount.current * 1000) / delta);
        const currentFrameTime = parseFloat((delta / frameCount.current).toFixed(1));
        
        setFps(currentFps);
        setFrameTime(currentFrameTime);

        frameCount.current = 0;
        lastTime.current = now;

        // Check memory if available (Chrome)
        if ((performance as any).memory) {
          const usedHeap = ((performance as any).memory.usedJSHeapSize / 1048576).toFixed(1);
          setMemoryUsage(`${usedHeap} MB`);
        }
      }

      animId.current = requestAnimationFrame(updateMetrics);
    };

    animId.current = requestAnimationFrame(updateMetrics);

    return () => {
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  // Determine FPS quality color
  const getFpsColor = (val: number) => {
    if (val >= 55) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 30) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <div className={`fixed top-20 ${isEn ? 'right-4' : 'left-4'} z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
      <div className="glass-panel bg-zinc-950/90 border border-zinc-800 rounded-2xl p-3 shadow-2xl backdrop-blur-xl w-64 text-zinc-100 space-y-2.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Gauge className="h-4 w-4 text-cyan-400 animate-spin-slow" />
            <span>{isEn ? 'Performance Monitor' : 'پایشگر عملکرد (FPS)'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            title={isEn ? 'Hide Performance Overlay' : 'مخفی‌سازی پایشگر عملکرد'}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Realtime Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 text-center">
          {/* FPS Gauge */}
          <div className={`p-2 rounded-xl border flex flex-col items-center justify-center ${getFpsColor(fps)}`}>
            <span className="text-[10px] text-zinc-400 block">{isEn ? 'FPS Rate' : 'نرخ فریم'}</span>
            <span className="text-lg font-black font-mono leading-tight">{fps}</span>
            <span className="text-[9px] text-zinc-400">{isEn ? 'fps target 60' : 'فریم بر ثانیه'}</span>
          </div>

          {/* Render Frame Time */}
          <div className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/60 flex flex-col items-center justify-center">
            <span className="text-[10px] text-zinc-400 block">{isEn ? 'Render Time' : 'زمان رندر'}</span>
            <span className="text-lg font-black font-mono text-cyan-400 leading-tight">{frameTime}</span>
            <span className="text-[9px] text-zinc-400">ms / frame</span>
          </div>
        </div>

        {/* Viewport Info & JS Memory */}
        <div className="space-y-1 bg-zinc-900/40 p-2 rounded-xl border border-zinc-800/50 text-[10px] font-mono text-zinc-400">
          <div className="flex justify-between items-center">
            <span>{isEn ? 'Viewport Width:' : 'عرض نمایشی:'}</span>
            <span className="text-white font-bold">{Math.round(currentWidth)}px ({activeBreakpoint.toUpperCase()})</span>
          </div>
          {memoryUsage && (
            <div className="flex justify-between items-center pt-1 border-t border-zinc-800/40">
              <span className="flex items-center gap-1 text-zinc-400">
                <Cpu className="h-3 w-3 text-indigo-400" />
                <span>{isEn ? 'JS Heap:' : 'حافظه RAM:'}</span>
              </span>
              <span className="text-indigo-300 font-bold">{memoryUsage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
