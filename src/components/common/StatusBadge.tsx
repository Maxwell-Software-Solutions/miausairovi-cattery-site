/**
 * StatusBadge Component
 * Displays kitten availability status with consistent styling
 */

import { KittenStatus } from '@/types/kitten.types';

interface StatusBadgeProps {
  status: KittenStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = (status: KittenStatus): string => {
    switch (status) {
      case KittenStatus.Available:
        return 'bg-primary/10 text-primary';
      case KittenStatus.Reserved:
        return 'bg-accent/10 text-accent';
      case KittenStatus.NotReady:
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <span className={`inline-block text-xs px-2 py-1 rounded-full ${getStatusStyles(status)} ${className}`}>
      {status}
    </span>
  );
};
