import React, { useState, useEffect } from 'react';
import { 
  HeaderSettings, 
  Product, 
  CategoryItem, 
  CartItem, 
  HeaderStyleId 
} from './types';
import { SAMPLE_PRODUCTS, CATEGORIES } from './data/mockData';
import { HeaderClassicPrime } from './components/HeaderVariants/HeaderClassicPrime';
import { HeaderSleekTech } from './components/HeaderVariants/HeaderSleekTech';
import { HeaderLuxuryFashion } from './components/HeaderVariants/HeaderLuxuryFashion';
import { HeaderGroceryExpress } from './components/HeaderVariants/HeaderGroceryExpress';
import { HeaderCompactMarket } from './components/HeaderVariants/HeaderCompactMarket';
import { MiniCartDrawer } from './components/MiniCartDrawer';
import { WishlistCompareModal } from './components/WishlistCompareModal';
import { VendorTrackModal } from './components/VendorTrackModal';
import { StorePreviewBody } from './components/StorePreviewBody';
import { MobileBottomNav } from './components/MobileBottomNav';

const DEFAULT_SETTINGS: HeaderSettings = {
  style: 'compact-market',
  colorTheme: 'emerald',
  language: 'ar',
  isSticky: true,
  showTopBar: true,
  showCategoryDrawer: true,
  showDeliveryPicker: true,
  storeName: 'تاج لاين',
  taglineAr: 'المتجر الإلكتروني الشامل',
  taglineEn: 'Multi-Vendor Marketplace',
  headerShadow: 'subtle',
  compactMode: false
};

export default function App() {
  const [settings, setSettings] = useState<HeaderSettings>(DEFAULT_SETTINGS);
  const [currency, setCurrency] = useState<string>('SAR');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Cart State with initial sample items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: SAMPLE_PRODUCTS[0], quantity: 1 },
    { product: SAMPLE_PRODUCTS[2], quantity: 1 }
  ]);

  // Wishlist & Compare States
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([
    SAMPLE_PRODUCTS[1],
    SAMPLE_PRODUCTS[4]
  ]);
  const [compareProducts, setCompareProducts] = useState<Product[]>([
    SAMPLE_PRODUCTS[0],
    SAMPLE_PRODUCTS[3]
  ]);

  // Modal Visibility States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistCompareModalType, setWishlistCompareModalType] = useState<'wishlist' | 'compare' | null>(null);
  const [vendorTrackModalType, setVendorTrackModalType] = useState<'vendor' | 'track' | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  const lastScrollYRef = React.useRef(0);

  // Scroll listener for sticky morphing header & scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Hide mobile bottom nav when scrolling down past a threshold
      if (scrollY > lastScrollYRef.current && scrollY > 100) {
        setIsScrollingDown(true);
      } else if (scrollY < lastScrollYRef.current) {
        setIsScrollingDown(false);
      }
      lastScrollYRef.current = scrollY;

      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update HTML tag direction on language change
  useEffect(() => {
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = settings.language;
  }, [settings.language]);

  const handleUpdateSettings = (newPartial: Partial<HeaderSettings>) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  };

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Compare Actions
  const handleToggleCompare = (product: Product) => {
    setCompareProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const renderHeader = () => {
    const commonProps = {
      settings,
      onUpdateSettings: handleUpdateSettings,
      currency,
      onCurrencyChange: setCurrency,
      cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      cartSubtotal,
      wishlistCount: wishlistProducts.length,
      compareCount: compareProducts.length,
      isLoggedIn,
      isScrolled,
      onToggleLogin: () => setIsLoggedIn(!isLoggedIn),
      onOpenCart: () => setIsCartOpen(true),
      onOpenWishlist: () => setWishlistCompareModalType('wishlist'),
      onOpenCompare: () => setWishlistCompareModalType('compare'),
      onOpenVendorModal: () => setVendorTrackModalType('vendor'),
      onOpenTrackOrder: () => setVendorTrackModalType('track'),
      onSelectProduct: handleAddToCart,
      onOpenCategory: (cat: CategoryItem) => {
        setActiveCategoryFilter(cat.id);
        const target = document.getElementById('featured-products-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      activeCategoryFilter,
      onSelectCategoryFilter: (catId: string) => {
        setActiveCategoryFilter(catId);
        const target = document.getElementById('featured-products-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      isScrollingDown
    };

    switch (settings.style) {
      case 'sleek-tech':
        return <HeaderSleekTech {...commonProps} />;
      case 'luxury-fashion':
        return <HeaderLuxuryFashion {...commonProps} />;
      case 'grocery-express':
        return <HeaderGroceryExpress {...commonProps} />;
      case 'compact-market':
        return <HeaderCompactMarket {...commonProps} />;
      case 'classic-prime':
      default:
        return <HeaderClassicPrime {...commonProps} />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white"
      dir={settings.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="fixed top-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#f27d26] via-amber-400 to-[#f27d26] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Top Floating / Sticky Header Container */}
      <div className={settings.isSticky ? 'sticky top-0 z-40 transition-shadow shadow-md' : 'relative z-20'}>
        {renderHeader()}
      </div>

      {/* Main E-Commerce Simulated Backdrop */}
      <div className="flex-1">
        <StorePreviewBody
          settings={settings}
          currency={currency}
          activeCategoryFilter={activeCategoryFilter}
          onSelectCategoryFilter={setActiveCategoryFilter}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleToggleWishlist}
          onAddToCompare={handleToggleCompare}
          wishlistIds={wishlistProducts.map((p) => p.id)}
          compareIds={compareProducts.map((p) => p.id)}
          isScrolled={isScrolled}
        />
      </div>

      {/* Slide-Over Mini Cart Drawer */}
      <MiniCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        settings={settings}
        onCheckout={() => {
          alert(
            settings.language === 'ar'
              ? 'تم التوجيه لصفحة الدفع الآمن بنجاح!'
              : 'Redirecting to secure checkout page!'
          );
          setIsCartOpen(false);
        }}
      />

      {/* Wishlist & Compare Modals */}
      <WishlistCompareModal
        type={wishlistCompareModalType}
        onClose={() => setWishlistCompareModalType(null)}
        products={wishlistCompareModalType === 'wishlist' ? wishlistProducts : compareProducts}
        onRemove={(id) => {
          if (wishlistCompareModalType === 'wishlist') {
            setWishlistProducts((prev) => prev.filter((p) => p.id !== id));
          } else {
            setCompareProducts((prev) => prev.filter((p) => p.id !== id));
          }
        }}
        onAddToCart={handleAddToCart}
        currency={currency}
        settings={settings}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        settings={settings}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistProducts.length}
        isLoggedIn={isLoggedIn}
        onOpenCategories={() => {
          // Trigger the active header's drawer
          const drawerBtn = (
            document.getElementById('mobile-hamburger-btn') ||
            document.querySelector('button[aria-label*="menu" i]') ||
            document.querySelector('button[aria-label*="Menu" i]')
          ) as HTMLButtonElement | null;
          if (drawerBtn) {
            drawerBtn.click();
          }
        }}
        onOpenWishlist={() => setWishlistCompareModalType('wishlist')}
        onOpenCart={() => setIsCartOpen(true)}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
        onOpenVendorModal={() => setVendorTrackModalType('vendor')}
        isScrollingDown={isScrollingDown}
      />

      {/* Vendor & Order Tracking Modal */}
      <VendorTrackModal
        type={vendorTrackModalType}
        onClose={() => setVendorTrackModalType(null)}
        settings={settings}
      />
    </div>
  );
}
