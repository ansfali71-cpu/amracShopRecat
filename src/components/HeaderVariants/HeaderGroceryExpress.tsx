import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Sparkles, 
  Zap, 
  Apple,
  Search,
  Check,
  X,
  Menu,
  Heart
} from 'lucide-react';
import { HeaderSettings, Product, CategoryItem, HeaderVariantProps } from '../../types';
import { THEME_MAP } from '../../utils/theme';
import { MainSearchBar } from '../MainSearchBar';
import { AccountDropdown } from '../AccountDropdown';
import { MobileNavDrawer } from '../MobileNavDrawer';
import { MobileHeaderControls } from '../MobileHeaderControls';
import { MobileCategoriesBar } from '../MobileCategoriesBar';
import { CATEGORIES } from '../../data/mockData';

export const HeaderGroceryExpress: React.FC<HeaderVariantProps> = (props) => {
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

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('الرياض - حي النخيل');

  useEffect(() => {
    if (isLocationModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocationModalOpen]);

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];
  const formattedSubtotal = currency === 'SAR' 
    ? `${(cartSubtotal * 3.75).toFixed(0)} ر.س` 
    : `$${cartSubtotal.toFixed(2)}`;

  const cities = [
    'الرياض - حي النخيل (توصيل خلال 25 دقيقة)',
    'جدة - حي الشاطئ (توصيل خلال 30 دقيقة)',
    'الدمام - حي الشاطئ الشرقي (توصيل خلال 40 دقيقة)',
    'دبي - وسط المدينة (توصيل خلال 20 دقيقة)',
    'القاهرة - التجمع الخامس (توصيل خلال 45 دقيقة)'
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md flex flex-col font-sans transition-all duration-300 border-b border-emerald-100">
      
      {/* Top Fresh Bar - Hidden on Mobile and Collapsed on Scroll */}
      <div className={`hidden md:block w-full bg-emerald-700 text-white text-xs px-4 sm:px-8 transition-all duration-300 overflow-hidden ${
        isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-10 py-1.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="bg-emerald-900/60 px-2 py-0.5 rounded text-[10px] uppercase font-mono">EXPRESS 30M</span>
            <span>{isAr ? '🥦 توصيل الأغذية والمقاضي الطازجة خلال 30 دقيقة لباب بيتك' : '🥦 30-Minute Fresh Grocery & Daily Essentials Direct To Door'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{isAr ? 'الخدمة تعمل 24/7' : '24/7 Delivery Available'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Row with Delivery Picker */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 lg:gap-4 transition-all duration-300 ${
        isScrolled ? 'py-1.5 sm:py-2.5' : 'py-3.5'
      }`}>
        
        {/* Mobile Top Row: Hamburger + Brand & Location Trigger + Actions */}
        <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-emerald-950 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                🌱
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black text-emerald-950">
                  {settings.storeName} <span className="text-emerald-600 text-xs sm:text-sm font-bold">Fresh</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-600 font-bold">
                  {isAr ? 'سوبرماركت ومقاضي سريعة' : 'Supermarket & Express'}
                </span>
              </div>
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

          {/* Location Delivery Selector Pill (Desktop/Tablet) */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden md:flex items-center gap-2 p-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl text-start transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider">
                {isAr ? 'التوصيل إلى:' : 'Deliver to:'}
              </span>
              <span className="text-xs font-extrabold text-emerald-950 truncate max-w-[120px]">
                {selectedCity}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-emerald-700 opacity-70 shrink-0" />
          </button>

          {/* Actions - Hidden on Mobile (Handled by MobileBottomNav) */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenWishlist}
              className="p-2 text-emerald-900 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer relative"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 end-0 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md font-bold text-xs transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="flex flex-col text-start leading-tight">
                <span>{cartCount} {isAr ? 'منتج' : 'Items'}</span>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-100">{formattedSubtotal}</span>
              </div>
            </button>

            <AccountDropdown
              settings={settings}
              isLoggedIn={isLoggedIn}
              onToggleLogin={onToggleLogin}
              onOpenVendorModal={onOpenVendorModal}
            />
          </div>

        </div>

        {/* Search */}
        <div className={`w-full lg:flex-1 lg:max-w-xl transition-all duration-300 ${
          isScrollingDown ? 'max-h-0 opacity-0 overflow-hidden lg:max-h-20 lg:opacity-100 lg:overflow-visible -mt-2 lg:mt-0' : 'max-h-20 opacity-100'
        }`}>
          <MainSearchBar
            settings={settings}
            onSelectProduct={onSelectProduct}
            currency={currency}
            variant="boxed"
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

      {/* Fresh Category Tabs Bar (Desktop) */}
      <div className="hidden lg:block w-full bg-emerald-50/50 border-t border-emerald-100 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="text-xs font-bold text-emerald-900 me-2 shrink-0 whitespace-nowrap">
              {isAr ? 'الأقسام الطازجة:' : 'Fresh Aisle:'}
            </span>
            {['فواكه وخضروات طازجة', 'ألبان وأجبان وبيض', 'لحوم ودواجن مبردة', 'مخبوزات وحلويات', 'مشروبات وعصائر'].map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onOpenCategory(CATEGORIES[0])}
                className="px-3 py-1 bg-white hover:bg-emerald-100/70 border border-emerald-200/80 text-emerald-900 text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-800 font-bold shrink-0 whitespace-nowrap">
            <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">كوبون اليوم</span>
            <span className="whitespace-nowrap">FRESH25 (خصم 25 ر.س عند أول طلب)</span>
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

      {/* Location Picker Modal */}
      {isLocationModalOpen && createPortal(
        <div 
          dir={isAr ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {isAr ? 'اختر موقع التوصيل لتقدير الوقت والمخزون' : 'Choose Delivery Location'}
                </h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2">
              {cities.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCity(city);
                    setIsLocationModalOpen(false);
                  }}
                  className={`w-full p-3 rounded-xl border text-start text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    selectedCity === city 
                      ? 'border-emerald-600 bg-emerald-50/60 font-bold text-emerald-950' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{city}</span>
                  {selectedCity === city && <Check className="w-4 h-4 text-emerald-600" />}
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
