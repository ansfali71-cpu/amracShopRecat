import React, { useState, useRef, useEffect } from 'react';
import { Globe, Coins, ChevronDown, Check } from 'lucide-react';
import { HeaderSettings, Language } from '../types';
import { THEME_MAP } from '../utils/theme';

interface MobileHeaderControlsProps {
  settings: HeaderSettings;
  onUpdateSettings: (newSettings: Partial<HeaderSettings>) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
  variant?: 'light' | 'dark';
}

export const MobileHeaderControls: React.FC<MobileHeaderControlsProps> = ({
  settings,
  onUpdateSettings,
  currency,
  onCurrencyChange,
  variant = 'light'
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const isAr = settings.language === 'ar';
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencies = [
    { code: 'SAR', label: 'ر.س (SAR)', short: 'SAR' },
    { code: 'USD', label: '$ (USD)', short: 'USD' },
    { code: 'AED', label: 'د.إ (AED)', short: 'AED' },
    { code: 'EUR', label: '€ (EUR)', short: 'EUR' }
  ];

  const isDarkTheme = variant === 'dark';

  return (
    <div ref={containerRef} className="flex items-center gap-1.5 shrink-0 relative z-[70]">
      {/* 1. Currency Selector Pill */}
      <div className="relative">
        <button
          id="mobile-header-currency-btn"
          onClick={() => {
            setIsCurrencyOpen(!isCurrencyOpen);
            setIsLangOpen(false);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
            isDarkTheme
              ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-stone-100 hover:bg-stone-200 border-stone-200/80 text-stone-800'
          }`}
          aria-label="Change Currency"
        >
          <Coins className="w-3.5 h-3.5 text-[#f27d26]" />
          <span className="font-mono text-[11px]">{currency}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''} opacity-60`} />
        </button>

        {isCurrencyOpen && (
          <div className="absolute top-full end-0 mt-1.5 w-36 bg-white text-stone-800 rounded-xl shadow-2xl border border-gray-200 py-1.5 z-[100] animate-fadeIn divide-y divide-gray-100">
            <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {isAr ? 'العملة' : 'Currency'}
            </div>
            <div>
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    onCurrencyChange(c.code);
                    setIsCurrencyOpen(false);
                  }}
                  className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors cursor-pointer ${
                    currency === c.code ? 'font-bold text-[#f27d26] bg-[#f27d26]/10' : 'text-stone-700'
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

      {/* 2. Language Switcher Pill */}
      <div className="relative">
        <button
          id="mobile-header-language-btn"
          onClick={() => {
            setIsLangOpen(!isLangOpen);
            setIsCurrencyOpen(false);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
            isDarkTheme
              ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
              : 'bg-stone-100 hover:bg-stone-200 border-stone-200/80 text-stone-800'
          }`}
          aria-label="Change Language"
        >
          <Globe className="w-3.5 h-3.5 text-[#f27d26]" />
          <span className="text-[11px]">{isAr ? 'عربي' : 'EN'}</span>
          <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''} opacity-60`} />
        </button>

        {isLangOpen && (
          <div className="absolute top-full end-0 mt-1.5 w-36 bg-white text-stone-800 rounded-xl shadow-2xl border border-gray-200 py-1.5 z-[100] animate-fadeIn divide-y divide-gray-100">
            <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {isAr ? 'اللغة' : 'Language'}
            </div>
            <div>
              <button
                onClick={() => {
                  onUpdateSettings({ language: 'ar' });
                  setIsLangOpen(false);
                }}
                className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors cursor-pointer ${
                  isAr ? 'font-bold text-[#f27d26] bg-[#f27d26]/10' : 'text-stone-700'
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
                className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between transition-colors cursor-pointer ${
                  !isAr ? 'font-bold text-[#f27d26] bg-[#f27d26]/10' : 'text-stone-700'
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
  );
};
