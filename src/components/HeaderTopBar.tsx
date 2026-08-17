import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  Truck, 
  HelpCircle, 
  Store, 
  ChevronDown, 
  Sparkles, 
  Globe, 
  Coins, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { ANNOUNCEMENT_MESSAGES } from '../data/mockData';
import { HeaderSettings, Language } from '../types';
import { THEME_MAP } from '../utils/theme';

interface HeaderTopBarProps {
  settings: HeaderSettings;
  onUpdateSettings: (newSettings: Partial<HeaderSettings>) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
  onOpenVendorModal: () => void;
  onOpenTrackOrder: () => void;
}

export const HeaderTopBar: React.FC<HeaderTopBarProps> = ({
  settings,
  onUpdateSettings,
  currency,
  onCurrencyChange,
  onOpenVendorModal,
  onOpenTrackOrder
}) => {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const theme = THEME_MAP[settings.colorTheme];
  const isAr = settings.language === 'ar';

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencies = [
    { code: 'SAR', label: 'ر.س (SAR)', symbol: 'ر.س' },
    { code: 'USD', label: '$ (USD)', symbol: '$' },
    { code: 'AED', label: 'د.إ (AED)', symbol: 'د.إ' },
    { code: 'EUR', label: '€ (EUR)', symbol: '€' }
  ];

  return (
    <div id="amerce-top-bar" className="hidden md:block w-full bg-[#1a1a1a] text-white text-[11px] font-medium tracking-wider uppercase border-b border-white/10 transition-colors duration-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left Side: Customer Support & Store Locator / Track */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center md:justify-start">
          <a 
            href="tel:+966800123456" 
            className="flex items-center gap-1.5 hover:text-[#f27d26] transition-colors"
            title="Customer Support Hotline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#f27d26]" />
            <span className="font-medium text-white/80">{isAr ? 'خدمة العملاء:' : 'Support:'}</span>
            <span className="font-semibold text-white tracking-normal" dir="ltr">+1 (800) 555-0199</span>
          </a>

          <span className="hidden sm:inline-block text-white/20">|</span>

          <button 
            onClick={onOpenTrackOrder}
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5 opacity-70" />
            <span>{isAr ? 'تتبع الشحنة' : 'Store Locator & Track'}</span>
          </button>

          <span className="hidden sm:inline-block text-white/20">|</span>

          <button 
            onClick={onOpenVendorModal}
            className="flex items-center gap-1 text-[#f27d26] hover:text-[#df6b15] transition-colors font-bold cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" />
            <span>{isAr ? 'انضم كتاجر' : 'Sell with Us'}</span>
            <span className="bg-[#f27d26]/20 text-[#f27d26] text-[10px] px-1.5 py-0.2 rounded font-bold border border-[#f27d26]/30">
              {isAr ? 'عمولة 0%' : '0% Fee'}
            </span>
          </button>
        </div>

        {/* Center: Live Announcement Carousel */}
        <div className="hidden lg:flex items-center justify-center max-w-md overflow-hidden text-center">
          <div className="animate-fadeIn flex items-center gap-2 text-stone-300 font-medium normal-case">
            <Sparkles className="w-3.5 h-3.5 text-[#f27d26] shrink-0 animate-pulse" />
            <span className="truncate">
              {isAr 
                ? ANNOUNCEMENT_MESSAGES[announcementIndex].ar 
                : ANNOUNCEMENT_MESSAGES[announcementIndex].en}
            </span>
          </div>
        </div>

        {/* Right Side: Currency, Language, Flash Sale Badge */}
        <div ref={dropdownRef} className="flex items-center gap-3 sm:gap-4 relative z-[100]">
          
          {/* Flash Sale Banner Pill */}
          <div className="bg-[#f27d26] text-white px-2.5 py-0.5 rounded-xs font-bold tracking-normal text-[10px] shadow-xs animate-pulse">
            {isAr ? 'تخفيضات فلاش: خصم 40%' : 'FLASH SALE: -40% OFF'}
          </div>

          <span className="hidden sm:inline-block text-white/20">|</span>

          {/* Currency Dropdown */}
          <div className="relative">
            <button 
              id="currency-selector-btn"
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLangOpen(false);
              }}
              className="flex items-center gap-1 hover:text-white text-stone-300 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-[11px]"
            >
              <Coins className="w-3 h-3 text-[#f27d26]" />
              <span>{currency}</span>
              <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCurrencyOpen && (
              <div className="absolute top-full end-0 mt-2 w-36 bg-[#1a1a1a] text-stone-200 rounded-xl shadow-2xl border border-stone-700 py-1.5 z-[1000] animate-fadeIn divide-y divide-stone-800/60">
                <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  {isAr ? 'اختر العملة' : 'Select Currency'}
                </div>
                <div>
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setIsCurrencyOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-800 flex items-center justify-between cursor-pointer transition-colors ${
                        currency === c.code ? 'font-bold text-[#f27d26] bg-[#f27d26]/10' : 'text-stone-300'
                      }`}
                    >
                      <span>{c.label}</span>
                      {currency === c.code && <Check className="w-3.5 h-3.5 text-[#f27d26]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button 
              id="language-selector-btn"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsCurrencyOpen(false);
              }}
              className="flex items-center gap-1 hover:text-white text-stone-300 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-[11px]"
            >
              <Globe className="w-3 h-3 text-[#f27d26]" />
              <span>{isAr ? 'العربية' : 'English'}</span>
              <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full end-0 mt-2 w-36 bg-[#1a1a1a] text-stone-200 rounded-xl shadow-2xl border border-stone-700 py-1.5 z-[1000] animate-fadeIn divide-y divide-stone-800/60">
                <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  {isAr ? 'اختر اللغة' : 'Select Language'}
                </div>
                <div>
                  <button
                    onClick={() => {
                      onUpdateSettings({ language: 'ar' });
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-800 flex items-center justify-between cursor-pointer transition-colors ${
                      isAr ? 'font-bold text-[#f27d26] bg-[#f27d26]/10' : 'text-stone-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-sans">🇸🇦 العربية</span>
                    {isAr && <Check className="w-3.5 h-3.5 text-[#f27d26]" />}
                  </button>
                  <button
                    onClick={() => {
                      onUpdateSettings({ language: 'en' });
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-800 flex items-center justify-between cursor-pointer transition-colors ${
                      !isAr ? 'font-bold text-[#f27d26] bg-[#f27d26]/10' : 'text-stone-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 font-sans">🇺🇸 English</span>
                    {!isAr && <Check className="w-3.5 h-3.5 text-[#f27d26]" />}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
