# Keystatic Production Error Fix

## Issue

When accessing `/keystatic/collection/cats` in production, the following error occurred:

```
Unable to load collection
Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

## Root Cause

The error occurred because:

1. **Keystatic is configured for local mode only** - The `keystatic.config.tsx` uses `storage: { kind: 'local' }`, which means it only works in local development where it can access the file system directly.

2. **Incorrect routing configuration** - The `vercel.json` had a catch-all rewrite rule `/(.*)` that was redirecting ALL routes (including Keystatic API routes) to `index.html`. When Keystatic tried to fetch JSON data from its API, it received the HTML page instead, causing the "not valid JSON" error.

3. **Keystatic route accessible in production** - The React Router configuration allowed access to `/keystatic/*` routes even in production, where Keystatic cannot function.

## Solution

### 1. Updated `vercel.json`

Changed the rewrite configuration to:

```json
{
  "rewrites": [
    {
      "source": "/((?!keystatic).*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "src": "/keystatic(.*)?",
      "status": 404,
      "dest": "/index.html"
    }
  ]
}
```

**What this does:**
- The rewrite rule now uses a negative lookahead `(?!keystatic)` to exclude `/keystatic/*` routes
- Explicitly returns 404 for any `/keystatic` routes in production
- All other routes still get rewritten to `index.html` for React Router SPA functionality

### 2. Updated `src/App.tsx`

Added development-only check for Keystatic routes:

```tsx
// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

// In Routes:
{isDevelopment && (
  <Route path="/keystatic/*" element={<KeystaticAdmin />} />
)}
```

**What this does:**
- Only renders the Keystatic route when in development mode (`npm run dev`)
- In production builds, the route doesn't exist at all
- Prevents any attempts to access Keystatic admin in production

## How Keystatic Works in This Project

### Development (Local)
1. Run `npm run dev`
2. Access Keystatic admin at `http://localhost:5173/keystatic`
3. Edit content through the CMS interface
4. Changes are saved to `content/` directory
5. Commit and push changes to GitHub

### Production (Vercel)
1. **Keystatic admin is NOT accessible** (as designed)
2. Content is read from the `content/` directory during build
3. The `prebuild` script generates static JSON data
4. The site uses this pre-generated static data
5. No CMS functionality in production

## Key Points

- ✅ Keystatic admin only works in local development
- ✅ Production uses pre-built static content from the `content/` directory
- ✅ No database or backend required in production
- ✅ Content changes must be made locally and committed to Git
- ✅ `/keystatic/*` routes are now properly blocked in production

## Testing

### To verify the fix works:

1. **In Development:**
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:5173/keystatic` - should work ✅

2. **In Production:**
   ```bash
   npm run build
   npm run preview
   ```
   - Visit `http://localhost:4173/keystatic` - should show 404 ✅
   - Main site should work normally ✅

## Files Changed

- `vercel.json` - Updated routing configuration
- `src/App.tsx` - Added development-only check for Keystatic routes

## Related Documentation

- [KEYSTATIC_PRODUCTION_SETUP.md](./KEYSTATIC_PRODUCTION_SETUP.md) - Full production setup guide
- [KEYSTATIC_FIX_SUMMARY.md](./KEYSTATIC_FIX_SUMMARY.md) - Previous Keystatic configuration fixes
