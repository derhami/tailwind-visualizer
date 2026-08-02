import { Breakpoint, CheatsheetItem, SearchItem } from './types';

export const BREAKPOINTS: Breakpoint[] = [
  { name: 'base', min: 0, max: 639, color: 'from-slate-700 to-slate-800', desc: 'موبایل‌های کوچک (زیر ۶۴۰ پیکسل)' },
  { name: 'sm', min: 640, max: 767, color: 'from-teal-600 to-teal-700', desc: 'موبایل‌های بزرگ و تبلت‌های کوچک' },
  { name: 'md', min: 768, max: 1023, color: 'from-blue-600 to-blue-700', desc: 'تبلت‌های استاندارد' },
  { name: 'lg', min: 1024, max: 1279, color: 'from-indigo-600 to-indigo-700', desc: 'لپ‌تاپ‌های کوچک و آیپد پرو' },
  { name: 'xl', min: 1280, max: 1535, color: 'from-purple-600 to-purple-700', desc: 'لپ‌تاپ‌های استاندارد و دسکتاپ' },
  { name: '2xl', min: 1536, max: null, color: 'from-pink-600 to-pink-700', desc: 'دسکتاپ‌های بزرگ و مانیتورهای عریض' }
];

export const CONTAINER_SPECS = [
  { bp: 'sm', width: '640px', padding: '16px (1rem)', cols: 4, gutter: '16px (1rem)' },
  { bp: 'md', width: '768px', padding: '24px (1.5rem)', cols: 6, gutter: '20px (1.25rem)' },
  { bp: 'lg', width: '1024px', padding: '32px (2rem)', cols: 12, gutter: '24px (1.5rem)' },
  { bp: 'xl', width: '1280px', padding: '40px (2.5rem)', cols: 12, gutter: '24px (1.5rem)' },
  { bp: '2xl', width: '1536px', padding: '48px (3rem)', cols: 12, gutter: '32px (2rem)' }
];

export const SPACING_SCALE = [
  { name: '0', rem: '0rem', px: 0 },
  { name: '0.5', rem: '0.125rem', px: 2 },
  { name: '1', rem: '0.25rem', px: 4 },
  { name: '1.5', rem: '0.375rem', px: 6 },
  { name: '2', rem: '0.5rem', px: 8 },
  { name: '2.5', rem: '0.625rem', px: 10 },
  { name: '3', rem: '0.75rem', px: 12 },
  { name: '3.5', rem: '0.875rem', px: 14 },
  { name: '4', rem: '1rem', px: 16 },
  { name: '5', rem: '1.25rem', px: 20 },
  { name: '6', rem: '1.5rem', px: 24 },
  { name: '7', rem: '1.75rem', px: 28 },
  { name: '8', rem: '2rem', px: 32 },
  { name: '9', rem: '2.25rem', px: 36 },
  { name: '10', rem: '2.5rem', px: 40 },
  { name: '11', rem: '2.75rem', px: 44 },
  { name: '12', rem: '3rem', px: 48 },
  { name: '14', rem: '3.5rem', px: 56 },
  { name: '16', rem: '4rem', px: 64 },
  { name: '20', rem: '5rem', px: 80 },
  { name: '24', rem: '6rem', px: 96 },
  { name: '28', rem: '7rem', px: 112 },
  { name: '32', rem: '8rem', px: 128 },
  { name: '36', rem: '9rem', px: 144 },
  { name: '40', rem: '10rem', px: 160 },
  { name: '44', rem: '11rem', px: 176 },
  { name: '48', rem: '12rem', px: 192 },
  { name: '52', rem: '13rem', px: 208 },
  { name: '56', rem: '14rem', px: 224 },
  { name: '60', rem: '15rem', px: 240 },
  { name: '64', rem: '16rem', px: 256 },
  { name: '72', rem: '18rem', px: 288 },
  { name: '80', rem: '20rem', px: 320 },
  { name: '96', rem: '24rem', px: 384 }
];

