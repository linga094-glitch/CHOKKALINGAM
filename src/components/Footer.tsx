import { Mail, MapPin, Phone } from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenTrackOrder: () => void;
}

export function Footer({ onNavigateSection, onOpenTrackOrder }: FooterProps) {
  return (
    <footer className="bg-[#0B2253] text-blue-100 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5">
            <p className="text-xl font-extrabold text-white tracking-tight">
              {STORE_INFO.fullName}
            </p>
            <p className="text-sm text-blue-100 leading-relaxed mt-3 max-w-md">
              100% original smartphones, mobile accessories, fast delivery, and dependable mobile service across Samsung, Vivo, OPPO, Realme, Redmi, Mi, iQOO, and OnePlus.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-white mb-3">Quick Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('smartphones')}
                  className="hover:text-white transition-colors"
                >
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('mobile-service')}
                  className="hover:text-white transition-colors"
                >
                  Mobile Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTrackOrder}
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <h3 className="text-sm font-bold text-white mb-3">Contact & Store</h3>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
              <a
                href={STORE_INFO.phoneHref}
                className="font-mono text-white hover:text-sky-300"
              >
                {STORE_INFO.phoneDisplay}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
              <a href={STORE_INFO.emailHref} className="hover:text-white">
                {STORE_INFO.email}
              </a>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{STORE_INFO.address}</span>
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-blue-200/80">
          <p>
            &copy; {new Date().getFullYear()} {STORE_INFO.fullName}. All rights reserved.
          </p>
          <p>100% Original Products · Fast Delivery · Secure Payment</p>
        </div>
      </div>
    </footer>
  );
}
