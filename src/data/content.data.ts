/**
 * Static content data
 * Contains feature descriptions, about text, and other static content
 */

import { Award, Stethoscope, Users } from 'lucide-react';
import { Feature } from '@/types/common.types';

/**
 * Homepage feature cards data
 */
export const featuresData: Feature[] = [
  {
    id: 1,
    icon: Award,
    title: 'Ethical Breeding Program',
    description:
      'At Miausairovi, we are passionate, ethical breeders dedicated to raising healthy, well-socialised, and beautiful purebred cats. Our breeding program focuses on exceptional temperament, conformation, and genetic health. We carefully select our breeding lines to ensure we produce kittens that meet breed standards while prioritising health and personality.',
  },
  {
    id: 2,
    icon: Stethoscope,
    title: 'Health & Care Guarantee',
    description:
      'Each of our cats is part of our family, raised in a clean, loving home environment with plenty of social interaction, enrichment, and veterinary care. All kittens are vaccinated, dewormed, and come with a health guarantee and pedigree documentation to ensure your peace of mind.',
  },
  {
    id: 3,
    icon: Users,
    title: 'Your Perfect Match',
    description:
      "Whether you're looking for a loving companion or a show-quality kitten, we are committed to helping you find the perfect feline addition to your family. We take the time to understand your needs and match you with a kitten that suits your lifestyle and expectations.",
  },
];

/**
 * Call schedule options for contact form
 */
export const callScheduleOptions = [
  { value: 'morning-9-12', label: 'Morning (9am - 12pm)' },
  { value: 'afternoon-12-3', label: 'Afternoon (12pm - 3pm)' },
  { value: 'afternoon-3-6', label: 'Late Afternoon (3pm - 6pm)' },
  { value: 'weekend-morning', label: 'Weekend Morning (10am - 12pm)' },
  { value: 'weekend-afternoon', label: 'Weekend Afternoon (12pm - 4pm)' },
];
