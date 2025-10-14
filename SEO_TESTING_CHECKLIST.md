# SEO Testing Checklist

## 🧪 Manual Testing Tasks

### 1. Visual Inspection
Open the dev server at http://localhost:8080/ and verify:

- [ ] **Home Page**
  - FAQ link appears in main navigation
  - New "Serving Peterborough & Surrounding Areas" section displays correctly
  - Internal links to Gallery and Contact work
  - Page loads without errors

- [ ] **Cats Page** (`/cats`)
  - Breadcrumb navigation visible (if implemented visually)
  - Footer links to Gallery and Contact work
  - Cat images display properly
  - Page loads without errors

- [ ] **Gallery Page** (`/gallery`)
  - Footer links to Contact and FAQ work
  - Kitten images display properly
  - Page loads without errors

- [ ] **Contact Page** (`/contact`)
  - Contact form works
  - Page loads without errors

- [ ] **FAQ Page** (`/faq`) - NEW
  - Page loads successfully from navigation menu
  - All 4 category sections display (General, Health, Adoption, Care)
  - Accordion components expand/collapse correctly
  - "Contact Us" and "View Available Kittens" buttons work
  - Quick links at bottom work (Our Breeding Cats, Available Kittens, About Us)

### 2. Meta Tag Verification
For each page, right-click → **View Page Source** and verify:

- [ ] **Home Page**
  ```html
  <title>British Shorthair Breeder Peterborough | Miausairovi Cattery</title>
  <meta name="description" content="..." />
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta name="twitter:card" content="summary_large_image" />
  ```

- [ ] **Cats Page**
  ```html
  <title>Our British Shorthair Breeding Cats | Miausairovi Cattery</title>
  ```

- [ ] **Gallery Page**
  ```html
  <title>British Shorthair Kittens for Sale | Miausairovi Cattery</title>
  ```

- [ ] **Contact Page**
  ```html
  <title>Contact British Shorthair Breeder | Miausairovi Cattery Peterborough</title>
  ```

- [ ] **FAQ Page**
  ```html
  <title>FAQ - British Shorthair Questions | Miausairovi Cattery</title>
  ```

