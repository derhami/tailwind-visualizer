import React from 'react';
import { Settings, X, Eye, EyeOff, Sliders } from 'lucide-react';
import { Settings as SettingsType } from '../types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsType;
  setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
}

export default function SettingsPanel({ isOpen, onClose, settings, setSettings }: SettingsPanelProps) {
  if (!isOpen) return null;

  const isEn = settings.dir === 'ltr';

  const toggleSetting = (key: keyof SettingsType) => {
    setSettings((prev) => ({
      ...prev,
      [key]: prev[key] === 'dark' ? 'light' : prev[key] === 'light' ? 'dark' : prev[key] === 'rtl' ? 'ltr' : prev[key] === 'ltr' ? 'rtl' : !prev[key],
    }));
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center ${isEn ? 'justify-start' : 'justify-end'} bg-zinc-950/60 backdrop-blur-sm`}>
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className={`relative h-full w-full max-w-sm ${isEn ? 'border-r slide-in-from-right' : 'border-l slide-in-from-left'} border-zinc-800/80 bg-zinc-950 p-6 shadow-2xl flex flex-col justify-between animate-in duration-200`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                {isEn ? 'System Visual Settings' : 'تنظیمات بصری سیستم'}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="rounded p-1 text-zinc-500 hover:text-white hover:bg-zinc-800/40"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 leading-5">
            {isEn
              ? 'Customize measurement rulers, grid overlays, and design system rendering preferences using the options below.'
              : 'با فعال یا غیرفعال کردن گزینه‌های زیر می‌توانید حالت‌های خط‌کش اندازه‌گیری، هم‌پوشانی گرید و نحوه رندر سیستم طراحی را سفارشی کنید.'}
          </p>

          <div className="space-y-4">
            {/* 1. LTR/RTL Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/60">
              <div className={isEn ? 'text-left' : 'text-right'}>
                <span className="text-xs font-bold text-white block">
                  {isEn ? 'Layout Direction (DIR)' : 'راست‌چین / چپ‌چین (DIR)'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {isEn ? 'Switch entire interface between RTL & LTR' : 'تغییر تراز کل صفحه بین RTL و LTR'}
                </span>
              </div>
              <button
                onClick={() => toggleSetting('dir')}
                className={`rounded-lg px-3 py-1 text-xs font-bold font-mono transition-all ${
                  settings.dir === 'rtl' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/10' : 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/10'
                }`}
              >
                {settings.dir.toUpperCase()}
              </button>
            </div>

            {/* 2. Animations */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/60">
              <div className={isEn ? 'text-left' : 'text-right'}>
                <span className="text-xs font-bold text-white block">
                  {isEn ? 'Smooth Transitions' : 'انیمیشن‌های نرم'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {isEn ? 'Enable fluid state animations' : 'فعال بودن افکت‌های انتقال نرم'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.animation}
                onChange={() => toggleSetting('animation')}
                className="accent-cyan-500 h-4 w-4 cursor-pointer"
              />
            </div>

            {/* 3. Grid Overlay */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/60">
              <div className={isEn ? 'text-left' : 'text-right'}>
                <span className="text-xs font-bold text-white block">
                  {isEn ? 'Background Grid Overlay' : 'نمایش گرید پس‌زمینه (Grid)'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {isEn ? 'Toggle subtle background matrix grid' : 'فعال کردن شبکه فید ماتریکس در پس‌زمینه'}
                </span>
              </div>
              <button
                onClick={() => toggleSetting('gridOverlay')}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                {settings.gridOverlay ? <Eye className="h-5 w-5 text-cyan-400 animate-pulse" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>

            {/* 4. Measurement Overlay */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800/60">
              <div className={isEn ? 'text-left' : 'text-right'}>
                <span className="text-xs font-bold text-white block">
                  {isEn ? 'Measurement Rulers' : 'خط‌کش‌های اندازه‌گیری'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {isEn ? 'Live container padding & margin indicators' : 'نمایش مقیاس‌های زنده پدینگ و مارجین کانتینر'}
                </span>
              </div>
              <button
                onClick={() => toggleSetting('measurementOverlay')}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                {settings.measurementOverlay ? <Eye className="h-5 w-5 text-cyan-400 animate-pulse" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>

            {/* 5. System Auto / Dark / Light Theme Selection */}
            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/60 space-y-2.5">
              <div className={isEn ? 'text-left' : 'text-right'}>
                <span className="text-xs font-bold text-white block">
                  {isEn ? 'Color Theme' : 'تم سیستم و پوسته بصری'}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {isEn ? 'Auto sync with system or choose custom skin' : 'هماهنگ‌سازی خودکار با ترجیحات سیستم یا انتخاب تم دلخواه'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-900/60 rounded-lg border border-zinc-800/40">
                <button
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'system' }))}
                  className={`rounded-md py-1.5 px-2 text-[10px] font-bold transition-all ${
                    settings.theme === 'system'
                      ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                  }`}
                >
                  {isEn ? 'System' : 'سیستم'}
                </button>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                  className={`rounded-md py-1.5 px-2 text-[10px] font-bold transition-all ${
                    settings.theme === 'dark'
                      ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                  }`}
                >
                  {isEn ? 'Dark' : 'تاریک'}
                </button>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                  className={`rounded-md py-1.5 px-2 text-[10px] font-bold transition-all ${
                    settings.theme === 'light'
                      ? 'bg-cyan-500 text-zinc-950 shadow-md shadow-cyan-500/10'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                  }`}
                >
                  {isEn ? 'Light' : 'روشن'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-zinc-600 font-mono text-center">
          Tailwind Design System Visualizer Pro © 2026
        </div>
      </div>
    </div>
  );
}
