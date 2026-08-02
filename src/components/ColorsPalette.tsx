import React, { useState } from 'react';
import { COLOR_PALETTES } from '../data';
import { Table, Copy, Check } from 'lucide-react';

interface ColorsPaletteProps {
  dir?: 'rtl' | 'ltr';
}

function hexToRgb(hex: string): string {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result 
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : '';
}

export default function ColorsPalette({ dir = 'rtl' }: ColorsPaletteProps) {
  const isEn = dir === 'ltr';
  const [selectedColor, setSelectedColor] = useState<{
    palette: string;
    shade: string;
    hex: string;
    rgb: string;
  }>({
    palette: 'cyan',
    shade: '500',
    hex: '#06b6d4',
    rgb: 'rgb(6, 182, 212)'
  });

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleColorHover = (palette: string, shade: string, hex: string) => {
    setSelectedColor({
      palette,
      shade,
      hex,
      rgb: hexToRgb(hex)
    });
  };

  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  return (
    <section id="colors" className="scroll-mt-24 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-2">
          <Table className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">
            {isEn ? '11. Official Tailwind Color Palettes' : '۱۱. پالت‌های رنگی رسمی و کدهای رنگی (Color Palettes)'}
          </h2>
        </div>
        <span className="text-xs text-zinc-400">
          {isEn ? 'Hover over any swatch to inspect HEX & RGB codes' : 'نمایش زنده HEX و RGB با هاور روی هر شید رنگی'}
        </span>
      </div>

      {/* Interactive detail card */}
      <div className="glass-panel rounded-2xl p-5 border-cyan-500/20 bg-cyan-950/20 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-3">
          <div 
            className="h-14 w-14 rounded-xl border border-white/10 transition-all duration-300 shadow-xl"
            style={{ backgroundColor: selectedColor.hex }}
          />
          <div>
            <span className="text-xs text-zinc-400">{isEn ? 'Selected Color' : 'رنگ انتخابی فعال'}</span>
            <div className="text-sm font-bold text-white uppercase">{selectedColor.palette}-{selectedColor.shade}</div>
          </div>
        </div>

        {/* Copy Tailwind class */}
        <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block">{isEn ? 'Tailwind Class' : 'کلاس تلویند'}</span>
            <code className="text-xs text-cyan-400 font-mono font-bold">bg-{selectedColor.palette}-{selectedColor.shade}</code>
          </div>
          <button 
            onClick={() => handleCopy(`bg-${selectedColor.palette}-${selectedColor.shade}`)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {copiedText === `bg-${selectedColor.palette}-${selectedColor.shade}` ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Copy HEX */}
        <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block">{isEn ? 'HEX Code' : 'کد HEX'}</span>
            <code className="text-xs text-emerald-400 font-mono font-bold uppercase">{selectedColor.hex}</code>
          </div>
          <button 
            onClick={() => handleCopy(selectedColor.hex)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {copiedText === selectedColor.hex ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Copy RGB */}
        <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 block">{isEn ? 'RGB Code' : 'کد RGB'}</span>
            <code className="text-xs text-cyan-300 font-mono font-bold">{selectedColor.rgb}</code>
          </div>
          <button 
            onClick={() => handleCopy(selectedColor.rgb)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {copiedText === selectedColor.rgb ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Palettes Grid */}
      <div className="glass-panel rounded-2xl p-6 space-y-5 overflow-x-auto">
        <div className="min-w-[800px] space-y-4">
          <div className={`flex items-center text-xs text-zinc-500 border-b border-zinc-800/40 pb-2 ${isEn ? 'text-left' : 'text-right'}`}>
            <div className="w-24 shrink-0 font-bold">{isEn ? 'Palette Name' : 'نام پالت'}</div>
            <div className="flex-1 grid grid-cols-11 text-center font-mono font-bold">
              {shades.map(s => <div key={s}>{s}</div>)}
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(COLOR_PALETTES).map(([name, shadesObj]) => {
              return (
                <div key={name} className="flex items-center py-1 border-b border-zinc-900/40 last:border-0">
                  {/* Palette Name */}
                  <div className="w-24 shrink-0 text-xs font-bold text-white capitalize">
                    {name}
                  </div>

                  {/* Shades Palette */}
                  <div className="flex-1 grid grid-cols-11 gap-1">
                    {shades.map((shade) => {
                      const hex = shadesObj[shade];
                      const isHovered = selectedColor.palette === name && selectedColor.shade === shade;
                      
                      return (
                        <div
                          key={shade}
                          onMouseEnter={() => handleColorHover(name, shade, hex)}
                          onClick={() => handleCopy(`bg-${name}-${shade}`)}
                          className={`h-10 rounded-lg cursor-pointer transition-all relative ${
                            isHovered ? 'scale-110 shadow-lg ring-2 ring-cyan-400 z-10' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: hex }}
                          title={`bg-${name}-${shade}\n${hex}`}
                        >
                          <span className={`absolute bottom-1 right-1 text-[8px] font-bold ${
                            parseInt(shade) >= 500 ? 'text-white/65' : 'text-black/65'
                          }`}>
                            {shade}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
