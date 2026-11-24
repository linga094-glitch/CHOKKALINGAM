/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import {
  BrandName,
  CategorySlug,
  PRODUCTS,
  Product,
} from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBrandStrip } from './components/CategoryBrandStrip';
import { ProductCatalog } from './components/ProductCatalog';
import { ServiceOffersAboutContact } from './components/ServiceOffersAboutContact';
import { Footer } from './components/Footer';
import {
  CartDrawer,
  CartEntry,
  LoginModal,
  PlacedOrder,
  TrackOrderModal,
  WishlistDrawer,
} from './components/ShopDrawersAndModals';

const DEFAULT_SAMPLE_ORDER: PlacedOrder = {
  orderId: 'CHK-1042',
  customerName: 'Karthikeyan S.',
  phone: '+91 7904668810',
  address: 'Veppur Main Road, Tamil Nadu',
  paymentMethod: 'UPI / QR Payment',
  total: 29999,
  status: 'Quality Checked — Out for Same-Day Delivery',
  createdAt: '24/11/2026',
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<BrandName | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [offersOnly, setOffersOnly] = useState(false);

  const [cart, setCart] = useState<CartEntry[]>(() => {
    try {
      const saved = localStorage.getItem('chokkalingam_cart');
      return saved ? (JSON.parse(saved) as CartEntry[]) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chokkalingam_wishlist');
      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<PlacedOrder[]>([DEFAULT_SAMPLE_ORDER]);
  const [userName, setUserName] = useState<string | null>(() => {
    try {
      return localStorage.getItem('chokkalingam_user');
    } catch {
      return null;
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [trackOrderOpen, setTrackOrderOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('chokkalingam_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('chokkalingam_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlistIds]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      if (selectedCategory === 'all-accessories') {
        if (product.category === 'smartphones') return false;
      } else if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) {
        return false;
      }
      if (offersOnly && !product.isFeaturedOffer) {
        return false;
      }
      if (q) {
        return (
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.categoryLabel.toLowerCase().includes(q) ||
          product.specs.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, selectedBrand, searchQuery, offersOnly]);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'smartphones') {
      setSelectedCategory('smartphones');
      setSelectedBrand('all');
      setOffersOnly(false);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionId === 'accessories') {
      setSelectedCategory('all-accessories');
      setSelectedBrand('all');
      setOffersOnly(false);
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((e) => e.product.id === product.id);
      if (existing) {
        return prev.map((e) =>
          e.product.id === product.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((e) =>
          e.product.id === productId ? { ...e, quantity: e.quantity + delta } : e
        )
        .filter((e) => e.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((e) => e.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlistIds.includes(p.id)),
    [wishlistIds]
  );

  const totalCartCount = useMemo(
    () => cart.reduce((sum, entry) => sum + entry.quantity, 0),
    [cart]
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
        }}
        wishlistCount={wishlistIds.length}
        cartCount={totalCartCount}
        userName={userName}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onOpenTrackOrder={() => setTrackOrderOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        <HeroBanner
          onShopNow={() => scrollToSection('products')}
          onViewOffers={() => scrollToSection('offers')}
        />

        <CategoryBrandStrip
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug);
            setOffersOnly(false);
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectBrand={(brand) => {
            setSelectedBrand(brand);
            if (brand !== 'all') {
              setSelectedCategory('smartphones');
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        <ProductCatalog
          products={filteredProducts}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          searchQuery={searchQuery}
          offersOnly={offersOnly}
          wishlistIds={wishlistIds}
          onSelectCategory={setSelectedCategory}
          onSelectBrand={setSelectedBrand}
          onToggleOffersOnly={() => setOffersOnly((prev) => !prev)}
          onResetFilters={() => {
            setSelectedCategory('all');
            setSelectedBrand('all');
            setSearchQuery('');
            setOffersOnly(false);
          }}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        <ServiceOffersAboutContact
          onFilterOffers={() => {
            setSelectedCategory('all');
            setSelectedBrand('all');
            setOffersOnly(true);
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      <Footer
        onNavigateSection={scrollToSection}
        onOpenTrackOrder={() => setTrackOrderOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemove={handleRemoveFromCart}
        onOrderPlaced={(order) => {
          setOrders((prev) => [order, ...prev]);
          setCart([]);
        }}
      />

      <WishlistDrawer
        open={wishlistOpen}
        items={wishlistProducts}
        onClose={() => setWishlistOpen(false)}
        onRemove={(id) =>
          setWishlistIds((prev) => prev.filter((item) => item !== id))
        }
        onMoveToCart={(product) => {
          handleAddToCart(product);
          setWishlistIds((prev) => prev.filter((id) => id !== product.id));
          setWishlistOpen(false);
          setCartOpen(true);
        }}
      />

      <TrackOrderModal
        open={trackOrderOpen}
        orders={orders}
        onClose={() => setTrackOrderOpen(false)}
      />

      <LoginModal
        open={loginOpen}
        currentUser={userName}
        onClose={() => setLoginOpen(false)}
        onLogin={(name) => {
          setUserName(name);
          try {
            localStorage.setItem('chokkalingam_user', name);
          } catch {
            // Ignore
          }
        }}
        onLogout={() => {
          setUserName(null);
          try {
            localStorage.removeItem('chokkalingam_user');
          } catch {
            // Ignore
          }
        }}
      />
    </div>
  );
}
