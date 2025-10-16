/**
 * SEO Component
 * Manages dynamic meta tags, Open Graph, Twitter Cards, and canonical URLs
 */

import { Helmet } from 'react-helmet-async';
import { APP_CONFIG, CONTACT_INFO } from '@/config/constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'profile';
  canonicalUrl?: string;
  noindex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/assets/logo.png',
  type = 'website',
  canonicalUrl,
  noindex = false,
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://miausairovi.com';
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl);

  const fullTitle = title
    ? `${title} | ${APP_CONFIG.siteName}`
    : `${APP_CONFIG.siteName} - British Shorthair, British Longhair, Scottish Fold & Scottish Straight Breeder in Peterborough, UK`;

  const fullDescription =
    description ||
    'Professional British Shorthair, British Longhair, Scottish Fold and Scottish Straight cat breeding in Peterborough, UK. GCCF & TICA registered breeder offering healthy, pedigree kittens raised with love and care. View our beautiful cats and available kittens.';

  const defaultKeywords = [
    'British Shorthair breeder',
    'British Longhair breeder',
    'Scottish Fold breeder',
    'Scottish Straight breeder',
    'cat breeder Peterborough',
    'British Shorthair kittens UK',
    'British Longhair kittens UK',
    'Scottish Fold kittens UK',
    'Scottish Straight kittens UK',
    'pedigree kittens',
    'Miausairovi Cattery',
    'GCCF registered breeder',
    'TICA registered breeder',
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={APP_CONFIG.siteName} />
      <link rel="canonical" href={currentUrl} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content={APP_CONFIG.siteName} />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullImageUrl} />

      {/* Additional SEO */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo tags */}
      <meta name="geo.region" content="GB-PTE" />
      <meta name="geo.placename" content="Peterborough" />
      <meta name="geo.position" content="52.5695;-0.2405" />
      <meta name="ICBM" content="52.5695, -0.2405" />
    </Helmet>
  );
};