export const TYPOGRAPHY_SCALE = [
  { name: 'text-xs', size: '0.75rem', px: 12, lh: '1rem (16px)', preview: 'آینده از آن کسانی است که به زیبایی رویاهای خود باور دارند.', previewEn: 'The future belongs to those who believe in the beauty of their dreams.' },
  { name: 'text-sm', size: '0.875rem', px: 14, lh: '1.25rem (20px)', preview: 'توسعه‌دهنده خلاق کسی است که کدهای زیبا و بهینه می‌نویسد.', previewEn: 'A creative developer is one who writes beautiful, performant code.' },
  { name: 'text-base', size: '1rem', px: 16, lh: '1.5rem (24px)', preview: 'این سیستم طراحی با تایپوگرافی زیبا و فونت وزیرمتن آراسته شده است.', previewEn: 'This design system is styled with high-contrast, clear typography.' },
  { name: 'text-lg', size: '1.125rem', px: 18, lh: '1.75rem (28px)', preview: 'طراحی عالی یعنی توجه به کوچک‌ترین جزئیات صفحه.', previewEn: 'Great design means paying attention to the smallest page details.' },
  { name: 'text-xl', size: '1.25rem', px: 20, lh: '1.75rem (28px)', preview: 'انعطاف‌پذیری فوق‌العاده با فریم‌ورک محبوب تلویند.', previewEn: 'Outstanding flexibility powered by the popular Tailwind CSS framework.' },
  { name: 'text-2xl', size: '1.5rem', px: 24, lh: '2rem (32px)', preview: 'طراحی تمیز، ساده و مدرن به سبک محصولات تراز اول جهانی.', previewEn: 'Clean, simple, and modern interface design for world-class products.' },
  { name: 'text-3xl', size: '1.875rem', px: 30, lh: '2.25rem (36px)', preview: 'بصری‌سازی پویای کامپوننت‌ها و فاصله‌ها.', previewEn: 'Dynamic visual inspection of components and responsive spacing.' },
  { name: 'text-4xl', size: '2.25rem', px: 36, lh: '2.5rem (40px)', preview: 'خلاقیت بی‌پایان در فرانت‌اند.', previewEn: 'Endless creativity in modern frontend development.' },
  { name: 'text-5xl', size: '3rem', px: 48, lh: '1', preview: 'قدرتمند و سریع.', previewEn: 'Powerful and lightning fast.' },
  { name: 'text-6xl', size: '3.75rem', px: 60, lh: '1', preview: 'آیکون‌ها و رنگ‌ها.', previewEn: 'Icons and vibrant palettes.' },
  { name: 'text-7xl', size: '4.5rem', px: 72, lh: '1', preview: 'تلویند CSS.', previewEn: 'Tailwind CSS.' },
  { name: 'text-8xl', size: '6rem', px: 96, lh: '1', preview: 'دنیای مدرن.', previewEn: 'Modern Digital World.' },
  { name: 'text-9xl', size: '8rem', px: 128, lh: '1', preview: 'آسمان.', previewEn: 'Horizon.' }
];

export const FONT_WEIGHTS = [
  { name: 'font-thin', weight: '100', text: 'Thin / خیلی نازک', textEn: 'Thin (100)' },
  { name: 'font-extralight', weight: '200', text: 'ExtraLight / فوق‌العاده نازک', textEn: 'Extra Light (200)' },
  { name: 'font-light', weight: '300', text: 'Light / نازک', textEn: 'Light (300)' },
  { name: 'font-normal', weight: '400', text: 'Normal / معمولی', textEn: 'Normal (400)' },
  { name: 'font-medium', weight: '500', text: 'Medium / متوسط', textEn: 'Medium (500)' },
  { name: 'font-semibold', weight: '600', text: 'Semibold / نیمه‌ضخیم', textEn: 'Semibold (600)' },
  { name: 'font-bold', weight: '700', text: 'Bold / ضخیم', textEn: 'Bold (700)' },
  { name: 'font-extrabold', weight: '800', text: 'ExtraBold / خیلی ضخیم', textEn: 'Extra Bold (800)' },
  { name: 'font-black', weight: '900', text: 'Black / ابرضخیم', textEn: 'Black (900)' }
];

