# Keystatic CMS - Quick Reference Card

## 🚀 Getting Started (3 Steps)

```bash
# 1. Start development server
npm run dev

# 2. Open admin panel in browser
http://localhost:8081/keystatic

# 3. Start editing content!
```

---

## 📋 Content Types Available

| Type | Purpose | Location |
|------|---------|----------|
| **Cats** | Breeding cats | `/keystatic` → Cats |
| **Kittens** | Available kittens | `/keystatic` → Kittens |
| **Reviews** | Customer testimonials | `/keystatic` → Reviews |
| **FAQs** | Questions & answers | `/keystatic` → FAQs |
| **Homepage** | Hero & features | `/keystatic` → Homepage Content |
| **Settings** | Site-wide settings | `/keystatic` → Site Settings |

---

## ✏️ Common Tasks

### Add New Cat
1. Go to `/keystatic`
2. Click "Cats" → "Create Cat"
3. Fill form → Save
4. Check `/cats` page to see it live

### Edit Existing Content
1. Go to `/keystatic`
2. Click content type (e.g., "Kittens")
3. Click item from list
4. Edit → Save

### Change Display Order
- Edit the `order` field (lower number = appears first)
- Example: order: 1, 2, 3, etc.

### Feature Content on Homepage
- Toggle the `featured` field to `true`
- Featured items appear prominently

---

## 📁 Where Content is Stored

```
content/
├── cats/              ← Breeding cats (Markdown files)
├── kittens/           ← Available kittens
├── reviews/           ← Customer reviews
├── faqs/              ← FAQ entries
├── homepage.yaml      ← Homepage content
└── settings.yaml      ← Site settings
```

**Important**: Content is stored as **Markdown files** in the `content/` folder. You can edit them directly or through the admin panel!

---

## 🔄 How Changes Work

### In Development (npm run dev)
```
Edit in admin → Saves to content/*.md → Refresh page → See changes ✅
```

### In Production (after npm run build)
```
Edit in admin → Git commit → Deploy → See changes ✅
```

---

## ✅ Pages Using Keystatic

| Page | Status | Data Source |
|------|--------|-------------|
| Cats (`/cats`) | ✅ Working | `content/cats/` |
| Home (`/`) | ⚠️ Partial | Still using old data |
| Gallery (`/gallery`) | ⚠️ Partial | Still using old data |
| FAQ (`/faq`) | ⚠️ Partial | Still using old data |

---

## 🐛 Known Issues

1. **Generate script corrupted**: Production builds need manual fix
2. **Not all pages updated**: Only Cats page fully integrated
3. **No Git mode yet**: Admin only works locally

---

## 🆘 Quick Troubleshooting

**Admin panel won't load?**
- Make sure `npm run dev` is running
- Check the correct port in terminal output

**Changes not showing?**
- Refresh the page (Ctrl+R or Cmd+R)
- Check you're on a page that uses Keystatic (currently only `/cats`)

**Images not appearing?**
- Images must be in `public/assets/` folder
- Path must start with `/assets/`

---

## 📞 Need More Help?

See the full guide: `docs/cms/HOW_TO_USE_KEYSTATIC.md`

Or check the implementation docs in `docs/cms/`:
- KEYSTATIC_IMPLEMENTATION_GUIDE.md
- KEYSTATIC_QUICK_START.md
- KEYSTATIC_DECISION_GUIDE.md

---

**Quick Command Reference:**

```bash
npm run dev              # Start dev server + admin panel
npm run build           # Build for production (includes content generation)
npm run prebuild        # Generate static data from Keystatic content
```

---

**Last Updated**: October 14, 2025
