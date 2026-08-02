import React from 'react';
import { 
  Tv, Maximize2, Move, Type, Bold, Percent, Layout, 
  Layers, Map, Table, Columns, Copy, Code2
} from 'lucide-react';

export interface Section {
  id: string;
  nameFa: string;
  nameEn: string;
  icon: any;
}

export const SECTIONS: Section[] = [
  { id: 'breakpoints', nameFa: '۱. نقاط شکست ریسپانسیو', nameEn: '1. Responsive Breakpoints', icon: Tv },
  { id: 'container', nameFa: '۲. کانتینر رسمی', nameEn: '2. Official Container', icon: Maximize2 },
  { id: 'spacing', nameFa: '۳. مقیاس فاصله‌ها (Spacing)', nameEn: '3. Spacing Scale', icon: Move },
  { id: 'typography', nameFa: '۴. اندازه تایپوگرافی', nameEn: '4. Font Sizes', icon: Type },
  { id: 'font-weights', nameFa: '۵. ضخامت فونت', nameEn: '5. Font Weights', icon: Bold },
  { id: 'letter-spacing', nameFa: '۶. فاصله بین حروف', nameEn: '6. Letter Spacing', icon: Type },
  { id: 'line-heights', nameFa: '۷. ارتفاع خطوط (Leading)', nameEn: '7. Line Heights', icon: Type },
  { id: 'border-radius', nameFa: '۸. شعاع حواشی (Radius)', nameEn: '8. Border Radius', icon: Columns },
  { id: 'shadows', nameFa: '۹. مقیاس سایه‌ها (Shadow)', nameEn: '9. Shadow Scale', icon: Layers },
  { id: 'opacity', nameFa: '۱۰. شفافیت (Opacity)', nameEn: '10. Opacity Scale', icon: Percent },
  { id: 'colors', nameFa: '۱۱. پالت‌های رنگی رسمی', nameEn: '11. Color Palettes', icon: Table },
  { id: 'width-utils', nameFa: '۱۲. ابزارهای عرض (Width)', nameEn: '12. Width Utilities', icon: Layout },
  { id: 'max-width-utils', nameFa: '۱۳. حداکثر عرض (Max Width)', nameEn: '13. Max Width', icon: Layout },
  { id: 'height-utils', nameFa: '۱۴. ابزارهای ارتفاع (Height)', nameEn: '14. Height Utilities', icon: Layout },
  { id: 'flex-playground', nameFa: '۱۵. آزمایشگاه تعاملی فلکس', nameEn: '15. Interactive Flexbox Lab', icon: Code2 },
  { id: 'grid-playground', nameFa: '۱۶. آزمایشگاه تعاملی گرید', nameEn: '16. Interactive Grid Lab', icon: Code2 },
  { id: 'responsive-playground', nameFa: '۱۷. آزمایشگاه واکنش‌گرایی', nameEn: '17. Responsive Class Lab', icon: Tv },
  { id: 'z-index', nameFa: '۱۸. چیدمان عمودی (Z-Index)', nameEn: '18. Layer Elevation (Z-Index)', icon: Layers },
  { id: 'position', nameFa: '۱۹. موقعیت (Position)', nameEn: '19. Positioning Methods', icon: Move },
  { id: 'overflow', nameFa: '۲۰. سرریز محتوا (Overflow)', nameEn: '20. Overflow Control', icon: Columns },
  { id: 'cheatsheet', nameFa: '۲۱. تقلب‌نامه کدهای پرکاربرد', nameEn: '21. Quick Class Cheatsheet', icon: Copy },
  { id: 'design-tokens', nameFa: '۲۲. توکن‌های کلی طراحی', nameEn: '22. Design Tokens', icon: Map }
];

interface SidebarProps {
  activeSection: string;
  dir?: 'rtl' | 'ltr';
}

export default function Sidebar({ activeSection, dir = 'rtl' }: SidebarProps) {
  const isEn = dir === 'ltr';

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="sticky top-20 hidden w-64 shrink-0 lg:block">
      <div className="glass-panel rounded-2xl p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="mb-4">
          <span className="text-xs font-bold text-zinc-400 tracking-wider">
            {isEn ? 'System Navigation' : 'منوی ناوبری سیستم'}
          </span>
          <div className="mt-1 h-px bg-zinc-800/80 w-full" />
        </div>
        
        <nav className="space-y-1">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const sectionName = isEn ? section.nameEn : section.nameFa;

            return (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                  isEn ? 'text-left' : 'text-right'
                } ${
                  isActive
                    ? isEn 
                      ? 'bg-gradient-to-l from-cyan-500/15 to-cyan-500/5 text-cyan-400 border-l-2 border-cyan-500 font-bold' 
                      : 'bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 text-cyan-400 border-r-2 border-cyan-500 font-bold'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'
                }`} />
                <span className="truncate">{sectionName}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
