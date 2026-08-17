import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  Sparkles
} from 'lucide-react';
import { CartItem, HeaderSettings } from '../types';
import { THEME_MAP } from '../utils/theme';

interface MiniCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  currency: string;
  settings: HeaderSettings;
  onCheckout: () => void;
}

export const MiniCartDrawer: React.FC<MiniCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  settings,
  onCheckout
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200; // in USD base
  const formattedSubtotal = currency === 'SAR' ? (subtotal * 3.75).toFixed(2) + ' ر.س' : `$${subtotal.toFixed(2)}`;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const formattedRemaining = currency === 'SAR' 
    ? (remainingForFreeShipping * 3.75).toFixed(2) + ' ر.س' 
    : `$${remainingForFreeShipping.toFixed(2)}`;

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen overflow-hidden animate-fadeIn font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" 
      />

      <div className={`fixed top-0 bottom-0 ${isAr ? 'start-0' : 'end-0'} w-[88vw] max-w-md h-full h-[100dvh] max-h-[100dvh] flex flex-col z-[10000] bg-white shadow-2xl overflow-hidden`}>
        <div className="w-full h-full flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${theme.primaryLight}`}>
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isAr ? 'سلة التسوق الخاصة بك' : 'Your Shopping Cart'}
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  {isAr ? `${items.length} منتجات في السلة` : `${items.length} items in cart`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-emerald-50 border-b border-emerald-100 p-3.5 px-4 sm:px-5 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 mb-1.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              {remainingForFreeShipping === 0 ? (
                <span>🎉 {isAr ? 'تهانينا! لقد حصلت على شحن مجاني لطلبك' : 'Congratulations! You unlocked FREE shipping!'}</span>
              ) : (
                <span>
                  {isAr 
                    ? `أضف بقيمة ${formattedRemaining} إضافية للحصول على شحن مجاني!` 
                    : `Add ${formattedRemaining} more to qualify for FREE shipping!`}
                </span>
              )}
            </div>
            <div className="w-full bg-emerald-200/70 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">
                  {isAr ? 'سلة التسوق فارغة حالياً' : 'Your cart is currently empty'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  {isAr ? 'استكشف عروض ومنتجات Amerce وأضف عناصرك المفضلة هنا!' : 'Explore Amerce collections and add items to your cart!'}
                </p>
                <button
                  onClick={onClose}
                  className={`mt-4 px-5 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer ${theme.primary} ${theme.primaryHover}`}
                >
                  {isAr ? 'ابدأ التسوق الآن' : 'Start Shopping Now'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                  <img 
                    src={item.product.image} 
                    alt={isAr ? item.product.nameAr : item.product.nameEn}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                        {isAr ? item.product.nameAr : item.product.nameEn}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        title={isAr ? 'حذف' : 'Remove'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {isAr ? item.product.categoryAr : item.product.categoryEn}
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer hover:bg-slate-200 rounded-s-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer hover:bg-slate-200 rounded-e-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-xs font-extrabold text-slate-900">
                        {currency === 'SAR' 
                          ? `${(item.product.price * item.quantity * 3.75).toFixed(2)} ر.س` 
                          : `$${(item.product.price * item.quantity).toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action (Fixed at bottom) */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/90 space-y-2.5 shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="text-base font-extrabold text-slate-900">{formattedSubtotal}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{isAr ? 'الضرائب والشحن' : 'Taxes & Shipping'}</span>
                <span className="font-semibold text-emerald-600">
                  {remainingForFreeShipping === 0 ? (isAr ? 'شحن مجاني' : 'FREE') : (isAr ? 'يتم حسابها عند الدفع' : 'Calculated at checkout')}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onCheckout}
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} ${theme.primaryHover}`}
                >
                  <span>{isAr ? 'متابعة الدفع الآمن' : 'Proceed to Checkout'}</span>
                  <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isAr ? 'دفع آمن 100% مع تشفير SSL معتمد' : '100% Guaranteed Safe & Secure Checkout'}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(drawerContent, document.body) : drawerContent;
};
