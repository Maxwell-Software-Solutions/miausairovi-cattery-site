# Keystatic Production Setup Guide# Keystatic Production Setup Guide



## Overview## Overview



Your Keystatic CMS is configured to use **local mode**, which means:Your Keystatic CMS is configured to use **local mode**, which means:

- Content is stored in the `content/` directory as markdown/YAML files

- Content is stored in the `content/` directory as markdown/YAML files- Changes are made locally and committed to Git

- Changes are made locally and committed to Git- In production, content is built statically from the content files

- In production, content is built statically from the content files- **No GitHub OAuth or Keystatic Cloud connection required**

- **No GitHub OAuth or Keystatic Cloud connection required**

## How It Works

## How It Works

### Local Development

### Local Development1. Run `npm run dev` to start the development server

2. Access Keystatic admin at `http://localhost:5173/keystatic`

1. Run `npm run dev` to start the development server3. Log in with your admin credentials (VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD)

2. Access Keystatic admin at `http://localhost:5173/keystatic`4. Edit content through the CMS interface

3. Log in with your admin credentials (VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD)5. Changes are saved directly to the `content/` directory

4. Edit content through the CMS interface6. Commit and push changes to GitHub

5. Changes are saved directly to the `content/` directory

6. Commit and push changes to GitHub### Production (Vercel)

1. Content is read from the `content/` directory during build

### Production (Vercel)2. The `prebuild` script (`tsx scripts/generate-static-data.ts`) generates a JSON file

3. The site uses this static JSON data

1. Content is read from the `content/` directory during build4. **The Keystatic admin interface is NOT accessible in production** (local mode only)

2. The `prebuild` script (`tsx scripts/generate-static-data.ts`) generates a JSON file

3. The site uses this static JSON data## Environment Variables

4. **The Keystatic admin interface is NOT accessible in production** (local mode only)

### Required for Production

## Environment Variables

```env

### Required for Production# Admin credentials for local development

VITE_ADMIN_USERNAME=your_username_here

```envVITE_ADMIN_PASSWORD=your_secure_password_here

# Admin credentials for local development only```

VITE_ADMIN_USERNAME=your_username_here

VITE_ADMIN_PASSWORD=your_secure_password_here**Note:** In local mode, these are only used in development. The Keystatic admin panel will not be accessible in production.

```

## Content Management Workflow

**Note:** In local mode, these are only used in development. The Keystatic admin panel will not be accessible in production.

### Making Content Changes

## Content Management Workflow

1. **Clone the repository locally**

### Making Content Changes   ```bash

   git clone https://github.com/Maxwell-Software-Solutions/miausairovi-cattery-site.git

1. **Clone the repository locally**   cd miausairovi-cattery-site

   ```

   ```bash

   git clone https://github.com/Maxwell-Software-Solutions/miausairovi-cattery-site.git2. **Install dependencies**

   cd miausairovi-cattery-site   ```bash

   ```   npm install

   ```

2. **Install dependencies**

3. **Start the development server**

   ```bash   ```bash

   npm install   npm run dev

   ```   ```



3. **Start the development server**4. **Access the CMS**

   - Open `http://localhost:5173/keystatic` in your browser

   ```bash   - Log in with your admin credentials

   npm run dev   - Make your content changes

   ```

5. **Commit and push**

4. **Access the CMS**   ```bash

   - Open `http://localhost:5173/keystatic` in your browser   git add content/

   - Log in with your admin credentials   git commit -m "Update content via Keystatic"

   - Make your content changes   git push

   ```

5. **Commit and push**

6. **Vercel auto-deploys**

   ```bash   - Vercel detects the push and rebuilds automatically

   git add content/   - New content is live within minutes

   git commit -m "Update content via Keystatic"

   git push## Alternative: GitHub Mode (If You Want Remote Editing)

   ```

If you want to edit content directly in production without cloning locally, you can switch to GitHub mode:

6. **Vercel auto-deploys**You'll need to add a small server to handle OAuth callbacks. This is more complex for a static site.

   - Vercel detects the push and rebuilds automatically

   - New content is live within minutes### 5. How It Works in Production



## Benefits of Local Mode1. **Visit Admin Panel:**

   - Go to `https://your-site.com/keystatic`

- ✅ **No external dependencies** - No OAuth setup, no cloud service   - Enter your admin credentials (your existing AuthGuard)

- ✅ **Full version control** - All changes tracked in Git

- ✅ **Zero cost** - No paid services required2. **GitHub Authentication:**

- ✅ **Maximum security** - Content editing only possible with local access   - Click "Sign in with GitHub"

- ✅ **Fast and simple** - No API calls or authentication flows   - Authorize the app

- ✅ **Works offline** - Edit content without internet connection   - You'll be redirected back to Keystatic



## File-Based Editing Alternative3. **Edit Content:**

   - Make changes in the Keystatic UI

You can also edit content files directly without using Keystatic:   - Click "Commit" to save changes

   - Keystatic creates a commit in your GitHub repo

1. Navigate to the `content/` directory

