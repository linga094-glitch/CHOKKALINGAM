import { FormEvent, useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { STORE_INFO, buildWhatsAppUrl } from '../data/storeConfig';

interface ServiceOffersAboutContactProps {
  onFilterOffers: () => void;
}

const STORE_OFFERS = [
  {
    code: '01',
    title: 'Instant Exchange & Upgrade Desk',
    description:
      'Bring your existing Android smartphone or iPhone to get an instant trade-in value toward your new 5G device.',
    actionLabel: 'Browse Offer Models',
  },
  {
    code: '02',
    title: 'Free Screen Guard & Fitting',
    description:
      'Complimentary tempered glass fitting and full WhatsApp/contact data transfer on select smartphone purchases.',
    actionLabel: 'View Eligible Phones',
  },
  {
    code: '03',
    title: 'No-Cost EMI & Bank Cashback',
    description:
      'Flexible monthly EMI options with leading debit/credit cards and UPI instant discounts at checkout.',
    actionLabel: 'Explore Best Sellers',
  },
];

const SERVICE_CAPABILITIES = [
  'Display & Touch Glass Replacement',
  'Original-Grade Battery Replacement',
  'Charging Port & Speaker Cleaning/Repair',
  'Software Flashing, Backup & Data Recovery',
];

export function ServiceOffersAboutContact({
  onFilterOffers,
}: ServiceOffersAboutContactProps) {
  const [deviceModel, setDeviceModel] = useState('');
  const [issueText, setIssueText] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [serviceError, setServiceError] = useState('');
  const [serviceBooked, setServiceBooked] = useState<string | null>(null);

  const handleServiceSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!deviceModel.trim() || !issueText.trim() || !servicePhone.trim()) {
      setServiceError('Please enter your phone model, issue, and mobile number.');
      return;
    }
    if (!/^[+\d\s-]{7,15}$/.test(servicePhone.trim())) {
      setServiceError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setServiceError('');
    setServiceBooked(
      `Service request logged for ${deviceModel.trim()}. Our technician will contact ${servicePhone.trim()} shortly.`
    );
    setDeviceModel('');
    setIssueText('');
    setServicePhone('');
  };

  return (
    <>
      {/* Offers Section */}
      <section id="offers" className="bg-slate-50 border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-1">
                Exclusive Store Deals
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2253] tracking-tight">
                Current Offers & Upgrade Benefits
              </h2>
            </div>
            <button
              type="button"
              onClick={onFilterOffers}
              className="text-sm font-semibold text-[#1D4ED8] hover:underline self-start md:self-auto"
            >
              Filter products with offers &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STORE_OFFERS.map((offer) => (
              <div
                key={offer.code}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-xs font-mono font-bold text-[#1D4ED8] mb-3">
                    {offer.code}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B2253] mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {offer.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onFilterOffers}
                  className="self-start text-xs font-bold text-[#1D4ED8] hover:text-[#0B2253] transition-colors"
                >
                  {offer.actionLabel} &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Service Section */}
      <section id="mobile-service" className="bg-white border-b border-slate-200 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-2">
                Mobile Service & Repair Center
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2253] tracking-tight mb-4">
                Fast, Reliable Smartphone Repair
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Trained technicians at {STORE_INFO.fullName} handle screen replacements, battery swaps, charging port fixes, and software diagnostics using tested spare components.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {SERVICE_CAPABILITIES.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-sm font-medium text-[#0B2253]"
                  >
                    <Wrench className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="w-5 h-5 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                <span>Free initial checkup & transparent repair estimate before work starts.</span>
              </div>
            </div>

            {/* Service Booking Form */}
            <form
              onSubmit={handleServiceSubmit}
              noValidate
              className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8"
            >
              <h3 className="text-lg font-bold text-[#0B2253] mb-1">
                Book a Mobile Service Checkup
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Share your device model and issue for a quick estimate or callback.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="service-device" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Brand & Model
                  </label>
                  <input
                    id="service-device"
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. Samsung Galaxy A54 / OnePlus Nord"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label htmlFor="service-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Contact Mobile Number
                  </label>
                  <input
                    id="service-phone"
                    type="tel"
                    value={servicePhone}
                    onChange={(e) => setServicePhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label htmlFor="service-issue" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Describe the Issue
                  </label>
                  <textarea
                    id="service-issue"
                    rows={3}
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="Cracked display, battery drain, charging port loose..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                {serviceError && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {serviceError}
                  </p>
                )}

                {serviceBooked && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{serviceBooked}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-5 py-3 rounded-lg bg-[#0B2253] hover:bg-[#133273] text-white font-semibold text-sm transition-colors"
                >
                  Request Service Callback
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="bg-[#0B2253] text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">
                About Us
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                CHOKKALINGAM Mobile Shop — Trusted Multi-Brand Mobile Destination
              </h2>
              <p className="text-blue-100 text-base leading-relaxed mb-4">
                Located along the Chennai to Trichy Main Road in Veppur, Tamil Nadu, CHOKKALINGAM Mobile Shop brings genuine smartphones from Samsung, Vivo, OPPO, Realme, Redmi, Mi, iQOO, and OnePlus together under one roof.
              </p>
              <p className="text-blue-100 text-base leading-relaxed">
                From helping families choose their first 5G handset to supplying tested fast chargers, TWS audio, smartwatches, and same-day repair support, we combine honest advice with dependable after-sales care.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-2xl font-extrabold font-mono text-white">8+</p>
                <p className="text-xs text-blue-100 mt-1">Leading Smartphone Brands</p>
              </div>
              <div className="p-5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-2xl font-extrabold font-mono text-white">100%</p>
                <p className="text-xs text-blue-100 mt-1">Original Sealed Products</p>
              </div>
              <div className="p-5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-2xl font-extrabold font-mono text-white">Same Day</p>
                <p className="text-xs text-blue-100 mt-1">Local Delivery & Service</p>
              </div>
              <div className="p-5 rounded-xl bg-white/10 border border-white/15">
                <p className="text-2xl font-extrabold font-mono text-white">7 Days</p>
                <p className="text-xs text-blue-100 mt-1">Open Every Week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us & Store Locator */}
      <section id="contact-us" className="bg-slate-50 py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold text-[#1D4ED8] uppercase tracking-wider mb-1">
              Contact Us & Store Locator
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2253] tracking-tight">
              Visit CHOKKALINGAM Mobile Shop
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Phone & WhatsApp</p>
                    <a
                      href={STORE_INFO.phoneHref}
                      className="text-lg font-bold font-mono tabular-nums text-[#0B2253] hover:text-[#1D4ED8]"
                    >
                      {STORE_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Email Support</p>
                    <a
                      href={STORE_INFO.emailHref}
                      className="text-sm font-semibold text-[#0B2253] hover:text-[#1D4ED8] break-all"
                    >
                      {STORE_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Store Address</p>
                    <p className="text-sm font-semibold text-[#0B2253] mt-0.5">
                      {STORE_INFO.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{STORE_INFO.storeHours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={STORE_INFO.phoneHref}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Call Store</span>
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                  <span className="text-sm font-bold text-[#0B2253]">
                    Store Locator · Veppur, Tamil Nadu
                  </span>
                </div>
                <a
                  href={STORE_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B2253] hover:bg-[#133273] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>

              <iframe
                title="CHOKKALINGAM Mobile Shop Location Map"
                src={STORE_INFO.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 min-h-[300px] border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
