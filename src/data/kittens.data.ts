/**
 * Kitten data repository
 * Contains all available kitten information
 */

import { Kitten, KittenStatus } from '@/types/kitten.types';

export const kittensData: Kitten[] = [
  {
    id: 1,
    name: 'Luna',
    sex: 'female',
    breed: 'British Shorthair',
    color: 'Blue',
    age: '8 weeks',
    dateOfBirth: '2025-08-15',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_0020.jpg',
    altText: 'Luna - female British Shorthair kitten, blue colour',
    description: 'Sweet and playful girl with exceptional blue coat and round head.',
    temperament: 'Playful, affectionate, curious',
    parents: {
      mother: 'Esmy',
      father: 'Pukis',
    },
  },
  {
    id: 2,
    name: 'Oliver',
    sex: 'male',
    breed: 'British Shorthair',
    color: 'Blue',
    age: '6 weeks',
    dateOfBirth: '2025-09-01',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_0099.jpg',
    altText: 'Oliver - male British Shorthair kitten, blue colour',
    description: 'Confident boy with beautiful blue colouring and excellent head type.',
    temperament: 'Confident, independent, gentle',
    parents: {
      mother: 'Esmy',
      father: 'Pukis',
    },
  },
  {
    id: 3,
    name: 'Poppy',
    sex: 'female',
    breed: 'British Longhair',
    color: 'Lilac',
    age: '10 weeks',
    dateOfBirth: '2025-07-20',
    status: KittenStatus.Reserved,
    image: '/assets/cats/Kittens/thumbnail_DSC_1422.jpg',
    altText: 'Poppy - female British Longhair kitten, lilac colour',
    description: 'Beautiful lilac girl with luxurious soft coat and sweet nature.',
    temperament: 'Gentle, calm, affectionate',
    parents: {
      mother: 'Afina',
      father: 'Pukis',
    },
  },
  {
    id: 4,
    name: 'Milo',
    sex: 'male',
    breed: 'Scottish Fold',
    color: 'Cream',
    age: '7 weeks',
    dateOfBirth: '2025-08-22',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_2533.jpg',
    altText: 'Milo - male Scottish Fold kitten, cream colour',
    description: 'Adorable cream boy with signature folded ears and playful spirit.',
    temperament: 'Playful, social, affectionate',
    parents: {
      mother: 'Afina',
      father: 'Oliver',
    },
  },
  {
    id: 5,
    name: 'Iris',
    sex: 'female',
    breed: 'Scottish Straight',
    color: 'Blue Shaded',
    age: '9 weeks',
    dateOfBirth: '2025-08-05',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_2787.jpg',
    altText: 'Iris - female Scottish Straight kitten, blue shaded colour',
    description: 'Elegant girl with beautiful blue shading and straight ears.',
    temperament: 'Calm, intelligent, observant',
    parents: {
      mother: 'Esmy',
      father: 'Pukis',
    },
  },
  {
    id: 6,
    name: 'Jasper',
    sex: 'male',
    breed: 'British Shorthair',
    color: 'Lilac',
    age: '5 weeks',
    dateOfBirth: '2025-09-08',
    status: KittenStatus.NotReady,
    image: '/assets/cats/Kittens/thumbnail_DSC_9882.jpg',
    altText: 'Jasper - male British Shorthair kitten, lilac colour',
    description: 'Charming lilac boy with exceptional temperament and coat quality.',
    temperament: 'Affectionate, playful, intelligent',
    parents: {
      mother: 'Afina',
      father: 'Pukis',
    },
  },
  {
    id: 7,
    name: 'Sophie',
    sex: 'female',
    breed: 'British Longhair',
    color: 'Blue Cream',
    age: '11 weeks',
    dateOfBirth: '2025-07-10',
    status: KittenStatus.Reserved,
    image: '/assets/cats/Kittens/thumbnail_DSC_9909.jpg',
    altText: 'Sophie - female British Longhair kitten, blue cream colour',
    description: 'Stunning blue cream girl with luxurious coat and sweet personality.',
    temperament: 'Calm, sociable, loving',
    parents: {
      mother: 'Esmy',
      father: 'Pukis',
    },
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
