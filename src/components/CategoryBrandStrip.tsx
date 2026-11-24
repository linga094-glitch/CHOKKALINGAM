import {
  BrandName,
  CATEGORY_TILES,
  CategorySlug,
  FEATURED_BRANDS,
} from '../data/products';
import { StoreImage } from './StoreImage';

interface CategoryBrandStripProps {
  selectedCategory: CategorySlug | 'all';
  selectedBrand: BrandName | 'all';
  onSelectCategory: (slug: CategorySlug) => void;
  onSelectBrand: (brand: BrandName | 'all') => void;
}

export function CategoryBrandStrip({
  selectedCategory,
  selectedBrand,
  onSelectCategory,
  onSelectBrand,
}: CategoryBrandStripProps) {
  return (
    <>
      {/* 9 Image-Based Categories */}
      <section className="bg-white border-b border-slate-200 py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-1">
                Shop by Category
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2253] tracking-tight">
                Smartphones & Mobile Accessories
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              Select a category to jump straight to matching products
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORY_TILES.map((tile) => {
              const isActive = selectedCategory === tile.slug;
              return (
                <button
                  key={tile.slug}
                  type="button"
                  onClick={() => onSelectCategory(tile.slug)}
                  className={`group text-left rounded-xl overflow-hidden border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] ${
                    isActive
                      ? 'border-[#1D4ED8] bg-blue-50/70 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-blue-300 hover:-translate-y-0.5 hover:shadow-sm'
                  }`}
                >
                  <div className="aspect-[4/3] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
                    <StoreImage
                      src={tile.image}
                      alt={tile.imageAlt}
                      fallbackTitle={tile.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-3.5">
                    <h3
                      className={`text-sm font-bold leading-snug ${
                        isActive ? 'text-[#1D4ED8]' : 'text-[#0B2253]'
                      }`}
                    >
                      {tile.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {tile.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Logos Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <h2 className="text-lg font-bold text-[#0B2253] tracking-tight">
              Shop Popular Smartphone Brands
            </h2>
            {selectedBrand !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectBrand('all')}
                className="text-xs font-semibold text-[#1D4ED8] hover:underline self-start sm:self-auto"
              >
                Show All Brands
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {FEATURED_BRANDS.map((brand) => {
              const isSelected = selectedBrand === brand.name;
              return (
                <button
                  key={brand.name}
                  type="button"
                  onClick={() =>
                    onSelectBrand(isSelected ? 'all' : brand.name)
                  }
                  aria-pressed={isSelected}
                  className={`group px-3 py-4 rounded-xl border text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] ${
                    isSelected
                      ? 'bg-[#0B2253] text-white border-[#0B2253] shadow-sm'
                      : 'bg-white hover:bg-blue-50/50 text-[#0B2253] border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <span
                    className={`block text-base sm:text-lg font-extrabold tracking-tight ${
                      brand.name === 'Samsung' ? 'tracking-wider' : ''
                    }`}
                  >
                    {brand.name}
                  </span>
                  <span
                    className={`block text-[11px] mt-1 truncate ${
                      isSelected ? 'text-sky-200' : 'text-slate-500'
                    }`}
                  >
                    {brand.styleNote}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
