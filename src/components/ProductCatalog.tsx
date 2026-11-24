import { useState } from 'react';
import { Check, Heart, ShoppingCart, Tag, X } from 'lucide-react';
import {
  BrandName,
  CATEGORY_TILES,
  CategorySlug,
  Product,
} from '../data/products';
import { formatInr, STORE_INFO, buildWhatsAppUrl } from '../data/storeConfig';
import { StoreImage } from './StoreImage';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CategorySlug | 'all';
  selectedBrand: BrandName | 'all';
  searchQuery: string;
  offersOnly: boolean;
  wishlistIds: string[];
  onSelectCategory: (cat: CategorySlug | 'all') => void;
  onSelectBrand: (brand: BrandName | 'all') => void;
  onToggleOffersOnly: () => void;
  onResetFilters: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductCatalog({
  products,
  selectedCategory,
  selectedBrand,
  searchQuery,
  offersOnly,
  wishlistIds,
  onSelectCategory,
  onSelectBrand,
  onToggleOffersOnly,
  onResetFilters,
  onToggleWishlist,
  onAddToCart,
}: ProductCatalogProps) {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="products" className="bg-white border-b border-slate-200 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-1">
              Store Catalog
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2253] tracking-tight">
              Featured Smartphones & Accessories
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleOffersOnly}
              aria-pressed={offersOnly}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                offersOnly
                  ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
              }`}
            >
              <Tag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Special Offers Only</span>
            </button>

            {(selectedCategory !== 'all' ||
              selectedBrand !== 'all' ||
              searchQuery.trim() !== '' ||
              offersOnly) && (
              <button
                type="button"
                onClick={onResetFilters}
                className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Segmented Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter store products by category"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-[#0B2253] text-white'
                : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300'
            }`}
          >
            All Products
          </button>
          {CATEGORY_TILES.map((cat) => {
            const active = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'bg-[#0B2253] text-white'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Active Filter Context Line */}
        {(selectedBrand !== 'all' || searchQuery.trim() !== '') && (
          <p className="text-sm text-slate-600 mb-6">
            Showing <span className="font-semibold text-[#0B2253]">{products.length}</span>{' '}
            {products.length === 1 ? 'product' : 'products'}
            {selectedBrand !== 'all' ? ` for ${selectedBrand}` : ''}
            {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}
          </p>
        )}

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-10 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-[#0B2253] mb-2">
              No matching products found
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              Try clearing your search or selecting another brand or category.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectBrand('all');
                onResetFilters();
              }}
              className="px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isAdded = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(product)}
                      className="w-full h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <StoreImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-pressed={isWishlisted}
                      aria-label={
                        isWishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      className={`absolute top-3 right-3 w-9 h-9 rounded-lg border flex items-center justify-center transition-colors ${
                        isWishlisted
                          ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                          : 'bg-white/95 border-slate-200 text-slate-600 hover:text-[#1D4ED8]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500 mb-1.5">
                      <span>
                        {product.brand} · {product.categoryLabel}
                      </span>
                      {product.offerTag && (
                        <span className="text-[#1D4ED8] font-semibold">
                          {product.offerTag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0B2253] leading-snug mb-2">
                      <button
                        type="button"
                        onClick={() => setQuickViewProduct(product)}
                        className="text-left hover:text-[#1D4ED8] transition-colors"
                      >
                        {product.name}
                      </button>
                    </h3>

                    <ul className="space-y-1 mb-4 flex-1">
                      {product.specs.map((spec) => (
                        <li
                          key={spec}
                          className="text-xs text-slate-600 flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#1D4ED8] shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold font-mono tabular-nums text-[#0B2253]">
                          {formatInr(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono tabular-nums text-slate-400 line-through">
                            {formatInr(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label="Close product details"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-lg bg-white/95 border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] w-full bg-slate-50 border-b border-slate-100">
              <StoreImage
                src={quickViewProduct.image}
                alt={quickViewProduct.imageAlt}
                fallbackTitle={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-xs font-medium text-slate-500 mb-1.5">
                {quickViewProduct.brand} · {quickViewProduct.categoryLabel}
              </p>
              <h3
                id="quick-view-title"
                className="text-2xl font-bold text-[#0B2253] mb-3"
              >
                {quickViewProduct.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold font-mono tabular-nums text-[#0B2253]">
                  {formatInr(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm font-mono tabular-nums text-slate-400 line-through">
                    {formatInr(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                {quickViewProduct.description}
              </p>

              <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                {quickViewProduct.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleAdd(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-semibold text-sm transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Cart</span>
                </button>
                <a
                  href={buildWhatsAppUrl(
                    `Hello ${STORE_INFO.fullName}, I want to enquire about ${quickViewProduct.name} (${formatInr(
                      quickViewProduct.price
                    )}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 hover:border-[#0B2253] text-[#0B2253] font-semibold text-sm transition-colors"
                >
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
