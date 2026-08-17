export type HeaderStyleId = 'classic-prime' | 'sleek-tech' | 'luxury-fashion' | 'grocery-express' | 'compact-market';

export type ColorTheme = 'emerald' | 'blue' | 'slate' | 'orange' | 'purple';

export type Language = 'ar' | 'en';

export interface ProductColor {
  id: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  image?: string;
  borderHex?: string;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages?: string[];
  colors?: ProductColor[];
  sizes?: string[];
  viewersCount?: number;
  stockLeft?: number;
  badge?: {
    textAr: string;
    textEn: string;
    type: 'sale' | 'hot' | 'new' | 'popular';
  };
  inStock: boolean;
  vendor: string;
}

export interface CategoryItem {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  badge?: string;
  itemCount: number;
  subcategories?: {
    nameAr: string;
    nameEn: string;
    link: string;
    items?: { nameAr: string; nameEn: string; link: string }[];
  }[];
  featuredPromo?: {
    titleAr: string;
    titleEn: string;
    discountTextAr: string;
    discountTextEn: string;
    image: string;
    linkTextAr: string;
    linkTextEn: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface HeaderSettings {
  style: HeaderStyleId;
  colorTheme: ColorTheme;
  language: Language;
  isSticky: boolean;
  showTopBar: boolean;
  showCategoryDrawer: boolean;
  showDeliveryPicker: boolean;
  storeName: string;
  taglineAr: string;
  taglineEn: string;
  headerShadow: 'none' | 'subtle' | 'soft' | 'border-only';
  compactMode: boolean;
}

export interface HeaderVariantProps {
  settings: HeaderSettings;
  onUpdateSettings: (newSettings: Partial<HeaderSettings>) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  compareCount: number;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenVendorModal: () => void;
  onOpenTrackOrder: () => void;
  onSelectProduct: (p: Product) => void;
  onOpenCategory: (cat: CategoryItem) => void;
  activeCategoryFilter?: string;
  onSelectCategoryFilter?: (catId: string) => void;
  isScrolled?: boolean;
  isScrollingDown?: boolean;
}