export const LETTER_SPACING = [
  { name: 'tracking-tighter', val: '-0.05em', desc: 'بسیار فشرده', descEn: 'Tighter (-0.05em)' },
  { name: 'tracking-tight', val: '-0.025em', desc: 'فشرده', descEn: 'Tight (-0.025em)' },
  { name: 'tracking-normal', val: '0em', desc: 'معمولی', descEn: 'Normal (0em)' },
  { name: 'tracking-wide', val: '0.025em', desc: 'باز', descEn: 'Wide (0.025em)' },
  { name: 'tracking-wider', val: '0.05em', desc: 'بسیار باز', descEn: 'Wider (0.05em)' },
  { name: 'tracking-widest', val: '0.1em', desc: 'کاملأ باز (بیشترین فاصله)', descEn: 'Widest (0.1em)' }
];

export const LINE_HEIGHTS = [
  { name: 'leading-none', val: '1', desc: 'بدون فاصله عمودی اضافه (مناسب عناوین بزرگ)', descEn: 'No extra vertical leading (suited for large headers)' },
  { name: 'leading-tight', val: '1.25', desc: 'فاصله‌گذاری فشرده', descEn: 'Tight line spacing' },
  { name: 'leading-snug', val: '1.375', desc: 'فاصله‌گذاری نسبتاً فشرده', descEn: 'Snug line spacing' },
  { name: 'leading-normal', val: '1.5', desc: 'فاصله‌گذاری استاندارد (مناسب متون بدنه فارسی)', descEn: 'Standard normal line height' },
  { name: 'leading-relaxed', val: '1.625', desc: 'فاصله‌گذاری باز و روان', descEn: 'Relaxed line spacing' },
  { name: 'leading-loose', val: '2', desc: 'فاصله‌گذاری کاملاً باز', descEn: 'Loose line spacing' }
];

export const BORDER_RADIUS = [
  { name: 'rounded-none', val: '0px', desc: 'گوشه کاملا تیز', descEn: 'Sharp square corners (0px)' },
  { name: 'rounded-sm', val: '2px (0.125rem)', desc: 'گوشه بسیار اندک نرم', descEn: 'Subtle rounded corners (2px)' },
  { name: 'rounded', val: '4px (0.25rem)', desc: 'گوشه نرم معمولی', descEn: 'Standard rounded corners (4px)' },
  { name: 'rounded-md', val: '6px (0.375rem)', desc: 'گوشه متوسط استاندارد', descEn: 'Medium rounded corners (6px)' },
  { name: 'rounded-lg', val: '8px (0.5rem)', desc: 'گوشه نرم بزرگ', descEn: 'Large rounded corners (8px)' },
  { name: 'rounded-xl', val: '12px (0.75rem)', desc: 'گوشه فوق‌العاده نرم', descEn: 'Extra large rounded corners (12px)' },
  { name: 'rounded-2xl', val: '16px (1rem)', desc: 'گوشه بسیار نرم مدرن', descEn: 'Modern soft corners (16px)' },
  { name: 'rounded-3xl', val: '24px (1.5rem)', desc: 'گوشه حبابی دکوراتیو', descEn: 'Pill decorative corners (24px)' },
  { name: 'rounded-full', val: '9999px', desc: 'گوشه کاملا گرد / دایره‌ای', descEn: 'Full pill / circular corners' }
];

