# Keystatic CMS Quick Start Guide

## What is Keystatic?

Keystatic is a Git-based content management system that stores your content as Markdown files in your repository. It provides a visual admin interface while keeping your content version-controlled and portable.

## Quick Installation

```bash
# Install Keystatic
npm install @keystatic/core @keystatic/astro

# Install TypeScript execution (for scripts)
npm install -D tsx
```

## Access the Admin Panel

Once configured:

1. **Local Development**: `http://localhost:3000/keystatic`
2. **Production**: `https://yourdomain.com/keystatic`

## Basic Commands

```bash
# Run development server with Keystatic
npm run dev

# Generate static data from Keystatic content
npm run prebuild

# Build for production (runs prebuild automatically)
npm run build

# Validate content
npx tsx scripts/validate-content.ts

# Migrate existing data to Keystatic
npx tsx scripts/migrate-to-keystatic.ts
```

## Content Management

### Adding a New Cat

1. Go to `/keystatic` admin panel
2. Click "Cats" in the sidebar
3. Click "Create Cat"
4. Fill in the form:
   - Name (required)
   - Breed (required)
   - Color
   - Titles
   - Description (rich text editor)
   - Images (upload multiple)
   - Featured checkbox
   - Display order
5. Click "Save"

### Adding a New Kitten

1. Go to `/keystatic` admin panel
2. Click "Kittens" in the sidebar
3. Click "Create Kitten"
4. Fill in:
   - Name
   - Age
   - Status (Available/Reserved/Sold)
   - Gender
   - Color
   - Price
   - Main image
   - Gallery images
   - Parent information
   - Birth date
   - Available from date
5. Click "Save"

### Adding a Review

1. Go to `/keystatic` admin panel
2. Click "Reviews" in the sidebar
3. Click "Create Review"
4. Fill in:
   - Reviewer name
   - Rating (1-5 stars)
   - Date
   - Review text
   - Platform (Facebook/Google/etc.)
   - Featured checkbox (for homepage)
5. Click "Save"

### Adding an FAQ

1. Go to `/keystatic` admin panel
2. Click "FAQs" in the sidebar
3. Click "Create FAQ"
4. Fill in:
   - Question
   - Answer
   - Category
   - Display order
5. Click "Save"

## Editing Content

### Edit Existing Content

1. Navigate to the content type in the sidebar
2. Click on the item you want to edit
3. Make your changes
4. Click "Save"

### In Local Mode

- Changes are immediately saved to your `content/` folder
- Commit changes to Git when ready
- Push to deploy

### In GitHub Mode

- Changes create a Pull Request automatically
- Review the PR
- Merge to deploy

## Content Structure

After migration, your content lives here:

```text
content/
  cats/
    pukis.md
    afina.md
    esmy.md
  kittens/
    kitten-1.md
    kitten-2.md
  reviews/
    sarah-johnson.md
    michael-chen.md
  faqs/
    how-much-does-a-british-shorthair-kitten-cost.md
  homepage.yaml
  settings.yaml
```

## File Format Example

### Cat File (`content/cats/pukis.md`)

```yaml
---
name: Pukis
breed: British Longhair
color: Golden Shaded
titles: Grand Champion Pukis
images:
  - image: /assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg
    alt: Pukis - British Longhair
  - image: /assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg
    alt: Pukis portrait
featured: true
order: 1
---

Our boy Grand Champion Diamondglow Pukis of Miausairovi.
```

### Kitten File (`content/kittens/bella.md`)

```yaml
---
name: Bella
age: 8 weeks
status: available
gender: female
color: Blue
price: £1200
image: /assets/cats/Kittens/bella.jpg
gallery:
  - /assets/cats/Kittens/bella-1.jpg
  - /assets/cats/Kittens/bella-2.jpg
parentFather: Pukis
parentMother: Afina
birthDate: 2024-08-15
availableFrom: 2024-10-15
---

Beautiful blue British Shorthair female kitten with excellent temperament.
```

## Common Tasks

### Update Homepage Content

1. Go to `/keystatic`
2. Click "Homepage Content" in sidebar
3. Edit:
   - Hero title
   - Hero subtitle
   - Feature cards
4. Save changes

### Update Site Settings

1. Go to `/keystatic`
2. Click "Site Settings" in sidebar
3. Edit:
   - Site name
   - Contact info
   - Social media links
4. Save changes

### Change Kitten Status

