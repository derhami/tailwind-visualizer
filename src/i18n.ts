import { Settings } from './types';

export function useI18n(dir: 'rtl' | 'ltr') {
  const isEn = dir === 'ltr';

  return {
    isEn,
    dir,

    // Header & Navbar
    brandTitle: isEn ? 'Tailwind Visualizer Pro' : 'ویژوالایزر تلویند پرفشنال',
    brandSub: isEn ? 'Interactive Design System & Breakpoints Reference' : 'سیستم جامع طراحی و مرجع تعاملی تلویند',
    liveViewport: isEn ? 'Live Window View' : 'عرض زنده مرورگر',
    deviceSimulator: isEn ? '📱 Device Simulator' : '📱 شبیه‌ساز دیوایس',
    mobile: isEn ? 'Mobile (375)' : 'موبایل (۳۷۵)',
    tablet: isEn ? 'Tablet (768)' : 'تبلت (۷۶۸)',
    laptop: isEn ? 'Laptop (1024)' : 'لپ‌تاپ (۱۰۲۴)',
    desktop: isEn ? 'Desktop (1440)' : 'دسکتاپ (۱۴۴۰)',
    largeScreen: isEn ? 'Large Display (1600)' : 'صفحه عریض (۱۶۰۰)',
    quickSearchPlaceholder: isEn ? 'Quick search classes (Ctrl+K)...' : 'جستجوی سریع کلاس‌ها (Ctrl+K)...',
    settingsTitle: isEn ? 'Settings' : 'تنظیمات',
    downloadSingle: isEn ? 'Download Standalone File' : 'دانلود فایل تکی',
    viewportLabel: isEn ? 'Viewport:' : 'عرض نمایشی:',

    // Sidebar & Navigation
    navTitle: isEn ? 'System Navigation' : 'منوی ناوبری سیستم',
    secBreakpoints: isEn ? '1. Responsive Breakpoints' : '۱. نقاط شکست ریسپانسیو',
    secContainer: isEn ? '2. Official Container' : '۲. کانتینر رسمی',
    secSpacing: isEn ? '3. Spacing Scale' : '۳. مقیاس فاصله‌ها (Spacing)',
    secTypography: isEn ? '4. Typography Scale' : '۴. اندازه تایپوگرافی',
    secFontWeights: isEn ? '5. Font Weights' : '۵. ضخامت فونت‌ها',
    secLetterSpacing: isEn ? '6. Letter Spacing' : '۶. فاصله بین حروف',
    secLineHeights: isEn ? '7. Line Heights' : '۷. ارتفاع خطوط',
    secBorderRadius: isEn ? '8. Border Radius' : '۸. شعاع گوشه حواشی',
    secShadows: isEn ? '9. Shadow Scale' : '۹. مقیاس سایه‌ها',
    secOpacity: isEn ? '10. Opacity Scale' : '۱۰. شفافیت و غلظت',
    secColors: isEn ? '11. Color Palettes' : '۱۱. پالت‌های رنگی رسمی',
    secWidthUtils: isEn ? '12. Width Utilities' : '۱۲. ابزارهای عرض',
    secMaxWidthUtils: isEn ? '13. Max Width Scales' : '۱۳. حداکثر عرض مجاز',
    secHeightUtils: isEn ? '14. Height Utilities' : '۱۴. ابزارهای ارتفاع',
    secFlexLab: isEn ? '15. Interactive Flexbox Lab' : '۱۵. آزمایشگاه تعاملی فلکس',
    secGridLab: isEn ? '16. Interactive 2D Grid Lab' : '۱۶. آزمایشگاه تعاملی گرید',
    secResponsiveLab: isEn ? '17. Responsive Class Lab' : '۱۷. آزمایشگاه واکنش‌گرایی',
    secZIndex: isEn ? '18. Layer Elevation (Z-Index)' : '۱۸. ارتفاع لایه‌ها (Z-Index)',
    secPosition: isEn ? '19. Positioning Methods' : '۱۹. روش‌های موقعیت‌دهی',
    secOverflow: isEn ? '20. Overflow Control' : '۲۰. کنترل سرریز محتوا',
    secCheatsheet: isEn ? '21. Quick Class Cheatsheet' : '۲۱. تقلب‌نامه کدهای پرکاربرد',
    secDesignTokens: isEn ? '22. Design Tokens Exporter' : '۲۲. توکن‌های کلی طراحی',

    // Section 1: Breakpoints
    bpTitle: isEn ? '1. Responsive Breakpoints & Screen Widths (Breakpoints)' : '۱. نقاط شکست ریسپانسیو و عرض‌های استاندارد (Breakpoints)',
    bpOfficialBadge: isEn ? 'Mobile-First Standard' : 'استاندارد موبایل-فرست',
    bpDesc: isEn ? 'Tailwind CSS uses a mobile-first breakpoint system. Unprefixed classes target all screen sizes, while prefix classes (sm:, md:, lg:, xl:, 2xl:) apply at min-width thresholds.' : 'تلویند بر پایه الگوی موبایل-فرست طراحی شده است. کلاس‌های بدون پیشوند روی تمام عرض‌ها اعمال شده و پیشوندها از حداقل عرض مشخص شده فعال می‌شوند.',
    bpSimulatorNote: isEn ? 'Active Breakpoint:' : 'نقطه شکست فعال:',

    // Section 2: Container
    containerTitle: isEn ? '2. Official Container & Responsive Behavior (Container)' : '۲. کانتینر رسمی و رفتارهای ریسپانسیو (Container)',
    containerSpecsHeader: isEn ? 'Tailwind Container Technical Specs' : 'مشخصات فنی کانتینر تلویند',
    containerMetricsHeader: isEn ? 'Live Container Metrics & Interactive Inspection' : 'اندازه‌گیری زنده کانتینر و بررسی تعاملی',
    containerDesc: isEn ? 'Click any breakpoint below to inspect its specs for mobile/tablet design directly on your desktop screen.' : 'برای مشاهده اطلاعات طراحی نسخه موبایل یا تبلت روی هر کدام از عرض‌های زیر کلیک کنید تا جزئیات کانتینر نمایش داده شود.',
    containerMaxWidth: isEn ? 'Container Max Width' : 'حداکثر عرض کانتینر',
    containerContentWidth: isEn ? 'Net Content Width' : 'عرض خالص محتوا',
    containerMargin: isEn ? 'Outer Margin' : 'حاشیه بیرونی (Margin)',
    containerPadding: isEn ? 'Inner Padding' : 'پدینگ داخلی (Padding)',
    containerColumns: isEn ? 'Grid Columns' : 'ستون‌های پیشنهادی',
    containerAutoView: isEn ? 'Auto (Sync Viewport)' : 'خودکار (همگام با مرورگر)',
    containerInspectingBadge: isEn ? 'Inspecting Spec:' : 'در حال بررسی مشخصات:',

    // Footer
    footerBuiltWith: isEn ? 'Built with' : 'ساخته شده با',
    footerForCommunity: isEn ? 'for the web developer community by' : 'برای جامعه توسعه‌دهندگان وب توسط',
    authorName: isEn ? 'Hamidreza Derhami' : 'حمیدرضا درهمی',

    // Common action strings
    copy: isEn ? 'Copy' : 'کپی',
    copied: isEn ? 'Copied!' : 'کپی شد!',
    pxLabel: isEn ? 'px' : 'پیکسل',
    remLabel: isEn ? 'rem' : 'رِم'
  };
}
