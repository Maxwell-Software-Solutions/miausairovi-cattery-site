/**
 * ImageCarousel Component
 * Reusable image carousel with auto-rotation and full keyboard/accessibility support
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Normalize images to always be strings
  const normalizedImages = Array.isArray(images) ? images.map((img) => (typeof img === 'string' ? img : img.src)) : [];

  const hasMultipleImages = normalizedImages.length > 1;

  // Auto-rotate images
  useEffect(() => {
    if (!hasMultipleImages || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
    }, rotateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [normalizedImages.length, hasMultipleImages, isPlaying, rotateInterval]);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isFocused || !hasMultipleImages) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setCurrentImageIndex((prev) => (prev + 1) % normalizedImages.length);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentImageIndex((prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length);
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
        default:
          break;
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('keydown', handleKeyDown);
      return () => carousel.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFocused, hasMultipleImages, normalizedImages.length]);

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
    <div
      ref={carouselRef}
      className="aspect-square bg-secondary/20 flex items-center justify-center relative group overflow-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
      aria-live="polite"
      aria-atomic="true"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Live region for screen readers */}
      <div ref={liveRegionRef} className="sr-only" role="status" aria-live="assertive" aria-atomic="true">
        Image {currentImageIndex + 1} of {normalizedImages.length}
      </div>

      {/* Images */}
      {normalizedImages.map((image, idx) => (
        <img
          key={image}
          src={image}
          alt={`${alt} ${idx + 1}`}
          loading={priority && idx === 0 ? 'eager' : 'lazy'}
          fetchPriority={priority && idx === 0 ? 'high' : 'auto'}
          decoding="async"
          width="800"
          height="800"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
            onClick={goToPreviousImage}
            aria-label="Previous image"
            title="Previous image (Left Arrow or click)"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
            onClick={goToNextImage}
            aria-label="Next image"
            title="Next image (Right Arrow or click)"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            title={`${isPlaying ? 'Pause' : 'Play'} carousel (Space or click)`}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {normalizedImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToImage(idx)}
                className={`w-2 h-2 rounded-full transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to image ${idx + 1}`}
                aria-current={idx === currentImageIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
