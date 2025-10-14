/**
 * Cat-related type definitions
 */

/**
 * Represents a breeding cat in the cattery
 */
export interface Cat {
  /** Unique identifier for the cat */
  id: number;
  /** Name of the cat */
  name: string;
  /** Breed of the cat */
  breed: string;
  /** Color/pattern description */
  color: string;
  /** Detailed description of the cat */
  description: string;
  /** Titles and achievements */
  titles: string;
  /** Array of image URLs for the cat */
  images?: string[];
}

/**
 * Props for components that display cat information
 */
export interface CatCardProps {
  cat: Cat;
  index: number;
}
