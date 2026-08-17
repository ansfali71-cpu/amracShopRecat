import React, { useEffect, useRef } from 'react';
import { 
  Crown, 
  Sparkles, 
  Shirt, 
  Layers, 
  Grid, 
  ChevronRight, 
  Flame,
  Star,
  Tag,
  Sparkle,
  MoveHorizontal
} from 'lucide-react';
import { HeaderSettings, CategoryItem } from '../types';
import { CATEGORIES } from '../data/mockData';
import { THEME_MAP } from '../utils/theme';

interface MobileCategoriesBarProps {
  settings: HeaderSettings;
  activeCategoryId?: string;
  onOpenAllCategories: () => void;
  onSelectCategory?: (category: CategoryItem | string) => void;
  variant?: 'light' | 'dark';
  isScrolled?: boolean;
}

export const MobileCategoriesBar: React.FC<MobileCategoriesBarProps> = ({
  settings,
  activeCategoryId = 'all',
  onOpenAllCategories,
  onSelectCategory,
  variant = 'light',
  isScrolled = false
}) => {
  const isAr = settings.language === 'ar';
  const isDark = variant === 'dark';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // Touch gesture support for quick category flicking
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);
  const isFlickingRef = useRef<boolean>(false);

  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [activeCategoryId]);

  const allCategoryTabs = [
    { id: 'all', nameAr: 'الكل', nameEn: 'All' },
    ...CATEGORIES.map(c => ({ id: c.id, nameAr: c.nameAr, nameEn: c.nameEn, original: c }))
  ];

  const handleBarTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchStartYRef.current = e.targetTouches[0].clientY;
    touchEndXRef.current = e.targetTouches[0].clientX;
    isFlickingRef.current = true;
  };

  const handleBarTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleBarTouchEnd = (e: React.TouchEvent) => {
    if (!isFlickingRef.current) return;
    isFlickingRef.current = false;
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    
    // Quick fast flick (> 65px swipe)
    if (Math.abs(deltaX) > 65) {
      const currentIndex = allCategoryTabs.findIndex(c => c.id === activeCategoryId);
      const total = allCategoryTabs.length;
      if (currentIndex !== -1) {
        let nextIndex = currentIndex;
        if (isAr) {
          // RTL: Swipe Right -> Next, Swipe Left -> Prev
          if (deltaX > 0) {
            nextIndex = (currentIndex + 1) % total;
          } else {
            nextIndex = (currentIndex - 1 + total) % total;
          }
        } else {
          // LTR: Swipe Left -> Next, Swipe Right -> Prev
          if (deltaX < 0) {
            nextIndex = (currentIndex + 1) % total;
          } else {
            nextIndex = (currentIndex - 1 + total) % total;
          }
        }

        const targetTab = allCategoryTabs[nextIndex];
        if (onSelectCategory) {
          if (targetTab.id === 'all') {
            onSelectCategory('all');
          } else {
            const foundCat = CATEGORIES.find(c => c.id === targetTab.id);
            if (foundCat) onSelectCategory(foundCat);
          }
        }
      }
    }
  };

  const categoryIconMap: Record<string, React.ReactNode> = {
    'women-makhawir': <Crown className="w-3.5 h-3.5 text-amber-600" />,
    'girls-fashion': <Sparkles className="w-3.5 h-3.5 text-pink-600" />,
    'boys-wear': <Shirt className="w-3.5 h-3.5 text-blue-600" />,
    'fabrics-curtains': <Layers className="w-3.5 h-3.5 text-emerald-600" />,
    'electronics': <Star className="w-3.5 h-3.5 text-purple-600" />,
    'fragrances': <Flame className="w-3.5 h-3.5 text-rose-600" />
  };

  return (
    <div 
      id="mobile-quick-categories-bar"
      ref={scrollContainerRef}
      onTouchStart={handleBarTouchStart}
      onTouchMove={handleBarTouchMove}
      onTouchEnd={handleBarTouchEnd}
      className={`lg:hidden w-full overflow-x-auto no-scrollbar border-t select-none transition-all duration-300 relative ${
        isScrolled ? 'py-1 px-2.5 shadow-2xs' : 'py-2 px-3'
      } ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-slate-200' 
          : 'bg-stone-50/95 backdrop-blur-xs border-stone-200/70 text-stone-700'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div className="flex items-center gap-1.5 min-w-max">
        
        {/* All Departments Primary Drawer Opener Button */}
        <button
          onClick={onOpenAllCategories}
          className={`flex items-center gap-1 bg-black hover:bg-[#f27d26] text-white rounded-full font-bold shadow-2xs transition-all cursor-pointer shrink-0 ${
            isScrolled ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1.5 text-[11px]'
          }`}
        >
          <Grid className="w-3 h-3 text-amber-400" />
          <span>{isAr ? 'الأقسام' : 'All'}</span>
          <ChevronRight className={`w-2.5 h-2.5 opacity-70 ${isAr ? 'rotate-180' : ''}`} />
        </button>

        {/* 'All Products' (الكل) Direct Tab Chip */}
        <button
          ref={activeCategoryId === 'all' ? activeBtnRef : undefined}
          onClick={() => {
            if (onSelectCategory) {
              onSelectCategory('all');
            }
          }}
          className={`flex items-center gap-1 rounded-full font-bold transition-all cursor-pointer border shrink-0 ${
            isScrolled ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]'
          } ${
            activeCategoryId === 'all'
              ? 'bg-gradient-to-r from-amber-500 to-[#f27d26] text-white border-transparent shadow-xs scale-102 font-black ring-2 ring-amber-400/30'
              : isDark
                ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
                : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
          }`}
        >
          <Sparkle className="w-3 h-3 text-amber-300" />
          <span>{isAr ? 'الكل' : 'All'}</span>
        </button>

        {/* Scrollable Category Chips */}
        {CATEGORIES.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          const icon = categoryIconMap[cat.id] || <Tag className="w-3 h-3 text-stone-500" />;
          
          return (
            <button
              key={cat.id}
              ref={isActive ? activeBtnRef : undefined}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(cat);
                } else {
                  onOpenAllCategories();
                }
              }}
              className={`flex items-center gap-1 rounded-full font-bold transition-all cursor-pointer border shrink-0 group ${
                isScrolled ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-[11px]'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-[#f27d26] text-white border-transparent shadow-xs scale-102 font-black ring-2 ring-amber-400/30'
                  : isDark
                    ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/80 text-slate-200'
                    : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-800 shadow-2xs hover:border-stone-400'
              }`}
            >
              <span className={`p-0.5 rounded-full transition-transform ${isActive ? 'bg-white/20' : 'bg-stone-100 group-hover:scale-110'}`}>
                {icon}
              </span>
              <span>{isAr ? cat.nameAr : cat.nameEn}</span>
              {cat.badge && !isScrolled && (
                <span className={`px-1.5 py-0.2 text-[8px] font-black uppercase rounded-full border ${
                  isActive 
                    ? 'bg-white text-[#f27d26] border-white' 
                    : 'bg-amber-500/15 text-amber-700 border-amber-500/20'
                }`}>
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
};

