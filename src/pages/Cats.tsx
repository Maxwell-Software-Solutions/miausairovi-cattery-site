import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Cat = {
  id: number;
  name: string;
  breed: string;
  color: string;
  description: string;
  titles: string;
  images?: string[];
};

const cats: Cat[] = [
  {
    id: 1,
    name: 'Pukis',
    breed: 'british longhair',
    color: 'Golden Shaded',
    description: 'Our boy Grand Champion Diamondglow Pukis of Miausairovi.',
    titles: 'Grand Champion Pukis',
    images: [
      '/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg',
      '/assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg',
      '/assets/cats/Pukis/TICATSJAN25-3791-Edit.jpg',
    ],
  },
  {
    id: 2,
    name: 'Afina',
    breed: 'Scottish Fold',
    color: 'Marble',
    description: 'RW QGC Magic Marble Afina. Scottish fold girl.',
    titles: 'RW QGC Magic Marble',
    images: [
      '/assets/cats/Afina/thumbnail_DSC_7997.jpg',
      '/assets/cats/Afina/thumbnail_DSC_7546.jpg',
      '/assets/cats/Afina/aUntitled-1.png',
    ],
  },
  {
    id: 3,
    name: 'Esmy',
    breed: 'British Longhair',
    color: 'Female',
    description: 'Miausairovi Esmy, British longhair female.',
    titles: 'Miausairovi',
    images: ['/assets/cats/Esmy/thumbnail_DSC_7929.jpg', '/assets/cats/Esmy/thumbnail_DSC_6854-Edit.jpg'],
  },
];

const CatCard = ({ cat, index }: { cat: Cat; index: number }) => {
  const cardAnimation = useScrollAnimation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasMultipleImages = cat.images && cat.images.length > 1;

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % cat.images!.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cat.images, hasMultipleImages]);

  const goToNextImage = () => {
    if (cat.images) {
      setCurrentImageIndex((prev) => (prev + 1) % cat.images.length);
    }
  };

  const goToPreviousImage = () => {
    if (cat.images) {
      setCurrentImageIndex((prev) => (prev - 1 + cat.images.length) % cat.images.length);
    }
  };

  return (
    <div ref={cardAnimation.ref} className={cardAnimation.isVisible ? `fade-in-delay-${Math.min(index % 4, 3)}` : ''}>
      <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all bg-gradient-card h-full">
        <div className="aspect-square bg-secondary/20 flex items-center justify-center relative group overflow-hidden">
          {cat.images && cat.images.length > 0 ? (
            <>
              {/* Render all images stacked, only show current one */}
              {cat.images.map((image, idx) => (
                <img
                  key={image}
                  src={image}
                  alt={`${cat.name} — ${cat.color} ${cat.breed}`}
                  loading={index === 0 && idx === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 && idx === 0 ? 'high' : 'low'}
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {hasMultipleImages && (
                <>
                  {/* Navigation Buttons */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
                    onClick={goToPreviousImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white"
                    onClick={goToNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {cat.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <p className="text-6xl mb-2">🐱</p>
              <p className="text-sm">Photo coming soon</p>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
          <p className="text-primary font-semibold mb-1">{cat.breed}</p>
          <p className="text-sm text-muted-foreground mb-3">Color: {cat.color}</p>
          <p className="text-sm mb-4">{cat.description}</p>
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-semibold text-primary">{cat.titles}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Cats = () => {
  const header = useScrollAnimation();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div ref={header.ref} className={header.isVisible ? 'fade-in' : ''}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Breeding Cats</h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Meet our exceptional breeding cats, each carefully selected for their outstanding qualities, health, and
            temperament.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cats.map((cat, index) => (
            <CatCard key={cat.id} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cats;
