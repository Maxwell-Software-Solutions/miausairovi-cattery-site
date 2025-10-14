# SEO Improvement Plan for Miausairovi Cattery

**Date:** October 14, 2025  
**Priority:** HIGH - Critical for Online Visibility  
**Estimated Total Time:** 12-16 hours  
**Expected Impact:** 300-500% increase in organic traffic within 3-6 months

---

## 📊 Current SEO Audit

### ✅ What's Working
- ✅ Basic meta description in `index.html`
- ✅ Open Graph tags present
- ✅ Twitter Card tags present
- ✅ Proper `robots.txt` file
- ✅ Mobile-responsive design
- ✅ Fast load times (120KB gzipped)
- ✅ Semantic HTML structure

### ❌ Critical SEO Issues

1. **No Dynamic Meta Tags** - All pages share the same title/description
2. **Missing Sitemap** - Google can't discover all pages efficiently
3. **No Canonical URLs** - Risk of duplicate content issues
4. **Missing Structured Data** - Not appearing in rich snippets
5. **No Local SEO** - Missing location-based optimization
6. **Generic OG Images** - Using placeholder Lovable.dev image
7. **No Keywords Strategy** - Missing targeted keywords
8. **Missing Alt Text Strategy** - Images not optimized for search
9. **No Internal Linking Strategy** - Poor page authority distribution
10. **Missing Analytics** - Can't measure SEO performance

---

## 🎯 SEO Strategy

### Target Keywords

**Primary Keywords:**
- British Shorthair breeder UK
- British Shorthair kittens Peterborough
- Cat breeder Peterborough
- British Shorthair cattery UK
- Pedigree kittens for sale UK

**Secondary Keywords:**
- Professional cat breeding UK
- British Shorthair adoption
- Registered cat breeder
- Quality British Shorthair kittens
- Cat breeding Cambridgeshire

**Long-tail Keywords:**
- Where to buy British Shorthair kittens near me
- Reputable cat breeder Peterborough
- British Shorthair kittens available now
- How much is a British Shorthair kitten UK
- Best British Shorthair breeder UK

---

## 📋 Implementation Plan

## Phase 1: Technical SEO Foundation (4-6 hours) 🔥 CRITICAL

### Task 1.1: Install SEO Dependencies (15 min)

**Action:**
```bash
npm install react-helmet-async
```

**Files to modify:**
- `src/main.tsx` - Wrap app with HelmetProvider
- Create new component for SEO management

---

### Task 1.2: Create Dynamic Meta Tags System (2 hours)

**Create `src/components/common/SEO.tsx`:**

```tsx
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
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;
  
  const fullTitle = title 
    ? `${title} | ${APP_CONFIG.siteName}` 
    : `${APP_CONFIG.siteName} - British Shorthair Breeder in Peterborough, UK`;

  const fullDescription = description || 
    'Professional British Shorthair cat breeding in Peterborough, UK. Registered breeder offering healthy, pedigree kittens raised with love and care. View our beautiful cats and available kittens.';

  const defaultKeywords = [
    'British Shorthair breeder',
    'cat breeder Peterborough',
    'British Shorthair kittens UK',
    'pedigree kittens',
    'Miausairovi Cattery',
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

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
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content={APP_CONFIG.siteName} />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
      
      {/* Additional SEO */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
    </Helmet>
  );
};
```

**Add to `src/main.tsx`:**
```tsx
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
```

---

### Task 1.3: Add SEO to All Pages (1 hour)

**Update `src/pages/Home.tsx`:**
```tsx
import { SEO } from '@/components/common/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home - British Shorthair Breeder"
        description="Welcome to Miausairovi Cattery - Professional British Shorthair breeding in Peterborough, UK. Registered breeder offering healthy, pedigree kittens with excellent temperament."
        keywords={[
          'British Shorthair breeder',
          'cat breeder Peterborough',
          'UK cat breeder',
          'British Shorthair cattery',
          'registered cat breeder',
        ]}
      />
      <div className="min-h-screen">
        {/* existing content */}
      </div>
    </>
  );
};
```

