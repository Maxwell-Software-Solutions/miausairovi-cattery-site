/**
 * AnimatedSection Component
 * Wraps content with scroll-based animation
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedSectionProps } from '@/types/common.types';

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', delay = 0 }) => {
  const { ref, isVisible } = useScrollAnimation();
  const delayClass = delay > 0 ? `fade-in-delay-${delay}` : 'fade-in';

  return (
    <div ref={ref} className={`${isVisible ? delayClass : ''} ${className}`}>
      {children}
    </div>
  );
};