2. Edit markdown files in any text editor4. **Automatic Deployment:**

3. Follow the existing structure and frontmatter format   - Vercel detects the new commit

4. Commit and push changes   - Runs `npm run prebuild` (generates JSON from Markdown)

   - Runs `npm run build`

### Content Structure   - Deploys the updated site



```## Local Development Workflow

content/

├── cats/           # Cat profiles (*.md)### Using GitHub Mode Locally (Recommended)

├── kittens/        # Available kittens (*.md)

├── faqs/           # FAQ entries (*.md)1. Make sure you have the GitHub OAuth credentials in `.env`

├── reviews/        # Customer reviews (*.md)2. Run `npm run dev`

├── homepage.yaml   # Homepage configuration3. Go to `http://localhost:5173/keystatic`

└── settings.yaml   # Site settings4. Sign in with GitHub

```5. Edit content - it commits to your repo

6. Pull changes: `git pull`

## Alternative: GitHub Mode (For Remote Editing)7. Restart dev server to see changes



If you want to edit content directly in production without cloning locally, you would need to switch to GitHub mode. However, this requires:### Using Local Mode for Development



- Setting up a GitHub OAuth AppIf you prefer to edit locally without GitHub integration during development:

- Configuring API routes (complex with Vite)

- Managing OAuth secrets1. Create `keystatic.config.local.tsx`:

- OR using Keystatic Cloud (paid service)   ```tsx

   import { config, fields, collection, singleton } from '@keystatic/core';

**Recommendation:** Stick with local mode for simplicity and security. The workflow of editing locally and pushing to Git is standard practice and works perfectly with Vercel's auto-deploy.   

   export default config({

## Troubleshooting     storage: {

       kind: 'local',

### Cannot access Keystatic admin     },

     // ... rest of your config (copy from keystatic.config.tsx)

**Local Development:**   });

   ```

- Ensure you're running `npm run dev`

- Check that VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD are set in `.env`2. In development, import the local config

- Navigate to `http://localhost:5173/keystatic`3. In production, use the GitHub config



**Production:**## Troubleshooting



- This is expected - Keystatic admin is not accessible in production with local mode### "Not authenticated" error

- You must edit content locally and push to GitHub- Check that GitHub OAuth credentials are set in Vercel

- Verify the callback URL matches exactly

### Changes not appearing on site- Make sure KEYSTATIC_SECRET is set



- Check that you committed and pushed your changes to GitHub### Changes not appearing on site

- Verify the Vercel deployment completed successfully- Check Vercel deployment logs

- Check Vercel deployment logs for build errors- Ensure `prebuild` script ran successfully

- Ensure the `prebuild` script ran successfully (check logs for "Generating static data")- Verify `content/` folder has your changes in GitHub



### Build fails in production### Local development not working

- Make sure you have the correct GitHub credentials in `.env`

- Check that all content files have valid YAML frontmatter- Try signing out and back in to GitHub

- Verify that required fields are present in all content files- Check that you have write access to the repository

- Review Vercel build logs for specific error messages

- Test the build locally with `npm run build`## Recommended Approach: Keystatic Cloud



### Local development not showing changesFor your use case (static site on Vercel), **I strongly recommend using Keystatic Cloud** (Option A above). It:



- Make sure you saved the file in Keystatic- ✅ Handles all OAuth complexity for you

- Check the `content/` directory to confirm changes are present- ✅ Works perfectly with static sites

- Restart the dev server if needed- ✅ Free tier available

- Clear browser cache and refresh- ✅ No API routes needed

- ✅ Automatic GitHub integration

## Security Considerations- ✅ Works with your existing AuthGuard



- **Local mode is secure by default** - No remote access to admin panelWould you like me to set up Keystatic Cloud for you? It's much simpler than managing your own OAuth app.

- Admin credentials protect local Keystatic access during development

- Content changes require Git access to the repository## Security Notes

- Vercel environment is read-only for content (built from Git)

- Your existing AuthGuard provides the first layer of security

## Best Practices- GitHub OAuth provides the second layer (only authorized GitHub users can commit)

- Both layers protect your content from unauthorized changes

1. **Always test locally** before pushing to production- Make sure to keep your `.env` file out of git (already configured in `.gitignore`)

2. **Use descriptive commit messages** for content changes

3. **Review changes in Git** before committing## Support

4. **Keep backups** of important content

5. **Document content structure** for other editors- Keystatic Docs: https://keystatic.com/docs

- Keystatic GitHub: https://github.com/Thinkmill/keystatic

## Support Resources- Keystatic Cloud: https://keystatic.cloud


- [Keystatic Documentation](https://keystatic.com/docs)
- [Keystatic GitHub](https://github.com/Thinkmill/keystatic)
- [Keystatic Local Mode Guide](https://keystatic.com/docs/local-mode)

## Summary

Your Keystatic setup is now configured for **local mode**, which is the simplest and most secure approach for a static site. You edit content locally through a nice CMS interface, commit to Git, and Vercel automatically deploys. No cloud services, no OAuth complexity, just straightforward content management.
