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
    breed: 'Scottish Fold',
    color: 'Black Golden Shaded',
    age: '8 weeks',
    dateOfBirth: '2025-08-15',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_0020.jpg',
    altText: 'Luna - female Scottish Fold kitten, black golden shaded colour',
    description: 'Sweet and playful girl with exceptional black golden shaded coat and round head.',
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
    color: 'Silk Golden Colour Point',
    age: '6 weeks',
    dateOfBirth: '2025-09-01',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_0099.jpg',
    altText: 'Oliver - male British Shorthair kitten, silk golden colour point',
    description: 'Confident boy with beautiful silk golden colour point and excellent head type.',
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
    breed: 'British Shorthair',
    color: 'Silver Tabby',
    age: '5 weeks',
    dateOfBirth: '2025-07-20',
    status: KittenStatus.Reserved,
    image: '/assets/cats/Kittens/thumbnail_DSC_1422.jpg',
    altText: 'Poppy - female British Shorthair kitten, silver tabby colour',
    description: 'Beautiful silver tabby girl with luxurious soft coat and sweet nature.',
    temperament: 'Gentle, calm, affectionate',
    parents: {
      mother: 'Afina',
      father: 'Pukis',
    },
  },
  {
    id: 4,
    name: 'Milo',
    sex: 'female',
    breed: 'British Shorthair',
    color: 'Silk Golden Colour Point',
    age: '12 weeks',
    dateOfBirth: '2025-08-22',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_2533.jpg',
    altText: 'Milo - female British Shorthair kitten, silk golden colour point',
    description: 'Adorable silk golden colour point girl with playful spirit.',
    temperament: 'Playful, social, affectionate',
    parents: {
      mother: 'Afina',
      father: 'Oliver',
    },
  },
  {
    id: 5,
    name: 'Iris',
    sex: 'male',
    breed: 'Scottish Straight',
    color: 'Chocolate Golden Shaded',
    age: '4 months',
    dateOfBirth: '2025-08-05',
    status: KittenStatus.Available,
    image: '/assets/cats/Kittens/thumbnail_DSC_2787.jpg',
    altText: 'Iris - male Scottish Straight kitten, chocolate golden shaded colour',
    description: 'Elegant boy with beautiful chocolate golden shading and straight ears.',
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
    color: 'Golden Chocolate Shaded',
    age: '5 weeks',
    dateOfBirth: '2025-09-08',
    status: KittenStatus.NotReady,
    image: '/assets/cats/Kittens/thumbnail_DSC_9882.jpg',
    altText: 'Jasper - male British Shorthair kitten, golden chocolate shaded colour',
    description: 'Charming golden chocolate shaded boy with exceptional temperament and coat quality.',
    temperament: 'Affectionate, playful, intelligent',
    parents: {
      mother: 'Afina',
      father: 'Pukis',
    },
  },
  {
    id: 7,
    name: 'Sophie',
    sex: 'male',
    breed: 'Scottish Fold Longhair',
    color: 'Blue Cream Tabby',
    age: '11 weeks',
    dateOfBirth: '2025-07-10',
    status: KittenStatus.Reserved,
    image: '/assets/cats/Kittens/thumbnail_DSC_9909.jpg',
    altText: 'Sophie - male Scottish Fold Longhair kitten, blue cream tabby colour',
    description: 'Stunning blue cream tabby boy with luxurious coat and sweet personality.',
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
