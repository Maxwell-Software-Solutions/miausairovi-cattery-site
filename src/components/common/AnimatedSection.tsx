/**
 * AnimatedSection Component
 * Wraps content with scroll-based animation
 * Optimized to reduce initial render cost
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedSectionProps } from '@/types/common.types';
import { memo } from 'react';

const AnimatedSectionComponent: React.FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation();
  const delayClass = delay > 0 ? `fade-in-delay-${delay}` : 'fade-in';

  return (
    <div ref={ref} className={`${isVisible ? delayClass : ''} ${className}`}>
      {children}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export const AnimatedSection = memo(AnimatedSectionComponent);
