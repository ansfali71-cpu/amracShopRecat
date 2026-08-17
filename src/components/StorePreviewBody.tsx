import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Star, 
  ShoppingCart, 
  Heart, 
  Scale, 
  ArrowRight, 
  Truck, 
  RotateCcw, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  Crown,
  Layers,
  Sparkle,
  LayoutGrid,
  List,
  Shirt,
  Smartphone,
  Check,
  MoveHorizontal,
  Eye
} from 'lucide-react';
import { Product, HeaderSettings } from '../types';
import { SAMPLE_PRODUCTS, CATEGORIES } from '../data/mockData';
import { THEME_MAP } from '../utils/theme';
import { HeroSlider } from './HeroSlider';
import { InteractiveProductCard } from './InteractiveProductCard';
import { QuickViewModal } from './QuickViewModal';

interface StorePreviewBodyProps {
  settings: HeaderSettings;
  currency: string;
  activeCategoryFilter?: string;
  onSelectCategoryFilter?: (catId: string) => void;
  onAddToCart: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  wishlistIds: string[];
  compareIds: string[];
  isScrolled?: boolean;
}

const CATEGORY_TABS = [
  { id: 'all', nameAr: 'جميع المنتجات', nameEn: 'All Products', icon: Sparkle, badgeAr: 'الكل', badgeEn: 'All' },
  { id: 'women-makhawir', nameAr: 'الفساتين والمخاور', nameEn: 'Makhawir & Dresses', icon: Crown, badgeAr: 'فاخر', badgeEn: 'Luxury' },
  { id: 'girls-fashion', nameAr: 'ملابس بناتي', nameEn: 'Girls Wear', icon: Sparkles, badgeAr: 'أميرات', badgeEn: 'Girls' },
  { id: 'boys-wear', nameAr: 'ملابس ولادي', nameEn: 'Boys Wear', icon: Shirt, badgeAr: 'أنيق', badgeEn: 'Boys' },
  { id: 'fabrics-curtains', nameAr: 'أقمشة وستائر', nameEn: 'Fabrics & Living', icon: Layers, badgeAr: 'تفصيل', badgeEn: 'Custom' },
  { id: 'electronics', nameAr: 'إلكترونيات وذكاء', nameEn: 'Tech & Gadgets', icon: Smartphone, badgeAr: 'جديد', badgeEn: 'Tech' },
  { id: 'fragrances', nameAr: 'عطور وبخور', nameEn: 'Oud & Perfumes', icon: Flame, badgeAr: 'ملكي', badgeEn: 'Royal' },
];

