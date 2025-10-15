# Keystatic GitHub OAuth Setup for Production

## Overview

Your Keystatic CMS is now configured to use **GitHub storage mode**, which allows you to edit content in production through GitHub. This requires setting up GitHub OAuth authentication.

## What Changed

### Configuration Updates

1. **`keystatic.config.tsx`** - Now uses GitHub storage:
   ```tsx
   storage: {
     kind: 'github',
     repo: {
       owner: 'Maxwell-Software-Solutions',
       name: 'miausairovi-cattery-site',
     },
   }
   ```

2. **`vercel.json`** - Updated to allow Keystatic routes:
   ```json
   {
     "rewrites": [
       {
         "source": "/((?!api).*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. **`src/App.tsx`** - Keystatic route now works in production

## How It Works

With GitHub storage mode:

- ✅ **Keystatic works in production** - Access the CMS at `https://yourdomain.com/keystatic`
- ✅ **Changes are committed to GitHub** - Every edit creates a Git commit
- ✅ **Authentication via GitHub** - Users authenticate through GitHub OAuth
- ✅ **Automatic deployments** - Vercel rebuilds the site when content changes
- ✅ **Version control** - All content changes are tracked in Git history

## Setup Steps

### Step 1: Create a GitHub OAuth App

1. Go to GitHub → Settings → Developer settings → OAuth Apps
   - Or visit: https://github.com/settings/developers

2. Click **"New OAuth App"**

3. Fill in the application details:
   - **Application name**: `Miausairovi Cattery CMS`
   - **Homepage URL**: `https://your-domain.com`
   - **Authorization callback URL**: `https://your-domain.com/api/keystatic/github/oauth/callback`
   
   **Important**: Replace `your-domain.com` with your actual production domain (e.g., `miausairovi-cattery.vercel.app` or your custom domain)

4. Click **"Register application"**

5. You'll see two important values:
   - **Client ID** - Copy this value
   - **Client Secret** - Click "Generate a new client secret" and copy it

### Step 2: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard

2. Navigate to **Settings → Environment Variables**

3. Add the following variables:

   | Variable Name | Value | Environment |
   |--------------|-------|-------------|
   | `VITE_GITHUB_CLIENT_ID` | Your GitHub OAuth Client ID | Production, Preview, Development |
   | `VITE_GITHUB_CLIENT_SECRET` | Your GitHub OAuth Client Secret | Production, Preview, Development |
   | `VITE_ADMIN_USERNAME` | Your admin username (for additional auth) | Production, Preview, Development |
   | `VITE_ADMIN_PASSWORD` | Your secure admin password | Production, Preview, Development |

4. Click **"Save"** for each variable

### Step 3: Create Local `.env` File

Create a `.env` file in your project root (this file is gitignored):

```env
# GitHub OAuth credentials
VITE_GITHUB_CLIENT_ID=Ov23liQu5y7A3vsRnD2c
VITE_GITHUB_CLIENT_SECRET=953bc03ef09d823c38f3b8a649f53739763666f0

# Admin credentials for additional authentication
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password_here
```

**Important**: Never commit this file to Git. It's already in `.gitignore`.

### Step 4: Deploy to Production

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Configure Keystatic for GitHub storage mode"
   git push origin main
   ```

2. Vercel will automatically deploy your changes

3. Wait for the deployment to complete

### Step 5: Test the Setup

1. Visit your production site: `https://your-domain.com/keystatic`

2. You should see the Keystatic login page

3. Click **"Sign in with GitHub"**

4. Authorize the GitHub OAuth app

5. You should now see the Keystatic CMS interface

6. Try editing some content:
   - Click on "Cats", "Kittens", "Reviews", or "FAQs"
   - Make a change
   - Click "Commit"
   - The change will create a Git commit in your repository
   - Vercel will automatically rebuild and deploy

## Troubleshooting

### "OAuth app not found" error

**Problem**: GitHub OAuth app isn't configured correctly

**Solution**:
- Double-check the callback URL matches exactly: `https://your-domain.com/api/keystatic/github/oauth/callback`
- Make sure you're using your actual production domain
- Verify the Client ID and Secret are correct in Vercel environment variables

### "Unable to load collection" error

**Problem**: Keystatic can't access the GitHub repository

**Solution**:
- Verify the repo owner and name in `keystatic.config.tsx` match your GitHub repository
- Make sure you have access to the repository
- Check that the OAuth app has the correct permissions

### Changes not appearing on the site

**Problem**: Content updated but site not rebuilding

**Solution**:
- Check Vercel deployment logs
- Make sure the repository is connected to Vercel
- Verify that automatic deployments are enabled in Vercel settings

### "Unauthorized" error

**Problem**: GitHub OAuth authentication failing

**Solution**:
- Verify environment variables are set in Vercel
- Check that variables are available in all environments (Production, Preview, Development)
- Redeploy the site after adding environment variables

## Development vs Production

### Local Development

```bash
npm run dev
```

- Access Keystatic at `http://localhost:5173/keystatic`
- Changes are committed to local repository
- Requires GitHub OAuth (same setup as production)
- Or use `storage: { kind: 'local' }` for offline development

### Production

- Access Keystatic at `https://your-domain.com/keystatic`
- Changes are committed directly to GitHub
- Triggers automatic Vercel deployment
- Requires GitHub OAuth authentication

## Security Considerations

1. **OAuth Secrets**: Never commit Client Secret to Git
2. **Admin Password**: Use a strong password for additional auth layer
3. **Access Control**: Only authorized GitHub users can access the CMS
4. **Repository Permissions**: Make sure only trusted users have write access to the repository

## Content Workflow

1. **Edit Content**:
   - Visit `https://your-domain.com/keystatic`
   - Sign in with GitHub
   - Edit content through the CMS interface

2. **Save Changes**:
   - Click "Commit" in Keystatic
   - Provide a commit message
   - Changes are pushed to GitHub

3. **Automatic Deployment**:
   - Vercel detects the Git commit
   - Triggers a new build
   - Site is automatically updated

4. **View Changes**:
   - Wait ~1-2 minutes for build to complete
   - Refresh your site to see the changes

## Files Modified

- ✅ `keystatic.config.tsx` - Updated to GitHub storage mode
- ✅ `vercel.json` - Updated routing for Keystatic API
- ✅ `src/App.tsx` - Enabled Keystatic in production

## Related Documentation

- [Keystatic Documentation](https://keystatic.com/docs)
- [GitHub OAuth Apps Guide](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Quick Reference

| Action | URL |
|--------|-----|
| Access CMS (Production) | `https://your-domain.com/keystatic` |
| Access CMS (Local) | `http://localhost:5173/keystatic` |
| GitHub OAuth Settings | `https://github.com/settings/developers` |
| Vercel Environment Variables | `https://vercel.com/[your-account]/[your-project]/settings/environment-variables` |

---

**Need Help?** Check the troubleshooting section above or consult the [Keystatic documentation](https://keystatic.com/docs).