export const SHADOW_SCALE = [
  { name: 'shadow-sm', val: '0 1px 2px 0 rgb(0 0 0 / 0.05)', desc: 'سایه بسیار خفیف', descEn: 'Subtle light elevation' },
  { name: 'shadow', val: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', desc: 'سایه ملایم معمولی', descEn: 'Normal soft shadow' },
  { name: 'shadow-md', val: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', desc: 'سایه متوسط', descEn: 'Medium depth shadow' },
  { name: 'shadow-lg', val: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', desc: 'سایه عمیق بزرگ', descEn: 'Large deep shadow' },
  { name: 'shadow-xl', val: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', desc: 'سایه بسیار عمیق', descEn: 'Extra deep shadow' },
  { name: 'shadow-2xl', val: '0 25px 50px -12px rgb(0 0 0 / 0.25)', desc: 'سایه غوطه‌ور کامل', descEn: 'Floating high elevation shadow' },
  { name: 'shadow-inner', val: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)', desc: 'سایه داخلی (فرورفته)', descEn: 'Inset recessed shadow' }
];

export const OPACITY_SCALE = [
  { name: 'opacity-0', val: '0%', class: 'opacity-0' },
  { name: 'opacity-5', val: '5%', class: 'opacity-5' },
  { name: 'opacity-10', val: '10%', class: 'opacity-10' },
  { name: 'opacity-20', val: '20%', class: 'opacity-20' },
  { name: 'opacity-25', val: '25%', class: 'opacity-25' },
  { name: 'opacity-30', val: '30%', class: 'opacity-30' },
  { name: 'opacity-40', val: '40%', class: 'opacity-40' },
  { name: 'opacity-50', val: '50%', class: 'opacity-50' },
  { name: 'opacity-60', val: '60%', class: 'opacity-60' },
  { name: 'opacity-70', val: '70%', class: 'opacity-70' },
  { name: 'opacity-75', val: '75%', class: 'opacity-75' },
  { name: 'opacity-80', val: '80%', class: 'opacity-80' },
  { name: 'opacity-90', val: '90%', class: 'opacity-90' },
  { name: 'opacity-95', val: '95%', class: 'opacity-95' },
  { name: 'opacity-100', val: '100%', class: 'opacity-100' }
];

export const COLOR_PALETTES: { [key: string]: { [shade: string]: string } } = {
  slate: {
    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
    500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617'
  },
  gray: {
    50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
    500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712'
  },
  zinc: {
    50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
    500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b'
  },
  neutral: {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e',
    500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09'
  },
  stone: {
    50: '#fafaf9', 100: '#f4f4f0', 200: '#e6e6dd', 300: '#d1d1c4', 400: '#a3a393',
    500: '#787864', 600: '#5c5c4d', 700: '#45453a', 800: '#2e2e26', 900: '#1d1d18', 950: '#0c0c0a'
  },
  red: {
    50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171',
    500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
  },
  orange: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdbb74', 400: '#fb923c',
    500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407'
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
    500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03'
  },
  yellow: {
    50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15',
    500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006'
  },
  lime: {
    50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635',
    500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05'
  },
  green: {
    50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80',
    500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16'
  },
  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
    500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22'
  },
  teal: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
    500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e'
  },
  cyan: {
    50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee',
    500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344'
  },
  sky: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
    500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49'
  },
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
    500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
  },
  indigo: {
    50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
    500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
  },
  violet: {
    50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
    500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
  },
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
    500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
  },
  fuchsia: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9',
    500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e'
  },
  pink: {
    50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
    500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724'
  },
  rose: {
    50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
    500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519'
  }
};

export const WIDTH_UTILITIES = [
  { name: 'w-auto', val: 'auto', desc: 'اندازه خودکار بر اساس محتوا' },
  { name: 'w-full', val: '100%', desc: 'پر کردن کامل عرض والد' },
  { name: 'w-screen', val: '100vw', desc: 'اندازه برابر با عرض مانیتور (Viewport)' },
  { name: 'w-fit', val: 'fit-content', desc: 'اندازه چفت شده با حداقل حجم محتوای معتبر' },
  { name: 'w-max', val: 'max-content', desc: 'اندازه بر اساس عریض‌ترین المان داخل بدون شکستگی خط' },
  { name: 'w-min', val: 'min-content', desc: 'اندازه بر اساس باریک‌ترین کلمه داخل بدون ایجاد سرریز' }
];

