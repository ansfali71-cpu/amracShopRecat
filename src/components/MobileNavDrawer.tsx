import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  PhoneCall, 
  Truck, 
  Store, 
  Sparkles, 
  Flame, 
  Globe, 
  Coins, 
  User, 
  Heart, 
  Scale, 
  ShoppingBag, 
  Zap,
  ArrowRight,
  Check,
  ShieldCheck
} from 'lucide-react';
import { HeaderSettings, CategoryItem, Product } from '../types';
import { CATEGORIES } from '../data/mockData';
import { THEME_MAP } from '../utils/theme';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: HeaderSettings;
  onUpdateSettings: (newSettings: Partial<HeaderSettings>) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenVendorModal: () => void;
  onOpenTrackOrder: () => void;
  onSelectCategory?: (cat: CategoryItem) => void;
  initialTab?: 'menu' | 'categories';
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  currency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  compareCount,
  isLoggedIn,
  onToggleLogin,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenVendorModal,
  onOpenTrackOrder,
  onSelectCategory,
  initialTab = 'menu'
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'categories'>(initialTab);
  const [expandedCatId, setExpandedCatId] = useState<string | null>(null);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

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

  const toggleCategory = (catId: string) => {
    setExpandedCatId(prev => prev === catId ? null : catId);
  };

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen overflow-hidden font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Backdrop Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Drawer Container - Guaranteed full height and dynamic viewport support */}
      <div 
        className={`fixed top-0 bottom-0 ${
          isAr ? 'start-0' : 'start-0'
        } w-[86vw] max-w-[340px] sm:max-w-sm h-full h-[100dvh] max-h-[100dvh] bg-white shadow-2xl flex flex-col z-[10000] overflow-hidden animate-fadeIn`}
      >
        {/* Drawer Header (Fixed at top) */}
        <div className="p-3.5 sm:p-4 bg-[#1a1a1a] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif italic text-white flex items-baseline">
              <span>{settings.storeName}</span>
              <span className="text-[#f27d26] text-2xl sm:text-3xl not-italic leading-none">.</span>
            </h2>
            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-sans font-bold ps-1">
              MENU
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Main Menu / Categories (Fixed below header) */}
        <div className="flex border-b border-gray-200 bg-stone-50 shrink-0">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider transition-colors text-center border-b-2 ${
              activeTab === 'menu'
                ? 'border-[#1a1a1a] text-[#121212] bg-white'
                : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            {isAr ? 'القائمة الرئيسية' : 'Navigation'}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider transition-colors text-center border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'categories'
                ? 'border-[#f27d26] text-[#f27d26] bg-white'
                : 'border-transparent text-stone-500 hover:text-black'
            }`}
          >
            <span>{isAr ? 'تصفح الأقسام' : 'Categories'}</span>
            <span className="bg-[#f27d26] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
              {CATEGORIES.length}
            </span>
          </button>
        </div>

        {/* Drawer Scrollable Content (Scrolls cleanly between header and footer) */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain divide-y divide-gray-100 pb-2">
          {activeTab === 'menu' ? (
            <div className="py-2">
              {/* Quick Navigation Links */}
              <div className="px-2 py-1 space-y-0.5">
                <a
                  href="#home"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold text-[#121212] hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <span>{isAr ? 'الرئيسية' : 'Home'}</span>
                  <ChevronRight className={`w-4 h-4 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </a>

                <a
                  href="#shop"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{isAr ? 'المتجر والتصنيفات' : 'Collections'}</span>
                    <span className="bg-[#f27d26] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                      HOT
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </a>

                <a
                  href="#deals"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-bold text-[#df6b15] hover:bg-[#f27d26]/5 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#f27d26] fill-[#f27d26]" />
                    <span>{isAr ? 'عروض فلاش ديلز' : 'Flash Drops'}</span>
                  </div>
                  <span className="bg-[#f27d26]/10 text-[#df6b15] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#f27d26]/20">
                    -40% OFF
                  </span>
                </a>

                <a
                  href="#brands"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <span>{isAr ? 'الماركات والبراندات' : 'Curated Lookbook'}</span>
                  <ChevronRight className={`w-4 h-4 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </a>

                <a
                  href="#vendors"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>{isAr ? 'المتاجر والبائعين' : 'Artisans & Vendors'}</span>
                    <span className="bg-[#1a1a1a] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                      NEW
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </a>

                <a
                  href="#blog"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <span>{isAr ? 'مجلة المتجر والمدونة' : 'Journal & Stories'}</span>
                  <ChevronRight className={`w-4 h-4 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </a>

                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50 rounded-xl transition-colors"
                >
                  <span>{isAr ? 'خدمة العملاء واتصل بنا' : 'Contact Support'}</span>
                  <ChevronRight className={`w-4 h-4 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </a>
              </div>

              {/* Quick Actions Cluster */}
              <div className="px-4 py-3 border-t border-gray-100 mt-2 space-y-2">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  {isAr ? 'خدمات سريعة' : 'Quick Actions'}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl text-start transition-colors cursor-pointer border border-gray-100"
                  >
                    <Heart className="w-4 h-4 text-[#f27d26]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#121212]">{isAr ? 'المفضلة' : 'Wishlist'}</span>
                      <span className="text-[10px] text-stone-400">{wishlistCount} {isAr ? 'عنصر' : 'items'}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onOpenCompare();
                      onClose();
                    }}
                    className="flex items-center gap-2 p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl text-start transition-colors cursor-pointer border border-gray-100"
                  >
                    <Scale className="w-4 h-4 text-[#1a1a1a]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#121212]">{isAr ? 'المقارنة' : 'Compare'}</span>
                      <span className="text-[10px] text-stone-400">{compareCount} {isAr ? 'عنصر' : 'items'}</span>
                    </div>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onOpenTrackOrder();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl text-start transition-colors cursor-pointer border border-gray-100 text-xs font-bold text-stone-800"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-stone-600" />
                    <span>{isAr ? 'تتبع شحنتك المباشرة' : 'Track Active Order'}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    onOpenVendorModal();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 bg-[#f27d26]/10 hover:bg-[#f27d26]/15 rounded-xl text-start transition-colors cursor-pointer border border-[#f27d26]/20 text-xs font-bold text-[#df6b15]"
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#f27d26]" />
                    <span>{isAr ? 'كن تاجراً / بيع معنا (عمولة 0%)' : 'Become a Vendor (0% Fee)'}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 text-[#f27d26] ${isAr ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          ) : (
            /* Categories Tab */
            <div className="py-2">
              <div className="px-4 py-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                {isAr ? 'جميع أقسام المتجر' : 'All Departments'}
              </div>

              <div className="divide-y divide-gray-100">
                {CATEGORIES.map((cat) => {
                  const isExpanded = expandedCatId === cat.id;
                  return (
                    <div key={cat.id} className="transition-colors">
                      <button
                        onClick={() => toggleCategory(cat.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-start hover:bg-stone-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold shrink-0">
                            {cat.id === 'women-makhawir' && '👑'}
                            {cat.id === 'girls-fashion' && '✨'}
                            {cat.id === 'boys-wear' && '👔'}
                            {cat.id === 'fabrics-curtains' && '🧵'}
                            {cat.id !== 'women-makhawir' && cat.id !== 'girls-fashion' && cat.id !== 'boys-wear' && cat.id !== 'fabrics-curtains' && '🛍️'}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#121212] truncate">
                                {isAr ? cat.nameAr : cat.nameEn}
                              </span>
                              {cat.badge && (
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                                  cat.badge === 'HOT' || cat.badge === 'EXCLUSIVE' ? 'bg-[#f27d26] text-white' : 'bg-[#1a1a1a] text-white'
                                }`}>
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-stone-400 font-mono">
                              {cat.itemCount} {isAr ? 'موديل متوفر' : 'items available'}
                            </span>
                          </div>
                        </div>

                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Subcategories accordion */}
                      {isExpanded && cat.subcategories && (
                        <div className="bg-stone-50/80 px-4 py-2 border-y border-gray-100 space-y-3">
                          {cat.subcategories.map((sub, sIdx) => (
                            <div key={sIdx} className="space-y-1">
                              <h5 className="text-[11px] font-bold text-stone-900 uppercase tracking-wider">
                                {isAr ? sub.nameAr : sub.nameEn}
                              </h5>
                              <div className="space-y-1 ps-2">
                                {sub.items.map((item, iIdx) => (
                                  <a
                                    key={iIdx}
                                    href={item.link}
                                    onClick={onClose}
                                    className="block text-xs text-stone-600 hover:text-[#f27d26] py-1 transition-colors"
                                  >
                                    {isAr ? item.nameAr : item.nameEn}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer (Currency & Language Selectors & User Info - Stays pinned at bottom) */}
        <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-gray-200 space-y-2.5 shrink-0">
          <div className="flex items-center justify-between text-xs">
            {/* Language Toggle */}
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <button
                onClick={() => onUpdateSettings({ language: isAr ? 'en' : 'ar' })}
                className="font-bold text-[#121212] hover:text-[#f27d26] underline transition-colors cursor-pointer"
              >
                {isAr ? 'Switch to English' : 'التحويل للعربية'}
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-stone-500" />
              <button
                onClick={() => onCurrencyChange(currency === 'SAR' ? 'USD' : 'SAR')}
                className="font-bold text-[#121212] hover:text-[#f27d26] bg-white px-2 py-0.5 rounded border border-gray-200 text-[11px] cursor-pointer"
              >
                {currency} ({currency === 'SAR' ? 'ر.س' : '$'})
              </button>
            </div>
          </div>

          {/* User Account Login Status */}
          <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-xs font-bold">
                {isLoggedIn ? 'A' : <User className="w-3.5 h-3.5" />}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#121212]">
                  {isLoggedIn ? (isAr ? 'حساب أحمد علي' : 'Ahmed Ali') : (isAr ? 'زائر المتجر' : 'Guest')}
                </span>
                <span className="text-[10px] text-stone-400">
                  {isLoggedIn ? (isAr ? 'عضو مميز VIP' : 'VIP Member') : (isAr ? 'سجل دخولك' : 'Sign in')}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onToggleLogin();
                onClose();
              }}
              className="text-xs font-bold text-[#f27d26] hover:text-[#df6b15] cursor-pointer"
            >
              {isLoggedIn ? (isAr ? 'تبديل' : 'Switch') : (isAr ? 'دخول' : 'Sign In')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : drawerContent;
};
