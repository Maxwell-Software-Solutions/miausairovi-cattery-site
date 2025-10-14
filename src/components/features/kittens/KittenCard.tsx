/**
 * KittenCard Component
 * Displays a kitten with image and availability status
 */

import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { KittenCardProps, KittenStatus } from '@/types/kitten.types';
import { AnimationDelay } from '@/types/common.types';

export const KittenCard: React.FC<KittenCardProps> = ({ kitten, index }) => {
  const delay = Math.min(index % 4, 3) as AnimationDelay;

  return (
    <AnimatedSection delay={delay}>
      <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all bg-gradient-card">
        <div className="aspect-square bg-secondary/20 flex items-center justify-center">
          <img
            src={kitten.image}
            alt={`${kitten.name}, ${kitten.age} ${
              kitten.status === 'available' ? 'available' : ''
            } British Shorthair kitten at Miausairovi Cattery Peterborough UK`}
            loading={index < 4 ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? 'high' : 'low'}
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-1">{kitten.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">Age: {kitten.age}</p>
          <StatusBadge status={kitten.status} />
        </div>
      </Card>
    </AnimatedSection>
  );
};
