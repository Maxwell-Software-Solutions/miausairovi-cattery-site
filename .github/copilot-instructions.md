# Copilot Instructions - Miausairovi Cattery Site

## Project Overview

A high-performance British Shorthair cattery website built with React + TypeScript + Vite, featuring content-driven architecture with markdown-based CMS, shadcn/ui components, and comprehensive SEO/analytics.

## Architecture & Data Flow

### Content Pipeline (Critical Build Dependency)

**Always run `npm run prebuild` before `npm run build`** - The build process depends on generated static data:

1. **Content source**: Markdown files in `/content/` (cats, kittens, FAQs, reviews)
2. **Build-time generation**: `scripts/generate-static-data.ts` parses markdown + YAML → `src/generated/static-data.json`
3. **Runtime consumption**: Data modules in `src/data/*.data.ts` import the generated JSON
4. **Special handling**: Image paths normalized from `image:` or `src:` properties to consistent `src:` format

**Key files**:

- `package.json` - `prebuild` script runs `tsx scripts/generate-static-data.ts`
- `content/` - Source of truth for all dynamic content
- `src/generated/static-data.json` - Generated at build time, NOT committed to git

### Component Organization

```
src/components/
├── ui/           # shadcn/ui primitives (accordion, button, etc.) - DO NOT modify directly
├── common/       # Shared components (SEO, PageHeader, AnimatedSection, OptimizedImage)
├── layout/       # Navigation, Footer
└── features/     # Domain-specific (cats/, kittens/, contact/, reviews/)
```

## Critical Conventions

### 1. Import Paths - Always Use `@/` Alias

```typescript
// ✅ Correct
import { Button } from '@/components/ui/button';
import { Cat } from '@/types/cat.types';
import { APP_CONFIG } from '@/config/constants';

// ❌ Wrong - relative paths
import { Button } from '../../components/ui/button';
```

### 2. Image Handling - SVG First Policy

**Custom ESLint Rule**: `custom/no-png-in-public` enforces SVG usage in `/public/` (except favicon.png)

```typescript
// ✅ Use OptimizedImage for performance
import { OptimizedImage } from '@/components/common/OptimizedImage';

<OptimizedImage
  src="/assets/cats/cat-name/image.jpg"
  alt="Descriptive alt text for SEO"
  priority={true} // Only for above-fold images
/>;

// ❌ Avoid direct <img> tags
```

### 3. Styling - Tailwind + CSS Variables

Use `tailwind.config.ts` design tokens, NOT hardcoded colors:

```tsx
// ✅ Correct - uses CSS variable tokens
className = 'text-primary bg-background border-border';

// ❌ Wrong - hardcoded values
className = 'text-blue-600 bg-white border-gray-200';
```

**Custom ESLint Rule**: `custom/use-design-tokens` warns on hardcoded values.

### 4. TypeScript - Relaxed Config for Rapid Development

`tsconfig.json` has:

- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`

This is intentional - prioritize development speed over strict typing.

### 5. Analytics Integration

Analytics are deferred to avoid blocking critical rendering:

```typescript
// From src/config/analytics.ts
// GA initialization uses requestIdleCallback with 2-3s delay
// Track events: trackEvent('category', 'action', 'label')
```

**Event tracking locations**:

- Form submissions → `src/components/features/contact/ContactForm.tsx`
- FAQ interactions → `src/pages/FAQ.tsx`
- Navigation clicks → Track in components as needed

## Development Workflow

### Local Development

```bash
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # Runs prebuild automatically → vite build
npm run preview      # Preview production build
```

### Testing

```bash
npm run test         # Playwright e2e tests
npm run test:ui      # Interactive test UI
npm run lighthouse   # Performance audit (requires preview server running)
```

### Content Updates

1. Edit markdown files in `/content/cats/`, `/content/kittens/`, etc.
2. Run `npm run prebuild` to regenerate JSON (or happens automatically on build)
3. No code changes needed - data flows through automatically

## Performance Best Practices

**Already implemented** (see `docs/PERFORMANCE_OPTIMIZATION_RESULTS.md`):

- Lazy loading for non-critical routes (About, Cats, Gallery, Contact, FAQ)
- Route-based code splitting via React.lazy()
- Brotli + Gzip compression in `vite.config.ts`
- OptimizedImage component with lazy loading + priority hints
- Memoized Navigation component with useCallback
- Query Client caching (5min stale, 10min GC)

**When adding features**:

- Use `OptimizedImage` for all images
- Memoize expensive components with `React.memo()`
- Add `loading="lazy"` for below-fold content
- Check Lighthouse score: `npm run lighthouse`

## SEO Requirements

**Every new page must include**:

```tsx
import { SEO } from '@/components/common/SEO';
import { BreadcrumbSchema } from '@/components/common/StructuredData';

// In component
<SEO
  title="Page Title - Miausairovi Cattery"
  description="Concise description 120-160 chars"
  keywords="british shorthair, cattery, peterborough, UK"
  canonical="https://miausairovi.com/page-path"
/>
<BreadcrumbSchema items={[...]} />
```

**Image alt text**: Always include location keywords (e.g., "British Shorthair kitten Peterborough UK")

See `docs/seo/SEO_QUICK_START.md` for complete SEO guidelines.

## Common Tasks

### Adding a New Cat/Kitten

1. Create markdown file in `/content/cats/` or `/content/kittens/`
2. Follow existing format with frontmatter (name, breed, color, images[], order)
3. Run `npm run prebuild` → automatically appears on site

### Adding shadcn/ui Component

```bash
npx shadcn@latest add [component-name]
```

Components install to `src/components/ui/` with proper theming.

### Modifying Navigation

Edit `src/config/navigation.ts` - used by both Navigation and Footer components.

### Environment Variables

- Development: `.env` (not committed)
- Production: Set in Vercel dashboard
- Required: `VITE_MAILERSEND_API_KEY`, `VITE_GA_ID`

## Deployment

**Platform**: Vercel
**Configuration**: `vercel.json` includes:

- SPA routing rewrites
- Immutable caching for assets (1 year)
- Compression headers

**Deploy**: Push to `main` branch → automatic Vercel deployment

See `docs/setup/HOW_TO_RUN_WITH_VERCEL.md` for details.

## Troubleshooting

### Build Fails with "Cannot find module './generated/static-data.json'"

→ Run `npm run prebuild` first

### Images Not Loading

→ Check paths start with `/assets/` and files exist in `public/assets/`

### ESLint Errors on Custom Rules

→ Custom rules in `eslint-rules/` folder - review `eslint.config.js` configuration

### TypeScript Errors

→ Remember: This project uses relaxed TS config. Focus on runtime correctness over strict typing.

## Documentation

Comprehensive docs in `/docs/`:

- `/docs/seo/` - SEO implementation guides
- `/docs/analytics/` - GA4 setup and tracking
- `/docs/setup/` - Deployment and configuration
- `/docs/PERFORMANCE_OPTIMIZATION_RESULTS.md` - Performance improvements baseline

**Start here**: `docs/README.md` for full documentation overview.
