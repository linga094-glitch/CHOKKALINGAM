import { useState } from 'react';
import { Smartphone } from 'lucide-react';

interface StoreImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function StoreImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'CHOKKALINGAM Mobile Shop',
}: StoreImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-[#0B2253] p-4 text-center ${className}`}
      >
        <Smartphone className="w-7 h-7 text-[#1D4ED8] mb-1.5 opacity-80" strokeWidth={1.6} />
        <span className="text-xs font-semibold max-w-[18ch] leading-snug">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
