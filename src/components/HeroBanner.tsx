import { ArrowRight, ShieldCheck, Truck, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_BANNER_IMAGE } from '../data/products';
import { StoreImage } from './StoreImage';

interface HeroBannerProps {
  onShopNow: () => void;
  onViewOffers: () => void;
}

const TRUST_HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: '100% Original Products',
    subtitle: 'Sealed brand warranty & GST invoice',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    subtitle: 'Same-day local dispatch & store pickup',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    subtitle: 'UPI, Cards, EMI & Cash on Delivery',
  },
];

export function HeroBanner({ onShopNow, onViewOffers }: HeroBannerProps) {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-[#0B2253] via-[#102E6E] to-[#1D4ED8] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-sky-200 tracking-wide mb-3">
              CHOKKALINGAM Mobile Shop · Authorized Multi-Brand Retail
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-white mb-5 max-w-xl">
              Latest Smartphones at Best Price
            </h1>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed mb-8 max-w-[54ch]">
              Explore flagship 5G phones, everyday Android smartphones, genuine fast chargers, wireless audio, smartwatches, and expert mobile care—all backed by transparent store pricing.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onShopNow}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white hover:bg-blue-50 text-[#0B2253] font-bold text-base shadow-sm transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onViewOffers}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-white/30 hover:bg-white/10 text-white font-semibold text-base transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Explore Offers
              </button>
            </div>

            {/* 3 Hero Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15">
              {TRUST_HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-sky-300" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {item.title}
                      </p>
                      <p className="text-xs text-blue-100 mt-0.5 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Hero Flagship Smartphone Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="h-full min-h-[260px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-white/20 bg-white shadow-xl">
              <StoreImage
                src={HERO_BANNER_IMAGE}
                alt="Latest 5G flagship smartphones at CHOKKALINGAM Mobile Shop"
                fallbackTitle="Latest Smartphones at Best Price"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
