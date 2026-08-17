import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Palette, 
  Layout, 
  Code2, 
  Languages, 
  Eye, 
  Check, 
  Zap, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  Copy
} from 'lucide-react';
import { HeaderSettings, HeaderStyleId, ColorTheme } from '../types';
import { THEME_MAP } from '../utils/theme';

interface HeaderCustomizerPanelProps {
  settings: HeaderSettings;
  onUpdateSettings: (newSettings: Partial<HeaderSettings>) => void;
  onOpenCodeExport: () => void;
  onResetDefaults: () => void;
}

export const HeaderCustomizerPanel: React.FC<HeaderCustomizerPanelProps> = ({
  settings,
  onUpdateSettings,
  onOpenCodeExport,
  onResetDefaults
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const headerVariants: { id: HeaderStyleId; titleAr: string; titleEn: string; descAr: string; descEn: string; badge: string }[] = [
    {
      id: 'classic-prime',
      titleAr: '1. أميرس الكلاسيكي المتكامل (3-Tier)',
      titleEn: '1. Amerce Classic Prime (3-Tier)',
      descAr: 'النموذج القياسي الأقوى للماركت بليس: شريط إعلانات علوي، بحث ذكي مع أقسام، وميجا منيو ضخمة.',
      descEn: 'The full marketplace standard: top utility bar, categorized smart search, and huge mega flyout.',
      badge: 'POPULAR'
    },
    {
      id: 'sleek-tech',
      titleAr: '2. التقنية والمودرن العصري (Sleek Tech)',
      titleEn: '2. Sleek Minimalist Tech (Dark/Light)',
      descAr: 'تصميم عالي الكثافة مع شريط بحث كوماند، وسلة عائمة، وشرائح للأقسام التقنية.',
      descEn: 'High density dark/light tech layout with command search, floating pill cart, and chip filters.',
      badge: 'TECH'
    },
    {
      id: 'luxury-fashion',
      titleAr: '3. بوتيك الأزياء والماركات الفاخرة',
      titleEn: '3. Luxury Fashion & Boutique',
      descAr: 'شعار أنيق بالمنتصف، قائمة لوك بوك مصورة، وبحث منبثق بملء الشاشة مع طباعة فاخرة.',
      descEn: 'Centered brand monogram, visual lookbook mega menu, fullscreen search overlay & luxury typography.',
      badge: 'LUXURY'
    },
    {
      id: 'grocery-express',
      titleAr: '4. السوبرماركت والتوصيل السريع (Express)',
      titleEn: '4. Supermarket & Express Fresh',
      descAr: 'محدد موقع التوصيل الفوري، شريط أقسام طازجة بألوان حيوية وكوبونات يومية.',
      descEn: 'Instant geo/city delivery selector, fresh category navigation bar, and express coupons.',
      badge: 'FRESH'
    },
    {
      id: 'compact-market',
      titleAr: '5. الماركت بليس المضغوط السريع (Compact)',
      titleEn: '5. Compact Omni Marketplace',
      descAr: 'شريط موحد مضغوط مع شبكة أقسام منبثقة، وتصفح سلس وسريع.',
      descEn: 'Single unified app-bar with popover department grid and snappy multi-vendor navigation.',
      badge: 'FAST'
    }
  ];

  const colorThemes: { id: ColorTheme; nameAr: string; nameEn: string; colorHex: string }[] = [
    { id: 'emerald', nameAr: 'زمردي (Amerce Green)', nameEn: 'Amerce Emerald', colorHex: '#059669' },
    { id: 'blue', nameAr: 'أزرق ملكي (Royal Blue)', nameEn: 'Royal Blue', colorHex: '#2563eb' },
    { id: 'slate', nameAr: 'أسود فاخر (Midnight Slate)', nameEn: 'Midnight Slate', colorHex: '#0f172a' },
    { id: 'orange', nameAr: 'برتقالي مشرق (Sunset Flame)', nameEn: 'Sunset Orange', colorHex: '#ea580c' },
    { id: 'purple', nameAr: 'بنفسجي عصري (Neon Violet)', nameEn: 'Neon Violet', colorHex: '#9333ea' }
  ];

  if (isCollapsed) {
    return (
      <div className="fixed bottom-6 end-6 z-40 animate-fadeIn">
        <button
          onClick={() => setIsCollapsed(false)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full text-white font-bold text-xs shadow-2xl transition-all hover:scale-105 cursor-pointer ${theme.primary} ${theme.primaryHover}`}
        >
          <Sliders className="w-4 h-4" />
          <span>{isAr ? 'تخصيص الهيدر وتجربة الأنماط' : 'Customize Header Styles'}</span>
        </button>
      </div>
    );
  }

  return (
    <aside 
      id="header-customizer-studio"
      className="bg-slate-900 text-white border-t border-slate-800 p-5 shadow-2xl relative z-30"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl text-white ${theme.primary}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-white">
                  {isAr ? `استوديو تصميم وتخصيص هيدر متجر ${settings.storeName}` : `${settings.storeName} Header Design Studio`}
                </h2>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                  v2.8 BOTBLE READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAr 
                  ? 'اختر من بين 5 نماذج هيدر احترافية، وخصص الألوان واللغة والخصائص وانسخ كود القالب الجاهز' 
                  : 'Switch between 5 professional header models, tweak colors, RTL/LTR and export ready-to-use code'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCodeExport}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md ${theme.primary} ${theme.primaryHover}`}
            >
              <Code2 className="w-4 h-4" />
              <span>{isAr ? 'تصدير الكود (Blade / HTML / React)' : 'Export Code'}</span>
            </button>

            <button
              onClick={onResetDefaults}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              title="Reset Settings"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              title="Collapse"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5">
          
          {/* Column 1: Header Styles Selection (5 Cols) */}
          <div className="md:col-span-6 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'نماذج وأنماط الهيدر (5 تصاميم جاهزة)' : 'Header Style Archetypes'}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {headerVariants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => onUpdateSettings({ style: v.id })}
                  className={`p-3 rounded-xl text-start transition-all cursor-pointer border flex flex-col justify-between relative ${
                    settings.style === v.id
                      ? 'border-emerald-500 bg-slate-800/90 ring-2 ring-emerald-500/20 shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {isAr ? v.titleAr : v.titleEn}
                    </span>
                    {settings.style === v.id ? (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded font-mono">
                        {v.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5">
                    {isAr ? v.descAr : v.descEn}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Color Themes & Brand (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'لوحة الألوان الأساسية' : 'Primary Color Scheme'}</span>
            </label>

            <div className="flex flex-wrap gap-2.5">
              {colorThemes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onUpdateSettings({ colorTheme: c.id })}
                  className={`flex items-center gap-2 p-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    settings.colorTheme === c.id
                      ? 'border-white bg-slate-800 text-white shadow-md'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20" 
                    style={{ backgroundColor: c.colorHex }}
                  />
                  <span>{isAr ? c.nameAr : c.nameEn}</span>
                </button>
              ))}
            </div>

            {/* Store Name Input */}
            <div className="pt-2">
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                {isAr ? 'اسم المتجر / العلامة التجارية:' : 'Store Name:'}
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => onUpdateSettings({ storeName: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Column 3: Toggles & Layout (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'خيارات وسلوك الهيدر' : 'Header Behavior & Layout'}</span>
            </label>

            <div className="space-y-2">
              {/* Language Switch */}
              <div className="flex items-center justify-between p-2.5 bg-slate-800/60 border border-slate-800 rounded-xl text-xs">
                <span className="text-slate-300">{isAr ? 'اللغة والاتجاه (RTL/LTR)' : 'Language & Direction'}</span>
                <button
                  onClick={() => onUpdateSettings({ language: isAr ? 'en' : 'ar' })}
                  className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {isAr ? '🇸🇦 العربية (RTL)' : '🇺🇸 English (LTR)'}
                </button>
              </div>

              {/* Top Bar Toggle */}
              <div className="flex items-center justify-between p-2.5 bg-slate-800/60 border border-slate-800 rounded-xl text-xs">
                <span className="text-slate-300">{isAr ? 'إظهار الشريط الإعلاني العلوي' : 'Show Top Utility Bar'}</span>
                <button
                  onClick={() => onUpdateSettings({ showTopBar: !settings.showTopBar })}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    settings.showTopBar ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.showTopBar ? (isAr ? '-translate-x-4' : 'translate-x-4') : ''
                  }`} />
                </button>
              </div>

              {/* Sticky Header Toggle */}
              <div className="flex items-center justify-between p-2.5 bg-slate-800/60 border border-slate-800 rounded-xl text-xs">
                <span className="text-slate-300">{isAr ? 'تثبيت الهيدر أثناء التمرير (Sticky)' : 'Sticky Header On Scroll'}</span>
                <button
                  onClick={() => onUpdateSettings({ isSticky: !settings.isSticky })}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    settings.isSticky ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-1 start-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.isSticky ? (isAr ? '-translate-x-4' : 'translate-x-4') : ''
                  }`} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </aside>
  );
};
