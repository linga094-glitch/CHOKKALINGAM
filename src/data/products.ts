export type CategorySlug =
  | 'smartphones'
  | 'chargers-cables'
  | 'earphones-audio'
  | 'phone-cases'
  | 'screen-protection'
  | 'power-banks'
  | 'smartwatches'
  | 'car-accessories'
  | 'all-accessories';

export type BrandName =
  | 'Samsung'
  | 'Vivo'
  | 'OPPO'
  | 'Realme'
  | 'Redmi'
  | 'Mi'
  | 'iQOO'
  | 'OnePlus'
  | 'Chokkalingam Essentials';

export interface CategoryTile {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export interface Product {
  id: string;
  name: string;
  brand: BrandName;
  category: CategorySlug;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  isFeaturedOffer?: boolean;
  offerTag?: string;
  specs: string[];
  description: string;
  image: string;
  imageAlt: string;
}

export const HERO_BANNER_IMAGE = '/src/assets/images/hero_flagship_smartphones_1795514596286.jpg';

export const CATEGORY_TILES: CategoryTile[] = [
  {
    slug: 'smartphones',
    title: 'Smartphones',
    subtitle: '5G Flagships & Everyday Phones',
    image: '/src/assets/images/cat_smartphones_grid_1795514595174.jpg',
    imageAlt: 'Latest 5G smartphones display',
  },
  {
    slug: 'chargers-cables',
    title: 'Chargers & Cables',
    subtitle: 'GaN Adapters & Braided Leads',
    image: '/src/assets/images/cat_chargers_cables_1795514596101.jpg',
    imageAlt: 'Fast GaN charger adapter and braided USB-C cable',
  },
  {
    slug: 'earphones-audio',
    title: 'Earphones & Audio',
    subtitle: 'TWS Earbuds, Neckbands & Audio',
    image: '/src/assets/images/cat_earphones_audio_1795514596216.jpg',
    imageAlt: 'Wireless earbuds in royal blue case and headphones',
  },
  {
    slug: 'phone-cases',
    title: 'Phone Cases & Covers',
    subtitle: 'Silicone, Matte & Clear Bumpers',
    image: '/src/assets/images/cat_phone_cases_1795514597309.jpg',
    imageAlt: 'Matte blue and transparent protective mobile phone cases',
  },
  {
    slug: 'screen-protection',
    title: 'Screen Protection',
    subtitle: 'Tempered Glass & Lens Rings',
    image: '/src/assets/images/cat_screen_protection_1795514596280.jpg',
    imageAlt: 'Tempered glass screen protector and camera lens protectors',
  },
  {
    slug: 'power-banks',
    title: 'Power Banks',
    subtitle: '10000mAh & 20000mAh Fast Output',
    image: '/src/assets/images/cat_power_banks_1795514597141.jpg',
    imageAlt: 'Slim navy portable fast-charging power bank',
  },
  {
    slug: 'smartwatches',
    title: 'Smartwatches',
    subtitle: 'AMOLED Calling & Fitness Bands',
    image: '/src/assets/images/cat_smartwatches_1795514597025.jpg',
    imageAlt: 'AMOLED smartwatch with royal blue silicone strap',
  },
  {
    slug: 'car-accessories',
    title: 'Car Accessories',
    subtitle: 'Dashboard Mounts & Car Chargers',
    image: '/src/assets/images/cat_car_accessories_1795514598145.jpg',
    imageAlt: 'Magnetic car dashboard phone holder and USB-C car charger',
  },
  {
    slug: 'all-accessories',
    title: 'All Accessories',
    subtitle: 'Browse Full Accessory Range',
    image: '/src/assets/images/cat_all_accessories_1795514598584.jpg',
    imageAlt: 'Curated mobile accessories flatlay',
  },
];

export const FEATURED_BRANDS: Array<{ name: BrandName; styleNote: string }> = [
  { name: 'Samsung', styleNote: 'Galaxy 5G & AI Series' },
  { name: 'Vivo', styleNote: 'V-Series & T-Series' },
  { name: 'OPPO', styleNote: 'Reno & F-Series' },
  { name: 'Realme', styleNote: 'GT & Narzo 5G' },
  { name: 'Redmi', styleNote: 'Note & Number Series' },
  { name: 'Mi', styleNote: 'Xiaomi Flagships & Audio' },
  { name: 'iQOO', styleNote: 'Z & Neo Performance' },
  { name: 'OnePlus', styleNote: 'Nord & Flagship 5G' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'samsung-galaxy-a55-5g',
    name: 'Samsung Galaxy A55 5G (8GB / 128GB)',
    brand: 'Samsung',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 36999,
    originalPrice: 39999,
    isFeaturedOffer: true,
    offerTag: 'Bank Offer Eligible',
    specs: ['6.6" FHD+ 120Hz sAMOLED', '50MP OIS Triple Camera', '5000mAh · IP67 Metal Frame'],
    description:
      'Refined aluminum frame with Super AMOLED 120Hz display, Nightography OIS camera, and 4 years of OS upgrades.',
    image: '/src/assets/images/cat_smartphones_grid_1795514595174.jpg',
    imageAlt: 'Samsung Galaxy A55 5G smartphone',
  },
  {
    id: 'oneplus-nord-4-5g',
    name: 'OnePlus Nord 4 5G (8GB / 256GB)',
    brand: 'OnePlus',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 29999,
    originalPrice: 32999,
    isFeaturedOffer: true,
    offerTag: 'Instant Store Discount',
    specs: ['Snapdragon 7+ Gen 3', '5500mAh · 100W SUPERVOOC', '120Hz Ultra-Bright AMOLED'],
    description:
      'Metal unibody 5G powerhouse with 100W fast charging and smooth OxygenOS multitasking.',
    image: '/src/assets/images/hero_flagship_smartphones_1795514596286.jpg',
    imageAlt: 'OnePlus Nord 4 5G smartphone',
  },
  {
    id: 'vivo-v40-5g',
    name: 'Vivo V40 5G ZEISS Edition (8GB / 128GB)',
    brand: 'Vivo',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 34999,
    originalPrice: 36999,
    isFeaturedOffer: true,
    offerTag: 'Free Screen Guard',
    specs: ['ZEISS 50MP Dual OIS Camera', '5500mAh Slim Battery', 'IP68 Dust & Water Resistant'],
    description:
      'Ultra-slim 5G smartphone co-engineered with ZEISS portrait optics and studio Aura Light.',
    image: '/src/assets/images/cat_smartphones_grid_1795514595174.jpg',
    imageAlt: 'Vivo V40 5G smartphone',
  },
  {
    id: 'iqoo-z9s-pro-5g',
    name: 'iQOO Z9s Pro 5G (8GB / 128GB)',
    brand: 'iQOO',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 24999,
    originalPrice: 27999,
    isFeaturedOffer: true,
    offerTag: 'Gaming Pick',
    specs: ['Snapdragon 7 Gen 3', '3D Curved 120Hz AMOLED', '5500mAh · 80W FlashCharge'],
    description:
      'Built for smooth high-frame gaming and bright outdoor viewing with 4500 nits peak brightness.',
    image: '/src/assets/images/hero_flagship_smartphones_1795514596286.jpg',
    imageAlt: 'iQOO Z9s Pro 5G smartphone',
  },
  {
    id: 'oppo-reno-12-5g',
    name: 'OPPO Reno 12 5G (8GB / 256GB)',
    brand: 'OPPO',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 32999,
    originalPrice: 34999,
    specs: ['AI Portrait Camera Suite', '120Hz 3D Curved AMOLED', '80W SUPERVOOC Charging'],
    description:
      'Sleek flagship aesthetics paired with AI photo enhancements and all-day battery endurance.',
    image: '/src/assets/images/cat_smartphones_grid_1795514595174.jpg',
    imageAlt: 'OPPO Reno 12 5G smartphone',
  },
  {
    id: 'realme-13-pro-5g',
    name: 'Realme 13 Pro 5G (8GB / 128GB)',
    brand: 'Realme',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 26999,
    originalPrice: 28999,
    specs: ['Sony LYT-600 OIS Camera', '120Hz Pro-XDR Display', '5200mAh · 45W Fast Charge'],
    description:
      'Balanced camera and display performance with refined Monet-inspired glass back.',
    image: '/src/assets/images/cat_smartphones_grid_1795514595174.jpg',
    imageAlt: 'Realme 13 Pro 5G smartphone',
  },
  {
    id: 'redmi-note-13-pro-5g',
    name: 'Redmi Note 13 Pro 5G (8GB / 128GB)',
    brand: 'Redmi',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 23999,
    originalPrice: 25999,
    isFeaturedOffer: true,
    offerTag: 'Best Seller',
    specs: ['200MP OIS Main Camera', '1.5K 120Hz CrystalRes AMOLED', '67W Turbo Charge'],
    description:
      'Flagship-grade 200MP detail and crisp 1.5K Gorilla Glass Victus display at mid-range value.',
    image: '/src/assets/images/hero_flagship_smartphones_1795514596286.jpg',
    imageAlt: 'Redmi Note 13 Pro 5G smartphone',
  },
  {
    id: 'mi-14-civi-5g',
    name: 'Xiaomi Mi 14 CIVI 5G (8GB / 256GB)',
    brand: 'Mi',
    category: 'smartphones',
    categoryLabel: 'Smartphones',
    price: 39999,
    originalPrice: 42999,
    specs: ['Leica Summilux Triple Camera', 'Snapdragon 8s Gen 3', '1.5K Quad-Curved AMOLED'],
    description:
      'Compact Leica camera flagship with dual 32MP front cameras and studio-grade color tuning.',
    image: '/src/assets/images/hero_flagship_smartphones_1795514596286.jpg',
    imageAlt: 'Xiaomi Mi 14 CIVI 5G smartphone',
  },
  {
    id: 'gan-65w-dual-charger',
    name: '65W GaN Dual USB-C Fast Charger + Cable',
    brand: 'Chokkalingam Essentials',
    category: 'chargers-cables',
    categoryLabel: 'Chargers & Cables',
    price: 1699,
    originalPrice: 2199,
    isFeaturedOffer: true,
    offerTag: 'Combo Saver',
    specs: ['65W PD + PPS Support', 'Dual Type-C Ports', '1.5m Braided USB-C Cable Included'],
    description:
      'Compact high-efficiency GaN wall adapter built for Samsung, OnePlus, iPhones, and laptops.',
    image: '/src/assets/images/cat_chargers_cables_1795514596101.jpg',
    imageAlt: '65W GaN dual USB-C fast charger and braided cable',
  },
  {
    id: 'anc-tws-earbuds-pro',
    name: 'Active Noise Cancelling TWS Earbuds',
    brand: 'Chokkalingam Essentials',
    category: 'earphones-audio',
    categoryLabel: 'Earphones & Audio',
    price: 1999,
    originalPrice: 2499,
    specs: ['38dB Active Noise Cancellation', '40 Hours Total Playback', 'USB-C Fast Charge Case'],
    description:
      'Crisp call clarity with quad-mic ENC, deep bass drivers, and ergonomic all-day ear tips.',
    image: '/src/assets/images/cat_earphones_audio_1795514596216.jpg',
    imageAlt: 'Wireless ANC earbuds in royal blue charging case',
  },
  {
    id: 'matte-magsafe-silicone-case',
    name: 'Matte Soft-Touch Shockproof Phone Case',
    brand: 'Chokkalingam Essentials',
    category: 'phone-cases',
    categoryLabel: 'Phone Cases & Covers',
    price: 499,
    originalPrice: 699,
    specs: ['Microfiber Inner Lining', 'Raised Camera Ring Lip', 'Anti-Fingerprint Matte Finish'],
    description:
      'Precision cutouts for Samsung, Vivo, OPPO, Realme, Redmi, OnePlus, and iPhone models.',
    image: '/src/assets/images/cat_phone_cases_1795514597309.jpg',
    imageAlt: 'Protective matte blue and transparent smartphone cases',
  },
  {
    id: 'edge-tempered-glass-kit',
    name: '9H Edge-to-Edge Tempered Glass + Lens Kit',
    brand: 'Chokkalingam Essentials',
    category: 'screen-protection',
    categoryLabel: 'Screen Protection',
    price: 399,
    originalPrice: 599,
    isFeaturedOffer: true,
    offerTag: 'Free Store Fitting',
    specs: ['Oleophobic Anti-Smudge Coat', 'Full-Glue Bubble-Free Fit', 'Includes Camera Lens Ring'],
    description:
      'High-transparency tempered glass engineered to preserve touch sensitivity and fingerprint speed.',
    image: '/src/assets/images/cat_screen_protection_1795514596280.jpg',
    imageAlt: '9H tempered glass screen protector with camera lens rings',
  },
  {
    id: 'powerbank-20000mah-pd',
    name: '20000mAh 22.5W Fast Power Bank',
    brand: 'Chokkalingam Essentials',
    category: 'power-banks',
    categoryLabel: 'Power Banks',
    price: 1899,
    originalPrice: 2499,
    specs: ['LED Percentage Display', 'Dual USB-A + Type-C PD', 'Multi-Layer Surge Protection'],
    description:
      'High-capacity slim travel battery pack with built-in quick charging for long trips.',
    image: '/src/assets/images/cat_power_banks_1795514597141.jpg',
    imageAlt: '20000mAh navy blue portable fast power bank',
  },
  {
    id: 'amoled-bluetooth-smartwatch',
    name: '1.43" AMOLED Bluetooth Calling Smartwatch',
    brand: 'Chokkalingam Essentials',
    category: 'smartwatches',
    categoryLabel: 'Smartwatches',
    price: 2799,
    originalPrice: 3499,
    specs: ['Always-On AMOLED Display', 'Clear Bluetooth Calling', 'SpO2, Heart Rate & 100+ Modes'],
    description:
      'Crisp circular metallic bezel smartwatch with comfortable sweat-proof blue silicone strap.',
    image: '/src/assets/images/cat_smartwatches_1795514597025.jpg',
    imageAlt: 'AMOLED smartwatch with royal blue strap',
  },
  {
    id: 'magnetic-car-mount-charger',
    name: 'Magnetic Dashboard Phone Mount + 30W Car Charger',
    brand: 'Chokkalingam Essentials',
    category: 'car-accessories',
    categoryLabel: 'Car Accessories',
    price: 1299,
    originalPrice: 1699,
    specs: ['360° Suction Dashboard Arm', 'Dual Type-C PD 30W Adapter', 'Strong N52 Magnet Hold'],
    description:
      'Highway-tested dashboard mount and dual-port fast car charger for vibration-free navigation.',
    image: '/src/assets/images/cat_car_accessories_1795514598145.jpg',
    imageAlt: 'Magnetic car dashboard mount and dual USB-C car charger',
  },
];
