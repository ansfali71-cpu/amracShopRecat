import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Command, 
  SlidersHorizontal,
  Flame,
  Zap,
  Globe,
  Coins,
  Store,
  ChevronDown,
  Menu
} from 'lucide-react';
import { HeaderSettings, Product, CategoryItem, HeaderVariantProps } from '../../types';
import { THEME_MAP } from '../../utils/theme';
import { MainSearchBar } from '../MainSearchBar';
import { AccountDropdown } from '../AccountDropdown';
import { MobileNavDrawer } from '../MobileNavDrawer';
import { MobileHeaderControls } from '../MobileHeaderControls';
import { MobileCategoriesBar } from '../MobileCategoriesBar';
import { CATEGORIES } from '../../data/mockData';

export const HeaderSleekTech: React.FC<HeaderVariantProps> = (props) => {
  const {
    settings,
    onUpdateSettings,
    currency,
    onCurrencyChange,
    cartCount,
    cartSubtotal,
    wishlistCount,
    compareCount,
    isLoggedIn,
    onToggleLogin,
    onOpenCart,
    onOpenWishlist,
    onOpenCompare,
    onOpenVendorModal,
    onOpenTrackOrder,
    onSelectProduct,
    onOpenCategory,
    activeCategoryFilter = 'all',
    onSelectCategoryFilter,
    isScrolled = false,
    isScrollingDown = false
  } = props;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];
  const formattedSubtotal = currency === 'SAR' 
    ? `${(cartSubtotal * 3.75).toFixed(0)} ر.س` 
    : `$${cartSubtotal.toFixed(2)}`;

  return (
    <header className="w-full bg-slate-950/95 backdrop-blur-md text-white flex flex-col font-sans transition-all duration-300 border-b border-slate-800">
      {/* Sleek Top Nano Bar - Hidden on Mobile and Collapsed on Scroll */}
      <div className={`hidden md:block w-full bg-slate-900/90 text-slate-400 text-xs px-4 sm:px-8 border-b border-slate-800/80 transition-all duration-300 overflow-hidden ${
        isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-10 py-1.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {isAr ? 'متجر Amerce الرسمي للإلكترونيات' : 'Amerce Tech Official Store'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onUpdateSettings({ language: isAr ? 'en' : 'ar' })}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Globe className="w-3 h-3" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>
            <span>|</span>
            <button
              onClick={onOpenVendorModal}
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {isAr ? 'بوابة التجار' : 'Vendor Hub'}
            </button>
          </div>
        </div>
      </div>

      {/* Main High-Tech Bar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-4 transition-all duration-300 ${
        isScrolled ? 'py-1.5 sm:py-2.5' : 'py-3.5'
      }`}>
        
        {/* Top Row on Mobile: Hamburger + Brand + Action Controls */}
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-mono font-black text-lg text-white shadow-cyan-500/20 shadow-lg">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-mono">
                  {settings.storeName}<span className="text-cyan-400">.tech</span>
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Language and Currency in Header */}
          <div className="lg:hidden flex items-center">
            <MobileHeaderControls
              settings={settings}
              onUpdateSettings={onUpdateSettings}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
              variant="dark"
            />
          </div>

          {/* Action Controls - Hidden on Mobile (Handled by MobileBottomNav) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenWishlist}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer relative"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 end-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Floating Pill Cart */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-lg shadow-blue-500/20 font-bold text-xs transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{cartCount} {isAr ? 'عناصر' : 'Items'}</span>
              <span className="sm:hidden">{cartCount}</span>
              <span className="hidden sm:inline bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
                {formattedSubtotal}
              </span>
            </button>

            <AccountDropdown
              settings={settings}
              isLoggedIn={isLoggedIn}
              onToggleLogin={onToggleLogin}
              onOpenVendorModal={onOpenVendorModal}
            />
          </div>

        </div>

        {/* Command Search */}
        <div className={`w-full lg:flex-1 lg:max-w-xl transition-all duration-300 ${
          isScrollingDown ? 'max-h-0 opacity-0 overflow-hidden lg:max-h-20 lg:opacity-100 lg:overflow-visible -mt-2 lg:mt-0' : 'max-h-20 opacity-100'
        }`}>
          <MainSearchBar
            settings={settings}
            onSelectProduct={onSelectProduct}
            currency={currency}
            variant="pill"
          />
        </div>

      </div>

      {/* Mobile Categories Bar */}
      <MobileCategoriesBar
        settings={settings}
        activeCategoryId={activeCategoryFilter}
        onOpenAllCategories={() => setIsMobileMenuOpen(true)}
        isScrolled={isScrolled}
        onSelectCategory={(cat) => {
          const catId = typeof cat === 'string' ? cat : cat.id;
          if (onSelectCategoryFilter) {
            onSelectCategoryFilter(catId);
          }
          if (typeof cat === 'object') {
            onOpenCategory(cat);
          }
          const target = document.getElementById('featured-products-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        variant="dark"
      />

      {/* Tech Category Chips Bar (Desktop) */}
      <div className="hidden lg:block w-full bg-slate-900 border-t border-slate-800/80 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenCategory(CATEGORIES[0])}
              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded-md hover:bg-cyan-500/30 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAr ? 'الإلكترونيات والذكاء الاصطناعي' : 'AI & Tech Gadgets'}</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onOpenCategory(cat)}
                className="px-3 py-1 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-md transition-colors shrink-0 cursor-pointer"
              >
                {isAr ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 shrink-0 font-mono">
            <span className="text-amber-400 font-bold">⚡ PRO DEAL:</span>
            <span>{isAr ? 'خصم 15% على كروت الشاشة RTX' : '15% Off RTX GPUs with code RTX15'}</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        settings={settings}
        onUpdateSettings={onUpdateSettings}
        currency={currency}
        onCurrencyChange={onCurrencyChange}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        compareCount={compareCount}
        isLoggedIn={isLoggedIn}
        onToggleLogin={onToggleLogin}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        onOpenCompare={onOpenCompare}
        onOpenVendorModal={onOpenVendorModal}
        onOpenTrackOrder={onOpenTrackOrder}
        onSelectCategory={onOpenCategory}
      />
    </header>
  );
};