export const MAX_WIDTH_UTILITIES = [
  { name: 'max-w-xs', val: '320px (20rem)', desc: 'حداکثر عرض بسیار کوچک' },
  { name: 'max-w-sm', val: '384px (24rem)', desc: 'حداکثر عرض کوچک' },
  { name: 'max-w-md', val: '448px (28rem)', desc: 'حداکثر عرض متوسط' },
  { name: 'max-w-lg', val: '512px (32rem)', desc: 'حداکثر عرض بزرگ' },
  { name: 'max-w-xl', val: '576px (36rem)', desc: 'حداکثر عرض خیلی بزرگ' },
  { name: 'max-w-2xl', val: '672px (42rem)', desc: 'حداکثر عرض ۲ برابر بزرگ' },
  { name: 'max-w-3xl', val: '768px (48rem)', desc: 'حداکثر عرض ۳ برابر بزرگ' },
  { name: 'max-w-4xl', val: '896px (56rem)', desc: 'حداکثر عرض ۴ برابر بزرگ' },
  { name: 'max-w-5xl', val: '1024px (64rem)', desc: 'حداکثر عرض ۵ برابر بزرگ' },
  { name: 'max-w-6xl', val: '1152px (72rem)', desc: 'حداکثر عرض ۶ برابر بزرگ' },
  { name: 'max-w-7xl', val: '1280px (80rem)', desc: 'حداکثر عرض استاندارد دسکتاپ' },
  { name: 'max-w-full', val: '100%', desc: 'حداکثر عرض برابر با والد' }
];

export const HEIGHT_UTILITIES = [
  { name: 'h-full', val: '100%', desc: 'پر کردن کامل ارتفاع والد' },
  { name: 'h-screen', val: '100vh', desc: 'اندازه برابر با ارتفاع کل مانیتور' },
  { name: 'min-h-screen', val: 'min-height: 100vh', desc: 'حداقل ارتفاع معادل کل مانیتور (اجازه گسترش به پایین دارد)' },
  { name: 'max-h-screen', val: 'max-height: 100vh', desc: 'حداکثر ارتفاع معادل کل مانیتور (جلوگیری از اسکرول بدنه)' }
];

export const Z_INDEX_SCALE = [
  { name: 'z-0', val: '0', desc: 'ارتفاع پیش‌فرض برای چیدمان نرمال' },
  { name: 'z-10', val: '10', desc: 'ارتفاع سطح اول (معمولا هدرها)' },
  { name: 'z-20', val: '20', desc: 'ارتفاع سطح دوم (ناوبری‌های ثابت)' },
  { name: 'z-30', val: '30', desc: 'ارتفاع سطح سوم (منوهای دراپ‌داون)' },
  { name: 'z-40', val: '40', desc: 'ارتفاع سطح چهارم (پوشش‌های تیره پس‌زمینه)' },
  { name: 'z-50', val: '50', desc: 'بیشترین ارتفاع پیش‌فرض (مدال‌ها و دیالوگ‌ها)' },
  { name: 'z-auto', val: 'auto', desc: 'کنترل خودکار چیدمان سه‌بعدی توسط والد' }
];

export const POSITIONS = [
  { name: 'relative', val: 'position: relative', desc: 'موقعیت نسبی؛ تکیه‌گاهی برای فرزندان با موقعیت مطلق', descEn: 'Relative positioning; reference frame for absolute children' },
  { name: 'absolute', val: 'position: absolute', desc: 'موقعیت مطلق؛ شناور بر اساس اولین والد موقعیت‌دار', descEn: 'Absolute positioning; positioned relative to nearest ancestor' },
  { name: 'fixed', val: 'position: fixed', desc: 'موقعیت ثابت؛ سنجاق شده به پنجره مرورگر بدون جابجایی با اسکرول', descEn: 'Fixed positioning; pinned to browser viewport' },
  { name: 'sticky', val: 'position: sticky', desc: 'موقعیت چسبنده؛ اسکرول می‌شود تا به آستانه برسد، سپس ثابت می‌ماند', descEn: 'Sticky positioning; toggles relative/fixed based on scroll' }
];

