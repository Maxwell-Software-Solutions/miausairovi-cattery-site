/**
 * Navigation configuration
 */

import { NavLink } from '@/types/common.types';

/**
 * Main navigation links
 */
export const NAV_LINKS: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/cats', label: 'Our Cats' },
  { path: '/gallery', label: 'Kittens' },
  { path: '/contact', label: 'Contact' },
];

/**
 * Footer quick links (can be different from main nav if needed)
 */
export const FOOTER_LINKS: NavLink[] = [
  { path: '/cats', label: 'Our Cats' },
  { path: '/gallery', label: 'Kittens Gallery' },
  { path: '/contact', label: 'Contact Us' },
];
