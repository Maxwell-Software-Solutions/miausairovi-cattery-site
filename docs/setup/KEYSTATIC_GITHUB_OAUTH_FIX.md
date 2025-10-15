# Keystatic GitHub OAuth 404 Error - Fix Guide

## Problem
After GitHub authentication, the callback URL `https://miausairovi.com/api/keystatic/github/login` returns a 404 error, preventing CMS functionality from working in production.

## Root Causes Fixed

### 1. Environment Variable Issue ✅
**Problem:** The API handler was using `VITE_GITHUB_CLIENT_ID` and `VITE_GITHUB_CLIENT_SECRET`, but Vercel serverless functions don't have access to `VITE_` prefixed variables (these are only for client-side builds).

**Fix:** Updated the handler to use `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` with fallback to VITE_ versions for local development.

### 2. URL Construction Issue ✅
**Problem:** The API handler was using `req.url` which only contains the path, not the full URL needed by Keystatic's OAuth handler.

**Fix:** Properly construct the full URL using protocol, host, and path from Vercel request headers.

### 3. Vercel Routing Issue ✅
**Problem:** The catch-all route for Keystatic API wasn't explicitly configured, causing routing issues.

**Fix:** Added explicit rewrite rule for `/api/keystatic/:path*` to map to the catch-all handler.

### 4. Error Handling ✅
**Problem:** No error logging made debugging production issues difficult.

**Fix:** Added comprehensive error logging and try-catch blocks.

## Setup Steps

### Step 1: Configure Vercel Environment Variables

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add these variables (if not already present):
   ```
   GITHUB_CLIENT_ID=your_github_oauth_client_id
   GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
   ```

3. Make sure they're enabled for **Production**, **Preview**, and **Development** environments

4. **Important:** Do NOT use the `VITE_` prefix for these variables in Vercel

### Step 2: Configure GitHub OAuth App

1. Go to **GitHub** → **Settings** → **Developer Settings** → **OAuth Apps**

2. Select your OAuth App (or create one if it doesn't exist)

3. Set the **Authorization callback URL** to:
   ```
   https://miausairovi.com/api/keystatic/github/oauth/callback
   ```

4. If testing with preview deployments, add additional callback URLs:
   ```
   https://your-preview-url.vercel.app/api/keystatic/github/oauth/callback
   ```

### Step 3: Deploy the Changes

The following files have been updated:
- `api/keystatic/[...params].ts` - Fixed environment variables and URL handling
- `vercel.json` - Added explicit routing for Keystatic API

Deploy these changes:
```bash
git add api/keystatic/[...params].ts vercel.json
git commit -m "Fix Keystatic GitHub OAuth callback handling"
git push
```

### Step 4: Test the OAuth Flow

1. After deployment, go to: `https://miausairovi.com/keystatic`

2. Click "Sign in with GitHub"

3. Authorize the application

4. You should be redirected back to the Keystatic admin panel (not a 404)

## Debugging in Production

The updated API handler now includes console logging. To view logs:

1. Go to **Vercel Dashboard** → Your Project → **Deployments**

2. Click on the latest deployment

3. Go to the **Functions** tab

4. Find `api/keystatic/[...params]` and click to view logs

You should see logs like:
```
Keystatic API called: { method: 'GET', url: '/api/keystatic/github/login?code=...', ... }
Full URL: https://miausairovi.com/api/keystatic/github/login?code=...
Keystatic response: { status: 302, headers: [...] }
```

## Common Issues & Solutions

### Issue: Still getting 404
**Check:**
- Environment variables are set in Vercel (without VITE_ prefix)
- GitHub OAuth callback URL matches exactly: `https://miausairovi.com/api/keystatic/github/oauth/callback`
- Latest deployment is live (check Vercel dashboard)

### Issue: "Invalid client_id or client_secret"
**Check:**
- Environment variables contain the correct values
- No extra spaces or quotes in the values
- Variables are set for the Production environment

### Issue: "Redirect URI mismatch"
**Check:**
- GitHub OAuth app callback URL matches the deployment URL exactly
- No trailing slashes in the callback URL
- Protocol is HTTPS (not HTTP)

### Issue: Logs show "Cannot read property X of undefined"
**Check:**
- The `keystatic.config.tsx` file is valid
- All required dependencies are installed
- The build completed successfully

## Verification Checklist

- [ ] Environment variables `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in Vercel (without VITE_ prefix)
- [ ] GitHub OAuth app callback URL is: `https://miausairovi.com/api/keystatic/github/oauth/callback`
- [ ] Changes to `api/keystatic/[...params].ts` are deployed
- [ ] Changes to `vercel.json` are deployed
- [ ] Can access `/keystatic` admin panel
- [ ] Can click "Sign in with GitHub" button
- [ ] After GitHub authorization, redirected back (not 404)
- [ ] Can see and edit content in Keystatic

## Alternative: Switch to Local Mode

If GitHub OAuth continues to have issues, you can switch to local mode:

1. Update `keystatic.config.tsx`:
   ```typescript
   storage: {
     kind: 'local',
   }
   ```

2. Remove the API handler (no longer needed)

3. Edit content locally and commit to Git

See `KEYSTATIC_PRODUCTION_SETUP.md` for details on local mode.

## Support

If issues persist:

1. Check Vercel function logs for detailed error messages
2. Verify GitHub OAuth app configuration
3. Test with a preview deployment first
4. Check that all dependencies are up to date

## Technical Details

### How the Fix Works

1. **Request Flow:**
   - User clicks "Sign in with GitHub" in Keystatic UI
   - Redirected to GitHub OAuth authorization page
   - User authorizes the app
   - GitHub redirects to: `https://miausairovi.com/api/keystatic/github/oauth/callback?code=...`

2. **API Handler:**
   - Vercel routes the request to `api/keystatic/[...params].ts`
   - Handler constructs full URL with protocol, host, and path
   - Passes request to Keystatic's generic API handler
   - Handler exchanges OAuth code for access token
   - Returns redirect response to Keystatic UI

3. **Keystatic:**
   - Receives access token
   - Stores token in browser
   - Uses token for GitHub API calls to read/write content

### Environment Variable Handling

- **Development:** Uses `VITE_GITHUB_CLIENT_ID` (client-side)
- **Production API:** Uses `GITHUB_CLIENT_ID` (server-side only)
- **Fallback:** Handler tries both to support local development

### URL Construction

The handler now properly constructs URLs using:
```typescript
const protocol = req.headers['x-forwarded-proto'] || 'https';
const host = req.headers['x-forwarded-host'] || req.headers.host;
const fullUrl = `${protocol}://${host}${req.url}`;
```

This ensures OAuth callbacks work correctly with Vercel's proxy headers.
