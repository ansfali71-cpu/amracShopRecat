import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Home, 
  Grid, 
  Heart, 
  ShoppingBag,
  User,
  LogIn,
  Package,
  Settings,
  LogOut,
  Store,
  X
} from 'lucide-react';
import { HeaderSettings } from '../types';
import { THEME_MAP } from '../utils/theme';

interface MobileBottomNavProps {
  settings: HeaderSettings;
  cartCount: number;
  wishlistCount: number;
  isLoggedIn?: boolean;
  onOpenCategories: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onToggleLogin?: () => void;
  onOpenVendorModal?: () => void;
  isScrollingDown?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  settings,
  cartCount,
  wishlistCount,
  isLoggedIn = false,
  onOpenCategories,
  onOpenWishlist,
  onOpenCart,
  onToggleLogin,
  onOpenVendorModal,
  isScrollingDown = false
}) => {
  const [isAccountSheetOpen, setIsAccountSheetOpen] = useState(false);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Sticky Mobile Bottom Navigation Bar */}
      <nav 
        id="mobile-bottom-app-bar"
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 py-1.5 px-2 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] select-none transition-transform duration-300 ${
          isScrollingDown ? 'translate-y-full' : 'translate-y-0'
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between max-w-lg mx-auto">
          
          {/* 1. Home (الرئيسية) */}
          <button
            onClick={handleHomeClick}
            className="flex flex-col items-center justify-center text-stone-700 hover:text-[#f27d26] transition-colors py-1 px-2 flex-1 min-h-[48px] cursor-pointer group"
          >
            <div className="relative p-1 rounded-xl group-active:scale-95 transition-transform">
              <Home className="w-5 h-5 stroke-[2] text-stone-800 group-hover:text-[#f27d26]" />
            </div>
            <span className="text-[11px] font-extrabold tracking-tight text-stone-800 group-hover:text-[#f27d26]">
              {isAr ? 'الرئيسية' : 'Home'}
            </span>
          </button>

          {/* 2. Categories (الأقسام) */}
          <button
            onClick={onOpenCategories}
            className="flex flex-col items-center justify-center text-stone-700 hover:text-[#f27d26] transition-colors py-1 px-2 flex-1 min-h-[48px] cursor-pointer group"
          >
            <div className="relative p-1 rounded-xl group-active:scale-95 transition-transform">
              <Grid className="w-5 h-5 stroke-[2] text-stone-800 group-hover:text-[#f27d26]" />
            </div>
            <span className="text-[11px] font-extrabold tracking-tight text-stone-800 group-hover:text-[#f27d26]">
              {isAr ? 'الأقسام' : 'Categories'}
            </span>
          </button>

          {/* 3. Wishlist (المفضلة) */}
          <button
            onClick={onOpenWishlist}
            className="relative flex flex-col items-center justify-center text-stone-700 hover:text-[#f27d26] transition-colors py-1 px-2 flex-1 min-h-[48px] cursor-pointer group"
          >
            <div className="relative p-1 rounded-xl group-active:scale-95 transition-transform">
              <Heart className="w-5 h-5 stroke-[2] text-stone-800 group-hover:text-[#f27d26]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -end-1 w-4 h-4 bg-[#f27d26] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-extrabold tracking-tight text-stone-800 group-hover:text-[#f27d26]">
              {isAr ? 'المفضلة' : 'Wishlist'}
            </span>
          </button>

          {/* 4. Cart / Bag (السلة) */}
          <button
            onClick={onOpenCart}
            className="relative flex flex-col items-center justify-center text-stone-900 hover:text-[#f27d26] transition-colors py-1 px-2 flex-1 min-h-[48px] cursor-pointer group"
          >
            <div className="relative p-1 rounded-xl group-active:scale-95 transition-transform">
              <ShoppingBag className="w-5 h-5 stroke-[2] text-stone-900 group-hover:text-[#f27d26]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -end-1 min-w-[18px] h-[18px] px-1 bg-[#1a1a1a] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-extrabold tracking-tight text-stone-900 group-hover:text-[#f27d26]">
              {isAr ? 'السلة' : 'Cart'}
            </span>
          </button>

          {/* 5. Account (الحساب) */}
          <button
            onClick={() => setIsAccountSheetOpen(true)}
            className="relative flex flex-col items-center justify-center text-stone-700 hover:text-[#f27d26] transition-colors py-1 px-2 flex-1 min-h-[48px] cursor-pointer group"
          >
            <div className="relative p-1 rounded-xl group-active:scale-95 transition-transform">
              <User className="w-5 h-5 stroke-[2] text-stone-800 group-hover:text-[#f27d26]" />
              {isLoggedIn && (
                <span className="absolute top-0.5 end-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <span className="text-[11px] font-extrabold tracking-tight text-stone-800 group-hover:text-[#f27d26]">
              {isAr ? 'حسابي' : 'Account'}
            </span>
          </button>

        </div>
      </nav>

      {/* 2. Mobile Account Quick Sheet / Drawer */}
      {isAccountSheetOpen && typeof document !== 'undefined' && createPortal(
        <div className="md:hidden fixed inset-0 z-[9999] h-screen h-[100dvh] w-screen flex flex-col justify-end bg-black/65 backdrop-blur-xs animate-fadeIn" dir={isAr ? 'rtl' : 'ltr'}>
          {/* Backdrop Click */}
          <div 
            className="flex-1 w-full"
            onClick={() => setIsAccountSheetOpen(false)}
          />

          {/* Sheet Body */}
          <div className="bg-white rounded-t-3xl p-4 sm:p-6 shadow-2xl border-t border-gray-200 animate-slideUp max-h-[88dvh] flex flex-col min-h-0 overflow-hidden z-[10000]">
            {/* Header / Close */}
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-[#f27d26] flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">
                    {isAr ? 'الملف الشخصي والحساب' : 'My Account & Profile'}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {isLoggedIn ? (isAr ? 'أهلاً بك، أحمد الشمري' : 'Welcome back, Ahmed') : (isAr ? 'تسجيل الدخول ومتابعة الطلبات' : 'Sign in to access your orders')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAccountSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="py-3.5 space-y-4 flex-1 min-h-0 overflow-y-auto overscroll-contain">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">{isAr ? 'أحمد الشمري' : 'Ahmed Al-Shammari'}</span>
                      <span className="text-[11px] text-emerald-700">customer@amerce.com</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md">
                      VIP
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    <button
                      onClick={() => {
                        setIsAccountSheetOpen(false);
                        onOpenWishlist();
                      }}
                      className="w-full flex items-center justify-between py-3 text-start text-xs font-bold text-stone-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <Heart className="w-4 h-4 text-stone-500" />
                        <span>{isAr ? 'قائمة الرغبات والمفضلة' : 'My Wishlist'}</span>
                      </div>
                      <span className="text-stone-400 font-mono text-xs">{wishlistCount}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountSheetOpen(false);
                        onOpenCart();
                      }}
                      className="w-full flex items-center justify-between py-3 text-start text-xs font-bold text-stone-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShoppingBag className="w-4 h-4 text-stone-500" />
                        <span>{isAr ? 'سلة المشتريات النشطة' : 'Active Cart'}</span>
                      </div>
                      <span className="text-stone-400 font-mono text-xs">{cartCount}</span>
                    </button>

                    {onOpenVendorModal && (
                      <button
                        onClick={() => {
                          setIsAccountSheetOpen(false);
                          onOpenVendorModal();
                        }}
                        className="w-full flex items-center justify-between py-3 text-start text-xs font-bold text-amber-700"
                      >
                        <div className="flex items-center gap-2.5">
                          <Store className="w-4 h-4 text-amber-600" />
                          <span>{isAr ? 'بوابة التجار والموردين' : 'Vendor Portal'}</span>
                        </div>
                      </button>
                    )}
                  </div>

                  {onToggleLogin && (
                    <button
                      onClick={() => {
                        onToggleLogin();
                        setIsAccountSheetOpen(false);
                      }}
                      className="w-full mt-2 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-stone-600">
                    {isAr 
                      ? 'سجل دخولك الآن لتتمكن من حفظ المنتجات المفضلة وتتبع مشترياتك والاستفادة من خصومات الشحن.' 
                      : 'Sign in to access your orders, track shipments, and unlock member discounts.'}
                  </p>

                  {onToggleLogin && (
                    <button
                      onClick={() => {
                        onToggleLogin();
                        setIsAccountSheetOpen(false);
                      }}
                      className="w-full py-3.5 bg-[#1a1a1a] hover:bg-[#f27d26] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>{isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}</span>
                    </button>
                  )}

                  {onOpenVendorModal && (
                    <button
                      onClick={() => {
                        setIsAccountSheetOpen(false);
                        onOpenVendorModal();
                      }}
                      className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Store className="w-4 h-4 text-stone-600" />
                      <span>{isAr ? 'لوحة تحكم البائعين (Vendor Hub)' : 'Vendor Hub'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
};
