import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { HeaderSettings, Product, CategoryItem, HeaderVariantProps } from '../../types';
import { THEME_MAP } from '../../utils/theme';
import { AccountDropdown } from '../AccountDropdown';
import { MobileNavDrawer } from '../MobileNavDrawer';
import { MobileHeaderControls } from '../MobileHeaderControls';
import { MobileCategoriesBar } from '../MobileCategoriesBar';
import { CATEGORIES } from '../../data/mockData';

export const HeaderLuxuryFashion: React.FC<HeaderVariantProps> = (props) => {
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
    isScrolled = false
  } = props;

  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [fashionMegaOpen, setFashionMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isSearchOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOverlayOpen]);

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const fashionCategory = CATEGORIES.find(c => c.id === 'fashion');

  return (
    <header className="w-full bg-white/95 backdrop-blur-md flex flex-col font-sans transition-all duration-300 border-b border-stone-200">
      
      {/* Editorial Announcement Bar - Hidden on Mobile and Collapsed on Scroll */}
      <div className={`hidden md:block w-full bg-stone-900 text-stone-300 text-[11px] uppercase tracking-widest px-4 text-center font-medium transition-all duration-300 overflow-hidden ${
        isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-10 py-2 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline-block text-stone-500 font-mono">EST. 2026</span>
          <div className="flex items-center justify-center gap-2 mx-auto">
            <span>{isAr ? '✨ خصم 20% على تشكيلة الأزياء الجديدة باستخدام كود: LUXE20' : '✨ COMPLIMENTARY WORLDWIDE SHIPPING ON ORDERS OVER $150 — CODE: LUXE20'}</span>
          </div>
          <button
            onClick={() => onUpdateSettings({ language: isAr ? 'en' : 'ar' })}
            className="hidden sm:inline-block text-stone-300 hover:text-white cursor-pointer font-bold"
          >
            {isAr ? 'EN' : 'العربية'}
          </button>
        </div>
      </div>

      {/* Main Luxury Row: Hamburger / Nav Left, Centered Logo, Icons Right */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'py-2 sm:py-3' : 'py-3.5 sm:py-5'
      }`}>
        
        {/* Left Side: Mobile Hamburger & Editorial Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-900 hover:text-black rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Language and Currency */}
          <div className="lg:hidden flex items-center">
            <MobileHeaderControls
              settings={settings}
              onUpdateSettings={onUpdateSettings}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 whitespace-nowrap shrink-0">
            <div 
              className="relative shrink-0"
              onMouseEnter={() => setFashionMegaOpen(true)}
              onMouseLeave={() => setFashionMegaOpen(false)}
            >
              <button className="text-xs uppercase tracking-widest font-bold text-stone-900 hover:text-stone-600 transition-colors flex items-center gap-1 cursor-pointer py-2 whitespace-nowrap">
                <span className="whitespace-nowrap">{isAr ? 'المجموعة الفاخرة' : 'Collections'}</span>
                <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />
              </button>

              {/* Lookbook Mega Dropdown */}
              {fashionMegaOpen && (
                <div className="absolute top-full start-0 w-[720px] bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 z-50 animate-fadeIn grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-stone-900 border-b border-stone-200 pb-2 mb-3">
                      {isAr ? 'أحدث الإطلاقات' : 'New Season'}
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      <li><a href="#couture" className="hover:text-stone-900 font-medium">{isAr ? 'أزياء السهرة الراقية' : 'Haute Couture'}</a></li>
                      <li><a href="#shoes" className="hover:text-stone-900 font-medium">{isAr ? 'الأحذية الجلدية الإيطالية' : 'Artisanal Footwear'}</a></li>
                      <li><a href="#bags" className="hover:text-stone-900 font-medium">{isAr ? 'الحقائب والإكسسوارات' : 'Designer Bags'}</a></li>
                      <li><a href="#jewelry" className="hover:text-stone-900 font-medium">{isAr ? 'المجوهرات والساعات' : 'Fine Jewelry'}</a></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-stone-900 border-b border-stone-200 pb-2 mb-3">
                      {isAr ? 'أشهر الماركات' : 'Designers'}
                    </h4>
                    <ul className="space-y-2 text-xs text-stone-600">
                      <li><a href="#brand1" className="hover:text-stone-900 font-medium">Saint Laurent</a></li>
                      <li><a href="#brand2" className="hover:text-stone-900 font-medium">Bottega Veneta</a></li>
                      <li><a href="#brand3" className="hover:text-stone-900 font-medium">Brunello Cucinelli</a></li>
                      <li><a href="#brand4" className="hover:text-stone-900 font-medium">Loro Piana</a></li>
                    </ul>
                  </div>

                  {/* Editorial Visual Card */}
                  <div className="relative rounded-xl overflow-hidden group bg-stone-100 flex flex-col justify-end p-4 text-white">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&auto=format&fit=crop&q=80" 
                      alt="Lookbook"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                      referrerPolicy="no-referrer"
                    />
                    <div className="relative z-10">
                      <span className="text-[10px] uppercase tracking-widest bg-white text-stone-900 px-2 py-0.5 font-bold rounded">
                        SUMMER '26
                      </span>
                      <h5 className="text-sm font-serif font-bold mt-1">The Milan Lookbook</h5>
                      <span className="text-xs text-stone-200 underline mt-0.5 block">{isAr ? 'استكشف المعرض' : 'View Gallery'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#women" className="text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'نساء' : 'Women'}
            </a>
            <a href="#men" className="text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'رجال' : 'Men'}
            </a>
            <a href="#fragrances" className="text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {isAr ? 'عطور' : 'Fragrances'}
            </a>
          </nav>
        </div>

        {/* Center: Iconic Luxury Typography Brand */}
        <div className="text-center">
          <a href="#home" className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-serif font-black tracking-widest text-stone-950 uppercase">
              {settings.storeName}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-stone-400 font-sans mt-0.5">
              PARIS • DUBAI • TOKYO
            </span>
          </a>
        </div>

        {/* Right Side: Search Toggle (visible on all), Wishlist, Bag, Profile (hidden on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-4">
          {/* Search Trigger Button */}
          <button
            onClick={() => setIsSearchOverlayOpen(true)}
            className="p-2 text-stone-800 hover:text-stone-500 transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="hidden md:inline-flex p-2 text-stone-800 hover:text-stone-500 transition-colors cursor-pointer relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 end-1 w-2 h-2 bg-[#f27d26] rounded-full" />
            )}
          </button>

          {/* Luxury Bag Pill */}
          <button
            onClick={onOpenCart}
            className="hidden md:flex items-center gap-2 p-2 text-stone-900 hover:text-stone-600 transition-colors cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -end-2 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </div>
          </button>

          <div className="hidden md:block">
            <AccountDropdown
              settings={settings}
              isLoggedIn={isLoggedIn}
              onToggleLogin={onToggleLogin}
              onOpenVendorModal={onOpenVendorModal}
            />
          </div>
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

      {/* Luxury Fullscreen Search Overlay */}
      {isSearchOverlayOpen && createPortal(
        <div 
          dir={isAr ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[99999] bg-stone-950/95 backdrop-blur-md flex flex-col justify-start p-6 sm:p-12 animate-fadeIn text-white overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto w-full flex justify-end">
            <button
              onClick={() => setIsSearchOverlayOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="max-w-2xl mx-auto w-full mt-12 text-center">
            <span className="text-xs uppercase tracking-widest text-stone-400">
              {isAr ? 'البحث في أرشيف المجموعات' : 'SEARCH ARCHIVE & COLLECTIONS'}
            </span>
            <div className="mt-4 border-b-2 border-stone-400 pb-3 flex items-center">
              <Search className="w-6 h-6 text-stone-400 me-3" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث عن عطر، فستان، أو تصميم...' : 'Type product, brand or editorial style...'}
                className="w-full bg-transparent text-2xl font-serif text-white placeholder-stone-500 outline-none"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-xs text-stone-500 me-2">{isAr ? 'الأكثر بحثاً:' : 'Trending:'}</span>
              {['Cashmere Coat', 'Silk Dress', 'Leather Handbag', 'Signature Oud'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="text-xs text-stone-300 hover:text-white border border-stone-700 px-3 py-1 rounded-full cursor-pointer hover:border-stone-400 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

    </header>
  );
};
