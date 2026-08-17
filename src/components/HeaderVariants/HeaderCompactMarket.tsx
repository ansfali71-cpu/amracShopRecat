import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  Store, 
  ChevronDown, 
  Sparkles, 
  SlidersHorizontal,
  Flame,
  Grid
} from 'lucide-react';
import { HeaderSettings, Product, CategoryItem, HeaderVariantProps } from '../../types';
import { THEME_MAP } from '../../utils/theme';
import { MainSearchBar } from '../MainSearchBar';
import { AccountDropdown } from '../AccountDropdown';
import { MobileNavDrawer } from '../MobileNavDrawer';
import { MobileHeaderControls } from '../MobileHeaderControls';
import { MobileCategoriesBar } from '../MobileCategoriesBar';
import { CATEGORIES } from '../../data/mockData';

export const HeaderCompactMarket: React.FC<HeaderVariantProps> = (props) => {
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

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];
  const formattedSubtotal = currency === 'SAR' 
    ? `${(cartSubtotal * 3.75).toFixed(0)} ر.س` 
    : `$${cartSubtotal.toFixed(2)}`;

  return (
    <header className="w-full bg-white/95 backdrop-blur-md flex flex-col font-sans transition-all duration-300 border-b border-slate-200">
      
      {/* Compact Unified Main Row */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 lg:gap-6 transition-all duration-300 ${
        isScrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3'
      }`}>
        
        {/* Mobile Top Row: Hamburger + Brand + Department + Actions */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 w-full lg:w-auto">
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
              className="hidden sm:flex p-2 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer items-center gap-1.5"
              title="Browse Categories"
            >
              <Grid className="w-4 h-4 text-slate-700" />
              <span className="hidden xl:inline text-xs font-bold text-slate-800">
                {isAr ? 'الأقسام' : 'Departments'}
              </span>
            </button>

            <a href="#home" className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-base shadow-sm ${theme.primary}`}>
                {settings.storeName.charAt(0) || 'ت'}
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                {settings.storeName}
              </span>
            </a>
          </div>

          {/* Mobile Language and Currency */}
          <div className="lg:hidden flex items-center">
            <MobileHeaderControls
              settings={settings}
              onUpdateSettings={onUpdateSettings}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>

          {/* Actions - Hidden on Mobile (Handled by MobileBottomNav) */}
          <div className="hidden md:flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpenWishlist}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer relative"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 end-0 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-white font-bold text-xs shadow-xs transition-colors cursor-pointer ${theme.primary} ${theme.primaryHover}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cartCount}</span>
              <span className="hidden sm:inline font-mono border-s border-white/20 ps-1.5">
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

        {/* Quick Nav Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 shrink-0 whitespace-nowrap">
          <a href="#deals" className="px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap shrink-0">
            <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500 shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'العروض' : 'Deals'}</span>
          </a>
          <a href="#vendors" className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0">
            <span className="whitespace-nowrap">{isAr ? 'المتاجر' : 'Vendors'}</span>
          </a>
          <a href="#new" className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0">
            <span className="whitespace-nowrap">{isAr ? 'جديدنا' : 'New In'}</span>
          </a>
        </div>

        {/* Search */}
        <div className={`w-full lg:flex-1 lg:max-w-lg transition-all duration-300 ${
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
      />

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

      {/* Popover Grid when Departments is clicked */}
      {isCategoryModalOpen && (
        <div className="bg-slate-50 border-t border-slate-200 py-4 px-4 sm:px-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {isAr ? 'استكشف كافة أقسام السوق والمتاجر' : 'Explore Marketplace Departments'}
              </span>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
              >
                {isAr ? 'إغلاق ✕' : 'Close ✕'}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onOpenCategory(cat);
                    setIsCategoryModalOpen(false);
                  }}
                  className="p-3 bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-500 rounded-xl text-start transition-all cursor-pointer group flex flex-col justify-between h-24 shadow-xs"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-600">
                    {isAr ? cat.nameAr : cat.nameEn}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {cat.itemCount} items
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
