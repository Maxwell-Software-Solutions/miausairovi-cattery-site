# Keystatic CMS Architecture

## Overview

This document explains how Keystatic CMS integrates with your React/Vite cattery website architecture.

## Current Architecture (Before Keystatic)

```text
┌─────────────────────────────────────────────────────────────┐
│                      Browser                                 │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │            React Application                        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │    │
│  │  │  Pages   │  │Components│  │  UI Components│   │    │
│  │  └────┬─────┘  └────┬─────┘  └───────────────┘   │    │
│  │       │             │                               │    │
│  │       └─────────────┴──────────────┐               │    │
│  │                                     ▼               │    │
│  │              ┌──────────────────────────────┐      │    │
│  │              │    Data Layer (Import)       │      │    │
│  │              │                              │      │    │
│  │              │  • cats.data.ts              │      │    │
│  │              │  • kittens.data.ts           │      │    │
│  │              │  • reviews.data.ts           │      │    │
│  │              │  • faq.data.ts               │      │    │
│  │              │  • content.data.ts           │      │    │
│  │              └──────────────────────────────┘      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  Development Process                         │
│                                                              │
│  Developer → Edit .ts files → Commit → Deploy              │
│                                                              │
│  ❌ Only developers can edit                                │
│  ❌ Requires coding knowledge                               │
│  ❌ No visual editor                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Keystatic Architecture (After Migration)

```text
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Application                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────┐         │  │
│  │  │  Pages   │  │Components│  │  UI Components│         │  │
│  │  └────┬─────┘  └────┬─────┘  └───────────────┘         │  │
│  │       │             │                                     │  │
│  │       └─────────────┴──────────────┐                     │  │
│  │                                     ▼                     │  │
│  │              ┌──────────────────────────────────┐        │  │
│  │              │    Data Layer (Import)           │        │  │
│  │              │                                  │        │  │
│  │              │  Import from:                    │        │  │
│  │              │  generated/keystatic-data.json   │        │  │
│  │              │                                  │        │  │
│  │              │  ← Generated at build time       │        │  │
│  │              └──────────────────────────────────┘        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Keystatic Admin UI (/keystatic)                │  │
│  │                                                           │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌──────────┐     │  │
│  │  │  Cats  │  │Kittens │  │Reviews │  │   FAQs   │     │  │
│  │  │ Editor │  │ Editor │  │ Editor │  │  Editor  │     │  │
│  │  └────┬───┘  └───┬────┘  └───┬────┘  └────┬─────┘     │  │
│  │       │          │           │            │             │  │
│  │       └──────────┴───────────┴────────────┘             │  │
│  │                      │                                   │  │
│  │                      ▼                                   │  │
│  │            ┌─────────────────────┐                      │  │
│  │            │  Keystatic Core     │                      │  │
│  │            │  (Content Manager)  │                      │  │
│  │            └──────────┬──────────┘                      │  │
│  └───────────────────────┼───────────────────────────────┘  │
└────────────────────────────┼──────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    File System / Git                             │
│                                                                  │
│  content/                                                        │
│    ├── cats/                                                    │
│    │   ├── pukis.md          (Frontmatter + Markdown)          │
│    │   ├── afina.md                                            │
│    │   └── esmy.md                                             │
│    ├── kittens/                                                │
│    │   ├── kitten-1.md                                         │
│    │   └── ...                                                 │
│    ├── reviews/                                                │
│    ├── faqs/                                                   │
│    ├── homepage.yaml        (Singleton content)                │
│    └── settings.yaml                                           │
│                                                                  │
│  public/assets/cats/        (Images)                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Build Process                               │
│                                                                  │
│  1. Keystatic Reader reads content/ folder                      │
│  2. Generates static JSON (src/generated/keystatic-data.json)  │
│  3. Vite builds application                                     │
│  4. Application imports generated JSON                           │
│  5. Static site deployed                                        │
│                                                                  │
│  ✅ Content editing separate from code                          │
│  ✅ Type-safe at build time                                     │
│  ✅ Fast static generation                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Reading Content (User Visits Site)

```text
1. User visits page
   ↓
2. React component renders
   ↓
3. Component imports data from generated/keystatic-data.json
   ↓
4. Data was generated at build time from content/ folder
   ↓
5. Page displays (fast, static)
```

### Editing Content (Admin Updates)