export const OVERFLOWS = [
  { name: 'overflow-hidden', val: 'overflow: hidden', desc: 'پنهان کردن محتوایی که از مرز جعبه خارج می‌شود', descEn: 'Clips overflowing content outside element boundaries' },
  { name: 'overflow-auto', val: 'overflow: auto', desc: 'نمایش اسکرول‌بار به صورت هوشمند و تنها در صورت نیاز', descEn: 'Automatically adds scrollbars when content overflows' },
  { name: 'overflow-scroll', val: 'overflow: scroll', desc: 'اجبار به نمایش همیشگی اسکرول‌بار (عمودی و افقی)', descEn: 'Always shows scrollbars regardless of overflow' },
  { name: 'overflow-clip', val: 'overflow: clip', desc: 'برش قطعی محتوای اضافی بدون امکان ناوبری یا اسکرول داخلی', descEn: 'Strictly clips excess content with zero scroll capability' }
];

export const CHEATSHEETS: CheatsheetItem[] = [
  {
    title: 'پدینگ واکنش‌گرا',
    titleEn: 'Responsive Padding',
    code: 'px-4 md:px-8 py-3 md:py-6',
    explanation: 'تغییر فواصل داخلی از موبایل تا دسکتاپ برای بهینه‌سازی خوانایی.',
    explanationEn: 'Scale internal spacing between mobile and desktop sizes for optimal readable layouts.'
  },
  {
    title: 'اندازه فونت واکنش‌گرا',
    titleEn: 'Responsive Typography Scale',
    code: 'text-lg md:text-3xl font-bold',
    explanation: 'بزرگنمایی پویای عناوین متناسب با عریض‌تر شدن مانیتور.',
    explanationEn: 'Dynamically resize heading typography to adapt gracefully on larger displays.'
  },
  {
    title: 'گرید ستونی واکنش‌گرا',
    titleEn: 'Responsive CSS Grid Columns',
    code: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    explanation: 'چیدمان چند ستونی عالی که در موبایل تک‌ستون و در دسکتاپ ۴ ستون می‌شود.',
    explanationEn: 'Establish dynamic multi-column grids that transform from 1-column on mobile to 4-columns on desktops.'
  },
  {
    title: 'نمایش انتخابی کامپوننت',
    titleEn: 'Responsive Visibility',
    code: 'hidden lg:block',
    explanation: 'پنهان کردن برخی کامپوننت‌های شلوغ یا سایدبارها در موبایل و نمایش در دسکتاپ.',
    explanationEn: 'Hide complex or secondary panels on smaller screens and display them on desktop screens.'
  },
  {
    title: 'فلکس واکنش‌گرا',
    titleEn: 'Responsive Flex Layout Direction',
    code: 'flex flex-col md:flex-row items-center gap-4',
    explanation: 'مرتب‌سازی زیر هم آیتم‌ها در موبایل و تبدیل آن به ردیف افقی در تبلت/دسکتاپ.',
    explanationEn: 'Stack children vertically on mobile viewports and seamlessly align them horizontally on larger screens.'
  },
  {
    title: 'فاصله پویا بین المان‌ها',
    titleEn: 'Dynamic Spacing Between Items',
    code: 'gap-4 md:gap-8',
    explanation: 'تنظیم هوشمند فاصله بین کارت‌ها به تناسب فضای خالی نمایشگر.',
    explanationEn: 'Adjust structural grid/flex gutters dynamically based on screen real estate.'
  },
  {
    title: 'کارت پرمیوم برجسته',
    titleEn: 'Elevated Premium Card Layout',
    code: 'bg-slate-900 border border-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300',
    explanation: 'ساختار پایه‌ای برای یک کارت بسیار مدرن به سبک داشبوردهای لوکس.',
    explanationEn: 'Highly polished premium dashboard layout container featuring subtle borders and elegant hover states.'
  }
];

