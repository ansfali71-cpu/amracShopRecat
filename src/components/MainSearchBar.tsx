import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  ChevronDown, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Mic, 
  ArrowRight, 
  Check,
  Star
} from 'lucide-react';
import { CATEGORIES, SAMPLE_PRODUCTS, TRENDING_SEARCH_TAGS } from '../data/mockData';
import { HeaderSettings, Product } from '../types';
import { THEME_MAP } from '../utils/theme';

interface MainSearchBarProps {
  settings: HeaderSettings;
  onSelectProduct: (product: Product) => void;
  currency: string;
  variant?: 'pill' | 'boxed' | 'minimal' | 'expanded';
}

export const MainSearchBar: React.FC<MainSearchBarProps> = ({
  settings,
  onSelectProduct,
  currency,
  variant = 'boxed'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isOpenResults, setIsOpenResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'ايفون 16',
    'Sony XM5',
    'قهوة اسبريسو'
  ]);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  // Filter products based on query and category
  const filteredProducts = SAMPLE_PRODUCTS.filter((prod) => {
    const matchesQuery = 
      !searchTerm.trim() ||
      prod.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.categoryAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.categoryEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.vendor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategoryId === 'all' || 
      (selectedCategoryId === 'electronics' && prod.categoryAr.includes('إلكترونيات')) ||
      (selectedCategoryId === 'fashion' && prod.categoryAr.includes('أزياء')) ||
      (selectedCategoryId === 'home' && prod.categoryAr.includes('منزل'));

    return matchesQuery && matchesCategory;
  });

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpenResults(false);
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setSearchTerm(isAr ? 'سماعات سوني' : 'Sony Headphones');
      setIsListening(false);
      setIsOpenResults(true);
    }, 1500);
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    setIsOpenResults(true);
  };

  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId);
  const selectedCatLabel = selectedCategoryId === 'all' 
    ? (isAr ? 'جميع الأقسام' : 'All Categories') 
    : (isAr ? selectedCategory?.nameAr : selectedCategory?.nameEn);

  return (
    <div 
      ref={searchContainerRef}
      id="main-search-wrapper" 
      className="relative flex-1 max-w-2xl w-full"
    >
      <div 
        className={`flex items-center w-full transition-all duration-200 ${
          variant === 'pill' 
            ? 'rounded-full border bg-[#f8f8f8]' 
            : 'rounded-full sm:rounded-full border bg-[#f8f8f8]'
        } ${
          isOpenResults 
            ? 'border-[#1a1a1a] shadow-lg ring-2 ring-[#f27d26]/10' 
            : 'border-gray-200 hover:border-gray-300 shadow-2xs'
        }`}
      >
        {/* Category Selector Dropdown */}
        <div className="relative shrink-0 hidden sm:block">
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="h-11 px-4 flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-black uppercase tracking-wider border-e border-gray-200 bg-transparent transition-colors cursor-pointer rounded-s-full"
          >
            <span className="truncate max-w-[120px]">{selectedCatLabel}</span>
            <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCategoryOpen && (
            <div className="absolute top-full start-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[80] animate-fadeIn text-left">
              <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {isAr ? 'تصفية حسب القسم' : 'Filter By Department'}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId('all');
                  setIsCategoryOpen(false);
                }}
                className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between cursor-pointer ${
                  selectedCategoryId === 'all' ? 'font-bold text-[#f27d26] bg-[#f27d26]/5' : 'text-stone-700'
                }`}
              >
                <span>{isAr ? 'جميع الأقسام' : 'All Categories'}</span>
                {selectedCategoryId === 'all' && <Check className="w-3.5 h-3.5 text-[#f27d26]" />}
              </button>

              <div className="h-px bg-stone-100 my-1" />

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategoryId(cat.id);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full text-start px-3 py-2 text-xs hover:bg-stone-50 flex items-center justify-between cursor-pointer ${
                    selectedCategoryId === cat.id ? 'font-bold text-[#f27d26] bg-[#f27d26]/5' : 'text-stone-700'
                  }`}
                >
                  <span className="truncate">{isAr ? cat.nameAr : cat.nameEn}</span>
                  <span className="text-[10px] text-gray-400 font-mono">({cat.itemCount})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input Field */}
        <div className="relative flex-1 flex items-center">
          <input
            id="amerce-live-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpenResults(true);
            }}
            onFocus={() => setIsOpenResults(true)}
            placeholder={
              isAr
                ? 'ابحث عن المنتجات الفاخرة، الماركات، والأقسام...'
                : 'Search for premium products, brands...'
            }
            className="w-full h-11 px-4 text-xs sm:text-sm text-[#121212] placeholder-gray-400 bg-transparent outline-none font-medium"
          />

          {/* Clear & Voice Buttons */}
          <div className="flex items-center gap-1 px-2">
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white animate-bounce' 
                  : 'text-gray-400 hover:text-black hover:bg-gray-100'
              }`}
              title={isAr ? 'البحث الصوتي' : 'Voice Search'}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Submit Search Button (Editorial Circular / Rounded Pill) */}
        <button
          type="button"
          onClick={() => setIsOpenResults(true)}
          className="h-9 px-4 me-1 flex items-center justify-center gap-1.5 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-full bg-[#1a1a1a] hover:bg-[#f27d26] shadow-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">{isAr ? 'بحث' : 'Search'}</span>
        </button>
      </div>

      {/* Live Interactive Search Results Dropdown */}
      {isOpenResults && (
        <div 
          id="search-live-dropdown"
          className="absolute top-full start-0 end-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-[90] max-h-[520px] overflow-y-auto divide-y divide-gray-100 animate-fadeIn"
        >
          {/* Trending Searches Tags */}
          <div className="px-5 pb-3">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-[#f27d26]" />
              <span>{isAr ? 'عمليات البحث الشائعة الآن' : 'Trending Searches Right Now'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCH_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(isAr ? tag.ar : tag.en)}
                  className="px-3 py-1 bg-stone-100 hover:bg-[#f27d26]/10 hover:text-[#f27d26] text-stone-700 text-xs rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{isAr ? tag.ar : tag.en}</span>
                  <ArrowRight className={`w-3 h-3 opacity-40 ${isAr ? 'rotate-180' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Results List */}
          <div className="px-5 py-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-3">
              <span className="uppercase tracking-wider text-[11px]">{isAr ? 'المنتجات المقترحة' : 'Suggested Products'}</span>
              <span className="text-[11px] font-normal text-gray-400">
                {isAr ? `تم العثور على ${filteredProducts.length} منتجات` : `Found ${filteredProducts.length} items`}
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredProducts.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      setIsOpenResults(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 border border-stone-100 hover:border-stone-200 transition-all cursor-pointer group"
                  >
                    <img 
                      src={prod.image} 
                      alt={isAr ? prod.nameAr : prod.nameEn}
                      className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">
                        <span>{isAr ? prod.categoryAr : prod.categoryEn}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-[#121212] line-clamp-1 group-hover:text-[#f27d26] transition-colors">
                        {isAr ? prod.nameAr : prod.nameEn}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-extrabold text-[#121212]">
                            {currency === 'SAR' ? `${(prod.price * 3.75).toFixed(0)} ر.س` : `$${prod.price.toFixed(2)}`}
                          </span>
                          {prod.oldPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                              {currency === 'SAR' ? `${(prod.oldPrice * 3.75).toFixed(0)} ر.س` : `$${prod.oldPrice.toFixed(2)}`}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-stone-700">{prod.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-gray-400 text-xs">
                {isAr ? 'لم نتمكن من العثور على نتائج مطابقة لكلمة البحث.' : 'No products found matching your search.'}
              </div>
            )}
          </div>

          {/* Quick Footer with View All */}
          <div className="px-5 pt-3 flex items-center justify-between bg-stone-50/70 rounded-b-2xl">
            <span className="text-xs text-gray-500 font-medium">
              {isAr ? 'هل تبحث عن متجر أو بائع معين؟' : 'Looking for a specific store or brand?'}
            </span>
            <button
              onClick={() => setIsOpenResults(false)}
              className="text-xs font-bold text-[#f27d26] hover:text-[#df6b15] flex items-center gap-1 cursor-pointer py-1 uppercase tracking-wider"
            >
              <span>{isAr ? 'عرض كافة النتائج (50+)' : 'View All Results (50+)'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
