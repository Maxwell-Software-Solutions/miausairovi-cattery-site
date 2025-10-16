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
  /** Sex of the kitten (male/female) */
  sex?: 'male' | 'female';
  /** Breed of the kitten */
  breed?: string;
  /** Color/pattern of the kitten */
  color?: string;
  /** Age description */
  age: string;
  /** Date of birth (ISO format) */
  dateOfBirth?: string;
  /** Current availability status */
  status: KittenStatus;
  /** Image URL for the kitten */
  image: string;
  /** Multiple images for gallery */
  images?: string[];
  /** Alt text for images */
  altText?: string;
  /** Optional detailed description */
  description?: string;
  /** Optional temperament notes */
  temperament?: string;
  /** Parent cats information */
  parents?: {
    mother?: string;
    father?: string;
  };
  /** Optional price information */
  price?: number;
  /** Link to full profile page */
  profileUrl?: string;
}

/**
 * Props for components that display kitten information
 */
export interface KittenCardProps {
  kitten: Kitten;
  index: number;
}
