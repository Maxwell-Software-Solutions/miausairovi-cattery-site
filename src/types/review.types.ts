/**
 * Review-related type definitions
 */

/**
 * Represents a customer review
 */
export interface Review {
  /** Unique identifier for the review */
  id: number;
  /** Name of the reviewer */
  name: string;
  /** Star rating (1-5) */
  rating: number;
  /** Date of the review */
  date: string;
  /** Review comment text */
  comment: string;
  /** Platform where the review was posted */
  platform: string;
}

/**
 * Props for the Reviews component
 */
export interface ReviewsProps {
  /** Optional custom title */
  title?: string;
  /** Whether to show all reviews or just a subset */
  showAllReviews?: boolean;
}

/**
 * Props for individual review card
 */
export interface ReviewCardProps {
  review: Review;
}