```text
1. Editor opens /keystatic admin
   ↓
2. Keystatic loads content from content/ folder
   ↓
3. Editor makes changes in UI
   ↓
4. Keystatic saves to content/[type]/[slug].md
   ↓
5. Changes committed to Git
   ↓
6. Rebuild triggered (automatic on push)
   ↓
7. Build process regenerates keystatic-data.json
   ↓
8. Site deployed with updated content
```

---

## File Structure Comparison

### Before Keystatic

```text
src/
  data/
    cats.data.ts          ← TypeScript arrays
    kittens.data.ts       ← Need coding to edit
    reviews.data.ts       ← In source code
    faq.data.ts
    content.data.ts

  pages/
    Cats.tsx              ← Import from data files
    Home.tsx
    ...
```

### After Keystatic

```text
content/                  ← Content storage (Git)
  cats/
    pukis.md             ← Markdown + YAML frontmatter
    afina.md             ← Edit via admin UI
    esmy.md
  kittens/
  reviews/
  faqs/
  homepage.yaml          ← Singleton content
  settings.yaml

keystatic.config.tsx      ← Schema definition

src/
  generated/
    keystatic-data.json  ← Generated at build time

  lib/
    keystatic-reader.ts  ← Read utilities

  pages/
    Cats.tsx             ← Import from generated JSON
    Home.tsx
    ...
  
  pages/
    keystatic/
      [...params].tsx    ← Admin route
```

---

## Component Integration

### Before (Import TypeScript)

```typescript
// src/pages/Cats.tsx
import { catsData } from '@/data/cats.data';

export function Cats() {
  return (
    <div>
      {catsData.map(cat => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
}
```

### After (Import Generated JSON)

```typescript
// src/pages/Cats.tsx
import data from '@/generated/keystatic-data.json';

export function Cats() {
  const cats = data.cats;
  
  return (
    <div>
      {cats.map(cat => (
        <CatCard key={cat.slug} cat={cat} />
      ))}
    </div>
  );
}
```

**Key difference**: Data source changes, component logic stays the same!

---

## Build Process Flow

### Development Mode

```text
┌──────────────────┐
│  npm run dev     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  Vite Dev Server Starts      │
│  - Port 3000                 │
│  - Hot reload enabled        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Keystatic Admin Available           │
│  http://localhost:3000/keystatic     │
│                                      │
│  Edit content → Saves to content/   │
└──────────────────────────────────────┘
```

### Production Build

```text
┌──────────────────┐
│  npm run build   │
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Prebuild Script Runs           │
│  (scripts/generate-static-data) │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Keystatic Reader                │
│  - Reads content/ folder         │
│  - Parses Markdown files         │
│  - Generates JSON                │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Creates src/generated/          │
│  keystatic-data.json             │
│  (All content as static JSON)    │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Vite Build Process              │
│  - Bundles React app             │
│  - Imports generated JSON        │
│  - Creates static site           │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  dist/                           │
│  - Optimized static files        │
│  - Ready to deploy               │
└──────────────────────────────────┘
```

---

## Content Schema Architecture

### Keystatic Configuration

```typescript
// keystatic.config.tsx
export default config({
  storage: { kind: 'local' },  // or 'github'
  
  collections: {
    cats: collection({
      path: 'content/cats/*',
      schema: {
        name: fields.slug(),
        breed: fields.text(),
        images: fields.array(),
        // ... more fields
      }
    }),
    // ... more collections
  },
  
  singletons: {
    homepage: singleton({
      path: 'content/homepage',
      schema: {
        heroTitle: fields.text(),
        // ... more fields
      }
    })
  }
});
```

**This defines**:

- What content types exist
- Where they're stored
- What fields they have
- How to edit them

---

## Type Safety Flow

```text
┌──────────────────────┐
│ keystatic.config.tsx │  ← Schema definition
│ (Content structure)  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────┐
│  TypeScript Infers       │  ← Automatic types
│  Types from Schema       │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Content Files           │  ← Content creation
│  (Markdown + YAML)       │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Build-time Validation   │  ← Type checking
│  (Schema validation)     │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Generated JSON          │  ← Type-safe output
│  (keystatic-data.json)   │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  React Components        │  ← Type-safe consumption
│  (Import with types)     │
└──────────────────────────┘
```

**Result**: End-to-end type safety from schema to UI!

---

