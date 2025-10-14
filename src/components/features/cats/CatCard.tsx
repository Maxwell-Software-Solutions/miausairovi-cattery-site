/**
 * CatCard Component
 * Displays detailed information about a breeding cat with image carousel
 */

import { Card } from '@/components/ui/card';
import { ImageCarousel } from '@/components/common/ImageCarousel';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { CatCardProps } from '@/types/cat.types';
import { AnimationDelay } from '@/types/common.types';

export const CatCard: React.FC<CatCardProps> = ({ cat, index }) => {
  const delay = Math.min(index % 4, 3) as AnimationDelay;

  return (
    <AnimatedSection delay={delay}>
      <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all bg-gradient-card h-full">
        <ImageCarousel
          images={cat.images || []}
          alt={`${cat.name}, ${cat.color} ${cat.breed} breeding cat at Miausairovi Cattery Peterborough`}
          priority={index === 0}
        />
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
    </AnimatedSection>
  );
};
