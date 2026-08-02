import React, { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, RotateCw, X, ZoomIn } from 'lucide-react';

interface DevicePreset {
  id: string;
  nameFa: string;
  nameEn: string;
  category: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
  icon: any;
  bp: string;
}

const DEVICE_PRESETS: DevicePreset[] = [
  { id: 'iphone-se', nameFa: 'آیفون SE (375px)', nameEn: 'iPhone SE (375px)', category: 'mobile', width: 375, height: 667, icon: Smartphone, bp: 'base' },
  { id: 'iphone-15', nameFa: 'آیفون ۱۵ پرو (393px)', nameEn: 'iPhone 15 Pro (393px)', category: 'mobile', width: 393, height: 852, icon: Smartphone, bp: 'base' },
  { id: 'ipad-mini', nameFa: 'آی‌پد مینی (768px)', nameEn: 'iPad Mini (768px)', category: 'tablet', width: 768, height: 1024, icon: Tablet, bp: 'md' },
  { id: 'ipad-pro', nameFa: 'آی‌پد پرو / لپ‌تاپ (1024px)', nameEn: 'iPad Pro / Laptop (1024px)', category: 'desktop', width: 1024, height: 1366, icon: Monitor, bp: 'lg' },
  { id: 'macbook', nameFa: 'مک‌بوک / دسکتاپ (1280px)', nameEn: 'MacBook / Desktop (1280px)', category: 'desktop', width: 1280, height: 800, icon: Monitor, bp: 'xl' },
  { id: 'desktop-full', nameFa: 'مانیتور بزرگ (1536px)', nameEn: 'Large Monitor (1536px)', category: 'desktop', width: 1536, height: 960, icon: Monitor, bp: '2xl' }
];

interface DeviceSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  initialWidth?: number;
  dir?: 'rtl' | 'ltr';
}