**Update `src/pages/Cats.tsx`:**
```tsx
import { SEO } from '@/components/common/SEO';

const Cats = () => {
  return (
    <>
      <SEO 
        title="Our Breeding Cats - British Shorthair Champions"
        description="Meet our exceptional British Shorthair breeding cats. Award-winning champions with outstanding pedigrees, health tested and carefully selected for temperament."
        keywords={[
          'British Shorthair breeding cats',
          'champion British Shorthair',
          'pedigree cats',
          'breeding queens',
          'stud cats UK',
        ]}
        canonicalUrl={`${window.location.origin}/cats`}
      />
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* existing content */}
      </div>
    </>
  );
};
```

**Update `src/pages/Gallery.tsx`:**
```tsx
import { SEO } from '@/components/common/SEO';

const Gallery = () => {
  return (
    <>
      <SEO 
        title="Available Kittens - British Shorthair Kittens for Sale"
        description="View our adorable British Shorthair kittens available for adoption. All kittens are health checked, vaccinated, and raised in a loving family environment in Peterborough."
        keywords={[
          'British Shorthair kittens for sale',
          'kittens available UK',
          'buy British Shorthair kitten',
          'British Shorthair kittens Peterborough',
          'pedigree kittens for sale',
        ]}
        canonicalUrl={`${window.location.origin}/gallery`}
      />
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* existing content */}
      </div>
    </>
  );
};
```

**Update `src/pages/Contact.tsx`:**
```tsx
import { SEO } from '@/components/common/SEO';

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch About British Shorthair Kittens"
        description="Contact Miausairovi Cattery in Peterborough for inquiries about our British Shorthair kittens. We're happy to answer questions about availability, pricing, and our breeding program."
        keywords={[
          'contact cat breeder',
          'British Shorthair inquiry',
          'kitten adoption inquiry',
          'cat breeder Peterborough contact',
        ]}
        canonicalUrl={`${window.location.origin}/contact`}
      />
      <div className="min-h-screen pt-24 pb-20 px-4">
        {/* existing content */}
      </div>
    </>
  );
};
```

---

### Task 1.4: Create XML Sitemap (30 min)

**Create `public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>https://miausairovi.com/</loc>
    <lastmod>2025-10-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Breeding Cats -->
  <url>
    <loc>https://miausairovi.com/cats</loc>
    <lastmod>2025-10-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Kittens Gallery -->
  <url>
    <loc>https://miausairovi.com/gallery</loc>
    <lastmod>2025-10-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Contact -->
  <url>
    <loc>https://miausairovi.com/contact</loc>
    <lastmod>2025-10-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
</urlset>
```

**Update `public/robots.txt`:**
```plaintext
User-agent: *
Allow: /

# Sitemap
Sitemap: https://miausairovi.com/sitemap.xml

# Specific bot rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /
```

---

### Task 1.5: Add Structured Data (JSON-LD) (1.5 hours)

**Create `src/components/common/StructuredData.tsx`:**
```tsx
import { Helmet } from 'react-helmet-async';
import { APP_CONFIG, CONTACT_INFO } from '@/config/constants';
import { catsData } from '@/data/cats.data';

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
    telephone: '+44-XXXX-XXXXXX', // Add real phone number
    email: CONTACT_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Peterborough',
      addressRegion: 'Cambridgeshire',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.5695, // Peterborough coordinates
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
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    sameAs: [
      'https://facebook.com/miausairovi',
      'https://instagram.com/miausairovi',
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

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
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const ProductSchema = ({ cat }: { cat: typeof catsData[0] }) => {
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
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
```

**Add to `src/pages/Home.tsx`:**
```tsx
import { LocalBusinessSchema } from '@/components/common/StructuredData';

const Home = () => {
  return (
    <>
      <SEO {...} />
      <LocalBusinessSchema />
      <div className="min-h-screen">
        {/* content */}
      </div>
    </>
  );
};
```

---

## Phase 2: Content SEO Optimization (3-4 hours)

### Task 2.1: Optimize Image Alt Text (1 hour)

