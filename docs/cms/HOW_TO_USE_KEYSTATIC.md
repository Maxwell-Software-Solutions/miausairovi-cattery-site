# How to Use Keystatic CMS - Current Implementation Guide

## 🎯 Quick Start

Your Keystatic CMS is fully set up and ready to use! Here's everything you need to know.

---

## 📍 Accessing the Admin Panel

### Local Development
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin panel:
   ```
   http://localhost:8081/keystatic
   ```
   *(Note: Port may vary - check your terminal output)*

3. You'll see the Keystatic admin interface with all your content types in the sidebar:
   - **Cats** - Your breeding cats
   - **Kittens** - Available kittens
   - **Reviews** - Customer testimonials
   - **FAQs** - Frequently asked questions
   - **Homepage Content** - Hero section and features
   - **Site Settings** - Contact info and social media

---

## ✏️ Managing Content

### Adding New Content

#### Adding a New Cat
1. Go to `/keystatic` admin panel
2. Click **"Cats"** in the sidebar
3. Click **"Create Cat"** button
4. Fill in the form:
   - **Name**: Cat's name (e.g., "Pukis")
   - **Breed**: British Shorthair, British Longhair, etc.
   - **Color**: Golden Shaded, Blue, etc.
   - **Titles**: Awards and championships
   - **Images**: Add multiple images with alt text
   - **Featured**: Toggle if this should appear on homepage
   - **Order**: Numeric sorting (lower = appears first)
   - **Description**: Rich text about the cat
5. Click **"Save"**
6. The content is saved to `content/cats/{slug}.md`

#### Adding a New Kitten
1. Click **"Kittens"** in sidebar
2. Click **"Create Kitten"**
3. Fill in:
   - Name, Gender, Birth Date
   - Color, Status (Available/Reserved/Sold)
   - Price (optional)
   - Images with alt text
   - Parents (optional)
   - Order and Description
4. Save

#### Adding a Review
1. Click **"Reviews"**
2. Create new review
3. Fields:
   - Author name
   - Date (YYYY-MM-DD)
   - Rating (1-5)
   - Review text
   - Platform (e.g., "Google", "Facebook")
   - Featured toggle
   - Order
4. Save

#### Adding an FAQ
1. Click **"FAQs"**
2. Create FAQ
3. Fields:
   - Question
   - Answer (markdown supported)
   - Category: Breeding, Care, Pricing, or General
   - Order
4. Save

### Editing Existing Content
1. Navigate to the content type (e.g., Cats)
2. Click on any item in the list
3. Edit the fields
4. Click **"Save"**

### Deleting Content
1. Open the content item
2. Click **"Delete"** button
3. Confirm deletion

---

## 🏗️ How Content Flows to Your Website

### Development Mode (npm run dev)
```
Content Changes → Keystatic saves to content/*.md → 
Website reads directly from markdown files → 
Changes appear immediately (after page refresh)
```

Currently, your pages that use Keystatic data:
- ✅ **Cats Page** (`/cats`) - Reads from `content/cats/`
- ⚠️ **Home Page** - Still uses old data files (needs update)
- ⚠️ **Gallery Page** - Still uses old data files (needs update)
- ⚠️ **FAQ Page** - Still uses old data files (needs update)

### Production Build (npm run build)
```
1. Build starts
2. prebuild script runs: tsx scripts/generate-static-data.ts
3. Script reads all content/*.md files
4. Generates src/generated/keystatic-data.json
5. Website imports from this JSON file
6. Build completes
```

**⚠️ Important**: The `generate-static-data.ts` script currently has file corruption issues. This needs to be fixed before production builds will work properly.

---

## 📁 Content Storage Structure

All content is stored as **Markdown files with YAML frontmatter** in the `content/` folder:

```
content/
├── cats/
│   ├── pukis.md
│   ├── afina.md
│   └── esmy.md
├── kittens/
│   ├── kitten-1.md
│   ├── kitten-2.md
│   └── ...
├── reviews/
│   ├── john-smith-2024-01-15.md
│   └── ...
├── faqs/
│   ├── how-much-does-a-kitten-cost.md
│   └── ...
├── homepage.yaml    # Homepage hero and features
└── settings.yaml    # Site-wide settings
```

### Example: Cat Content File
```markdown
---
name: Pukis
breed: British Longhair
color: Golden Shaded
titles: Grand Champion Pukis
images:
  - image: /assets/cats/Pukis/image1.jpg
    alt: Pukis - British Longhair
  - image: /assets/cats/Pukis/image2.jpg
    alt: Pukis portrait
featured: true
order: 1
---

Our boy Grand Champion Diamondglow Pukis of Miausairovi.
```

---

## 🔧 Technical Details

### Current Implementation Status

✅ **Completed:**
- Keystatic configuration with all content schemas
- Admin panel at `/keystatic` route
- Content migration (all existing data → Markdown)
- Type definitions updated for Cats
- ImageCarousel component updated
- Cats page using Keystatic data

⚠️ **Needs Completion:**
- Fix `generate-static-data.ts` script (currently corrupted)
- Update Home page to use Keystatic data
- Update Gallery/Kittens page to use Keystatic data
- Update FAQ page to use Keystatic data
- Update Reviews component to use Keystatic data

### Component Integration Pattern

When a page is updated to use Keystatic, it follows this pattern:

