import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * OptimizedImage Component
 * Provides lazy loading, proper sizing, and loading states for images
 * Helps improve LCP and CLS metrics
 */
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Determine loading strategy
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={
        width && height
          ? {
              aspectRatio: `${width} / ${height}`,
            }
          : undefined
      }
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && <div className="absolute inset-0 bg-muted animate-pulse" />}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn('transition-opacity duration-300', isLoaded ? 'opacity-100' : 'opacity-0', className)}
        {...props}
      />
    </div>
  );
};
