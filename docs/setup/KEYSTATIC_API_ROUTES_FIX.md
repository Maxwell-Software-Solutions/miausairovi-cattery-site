# Keystatic API Routes Fix for Vercel

## Issue

When accessing Keystatic in production, the `/api/keystatic/github/login` route returned a 404 error even though environment variables were set correctly in Vercel.

## Root Cause

Keystatic requires **serverless API routes** to handle GitHub OAuth authentication and API requests. A Vite/React SPA doesn't automatically create these routes - they need to be explicitly configured for Vercel's serverless functions.

## Solution

### 1. Created Vercel Serverless API Function

Created `api/keystatic/[...params].ts` - a catch-all API route that handles all Keystatic API requests:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import keystaticConfig from '../../keystatic.config';

const handler = makeGenericAPIRouteHandler({
  config: keystaticConfig,
  clientId: process.env.VITE_GITHUB_CLIENT_ID,
  clientSecret: process.env.VITE_GITHUB_CLIENT_SECRET,
});

export default async function (req: VercelRequest, res: VercelResponse) {
  // Convert VercelRequest to KeystaticRequest and handle response
  // ...
}
```

### 2. Updated `vercel.json` Configuration

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/keystatic/[...params].ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**What this does:**
- First rewrite rule: API routes are handled by serverless functions
- Second rewrite rule: All other routes go to index.html for React Router
- Functions config: Sets memory and timeout for the Keystatic API function

### 3. Installed Required Dependencies

Installed `@vercel/node` package for Vercel serverless function types:

```bash
npm install @vercel/node
```

## How It Works Now

### Request Flow

1. User visits `/keystatic` → React app loads
2. User clicks "Sign in with GitHub" → `/api/keystatic/github/login` is called
3. Vercel routes request to `api/keystatic/[...params].ts` serverless function
4. Function uses `makeGenericAPIRouteHandler` from `@keystatic/core/api/generic`
5. OAuth flow initiates with GitHub using your Client ID and Secret
6. User authorizes → GitHub redirects back to `/api/keystatic/github/oauth/callback`
7. Callback is handled by the same serverless function
8. User is authenticated and can edit content

### API Routes Handled

The `[...params].ts` catch-all route handles:
- `/api/keystatic/github/login` - Initiates OAuth flow
- `/api/keystatic/github/oauth/callback` - Handles OAuth callback
- `/api/keystatic/collections/*` - Collection data endpoints
- `/api/keystatic/singletons/*` - Singleton data endpoints
- All other Keystatic API operations

## Environment Variables

Make sure these are set in Vercel:

| Variable | Description |
|----------|-------------|
| `VITE_GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID |
| `VITE_GITHUB_CLIENT_SECRET` | Your GitHub OAuth App Client Secret |
| `VITE_ADMIN_USERNAME` | Optional additional auth |
| `VITE_ADMIN_PASSWORD` | Optional additional auth |

**Note:** The API function accesses these via `process.env.VITE_GITHUB_CLIENT_ID` etc.

## Files Created/Modified

### New Files
- ✅ `api/keystatic/[...params].ts` - Keystatic API handler

### Modified Files
- ✅ `vercel.json` - Updated routing configuration
- ✅ `package.json` - Added `@vercel/node` dependency

## Testing

### Local Development

```bash
npm run dev
```

- Access: `http://localhost:5173/keystatic`
- API routes won't work exactly the same in development (use local storage mode for local dev, or use `vercel dev`)

### With Vercel CLI (Recommended for Local API Testing)

```bash
npm install -g vercel
vercel dev
```

- Access: `http://localhost:3000/keystatic`
- API routes work exactly like production

### Production

```bash
git add .
git commit -m "Add Keystatic API routes for Vercel"
git push origin main
```

- Access: `https://your-domain.com/keystatic`
- Click "Sign in with GitHub"
- Should redirect to GitHub OAuth
- After authorization, should return to Keystatic CMS

## Troubleshooting

### Still getting 404 on API routes

**Check:**
1. The `api/` folder is in the project root (not in `src/`)
2. File is named `[...params].ts` (with brackets)
3. Vercel deployment logs show the function was created
4. Environment variables are set in Vercel

### "Client ID or Client Secret missing" error

**Solution:**
- Verify `VITE_GITHUB_CLIENT_ID` and `VITE_GITHUB_CLIENT_SECRET` are set in Vercel
- Redeploy after adding environment variables
- Check the Vercel function logs for the actual values being used

### OAuth redirect mismatch

**Solution:**
- Make sure your GitHub OAuth App callback URL matches exactly: `https://your-domain.com/api/keystatic/github/oauth/callback`
- Use your actual production domain
- No trailing slashes

### Function timeout

**If operations are slow:**
- Increase `maxDuration` in vercel.json (default is 10 seconds)
- Check Vercel plan limits (Hobby plan: max 10s, Pro: max 60s)

## Key Points

- ✅ Keystatic requires serverless API functions to work in production
- ✅ The `[...params].ts` catch-all pattern handles all Keystatic API routes
- ✅ Environment variables must be prefixed with `VITE_` to be accessible
- ✅ API folder must be at project root, not in `src/`
- ✅ Use `vercel dev` for local testing with API routes

## Related Documentation

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Keystatic API Documentation](https://keystatic.com/docs/apis-and-references)
- [KEYSTATIC_GITHUB_OAUTH_SETUP.md](./KEYSTATIC_GITHUB_OAUTH_SETUP.md) - OAuth setup guide

---

**Status**: API routes configured ✅  
**Next**: Deploy to production and test OAuth flow
