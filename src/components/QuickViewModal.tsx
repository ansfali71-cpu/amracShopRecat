import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Eye, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Sparkles
} from 'lucide-react';
import { Product, ProductColor, HeaderSettings } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string, quantity?: number) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted: boolean;
  currency: string;
  settings: HeaderSettings;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted,
  currency,
  settings
}) => {
  const isAr = settings.language === 'ar';
  
  // Active Color state
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors && product.colors.length > 0 
      ? product.colors[0] 
      : { id: 'default', nameAr: 'افتراضي', nameEn: 'Default', hex: '#121212' }
  );

  // Active Size state
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );

  // Active Gallery Image
  const [activeImage, setActiveImage] = useState<string>(
    selectedColor?.image || product?.image || ''
  );

  // Quantity state
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset states when opening a new product
      if (product) {
        setQuantity(1);
        setIsAddedSuccess(false);
        const color = product.colors && product.colors.length > 0 ? product.colors[0] : { id: 'default', nameAr: 'افتراضي', nameEn: 'Default', hex: '#121212' };
        setSelectedColor(color);
        setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard');
        setActiveImage(color.image || product.image || '');
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, product]);

  // Sync image when color changes
  useEffect(() => {
    if (selectedColor?.image) {
      setActiveImage(selectedColor.image);
    } else if (product?.image) {
      setActiveImage(product.image);
    }
  }, [selectedColor, product]);

  if (!isOpen || !product) return null;

  const priceDisplay = currency === 'SAR' 
    ? `${(product.price * 3.75).toFixed(0)} ر.س` 
    : `$${product.price.toFixed(2)}`;
  
  const oldPriceDisplay = product.oldPrice 
    ? (currency === 'SAR' ? `${(product.oldPrice * 3.75).toFixed(0)} ر.س` : `$${product.oldPrice.toFixed(2)}`)
    : null;

  const galleryList = product.galleryImages && product.galleryImages.length > 0
    ? [product.image, ...product.galleryImages]
    : [product.image];

  const handleAddAndClose = () => {
    onAddToCart(product, isAr ? selectedColor.nameAr : selectedColor.nameEn, selectedSize, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 900);
  };

  const modalMarkup = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/65 backdrop-blur-xs animate-fadeIn font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[92vh] overflow-y-auto z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 end-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-black hover:text-white text-stone-700 shadow-md flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Gallery & Visuals */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 bg-stone-50/70 flex flex-col justify-between border-b md:border-b-0 md:border-e border-gray-100">
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-2xs group">
            <img
              src={activeImage}
              alt={isAr ? product.nameAr : product.nameEn}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className={`absolute top-3 start-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${
                product.badge.type === 'hot' ? 'bg-[#f27d26] text-white' : 'bg-[#121212] text-white'
              }`}>
                {isAr ? product.badge.textAr : product.badge.textEn}
              </span>
            )}
            
            {/* Live Viewers Floating Badge */}
            <div className="absolute bottom-3 start-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Eye className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>{isAr ? `${product.viewersCount || 24} شخص يشاهدون الآن` : `${product.viewersCount || 24} viewing now`}</span>
            </div>
          </div>

          {/* Thumbnails row */}
          {galleryList.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {galleryList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImage === imgUrl ? 'border-[#f27d26] ring-2 ring-[#f27d26]/20' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details, Color & Size Pickers */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 sm:ps-8 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Department & Stock */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#f27d26] bg-[#f27d26]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {isAr ? product.categoryAr : product.categoryEn}
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? `متوفر (${product.stockLeft || 5} قطع متبقية)` : `In Stock (${product.stockLeft || 5} left)`}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-[#121212] leading-snug">
              {isAr ? product.nameAr : product.nameEn}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-800">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewsCount} {isAr ? 'تقييم موثق' : 'verified reviews'})</span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-xl sm:text-2xl font-black text-[#121212] font-sans">
                {priceDisplay}
              </span>
              {oldPriceDisplay && (
                <span className="text-xs sm:text-sm text-stone-400 line-through">
                  {oldPriceDisplay}
                </span>
              )}
              {product.oldPrice && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md ms-auto">
                  {isAr ? 'وفر 25%' : 'Save 25%'}
                </span>
              )}
            </div>

            {/* 1. COLOR SELECTION SECTION */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700">
                    {isAr ? 'اللون المختار:' : 'Select Color:'}
                  </span>
                  <span className="font-bold text-[#f27d26]">
                    {isAr ? selectedColor.nameAr : selectedColor.nameEn}
                  </span>
                </div>
                
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => {
                    const cHex = c.hex || '#121212';
                    const selectedHex = selectedColor?.hex || '#121212';
                    const isSelected = selectedHex.toLowerCase() === cHex.toLowerCase();
                    return (
                      <button
                        key={c.id || cHex}
                        onClick={() => setSelectedColor(c)}
                        className={`group flex items-center gap-1.5 p-1 pe-2.5 rounded-full border transition-all cursor-pointer ${
                          isSelected 
                            ? 'border-[#f27d26] ring-2 ring-[#f27d26]/20 bg-stone-50 font-bold' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span 
                          className="w-4.5 h-4.5 rounded-full border border-black/15 shadow-2xs"
                          style={{ backgroundColor: cHex }}
                        />
                        <span className="text-[11px] text-stone-700 font-medium">
                          {isAr ? c.nameAr : c.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. SIZE SELECTION SECTION */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-700">
                    {isAr ? 'المقاس المتاح:' : 'Select Size:'}
                  </span>
                  <button className="text-[11px] text-[#f27d26] hover:underline font-semibold cursor-pointer">
                    {isAr ? 'دليل المقاسات' : 'Size Guide'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-[#121212] text-white border-[#121212] shadow-xs'
                          : 'bg-white text-stone-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. QUANTITY & ACTIONS */}
            <div className="pt-2 border-t border-gray-100 flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-gray-200 rounded-xl bg-stone-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 font-bold hover:bg-stone-100 cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-stone-700 font-bold hover:bg-stone-100 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Primary Button */}
              <button
                onClick={handleAddAndClose}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  isAddedSuccess 
                    ? 'bg-emerald-600 scale-[1.02]' 
                    : 'bg-[#f27d26] hover:bg-[#df6b15]'
                }`}
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isAr ? 'تمت الإضافة بنجاح!' : 'Added Successfully!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{isAr ? 'إضافة إلى سلة التسوق' : 'Add to Shopping Bag'}</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onAddToWishlist(product)}
                className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted ? 'bg-red-50 text-[#f27d26] border-[#f27d26]/40' : 'bg-stone-50 text-stone-700 border-gray-200 hover:bg-stone-100'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#f27d26] text-[#f27d26]' : ''}`} />
              </button>
            </div>

            {/* Guarantees Bar */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-stone-600 font-medium border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#f27d26]" />
                <span>{isAr ? 'شحن سريع وباب المنزل' : 'Doorstep Fast Shipping'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isAr ? 'إرجاع مجاني خلال 14 يوم' : '14-Day Free Returns'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalMarkup, document.body) : modalMarkup;
};