```tsx
// OLD WAY
import { catsData } from '@/data/cats.data';

// NEW WAY (Cats page - already implemented)
import keystaticData from '@/generated/keystatic-data.json';
const cats = keystaticData.cats;
```

---

## 🐛 Known Issues

### 1. Generate Script Corruption
**Issue**: The `scripts/generate-static-data.ts` file has corrupted content (duplicate lines).

**Impact**: Production builds (`npm run build`) will fail.

**Workaround**: 
- Development mode (`npm run dev`) works fine
- Manually fix the script file in a code editor
- See `KEYSTATIC_IMPLEMENTATION_GUIDE.md` for the correct script content

### 2. Not All Pages Updated Yet
**Issue**: Only the Cats page currently uses Keystatic data.

**Impact**: Changes to kittens, reviews, FAQs, and homepage in Keystatic won't appear on the website yet.

**Next Steps**: Update remaining pages following the Cats page pattern.

---

## 🎨 Customizing Content Schemas

If you want to add/modify fields in Keystatic:

1. Open `keystatic.config.tsx`
2. Find the collection or singleton you want to modify
3. Edit the schema fields
4. Restart dev server
5. The admin UI will reflect your changes

Example - Adding a field to Cats:
```tsx
cats: collection({
  label: 'Cats',
  path: 'content/cats/*',
  schema: {
    // ... existing fields ...
    birthDate: fields.date({    // NEW FIELD
      label: 'Birth Date',
    }),
  },
}),
```

---

## 📊 Content Type Reference

### Available Field Types
Keystatic supports these field types (see `keystatic.config.tsx` for examples):
- `fields.text()` - Single line text
- `fields.text({ multiline: true })` - Multi-line text
- `fields.document()` - Rich text markdown editor
- `fields.image()` - Single image upload
- `fields.array()` - Repeatable items (like image galleries)
- `fields.select()` - Dropdown selection
- `fields.date()` - Date picker
- `fields.number()` - Numeric input
- `fields.checkbox()` - Boolean toggle
- `fields.object()` - Nested fields

---

## 🚀 Deployment Considerations

### Before Deploying to Production:

1. **Fix the generation script**:
   - Manually repair `scripts/generate-static-data.ts`
   - Test that `npm run build` completes successfully

2. **Test the prebuild script**:
   ```bash
   npm run prebuild
   # Should generate src/generated/keystatic-data.json
   ```

3. **Update all pages**:
   - Ensure Home, Gallery, FAQ pages use Keystatic data
   - Test all pages load correctly

4. **Git workflow**:
   - Content changes create Git commits automatically
   - Review commits before pushing to production
   - Consider using branches for content changes

### Production Admin Access

In production, you have two options:

**Option 1: Local Mode (Current)**
- Admin panel only accessible locally during development
- Content changes committed to Git manually
- Simple and secure

**Option 2: GitHub Mode (Future Enhancement)**
- Enable GitHub mode in `keystatic.config.tsx`
- Admin panel accessible in production at `yoursite.com/keystatic`
- Content changes create GitHub commits automatically
- Requires GitHub OAuth app setup

---

## 📝 Content Best Practices

### Image Management
- Store images in `public/assets/`
- Use descriptive alt text for accessibility
- Keep image file sizes optimized (< 500KB)
- Use meaningful file names

### SEO Optimization
- Fill in all required fields
- Write descriptive, keyword-rich descriptions
- Use proper heading hierarchy in markdown
- Keep URLs/slugs clean and descriptive

### Content Organization
- Use the `order` field to control display sequence
- Mark only important items as `featured`
- Choose appropriate categories for FAQs
- Keep descriptions concise but informative

---

## 🆘 Troubleshooting

### "Keystatic admin panel not loading"
- Check that dev server is running (`npm run dev`)
- Navigate to correct URL: `http://localhost:PORT/keystatic`
- Check browser console for errors

### "Changes not appearing on website"
- Refresh the page (Ctrl+R / Cmd+R)
- Check that the page you're viewing has been updated to use Keystatic
- Verify the content file was saved (check `content/` folder)

### "Build fails with script error"
- The `generate-static-data.ts` file is corrupted
- Manually fix it using the reference implementation
- Run `npm run prebuild` to test

### "Images not showing"
- Check image path starts with `/assets/`
- Verify file exists in `public/assets/`
- Check file extension matches (case-sensitive)

---

## 📚 Additional Resources

- **Keystatic Documentation**: https://keystatic.com/docs
- **Implementation Docs**: See `docs/cms/` folder
  - `KEYSTATIC_DECISION_GUIDE.md` - Why we chose Keystatic
  - `KEYSTATIC_IMPLEMENTATION_GUIDE.md` - Full implementation details
  - `KEYSTATIC_MIGRATION_PLAN.md` - Migration strategy
  - `KEYSTATIC_QUICK_START.md` - Quick reference

---

## ✅ Quick Checklist

**To start using Keystatic today:**
- [x] Run `npm run dev`
- [x] Navigate to `http://localhost:8081/keystatic`
- [x] Try editing a cat's information
- [x] Check the Cats page to see your changes
- [ ] Fix `generate-static-data.ts` script
- [ ] Update remaining pages (Home, Gallery, FAQ)
- [ ] Test production build

---

**Last Updated**: October 14, 2025  
**Status**: ✅ Admin panel functional, ⚠️ Partial page integration
