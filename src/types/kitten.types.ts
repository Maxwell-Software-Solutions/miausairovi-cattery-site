/**
 * Kitten-related type definitions
 */

/**
 * Status of a kitten's availability
 */
export enum KittenStatus {
  Available = 'Available',
  Reserved = 'Reserved',
  NotReady = 'Not Ready',
}

/**
 * Represents a kitten in the gallery
 */
export interface Kitten {
  /** Unique identifier for the kitten */
  id: number;
  /** Name of the kitten */
  name: string;
  /** Age description */
  age: string;
  /** Current availability status */
  status: KittenStatus;
  /** Image URL for the kitten */
  image: string;
  /** Optional detailed description */
  description?: string;
  /** Optional price information */
  price?: number;
}

/**
 * Props for components that display kitten information
 */
export interface KittenCardProps {
  kitten: Kitten;
  index: number;
}
