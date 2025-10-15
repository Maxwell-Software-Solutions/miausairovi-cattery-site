# Keystatic Local Mode Issue - Complete Explanation & Solutions

## 🔴 The Problem

You're getting:
```
Unable to load collection
Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## 🤔 Why This Happens

**Keystatic's "local" storage mode requires a backend server** to handle file operations. When you use Keystatic in a pure React SPA (Single Page Application) with Vite, there's no backend to handle API requests, so:

1. Keystatic tries to make API calls like `GET /api/keystatic/collections/cats`
2. Vite doesn't have these routes, so it returns the `index.html` (404 fallback)
3. Keystatic expects JSON but gets HTML (`<!DOCTYPE html...`)
4. Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

**Keystatic's local mode is designed for:**
- Next.js (has API routes)
- Astro (has server endpoints)  
- Remix (has loaders/actions)
- **NOT** pure React SPAs with Vite

## ✅ Solutions (3 Options)

### Option 1: Use GitHub Mode (Recommended for Production)

**Pros:**
- ✅ Works perfectly with React SPAs
- ✅ Content versioned in Git automatically
- ✅ Multiple people can edit safely
- ✅ Works in production

**Cons:**
- ❌ Requires GitHub OAuth app setup (15 minutes)
- ❌ Requires GitHub account to edit content

**How to Set Up:**

1. Update `keystatic.config.tsx`:
```tsx
export default config({
  storage: {
    kind: 'github',
    repo: 'Maxwell-Software-Solutions/miausairovi-cattery-site',
  },
  // ... rest of config
});
```

2. Create a GitHub OAuth App:
   - Go to https://github.com/settings/developers
   - Click "New OAuth App"
   - Application name: "Miausairovi Cattery CMS"
   - Homepage URL: `http://localhost:8080` (for dev)
   - Authorization callback URL: `http://localhost:8080/keystatic/api/github/oauth/callback`
   - Click "Register application"
   - Copy the Client ID

3. Create `.env.local` file:
```bash
PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID=your_client_id_here
PUBLIC_KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret_here
```

4. Restart dev server - admin panel will work!

---

### Option 2: Edit Markdown Files Directly (Simplest)

**Pros:**
- ✅ No setup needed
- ✅ Works right now
- ✅ Full control
- ✅ Can use any text editor

**Cons:**
- ❌ No visual admin panel
- ❌ Need to know Markdown syntax
- ❌ Manual file management

**How to Use:**

Content is already in `content/` folder as Markdown files. Just edit them directly!

**Example - Edit a cat:**
1. Open `content/cats/pukis.md` in VS Code
2. Edit the frontmatter or description
3. Save
4. Refresh website - changes appear!

**Example - Add a new cat:**
1. Create `content/cats/new-cat.md`
2. Add content:
```markdown
---
name: New Cat Name
breed: British Shorthair
color: Blue
titles: Champion Title
images:
  - image: /assets/cats/NewCat/photo1.jpg
    alt: New Cat
featured: true
order: 4
---

Description of the new cat goes here.
```
3. Run `npm run prebuild` to regenerate JSON
4. Refresh website!

---

### Option 3: Add a Simple Backend (Most Complex)

**Pros:**
- ✅ Admin panel works locally
- ✅ No GitHub required
- ✅ Works offline

**Cons:**
- ❌ Requires backend setup (Express server)
- ❌ More complex deployment
- ❌ Need to run two servers in dev

**Implementation:** Would require setting up Express.js middleware to handle Keystatic API routes. Not recommended unless you need offline editing capability.

---

## 🎯 My Recommendation

**For your use case, I recommend: Option 2 (Edit Markdown Directly) + Option 1 (GitHub Mode for production)**

### Why?

1. **Development**: Edit Markdown files directly in VS Code
   - Fast, simple, no setup
   - You have full control
   - Files are already there

2. **Production**: Enable GitHub mode when you deploy
   - Client can use visual admin panel
   - Changes automatically create Git commits
   - Safe, versioned, collaborative

### Hybrid Approach (Best of Both Worlds)

**Current Setup (Dev - Works Now):**
```tsx
// keystatic.config.tsx
storage: { kind: 'local' }
```
- ✅ You edit `content/*.md` files directly in VS Code
- ✅ Run `npm run prebuild` to regenerate JSON  
- ✅ Website displays your changes
- ✅ No admin panel needed during development

**Future Setup (Production):**
```tsx
// keystatic.config.tsx
storage: {
  kind: process.env.NODE_ENV === 'production' ? 'github' : 'local',
  repo: 'Maxwell-Software-Solutions/miausairovi-cattery-site'
}
```
- ✅ In production: Client uses `/keystatic` admin panel
- ✅ In dev: You edit files directly (faster workflow)

---

## 📝 Quick How-To: Edit Content Right Now

Since the admin panel doesn't work with local mode in React, here's how to manage content:

### Add a New Cat:
```bash
# 1. Create the file
New-Item content/cats/luna.md

# 2. Add this content:
---
name: Luna
breed: British Shorthair
color: Silver Tabby
titles: Champion Luna
images:
  - image: /assets/cats/Luna/photo1.jpg
    alt: Luna the cat
featured: true
order: 4
---

Beautiful silver tabby British Shorthair with excellent pedigree.

# 3. Regenerate the JSON
npm run prebuild

# 4. Check the website - your new cat appears!
```

### Edit Existing Content:
1. Open any file in `content/` folder
2. Edit the YAML frontmatter or Markdown content
3. Save
4. Run `npm run prebuild`
5. Refresh website

---

## 🔧 Technical Details

### Why Local Mode Fails in React SPA

Keystatic's local mode implementation:
```
Keystatic Admin (Browser)
    ↓
Makes API Request: GET /api/keystatic/...
    ↓
Vite Dev Server (No API routes!)
    ↓
Returns: index.html (SPA fallback)
    ↓
Keystatic tries to parse HTML as JSON
    ↓
ERROR: Unexpected token '<'
```

### Why GitHub Mode Works

```
Keystatic Admin (Browser)
    ↓
Makes API Request to: https://api.github.com/...
    ↓
GitHub API Returns: JSON with file contents
    ↓
Keystatic parses successfully
    ↓
✅ Works!
```

---

## 📚 Related Documentation

- Keystatic Local Mode: https://keystatic.com/docs/local-mode
- Keystatic GitHub Mode: https://keystatic.com/docs/github-mode
- Creating GitHub OAuth Apps: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

---

## ✨ Next Steps

**Immediate (Today):**
1. Use Option 2 - Edit Markdown files directly
2. Content is in `content/` folder
3. Run `npm run prebuild` after changes
4. Website works perfectly!

**Later (When Deploying):**
1. Set up GitHub OAuth app (15 min)
2. Switch to GitHub mode
3. Admin panel works in production
4. Client can edit via `/keystatic`

---

**Bottom Line:** The admin panel won't work in local mode with React/Vite. Edit Markdown files directly (which is actually faster for development!), and enable GitHub mode for production when you need the visual admin panel.
