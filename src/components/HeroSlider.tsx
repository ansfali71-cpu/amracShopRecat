import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Pause, 
  Play, 
  Flame, 
  Scissors, 
  Crown, 
  Heart,
  Layers,
  Sparkle
} from 'lucide-react';
import { HeaderSettings, Product } from '../types';
import { THEME_MAP } from '../utils/theme';

export interface SlideItem {
  id: string;
  categoryKey: 'women-jalabiya' | 'girls-fashion' | 'boys-wear' | 'fabrics-curtains';
  badgeAr: string;
  badgeEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  highlightTagAr: string;
  highlightTagEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  secondaryCtaAr: string;
  secondaryCtaEn: string;
  imageUrl: string;
  accentColor: string;
  badgeBg: string;
}

const SLIDES_DATA: SlideItem[] = [
  {
    id: 'slide-women-makhawir',
    categoryKey: 'women-jalabiya',
    badgeAr: 'تشكيلة الموسم الملكية 2026',
    badgeEn: 'Royal Collection 2026',
    titleAr: 'فساتين، جلابيات ومخاور نسائية فاخرة',
    titleEn: 'Luxury Dresses, Jalabiyas & Makhawir',
    subtitleAr: 'تطريزات خليجية أصيلة، حرير وشيفون ملكي بأرقى لمسات الأناقة الشرقية',
    subtitleEn: 'Authentic Gulf Embroidery, Silk & Royal Chiffon for Elegant Evenings',
    descriptionAr: 'اكتشفي أحدث صيحات المخاوير الإماراتية والجلابيات التراثية المطرزة يدوياً بخيوط الذهب والفضة لتألق لا يضاهى في كل مناسبة.',
    descriptionEn: 'Discover hand-embroidered heritage jalabiyas, traditional Gulf makhawir, and couture evening gowns designed for royalty.',
    highlightTagAr: 'خصم خاص حتى 45% على التشكيلة الحصرية',
    highlightTagEn: 'Up to 45% OFF Exclusive Collection',
    ctaTextAr: 'تسوقي قسم الفساتين والمخاور',
    ctaTextEn: 'Shop Dresses & Jalabiyas',
    secondaryCtaAr: 'كتالوج التطريز الخاص',
    secondaryCtaEn: 'Embroidery Lookbook',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1600&auto=format&fit=crop&q=85',
    accentColor: 'from-amber-500 to-rose-600',
    badgeBg: 'bg-gradient-to-r from-amber-500 to-amber-700 text-white'
  },
  {
    id: 'slide-girls-fashion',
    categoryKey: 'girls-fashion',
    badgeAr: 'أزياء الأميرات الصغيرات',
    badgeEn: 'Little Princess Coutures',
    titleAr: 'فساتين وأزياء بناتي أنيقة وراقية',
    titleEn: 'Charming & Elegant Girls\' Fashion',
    subtitleAr: 'فساتين أعياد ومناسبات، أطقم ناعمة وموديلات تل ودانتيل غاية في الرقة',
    subtitleEn: 'Festive Party Dresses, Soft Fabrics, Tulle & Lace for Special Moments',
    descriptionAr: 'تشكيلة ساحرة تناسب إطلالات العيد وحفلات الزفاف والمناسبات الخاصة بأقمشة مريحة وتصاميم تواكب أحدث خطوط الموضة للأطفال.',
    descriptionEn: 'Enchanting dresses and festive matching sets crafted with skin-friendly fabrics, delicate ribbons, and joyous colors.',
    highlightTagAr: 'تشكيلة العيد 2026 - هدايا مجانية مع كل طلب',
    highlightTagEn: 'Eid 2026 Edition - Free Gifts with Order',
    ctaTextAr: 'استكشفي أزياء البناتي',
    ctaTextEn: 'Explore Girls\' Outfits',
    secondaryCtaAr: 'عروض الفساتين الناعمة',
    secondaryCtaEn: 'Party Dresses Offers',
    imageUrl: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1600&auto=format&fit=crop&q=85',
    accentColor: 'from-pink-500 to-purple-600',
    badgeBg: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white'
  },
  {
    id: 'slide-boys-wear',
    categoryKey: 'boys-wear',
    badgeAr: 'أناقة الفرسان الصغار',
    badgeEn: 'Junior Gentleman Collection',
    titleAr: 'أزياء وملابس ولادي كاجوال ورسمية',
    titleEn: 'Dapper Boys\' Suits, Thobes & Casual Wear',
    subtitleAr: 'ثياب خليجية مطرزة، بدل رسمية أنيقة، وأطقم يومية مريحة وعملية',
    subtitleEn: 'Authentic Tailored Thobes, Formal Suits & Everyday Sporty Sets',
    descriptionAr: 'اختيارات مميزة تجمع بين الفخامة والراحة لأطفالكم، من الثياب البيضاء المطرزة بدقة إلى البدل الكلاسيكية والملابس الكاجوال عالية الجودة.',
    descriptionEn: 'Tailored premium boys\' thobes, crisp shirts, festive waistcoats, and casual wear crafted for durably active days.',
    highlightTagAr: 'وصل حديثاً: ثياب وأطقم صيف 2026',
    highlightTagEn: 'New Arrivals: Summer 2026 Collection',
    ctaTextAr: 'تسوق ملابس الولادي',
    ctaTextEn: 'Shop Boys\' Collection',
    secondaryCtaAr: 'تفصيل الثياب الفاخرة',
    secondaryCtaEn: 'Custom Tailored Thobes',
    imageUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1600&auto=format&fit=crop&q=85',
    accentColor: 'from-blue-600 to-cyan-600',
    badgeBg: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
  },
  {
    id: 'slide-fabrics-curtains',
    categoryKey: 'fabrics-curtains',
    badgeAr: 'عالم الديكور والفخامة المنزلية',
    badgeEn: 'Home Decor & Luxury Fabrics',
    titleAr: 'أقمشة تفصيل، مفروشات وستائر فاخرة',
    titleEn: 'Premium Fabrics, Bedding & Luxury Curtains',
    subtitleAr: 'حرير، مخمل، جاكار، ومفروشات عصرية وستائر تعيد إحياء فخامة منزلك',
    subtitleEn: 'Silk, Velvet, Jacquard Fabrics & Bespoke Curtains to Elevate Your Home',
    descriptionAr: 'أكبر تشكيلة من أقمشة التفصيل الفاخرة، أطقم المفروشات المنزلية الملكية، والستائر المعتمة والمطرزة بأعلى معايير الجودة العالمية.',
    descriptionEn: 'Discover exclusive rolls of couture fabrics, custom-draped curtains, and designer bedding for an authentic palace ambiance.',
    highlightTagAr: 'خدمة القياس والتفصيل المخصص متوفرة',
    highlightTagEn: 'Free Custom Measurement & Tailoring',
    ctaTextAr: 'تسوق الأقمشة والمفروشات',
    ctaTextEn: 'Shop Fabrics & Curtains',
    secondaryCtaAr: 'طلب عينات مجانية',
    secondaryCtaEn: 'Request Fabric Swatches',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&auto=format&fit=crop&q=85',
    accentColor: 'from-emerald-600 to-teal-700',
    badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-800 text-white'
  }
];