export const StorePreviewBody: React.FC<StorePreviewBodyProps> = ({
  settings,
  currency,
  activeCategoryFilter: externalActiveCategory,
  onSelectCategoryFilter: externalOnSelectCategory,
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  wishlistIds,
  compareIds,
  isScrolled = false
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [swipeAnimation, setSwipeAnimation] = useState<'slide-left' | 'slide-right' | null>(null);
  const [swipeFeedbackText, setSwipeFeedbackText] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const activeCategoryFilter = externalActiveCategory !== undefined ? externalActiveCategory : internalCategory;

  const handleCategoryChange = (newCatId: string, direction?: 'left' | 'right') => {
    if (externalOnSelectCategory) {
      externalOnSelectCategory(newCatId);
    } else {
      setInternalCategory(newCatId);
    }

    if (direction) {
      setSwipeAnimation(direction === 'left' ? 'slide-left' : 'slide-right');
      setTimeout(() => setSwipeAnimation(null), 400);

      const targetCat = CATEGORY_TABS.find(c => c.id === newCatId);
      if (targetCat) {
        setSwipeFeedbackText(isAr ? `قسم: ${targetCat.nameAr}` : `Category: ${targetCat.nameEn}`);
        setTimeout(() => setSwipeFeedbackText(null), 1800);
      }
    }
  };

  // Auto-scroll active category tab into view smoothly
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTabRef.current && tabsScrollRef.current) {
      const container = tabsScrollRef.current;
      const tab = activeTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      const scrollOffset = (tabRect.left + tabRect.width / 2) - (containerRect.left + containerRect.width / 2);
      
      container.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  }, [activeCategoryFilter]);

  // Touch & Pointer Swipe Gesture Detection for Shein instant flicking experience
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const touchEndYRef = useRef<number>(0);
  const isSwipingRef = useRef<boolean>(false);
  const isMouseDownRef = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchStartYRef.current = e.targetTouches[0].clientY;
    touchEndXRef.current = e.targetTouches[0].clientX;
    touchEndYRef.current = e.targetTouches[0].clientY;
    isSwipingRef.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
    touchEndYRef.current = e.targetTouches[0].clientY;
  };

  const processSwipeAction = (deltaX: number, deltaY: number) => {
    // Shein-style responsive horizontal swipe: threshold 35px & horizontal dominance
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      const currentIndex = CATEGORY_TABS.findIndex(c => c.id === activeCategoryFilter);
      const total = CATEGORY_TABS.length;

      if (isAr) {
        // Arabic (RTL):
        // Swiping Right (deltaX > 0) -> move to NEXT category (Shein Arabic experience)
        // Swiping Left (deltaX < 0) -> move to PREVIOUS category
        if (deltaX > 0) {
          const nextIndex = (currentIndex + 1) % total;
          handleCategoryChange(CATEGORY_TABS[nextIndex].id, 'right');
        } else {
          const prevIndex = (currentIndex - 1 + total) % total;
          handleCategoryChange(CATEGORY_TABS[prevIndex].id, 'left');
        }
      } else {
        // English (LTR):
        // Swiping Left (deltaX < 0) -> move to NEXT category
        // Swiping Right (deltaX > 0) -> move to PREVIOUS category
        if (deltaX < 0) {
          const nextIndex = (currentIndex + 1) % total;
          handleCategoryChange(CATEGORY_TABS[nextIndex].id, 'left');
        } else {
          const prevIndex = (currentIndex - 1 + total) % total;
          handleCategoryChange(CATEGORY_TABS[prevIndex].id, 'right');
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    const deltaY = touchEndYRef.current - touchStartYRef.current;
    processSwipeAction(deltaX, deltaY);
  };

  // Mouse Drag / Flick Support for Desktop Testing
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
    touchStartYRef.current = e.clientY;
    touchEndXRef.current = e.clientX;
    touchEndYRef.current = e.clientY;
    isMouseDownRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    touchEndXRef.current = e.clientX;
    touchEndYRef.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    const deltaY = touchEndYRef.current - touchStartYRef.current;
    processSwipeAction(deltaX, deltaY);
  };

  const navigateCategory = (direction: 'next' | 'prev') => {
    const currentIndex = CATEGORY_TABS.findIndex(c => c.id === activeCategoryFilter);
    const total = CATEGORY_TABS.length;
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % total;
      handleCategoryChange(CATEGORY_TABS[nextIndex].id, isAr ? 'right' : 'left');
    } else {
      const prevIndex = (currentIndex - 1 + total) % total;
      handleCategoryChange(CATEGORY_TABS[prevIndex].id, isAr ? 'left' : 'right');
    }
  };

  // Filter products based on active category
  const filteredProducts = activeCategoryFilter === 'all'
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => {
        if (activeCategoryFilter === 'women-makhawir') return p.categoryAr.includes('مخاور') || p.categoryAr.includes('فساتين') || p.id === 'p1' || p.id === 'p5';
        if (activeCategoryFilter === 'girls-fashion') return p.categoryAr.includes('بناتي') || p.id === 'p2';
        if (activeCategoryFilter === 'boys-wear') return p.categoryAr.includes('ولادي') || p.id === 'p3';
        if (activeCategoryFilter === 'fabrics-curtains') return p.categoryAr.includes('أقمشة') || p.categoryAr.includes('ستائر') || p.id === 'p4';
        if (activeCategoryFilter === 'electronics') return p.categoryAr.includes('إلكترونيات') || p.categoryAr.includes('ذكاء');
        if (activeCategoryFilter === 'fragrances') return p.categoryAr.includes('عطور') || p.categoryAr.includes('بخور');
        return true;
      });

  const activeCategoryMeta = CATEGORY_TABS.find(c => c.id === activeCategoryFilter) || CATEGORY_TABS[0];
  const activeCategoryIndex = CATEGORY_TABS.findIndex(c => c.id === activeCategoryFilter);

  return (
    <main id="store-preview-body" className="w-full bg-[#fafafa] font-sans pb-24 selection:bg-[#f27d26] selection:text-white">
      
      {/* 0. Main Professional Auto Hero Slider (Immediately Under Header) */}
      <HeroSlider
        settings={settings}
        onExploreCategory={(key) => {
          handleCategoryChange(key, 'right');
          const target = document.getElementById('featured-products-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
        onQuickShop={() => {
          const target = document.getElementById('featured-products-section');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* 1. Editorial Trust Badges Bar (Condenses dynamically on scroll) */}
      <section className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled ? 'pt-2.5 sm:pt-4' : 'pt-5 sm:pt-8'
      }`}>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-2 sm:gap-3 hover:shadow-xs transition-all duration-300 ${
            isScrolled ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-4'
          }`}>
            <div className={`rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 transition-all ${
              isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 sm:w-10 h-8 sm:h-10'
            }`}>
              <Crown className={isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-[#121212] truncate">
                {isAr ? 'أقمشة وتطريز أصلي 100%' : '100% Authentic Tailoring'}
              </h4>
              {!isScrolled && (
                <p className="text-[10px] sm:text-[11px] text-stone-500 truncate hidden xs:block transition-opacity">
                  {isAr ? 'ضمان أعلى معايير الجودة' : 'Guaranteed Gulf standards'}
                </p>
              )}
            </div>
          </div>

          <div className={`bg-white rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-2 sm:gap-3 hover:shadow-xs transition-all duration-300 ${
            isScrolled ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-4'
          }`}>
            <div className={`rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 transition-all ${
              isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 sm:w-10 h-8 sm:h-10'
            }`}>
              <Truck className={isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-[#121212] truncate">
                {isAr ? 'شحن سريع لكافة المناطق' : 'Express Delivery'}
              </h4>
              {!isScrolled && (
                <p className="text-[10px] sm:text-[11px] text-stone-500 truncate hidden xs:block transition-opacity">
                  {isAr ? 'توصيل لباب المنزل' : 'Live tracking couriers'}
                </p>
              )}
            </div>
          </div>

          <div className={`bg-white rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-2 sm:gap-3 hover:shadow-xs transition-all duration-300 ${
            isScrolled ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-4'
          }`}>
            <div className={`rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 transition-all ${
              isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 sm:w-10 h-8 sm:h-10'
            }`}>
              <RotateCcw className={isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-[#121212] truncate">
                {isAr ? 'استبدال واسترجاع ميسر' : 'Easy Returns'}
              </h4>
              {!isScrolled && (
                <p className="text-[10px] sm:text-[11px] text-stone-500 truncate hidden xs:block transition-opacity">
                  {isAr ? 'خلال 14 يوم بكل سهولة' : '14-Day easy policy'}
                </p>
              )}
            </div>
          </div>

          <div className={`bg-white rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-2 sm:gap-3 hover:shadow-xs transition-all duration-300 ${
            isScrolled ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-4'
          }`}>
            <div className={`rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 transition-all ${
              isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 sm:w-10 h-8 sm:h-10'
            }`}>
              <Headphones className={isScrolled ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-4 h-4 sm:w-5 sm:h-5'} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-[#121212] truncate">
                {isAr ? 'خدمة عملاء VIP' : 'VIP Client Support'}
              </h4>
              {!isScrolled && (
                <p className="text-[10px] sm:text-[11px] text-stone-500 truncate hidden xs:block transition-opacity">
                  {isAr ? 'مساعدة فورية ومستمرة' : 'Direct assistance'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Category Cards Showcase */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-7 sm:pt-10">
        <div className="flex items-center justify-between mb-3 sm:mb-5 border-b border-gray-200/80 pb-2.5">
          <div>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#f27d26] block">
              {isAr ? 'تشكيلات متجر تاج لاين' : 'TAJ LINE SELECTIONS'}
            </span>
            <h3 className="text-base sm:text-xl font-serif font-bold text-[#121212] mt-0.5">
              {isAr ? 'الأقسام والتصنيفات الرئيسية' : 'Featured Departments & Collections'}
            </h3>
          </div>
          <button 
            onClick={() => {
              handleCategoryChange('all', 'right');
              document.getElementById('featured-products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[11px] sm:text-xs font-bold text-[#f27d26] hover:text-[#df6b15] uppercase tracking-wider flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>{isAr ? 'عرض الكل' : 'View All'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Card 1 */}
          <div 
            onClick={() => {
              handleCategoryChange('women-makhawir', 'right');
              document.getElementById('featured-products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-2xl p-2 sm:p-3.5 border ${activeCategoryFilter === 'women-makhawir' ? 'border-[#f27d26] ring-2 ring-[#f27d26]/20' : 'border-gray-100'} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="h-28 sm:h-36 rounded-xl overflow-hidden mb-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=85" 
                alt="Women Makhawir"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1.5 start-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                {isAr ? 'مخاور وجلابيات' : 'Makhawir'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#121212] group-hover:text-[#f27d26] transition-colors line-clamp-1">
                {isAr ? 'فساتين ومخاور نسائي' : 'Women\'s Makhawir'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1 hidden sm:block">
                {isAr ? 'تطريزات خليجية، حرير ملكي وشيفون فاخر' : 'Gulf heritage embroidery and luxury satin silk.'}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => {
              handleCategoryChange('girls-fashion', 'right');
              document.getElementById('featured-products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-2xl p-2 sm:p-3.5 border ${activeCategoryFilter === 'girls-fashion' ? 'border-[#f27d26] ring-2 ring-[#f27d26]/20' : 'border-gray-100'} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="h-28 sm:h-36 rounded-xl overflow-hidden mb-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=85" 
                alt="Girls Fashion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1.5 start-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                {isAr ? 'أزياء الأميرات' : 'Girls Collection'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#121212] group-hover:text-[#f27d26] transition-colors line-clamp-1">
                {isAr ? 'أزياء وملابس بناتي' : 'Girls\' Fashion'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1 hidden sm:block">
                {isAr ? 'فساتين أعياد وحفلات، دانتيل وتل فرنسي' : 'Delicate tulle and party dresses.'}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => {
              handleCategoryChange('boys-wear', 'right');
              document.getElementById('featured-products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-2xl p-2 sm:p-3.5 border ${activeCategoryFilter === 'boys-wear' ? 'border-[#f27d26] ring-2 ring-[#f27d26]/20' : 'border-gray-100'} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="h-28 sm:h-36 rounded-xl overflow-hidden mb-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=85" 
                alt="Boys Wear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1.5 start-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                {isAr ? 'الفرسان الصغار' : 'Boys Collection'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#121212] group-hover:text-[#f27d26] transition-colors line-clamp-1">
                {isAr ? 'أزياء وملابس ولادي' : 'Boys\' Collection'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1 hidden sm:block">
                {isAr ? 'ثياب خليجية تفصيل، بدل رسمية وكاجوال' : 'Tailored thobes and junior suits.'}
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => {
              handleCategoryChange('fabrics-curtains', 'right');
              document.getElementById('featured-products-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`bg-white rounded-2xl p-2 sm:p-3.5 border ${activeCategoryFilter === 'fabrics-curtains' ? 'border-[#f27d26] ring-2 ring-[#f27d26]/20' : 'border-gray-100'} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden`}
          >
            <div className="h-28 sm:h-36 rounded-xl overflow-hidden mb-2 relative">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=85" 
                alt="Fabrics & Curtains"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1.5 start-1.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                {isAr ? 'أقمشة وديكور' : 'Fabrics & Living'}
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#121212] group-hover:text-[#f27d26] transition-colors line-clamp-1">
                {isAr ? 'أقمشة ومفروشات وستائر' : 'Fabrics & Curtains'}
              </h4>
              <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1 hidden sm:block">
                {isAr ? 'أقمشة تفصيل حرير وجاكار، ستائر ومفروشات' : 'Luxury fabric rolls & curtains.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHEIN-Style Interactive Category Bar & Swipeable Products Area */}
      <section 
        id="featured-products-section" 
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-12 scroll-mt-24"
      >
        {/* Header Title + View Mode & Swipe Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-gray-200/80 pb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#f27d26]">
                {isAr ? 'تجربة شي إن التفاعلية' : 'SHEIN INTERACTIVE EXPERIENCE'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold bg-[#f27d26]/10 text-[#f27d26] px-2 py-0.5 rounded-full">
                <MoveHorizontal className="w-3 h-3" />
                <span>{isAr ? 'اسحب للتنقل' : 'Swipe to switch'}</span>
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#121212] mt-0.5 flex items-center gap-2">
              <span>{isAr ? activeCategoryMeta.nameAr : activeCategoryMeta.nameEn}</span>
              <span className="text-xs font-sans font-bold text-stone-400">({filteredProducts.length})</span>
            </h3>
          </div>

          {/* Controls: Prev/Next Category + Grid/List View Toggles */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Prev/Next Category buttons */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-0.5 shadow-2xs">
              <button
                onClick={() => navigateCategory('prev')}
                className="p-1.5 text-stone-700 hover:text-[#f27d26] hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                title={isAr ? 'القسم السابق' : 'Previous Category'}
                aria-label="Previous Category"
              >
                <ChevronRight className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
              </button>
              <div className="h-4 w-px bg-gray-200 mx-0.5" />
              <button
                onClick={() => navigateCategory('next')}
                className="p-1.5 text-stone-700 hover:text-[#f27d26] hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
                title={isAr ? 'القسم التالي' : 'Next Category'}
                aria-label="Next Category"
              >
                <ChevronLeft className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
              </button>
            </div>

            {/* Grid vs ListView Toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-0.5 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                  viewMode === 'grid'
                    ? 'bg-[#1a1a1a] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
                title={isAr ? 'عرض شبكة (عمودين)' : 'Grid View'}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">{isAr ? 'شبكة' : 'Grid'}</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                  viewMode === 'list'
                    ? 'bg-[#1a1a1a] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
                title={isAr ? 'عرض قائمة تفصيلية' : 'List View'}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline text-[11px]">{isAr ? 'قائمة' : 'List'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hidden-Scrollbar Category Horizontal Navigation Bar (Shein-Style) */}
        <div className="relative mb-4">
          <div 
            ref={tabsScrollRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {CATEGORY_TABS.map((cat, index) => {
              const isActive = activeCategoryFilter === cat.id;
              const Icon = cat.icon;

              return (
                <button
                  key={cat.id}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => handleCategoryChange(cat.id, index > activeCategoryIndex ? 'right' : 'left')}
                  className={`group shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer duration-200 select-none ${
                    isActive
                      ? 'bg-[#f27d26] text-white shadow-sm ring-2 ring-[#f27d26]/30 scale-[1.02]'
                      : 'bg-white hover:bg-stone-100/90 text-stone-700 border border-gray-200/80 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#f27d26]'}`} />
                  <span className="whitespace-nowrap font-medium">
                    {isAr ? cat.nameAr : cat.nameEn}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive 
                      ? 'bg-black/20 text-white' 
                      : 'bg-stone-100 text-stone-500'
                  }`}>
                    {isAr ? cat.badgeAr : cat.badgeEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SHEIN-style Dots Indicator for Active Category Position */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {CATEGORY_TABS.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id, idx > activeCategoryIndex ? 'right' : 'left')}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeCategoryFilter === cat.id
                    ? 'w-5 h-1.5 bg-[#f27d26]'
                    : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'
                }`}
                title={isAr ? cat.nameAr : cat.nameEn}
                aria-label={`Go to ${cat.nameEn}`}
              />
            ))}
          </div>
        </div>

        {/* Swipe Feedback Floating Toast */}
        {swipeFeedbackText && (
          <div className="fixed bottom-20 start-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
            <div className="bg-[#1a1a1a]/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-white/20">
              <MoveHorizontal className="w-4 h-4 text-[#f27d26]" />
              <span>{swipeFeedbackText}</span>
            </div>
          </div>
        )}

        {/* SWIPEABLE PRODUCT CONTAINER WITH TOUCH & MOUSE GESTURE LISTENERS */}
        <div 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`w-full transition-transform duration-300 select-none ${
            swipeAnimation === 'slide-right' ? 'animate-slideRight' : 
            swipeAnimation === 'slide-left' ? 'animate-slideLeft' : ''
          }`}
        >
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center my-6">
              <div className="w-14 h-14 mx-auto bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-3">
                <Crown className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-stone-800">
                {isAr ? 'لا توجد منتجات حالياً في هذا القسم' : 'No products found in this category'}
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                {isAr ? 'يتم تحديث المخزون بانتظام، تصفح باقي الأقسام' : 'Check out our other departments for available items.'}
              </p>
              <button
                onClick={() => handleCategoryChange('all', 'right')}
                className="mt-4 px-4 py-2 bg-[#f27d26] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#df6b15]"
              >
                {isAr ? 'العودة لجميع المنتجات' : 'Back to All Products'}
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* ========================================================= */
            /* 1. GRID VIEW MODE (2 Cols Mobile, 3-6 cols Large Screens) */
            /* ========================================================= */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4 lg:gap-4.5">
              {filteredProducts.map((prod) => (
                <InteractiveProductCard
                  key={prod.id}
                  product={prod}
                  viewMode="grid"
                  currency={currency}
                  isAr={isAr}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  isCompared={compareIds.includes(prod.id)}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCompare={onAddToCompare}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            /* ========================================================= */
            /* 2. LIST VIEW MODE (Detailed Horizontal ListView Cards)     */
            /* ========================================================= */
            <div className="flex flex-col gap-3">
              {filteredProducts.map((prod) => (
                <InteractiveProductCard
                  key={prod.id}
                  product={prod}
                  viewMode="list"
                  currency={currency}
                  isAr={isAr}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  isCompared={compareIds.includes(prod.id)}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                  onAddToCompare={onAddToCompare}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick View Interactive Popover Modal */}
        <QuickViewModal
          isOpen={!!quickViewProduct}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(product, selectedColor, selectedSize, quantity) => {
            for (let i = 0; i < (quantity || 1); i++) {
              onAddToCart(product);
            }
          }}
          onAddToWishlist={onAddToWishlist}
          isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
          currency={currency}
          settings={settings}
        />

      </section>

    </main>
  );
};
