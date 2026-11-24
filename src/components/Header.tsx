import { FormEvent, useState } from 'react';
import {
  Heart,
  Mail,
  MapPin,
  Menu,
  PackageSearch,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  wishlistCount: number;
  cartCount: number;
  userName: string | null;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  onOpenLogin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Smartphones', id: 'smartphones' },
  { label: 'Accessories', id: 'accessories' },
  { label: 'Mobile Service', id: 'mobile-service' },
  { label: 'Offers', id: 'offers' },
  { label: 'About Us', id: 'about-us' },
  { label: 'Contact Us', id: 'contact-us' },
];

export function Header({
  searchQuery,
  onSearchChange,
  wishlistCount,
  cartCount,
  userName,
  onOpenWishlist,
  onOpenCart,
  onOpenTrackOrder,
  onOpenLogin,
  onNavigateSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNavigateSection('products');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Top Contact & Utility Bar */}
      <div className="bg-[#0B2253] text-blue-100 text-xs border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <a
              href={STORE_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 text-white hover:text-sky-300 font-medium whitespace-nowrap shrink-0 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" />
              <span className="font-mono tabular-nums">{STORE_INFO.phoneDisplay}</span>
            </a>

            <a
              href={STORE_INFO.emailHref}
              className="hidden sm:inline-flex items-center gap-1.5 text-blue-100 hover:text-white whitespace-nowrap truncate transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" />
              <span>{STORE_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateSection('contact-us')}
              className="inline-flex items-center gap-1 text-blue-100 hover:text-white whitespace-nowrap shrink-0 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" />
              <span className="hidden xs:inline">Store Locator</span>
            </button>

            <button
              type="button"
              onClick={onOpenTrackOrder}
              className="inline-flex items-center gap-1 text-blue-100 hover:text-white whitespace-nowrap shrink-0 transition-colors"
            >
              <PackageSearch className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" />
              <span>Track Order</span>
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1 text-white hover:text-sky-300 font-medium whitespace-nowrap shrink-0 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-hidden="true" />
              <span>{userName ? userName : 'Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Store Bar: Logo, Search, Wishlist, Cart */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 lg:gap-8">
          {/* Professional Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('home');
            }}
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B2253] to-[#1D4ED8] flex items-center justify-center text-white shadow-xs shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <rect
                  x="6.5"
                  y="2.5"
                  width="11"
                  height="19"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M10.5 5.5H13.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="18" r="0.9" fill="currentColor" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="block text-base sm:text-lg font-extrabold tracking-tight text-[#0B2253] whitespace-nowrap">
                {STORE_INFO.brandPrimary}
              </span>
              <span className="block text-[11px] font-semibold text-[#1D4ED8] tracking-wide whitespace-nowrap mt-0.5">
                {STORE_INFO.brandSecondary}
              </span>
            </div>
          </a>

          {/* Search Bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl relative"
          >
            <label htmlFor="header-product-search" className="sr-only">
              Search smartphones, brands, and accessories
            </label>
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="header-product-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Samsung, OnePlus, Vivo, chargers, earbuds..."
              className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-[#1D4ED8] transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold transition-colors"
            >
              Search
            </button>
          </form>

          {/* Wishlist, Cart & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Open wishlist (${wishlistCount} items)`}
              className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-[#1D4ED8] bg-white hover:bg-blue-50/50 text-slate-800 transition-colors whitespace-nowrap"
            >
              <Heart className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-semibold">Wishlist</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-md bg-blue-100 text-[#0B2253] font-mono tabular-nums text-[11px] font-bold">
                {wishlistCount}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open shopping cart (${cartCount} items)`}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B2253] hover:bg-[#133273] text-white transition-colors whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4 text-sky-300" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-md bg-[#2563EB] text-white font-mono tabular-nums text-[11px] font-bold">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <nav
          aria-label="Store navigation"
          className="hidden lg:block border-t border-slate-100 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-6">
            <ul className="flex items-center gap-7 text-sm font-medium text-slate-700">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateSection(item.id);
                    }}
                    className="hover:text-[#1D4ED8] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
              {STORE_INFO.storeHours}
            </span>
          </div>
        </nav>

        {/* Mobile Search & Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search smartphones & accessories..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </form>

            <ul className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onNavigateSection(item.id);
                    }}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1D4ED8]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
