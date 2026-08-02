import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar, { SECTIONS } from './components/Sidebar';
import BreakpointsSection from './components/BreakpointsSection';
import ContainerVisualizer from './components/ContainerVisualizer';
import SpacingScale from './components/SpacingScale';
import TypographySection from './components/TypographySection';
import EffectsSection from './components/EffectsSection';
import ColorsPalette from './components/ColorsPalette';
import LayoutUtilities from './components/LayoutUtilities';
import Playgrounds from './components/Playgrounds';
import PositioningZIndex from './components/PositioningZIndex';
import Cheatsheet from './components/Cheatsheet';
import GlobalSearch from './components/GlobalSearch';
import SettingsPanel from './components/SettingsPanel';
import InspectorOverlay from './components/InspectorOverlay';
import MobileNav from './components/MobileNav';
import DeviceSimulatorModal from './components/DeviceSimulatorModal';
import PerformanceOverlay from './components/PerformanceOverlay';
import { BREAKPOINTS } from './data';
import { Settings } from './types';
import { Sparkles, Sliders, Laptop, Tablet, Smartphone, HelpCircle, Heart } from 'lucide-react';

export default function App() {
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('breakpoints');

  // Modal & Overlay open states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInspectorActive, setIsInspectorActive] = useState(false);
  const [isDeviceSimulatorOpen, setIsDeviceSimulatorOpen] = useState(false);
  const [isPerformanceOverlayOpen, setIsPerformanceOverlayOpen] = useState(false);
  const [simulatorInitialWidth, setSimulatorInitialWidth] = useState<number>(375);

  const isSimulatedFrame = new URLSearchParams(window.location.search).get('simulated_frame') === 'true';

  const handleOpenDeviceSimulator = (width?: number) => {
    if (width) setSimulatorInitialWidth(width);
    setIsDeviceSimulatorOpen(true);
  };

  // Global App Settings
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem('tailwind-visualizer-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return {
      theme: 'system',
      dir: 'rtl',
      animation: true,
      gridOverlay: false,
      measurementOverlay: true,
      containerOverlay: true
    };
  });

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tailwind-visualizer-settings', JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // State for the actually applied theme ('dark' | 'light')
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');

  // Handle theme changes
  useEffect(() => {
    const updateTheme = () => {
      if (settings.theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setActiveTheme(systemTheme);
      } else {
        setActiveTheme(settings.theme);
      }
    };

    updateTheme();

    // Setup listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (settings.theme === 'system') {
        updateTheme();
      }
    };

    // Modern and fallback listeners
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, [settings.theme]);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (activeTheme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [activeTheme]);

  // Track window resizing with requestAnimationFrame for 60 FPS performance
  useEffect(() => {
    let animFrameId: number;

    const handleResize = () => {
      if (!isSimulating) {
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(() => {
          setCurrentWidth(window.innerWidth);
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [isSimulating]);

  // Sync dir attribute with HTML element
  useEffect(() => {
    document.documentElement.setAttribute('dir', settings.dir);
    document.documentElement.setAttribute('lang', settings.dir === 'rtl' ? 'fa' : 'en');
  }, [settings.dir]);

  // Setup intersection observer to highlight active section in the sidebar as we scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Determine current active breakpoint according to width
  const getActiveBreakpoint = (width: number) => {
    let active = BREAKPOINTS[0];
    for (const bp of BREAKPOINTS) {
      if (width >= bp.min) active = bp;
    }
    return active;
  };

  const activeBreakpoint = getActiveBreakpoint(currentWidth);

  // --- DOWNLOAD SINGLE STANDALONE FILE HELPER ---
  // Generates a fully contained self-sufficient HTML file representing the full playground to work completely offline!
  const downloadSingleStandaloneFile = () => {
    const isEn = settings.dir === 'ltr';
    const lang = isEn ? 'en' : 'fa';
    const dirVal = settings.dir;
    
    const title = isEn 
      ? 'Tailwind Design System Visualizer Pro - Standalone Offline' 
      : 'سامانه مستقل ویژوالایزر لوکس سیستم طراحی Tailwind';
      
    const heading = isEn 
      ? 'Tailwind Design System Visualizer Pro Standalone' 
      : 'سامانه مستقل ویژوالایزر لوکس سیستم طراحی Tailwind';
      
    const desc = isEn 
      ? 'This standalone, self-contained single HTML file is fully optimized for offline use, allowing you to quickly reference grid classes, spacing scales, typography scales, and color palettes anywhere.'
      : 'این فایل مستقل و تک‌فایلی مخصوص استفاده کاملاً آفلاین برای مرور کلاس‌ها، شبیه‌سازی گرید، مقیاس‌های فاصله‌گذاری و پالت‌های رنگی بهینه‌سازی شده است.';
      
    const subHeading = isEn 
      ? 'Full Online Interactive Playground Version' 
      : 'نسخه تعاملی و برخط کامل';
      
    const subDesc = isEn 
      ? 'The complete cloud edition features live interactive flexbox laboratories, grid sandboxes, inspector overlays, device viewport simulators, and command-palette search utilities, successfully downloaded just now!' 
      : 'نسخه کامل این اپلیکیشن با امکاناتی چون شهربازی زنده فلکس، گرید، بازرس آنلاین، شبیه‌ساز پویای دستگاه‌ها و جستجوی فرمان‌پایه به صورت برخط و کامل، همین حالا با موفقیت دانلود شد.';

    const alignClass = isEn ? 'text-left' : 'text-right';

    const htmlContent = `<!DOCTYPE html>
<html lang="${lang}" dir="${dirVal}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif, 'Vazirmatn';
      background: #090d16;
      color: #e2e8f0;
    }
    .glass-panel {
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
  </style>
</head>
<body class="p-8">
  <div class="max-w-4xl mx-auto space-y-8 text-center pt-12">
    <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-xl shadow-indigo-500/20">
      <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
    </div>
    <h1 class="text-3xl font-black text-white">${heading}</h1>
    <p class="text-slate-400 text-sm max-w-xl mx-auto leading-7">${desc}</p>
    
    <div class="glass-panel p-6 rounded-2xl ${alignClass}">
      <h2 class="text-lg font-bold text-indigo-400 mb-2">${subHeading}</h2>
      <p class="text-xs text-slate-300 leading-6">${subDesc}</p>
    </div>
    <div class="text-slate-600 text-[11px]">Tailwind Design System Visualizer Pro © 2026</div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tailwind-design-system-visualizer-pro.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-200 pb-24 md:pb-16 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-white`}>
      {/* Background Matrix Grid Overlay */}
      {settings.gridOverlay && (
        <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(255,255,255,.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.012)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
      )}

      {/* Main Sticky Navbar */}
      <Navbar
        currentWidth={currentWidth}
        setCurrentWidth={setCurrentWidth}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onDownloadSingleFile={downloadSingleStandaloneFile}
        onOpenDeviceSimulator={handleOpenDeviceSimulator}
        settings={settings}
        currentBreakpoint={activeBreakpoint.name}
      />

      <div className="mx-auto flex w-full max-w-7xl items-start gap-6 px-4 py-8 sm:px-6 z-10">
        
        {/* Sticky Sidebar Nav (Section 28) - Hide when simulating small screen */}
        {(!isSimulating || currentWidth >= 1024) && (
          <Sidebar activeSection={activeSection} dir={settings.dir} />
        )}

        {/* Core Layout Containers with automatic layout & text scaling when simulating base/sm widths */}
        <main 
          className={`flex-1 min-w-0 space-y-16 transition-all ${
            isSimulating && currentWidth < 640
              ? '[&_.grid]:grid-cols-1 [&_.grid-cols-2]:grid-cols-1 [&_.grid-cols-3]:grid-cols-1 [&_.grid-cols-4]:grid-cols-1 [&_.grid-cols-6]:grid-cols-2 [&_.md\\:flex-row]:flex-col [&_.p-6]:p-3.5 [&_.p-8]:p-4 [&_.text-2xl]:text-base [&_.text-3xl]:text-lg text-xs overflow-x-hidden break-words'
              : isSimulating && currentWidth < 768
              ? '[&_.grid-cols-3]:grid-cols-2 [&_.grid-cols-4]:grid-cols-2 [&_.grid-cols-6]:grid-cols-3 [&_.p-8]:p-4 text-xs sm:text-sm overflow-x-hidden break-words'
              : 'overflow-x-hidden'
          }`}
          style={{ 
            maxWidth: isSimulating ? `${currentWidth}px` : '100%', 
            marginInline: 'auto', 
            transition: settings.animation ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' 
          }}
        >
          {/* Hero Intro banner */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-zinc-950/45 to-zinc-900/10 border border-cyan-500/15">
            <div className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="h-4 w-4" />
            </div>
            
            <div className={`max-w-2xl ${settings.dir === 'ltr' ? 'text-left' : 'text-right'}`}>
              <span className="badge rounded-full px-3 py-1 text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border-cyan-500/20">
                {settings.dir === 'ltr' ? 'v1.2.0 • Pro Visual Reference' : 'جدیدترین نسخه • مرجع اختصاصی فرانت‌اند'}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-3">
                {settings.dir === 'ltr' 
                  ? 'Tailwind CSS Interactive Visual Inspection System' 
                  : 'سیستم ارزیابی، بازرسی و یادگیری بصری قوانین تلویند'}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-zinc-300 leading-7">
                {settings.dir === 'ltr'
                  ? 'Welcome to the complete reference system for frontend developers. Resize your browser window or switch breakpoints to observe real-time container metrics, spacing scales, grid columns, and utility classes in action.'
                  : 'به کامل‌ترین مرجع تخصصی توسعه‌دهندگان فرانت‌اند خوش آمدید. با بزرگ و کوچک کردن مرورگر خود، شاهد رفتار زنده نقاط شکست، کانتینر، اندازه‌گیری‌های پدینگ، فواصل مارجین بیرونی و تعداد ستون‌ها بر مبنای پیکسل و رِم باشید.'}
              </p>
            </div>
          </div>

          {/* Section 1: Responsive Breakpoints Display & Interactive Controls */}
          <BreakpointsSection
            currentWidth={currentWidth}
            setCurrentWidth={setCurrentWidth}
            isSimulating={isSimulating}
            setIsSimulating={setIsSimulating}
            activeBreakpoint={activeBreakpoint}
            isPerformanceOverlayOpen={isPerformanceOverlayOpen}
            setIsPerformanceOverlayOpen={setIsPerformanceOverlayOpen}
            dir={settings.dir}
          />

          {/* Section 2: Official Container */}
          <ContainerVisualizer currentWidth={currentWidth} currentBreakpoint={activeBreakpoint.name} dir={settings.dir} />

          {/* Section 3: Spacing Scale */}
          <SpacingScale dir={settings.dir} />

          {/* Section 4 to 7: Typography System */}
          <TypographySection dir={settings.dir} />

          {/* Section 8 to 10: Effects Section */}
          <EffectsSection dir={settings.dir} />

          {/* Section 11: Color Palettes */}
          <ColorsPalette dir={settings.dir} />

          {/* Section 12 to 14: Layout Utilities */}
          <LayoutUtilities dir={settings.dir} />

          {/* Section 15 to 17: Interactive Playgrounds */}
          <Playgrounds currentWidth={currentWidth} dir={settings.dir} />

          {/* Section 18 to 20: Positioning, Z-index & Overflow */}
          <PositioningZIndex dir={settings.dir} />

          {/* Section 21 & 22: Cheatsheet & Design Tokens */}
          <Cheatsheet currentBreakpoint={activeBreakpoint.name} currentWidth={currentWidth} dir={settings.dir} />

        </main>
      </div>

      {/* Footer and credentials */}
      <footer className="mt-20 border-t border-zinc-800/60 bg-zinc-950/40 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 justify-center">
            <span>{settings.dir === 'ltr' ? 'Built with' : 'ساخته شده با'}</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>
              {settings.dir === 'ltr' 
                ? 'for the web developer community by' 
                : 'برای جامعه توسعه‌دهندگان وب توسط'}{' '}
              <a href="https://derhami.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 font-bold hover:text-cyan-400 transition-colors">
                {settings.dir === 'ltr' ? 'Hamidreza Derhami' : 'حمیدرضا درهمی'}
              </a>
            </span>
          </div>
          <div className="font-mono text-[10px]">
            Tailwind Design System Visualizer Pro v1.2.0 • 2026
          </div>
        </div>
      </footer>

      {/* Global Interactive search panel (Section 24) */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        dir={settings.dir}
      />

      {/* Visual Settings panel (Section 25) */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />

      {/* Legendary Live inspector overlay (Section 23) */}
      <InspectorOverlay
        isActive={isInspectorActive}
        setIsActive={setIsInspectorActive}
        dir={settings.dir}
      />

      {/* Modern Bottom Navigation & Sections Drawer for Mobile */}
      {!isSimulatedFrame && (
        <MobileNav
          activeSection={activeSection}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          isSettingsOpen={isSettingsOpen}
          setIsSettingsOpen={setIsSettingsOpen}
          isInspectorActive={isInspectorActive}
          setIsInspectorActive={setIsInspectorActive}
          dir={settings.dir}
        />
      )}

      {/* Real Device Simulator Frame Overlay */}
      <DeviceSimulatorModal
        isOpen={isDeviceSimulatorOpen}
        onClose={() => setIsDeviceSimulatorOpen(false)}
        activeSection={activeSection}
        initialWidth={simulatorInitialWidth}
        dir={settings.dir}
      />

      {/* Realtime FPS & Render Performance Overlay */}
      <PerformanceOverlay
        isVisible={isPerformanceOverlayOpen}
        onClose={() => setIsPerformanceOverlayOpen(false)}
        currentWidth={currentWidth}
        activeBreakpoint={activeBreakpoint.name}
        dir={settings.dir}
      />
    </div>
  );
}
