import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  ChevronDown, 
  Flame, 
  Sparkles, 
  Tv, 
  Shirt, 
  Home, 
  ShoppingBag, 
  Dumbbell, 
  Layers, 
  Percent, 
  ChevronRight,
  ArrowRight,
  Tag,
  Zap,
  Crown,
  Compass
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { HeaderSettings, CategoryItem } from '../types';
import { THEME_MAP } from '../utils/theme';

interface MegaMenuProps {
  settings: HeaderSettings;
  currency: string;
  onOpenCategory: (cat: CategoryItem) => void;
  isScrolled?: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  settings,
  currency,
  onOpenCategory,
  isScrolled = false
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeHoverCat, setActiveHoverCat] = useState<string>('women-makhawir');
  const [activeNavDropdown, setActiveNavDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
        setActiveNavDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return <Crown className="w-3.5 h-3.5" />;
      case 'Tv': return <Tv className="w-3.5 h-3.5" />;
      case 'Shirt': return <Shirt className="w-3.5 h-3.5" />;
      case 'Home': return <Home className="w-3.5 h-3.5" />;
      case 'Dumbbell': return <Dumbbell className="w-3.5 h-3.5" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5" />;
      case 'Layers': return <Layers className="w-3.5 h-3.5" />;
      default: return <ShoppingBag className="w-3.5 h-3.5" />;
    }
  };

  const currentHoveredCategory = CATEGORIES.find(c => c.id === activeHoverCat) || CATEGORIES[0];

  return (
    <div 
      id="amerce-navigation-bar" 
      className={`w-full bg-white/95 backdrop-blur-xs border-t border-b border-gray-100 relative font-menu transition-all duration-300 ${
        isScrolled ? 'py-0 border-b-gray-200/90 shadow-2xs' : 'py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: "All Categories" Mega Button (Modern Minimalist Dark Pill) */}
        <div ref={menuRef} className="relative z-30">
          <button
            id="browse-all-categories-btn"
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            onMouseEnter={() => setIsCategoryMenuOpen(true)}
            className={`flex items-center gap-2 px-4.5 bg-[#121212] hover:bg-[#262626] text-white font-semibold text-[12px] uppercase tracking-normal rounded-t-md transition-all cursor-pointer shadow-xs ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <Menu className="w-3.5 h-3.5" />
            <span className="font-menu">{isAr ? 'جميع الأقسام والتصنيفات' : 'All Departments'}</span>
            <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mega Category Flyout */}
          {isCategoryMenuOpen && (
            <div 
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
              className="absolute top-full start-0 w-[840px] max-w-[92vw] bg-white rounded-b-2xl shadow-2xl border border-gray-200/90 z-[100] flex overflow-hidden animate-fadeIn"
            >
              {/* Category Vertical List */}
              <div className="w-64 bg-[#fbfbfb] border-e border-gray-100 py-2.5 shrink-0 font-menu">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveHoverCat(cat.id)}
                    onClick={() => {
                      onOpenCategory(cat);
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3.5 py-2 text-[12px] font-medium cursor-pointer transition-colors ${
                      activeHoverCat === cat.id 
                        ? 'bg-white text-[#121212] shadow-2xs border-y border-gray-100 font-semibold' 
                        : 'text-stone-600 hover:text-black hover:bg-stone-100/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={activeHoverCat === cat.id ? 'text-[#f27d26]' : 'text-stone-400'}>
                        {getIcon(cat.iconName)}
                      </span>
                      <span>{isAr ? cat.nameAr : cat.nameEn}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {cat.badge && (
                        <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                          cat.badge === 'HOT' ? 'bg-[#f27d26] text-white' :
                          cat.badge === 'EXCLUSIVE' ? 'bg-amber-600 text-white' :
                          cat.badge === 'NEW' ? 'bg-[#1a1a1a] text-white' : 'bg-stone-800 text-white'
                        }`}>
                          {cat.badge}
                        </span>
                      )}
                      <ChevronRight className={`w-3 h-3 text-stone-400 ${isAr ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Mega Category Detail & Subcategories & Promo */}
              <div className="flex-1 p-5 bg-white flex flex-col justify-between font-menu">
                <div>
                  <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-3.5">
                    <h3 className="text-xs font-bold text-[#121212] uppercase tracking-normal flex items-center gap-2">
                      <span className="text-[#f27d26]">{getIcon(currentHoveredCategory.iconName)}</span>
                      <span>{isAr ? currentHoveredCategory.nameAr : currentHoveredCategory.nameEn}</span>
                    </h3>
                    <span className="text-[11px] text-stone-400 font-sans font-medium">
                      {isAr ? `${currentHoveredCategory.itemCount} منتج متوفر` : `${currentHoveredCategory.itemCount} Items`}
                    </span>
                  </div>

                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {currentHoveredCategory.subcategories ? (
                      currentHoveredCategory.subcategories.map((sub, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <h4 className="text-[11px] font-bold text-[#121212] border-b border-gray-100 pb-1">
                            {isAr ? sub.nameAr : sub.nameEn}
                          </h4>
                          <ul className="space-y-1">
                            {sub.items?.map((item, iIdx) => (
                              <li key={iIdx}>
                                <a 
                                  href={item.link} 
                                  className="text-[11.5px] text-stone-600 hover:text-[#f27d26] transition-colors block font-normal"
                                >
                                  {isAr ? item.nameAr : item.nameEn}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 py-6 text-center text-stone-400 text-xs font-menu">
                        {isAr ? 'تصفح تشكيلة مميزة من المنتجات المختارة بعناية في هذا القسم.' : 'Explore curated premium collections in this department.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Promo Banner at Bottom of Flyout */}
                {currentHoveredCategory.featuredPromo && (
                  <div className="mt-4 p-3 rounded-xl bg-[#1a1a1a] text-white flex items-center justify-between relative overflow-hidden border border-stone-800">
                    <div className="relative z-10">
                      <span className="text-[8.5px] font-bold uppercase tracking-wider bg-[#f27d26] text-white px-2 py-0.5 rounded-xs">
                        {isAr ? 'عرض مميز' : 'SPECIAL EDIT'}
                      </span>
                      <h4 className="text-xs font-serif font-bold mt-1 text-white">
                        {isAr ? currentHoveredCategory.featuredPromo.titleAr : currentHoveredCategory.featuredPromo.titleEn}
                      </h4>
                      <p className="text-[11px] text-stone-300 mt-0.5">
                        {isAr ? currentHoveredCategory.featuredPromo.discountTextAr : currentHoveredCategory.featuredPromo.discountTextEn}
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsCategoryMenuOpen(false)}
                      className="relative z-10 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white transition-colors flex items-center gap-1.5 cursor-pointer bg-[#f27d26] hover:bg-[#df6b15] shadow-xs uppercase"
                    >
                      <span>{isAr ? currentHoveredCategory.featuredPromo.linkTextAr : currentHoveredCategory.featuredPromo.linkTextEn}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center: Primary Navigation Links with Refined Font & Proportions (Strict single line) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 2xl:gap-2.5 whitespace-nowrap shrink-0">
          
          <a 
            href="#home"
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-semibold text-[#f27d26] transition-colors flex items-center gap-1 relative whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <span className="whitespace-nowrap">{isAr ? 'الرئيسية' : 'Home'}</span>
            <span className="absolute bottom-0 inset-x-2 h-0.5 bg-[#f27d26] rounded-full" />
          </a>

          {/* Shop with HOT badge */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveNavDropdown('shop')}
            onMouseLeave={() => setActiveNavDropdown(null)}
          >
            <button 
              className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
              }`}
            >
              <span className="whitespace-nowrap">{isAr ? 'التشكيلات والمنتجات' : 'Collections'}</span>
              <span className="bg-[#f27d26] text-white text-[8px] xl:text-[8.5px] font-bold px-1.5 py-0.2 rounded-full whitespace-nowrap shrink-0">
                HOT
              </span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60 shrink-0" />
            </button>

            {activeNavDropdown === 'shop' && (
              <div className="absolute top-full start-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-fadeIn font-menu">
                <a href="#shop" className="block px-3.5 py-2 text-[12px] text-stone-700 hover:bg-stone-50 hover:text-[#f27d26] whitespace-nowrap">
                  {isAr ? 'كل المنتجات مع فلترة ذكية' : 'All Products with Filters'}
                </a>
                <a href="#featured" className="block px-3.5 py-2 text-[12px] text-stone-700 hover:bg-stone-50 hover:text-[#f27d26] whitespace-nowrap">
                  {isAr ? 'المنتجات الأكثر طلباً' : 'Best Selling Items'}
                </a>
                <a href="#new" className="block px-3.5 py-2 text-[12px] text-stone-700 hover:bg-stone-50 hover:text-[#f27d26] whitespace-nowrap">
                  {isAr ? 'وصل حديثاً (أسبوعياً)' : 'New Weekly Arrivals'}
                </a>
                <a href="#brands" className="block px-3.5 py-2 text-[12px] text-stone-700 hover:bg-stone-50 hover:text-[#f27d26] whitespace-nowrap">
                  {isAr ? 'تسوق حسب الماركة والبراند' : 'Shop By Brand'}
                </a>
              </div>
            )}
          </div>

          {/* Flash Deals with Flame Icon */}
          <a 
            href="#deals"
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#f27d26] fill-[#f27d26] animate-pulse shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'عروض فلاش ديلز' : 'Flash Deals'}</span>
            <span className="bg-[#f27d26]/12 text-[#f27d26] text-[8.5px] font-bold px-1.5 py-0.2 rounded border border-[#f27d26]/25 whitespace-nowrap shrink-0">
              -40%
            </span>
          </a>

          {/* Makhawir & Dresses highlight tab */}
          <a 
            href="#makhawir"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById('featured-products-section');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <Crown className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'مخاور وفساتين' : 'Makhawir'}</span>
          </a>

          {/* Top Brands */}
          <a 
            href="#brands"
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <span className="whitespace-nowrap">{isAr ? 'الماركات العالمية' : 'Brands'}</span>
          </a>

          {/* Multi-Vendors Marketplace */}
          <a 
            href="#vendors"
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <span className="whitespace-nowrap">{isAr ? 'المتاجر والبائعين' : 'Vendors'}</span>
            <span className="bg-[#1a1a1a] text-white text-[8px] xl:text-[8.5px] font-bold px-1.5 py-0.2 rounded whitespace-nowrap shrink-0">
              NEW
            </span>
          </a>

          {/* Blog */}
          <a 
            href="#blog"
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <span className="whitespace-nowrap">{isAr ? 'مجلة المتجر' : 'Journal'}</span>
          </a>

          {/* Contact */}
          <a 
            href="#contact"
            className={`px-2 xl:px-2.5 2xl:px-3 text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] font-medium text-stone-700 hover:text-[#f27d26] transition-colors whitespace-nowrap shrink-0 ${
              isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
            }`}
          >
            <span className="whitespace-nowrap">{isAr ? 'اتصل بنا' : 'Contact'}</span>
          </a>
        </nav>

        {/* Right Side: Fast Promo Pill */}
        <div className="hidden xl:flex items-center gap-2 shrink-0 whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-[10.5px] 2xl:text-[11px] font-semibold text-stone-700 bg-stone-100/80 px-2.5 2xl:px-3 py-1 rounded-full border border-stone-200/80 whitespace-nowrap shrink-0">
            <Zap className="w-3 h-3 text-[#f27d26] fill-[#f27d26] shrink-0" />
            <span className="whitespace-nowrap">{isAr ? 'شحن مجاني للطلبات فوق 200 ر.س' : 'Free Express Delivery on $99+'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

