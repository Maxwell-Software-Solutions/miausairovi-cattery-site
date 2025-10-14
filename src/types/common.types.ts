/**
 * Common/shared type definitions
 */

/**
 * Animation delay options for staggered animations
 */
export type AnimationDelay = 0 | 1 | 2 | 3;

/**
 * Props for animated sections
 */
export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: AnimationDelay;
}

/**
 * Props for page headers
 */
export interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

/**
 * Props for image carousel
 */
export interface ImageCarouselProps {
  images: string[];
  alt: string;
  autoRotate?: boolean;
  rotateInterval?: number;
  priority?: boolean;
}

/**
 * Feature card data structure (for home page features)
 */
export interface Feature {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/**
 * Navigation link structure
 */
export interface NavLink {
  path: string;
  label: string;
}

/**
 * Contact information structure
 */
export interface ContactInfo {
  email: string;
  location: string;
  locationDetails?: string;
  officeHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}
