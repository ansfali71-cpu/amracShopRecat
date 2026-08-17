import React, { useState } from 'react';
import { 
  Heart, 
  Scale, 
  ShoppingCart, 
  Star, 
  Truck, 
  Eye, 
  Check, 
  Flame,
  Sparkles
} from 'lucide-react';
import { Product, ProductColor, HeaderSettings } from '../types';
import { ColorSwatch } from './ColorSwatch';

interface InteractiveProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  currency: string;
  isAr: boolean;
  isWishlisted: boolean;
  isCompared: boolean;
  onAddToCart: (p: Product, selectedColor?: string) => void;
  onAddToWishlist: (p: Product) => void;
  onAddToCompare: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

export const InteractiveProductCard: React.FC<InteractiveProductCardProps> = ({
  product,
  viewMode,
  currency,
  isAr,
  isWishlisted,
  isCompared,
  onAddToCart,
  onAddToWishlist,
  onAddToCompare,
  onQuickView
}) => {
  // Local state for active color swatch
  const [activeColor, setActiveColor] = useState<ProductColor | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );

  // Active displayed image (switches dynamically with active color variant)
  const currentImage = (activeColor && activeColor.image) ? activeColor.image : product.image;

  const priceDisplay = currency === 'SAR' 
    ? `${(product.price * 3.75).toFixed(0)} ر.س` 
    : `$${product.price.toFixed(2)}`;
  
  const oldPriceDisplay = product.oldPrice 
    ? (currency === 'SAR' ? `${(product.oldPrice * 3.75).toFixed(0)} ر.س` : `$${product.oldPrice.toFixed(2)}`)
    : null;

  const handleColorSelect = (color: ProductColor) => {
    setActiveColor(color);
  };

  const handleAdd = () => {
    onAddToCart(product, activeColor ? (isAr ? activeColor.nameAr : activeColor.nameEn) : undefined);
  };

  if (viewMode === 'grid') {
    return (
      <div 
        id={`product-card-${product.id}`}
        className="bg-white rounded-xl sm:rounded-2xl border border-gray-100/90 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-1.5 sm:p-3 group relative overflow-hidden h-full"
      >
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-1.5 start-1.5 sm:top-2.5 sm:start-2.5 z-10 text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider px-1 sm:px-2 py-0.5 rounded-xs shadow-2xs ${
            product.badge.type === 'hot' ? 'bg-[#f27d26] text-white' :
            product.badge.type === 'new' ? 'bg-[#121212] text-white' : 'bg-stone-900 text-white'
          }`}>
            {isAr ? product.badge.textAr : product.badge.textEn}
          </span>
        )}

        {/* Quick Actions (Wishlist, Compare & QuickView) */}
        <div className="absolute top-1.5 end-1.5 sm:top-2.5 sm:end-2.5 z-10 flex flex-col gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onAddToWishlist(product)}
            className={`p-1 sm:p-2 rounded-full shadow-2xs border transition-colors cursor-pointer ${
              isWishlisted 
                ? 'bg-red-50 text-[#f27d26] border-[#f27d26]/30' 
                : 'bg-white/95 hover:bg-white text-stone-700 border-gray-200'
            }`}
            title="Wishlist"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${isWishlisted ? 'fill-[#f27d26] text-[#f27d26]' : ''}`} />
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="p-1 sm:p-2 rounded-full shadow-2xs border bg-white/95 hover:bg-black hover:text-white text-stone-700 border-gray-200 transition-colors cursor-pointer"
            title={isAr ? 'معاينة سريعة' : 'Quick View'}
            aria-label="Quick view"
          >
            <Eye className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          </button>

          <button
            onClick={() => onAddToCompare(product)}
            className={`hidden xs:flex p-1 sm:p-2 rounded-full shadow-2xs border transition-colors cursor-pointer ${
              isCompared 
                ? 'bg-blue-50 text-blue-600 border-blue-200' 
                : 'bg-white/95 hover:bg-white text-stone-700 border-gray-200'
            }`}
            title="Compare"
            aria-label="Compare product"
          >
            <Scale className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Product Image Stage - Proportional, balanced height for phones (aspect-square/28 on mobile, 44 on desktop) */}
        <div 
          onClick={() => onQuickView(product)}
          className="w-full aspect-[4/4.5] sm:aspect-auto sm:h-44 rounded-lg sm:rounded-xl bg-stone-50 overflow-hidden mb-1.5 sm:mb-2 relative group/img cursor-pointer"
        >
          <img 
            src={currentImage} 
            alt={isAr ? product.nameAr : product.nameEn}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Fast Delivery Badge (Top Start) */}
          <span className="absolute top-1.5 start-1.5 bg-black/60 backdrop-blur-xs text-white text-[7px] sm:text-[8px] font-bold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full flex items-center gap-0.5 sm:gap-1 border border-white/10 z-10">
            <Truck className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-300" />
            <span>{isAr ? 'توصيل سريع' : 'Fast Ship'}</span>
          </span>

          {/* Floating Colors Overlay at Bottom of Image */}
          {product.colors && product.colors.length > 0 && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="absolute bottom-1.5 start-1.5 sm:bottom-2 sm:start-2 z-10 bg-black/40 hover:bg-black/60 backdrop-blur-md px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <ColorSwatch
                colors={product.colors}
                selectedColorHex={activeColor?.hex || product.colors[0]?.hex}
                onSelectColor={handleColorSelect}
                isAr={isAr}
                size="xs"
                theme="dark-overlay"
              />
              {activeColor && (
                <span className="text-[8px] sm:text-[9px] text-white font-semibold hidden xs:inline-block truncate max-w-[40px] sm:max-w-[50px]">
                  {isAr ? activeColor.nameAr : activeColor.nameEn}
                </span>
              )}
            </div>
          )}

          {/* Quick View Hover Pill Overlay on Desktop */}
          <div className="absolute inset-x-3 bottom-2 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 pointer-events-none">
            <span className="w-full py-1 bg-white/95 backdrop-blur-xs text-[#121212] text-[9.5px] font-bold rounded-lg shadow-sm text-center border border-gray-200">
              {isAr ? 'معاينة سريعة' : 'Quick Preview'}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between gap-1">
              <span className="text-[8px] sm:text-[9.5px] font-bold text-stone-400 uppercase tracking-wider truncate">
                {isAr ? product.categoryAr : product.categoryEn}
              </span>
              <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                <Star className="w-2.5 h-2.5 fill-amber-400" />
                <span className="text-[8.5px] sm:text-[9.5px] font-bold text-stone-800">{product.rating}</span>
              </div>
            </div>

            {/* Product Title */}
            <h4 
              onClick={() => onQuickView(product)}
              className="text-[10px] sm:text-[11.5px] font-medium text-[#121212] line-clamp-1 sm:line-clamp-2 mt-0.5 group-hover:text-[#f27d26] transition-colors leading-tight sm:leading-snug cursor-pointer"
            >
              {isAr ? product.nameAr : product.nameEn}
            </h4>
          </div>

          {/* Price & Add to Cart Footer */}
          <div className="pt-1 sm:pt-1.5 mt-1 sm:mt-1.5 border-t border-gray-100 flex items-center justify-between gap-1">
            <div>
              <span className="text-[10.5px] sm:text-xs font-black text-[#121212] block leading-tight font-sans">
                {priceDisplay}
              </span>
              {oldPriceDisplay && (
                <span className="text-[8px] sm:text-[9px] text-stone-400 line-through">
                  {oldPriceDisplay}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              className="p-1 sm:p-1.5 rounded-full text-white font-bold transition-all cursor-pointer bg-[#121212] hover:bg-[#f27d26] shadow-2xs active:scale-95 sm:hover:scale-105 shrink-0"
              title={isAr ? 'أضف للسلة' : 'Add to Bag'}
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>

      </div>
    );
  }

  // LIST VIEW RENDERING
  return (
    <div 
      id={`product-list-card-${product.id}`}
      className="bg-white rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all p-2.5 sm:p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 group relative"
    >
      {/* Thumbnail Stage */}
      <div 
        onClick={() => onQuickView(product)}
        className="w-full sm:w-32 md:w-36 h-36 sm:h-32 shrink-0 rounded-xl bg-stone-50 overflow-hidden relative flex items-center justify-center cursor-pointer group/img"
      >
        <img 
          src={currentImage} 
          alt={isAr ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {product.badge && (
          <span className={`absolute top-2 start-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-2xs ${
            product.badge.type === 'hot' ? 'bg-[#f27d26] text-white' : 'bg-stone-900 text-white'
          }`}>
            {isAr ? product.badge.textAr : product.badge.textEn}
          </span>
        )}

        {/* Floating Colors Overlay at Bottom of Image */}
        {product.colors && product.colors.length > 0 && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="absolute bottom-1.5 start-1.5 z-10 bg-black/55 hover:bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/20 shadow-xs flex items-center gap-1 transition-all"
          >
            <ColorSwatch
              colors={product.colors}
              selectedColorHex={activeColor?.hex || product.colors[0]?.hex}
              onSelectColor={handleColorSelect}
              isAr={isAr}
              size="xs"
              theme="dark-overlay"
            />
          </div>
        )}
      </div>

      {/* Middle Info Column */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-[#f27d26] bg-[#f27d26]/10 px-1.5 py-0.5 rounded-md">
              {isAr ? product.categoryAr : product.categoryEn}
            </span>
            <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-1">
              <Check className="w-2.5 h-2.5" />
              <span>{isAr ? 'متوفر وجاهز للشحن' : 'In Stock'}</span>
            </span>
          </div>

          <h4 
            onClick={() => onQuickView(product)}
            className="text-xs sm:text-sm font-medium text-[#121212] mt-1 group-hover:text-[#f27d26] transition-colors cursor-pointer leading-snug"
          >
            {isAr ? product.nameAr : product.nameEn}
          </h4>

          <div className="flex items-center gap-2.5 mt-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-stone-800">{product.rating}</span>
              <span className="text-[9px] text-gray-400">({product.reviewsCount})</span>
            </div>
            <span className="text-stone-300">•</span>
            <span className="text-[9.5px] text-stone-500 font-mono">
              {isAr ? 'كود: ' : 'SKU: '}{product.id.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Right Price & Actions Box */}
      <div className="sm:border-s sm:border-gray-100 sm:ps-4 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
        <div className="text-start sm:text-end">
          <span className="text-sm sm:text-base font-black text-[#121212] block">
            {priceDisplay}
          </span>
          {oldPriceDisplay && (
            <span className="text-[9.5px] text-gray-400 line-through block">
              {oldPriceDisplay}
            </span>
          )}
          <span className="text-[9px] text-emerald-600 font-bold">
            {isAr ? 'شحن مجاني' : 'Free Ship'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQuickView(product)}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-black hover:text-white text-stone-700 transition-colors cursor-pointer"
            title={isAr ? 'معاينة سريعة' : 'Quick View'}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onAddToWishlist(product)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isWishlisted 
                ? 'bg-red-50 text-[#f27d26] border-[#f27d26]/30' 
                : 'bg-white hover:bg-stone-50 text-stone-700 border-gray-200'
            }`}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#f27d26] text-[#f27d26]' : ''}`} />
          </button>

          <button
            onClick={handleAdd}
            className="px-3 py-1.5 bg-[#121212] hover:bg-[#f27d26] text-white text-[11px] font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{isAr ? 'أضف للسلة' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
