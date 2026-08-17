import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  ChevronDown, 
  LogIn, 
  UserPlus, 
  Package, 
  Heart, 
  SlidersHorizontal, 
  Settings, 
  LogOut, 
  Store,
  ShieldAlert
} from 'lucide-react';
import { HeaderSettings } from '../types';
import { THEME_MAP } from '../utils/theme';

interface AccountDropdownProps {
  settings: HeaderSettings;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenVendorModal: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({
  settings,
  isLoggedIn,
  onToggleLogin,
  onOpenVendorModal
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-30">
      <button
        id="user-account-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200/80 relative">
          <User className="w-5 h-5" />
          {isLoggedIn && (
            <span className="absolute -top-1 -end-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
          )}
        </div>
        <div className="hidden xl:flex flex-col text-start">
          <span className="text-[10px] text-slate-400 font-medium">
            {isLoggedIn ? (isAr ? 'مرحباً،' : 'Hello,') : (isAr ? 'تسجيل الدخول' : 'Sign In')}
          </span>
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
            <span>{isLoggedIn ? (isAr ? 'أحمد الشمري' : 'Ahmed S.') : (isAr ? 'حسابي' : 'My Account')}</span>
            <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </button>

      {/* Popover */}
      {isOpen && (
        <div 
          className="absolute top-full end-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-[100] animate-fadeIn"
        >
          {isLoggedIn ? (
            <div>
              {/* User Profile Card */}
              <div className="px-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                    {isAr ? 'أ' : 'A'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {isAr ? 'أحمد الشمري' : 'Ahmed Al-Shammari'}
                    </h4>
                    <p className="text-[11px] text-slate-400">customer@amerce.com</p>
                  </div>
                </div>
                <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                  🌟 {isAr ? 'عضو ذهبي VIP' : 'VIP Gold Member'}
                </span>
              </div>

              {/* Links */}
              <div className="py-2 text-xs">
                <a href="#orders" className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium">
                  <Package className="w-4 h-4 text-slate-400" />
                  <span>{isAr ? 'طلباتي السابقة والنشطة' : 'My Orders & Tracking'}</span>
                </a>
                <a href="#wishlist" className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium">
                  <Heart className="w-4 h-4 text-slate-400" />
                  <span>{isAr ? 'قائمة الرغبات والمفضلة' : 'My Wishlist'}</span>
                </a>
                <a href="#settings" className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium">
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>{isAr ? 'إعدادات الحساب والعناوين' : 'Account Settings'}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 px-2">
                <button
                  onClick={() => {
                    onToggleLogin();
                    setIsOpen(false);
                  }}
                  className="w-full text-start flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3">
              <div className="text-center pb-3 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900">
                  {isAr ? 'مرحباً بك في Amerce' : 'Welcome to Amerce'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isAr ? 'سجل دخولك لمتابعة طلباتك والاستفادة من العروض' : 'Sign in to access your orders and discounts'}
                </p>
                <button
                  onClick={() => {
                    onToggleLogin();
                    setIsOpen(false);
                  }}
                  className={`mt-3 w-full py-2 rounded-xl text-xs font-bold text-white shadow-sm cursor-pointer ${theme.primary} ${theme.primaryHover}`}
                >
                  {isAr ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <div className="mt-2 text-[11px] text-slate-500">
                  {isAr ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
                  <button 
                    onClick={() => {
                      onToggleLogin();
                      setIsOpen(false);
                    }}
                    className="font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    {isAr ? 'إنشاء حساب جديد' : 'Register'}
                  </button>
                </div>
              </div>

              {/* Vendor quick link */}
              <div className="pt-3">
                <button
                  onClick={() => {
                    onOpenVendorModal();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 bg-amber-50 hover:bg-amber-100/70 rounded-xl text-amber-900 text-xs font-semibold transition-colors cursor-pointer border border-amber-200/60"
                >
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-600" />
                    <span>{isAr ? 'لوحة تحكم البائعين' : 'Vendor Dashboard'}</span>
                  </div>
                  <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded font-bold">
                    PORTAL
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