1. Go to `/keystatic` → Kittens
2. Find the kitten
3. Change status dropdown (Available → Reserved → Sold)
4. Save

### Upload New Images

1. When editing content, click the image upload field
2. Choose "Upload New Image"
3. Select image from your computer
4. Image is automatically copied to the correct folder
5. Save the content

## Workflow Tips

### Daily Content Updates

```bash
# 1. Pull latest changes
git pull

# 2. Start dev server
npm run dev

# 3. Edit content at http://localhost:3000/keystatic

# 4. Review changes
git status
git diff

# 5. Commit changes
git add content/
git commit -m "Update kitten availability"

# 6. Push to deploy
git push
```

### Before Publishing

- [ ] Preview changes locally (`npm run dev`)
- [ ] Check images load correctly
- [ ] Validate content (`npx tsx scripts/validate-content.ts`)
- [ ] Build successfully (`npm run build`)
- [ ] Test preview (`npm run preview`)
- [ ] Commit to Git
- [ ] Push and deploy

## Troubleshooting

### Content not showing after edit?

```bash
# Regenerate static data
npm run prebuild

# Restart dev server
# Press Ctrl+C, then:
npm run dev
```

### Images not loading?

- Check image path starts with `/assets/`
- Ensure image exists in `public/assets/` folder
- Clear browser cache

### Admin panel not accessible?

- Check you're at the correct URL: `/keystatic`
- Ensure dev server is running
- Clear browser cache and reload

### Changes not saving?

- Check browser console for errors
- Ensure you have write permissions to the folder
- Check Git status - files should be modified

## Git Integration

### Local Mode (Default)

- Changes saved directly to local files
- You commit manually to Git
- Full control over when to publish

### GitHub Mode (Advanced)

- Changes create Pull Requests
- Review before merging
- Edit from anywhere (even deployed site)
- Requires GitHub App setup

## Security

### Who can edit content?

**Local Mode:**

- Anyone with repository access
- Must run locally or on dev server

**GitHub Mode:**

- Authenticated GitHub users
- Repository collaborators
- Fine-grained access control via GitHub

### Production Access

To enable editing on production:

1. Set up GitHub mode
2. Configure authentication
3. Only authorized users can log in
4. All changes reviewed via PRs

## Performance

### Build Time

- Content read at build time (fast)
- Generated as static JSON
- No runtime database queries

### Page Load

- Static content (instant)
- Images cached by CDN
- Optimized for performance

## Backup & Recovery

### Content Backup

- Automatic via Git
- Every commit is a backup
- Easy to restore previous versions

### Restore Previous Version

```bash
# View history
git log content/

# Restore specific file
git checkout <commit-hash> content/cats/pukis.md

# Restore all content to previous commit
git checkout <commit-hash> content/
```

## Best Practices

### Content Organization

- Use descriptive filenames (slug-friendly)
- Keep images organized by content type
- Use meaningful alt text for images
- Set display order for control

### Image Guidelines

- Optimize images before uploading (<500KB)
- Use descriptive filenames
- Provide alt text for accessibility
- Use consistent aspect ratios

### Commit Messages

```bash
# Good commit messages
git commit -m "Add new kitten: Bella (available)"
git commit -m "Update Pukis images and description"
git commit -m "Mark kitten #3 as sold"

# Less helpful
git commit -m "Update content"
git commit -m "Changes"
```

## Getting Help

### Resources

- **Full Migration Guide**: See `KEYSTATIC_MIGRATION_PLAN.md`
- **Keystatic Docs**: https://keystatic.com/docs
- **GitHub Issues**: For bug reports
- **Discord**: Keystatic community support

### Common Questions

**Q: Can I use Keystatic without GitHub?**
A: Yes! Local mode works perfectly for single-user editing.

**Q: What if I want to go back to TypeScript data files?**
A: Your content is in Markdown - easy to convert back anytime.

**Q: Does this affect site performance?**
A: No! Content is generated at build time, site remains static and fast.

**Q: Can multiple people edit at once?**
A: In GitHub mode, yes. In local mode, coordinate via Git.

## Summary

✅ **Easy content editing** via visual admin
✅ **No code changes** needed for content updates
✅ **Git-based** version control
✅ **Fast** static site generation
✅ **Flexible** and portable content

**Ready to start?** Follow the [full migration plan](./KEYSTATIC_MIGRATION_PLAN.md)!
