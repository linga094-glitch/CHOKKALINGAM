export const STORE_INFO = {
  brandPrimary: 'CHOKKALINGAM',
  brandSecondary: 'Mobile Shop',
  fullName: 'CHOKKALINGAM Mobile Shop',
  phoneDisplay: '+91 7904668810',
  phoneHref: 'tel:+917904668810',
  whatsappNumber: '917904668810',
  email: 'support@chokkalingammobiles.in',
  emailHref: 'mailto:support@chokkalingammobiles.in',
  address: 'Veppur, Chennai to Trichy Main Road, Tamil Nadu, India',
  storeHours: 'Mon – Sun · 9:30 AM – 9:30 PM',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Veppur+Chennai+to+Trichy+Main+Road+Tamil+Nadu+India',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Veppur,+Tamil+Nadu,+India&t=&z=14&ie=UTF8&iwloc=&output=embed',
};

export function buildWhatsAppUrl(message?: string): string {
  const defaultMsg =
    'Hello CHOKKALINGAM Mobile Shop, I would like to enquire about smartphones and accessories.';
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message || defaultMsg)}`;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
