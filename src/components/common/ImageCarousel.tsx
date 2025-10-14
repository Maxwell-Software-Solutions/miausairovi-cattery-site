/**
 * ImageCarousel Component
 * Reusable image carousel with auto-rotation and navigation controls
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageCarouselProps } from '@/types/common.types';
import { ANIMATION_CONFIG } from '@/config/constants';

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt,
  autoRotate = true,
  rotateInterval = ANIMATION_CONFIG.carouselInterval,
  priority = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Normalize images to always be strings
  const normalizedImages = Array.isArray(images) ? images.map((img) => (typeof img === 'string' ? img : img.src)) : [];

  const hasMultipleImages = normalizedImages.length > 1;

  // Auto-rotate images
  useEffect(() => {
    if (!hasMultipleImages || !autoRotate) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [normalizedImages.length, hasMultipleImages, autoRotate, rotateInterval]);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (normalizedImages.length === 0) {
    return (
      <div className="aspect-square bg-secondary/20 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-6xl mb-2">🐱</p>
          <p className="text-sm">Photo coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-square bg-secondary/20 flex items-center justify-center relative group overflow-hidden">
      {/* Images */}
      {normalizedImages.map((image, idx) => (
        <img
          key={image}
          src={image}
          alt={`${alt} ${idx + 1}`}
          loading={priority && idx === 0 ? 'eager' : 'lazy'}
          fetchPriority={priority && idx === 0 ? 'high' : 'low'}
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Navigation Controls */}
      {hasMultipleImages && (
        <>
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
            onClick={goToPreviousImage}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
            onClick={goToNextImage}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {normalizedImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