export const SEARCH_ITEMS: SearchItem[] = [
  // Breakpoints
  { category: 'Responsive Breakpoints', utility: 'sm:', css: 'min-width: 640px', description: 'تغییر ویژگی در عرض‌های بالاتر از ۶۴۰ پیکسل', descriptionEn: 'Applies styles at viewport widths of 640px and above' },
  { category: 'Responsive Breakpoints', utility: 'md:', css: 'min-width: 768px', description: 'تغییر ویژگی در عرض‌های بالاتر از ۷۶۸ پیکسل', descriptionEn: 'Applies styles at viewport widths of 768px and above' },
  { category: 'Responsive Breakpoints', utility: 'lg:', css: 'min-width: 1024px', description: 'تغییر ویژگی در عرض‌های بالاتر از ۱۰۲۴ پیکسل', descriptionEn: 'Applies styles at viewport widths of 1024px and above' },
  { category: 'Responsive Breakpoints', utility: 'xl:', css: 'min-width: 1280px', description: 'تغییر ویژگی در عرض‌های بالاتر از ۱۲۸۰ پیکسل', descriptionEn: 'Applies styles at viewport widths of 1280px and above' },
  { category: 'Responsive Breakpoints', utility: '2xl:', css: 'min-width: 1536px', description: 'تغییر ویژگی در عرض‌های بالاتر از ۱۵۳۶ پیکسل', descriptionEn: 'Applies styles at viewport widths of 1536px and above' },
  
  // Containers
  { category: 'Containers', utility: 'container', css: 'width: 100%; max-width: dynamic;', description: 'ایجاد کانتینر مرکزی واکنش‌گرا', descriptionEn: 'Creates a centered responsive container with fixed max-widths' },
  
  // Spacing
  { category: 'Spacing', utility: 'p-0', css: 'padding: 0px', description: 'پدینگ صفر', descriptionEn: 'Zero internal padding' },
  { category: 'Spacing', utility: 'p-4', css: 'padding: 16px (1rem)', description: 'پدینگ متوسط از هر چهار جهت', descriptionEn: 'Medium internal padding on all sides' },
  { category: 'Spacing', utility: 'm-auto', css: 'margin: auto', description: 'فاصله بیرونی خودکار برای وسط‌چین کردن', descriptionEn: 'Automatic margin on all sides to center an block element' },
  { category: 'Spacing', utility: 'gap-4', css: 'gap: 16px', description: 'فاصله‌گذاری مابین المان‌های فلکس یا گرید', descriptionEn: 'Defines spacing (gutters) between grid or flexbox items' },
  
  // Typography
  { category: 'Typography', utility: 'text-xs', css: 'font-size: 12px; line-height: 16px', description: 'تکست بسیار کوچک', descriptionEn: 'Extra small body text' },
  { category: 'Typography', utility: 'text-sm', css: 'font-size: 14px; line-height: 20px', description: 'تکست کوچک', descriptionEn: 'Small body text' },
  { category: 'Typography', utility: 'text-base', css: 'font-size: 16px; line-height: 24px', description: 'تکست معمولی استاندارد', descriptionEn: 'Standard baseline body text size' },
  { category: 'Typography', utility: 'text-lg', css: 'font-size: 18px; line-height: 28px', description: 'تکست کمی بزرگ', descriptionEn: 'Large subtitle or secondary header text' },
  { category: 'Typography', utility: 'text-xl', css: 'font-size: 20px; line-height: 28px', description: 'تکست بزرگ دسکتاپ', descriptionEn: 'Large desktop subtitle or card header' },
  { category: 'Typography', utility: 'text-3xl', css: 'font-size: 30px; line-height: 36px', description: 'تکست بسیار بزرگ برای عناوین', descriptionEn: 'Very large heading typography' },
  
  // Fonts
  { category: 'Typography', utility: 'font-sans', css: 'font-family: ui-sans-serif, system-ui', description: 'فونت sans-serif پیش‌فرض', descriptionEn: 'Default system sans-serif font family stack' },
  { category: 'Typography', utility: 'font-bold', css: 'font-weight: 700', description: 'متن ضخیم', descriptionEn: 'Bold font weight' },
  { category: 'Typography', utility: 'font-medium', css: 'font-weight: 500', description: 'متن متوسط', descriptionEn: 'Medium font weight' },
  
  // Shadows
  { category: 'Shadows', utility: 'shadow-sm', css: 'box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)', description: 'سایه کوچک', descriptionEn: 'Subtle outer card shadow' },
  { category: 'Shadows', utility: 'shadow-md', css: 'box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)', description: 'سایه متوسط شیک', descriptionEn: 'Elegant medium shadow for card depth' },
  { category: 'Shadows', utility: 'shadow-lg', css: 'box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)', description: 'سایه عمیق بزرگ', descriptionEn: 'Deep shadow for dropdowns and flyouts' },
  { category: 'Shadows', utility: 'shadow-2xl', css: 'box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)', description: 'سایه شناوری کامل سه بعدی', descriptionEn: 'Heavy prominent shadow for high floating components' },

  // Borders
  { category: 'Borders', utility: 'rounded-none', css: 'border-radius: 0px', description: 'گوشه‌های کاملا تیز', descriptionEn: 'Strictly sharp squared corners' },
  { category: 'Borders', utility: 'rounded-md', css: 'border-radius: 6px', description: 'گوشه‌های نرم معمولی', descriptionEn: 'Standard soft corner radius' },
  { category: 'Borders', utility: 'rounded-xl', css: 'border-radius: 12px', description: 'گوشه‌های نرم شیک مدرن', descriptionEn: 'Stylish medium rounded corner radius' },
  { category: 'Borders', utility: 'rounded-3xl', css: 'border-radius: 24px', description: 'گوشه‌های کاملا گرد حبابی', descriptionEn: 'Fully rounded bubble corner radius' },
  { category: 'Borders', utility: 'rounded-full', css: 'border-radius: 9999px', description: 'دایره‌ای کامل', descriptionEn: 'Pill shape or full circular boundary' },

  // Flexbox
  { category: 'Flexbox', utility: 'flex', css: 'display: flex', description: 'چینش انعطاف‌پذیر به سبک فلکس‌باکس', descriptionEn: 'Establishes a flexible block layout container' },
  { category: 'Flexbox', utility: 'flex-row', css: 'flex-direction: row', description: 'چیدمان افقی آیتم‌ها در یک ردیف', descriptionEn: 'Aligns children horizontally from start to end' },
  { category: 'Flexbox', utility: 'flex-col', css: 'flex-direction: column', description: 'چیدمان عمودی آیتم‌ها زیر هم', descriptionEn: 'Stacks children vertically from top to bottom' },
  { category: 'Flexbox', utility: 'justify-center', css: 'justify-content: center', description: 'وسط‌چین کردن آیتم‌ها در محور اصلی', descriptionEn: 'Centers children along the primary flex axis' },
  { category: 'Flexbox', utility: 'items-center', css: 'align-items: center', description: 'وسط‌چین کردن آیتم‌ها در محور فرعی', descriptionEn: 'Centers children along the cross flex axis' },

  // Grid
  { category: 'Grid', utility: 'grid', css: 'display: grid', description: 'چینش دو بعدی شبکه‌ای', descriptionEn: 'Establishes a 2-dimensional grid layout container' },
  { category: 'Grid', utility: 'grid-cols-12', css: 'grid-template-columns: repeat(12, minmax(0, 1fr))', description: 'ایجاد شبکه ۱۲ ستونی', descriptionEn: 'Creates a standard 12-column grid layout grid template' },
  { category: 'Grid', utility: 'col-span-4', css: 'grid-column: span 4 / span 4', description: 'اشغال ۴ ستون از کل شبکه', descriptionEn: 'Spans the element across 4 columns of the parent grid' },

  // Colors
  { category: 'Colors', utility: 'bg-slate-900', css: 'background-color: #0f172a', description: 'پس‌زمینه تیره تبلور لوکس', descriptionEn: 'Luxurious dark slate background color' },
  { category: 'Colors', utility: 'text-emerald-500', css: 'color: #10b981', description: 'متن سبز زمردی فعال یا تایید', descriptionEn: 'Emerald green text for active states or success alerts' },
  { category: 'Colors', utility: 'text-cyan-400', css: 'color: #22d3ee', description: 'متن آبی فیروزه‌ای پویا', descriptionEn: 'Vibrant cyan text for highlight accents' },
  { category: 'Colors', utility: 'text-amber-500', css: 'color: #f59e0b', description: 'متن زرد کهربایی هشدار یا تایید ثانویه', descriptionEn: 'Amber yellow text for alerts or secondary states' }
];