### 3. Structured Data Validation
Use [Google's Rich Results Test](https://search.google.com/test/rich-results):

**Note**: You'll need to deploy to production first for Google to test. For local testing:

- [ ] **Home Page** - Should contain:
  - LocalBusiness schema (with name, address, telephone, geo-coordinates)
  - Review schema (5.0 stars, 24 reviews)

- [ ] **Cats Page** - Should contain:
  - Breadcrumb schema (Home → Our Breeding Cats)

- [ ] **Gallery Page** - Should contain:
  - Breadcrumb schema (Home → Kittens Gallery)

- [ ] **Contact Page** - Should contain:
  - Breadcrumb schema (Home → Contact Us)

- [ ] **FAQ Page** - Should contain:
  - FAQ schema (15 questions with answers)
  - Breadcrumb schema (Home → FAQ)

### 4. Image Alt Text Verification
Right-click on images → **Inspect** and verify alt attributes:

- [ ] **Logo** (Navigation)
  ```html
  alt="Miausairovi Cattery - British Shorthair Breeder Peterborough UK"
  ```

- [ ] **Cat Images** (Cats page)
  ```html
  alt="[Name], [color] [breed] breeding cat at Miausairovi Cattery Peterborough"
  ```
  Example: "Afina, blue British Shorthair breeding cat at Miausairovi Cattery Peterborough"

- [ ] **Kitten Images** (Gallery page)
  ```html
  alt="[Name], [age] available British Shorthair kitten at Miausairovi Cattery Peterborough UK"
  ```
  Example: "Luna, 10 weeks available British Shorthair kitten at Miausairovi Cattery Peterborough UK"

### 5. Internal Links Verification
Test all internal links navigate correctly:

- [ ] Home → Gallery (2 locations)
- [ ] Home → Contact (2 locations)
- [ ] Cats → Gallery
- [ ] Cats → Contact
- [ ] Gallery → Contact
- [ ] Gallery → FAQ
- [ ] FAQ → Contact
- [ ] FAQ → Gallery
- [ ] FAQ → Cats
- [ ] FAQ → Home
- [ ] All navigation menu links work

### 6. Mobile Responsiveness
Test on mobile viewport (Chrome DevTools):

- [ ] FAQ accordion works on mobile
- [ ] Navigation collapses to hamburger menu
- [ ] Location section cards stack vertically
- [ ] All buttons are touch-friendly
- [ ] Images resize properly

### 7. Accessibility
- [ ] FAQ page is keyboard navigable (Tab through accordions)
- [ ] All images have meaningful alt text
- [ ] Color contrast is sufficient
- [ ] Focus states are visible

---

## 🔧 Technical Validation

### Build & Compile
- [✅] `npm run build` - **PASSED** (3.90s, no errors)
- [✅] TypeScript compilation - **PASSED** (no errors)
- [✅] Bundle size - **420KB** (133KB gzipped)

### Files Created
- [✅] `public/sitemap.xml`
- [✅] `src/components/common/SEO.tsx`
- [✅] `src/components/common/StructuredData.tsx`
- [✅] `src/data/faq.data.ts`
- [✅] `src/pages/FAQ.tsx`

### Files Modified
- [✅] `public/robots.txt`
- [✅] `src/main.tsx`
- [✅] `src/App.tsx`
- [✅] `src/config/navigation.ts`
- [✅] `src/pages/Home.tsx`
- [✅] `src/pages/Cats.tsx`
- [✅] `src/pages/Gallery.tsx`
- [✅] `src/pages/Contact.tsx`
- [✅] `src/components/layout/Navigation.tsx`
- [✅] `src/components/features/cats/CatCard.tsx`
- [✅] `src/components/features/kittens/KittenCard.tsx`

---

## 🌐 Post-Deployment Testing

### After deploying to production (https://miausairovi.com):

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test each page individually
   - Verify no errors in structured data

2. **Google Mobile-Friendly Test**
   - URL: https://search.google.com/test/mobile-friendly
   - Test all pages
   - Ensure mobile-friendly badge

3. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Test both mobile and desktop
   - Aim for 90+ performance score

4. **Sitemap Submission**
   - Google Search Console
   - Submit: https://miausairovi.com/sitemap.xml
   - Monitor indexing status

5. **Social Media Preview**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Verify Open Graph images and descriptions

---

## 📋 Pre-Go-Live Checklist

- [ ] All manual tests passed
- [ ] No console errors in browser
- [ ] All links work correctly
- [ ] FAQ page accessible from navigation
- [ ] Meta tags unique for each page
- [ ] Images have descriptive alt text
- [ ] Sitemap.xml accessible at `/sitemap.xml`
- [ ] Robots.txt references sitemap
- [ ] Build completes without errors
- [ ] Mobile responsive on all pages

---

## 🚀 Launch Checklist

After deployment:

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test structured data with Rich Results Test
- [ ] Verify all pages indexed within 1-2 weeks
- [ ] Monitor Google Analytics for organic traffic
- [ ] Track keyword rankings for target terms
- [ ] Set up Google Business Profile
- [ ] Request reviews from happy customers

---

## 📊 Success Metrics

Track these KPIs weekly:

- **Organic Traffic**: Sessions from Google/Bing
- **Keyword Rankings**: Position for top 10 keywords
- **Click-Through Rate**: From search results
- **Bounce Rate**: User engagement quality
- **Contact Form Submissions**: Conversion rate
- **Pages per Session**: Internal navigation effectiveness
- **FAQ Page Views**: Content engagement

---

## 🔍 SEO Tools

Recommended tools for ongoing monitoring:

1. **Google Search Console** (Free) - Indexing, performance
2. **Google Analytics** (Free) - Traffic analysis
3. **Google Business Profile** (Free) - Local SEO
4. **Bing Webmaster Tools** (Free) - Bing visibility
5. **Rich Results Test** (Free) - Structured data validation
6. **PageSpeed Insights** (Free) - Performance monitoring

Optional paid tools:
- Ahrefs - Comprehensive SEO analysis
- SEMrush - Keyword tracking
- Moz - Domain authority tracking

---

*Last Updated: 2025*
*Status: Ready for Testing*
