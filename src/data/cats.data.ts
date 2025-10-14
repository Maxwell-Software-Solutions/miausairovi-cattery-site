/**
 * Cat data repository
 * Contains all breeding cat information
 */

import { Cat } from '@/types/cat.types';

export const catsData: Cat[] = [
  {
    id: 1,
    name: 'Pukis',
    breed: 'British Longhair',
    color: 'Golden Shaded',
    description: 'Our boy Grand Champion Diamondglow Pukis of Miausairovi.',
    titles: 'Grand Champion Pukis',
    images: [
      '/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg',
      '/assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg',
      '/assets/cats/Pukis/TICATSJAN25-3791-Edit.jpg',
    ],
  },
  {
    id: 2,
    name: 'Afina',
    breed: 'Scottish Fold',
    color: 'Marble',
    description: 'RW QGC Magic Marble Afina. Scottish fold girl.',
    titles: 'RW QGC Magic Marble',
    images: [
      '/assets/cats/Afina/thumbnail_DSC_7997.jpg',
      '/assets/cats/Afina/thumbnail_DSC_7546.jpg',
      '/assets/cats/Afina/aUntitled-1.png',
    ],
  },
  {
    id: 3,
    name: 'Esmy',
    breed: 'British Longhair',
    color: 'Female',
    description: 'Miausairovi Esmy, British longhair female.',
    titles: 'Miausairovi',
    images: ['/assets/cats/Esmy/thumbnail_DSC_7929.jpg', '/assets/cats/Esmy/thumbnail_DSC_6854-Edit.jpg'],
  },
];

/**
 * Get a cat by its ID
 */
export const getCatById = (id: number): Cat | undefined => {
  return catsData.find((cat) => cat.id === id);
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