## Storage Modes

### Local Mode (Default)

```text
┌─────────────────┐
│  Developer      │
│  Laptop         │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│  localhost:3000/keystatic│  ← Admin UI
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Local File System       │
│  content/ folder         │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Git                     │
│  Manual commits          │
└──────────────────────────┘
```

**Pros**:

- Simple setup
- Full control
- No external dependencies

**Cons**:

- Local editing only
- Need repository access

---

### GitHub Mode (Advanced)

```text
┌─────────────────────────┐
│  Content Editor         │
│  (Any Device)           │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  yourdomain.com/keystatic    │  ← Admin on production
│  (GitHub Authentication)     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  GitHub API                  │
│  (Authorized access)         │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Creates Pull Request        │
│  (Automatic)                 │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Review & Merge              │
│  (Team approval)             │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Deploy                      │
│  (Automatic on merge)        │
└──────────────────────────────┘
```

**Pros**:

- Edit from anywhere
- No local setup needed
- Built-in review process
- Automatic PRs

**Cons**:

- Requires GitHub App setup
- GitHub API dependency
- Authentication needed

---

## Performance Architecture

### Build Time

```text
Keystatic Reader → Parse Markdown → Generate JSON
     ↓                  ↓               ↓
  ~100ms            ~200ms          ~50ms
     
Total build overhead: ~350ms (negligible)
```

### Runtime

```text
User Request → Static HTML → JSON Import → Render
     ↓             ↓              ↓           ↓
   Instant      Cached         Cached      Fast
   
No database queries!
No API calls!
Pure static content!
```

**Result**: Same speed as before, or faster!

---

## Security Architecture

### Content Access

```text
Local Mode:
  - Filesystem access required
  - No authentication needed
  - Local development only

GitHub Mode:
  - GitHub OAuth
  - Repository permissions
  - Fine-grained access control
  - Audit log via Git
```

### Data Storage

```text
All content:
  ✅ Stored in Git (version controlled)
  ✅ No external database
  ✅ No vendor lock-in
  ✅ Easy to backup
  ✅ Easy to migrate
```

---

## Deployment Architecture

### Vercel Deployment Flow

```text
1. Push to GitHub
   ↓
2. Vercel detects change
   ↓
3. Runs build command
   ↓ npm run build
4. Prebuild script runs
   ↓ Generates keystatic-data.json
5. Vite builds application
   ↓
6. Deploy to Vercel CDN
   ↓
7. Site live with updated content
```

**Automatic**: Every push triggers rebuild with latest content

---

## Scalability

### Content Growth

```text
Current: ~20 items total
  - 3 cats
  - 6 kittens
  - 10 reviews
  - 30+ FAQs

Keystatic scales to:
  - 100s of items per collection
  - 10,000s of total items
  - Multiple MB of content

Build time impact: Linear (~1ms per item)
Runtime impact: None (static generation)
```

---

## Migration Path

```text
Phase 1: Setup
  ├── Install packages
  ├── Create config
  └── Add admin route
  
Phase 2: Migration
  ├── Create content structure
  ├── Run migration scripts
  └── Validate content
  
Phase 3: Integration
  ├── Create reader utilities
  ├── Update types
  └── Generate static data
  
Phase 4: Components
  ├── Update imports
  ├── Refactor data access
  └── Test rendering
  
Phase 5: Build
  ├── Update package.json
  ├── Add prebuild script
  └── Test builds
  
Phase 6: Testing
  ├── Validate all content
  ├── Test admin UI
  └── Test build/deploy
  
Phase 7: Deploy
  ├── Push to production
  ├── Verify deployment
  └── Train users
```

---

## Summary

### Architecture Benefits

✅ **Separation of Concerns**

- Content in `content/` folder
- Code in `src/` folder
- Configuration in `keystatic.config.tsx`

✅ **Type Safety**

- Schema-defined types
- Build-time validation
- Runtime type safety

✅ **Performance**

- Static generation
- No runtime overhead
- Fast builds

✅ **Developer Experience**

- Git-based workflow
- Local development
- Hot reload

✅ **Editor Experience**

- Visual admin interface
- Form validation
- Real-time preview

✅ **Deployment**

- Static site output
- CDN compatible
- Automatic rebuilds

---

**This architecture provides the best of both worlds**: Developer-friendly Git workflow with user-friendly visual editing!
