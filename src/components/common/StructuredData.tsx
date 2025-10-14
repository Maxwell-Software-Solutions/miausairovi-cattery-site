/**
 * Structured Data Components
 * JSON-LD schemas for rich snippets in search results
 */

import { Helmet } from 'react-helmet-async';
import { APP_CONFIG, CONTACT_INFO } from '@/config/constants';
import type { Cat } from '@/types/cat.types';

/**
 * Local Business Schema for homepage
 * Helps with local SEO and Google Maps
 */
export const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    '@id': 'https://miausairovi.com/#organization',
    name: APP_CONFIG.siteName,
    description: APP_CONFIG.siteDescription,
    url: 'https://miausairovi.com',
    logo: 'https://miausairovi.com/assets/logo.png',
    image: 'https://miausairovi.com/assets/logo.png',
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Peterborough',
      addressRegion: 'Cambridgeshire',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.5695,
      longitude: -0.2405,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    priceRange: '££',
    areaServed: [
      {
        '@type': 'City',
        name: 'Peterborough',
      },
      {
        '@type': 'City',
        name: 'Cambridge',
      },
      {
        '@type': 'City',
        name: 'Huntingdon',
      },
    ],
    sameAs: ['https://facebook.com/miausairovi', 'https://instagram.com/miausairovi'],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Breadcrumb Schema
 * Shows breadcrumb trail in search results
 */
export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Product Schema for breeding cats
 * Shows product information in search results
 */
export const ProductSchema = ({ cat }: { cat: Cat }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${cat.name} - ${cat.breed}`,
    description: cat.description,
    image: cat.images?.[0] || '',
    brand: {
      '@type': 'Brand',
      name: APP_CONFIG.siteName,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * FAQ Schema
 * Shows FAQ content directly in search results
 */
export const FAQSchema = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Review/Rating Schema
 * Shows star ratings in search results
 */
export const ReviewSchema = ({ rating = 5, reviewCount = 24 }: { rating?: number; reviewCount?: number }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: APP_CONFIG.siteName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
