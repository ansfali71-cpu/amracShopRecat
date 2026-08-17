import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Scale, 
  Sparkles,
  Layers,
  ChevronDown,
  Menu
} from 'lucide-react';
import { HeaderSettings, Product, CategoryItem } from '../../types';
import { THEME_MAP } from '../../utils/theme';
import { HeaderTopBar } from '../HeaderTopBar';
import { MainSearchBar } from '../MainSearchBar';
import { MegaMenu } from '../MegaMenu';
import { AccountDropdown } from '../AccountDropdown';
import { MobileNavDrawer } from '../MobileNavDrawer';
import { MobileHeaderControls } from '../MobileHeaderControls';
import { MobileCategoriesBar } from '../MobileCategoriesBar';

interface HeaderVariantProps {
  settings: HeaderSettings;
  onUpdateSettings: (newSettings: Partial<HeaderSettings>) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  compareCount: number;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenVendorModal: () => void;
  onOpenTrackOrder: () => void;
  onSelectProduct: (p: Product) => void;
  onOpenCategory: (cat: CategoryItem) => void;
  activeCategoryFilter?: string;
  onSelectCategoryFilter?: (catId: string) => void;
  isScrollingDown?: boolean;
}

export const HeaderClassicPrime: React.FC<HeaderVariantProps> = (props) => {
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
    <header className="w-full bg-white/95 backdrop-blur-md flex flex-col font-sans transition-all duration-300">
      {/* 1. Top Utility Bar (Smoothly hides on scroll down to maximize product viewing area) */}
      {settings.showTopBar && (
        <div className={`transition-all duration-300 ${
          isScrolled ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden' : 'max-h-12 opacity-100 overflow-visible relative z-50'
        }`}>
          <HeaderTopBar
            settings={settings}
            onUpdateSettings={onUpdateSettings}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            onOpenVendorModal={onOpenVendorModal}
            onOpenTrackOrder={onOpenTrackOrder}
          />
        </div>
      )}

      {/* 2. Middle Main Header Bar (Condenses vertically on scroll down) */}
      <div className={`w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${
        isScrolled ? 'py-1.5 sm:py-2.5 shadow-2xs' : 'py-3 sm:py-4.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 lg:gap-8">
          
          {/* Main Top Row on Mobile: Hamburger + Logo + Action Clusters */}
          <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
            
            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-stone-800 hover:text-black rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5.5 h-5.5 stroke-[2]" />
            </button>

            {/* Editorial Logo & Slogan (Scales down smoothly on scroll) */}
            <div className="flex items-center shrink-0">
              <a href="#home" className="flex flex-col group">
                <h1 className={`font-serif italic tracking-tighter leading-none text-[#121212] flex items-baseline transition-all duration-300 ${
                  isScrolled ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl lg:text-4xl'
                }`}>
                  <span>{settings.storeName}</span>
                  <span className="text-[#f27d26] not-italic leading-none">.</span>
                </h1>
                {!isScrolled && (
                  <p className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-stone-400 font-sans mt-0.5 font-semibold transition-opacity duration-300">
                    {isAr ? settings.taglineAr : 'PREMIUM MARKETPLACE'}
                  </p>
                )}
              </a>
            </div>

            {/* Mobile Currency & Language Selector In Header */}
            <div className="lg:hidden flex items-center">
              <MobileHeaderControls
                settings={settings}
                onUpdateSettings={onUpdateSettings}
                currency={currency}
                onCurrencyChange={onCurrencyChange}
              />
            </div>

            {/* Quick Action Clusters (Compare, Wishlist, Cart, Account) - Hidden on Mobile (Handled by MobileBottomNav) */}
            <div className="hidden md:flex items-center gap-1 sm:gap-3.5 shrink-0">
              
              {/* Compare (Desktop only or tablet) */}
              <button
                id="header-compare-btn"
                onClick={onOpenCompare}
                className="hidden sm:inline-flex relative p-2 text-stone-700 hover:text-black rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                title={isAr ? 'المقارنة' : 'Compare'}
              >
                <Scale className="w-4.5 h-4.5 stroke-[1.75]" />
                {compareCount > 0 && (
                  <span className="absolute top-0.5 end-0.5 w-4 h-4 bg-[#1a1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {compareCount}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                className="relative p-2 text-stone-700 hover:text-black rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                title={isAr ? 'المفضلة' : 'Wishlist'}
              >
                <Heart className="w-4.5 h-4.5 stroke-[1.75]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 end-0.5 w-4 h-4 bg-[#f27d26] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-2xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Trigger with Subtotal */}
              <button
                id="header-cart-btn"
                onClick={onOpenCart}
                className={`flex items-center gap-1.5 sm:gap-2 rounded-full hover:bg-stone-100 transition-all cursor-pointer group border border-gray-200 bg-[#f8f8f8] ${
                  isScrolled ? 'p-1 sm:pe-3' : 'p-1.5 sm:pe-3.5'
                }`}
              >
                <div className={`relative rounded-full bg-white flex items-center justify-center text-[#121212] shadow-2xs border border-gray-100 transition-all ${
                  isScrolled ? 'w-7.5 h-7.5' : 'w-8.5 h-8.5'
                }`}>
                  <ShoppingBag className="w-4 h-4 stroke-[1.75] group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -end-1 px-1.5 py-0.2 text-[8.5px] sm:text-[9.5px] font-bold rounded-full text-white bg-[#1a1a1a] shadow-xs">
                    {cartCount}
                  </span>
                </div>
                <div className="hidden sm:flex flex-col text-start">
                  <span className="text-[8.5px] uppercase tracking-wider text-gray-400 font-bold">
                    {isAr ? 'سلة المشتريات' : 'My Bag'}
                  </span>
                  <span className="text-[11.5px] font-black text-[#121212]">
                    {formattedSubtotal}
                  </span>
                </div>
              </button>

              <span className="hidden sm:inline-block w-px h-5 bg-gray-200 mx-0.5" />

              {/* Account Popover */}
              <AccountDropdown
                settings={settings}
                isLoggedIn={isLoggedIn}
                onToggleLogin={onToggleLogin}
                onOpenVendorModal={onOpenVendorModal}
              />

            </div>

          </div>

          {/* Smart Categorized Search Bar (Full Width on mobile, centered flex-1 on desktop) */}
          <div className={`w-full lg:flex-1 lg:max-w-2xl transition-all duration-300 ${
            isScrollingDown ? 'max-h-0 opacity-0 overflow-hidden lg:max-h-20 lg:opacity-100 lg:overflow-visible -mt-3 lg:mt-0' : 'max-h-20 opacity-100'
          }`}>
            <MainSearchBar
              settings={settings}
              onSelectProduct={onSelectProduct}
              currency={currency}
              variant="pill"
            />
          </div>

        </div>
      </div>

      {/* 2.5 Mobile Categories Scroll Bar (Exclusive on Mobile) */}
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

      {/* 3. Mega Navigation Bar with font-menu styling */}
      <MegaMenu
        settings={settings}
        currency={currency}
        onOpenCategory={onOpenCategory}
        isScrolled={isScrolled}
      />

      {/* 4. Slide-Out Mobile Navigation Drawer */}
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
