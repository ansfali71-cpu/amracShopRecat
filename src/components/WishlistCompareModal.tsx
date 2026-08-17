import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  Heart, 
  Scale, 
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Product, HeaderSettings } from '../types';
import { THEME_MAP } from '../utils/theme';

interface WishlistCompareModalProps {
  type: 'wishlist' | 'compare' | null;
  onClose: () => void;
  products: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
  currency: string;
  settings: HeaderSettings;
}

export const WishlistCompareModal: React.FC<WishlistCompareModalProps> = ({
  type,
  onClose,
  products,
  onRemove,
  onAddToCart,
  currency,
  settings
}) => {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [type]);

  if (!type) return null;

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];
  const isWishlist = type === 'wishlist';

  const modalMarkup = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] z-[10000]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isWishlist ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              {isWishlist ? <Heart className="w-5 h-5 fill-red-500 text-red-500" /> : <Scale className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isWishlist 
                  ? (isAr ? 'قائمة المنتجات المفضلة (Wishlist)' : 'My Wishlist') 
                  : (isAr ? 'مقارنة المنتجات والخصائص (Compare)' : 'Product Comparison')}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr 
                  ? `لديك ${products.length} عناصر محفوظة` 
                  : `You have ${products.length} saved items`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <p className="text-sm font-semibold">
                {isAr ? 'لا توجد عناصر في هذه القائمة حالياً' : 'No items found in this list'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((prod) => (
                <div 
                  key={prod.id} 
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between bg-white"
                >
                  <div className="flex gap-3">
                    <img 
                      src={prod.image} 
                      alt={isAr ? prod.nameAr : prod.nameEn}
                      className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-medium text-slate-400 block truncate">
                        {isAr ? prod.categoryAr : prod.categoryEn}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">
                        {isAr ? prod.nameAr : prod.nameEn}
                      </h4>
                      <div className="text-sm font-extrabold text-slate-900 mt-1">
                        {currency === 'SAR' ? `${(prod.price * 3.75).toFixed(0)} ر.س` : `$${prod.price.toFixed(2)}`}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => {
                        onAddToCart(prod);
                        onClose();
                      }}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${theme.primary} ${theme.primaryHover}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isAr ? 'أضف للسلة' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={() => onRemove(prod.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalMarkup, document.body) : modalMarkup;
};
