import { CategoryItem, Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p-makhawar-1',
    nameAr: 'مخور إماراتي حرير طبيعي مطرز بخيوط الذهب وفصوص الكريستال الفاخرة',
    nameEn: 'Royal Gulf Silk Makhawar Hand-Embroidered with Gold Threads & Crystals',
    categoryAr: 'فساتين، جلابيات ومخاور نسائي',
    categoryEn: 'Dresses, Jalabiyas & Makhawir',
    price: 185.00,
    oldPrice: 240.00,
    rating: 5.0,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=85'
    ],
    colors: [
      { id: 'emerald', nameAr: 'أخضر زمردي ملكي', nameEn: 'Royal Emerald', hex: '#047857', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=85' },
      { id: 'maroon', nameAr: 'عنابي خمري فاخر', nameEn: 'Royal Maroon', hex: '#881337', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=85' },
      { id: 'navy', nameAr: 'كحلي سهرة مطرز', nameEn: 'Midnight Navy', hex: '#1e3a8a', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=85' },
      { id: 'gold', nameAr: 'ذهبي شامبين براق', nameEn: 'Champagne Gold', hex: '#d97706', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=85' }
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'تفصيل خاص (Custom)'],
    viewersCount: 28,
    stockLeft: 4,
    badge: { textAr: 'الأكثر طلباً', textEn: 'Bestseller', type: 'hot' },
    inStock: true,
    vendor: 'دار تاج لاين للتطريز'
  },
  {
    id: 'p-jalabiya-2',
    nameAr: 'جلابية مغربية ومخملية ملكية مطرزة بنقوش القيطان مع حزام مرصع',
    nameEn: 'Royal Velvet Moroccan Jalabiya with Intricate Hand Embroidery',
    categoryAr: 'فساتين، جلابيات ومخاور نسائي',
    categoryEn: 'Dresses, Jalabiyas & Makhawir',
    price: 220.00,
    oldPrice: 290.00,
    rating: 4.9,
    reviewsCount: 185,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=85'
    ],
    colors: [
      { id: 'burgundy', nameAr: 'مخمل أحمر برغندي', nameEn: 'Velvet Burgundy', hex: '#7f1d1d', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=85' },
      { id: 'sapphire', nameAr: 'أزرق ملكي زفير', nameEn: 'Royal Sapphire', hex: '#1e40af', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=85' },
      { id: 'jetblack', nameAr: 'أسود سواريه ملكي', nameEn: 'Jet Black Noir', hex: '#18181b', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=85' }
    ],
    sizes: ['M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    viewersCount: 19,
    stockLeft: 2,
    badge: { textAr: 'تشكيلة العيد', textEn: 'Eid Exclusive', type: 'new' },
    inStock: true,
    vendor: 'تاج لاين كوتور'
  },
  {
    id: 'p-girls-dress-1',
    nameAr: 'فستان بناتي دانتيل وتل فرنسي فاخر للمناسبات والأعياد مع فيونكة ستان',
    nameEn: 'Charming French Lace & Tulle Girls Festive Party Dress with Satin Bow',
    categoryAr: 'أزياء وملابس بناتي',
    categoryEn: 'Girls\' Fashion & Dresses',
    price: 89.00,
    oldPrice: 115.00,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&auto=format&fit=crop&q=85'
    ],
    colors: [
      { id: 'blush-pink', nameAr: 'وردي بلش أميرات', nameEn: 'Blush Pink', hex: '#f472b6', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=85' },
      { id: 'pearl-white', nameAr: 'أبيض لؤلؤي ساطع', nameEn: 'Pearl White', hex: '#f8fafc', borderHex: '#cbd5e1', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=85' },
      { id: 'lavender', nameAr: 'بنفسجي لافندر ناعم', nameEn: 'Soft Lavender', hex: '#c084fc', image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&auto=format&fit=crop&q=85' }
    ],
    sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات', '10-12 سنة'],
    viewersCount: 35,
    stockLeft: 6,
    badge: { textAr: 'موديل جديد', textEn: 'New In', type: 'popular' },
    inStock: true,
    vendor: 'أميرات تاج لاين'
  },
  {
    id: 'p-boys-thobe-1',
    nameAr: 'ثوب ولادي سعودي فاخر من القماش الياباني المنسوج مع ياقة مطرزة',
    nameEn: 'Tailored Luxury Boys Traditional Thobe with Embroidered Collar',
    categoryAr: 'أزياء وملابس ولادي',
    categoryEn: 'Boys\' Apparel & Thobes',
    price: 75.00,
    oldPrice: 95.00,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=85'
    ],
    colors: [
      { id: 'pure-white', nameAr: 'أبيض ناصع ياباني', nameEn: 'Pure White', hex: '#ffffff', borderHex: '#e2e8f0', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=85' },
      { id: 'cream-ivory', nameAr: 'سكري عاجي هادئ', nameEn: 'Cream Ivory', hex: '#fef3c7', borderHex: '#fcd34d', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=85' }
    ],
    sizes: ['مقاس 32 (5-6 سنوات)', 'مقاس 36 (7-8 سنوات)', 'مقاس 40 (9-10 سنوات)', 'مقاس 44 (11-12 سنة)'],
    viewersCount: 14,
    stockLeft: 8,
    badge: { textAr: 'قماش ياباني', textEn: 'Japanese Fabric', type: 'hot' },
    inStock: true,
    vendor: 'أناقة الفرسان الصغار'
  },
  {
    id: 'p-fabrics-1',
    nameAr: 'طاقة قماش حرير جاكار إيطالي منقوش للفساتين والستائر الفخمة',
    nameEn: 'Italian Jacquard Silk Fabric Roll for Couture Dresses & Luxury Drapes',
    categoryAr: 'أقمشة ومفروشات وستائر',
    categoryEn: 'Fabrics, Furnishings & Curtains',
    price: 145.00,
    oldPrice: 190.00,
    rating: 5.0,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=85',
    colors: [
      { id: 'bronze-gold', nameAr: 'ذهبي برونزي ملكي', nameEn: 'Bronze Gold', hex: '#ca8a04', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=85' },
      { id: 'slate-blue', nameAr: 'أزرق سماوي جاكار', nameEn: 'Sky Jacquard', hex: '#0284c7', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=85' },
      { id: 'sage-green', nameAr: 'أخضر عشبي هادئ', nameEn: 'Sage Green', hex: '#15803d', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=85' }
    ],
    sizes: ['طاقة كاملة (25 متر)', 'نصف طاقة (12.5 متر)', 'طاقة تفصيل فستان (3.5 متر)'],
    viewersCount: 22,
    stockLeft: 5,
    badge: { textAr: 'تفصيل حسب الطلب', textEn: 'Custom Tailoring', type: 'sale' },
    inStock: true,
    vendor: 'أقمشة تاج لاين الفاخرة'
  },
  {
    id: 'p-curtains-2',
    nameAr: 'طقم ستائر مخملية معتمة بنقوش ذهبية مع طبقة شيفون فندقية فاخرة',
    nameEn: 'Luxury Blackout Velvet Curtains with Gold Accents & Chiffon Underlayer',
    categoryAr: 'أقمشة ومفروشات وستائر',
    categoryEn: 'Fabrics, Furnishings & Curtains',
    price: 199.00,
    oldPrice: 260.00,
    rating: 4.9,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=85',
    colors: [
      { id: 'charcoal', nameAr: 'رمادي شاركول معتم', nameEn: 'Charcoal Grey', hex: '#334155', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=85' },
      { id: 'royal-navy', nameAr: 'كحلي داكن عازل', nameEn: 'Navy Blackout', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=85' },
      { id: 'sand-beige', nameAr: 'بيج رملي فندقي', nameEn: 'Sand Beige', hex: '#d6c7a1', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop&q=85' }
    ],
    sizes: ['200x260 سم', '300x260 سم', '400x280 سم', 'تفصيل قياس نافذة مخصص'],
    viewersCount: 16,
    stockLeft: 3,
    badge: { textAr: 'عازل للصوت والضوء', textEn: 'Blackout', type: 'hot' },
    inStock: true,
    vendor: 'مفروشات وستائر القصر'
  },
  {
    id: 'p1',
    nameAr: 'سماعات رأس لاسلكية سوني WH-1000XM5 مع عزل ضوضاء فائق',
    nameEn: 'Sony WH-1000XM5 Premium Noise Canceling Wireless Headphones',
    categoryAr: 'الإلكترونيات والتقنية',
    categoryEn: 'Electronics & Gadgets',
    price: 349.99,
    oldPrice: 399.99,
    rating: 4.9,
    reviewsCount: 1280,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    colors: [
      { id: 'black', nameAr: 'أسود كربوني مطفي', nameEn: 'Matte Black', hex: '#18181b', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' },
      { id: 'silver', nameAr: 'فضي بلاتينيوم ناعم', nameEn: 'Platinum Silver', hex: '#e2e8f0', borderHex: '#cbd5e1', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80' },
      { id: 'midnight-blue', nameAr: 'أزرق ليلي خاص', nameEn: 'Midnight Blue', hex: '#1e293b', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80' }
    ],
    sizes: ['Standard Over-Ear (مع حقيبة سفر فاخرة)'],
    viewersCount: 42,
    stockLeft: 7,
    badge: { textAr: 'الأكثر مبيعاً', textEn: 'Best Seller', type: 'hot' },
    inStock: true,
    vendor: 'Sony Official Store'
  },
  {
    id: 'p2',
    nameAr: 'هاتف ابل ايفون 16 برو ماكس سعة 256 جيجابايت - تيتانيوم طبيعي',
    nameEn: 'Apple iPhone 16 Pro Max 256GB - Natural Titanium',
    categoryAr: 'الهواتف الذكية والأجهزة',
    categoryEn: 'Smartphones & Tablets',
    price: 1199.00,
    oldPrice: 1299.00,
    rating: 4.8,
    reviewsCount: 840,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80',
    colors: [
      { id: 'natural-titanium', nameAr: 'تيتانيوم طبيعي', nameEn: 'Natural Titanium', hex: '#9ca3af', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80' },
      { id: 'black-titanium', nameAr: 'تيتانيوم أسود', nameEn: 'Black Titanium', hex: '#27272a', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=80' },
      { id: 'desert-titanium', nameAr: 'تيتانيوم صحراوي ذهبي', nameEn: 'Desert Titanium', hex: '#d4af37', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&auto=format&fit=crop&q=80' }
    ],
    sizes: ['256GB', '512GB', '1TB'],
    viewersCount: 68,
    stockLeft: 3,
    badge: { textAr: 'جديد 2026', textEn: 'New 2026', type: 'new' },
    inStock: true,
    vendor: 'Apple Authorized'
  },
  {
    id: 'p3',
    nameAr: 'ساعة يد ذكية الترا 2 مع سوار المحيط الرياضي',
    nameEn: 'Smart Watch Ultra 2 with Rugged Ocean Band GPS+Cellular',
    categoryAr: 'الساعات والإكسسوارات',
    categoryEn: 'Watches & Accessories',
    price: 749.00,
    oldPrice: 799.00,
    rating: 4.7,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    colors: [
      { id: 'orange-band', nameAr: 'برتقالي هيرو أكتيف', nameEn: 'Action Orange', hex: '#ea580c', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' },
      { id: 'midnight-band', nameAr: 'كحلي داكن رياضي', nameEn: 'Midnight Navy', hex: '#0f172a', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=80' },
      { id: 'white-band', nameAr: 'أبيض قطبي تيتانيوم', nameEn: 'Polar White', hex: '#f1f5f9', borderHex: '#cbd5e1', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80' }
    ],
    sizes: ['49mm Titanium Case (Cellular + GPS)'],
    viewersCount: 24,
    stockLeft: 5,
    badge: { textAr: 'خصم 15%', textEn: '15% Off', type: 'sale' },
    inStock: true,
    vendor: 'TechGear Official'
  }
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'women-makhawir',
    nameAr: 'فساتين وجلابيات ومخاور نسائي',
    nameEn: 'Dresses, Jalabiyas & Makhawir',
    iconName: 'Crown',
    badge: 'EXCLUSIVE',
    itemCount: 840,
    subcategories: [
      {
        nameAr: 'المخاور الإماراتية والخليجية',
        nameEn: 'Emirati & Gulf Makhawir',
        link: '#',
        items: [
          { nameAr: 'مخاور حرير طبيعي مطرزة', nameEn: 'Silk Embroidered Makhawir', link: '#' },
          { nameAr: 'مخاور قطن ويل إنجليزي', nameEn: 'English Voile Cotton Makhawir', link: '#' },
          { nameAr: 'مخاور كريستال وفصوص زيركون', nameEn: 'Zircon & Crystal Studded', link: '#' },
          { nameAr: 'مخاور كريب وبوتيلة تراثية', nameEn: 'Crepe Heritage Makhawir', link: '#' }
        ]
      },
      {
        nameAr: 'الجلابيات والقفاطين الملكية',
        nameEn: 'Royal Jalabiyas & Kaftans',
        link: '#',
        items: [
          { nameAr: 'جلابيات مخمل شتوية ومناسبات', nameEn: 'Velvet Winter Jalabiyas', link: '#' },
          { nameAr: 'قفاطين مغربية مع حزام قيطان', nameEn: 'Moroccan Kaftans with Sashes', link: '#' },
          { nameAr: 'جلابيات بيت شيفون مريحة', nameEn: 'Comfortable Chiffon Housewear', link: '#' },
          { nameAr: 'جلابيات استقبال مطرزة', nameEn: 'Festive Reception Jalabiyas', link: '#' }
        ]
      },
      {
        nameAr: 'فساتين السهرة والمناسبات',
        nameEn: 'Evening & Party Gowns',
        link: '#',
        items: [
          { nameAr: 'فساتين سهرة ناعمة', nameEn: 'Elegant Minimal Evening Gowns', link: '#' },
          { nameAr: 'فساتين تل ودانتيل مطرز', nameEn: 'Embroidered Lace & Tulle Gowns', link: '#' },
          { nameAr: 'فساتين كلوش وماكسي راقية', nameEn: 'Maxi & Flared Gowns', link: '#' }
        ]
      }
    ],
    featuredPromo: {
      titleAr: 'مجموعة المخاور الملكية 2026',
      titleEn: 'Royal Makhawir Drop 2026',
      discountTextAr: 'تطريز يدوي فاخر بأجود خيوط الزري',
      discountTextEn: 'Hand-woven luxury golden threads',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&auto=format&fit=crop&q=80',
      linkTextAr: 'تسوق تشكيلة المخاور ←',
      linkTextEn: 'Shop Makhawir →'
    }
  },
  {
    id: 'girls-fashion',
    nameAr: 'أزياء وملابس بناتي',
    nameEn: 'Girls\' Fashion & Dresses',
    iconName: 'Sparkles',
    badge: 'NEW',
    itemCount: 520,
    subcategories: [
      {
        nameAr: 'فساتين الأميرات والمناسبات',
        nameEn: 'Princess Party Dresses',
        link: '#',
        items: [
          { nameAr: 'فساتين أعياد وحفلات منفوشة', nameEn: 'Puffy Birthday & Party Dresses', link: '#' },
          { nameAr: 'فساتين دانتيل وفيونكات ناعمة', nameEn: 'Lace Bow Dresses', link: '#' },
          { nameAr: 'جلابيات ومخاور بناتي صغيرة', nameEn: 'Little Girls Jalabiyas & Makhawir', link: '#' }
        ]
      },
      {
        nameAr: 'أطقم يومية وكاجوال',
        nameEn: 'Daily & Casual Sets',
        link: '#',
        items: [
          { nameAr: 'بيجامات قطنية مريحة', nameEn: 'Cotton Pajamas', link: '#' },
          { nameAr: 'تنانير وبلايز صيفية', nameEn: 'Summer Skirts & Tops', link: '#' },
          { nameAr: 'إكسسوارات شعر وأطواق', nameEn: 'Hair Accessories & Headbands', link: '#' }
        ]
      }
    ],
    featuredPromo: {
      titleAr: 'أناقة الأميرات الصغيرات',
      titleEn: 'Little Princess Elegance',
      discountTextAr: 'خصم 30% على فساتين المناسبات',
      discountTextEn: '30% OFF Party Dresses',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&auto=format&fit=crop&q=80',
      linkTextAr: 'استعراض فساتين البناتي ←',
      linkTextEn: 'Explore Girls Outfits →'
    }
  },
  {
    id: 'boys-wear',
    nameAr: 'أزياء وملابس ولادي',
    nameEn: 'Boys\' Wear & Thobes',
    iconName: 'Shirt',
    itemCount: 430,
    subcategories: [
      {
        nameAr: 'الثياب والزي التقليدي',
        nameEn: 'Thobes & Traditional Wear',
        link: '#',
        items: [
          { nameAr: 'ثياب بيضاء قماش ياباني وكوري', nameEn: 'White Japanese Fabric Thobes', link: '#' },
          { nameAr: 'سداريات وبشوت أطفال فاخرة', nameEn: 'Junior Bishts & Vests', link: '#' },
          { nameAr: 'أشمغة وطواقي مطرزة', nameEn: 'Shemaghs & Embroidered Caps', link: '#' }
        ]
      },
      {
        nameAr: 'البدل والملابس العصرية',
        nameEn: 'Suits & Modern Casuals',
        link: '#',
        items: [
          { nameAr: 'بدل رسمية مع ربطات عنق', nameEn: 'Formal Junior Suits', link: '#' },
          { nameAr: 'قمصان وبناطيل جينز', nameEn: 'Shirts & Denim Trousers', link: '#' },
          { nameAr: 'أطقم شورت وتيشيرت صيفية', nameEn: 'Summer Casual Short Sets', link: '#' }
        ]
      }
    ],
    featuredPromo: {
      titleAr: 'أناقة الفرسان الصغار',
      titleEn: 'Junior Gentlemen Outfits',
      discountTextAr: 'ثياب تفصيل وبدل راقية للعيد',
      discountTextEn: 'Tailored thobes & suits for celebrations',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&auto=format&fit=crop&q=80',
      linkTextAr: 'تسوق ملابس الأولاد ←',
      linkTextEn: 'Shop Boys Collection →'
    }
  },
  {
    id: 'fabrics-curtains',
    nameAr: 'أقمشة ومفروشات وستائر',
    nameEn: 'Fabrics, Furnishings & Curtains',
    iconName: 'Layers',
    badge: 'HOT',
    itemCount: 680,
    subcategories: [
      {
        nameAr: 'أقمشة التفصيل الفاخرة',
        nameEn: 'Luxury Couture Fabrics',
        link: '#',
        items: [
          { nameAr: 'أقمشة حرير وجاكار إيطالي', nameEn: 'Italian Silk & Jacquard', link: '#' },
          { nameAr: 'أقمشة كريب وشيفون ومخمل', nameEn: 'Crepe, Chiffon & Velvet Rolls', link: '#' },
          { nameAr: 'أقمشة قطن ويل هندي وسويسري', nameEn: 'Swiss & Indian Voile Cottons', link: '#' },
          { nameAr: 'أقمشة دانتيل وتطريز جاهز', nameEn: 'Embroidered Lace Fabrics', link: '#' }
        ]
      },
      {
        nameAr: 'الستائر الفاخرة ومستلزماتها',
        nameEn: 'Luxury Curtains & Drapes',
        link: '#',
        items: [
          { nameAr: 'ستائر مخملية عازلة للضوء (بلاك أوت)', nameEn: 'Blackout Velvet Curtains', link: '#' },
          { nameAr: 'ستائر شيفون ودانتيل فندقية', nameEn: 'Sheer & Chiffon Hotel Curtains', link: '#' },
          { nameAr: 'قضبان وإكسسوارات ستائر ذهبية', nameEn: 'Gold Curtain Rods & Tiebacks', link: '#' }
        ]
      },
      {
        nameAr: 'المفروشات والوسائد المنزلية',
        nameEn: 'Bedding & Cushions',
        link: '#',
        items: [
          { nameAr: 'أطقم لحاف فندقي قطن 100%', nameEn: '100% Cotton Hotel Bedding Sets', link: '#' },
          { nameAr: 'خداديات ومفارش كنب مطرزة', nameEn: 'Embroidered Sofa Cushion Covers', link: '#' }
        ]
      }
    ],
    featuredPromo: {
      titleAr: 'عالم الأقمشة والستائر الفخمة',
      titleEn: 'World of Luxury Fabrics & Curtains',
      discountTextAr: 'خدمة القياس والتفصيل المخصص الفوري',
      discountTextEn: 'Instant bespoke measurement & tailoring',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop&q=80',
      linkTextAr: 'استكشف الأقمشة والستائر ←',
      linkTextEn: 'Explore Fabrics & Curtains →'
    }
  },
  {
    id: 'electronics',
    nameAr: 'الإلكترونيات والأجهزة الذكية',
    nameEn: 'Electronics & Smart Tech',
    iconName: 'Tv',
    badge: 'HOT',
    itemCount: 1420,
    subcategories: [
      {
        nameAr: 'الهواتف والأجهزة اللوحية',
        nameEn: 'Smartphones & Tablets',
        link: '#',
        items: [
          { nameAr: 'ايفون وأجهزة ابل', nameEn: 'Apple iPhone & iPad', link: '#' },
          { nameAr: 'سامسونج جالاكسي', nameEn: 'Samsung Galaxy Series', link: '#' },
          { nameAr: 'أجهزة أندرويد اللوحية', nameEn: 'Android Tablets', link: '#' },
          { nameAr: 'إكسسوارات وحوافظ الهواتف', nameEn: 'Cases & Screen Protectors', link: '#' }
        ]
      },
      {
        nameAr: 'الحواسب والألعاب',
        nameEn: 'Laptops & Gaming',
        link: '#',
        items: [
          { nameAr: 'لابتوبات الأعمال والألعاب', nameEn: 'Gaming & Work Laptops', link: '#' },
          { nameAr: 'شاشات العرض 4K', nameEn: '4K Monitors & Displays', link: '#' },
          { nameAr: 'لوحات المفاتيح والماوس', nameEn: 'Keyboards & Mice', link: '#' },
          { nameAr: 'كروت الشاشة والمعالجات', nameEn: 'GPUs & Processors', link: '#' }
        ]
      },
      {
        nameAr: 'الصوتيات وسماعات الرأس',
        nameEn: 'Audio & Headphones',
        link: '#',
        items: [
          { nameAr: 'سماعات عازلة للضوضاء', nameEn: 'Noise-Cancelling Over-Ear', link: '#' },
          { nameAr: 'سماعات TWS لاسلكية', nameEn: 'True Wireless Earbuds', link: '#' },
          { nameAr: 'مكبرات صوت بلوتوث', nameEn: 'Portable Bluetooth Speakers', link: '#' },
          { nameAr: 'أنظمة المسرح المنزلي', nameEn: 'Home Theater Systems', link: '#' }
        ]
      }
    ],
    featuredPromo: {
      titleAr: 'عروض التقنية الكبرى 2026',
      titleEn: 'Mega Tech Deals 2026',
      discountTextAr: 'وفر حتى 40% على جميع ملحقات الحاسوب',
      discountTextEn: 'Save up to 40% on all PC accessories',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
      linkTextAr: 'تسوق عروض التقنية ←',
      linkTextEn: 'Shop Tech Deals →'
    }
  },
  {
    id: 'fashion',
    nameAr: 'الأزياء والموضة الفاخرة',
    nameEn: 'Fashion & Luxury Apparel',
    iconName: 'Shirt',
    itemCount: 2850,
    subcategories: [
      {
        nameAr: 'ملابس رجالية',
        nameEn: 'Men\'s Clothing',
        link: '#',
        items: [
          { nameAr: 'قمصان وتيشيرتات', nameEn: 'Shirts & Polos', link: '#' },
          { nameAr: 'بناطيل وجينز', nameEn: 'Jeans & Trousers', link: '#' },
          { nameAr: 'بدل وسترات رسمية', nameEn: 'Suits & Blazers', link: '#' },
          { nameAr: 'ملابس رياضية', nameEn: 'Activewear & Hoodies', link: '#' }
        ]
      },
      {
        nameAr: 'ملابس نسائية',
        nameEn: 'Women\'s Collection',
        link: '#',
        items: [
          { nameAr: 'فساتين وعبايات راقية', nameEn: 'Dresses & Abayas', link: '#' },
          { nameAr: 'أزياء الكاجوال اليومية', nameEn: 'Casual Tops & Blouses', link: '#' },
          { nameAr: 'حقائب يد ومحافظ جلدية', nameEn: 'Luxury Handbags', link: '#' },
          { nameAr: 'أحذية كلاسيكية ورياضية', nameEn: 'Footwear & Heels', link: '#' }
        ]
      }
    ],
    featuredPromo: {
      titleAr: 'مجموعة الربيع والصيف',
      titleEn: 'Spring Summer Collection',
      discountTextAr: 'أحدث خطوط الموضة العالمية الحصرية',
      discountTextEn: 'Exclusive designer arrivals for this season',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80',
      linkTextAr: 'استكشف التشكيلة ←',
      linkTextEn: 'Explore Lookbook →'
    }
  },
  {
    id: 'home',
    nameAr: 'المنزل والمطبخ والديكور',
    nameEn: 'Home, Kitchen & Living',
    iconName: 'Home',
    badge: 'NEW',
    itemCount: 980,
    subcategories: [
      {
        nameAr: 'أجهزة المطبخ الكهربائية',
        nameEn: 'Kitchen Appliances',
        link: '#',
        items: [
          { nameAr: 'ماكينات القهوة والاسبريسو', nameEn: 'Coffee & Espresso Machines', link: '#' },
          { nameAr: 'القلايات الهوائية الذكية', nameEn: 'Smart Air Fryers', link: '#' },
          { nameAr: 'الخلاطات ومحضرات الطعام', nameEn: 'Blenders & Processors', link: '#' }
        ]
      },
      {
        nameAr: 'الأثاث والديكور الداخلي',
        nameEn: 'Furniture & Decor',
        link: '#',
        items: [
          { nameAr: 'إضاءات ولمبات سمارت', nameEn: 'Smart Lighting & Lamps', link: '#' },
          { nameAr: 'سجاد ومفروشات عصرية', nameEn: 'Rugs & Modern Textiles', link: '#' },
          { nameAr: 'تحف ومرايا جدارية', nameEn: 'Wall Art & Mirrors', link: '#' }
        ]
      }
    ]
  },
  {
    id: 'beauty',
    nameAr: 'الجمال والعطور والعناية',
    nameEn: 'Beauty, Fragrances & Care',
    iconName: 'Sparkles',
    itemCount: 640
  },
  {
    id: 'sports',
    nameAr: 'الرياضة واللياقة البدنية',
    nameEn: 'Sports & Outdoor Fitness',
    iconName: 'Dumbbell',
    itemCount: 420
  },
  {
    id: 'grocery',
    nameAr: 'السوبرماركت والأغذية الطازجة',
    nameEn: 'Supermarket & Fresh Groceries',
    iconName: 'ShoppingBag',
    badge: 'FRESH',
    itemCount: 3100
  }
];

export const TRENDING_SEARCH_TAGS = [
  { ar: 'ايفون 16 برو', en: 'iPhone 16 Pro' },
  { ar: 'سماعات سوني', en: 'Sony Headphones' },
  { ar: 'ماك بوك ام 3', en: 'MacBook M3' },
  { ar: 'ماكينة اسبريسو', en: 'Espresso Maker' },
  { ar: 'ساعات ذكية', en: 'Smartwatches' },
  { ar: 'حذاء نايكي للجري', en: 'Nike Running' },
  { ar: 'قلاية هوائية', en: 'Air Fryer' }
];

export const ANNOUNCEMENT_MESSAGES = [
  {
    ar: '🔥 عروض نهاية الأسبوع: خصم إضافي 20% باستخدام كوبون AMERCE20 + شحن مجاني للطلبات فوق 200 ر.س',
    en: '🔥 Flash Weekend Sale: Extra 20% OFF with code AMERCE20 + Free Shipping on orders over $99'
  },
  {
    ar: '⚡ شحن سريع خلال 24 ساعة في الرياض ودبي وجدة والقاهرة لجميع المنتجات المميزة',
    en: '⚡ Express 24h delivery available across major cities on all Prime items'
  },
  {
    ar: '🎁 انضم لبرنامج نقاط مكافآت Amerce واحصل على 50 نقطة فورية عند أول طلب',
    en: '🎁 Join Amerce Rewards Club and earn 50 instant points on your first order'
  }
];
