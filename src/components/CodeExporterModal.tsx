import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Copy, 
  Check, 
  Code2, 
  FileCode, 
  Layers, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { HeaderSettings } from '../types';
import { THEME_MAP } from '../utils/theme';

interface CodeExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: HeaderSettings;
}

export const CodeExporterModal: React.FC<CodeExporterModalProps> = ({
  isOpen,
  onClose,
  settings
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'blade' | 'react' | 'html'>('blade');
  const [copied, setCopied] = useState(false);

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const bladeCode = `{{-- 
  Amerce Botble E-Commerce Theme Header Template 
  File Path: platform/themes/amerce/partials/header.blade.php
  Preset: ${settings.style} | Color: ${settings.colorTheme}
--}}

<header class="amerce-header-wrapper w-full bg-white transition-all ${settings.isSticky ? 'sticky top-0 z-50 shadow-sm' : ''}" dir="${settings.language === 'ar' ? 'rtl' : 'ltr'}">
    
    {{-- 1. Top Utility Bar --}}
    @if(theme_option('show_top_bar', ${settings.showTopBar ? 'true' : 'false'}))
    <div class="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div class="container mx-auto flex items-center justify-between">
            <div class="flex items-center gap-4">
                <span class="flex items-center gap-1">
                    <i class="ti ti-phone-call text-emerald-400"></i>
                    <span>{{ __('Hotline:') }}</span>
                    <strong class="text-white">+966 800 123 456</strong>
                </span>
                <a href="{{ route('customer.track-order') }}" class="hover:text-white">{{ __('Track Order') }}</a>
            </div>

            <div class="flex items-center gap-3">
                {!! apply_filters('header_language_currency_switcher', null) !!}
                <a href="{{ route('marketplace.vendor.register') }}" class="text-amber-400 font-bold hover:underline">
                    {{ __('Become a Vendor (0% Fee)') }}
                </a>
            </div>
        </div>
    </div>
    @endif

    {{-- 2. Main Search & Brand Bar --}}
    <div class="container mx-auto py-3.5 px-4 flex items-center justify-between gap-6">
        <a href="{{ route('public.index') }}" class="flex items-center gap-2 text-2xl font-black text-slate-900">
            <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">A</div>
            <span>${settings.storeName}</span>
        </a>

        {{-- Smart Search Bar Form --}}
        <form action="{{ route('public.products') }}" method="GET" class="flex-1 max-w-2xl flex items-center border-2 border-slate-200 rounded-xl bg-white focus-within:border-emerald-600 transition-all">
            <select name="categories[]" class="h-11 px-3 bg-slate-50 border-e border-slate-200 text-xs font-semibold text-slate-700 outline-none rounded-s-lg">
                <option value="">{{ __('All Categories') }}</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @endforeach
            </select>

            <input type="text" name="q" placeholder="{{ __('Search 50,000+ products...') }}" class="w-full px-4 text-sm outline-none" required />

            <button type="submit" class="h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-e-lg text-sm transition-colors">
                <i class="ti ti-search"></i> {{ __('Search') }}
            </button>
        </form>

        {{-- Action Buttons (Wishlist, Compare, Cart, Account) --}}
        <div class="flex items-center gap-3">
            <a href="{{ route('public.wishlist') }}" class="relative p-2.5 hover:bg-slate-100 rounded-xl">
                <i class="ti ti-heart text-xl text-slate-700"></i>
                <span class="wishlist-count absolute top-1 end-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </a>

            <a href="{{ route('public.cart') }}" class="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100">
                <i class="ti ti-shopping-bag text-xl text-emerald-600"></i>
                <div class="flex flex-col text-start text-xs">
                    <span class="text-slate-400 font-medium">{{ __('Cart') }}</span>
                    <strong class="text-slate-900 cart-subtotal-header">$0.00</strong>
                </div>
            </a>
        </div>
    </div>

    {{-- 3. Mega Navigation Bar --}}
    <nav class="border-t border-b border-slate-100 bg-white">
        <div class="container mx-auto px-4 flex items-center justify-between">
            <div class="relative group">
                <button class="flex items-center gap-2 px-5 py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-t-xl">
                    <i class="ti ti-menu-2"></i>
                    <span>{{ __('Browse Categories') }}</span>
                </button>
            </div>

            {!! Menu::renderMenuLocation('main-menu', ['options' => ['class' => 'flex items-center gap-6 text-sm font-semibold']]) !!}

            <div class="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                <span>{{ __('Free Shipping on $99+') }}</span>
            </div>
        </div>
    </nav>
</header>`;

  const reactCode = `import React from 'react';
// Preset: ${settings.style} | Theme: ${settings.colorTheme}
export default function AmerceHeader() {
  return (
    <header className="w-full bg-white ${settings.isSticky ? 'sticky top-0 z-50 shadow-md' : ''}" dir="${settings.language === 'ar' ? 'rtl' : 'ltr'}">
      {/* Top Bar */}
      ${settings.showTopBar ? `<div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span>Hotline: +966 800 123 456</span>
          <span>Become a Vendor (0% Fee)</span>
        </div>
      </div>` : ''}
      
      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
        <h1 className="text-2xl font-black text-slate-900">${settings.storeName}</h1>
        {/* Search */}
        <div className="flex-1 max-w-2xl flex border-2 border-slate-200 rounded-xl overflow-hidden">
          <input className="w-full px-4 py-2 outline-none text-sm" placeholder="Search products..." />
          <button className="px-5 py-2 ${theme.primary} text-white font-bold text-sm">Search</button>
        </div>
        {/* Cart */}
        <button className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-xs">
          Cart (0)
        </button>
      </div>
    </header>
  );
}`;

  const htmlCode = `<!-- Amerce E-Commerce Tailwind Header -->
<header class="w-full bg-white border-b border-slate-200 ${settings.isSticky ? 'sticky top-0 z-50' : ''}" dir="${settings.language === 'ar' ? 'rtl' : 'ltr'}">
  <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
    <a href="#" class="text-2xl font-black text-slate-900">${settings.storeName}</a>
    <div class="flex-1 max-w-2xl flex border-2 border-slate-200 rounded-xl overflow-hidden">
      <input type="text" placeholder="Search..." class="w-full px-4 py-2 text-sm outline-none">
      <button class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm">Search</button>
    </div>
    <div class="flex items-center gap-3">
      <button class="p-2 bg-slate-100 rounded-xl text-xs font-bold">Cart ($0.00)</button>
    </div>
  </div>
</header>`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'blade': return bladeCode;
      case 'react': return reactCode;
      case 'html': return htmlCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalMarkup = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-white z-[10000]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isAr ? 'تصدير كود الهيدر المخصص' : 'Export Custom Header Code'}
              </h3>
              <p className="text-xs text-slate-400">
                {isAr ? 'متوافق بالكامل مع قوالب Botble CMS Amerce و Laravel و React و Tailwind' : 'Ready to paste into Botble CMS, Laravel Blade, React, or Tailwind HTML'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="px-6 pt-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('blade')}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'blade' 
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-500' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Botble CMS / Blade (`header.blade.php`)</span>
            </button>

            <button
              onClick={() => setActiveTab('react')}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'react' 
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-500' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>React / Next.js Component</span>
            </button>

            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'html' 
                  ? 'bg-slate-800 text-emerald-400 border-t-2 border-emerald-500' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>HTML + Tailwind CSS</span>
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm mb-2"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (isAr ? 'تم النسخ بنجاح!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
          </button>
        </div>

        {/* Code View Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950/90 font-mono text-xs text-slate-300 leading-relaxed">
          <pre className="overflow-x-auto p-4 bg-slate-900/80 rounded-xl border border-slate-800 selection:bg-emerald-500 selection:text-white">
            <code>{getActiveCode()}</code>
          </pre>
        </div>

        {/* Botble Integration Instructions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isAr 
                ? 'طريقة التثبيت في بوتيبل: افتح مجلد `platform/themes/amerce/partials/header.blade.php` واستبدل المحتوى أو خصصه عبر Theme Options.' 
                : 'Botble Install: Edit `platform/themes/amerce/partials/header.blade.php` or configure via Admin > Appearance > Theme Options.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalMarkup, document.body) : modalMarkup;
};
