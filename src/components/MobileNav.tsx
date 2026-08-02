import React, { useState } from 'react';
import { Search, Settings, Eye, X, Compass, ChevronLeft } from 'lucide-react';
import { SECTIONS } from './Sidebar';

interface MobileNavProps {
  activeSection: string;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isInspectorActive: boolean;
  setIsInspectorActive: (active: boolean) => void;
  dir?: 'rtl' | 'ltr';
}

export default function MobileNav({
  activeSection,
  setIsSearchOpen,
  setIsSettingsOpen,
  isInspectorActive,
  setIsInspectorActive,
  dir = 'rtl',
}: MobileNavProps) {
  const isEn = dir === 'ltr';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const handleScrollToSection = (id: string) => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 120;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  const filteredSections = SECTIONS.filter(section => {
    const q = filterQuery.toLowerCase();
    const name = isEn ? section.nameEn : section.nameFa;
    return (
      name.toLowerCase().includes(q) ||
      section.id.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Floating Bottom Navigation Bar for Mobile (< 768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 px-4 py-2 pb-5 shadow-[0_-10px_35px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {/* Section Drawer Toggle */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isDrawerOpen 
                ? 'text-cyan-400 font-bold scale-105' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Compass className={`h-5 w-5 ${isDrawerOpen ? 'text-cyan-400' : 'text-zinc-400'}`} />
            <span className="text-[10px] tracking-tight">{isEn ? 'Sections' : 'بخش‌ها'}</span>
          </button>

          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-zinc-400 hover:text-white transition-all"
          >
            <Search className="h-5 w-5" />
            <span className="text-[10px] tracking-tight">{isEn ? 'Search' : 'جستجو'}</span>
          </button>

          {/* Inspector Toggle */}
          <button
            onClick={() => setIsInspectorActive(!isInspectorActive)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isInspectorActive 
                ? 'text-emerald-400 font-bold scale-105' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className={`h-5 w-5 ${isInspectorActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
            <span className="text-[10px] tracking-tight">{isEn ? 'Inspector' : 'بازرس کلاسی'}</span>
          </button>

          {/* Settings Toggle */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-zinc-400 hover:text-white transition-all"
          >
            <Settings className="h-5 w-5" />
            <span className="text-[10px] tracking-tight">{isEn ? 'Settings' : 'تنظیمات'}</span>
          </button>
        </div>
      </div>

      {/* Modern Slide-Up Drawer / Bottom Sheet */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Sheet Container */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-zinc-950 border-t border-white/10 rounded-t-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Drawer Drag handle indicator */}
            <div className="flex justify-center py-2.5">
              <div className="w-12 h-1.5 rounded-full bg-zinc-800" />
            </div>

            {/* Drawer Header */}
            <div className="px-5 pb-3 flex items-center justify-between border-b border-zinc-900">
              <div className={isEn ? 'text-left' : 'text-right'}>
                <h3 className="text-sm font-bold text-white">
                  {isEn ? 'Quick Navigation' : 'سامانه ناوبری سریع'}
                </h3>
                <p className="text-[10px] text-zinc-400">
                  {isEn ? 'Select from 22 system sections' : 'انتخاب از بین ۲۲ بخش اصلی سیستم طراحی'}
                </p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Filter input inside drawer */}
            <div className="p-4 bg-zinc-950 border-b border-zinc-900/60">
              <div className="relative">
                <Search className={`absolute ${isEn ? 'left-3.5' : 'right-3.5'} top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500`} />
                <input
                  type="text"
                  placeholder={isEn ? 'Filter sections...' : 'جستجو در بخش‌ها...'}
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className={`w-full bg-zinc-900/50 border border-zinc-800/80 rounded-xl py-2 ${
                    isEn ? 'pl-10 pr-4 text-left' : 'pr-10 pl-4 text-right'
                  } text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 font-sans`}
                />
              </div>
            </div>

            {/* Sections List */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 pb-10">
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const sectionName = isEn ? section.nameEn : section.nameFa;

                  return (
                    <button
                      key={section.id}
                      onClick={() => handleScrollToSection(section.id)}
                      className={`w-full flex items-center justify-between rounded-xl p-3 text-xs transition-all ${
                        isEn ? 'text-left' : 'text-right'
                      } ${
                        isActive
                          ? `bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 text-cyan-400 ${isEn ? 'border-l-2' : 'border-r-2'} border-cyan-500 font-bold`
                          : `bg-zinc-900/20 text-zinc-400 hover:bg-zinc-900 hover:text-white ${isEn ? 'border-l-2' : 'border-r-2'} border-transparent`
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                        <span className="truncate">{sectionName}</span>
                      </div>
                      <ChevronLeft className={`h-3.5 w-3.5 transition-transform ${isEn ? 'rotate-180' : ''} ${isActive ? 'text-cyan-400' : 'text-zinc-600'}`} />
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-zinc-500">
                  {isEn ? 'No section found.' : 'بخش مورد نظر پیدا نشد.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
