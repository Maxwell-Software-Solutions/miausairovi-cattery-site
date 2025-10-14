/**
 * Kitten data repository
 * Contains all available kitten information
 */

import { Kitten, KittenStatus } from '@/types/kitten.types';

export const kittensData: Kitten[] = [
  {
    id: 1,
    name: 'Kitten 1',
    age: '8 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_0020.jpg',
  },
  {
    id: 2,
    name: 'Kitten 2',
    age: '6 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_0099.jpg',
  },
  {
    id: 3,
    name: 'Kitten 3',
    age: '10 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_1422.jpg',
  },
  {
    id: 4,
    name: 'Kitten 4',
    age: '7 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_2533.jpg',
  },
  {
    id: 5,
    name: 'Kitten 5',
    age: '9 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_2787.jpg',
  },
  {
    id: 6,
    name: 'Kitten 6',
    age: '5 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_9882.jpg',
  },
  {
    id: 7,
    name: 'Kitten 7',
    age: '11 weeks',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_9909.jpg',
  },
];

/**
 * Get a kitten by its ID
 */
export const getKittenById = (id: number): Kitten | undefined => {
  return kittensData.find((kitten) => kitten.id === id);
};

/**
 * Get kittens by availability status
 */
export const getKittensByStatus = (status: KittenStatus): Kitten[] => {
  return kittensData.filter((kitten) => kitten.status === status);
};

/**
 * Get all available kittens
 */
export const getAvailableKittens = (): Kitten[] => {
  return getKittensByStatus(KittenStatus.Available);
};
