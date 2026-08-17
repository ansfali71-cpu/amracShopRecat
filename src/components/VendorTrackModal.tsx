import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Store, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Search
} from 'lucide-react';
import { HeaderSettings } from '../types';
import { THEME_MAP } from '../utils/theme';

interface VendorTrackModalProps {
  type: 'vendor' | 'track' | null;
  onClose: () => void;
  settings: HeaderSettings;
}

export const VendorTrackModal: React.FC<VendorTrackModalProps> = ({
  type,
  onClose,
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

  const [trackingNumber, setTrackingNumber] = useState('AMC-8492049');
  const [trackResult, setTrackResult] = useState(false);
  const [vendorSubmitted, setVendorSubmitted] = useState(false);

  const isAr = settings.language === 'ar';
  const theme = THEME_MAP[settings.colorTheme];

  const modalMarkup = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn font-sans" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 z-[10000]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${type === 'vendor' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
              {type === 'vendor' ? <Store className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold">
                {type === 'vendor' 
                  ? (isAr ? 'انضم كبائع في ماركت بليس Amerce' : 'Join as an Amerce Vendor') 
                  : (isAr ? 'تتبع شحنتك وحالة الطلب' : 'Track Your Shipment')}
              </h3>
              <p className="text-xs text-slate-500">
                {type === 'vendor' 
                  ? (isAr ? 'ابدأ البيع لأكثر من 2 مليون عميل فورا' : 'Reach 2M+ active shoppers with 0% setup fee') 
                  : (isAr ? 'أدخل رقم الشحنة للاطلاع على خط السير' : 'Enter tracking ID to see live logistics status')}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {type === 'vendor' ? (
            vendorSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {isAr ? 'تم استلام طلب الانضمام بنجاح!' : 'Application Submitted Successfully!'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {isAr ? 'سيتواصل معك فريق توثيق المتاجر خلال 24 ساعة لتفعيل متجرك ولوحة التحكم.' : 'Our merchant team will review and approve your store dashboard within 24 hours.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isAr ? 'تم' : 'Done'}
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setVendorSubmitted(true); }} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{isAr ? 'اسم المتجر / البراند' : 'Store / Brand Name'}</label>
                    <input type="text" required defaultValue="TechZone Store" className="w-full border border-slate-300 rounded-lg p-2 text-xs" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{isAr ? 'البريد الإلكتروني التجاري' : 'Business Email'}</label>
                    <input type="email" required defaultValue="store@techzone.com" className="w-full border border-slate-300 rounded-lg p-2 text-xs" />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{isAr ? 'القسم التجاري الرئيسي' : 'Primary Category'}</label>
                  <select className="w-full border border-slate-300 rounded-lg p-2 text-xs">
                    <option>{isAr ? 'الإلكترونيات والتقنية' : 'Electronics & Tech'}</option>
                    <option>{isAr ? 'الأزياء والموضة' : 'Fashion & Apparel'}</option>
                    <option>{isAr ? 'المنزل والديكور' : 'Home & Living'}</option>
                  </select>
                </div>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{isAr ? 'عرض خاص: عمولة 0% على أول 100 عملية بيع عند التسجيل اليوم.' : 'Special promo: 0% sales commission on first 100 sales.'}</span>
                </div>
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-white font-bold text-xs cursor-pointer shadow-md ${theme.primary} ${theme.primaryHover}`}
                >
                  {isAr ? 'إرسال طلب الانضمام كتاجر' : 'Submit Merchant Application'}
                </button>
              </form>
            )
          ) : (
            <div className="space-y-4 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. AMC-8492049"
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                />
                <button
                  onClick={() => setTrackResult(true)}
                  className={`px-4 py-2 text-white font-bold rounded-xl cursor-pointer ${theme.primary}`}
                >
                  {isAr ? 'تتبع' : 'Track'}
                </button>
              </div>

              {trackResult && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-900">{isAr ? 'الشحنة قيد التوصيل الآن' : 'Out for Delivery'}</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {isAr ? 'متوقع اليوم 4:30 م' : 'Expected Today 4:30 PM'}
                    </span>
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{isAr ? 'تم استلام الشحنة من مستودعات Amerce الرياض' : 'Package sorted at Amerce Fulfillment Hub'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>{isAr ? 'مع مندوب التوصيل السريع' : 'Handed over to courier driver'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalMarkup, document.body) : modalMarkup;
};