export default function DeviceSimulatorModal({
  isOpen,
  onClose,
  activeSection,
  initialWidth = 375,
  dir = 'rtl'
}: DeviceSimulatorModalProps) {
  const isEn = dir === 'ltr';

  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(() => {
    const found = DEVICE_PRESETS.find(d => Math.abs(d.width - initialWidth) < 50);
    return found || DEVICE_PRESETS[0];
  });

  const [isLandscape, setIsLandscape] = useState(false);
  const [scale, setScale] = useState<number>(1);

  // Update selected device if initialWidth changes
  useEffect(() => {
    if (initialWidth) {
      const match = DEVICE_PRESETS.find(d => Math.abs(d.width - initialWidth) < 50);
      if (match) setSelectedDevice(match);
    }
  }, [initialWidth]);

  if (!isOpen) return null;

  // Compute effective width & height based on orientation
  const currentWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const currentHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  // Iframe URL with clean target hash section
  const iframeSrc = `${window.location.origin}${window.location.pathname}?simulated_frame=true#${activeSection || 'breakpoints'}`;

  // Helper to determine breakpoint badge
  const getBreakpointBadge = (w: number) => {
    if (w < 640) return { name: 'base (< 640px)', color: 'bg-slate-800 text-slate-300' };
    if (w < 768) return { name: 'sm (640px)', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' };
    if (w < 1024) return { name: 'md (768px)', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' };
    if (w < 1280) return { name: 'lg (1024px)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
    if (w < 1536) return { name: 'xl (1280px)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    return { name: '2xl (1536px)', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' };
  };

  const bpInfo = getBreakpointBadge(currentWidth);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/95 backdrop-blur-2xl text-zinc-100 animate-in fade-in duration-200 overflow-hidden">
      {/* Top Controls Toolbar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-950 px-4 sm:px-6 z-10">
        {/* Device Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div className={`${isEn ? 'text-left' : 'text-right'} hidden sm:block`}>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              {isEn ? 'Real Device Simulator' : 'شبیه‌ساز واقعی دستگاه‌های همراه'}
              <span className="badge rounded px-1.5 py-0.5 text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {isEn ? 'Live CSS Responsive' : 'پاسخ‌گویی واقعی CSS'}
              </span>
            </h2>
            <p className="text-[10px] text-zinc-400">
              {isEn ? 'Inspect responsive breakpoints in standard screen sizes' : 'تست دقیق رفتار breakpointها در ابعاد استانداردهای موبایل و تبلت'}
            </p>
          </div>
        </div>

        {/* Device Selectors & Controls */}
        <div className="flex items-center gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 max-w-xs sm:max-w-none overflow-x-auto">
            {DEVICE_PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isActive = selectedDevice.id === preset.id;
              const name = isEn ? preset.nameEn : preset.nameFa;

              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedDevice(preset);
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                  title={`${name} (${preset.width}x${preset.height})`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{name.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-75">{preset.width}px</span>
                </button>
              );
            })}
          </div>

          <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

          {/* Orientation Toggle Button */}
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              isLandscape 
                ? 'bg-indigo-600 text-white border-indigo-500' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white'
            }`}
            title={isEn ? 'Toggle Landscape / Portrait' : 'چرخش دستگاه (افقی / عمودی)'}
          >
            <RotateCw className={`h-4 w-4 transition-transform ${isLandscape ? 'rotate-90 text-white' : 'text-zinc-400'}`} />
            <span className="hidden sm:inline">{isLandscape ? (isEn ? 'Landscape' : 'حالت افقی') : (isEn ? 'Portrait' : 'حالت عمودی')}</span>
          </button>

          {/* Zoom Scale Selector */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-900 rounded-xl p-1 border border-zinc-800">
            <ZoomIn className="h-3.5 w-3.5 text-zinc-500 mr-1" />
            {([0.75, 0.9, 1] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`rounded px-2 py-0.5 text-[10px] font-mono transition-all ${
                  scale === s ? 'bg-zinc-800 text-cyan-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>
        </div>

        {/* Close Modal Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 transition-all"
            title={isEn ? 'Close simulator' : 'بستن شبیه‌ساز'}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Preview Workspace Stage */}
      <div className="relative flex-1 overflow-auto bg-[radial-gradient(#27272a_1px,transparent_1px)] [bg-size:16px_16px] p-4 sm:p-8 flex flex-col items-center justify-center">
        {/* Device Information Header Badge */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-xs bg-zinc-900/90 border border-zinc-800/80 px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">{isEn ? 'Device:' : 'دستگاه:'}</span>
            <span className="font-bold text-white">{isEn ? selectedDevice.nameEn : selectedDevice.nameFa}</span>
          </div>
          <div className="h-3 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">{isEn ? 'Dimensions:' : 'ابعاد:'}</span>
            <span className="font-mono text-cyan-400 font-bold">{currentWidth} x {currentHeight} px</span>
          </div>
          <div className="h-3 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">{isEn ? 'Active Breakpoint:' : 'نقطه شکست:'}</span>
            <span className={`badge rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${bpInfo.color}`}>
              {bpInfo.name}
            </span>
          </div>
        </div>

        {/* Device Outer Frame (Bezel) */}
        <div 
          className="relative transition-all duration-300 ease-out shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-[40px] border-[12px] border-zinc-900 bg-zinc-950 p-1 ring-1 ring-white/10"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
        >
          {/* Simulated Speaker / Camera Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 h-4 w-28 bg-zinc-900 rounded-full flex items-center justify-center gap-2 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-zinc-950 border border-zinc-800" />
            <div className="h-1.5 w-10 rounded-full bg-zinc-950 border border-zinc-800" />
          </div>

          {/* Simulated Iframe Frame viewport */}
          <div 
            className="overflow-hidden rounded-[28px] bg-zinc-950 relative"
            style={{
              width: `${currentWidth}px`,
              height: `${currentHeight}px`
            }}
          >
            <iframe
              src={iframeSrc}
              title="Tailwind Responsive Device Simulator"
              className="w-full h-full border-0"
              style={{
                width: `${currentWidth}px`,
                height: `${currentHeight}px`
              }}
            />
          </div>

          {/* Home Bar Indicator at bottom of mobile */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 h-1 w-32 bg-zinc-700/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}
