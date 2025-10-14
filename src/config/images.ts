/**
 * Image path configuration and preloading lists
 */

/**
 * High priority images (first visible on Cats/Gallery pages)
 * These should be preloaded immediately for better LCP
 */
export const HIGH_PRIORITY_IMAGES = [
  // First cat image (Pukis)
  '/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg',
  // First two kittens
  '/assets/cats/Kittens/thumbnail_DSC_0020.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_0099.jpg',
];

/**
 * Lower priority images (rest of carousel and gallery)
 * These can be preloaded with a delay
 */
export const LOW_PRIORITY_IMAGES = [
  // Rest of Pukis
  '/assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg',
  '/assets/cats/Pukis/TICATSJAN25-3791-Edit.jpg',
  // Afina
  '/assets/cats/Afina/thumbnail_DSC_7997.jpg',
  '/assets/cats/Afina/thumbnail_DSC_7546.jpg',
  '/assets/cats/Afina/aUntitled-1.png',
  // Esmy
  '/assets/cats/Esmy/thumbnail_DSC_7929.jpg',
  '/assets/cats/Esmy/thumbnail_DSC_6854-Edit.jpg',
  // Rest of Kittens
  '/assets/cats/Kittens/thumbnail_DSC_1422.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_2533.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_2787.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_9882.jpg',
  '/assets/cats/Kittens/thumbnail_DSC_9909.jpg',
];

/**
 * Logo and branding images
 */
export const BRAND_IMAGES = {
  logo: '/assets/logo.png',
  favicon: '/assets/favicon.png',
};