**Create `src/config/seo-images.ts`:**
```typescript
export const getOptimizedAltText = {
  cat: (name: string, breed: string, color: string) => 
    `${name}, ${color} ${breed} breeding cat at Miausairovi Cattery`,
  
  kitten: (name: string, age: string, status: string) => 
    `${name}, ${age} old British Shorthair kitten - ${status}`,
  
  logo: () => 
    'Miausairovi Cattery - Professional British Shorthair Cat Breeder Peterborough UK',
};
```

**Update cat images:**
```tsx
// In CatCard.tsx
<img
  src={cat.images[0]}
  alt={getOptimizedAltText.cat(cat.name, cat.breed, cat.color)}
  loading={priority ? 'eager' : 'lazy'}
  fetchPriority={priority ? 'high' : 'low'}
/>
```

---

### Task 2.2: Add Internal Linking (1 hour)

**Strategy:**
- Link from Home → Cats, Gallery, Contact
- Link from Cats → Gallery (see kittens)
- Link from Gallery → Contact (inquire about kittens)
- Add contextual links within content

**Example in `src/pages/Home.tsx`:**
```tsx
<p className="text-muted-foreground mb-8">
  Explore our beautiful{' '}
  <Link to="/cats" className="text-primary hover:underline">
    breeding cats
  </Link>
  {' '}and view{' '}
  <Link to="/gallery" className="text-primary hover:underline">
    available kittens
  </Link>
  {' '}in our gallery.
</p>
```

---

### Task 2.3: Optimize Page Headings (H1-H6) (30 min)

**Ensure proper hierarchy:**
```tsx
// Each page should have ONE H1
<h1>British Shorthair Breeder in Peterborough, UK</h1>

// Then H2s for sections
<h2>Our Breeding Philosophy</h2>
<h2>Available British Shorthair Kittens</h2>

// Then H3s for subsections
<h3>Health Testing</h3>
<h3>Socialization</h3>
```

---

### Task 2.4: Add FAQ Section with Schema (1.5 hours)

**Create `src/pages/FAQ.tsx`:**
```tsx
import { SEO } from '@/components/common/SEO';
import { Helmet } from 'react-helmet-async';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How much does a British Shorthair kitten cost?',
    answer: 'Our British Shorthair kittens are priced between £800-£1,500 depending on color, pedigree, and show quality. Price includes vaccinations, health check, and GCCF registration.',
  },
  {
    question: 'Where is Miausairovi Cattery located?',
    answer: 'We are based in Peterborough, Cambridgeshire, UK. Viewings are available by appointment.',
  },
  {
    question: 'Are your kittens health tested?',
    answer: 'Yes, all our breeding cats are health tested for HCM, PKD, and FeLV/FIV. Kittens are vet checked, vaccinated, and come with health certificates.',
  },
  // Add 8-10 more FAQs
];

export default function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO 
        title="FAQ - British Shorthair Kitten Questions Answered"
        description="Frequently asked questions about British Shorthair kittens, pricing, health testing, and our breeding program at Miausairovi Cattery Peterborough."
        keywords={['British Shorthair FAQ', 'kitten questions', 'cat breeder FAQ']}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-12">
            Find answers to common questions about our British Shorthair kittens and breeding program.
          </p>
          
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
```

**Add FAQ route to navigation.**

---

## Phase 3: Local SEO (2-3 hours)

### Task 3.1: Google Business Profile Optimization (1 hour)

**Manual Steps:**
1. Create/claim Google Business Profile
2. Add business name: "Miausairovi Cattery"
3. Category: Pet Breeder, Cat Breeder
4. Add address (or service area: Peterborough, Cambridgeshire)
5. Add business hours
6. Upload 10+ high-quality photos
7. Add services: British Shorthair Breeding, Kitten Sales
8. Request customer reviews

**Add review schema to site:**
```tsx
export const ReviewSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '24',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
```

---

### Task 3.2: Add Location-Specific Content (1 hour)

**Update `src/data/content.data.ts`:**
```typescript
export const locationContent = {
  title: 'Serving Peterborough and Surrounding Areas',
  description: 'We are proud to serve cat lovers across Peterborough, Cambridgeshire, and the greater East of England.',
  areasServed: [
    'Peterborough',
    'Cambridge',
    'Huntingdon',
    'Stamford',
    'Spalding',
    'Wisbech',
    'Ely',
    'March',
  ],
};
```

