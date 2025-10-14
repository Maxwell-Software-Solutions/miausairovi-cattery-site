/**
 * FeatureCard Component
 * Displays a feature with icon, title, and description
 */

import { Card } from '@/components/ui/card';
import { Feature } from '@/types/common.types';

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <Card className="p-6 shadow-soft hover:shadow-hover transition-all bg-gradient-card">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </Card>
  );
};
