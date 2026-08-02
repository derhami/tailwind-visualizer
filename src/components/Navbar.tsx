import React from 'react';
import { Monitor, Tablet, Smartphone, Search, Settings as SettingsIcon, Download, Sliders, RefreshCw, X, Eye } from 'lucide-react';
import { Settings } from '../types';

interface NavbarProps {
  currentWidth: number;
  setCurrentWidth: (width: number) => void;
  isSimulating: boolean;
  setIsSimulating: (sim: boolean) => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onDownloadSingleFile: () => void;
  onOpenDeviceSimulator: (width?: number) => void;
  settings: Settings;
  currentBreakpoint: string;
}

export default function Navbar({
  currentWidth,
  setCurrentWidth,
  isSimulating,
  setIsSimulating,
  onOpenSearch,
  onOpenSettings,
  onDownloadSingleFile,
  onOpenDeviceSimulator,
  settings,
  currentBreakpoint
}: NavbarProps) {
  const isEn = settings.dir === 'ltr';

  const devices = [
    { name: isEn ? 'Mobile' : 'موبایل', width: 375, icon: Smartphone, label: '375px', bp: 'sm' },
    { name: isEn ? 'Tablet' : 'تبلت', width: 768, icon: Tablet, label: '768px', bp: 'md' },
    { name: isEn ? 'Laptop' : 'لپ‌تاپ', width: 1024, icon: Monitor, label: '1024px', bp: 'lg' },
    { name: isEn ? 'Desktop' : 'دسکتاپ', width: 1440, icon: Monitor, label: '1440px', bp: 'xl' },
    { name: isEn ? 'Large' : 'صفحه بزرگ', width: 1600, icon: Monitor, label: '1600px', bp: '2xl' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg shadow-cyan-500/5">
            <svg className="h-6 w-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xs sm:text-base font-bold text-white leading-tight">
              {isEn ? 'Tailwind Visualizer' : 'ویژوالایزر تلویند'}
            </h1>
            <p className="text-[9px] sm:text-[10px] text-zinc-400">
              {isEn ? 'Interactive Design System' : 'سیستم جامع طراحی و مرجع تعاملی'}
            </p>
          </div>
        </div>

        {/* Center: Sleek & compact Figma-style preset switcher for Desktop */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-zinc-900/60 p-1 border border-zinc-800/60">
          <button
            onClick={() => {
              setIsSimulating(false);
              setCurrentWidth(window.innerWidth);
            }}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              !isSimulating 
                ? 'bg-zinc-800 text-white shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
            title={isEn ? 'Sync directly with browser viewport width' : 'تراز زنده با عرض مرورگر شما'}
          >
            <RefreshCw className="h-3 w-3" />
            <span>{isEn ? 'Live' : 'عرض واقعی'}</span>
          </button>

          <div className="h-3.5 w-px bg-zinc-800/80" />

          {/* Quick preset buttons showing tailwind breakpoint identifiers */}
          {devices.map((device) => {
            const Icon = device.icon;
            const isActive = isSimulating && currentWidth === device.width;
            return (
              <button
                key={device.name}
                onClick={() => {
                  setIsSimulating(true);
                  setCurrentWidth(device.width);
                }}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm shadow-cyan-500/10' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                }`}
                title={`${device.name} (${device.label})`}
              >
                <Icon className="h-3 w-3" />
                <span className="font-mono uppercase">{device.bp}</span>
                <span className="text-[9px] opacity-60 font-mono">({device.width})</span>
              </button>
            );
          })}

          <div className="h-3.5 w-px bg-zinc-800/80" />

          {/* Device Frame Modal button */}
          <button
            onClick={() => onOpenDeviceSimulator(currentWidth)}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/20 font-bold transition-all"
            title={isEn ? 'Inspect inside simulated device frame' : 'باز کردن شبیه‌ساز قاب واقعی گوشی/تبلت'}
          >
            <Smartphone className="h-3 w-3 text-indigo-400" />
            <span>{isEn ? 'Frame' : 'قاب گوشی'}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Quick search button */}
          <button
            onClick={onOpenSearch}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all"
            title={isEn ? 'Search (Ctrl+K)' : 'جستجو (Ctrl+K)'}
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all"
            title={isEn ? 'System Settings' : 'تنظیمات سیستم'}
          >
            <SettingsIcon className="h-4 w-4" />
          </button>

          {/* Export button */}
          <button
            onClick={onDownloadSingleFile}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800/60 bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-all"
            title={isEn ? 'Download Standalone HTML (Offline)' : 'دانلود فایل تکی آفلاین'}
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sleek, lower height Active Simulation Banner */}
      {isSimulating && (
        <div className="bg-cyan-950/15 border-t border-b border-cyan-500/20 px-4 py-1.5 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-cyan-200/90 mx-auto">
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              {isEn ? 'Active Simulation:' : 'شبیه‌ساز فعال:'}{' '}
              <span className="font-mono font-bold text-cyan-300">{Math.round(currentWidth)}px</span>
            </span>
            <span className="rounded px-1.5 py-0.5 text-[9px] bg-cyan-500/10 text-cyan-300 font-mono uppercase border border-cyan-500/25">
              {currentBreakpoint}
            </span>
            <button
              onClick={() => {
                setIsSimulating(false);
                setCurrentWidth(window.innerWidth);
              }}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 ml-2 transition-all font-bold"
            >
              {isEn ? 'Exit Simulation' : 'خروج'}
            </button>
          </div>
        </div>
      )}

      {/* Highly optimized, single-line mobile viewport bar with zero wrapping/button overload */}
      <div className="lg:hidden flex items-center justify-between border-t border-zinc-800/40 bg-zinc-950/80 px-4 py-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <span>{isEn ? 'Viewport:' : 'نمایشگر:'}</span>
          <span className="font-mono text-cyan-400 font-bold">{Math.round(currentWidth)}px</span>
          <span className="rounded px-1.5 py-0.5 text-[9px] bg-zinc-800 text-zinc-300 uppercase font-mono border border-zinc-700/30">
            {currentBreakpoint}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {isSimulating && (
            <button
              onClick={() => {
                setIsSimulating(false);
                setCurrentWidth(window.innerWidth);
              }}
              className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded px-2 py-1 font-bold"
            >
              {isEn ? 'Reset' : 'خروج'}
            </button>
          )}
          <button
            onClick={() => onOpenDeviceSimulator(currentWidth)}
            className="rounded px-2.5 py-1 text-[10px] bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/30 transition-all flex items-center gap-1"
          >
            <Smartphone className="h-3 w-3 text-indigo-400" />
            <span>{isEn ? 'Frame' : 'قاب واقعی'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
