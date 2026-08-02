import React, { useState, useEffect } from 'react';
import { Sparkles, Eye } from 'lucide-react';

interface InspectorInfo {
  tag: string;
  width: number;
  height: number;
  padding: string;
  margin: string;
  radius: string;
  fontSize: string;
  classes: string[];
  x: number;
  y: number;
}

interface InspectorOverlayProps {
  isActive: boolean;
  setIsActive: (act: boolean) => void;
  dir?: 'rtl' | 'ltr';
}

export default function InspectorOverlay({ isActive, setIsActive, dir = 'rtl' }: InspectorOverlayProps) {
  const isEn = dir === 'ltr';
  const [info, setInfo] = useState<InspectorInfo | null>(null);

  useEffect(() => {
    if (!isActive) {
      setInfo(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Skip inspector overlays, navbars, sidebars or settings to prevent self-inspection loops
      if (
        target.closest('#inspector-panel') || 
        target.closest('header') || 
        target.closest('aside') || 
        target.tagName === 'BODY' || 
        target.tagName === 'HTML' ||
        target.id === 'root'
      ) {
        setInfo(null);
        return;
      }

      const rect = target.getBoundingClientRect();
      const computed = window.getComputedStyle(target);

      // Clean padding display
      const pt = parseFloat(computed.paddingTop) || 0;
      const pr = parseFloat(computed.paddingRight) || 0;
      const pb = parseFloat(computed.paddingBottom) || 0;
      const pl = parseFloat(computed.paddingLeft) || 0;
      const paddingDisplay = `${pt}px ${pr}px ${pb}px ${pl}px`;

      // Clean margin display
      const mt = parseFloat(computed.marginTop) || 0;
      const mr = parseFloat(computed.marginRight) || 0;
      const mb = parseFloat(computed.marginBottom) || 0;
      const ml = parseFloat(computed.marginLeft) || 0;
      const marginDisplay = `${mt}px ${mr}px ${mb}px ${ml}px`;

      // Filter tailwind classes
      const classList = target.className
        ? target.className.split(/\s+/).filter(c => c && !c.includes('hover:') && !c.includes('transition') && !c.includes('duration-'))
        : [];

      setInfo({
        tag: target.tagName.toLowerCase(),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        padding: paddingDisplay === '0px 0px 0px 0px' ? '0' : paddingDisplay,
        margin: marginDisplay === '0px 0px 0px 0px' ? '0' : marginDisplay,
        radius: computed.borderRadius || '0',
        fontSize: computed.fontSize || 'N/A',
        classes: classList.slice(0, 8), // show top 8 classes
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY + 10
      });

      // Add visual overlay border to target
      target.style.outline = '2px solid #06b6d4';
      target.style.outlineOffset = '-1px';
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        target.style.outline = '';
        target.style.outlineOffset = '';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isActive]);

  return (
    <>
      {/* Floating activation pill at bottom left or right */}
      <div className={`fixed bottom-6 ${isEn ? 'right-6' : 'left-6'} z-50 hidden md:block`}>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-xl ${
            isActive 
              ? 'bg-cyan-500 text-zinc-950 font-black' 
              : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800/80'
          }`}
        >
          <Eye className="h-4 w-4" />
          <span>
            {isActive 
              ? (isEn ? 'Live Inspector: Active' : 'بازرس زنده: فعال') 
              : (isEn ? 'Enable Inspector (Figma Style)' : 'فعال‌سازی بازرس کلاسی (Figma Style)')}
          </span>
        </button>
      </div>

      {/* Floating detail box */}
      {isActive && info && (
        <div 
          id="inspector-panel"
          className={`absolute z-50 w-64 rounded-xl border border-cyan-500/30 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-md pointer-events-none ${isEn ? 'text-left' : 'text-right'} font-sans`}
          style={{ 
            left: `${Math.min(info.x, window.innerWidth - 280)}px`, 
            top: `${info.y}px` 
          }}
        >
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-1.5 mb-2">
            <span className="font-mono text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">
              {info.tag}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>{isEn ? 'Hovered Specs' : 'مشخصات المان هاور'}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-zinc-400">{isEn ? 'Dimensions:' : 'ابعاد (W × H):'}</span>
              <span className="font-mono text-white font-bold">{info.width}px × {info.height}px</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-zinc-400">{isEn ? 'Padding:' : 'پدینگ (Padding):'}</span>
              <span className="font-mono text-rose-400">{info.padding}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">{isEn ? 'Margin:' : 'مارجین (Margin):'}</span>
              <span className="font-mono text-amber-400">{info.margin}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">{isEn ? 'Radius:' : 'گوشه (Radius):'}</span>
              <span className="font-mono text-cyan-400">{info.radius}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">{isEn ? 'Font Size:' : 'سایز متن:'}</span>
              <span className="font-mono text-white">{info.fontSize}</span>
            </div>

            {info.classes.length > 0 && (
              <div className={`border-t border-zinc-800/40 pt-2 mt-2 space-y-1 ${isEn ? 'text-left' : 'text-right'}`}>
                <span className="text-[10px] text-zinc-500 block">
                  {isEn ? 'Rendered Tailwind Classes:' : 'کلاس‌های تلویند رندر شده:'}
                </span>
                <div className={`flex flex-wrap gap-1 ${isEn ? 'justify-start' : 'justify-end'}`}>
                  {info.classes.map((cls, idx) => (
                    <span key={idx} className="font-mono text-[9px] bg-zinc-900 border border-zinc-800/60 rounded px-1 text-cyan-300">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