interface HeroSliderProps {
  settings: HeaderSettings;
  onExploreCategory?: (categoryKey: string) => void;
  onQuickShop?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  settings,
  onExploreCategory,
  onQuickShop
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const slideDuration = 5000; // 5 seconds per slide
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES_DATA.length);
    setProgress(0);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay Timer & Smooth Progress Bar Animation
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalStep = 50; // update progress every 50ms
    const totalSteps = slideDuration / intervalStep;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / totalSteps);
      });
    }, intervalStep);

    timerRef.current = setInterval(() => {
      goToNextSlide();
    }, slideDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, goToNextSlide]);

  const activeSlide = SLIDES_DATA[currentIndex];

  return (
    <section 
      id="main-hero-showcase-slider"
      className="w-full bg-[#fafafa] select-none pt-3 sm:pt-5 pb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Main Store Banners Slider"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Rounded Outer Slider Container */}
        <div className="relative w-full min-h-[360px] h-[380px] sm:min-h-[460px] sm:h-[540px] md:h-[580px] lg:h-[620px] xl:h-[650px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 bg-neutral-900">
          {SLIDES_DATA.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                } transition-transform duration-1000`}
              >
                {/* Background Image with High-Res Fit & Rounded Corners */}
                <img
                  src={slide.imageUrl}
                  alt={isAr ? slide.titleAr : slide.titleEn}
                  className="w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl brightness-[0.78] filter contrast-105 transform scale-100 transition-transform duration-7000 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Overlays for High Legibility */}
                <div 
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${
                    isAr 
                      ? 'from-black/95 via-black/75 to-black/30 sm:via-black/60 sm:to-transparent' 
                      : 'from-black/30 via-black/75 to-black/95 sm:from-black/95 sm:via-black/60 sm:to-transparent'
                  }`}
                />
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
              </div>
            );
          })}

          {/* Content Container (Layered on top of active slide) */}
          <div className="relative z-20 w-full h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-between py-4 sm:py-8 lg:py-10">
            
            {/* Top Row: Mini Tag & Slide Indicator / Play Toggle */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2 max-w-[75%] truncate">
                <span className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg ${activeSlide.badgeBg} shrink-0`}>
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">{isAr ? activeSlide.badgeAr : activeSlide.badgeEn}</span>
                </span>

                <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-white/10 backdrop-blur-md text-white/90 rounded-full text-xs font-semibold border border-white/15 truncate">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                  <span className="truncate">{isAr ? activeSlide.highlightTagAr : activeSlide.highlightTagEn}</span>
                </span>
              </div>

              {/* Play/Pause & Slide Count Status */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 text-white text-[10px] sm:text-xs font-mono shrink-0">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-amber-400 transition-colors p-0.5 sm:p-1 cursor-pointer"
                  title={isPlaying ? 'Pause Auto Slider' : 'Play Auto Slider'}
                  aria-label="Toggle Auto Slider"
                >
                  {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                </button>
                <span className="text-white/40">|</span>
                <span className="font-bold text-amber-400">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-white/40">/</span>
                <span className="text-stone-300">{String(SLIDES_DATA.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Middle Row: Main Editorial Headings & Description */}
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl space-y-2.5 sm:space-y-4 md:space-y-6 my-auto py-2">
              
              {/* Subtitle Eyebrow */}
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-[11px] sm:text-sm tracking-wide">
                <span className="w-5 sm:w-8 h-0.5 bg-amber-400 rounded-full shrink-0" />
                <span className="truncate">{isAr ? activeSlide.subtitleAr : activeSlide.subtitleEn}</span>
              </div>

              {/* Large Expressive Title */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-[1.12] sm:leading-[1.08] tracking-tight drop-shadow-md">
                {isAr ? activeSlide.titleAr : activeSlide.titleEn}
              </h2>

              {/* Rich Narrative Description */}
              <p className="text-xs sm:text-base lg:text-lg text-stone-200 leading-relaxed font-sans max-w-2xl drop-shadow-xs line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                {isAr ? activeSlide.descriptionAr : activeSlide.descriptionEn}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => {
                    if (onExploreCategory) {
                      onExploreCategory(activeSlide.categoryKey);
                    } else if (onQuickShop) {
                      onQuickShop();
                    }
                  }}
                  className="px-4 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-amber-500 to-[#f27d26] hover:from-amber-400 hover:to-[#df6b15] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 sm:hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 sm:gap-2 group"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  <span>{isAr ? activeSlide.ctaTextAr : activeSlide.ctaTextEn}</span>
                  <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </button>

                <button
                  onClick={() => {
                    if (onExploreCategory) {
                      onExploreCategory(activeSlide.categoryKey);
                    }
                  }}
                  className="hidden xs:flex px-4 sm:px-8 py-2.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-white/25 backdrop-blur-md transition-all cursor-pointer items-center gap-1.5 sm:gap-2 active:scale-95"
                >
                  <Sparkle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                  <span>{isAr ? activeSlide.secondaryCtaAr : activeSlide.secondaryCtaEn}</span>
                </button>
              </div>

            </div>

            {/* Bottom Row: Interactive Thumbnail Tabs & Progress Bars */}
            <div className="pt-2 sm:pt-4 md:pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 sm:gap-2.5 md:gap-3">
                {SLIDES_DATA.map((slide, idx) => {
                  const isSelected = idx === currentIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      className={`relative p-2 sm:p-2.5 md:p-3 rounded-xl text-start transition-all cursor-pointer flex flex-col justify-between overflow-hidden border ${
                        isSelected
                          ? 'bg-white/20 border-amber-400/80 shadow-lg backdrop-blur-md'
                          : 'bg-black/30 hover:bg-black/50 border-white/10 text-stone-300'
                      }`}
                    >
                      {/* Active Timer Progress Bar along bottom */}
                      {isSelected && (
                        <div 
                          className="absolute bottom-0 inset-x-0 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-[#f27d26] transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      )}

                      <div className="flex items-center justify-between w-full mb-0.5 sm:mb-1">
                        <span className={`text-[9px] sm:text-[10px] font-mono font-bold ${isSelected ? 'text-amber-300' : 'text-stone-400'}`}>
                          0{idx + 1}.
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        )}
                      </div>

                      <span className={`text-[11px] sm:text-xs font-bold truncate block ${isSelected ? 'text-white font-extrabold' : 'text-stone-300'}`}>
                        {isAr ? slide.titleAr.split(' ')[0] + ' ' + (slide.titleAr.split(' ')[1] || '') : slide.titleEn.split(' ')[0] + ' ' + (slide.titleEn.split(' ')[1] || '')}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-stone-400 truncate hidden sm:block">
                        {isAr ? slide.badgeAr : slide.badgeEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Previous & Next Navigation Arrows (Floating on edges inside rounded container) */}
          <button
            onClick={isAr ? goToNextSlide : goToPrevSlide}
            className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 ${
              isAr ? 'end-3 sm:end-6' : 'start-3 sm:start-6'
            } z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white items-center justify-center border border-white/20 transition-all transform hover:scale-110 shadow-2xl cursor-pointer`}
            aria-label="Previous Slide"
          >
            {isAr ? <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          <button
            onClick={isAr ? goToPrevSlide : goToNextSlide}
            className={`hidden sm:flex absolute top-1/2 -translate-y-1/2 ${
              isAr ? 'start-3 sm:start-6' : 'end-3 sm:end-6'
            } z-30 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md text-white items-center justify-center border border-white/20 transition-all transform hover:scale-110 shadow-2xl cursor-pointer`}
            aria-label="Next Slide"
          >
            {isAr ? <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

        </div>
      </div>
    </section>
  );
};
