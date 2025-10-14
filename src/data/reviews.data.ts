/**
 * Review data repository
 * Contains customer reviews and testimonials
 */

import { Review } from '@/types/review.types';

export const reviewsData: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: 'September 2024',
    comment:
      "We got our beautiful British Shorthair kitten from Miausairovi and couldn't be happier! The breeder was so knowledgeable and caring. Our kitten came home healthy, well-socialized, and with all the documentation. Highly recommend!",
    platform: 'Facebook',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: 'August 2024',
    comment:
      'Exceptional cattery! The attention to detail and care for their cats is evident in every aspect. Our Persian kitten is absolutely gorgeous and has the sweetest temperament. Thank you for our perfect companion!',
    platform: 'Facebook',
  },
  {
    id: 3,
    name: 'Emma Williams',
    rating: 5,
    date: 'July 2024',
    comment:
      'Professional, ethical, and passionate breeders. They took time to answer all our questions and made sure we were the right fit for their kitten. The follow-up support has been amazing. Our kitten is thriving!',
    platform: 'Facebook',
  },
];

/**
 * Calculate the average rating from all reviews
 */
export const getAverageRating = (): string => {
  if (reviewsData.length === 0) return '0.0';
  const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviewsData.length).toFixed(1);
};

/**
 * Get reviews by rating
 */
export const getReviewsByRating = (rating: number): Review[] => {
  return reviewsData.filter((review) => review.rating === rating);
};

/**
 * Get total review count
 */
export const getTotalReviewCount = (): number => {
  return reviewsData.length;
};