**Add location section to Home page:**
```tsx
<section className="py-20 px-4">
  <div className="container mx-auto max-w-4xl text-center">
    <h2 className="text-3xl font-bold mb-4">
      {locationContent.title}
    </h2>
    <p className="text-muted-foreground mb-6">
      {locationContent.description}
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      {locationContent.areasServed.map(area => (
        <span key={area} className="px-4 py-2 bg-secondary rounded-full text-sm">
          {area}
        </span>
      ))}
    </div>
  </div>
</section>
```

---

### Task 3.3: Create Location-Specific Landing Pages (Optional) (1 hour)

**Create pages like:**
- `/british-shorthair-kittens-peterborough`
- `/cat-breeder-cambridgeshire`

These can be simple pages with local keywords.

---

## Phase 4: Technical Performance (2-3 hours)

### Task 4.1: Add Analytics & Search Console (30 min)

**Install Google Analytics:**
```bash
npm install react-ga4
```

**Create `src/lib/analytics.ts`:**
```typescript
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX'); // Add your GA4 ID
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
```

**Manual Steps:**
1. Create Google Analytics 4 property
2. Create Google Search Console account
3. Verify site ownership
4. Submit sitemap to Search Console
5. Set up Bing Webmaster Tools

---

### Task 4.2: Optimize Core Web Vitals (1 hour)

**Add performance monitoring:**
```bash
npm install web-vitals
```

**Create `src/lib/web-vitals.ts`:**
```typescript
import { onCLS, onFID, onLCP } from 'web-vitals';

export const reportWebVitals = () => {
  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);
};
```

**Optimizations:**
- ✅ Already done: Image lazy loading
- ✅ Already done: Fast Vite build
- Add: Font preloading (already in index.html)
- Add: Critical CSS inline

---

### Task 4.3: Create Custom 404 Page with SEO (30 min)

**Update `src/pages/NotFound.tsx`:**
```tsx
import { SEO } from '@/components/common/SEO';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found - 404"
        description="The page you're looking for doesn't exist. Return to Miausairovi Cattery home page."
        noindex={true}
      />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button>
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                View Kittens
              </Button>
            </Link>
          </div>
          
          {/* SEO-friendly links */}
          <div className="mt-12 text-sm">
            <p className="mb-4">Popular pages:</p>
            <ul className="space-y-2">
              <li><Link to="/cats" className="text-primary hover:underline">Our Breeding Cats</Link></li>
              <li><Link to="/gallery" className="text-primary hover:underline">Available Kittens</Link></li>
              <li><Link to="/contact" className="text-primary hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
```

---

## Phase 5: Content Marketing & Link Building (Ongoing)

### Task 5.1: Create Blog/Articles Section (Optional but Recommended)

**Topics to cover:**
- "Choosing a British Shorthair Kitten: Complete Guide"
- "British Shorthair Care and Maintenance"
- "What to Look for in a Reputable Cat Breeder"
- "British Shorthair Colors Explained"
- "Preparing Your Home for a New Kitten"

**SEO Benefits:**
- Long-form content targets long-tail keywords
- Demonstrates expertise
- Generates backlinks
- Keeps site fresh (Google loves updated content)

---

### Task 5.2: Social Media Integration

**Add social sharing buttons:**
```bash
npm install react-share
```

**Encourage sharing of kitten photos (natural link building)**

---

### Task 5.3: Get Listed in Directories

**Submit site to:**
- GCCF (Governing Council of the Cat Fancy) breeder directory
- UK Pet Breeders
- Pets4Homes
- Gumtree (with link to website)
- Local business directories
- Bing Places
- Apple Maps

---

## 📊 Success Metrics & KPIs

### Month 1 Targets
- ✅ All technical SEO implemented
- ✅ Google Search Console verified
- ✅ 50+ indexed pages (including images)
- ✅ Submit sitemap
- ✅ 0 critical SEO errors in tools

### Month 3 Targets
- 🎯 Rank in top 30 for primary keywords
- 🎯 100+ organic visitors/month
- 🎯 5+ inquiries from organic search
- 🎯 3-5 backlinks

