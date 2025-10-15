/**
 * Cat data repository
 * Contains all breeding cat information
 */

import { Cat } from '@/types/cat.types';

export const catsData: Cat[] = [
  {
    slug: 'pukis',
    name: 'Pukis',
    breed: 'British Longhair',
    color: 'Golden Shaded',
    description: 'Our boy Grand Champion Diamondglow Pukis of Miausairovi.',
    titles: 'Grand Champion Pukis',
    images: [
      { src: '/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg', alt: 'Pukis - Grand Champion British Longhair' },
      { src: '/assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg', alt: 'Pukis - Golden Shaded British Longhair' },
      { src: '/assets/cats/Pukis/TICATSJAN25-3791-Edit.jpg', alt: 'Pukis - Show Quality British Longhair' },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'afina',
    name: 'Afina',
    breed: 'Scottish Fold',
    color: 'Marble',
    description: 'RW QGC Magic Marble Afina. Scottish fold girl.',
    titles: 'RW QGC Magic Marble',
    images: [
      { src: '/assets/cats/Afina/thumbnail_DSC_7997.jpg', alt: 'Afina - RW QGC Magic Marble Scottish Fold' },
      { src: '/assets/cats/Afina/thumbnail_DSC_7546.jpg', alt: 'Afina - Marble Scottish Fold' },
      { src: '/assets/cats/Afina/aUntitled-1.png', alt: 'Afina - Scottish Fold Portrait' },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'esmy',
    name: 'Esmy',
    breed: 'British Longhair',
    color: 'Female',
    description: 'Miausairovi Esmy, British longhair female.',
    titles: 'Miausairovi',
    images: [
      { src: '/assets/cats/Esmy/thumbnail_DSC_7929.jpg', alt: 'Esmy - British Longhair Female' },
      { src: '/assets/cats/Esmy/thumbnail_DSC_6854-Edit.jpg', alt: 'Esmy - Miausairovi British Longhair' },
    ],
    featured: true,
    order: 3,
  },
];

/**
 * Get a cat by its slug
 */
export const getCatBySlug = (slug: string): Cat | undefined => {
  return catsData.find((cat) => cat.slug === slug);
};

/**
 * Get all cats of a specific breed
 */
export const getCatsByBreed = (breed: string): Cat[] => {
  return catsData.filter((cat) => cat.breed === breed);
};

/**
 * Get all available cat breeds
 */
export const getAllBreeds = (): string[] => {
  return Array.from(new Set(catsData.map((cat) => cat.breed)));
};
