# Keystatic API Route 404 - Root Cause Analysis

## The Real Problem

Your site is a **Vite static build** deployed on Vercel, but you're trying to use **Keystatic in GitHub mode**, which requires serverless API routes for OAuth authentication.

### Current Setup
- ✅ Static Vite build → outputs to `dist/`
- ✅ API route exists → `api/keystatic/[...params].ts`
- ❌ **Vercel doesn't know how to build both together**

## Why The 404 Happens

When you deploy to Vercel:
1. Vite builds the static site → goes to `dist/`
2. Vercel sees the `api/` folder and tries to deploy it as serverless functions
3. BUT: The routing configuration isn't correct for a Vite + API hybrid

The callback URL `https://miausairovi.com/api/keystatic/github/login` returns 404 because:
- Vercel doesn't properly recognize this as a serverless function route
- OR the `vercel.json` configuration isn't correctly mapping requests

## Solution Options

You have **3 options** to fix this:

---

## ✅ Option 1: Fix Vercel Configuration (Recommended if you need GitHub mode)

### What to do:

1. **Update `vercel.json`** (already done):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       {
         "source": "/api/keystatic/:path*",
         "destination": "/api/keystatic/[...params]"
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

2. **Verify Vercel Environment Variables**:
   - `GITHUB_CLIENT_ID` (no VITE_ prefix)
   - `GITHUB_CLIENT_SECRET` (no VITE_ prefix)

3. **Verify GitHub OAuth App**:
   - Callback URL: `https://miausairovi.com/api/keystatic/github/oauth/callback`
   - Homepage URL: `https://miausairovi.com`

4. **Check Vercel Build Settings**:
   - Framework Preset: **Vite** (or Other)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Why this might still fail:

The issue is that Vercel needs to understand this is a **hybrid deployment**:
- Static files from Vite → serve from `dist/`
- API routes → deploy as serverless functions from `api/`

If Vercel's automatic detection doesn't work, you may need to:
- Check Vercel dashboard → Project Settings → Build & Development Settings
- Ensure "Framework Preset" is set correctly
- Verify no .vercelignore file is excluding the api folder

---

## ✅ Option 2: Switch to Local Mode (Simplest - Recommended!)

This is **much simpler** and doesn't require any API routes or OAuth setup.

### Steps:

1. **Update `keystatic.config.tsx`**:
   ```tsx
   export default config({
     storage: {
       kind: 'local',  // Change from 'github' to 'local'
     },
     // ... rest of config stays the same
   });
   ```

2. **Remove the API folder** (no longer needed):
   ```bash
   rm -rf api
   ```

3. **Update `vercel.json`**:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

4. **How it works**:
   - Edit content locally: `npm run dev` → visit `/keystatic`
   - Make changes in the UI
   - Changes save to `content/` folder
   - Commit and push to GitHub
   - Vercel auto-deploys

### Pros of Local Mode:
- ✅ No OAuth setup needed
- ✅ No API routes needed
- ✅ No environment variables needed (except admin password)
- ✅ Simpler deployment
- ✅ Works offline
- ✅ Full Git history

### Cons of Local Mode:
- ❌ Must edit locally (can't edit directly in production)
- ❌ Need Git access to deploy changes

---

## ✅ Option 3: Use Keystatic Cloud (Easiest for non-technical users)

If you want remote editing without GitHub OAuth complexity:

1. **Sign up for Keystatic Cloud** (free tier available)

2. **Update `keystatic.config.tsx`**:
   ```tsx
   export default config({
     storage: {
       kind: 'cloud',
     },
     cloud: {
       project: 'your-project-id',
     },
     // ... rest of config
   });
   ```

3. **No API routes needed** - Keystatic Cloud handles everything

---

## My Recommendation

Based on your setup, I recommend **Option 2: Local Mode** because:

1. ✅ You're already using Git for version control
2. ✅ Simpler deployment (no serverless functions)
3. ✅ No OAuth complexity
4. ✅ No additional costs
5. ✅ You already have the AuthGuard for basic protection

The only "downside" is you need to run locally to edit content, but:
- This is actually **safer** (content changes go through Git)
- You can review changes before deploying
- No risk of production content corruption
- Easier to track who changed what

---

## Debugging Current Setup (Option 1)

If you want to stick with GitHub mode, here's how to debug:

### 1. Check Vercel Deployment Logs

```bash
# In your terminal
vercel logs
```

Or in Vercel Dashboard:
- Go to your project
- Click "Deployments" → Latest deployment
- Click "View Logs"
- Look for errors related to `api/keystatic`

### 2. Check if API Function is Deployed

Visit: `https://miausairovi.com/api/keystatic/github/login`

You should see:
- ❌ 404 = API function not deployed
- ✅ 500 or other error = API function is there but has issues
- ✅ Redirect or JSON = API function is working

### 3. Test Locally with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run locally with Vercel dev server
vercel dev
```

This will simulate Vercel's environment locally, including API routes.

### 4. Check Build Output

After deployment, check what Vercel built:
- Dashboard → Deployment → "Functions" tab
- Should show `api/keystatic/[...params]` as a function
- If not shown = Vercel didn't detect it

---

## Quick Decision Guide

**Choose Local Mode (Option 2) if:**
- You're comfortable using Git
- You want simplicity
- You edit content occasionally
- You're the only editor

**Choose GitHub Mode (Option 1) if:**
- Multiple non-technical editors need access
- You want to edit from anywhere
- You need real-time collaboration
- You can debug Vercel function issues

**Choose Cloud Mode (Option 3) if:**
- You want the easiest remote editing
- You're okay with a paid service (after free tier)
- You don't want to manage OAuth yourself

---

## Next Steps

1. **Decide which option you want**
2. **Let me know and I'll help implement it**
3. **For Option 1** (GitHub mode): We need to debug why Vercel isn't deploying the API function
4. **For Option 2** (Local mode): I can make the switch in 5 minutes
5. **For Option 3** (Cloud mode): Sign up first, then we'll configure

What do you prefer?
