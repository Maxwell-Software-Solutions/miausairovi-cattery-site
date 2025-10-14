# Keystatic Production Setup Guide

## Overview

Your Keystatic CMS is configured to use **GitHub mode**, which allows you to edit content directly on your production site. Changes are committed to GitHub, triggering automatic Vercel rebuilds.

## Setup Steps

### 1. Create a GitHub OAuth App

1. Go to **GitHub Settings** → **Developer settings** → **OAuth Apps**
   - Direct link: https://github.com/settings/developers

2. Click **"New OAuth App"**

3. Fill in the details:
   ```
   Application name: Miausairovi Cattery CMS
   Homepage URL: https://your-production-domain.com
   Authorization callback URL: https://your-production-domain.com/api/keystatic/github/oauth/callback
   ```

4. Click **"Register application"**

5. On the next page:
   - Copy the **Client ID**
   - Click **"Generate a new client secret"**
   - Copy the **Client Secret** (you won't see it again!)

### 2. Configure Vercel Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   ```
   KEYSTATIC_GITHUB_CLIENT_ID=your_client_id_here
   KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret_here
   KEYSTATIC_SECRET=your_random_secret_here
   
   # Keep your existing auth credentials
   VITE_ADMIN_USERNAME=your_username_here
   VITE_ADMIN_PASSWORD=your_secure_password_here
   ```

   **To generate KEYSTATIC_SECRET:**
   ```bash
   # On Windows PowerShell
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   ```

4. Make sure to add these for **Production**, **Preview**, and **Development** environments

### 3. Update Your Local .env File

Add the GitHub credentials to your local `.env` file for local development:

```env
# Existing admin credentials
VITE_ADMIN_USERNAME=your_username_here
VITE_ADMIN_PASSWORD=your_secure_password_here

# GitHub OAuth (for production)
KEYSTATIC_GITHUB_CLIENT_ID=your_client_id_here
KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret_here
KEYSTATIC_SECRET=your_random_secret_here
```

### 4. Create API Route for GitHub OAuth

Keystatic needs an API endpoint to handle GitHub authentication. Create this file:

**File:** `public/_redirects` (for Vercel SPA routing)
```
/api/keystatic/github/*  /.netlify/functions/keystatic-api/:splat  200
/*  /index.html  200
```

**Note:** Since you're using Vite + React (not Next.js), you have two options:

#### Option A: Use Keystatic Cloud (Easier)
Instead of managing your own GitHub OAuth app, use Keystatic's managed service:

1. Change the storage config to:
   ```tsx
   storage: {
     kind: 'github',
     repo: 'Maxwell-Software-Solutions/miausairovi-cattery-site',
   },
   cloud: {
     project: 'miausairovi-cattery',
   },
   ```

2. Sign up at https://keystatic.cloud
3. Create a project called "miausairovi-cattery"
4. Connect your GitHub repository
5. No API routes or OAuth setup needed!

#### Option B: Add API Routes with Express
You'll need to add a small server to handle OAuth callbacks. This is more complex for a static site.

### 5. How It Works in Production

1. **Visit Admin Panel:**
   - Go to `https://your-site.com/keystatic`
   - Enter your admin credentials (your existing AuthGuard)

2. **GitHub Authentication:**
   - Click "Sign in with GitHub"
   - Authorize the app
   - You'll be redirected back to Keystatic

3. **Edit Content:**
   - Make changes in the Keystatic UI
   - Click "Commit" to save changes
   - Keystatic creates a commit in your GitHub repo

4. **Automatic Deployment:**
   - Vercel detects the new commit
   - Runs `npm run prebuild` (generates JSON from Markdown)
   - Runs `npm run build`
   - Deploys the updated site

## Local Development Workflow

### Using GitHub Mode Locally (Recommended)

1. Make sure you have the GitHub OAuth credentials in `.env`
2. Run `npm run dev`
3. Go to `http://localhost:5173/keystatic`
4. Sign in with GitHub
5. Edit content - it commits to your repo
6. Pull changes: `git pull`
7. Restart dev server to see changes

### Using Local Mode for Development

If you prefer to edit locally without GitHub integration during development:

1. Create `keystatic.config.local.tsx`:
   ```tsx
   import { config, fields, collection, singleton } from '@keystatic/core';
   
   export default config({
     storage: {
       kind: 'local',
     },
     // ... rest of your config (copy from keystatic.config.tsx)
   });
   ```

2. In development, import the local config
3. In production, use the GitHub config

## Troubleshooting

### "Not authenticated" error
- Check that GitHub OAuth credentials are set in Vercel
- Verify the callback URL matches exactly
- Make sure KEYSTATIC_SECRET is set

### Changes not appearing on site
- Check Vercel deployment logs
- Ensure `prebuild` script ran successfully
- Verify `content/` folder has your changes in GitHub

### Local development not working
- Make sure you have the correct GitHub credentials in `.env`
- Try signing out and back in to GitHub
- Check that you have write access to the repository

## Recommended Approach: Keystatic Cloud

For your use case (static site on Vercel), **I strongly recommend using Keystatic Cloud** (Option A above). It:

- ✅ Handles all OAuth complexity for you
- ✅ Works perfectly with static sites
- ✅ Free tier available
- ✅ No API routes needed
- ✅ Automatic GitHub integration
- ✅ Works with your existing AuthGuard

Would you like me to set up Keystatic Cloud for you? It's much simpler than managing your own OAuth app.

## Security Notes

- Your existing AuthGuard provides the first layer of security
- GitHub OAuth provides the second layer (only authorized GitHub users can commit)
- Both layers protect your content from unauthorized changes
- Make sure to keep your `.env` file out of git (already configured in `.gitignore`)

## Support

- Keystatic Docs: https://keystatic.com/docs
- Keystatic GitHub: https://github.com/Thinkmill/keystatic
- Keystatic Cloud: https://keystatic.cloud
