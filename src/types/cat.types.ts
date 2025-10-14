/**
 * Cat-related type definitions
 */

/**
 * Represents a breeding cat in the cattery
 */
export interface Cat {
  /** Unique slug identifier for the cat */
  slug: string;
  /** Name of the cat */
  name: string;
  /** Breed of the cat */
  breed: string;
  /** Color/pattern description */
  color: string;
  /** Detailed description of the cat */
  description: string;
  /** Titles and achievements */
  titles: string | string[];
  /** Array of images with src and alt text */
  images?: Array<{ src: string; alt: string }>;
  /** Whether the cat is featured */
  featured: boolean;
  /** Sort order */
  order: number;
}

/**
 * Props for components that display cat information
 */
export interface CatCardProps {
  cat: Cat;
  index: number;
}
