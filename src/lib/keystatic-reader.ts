import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

/**
 * Get all cats
 */
export async function getAllCats() {
  const cats = await reader.collections.cats.all();
  return cats
    .map((cat) => ({
      slug: cat.slug,
      ...cat.entry,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get a single cat by slug
 */
export async function getCatBySlug(slug: string) {
  const cat = await reader.collections.cats.read(slug);
  if (!cat) return null;
  return {
    slug,
    ...cat,
  };
}

/**
 * Get all kittens
 */
export async function getAllKittens() {
  const kittens = await reader.collections.kittens.all();
  return kittens.map((kitten) => ({
    slug: kitten.slug,
    ...kitten.entry,
  }));
}

/**
 * Get kittens by status
 */
export async function getKittensByStatus(status: 'available' | 'reserved' | 'sold') {
  const allKittens = await getAllKittens();
  return allKittens.filter((kitten) => kitten.status === status);
}

/**
 * Get all reviews
 */
export async function getAllReviews() {
  const reviews = await reader.collections.reviews.all();
  return reviews.map((review) => ({
    slug: review.slug,
    ...review.entry,
  }));
}

/**
 * Get featured reviews
 */
export async function getFeaturedReviews() {
  const allReviews = await getAllReviews();
  return allReviews.filter((review) => review.featured);
}

/**
 * Get all FAQs
 */
export async function getAllFAQs() {
  const faqs = await reader.collections.faqs.all();
  return faqs
    .map((faq) => ({
      slug: faq.slug,
      ...faq.entry,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get FAQs by category
 */
export async function getFAQsByCategory(category: string) {
  const allFAQs = await getAllFAQs();
  return allFAQs.filter((faq) => faq.category === category);
}

/**
 * Get homepage content
 */
export async function getHomepageContent() {
  return await reader.singletons.homepage.read();
}

/**
 * Get site settings
 */
export async function getSiteSettings() {
  return await reader.singletons.siteSettings.read();
}
