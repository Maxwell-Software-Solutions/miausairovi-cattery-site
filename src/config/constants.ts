/**
 * Application-wide constants and configuration
 */

import { ContactInfo } from '@/types/common.types';

/**
 * Application metadata and branding
 */
export const APP_CONFIG = {
  siteName: 'Miausairovi Cattery',
  siteDescription: 'Professional cat breeding with love and dedication',
  location: 'Peterborough, UK',
} as const;

/**
 * Contact information
 */
export const CONTACT_INFO: ContactInfo = {
  location: 'Peterborough, UK',
  locationDetails: 'Worldwide shipping available',
  officeHours: {
    weekday: 'Monday - Friday: 9am - 6pm',
    saturday: 'Saturday: 10am - 4pm',
    sunday: 'Sunday: By appointment',
  },
};

/**
 * Animation configuration
 */
export const ANIMATION_CONFIG = {
  /** Intersection Observer threshold for triggering animations */
  threshold: 0.1,
  /** Root margin for early/late triggering */
  rootMargin: '50px',
  /** Carousel auto-rotation interval in milliseconds */
  carouselInterval: 4000,
} as const;

/**
 * Form configuration
 */
export const FORM_CONFIG = {
  /** Email validation regex pattern */
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  /** Form submission endpoint */
  formSubmitUrl: 'https://formsubmit.co/ajax/vita.brasiunaite@gmail.com',
} as const;

/**
 * Page content
 */
export const PAGE_CONTENT = {
  home: {
    hero: {
      title: 'Welcome to Miausairovi Cattery',
      subtitle: 'Where passion meets excellence in feline breeding',
    },
    commitment: {
      title: 'Our Commitment to Excellence',
    },
    cta: {
      title: 'Looking for Your Perfect Companion?',
      subtitle: 'Visit our gallery to see our adorable kittens or contact us to learn more about our breeding program.',
    },
  },
  cats: {
    title: 'Our Breeding Cats',
    subtitle:
      'Meet our exceptional breeding cats, each carefully selected for their outstanding qualities, health, and temperament.',
  },
  gallery: {
    title: 'Kittens Gallery',
    subtitle:
      'Browse our adorable kittens currently available or coming soon. Each kitten is raised with love and care.',
    footer:
      'Interested in one of our kittens? Contact us to learn more about availability, pricing, and our adoption process.',
  },
  contact: {
    title: 'Get in Touch',
    subtitle: "Have questions about our cats or kittens? We'd love to hear from you.",
    formTitle: 'Send Us a Message',
    infoTitle: 'Contact Information',
  },
} as const;
