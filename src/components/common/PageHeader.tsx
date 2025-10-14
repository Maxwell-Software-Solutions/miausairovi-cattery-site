/**
 * PageHeader Component
 * Reusable page header with title and subtitle
 */

import { AnimatedSection } from './AnimatedSection';
import { PageHeaderProps } from '@/types/common.types';

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <AnimatedSection className={className}>
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{title}</h1>
      <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">{subtitle}</p>
    </AnimatedSection>
  );
};
