import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ArchImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

export function ArchImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[4/3]',
  priority = false,
}: ArchImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-gradient-to-br from-[#14283B] via-[#1C3750] to-[#167D83]/70 flex flex-col items-center justify-center p-6 text-center ${aspectClass} ${className}`}
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, #F7FAFB 1px, transparent 1px), linear-gradient(to bottom, #F7FAFB 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <Building2 className="relative z-10 w-8 h-8 text-[#BE9473] mb-3" aria-hidden="true" />
        <p className="relative z-10 text-xs font-medium text-[#F7FAFB]/80 max-w-xs leading-relaxed">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#E6EBED] ${aspectClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 ease-out"
      />
    </div>
  );
}