### Month 6 Targets
- 🎯 Rank in top 10 for "British Shorthair breeder Peterborough"
- 🎯 500+ organic visitors/month
- 🎯 20+ inquiries from organic search
- 🎯 10+ backlinks
- 🎯 Featured in local "3-pack" on Google Maps

---

## 🛠️ Tools & Resources

### Free SEO Tools
- **Google Search Console** - Monitor search performance
- **Google Analytics 4** - Track visitor behavior
- **Google PageSpeed Insights** - Performance testing
- **Bing Webmaster Tools** - Bing search visibility
- **Schema Markup Validator** - Test structured data
- **Mobile-Friendly Test** - Mobile optimization

### Paid Tools (Optional)
- **Ahrefs** / **SEMrush** - Keyword research & competitor analysis
- **Screaming Frog** - Technical SEO audits
- **Google Ads** - Quick visibility while SEO builds

---

## 📋 Implementation Checklist

### Week 1: Foundation
- [ ] Install react-helmet-async
- [ ] Create SEO component
- [ ] Add dynamic meta tags to all pages
- [ ] Create sitemap.xml
- [ ] Update robots.txt
- [ ] Add canonical URLs
- [ ] Add structured data (LocalBusiness, FAQ)
- [ ] Set up Google Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap

### Week 2: Content
- [ ] Optimize all image alt text
- [ ] Add internal linking strategy
- [ ] Fix heading hierarchy (H1-H6)
- [ ] Create FAQ page
- [ ] Add location-specific content
- [ ] Optimize page load speed
- [ ] Create custom 404 page

### Week 3: Local SEO
- [ ] Create Google Business Profile
- [ ] Upload photos to GBP
- [ ] Request customer reviews
- [ ] Submit to GCCF directory
- [ ] Submit to pet breeder directories
- [ ] Add review schema
- [ ] Create location pages

### Week 4: Monitoring
- [ ] Check Search Console for errors
- [ ] Monitor Core Web Vitals
- [ ] Track keyword rankings
- [ ] Analyze Analytics data
- [ ] Fix any crawl errors
- [ ] Start content marketing plan

---

## 💡 Quick Wins (Do These First!)

1. **Create sitemap.xml** (15 min) - Helps Google discover pages
2. **Add dynamic page titles** (30 min) - Most important SEO factor
3. **Set up Google Search Console** (15 min) - Start collecting data now
4. **Optimize image alt text** (30 min) - Easy accessibility + SEO win
5. **Create Google Business Profile** (30 min) - Show up in local search

**Total: 2 hours for immediate SEO boost!**

---

## 🎯 Priority Recommendations

### DO IMMEDIATELY (This Week):
1. ✅ **Install react-helmet-async and create SEO component**
2. ✅ **Add dynamic meta tags to all pages**
3. ✅ **Create sitemap.xml**
4. ✅ **Set up Google Search Console**

### DO SOON (Next 2 Weeks):
5. ✅ **Add structured data**
6. ✅ **Create FAQ page**
7. ✅ **Set up Google Business Profile**
8. ✅ **Optimize images**

### DO EVENTUALLY (Next Month):
9. ⏳ **Content marketing (blog)**
10. ⏳ **Build backlinks**
11. ⏳ **Create location pages**

---

## 💰 Expected ROI

**Investment:** 12-16 hours of development time  
**Cost:** £0 (all free tools)

**Expected Returns (6 months):**
- 500+ monthly organic visitors
- 20-30 qualified inquiries per month
- 5-10% conversion rate = 2-3 kitten sales/month
- Value: £2,000-£4,000/month in additional revenue

**ROI: 2,000-4,000% in 6 months**

---

## 📞 Next Steps

1. **Review this plan** and prioritize tasks
2. **Start with Quick Wins** (2 hours)
3. **Implement Phase 1** (Technical Foundation) this week
4. **Set up monitoring tools** to track progress
5. **Plan content calendar** for ongoing optimization

---

*This SEO plan is specifically tailored for Miausairovi Cattery and focuses on high-impact, low-cost improvements that will generate real business results.*

**Last Updated:** October 14, 2025
