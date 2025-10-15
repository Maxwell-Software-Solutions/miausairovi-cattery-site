# Keystatic GitHub Login Troubleshooting

**Issue:** GitHub login not working in Keystatic admin panel  
**Date:** October 15, 2025

---

## 🔍 Problem Identified

Your Keystatic configuration is set to use **Keystatic Cloud** with GitHub mode:

```tsx
storage: {
  kind: 'github',
  repo: 'Maxwell-Software-Solutions/miausairovi-cattery-site',
},
cloud: {
  project: 'miausairovi-cattery',
},
```

This means you need to set up your project on **Keystatic Cloud** to handle the GitHub authentication.

---

## ✅ Solution: Set Up Keystatic Cloud

### Step 1: Sign Up for Keystatic Cloud

1. Go to: **https://keystatic.cloud**
2. Click **"Sign up"** or **"Get Started"**
3. Sign in with your GitHub account
4. Authorize Keystatic to access your GitHub

### Step 2: Create Your Project

1. Once logged in, click **"Create Project"** or **"New Project"**
2. Enter project details:
   - **Project name:** `miausairovi-cattery`
   - **Repository:** `Maxwell-Software-Solutions/miausairovi-cattery-site`
3. Click **"Create"**

### Step 3: Connect Repository

1. Keystatic Cloud will ask for repository permissions
2. Grant access to `Maxwell-Software-Solutions/miausairovi-cattery-site`
3. Confirm the connection

### Step 4: Configure Project Settings

1. In Keystatic Cloud dashboard:
   - Verify the repository is connected
   - Check that the branch is set to `main`
   - Ensure content path matches your setup (`content/`)

### Step 5: Test Locally

1. Stop your dev server if running
2. Start it again:
   ```bash
   npm run dev
   ```
3. Go to: `http://localhost:5173/keystatic`
4. You should now see:
   - Your AuthGuard login (username/password)
   - After that, GitHub sign-in button that works

### Step 6: Click "Sign in with GitHub"

1. After passing AuthGuard, click **"Sign in with GitHub"**
2. You'll be redirected to GitHub
3. Authorize the Keystatic Cloud app
4. You'll be redirected back to Keystatic
5. ✅ You should now be logged in!

---

## 🔄 Alternative Solution: Use Local Mode (Development Only)

If you only want to test locally without GitHub integration:

### Update keystatic.config.tsx

```tsx
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local', // Changed from 'github'
  },
  // Remove the cloud section
  collections: {
    // ... your collections stay the same
  },
});
```

**Important:** This is for local development only. You'll need GitHub mode for production.

---

## 🔍 Debugging Steps

### Check 1: Verify Keystatic Cloud Project Exists

1. Go to: https://keystatic.cloud
2. Sign in with GitHub
3. Look for project: `miausairovi-cattery`
4. If it doesn't exist, create it

### Check 2: Verify Repository Access

1. In Keystatic Cloud, check repository settings
2. Ensure `Maxwell-Software-Solutions/miausairovi-cattery-site` is connected
3. Check that permissions include:
   - Read access to code
   - Write access to code (for commits)

### Check 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors when clicking "Sign in with GitHub"
4. Common errors:
   - `Failed to fetch` - Network issue or Keystatic Cloud not set up
   - `Unauthorized` - Repository permissions issue
   - `Not found` - Project doesn't exist on Keystatic Cloud

### Check 4: Clear Browser Cache

1. The AuthGuard session might be interfering
2. Clear sessionStorage:
   ```javascript
   // In browser console:
   sessionStorage.clear();
   ```
3. Refresh the page

### Check 5: Check Network Tab

1. Open DevTools → Network tab
2. Click "Sign in with GitHub"
3. Look for the redirect URL
4. Should go to: `https://api.keystatic.cloud/...`
5. If it goes to a different URL, config might be wrong

---

## 🎯 Expected Flow

### Correct Login Flow:

1. **Visit:** `http://localhost:5173/keystatic`
2. **See:** AuthGuard login form
3. **Enter:** Your admin username/password
4. **See:** Keystatic interface with "Sign in with GitHub" button
5. **Click:** "Sign in with GitHub"
6. **Redirect:** To GitHub OAuth page
7. **Authorize:** Keystatic Cloud app
8. **Redirect:** Back to Keystatic admin
9. **Success:** You can now edit content!

### If You're Stuck:

- **At step 2?** → Check AuthGuard credentials in `.env`
- **At step 4?** → AuthGuard might not be passing through correctly
- **At step 5?** → Keystatic Cloud not set up
- **At step 6?** → GitHub OAuth not authorized
- **At step 8?** → Permissions issue with repository

---

## ⚙️ Configuration Check

### Verify Your Config

**File:** `keystatic.config.tsx`

```tsx
export default config({
  storage: {
    kind: 'github', // ✅ Should be 'github'
    repo: 'Maxwell-Software-Solutions/miausairovi-cattery-site', // ✅ Correct format
  },
  cloud: {
    project: 'miausairovi-cattery', // ✅ Must match Keystatic Cloud project name
  },
  // ... rest of config
});
```

### Verify AuthGuard

**File:** `src/components/auth/AuthGuard.tsx`

The AuthGuard should pass through children after successful login:

```tsx
if (isAuthenticated) {
  return (
    <div>
      {/* Logout button */}
      {children} {/* ✅ This renders Keystatic */}
    </div>
  );
}
```

---

## 🚨 Common Issues & Fixes

### Issue 1: "Sign in with GitHub" Button Not Showing

**Cause:** AuthGuard might not be passing through correctly

**Fix:**
1. Check that you're logged into AuthGuard first
2. Look in browser console for errors
3. Verify `src/pages/KeystaticAdmin.tsx` has correct structure

### Issue 2: Infinite Redirect Loop

**Cause:** OAuth callback URL misconfigured

**Fix:**
1. Check Keystatic Cloud project settings
2. Ensure callback URL matches your domain
3. For local dev: `http://localhost:5173`
4. For production: `https://your-domain.com`

### Issue 3: "Not Authorized" After GitHub Login

**Cause:** Repository permissions not granted

**Fix:**
1. Go to GitHub Settings → Applications
2. Find "Keystatic Cloud"
3. Grant access to the repository
4. Try signing in again

### Issue 4: "Project Not Found"

**Cause:** Keystatic Cloud project doesn't exist or name mismatch

**Fix:**
1. Verify project exists at https://keystatic.cloud
2. Check project name matches config: `miausairovi-cattery`
3. Ensure project is connected to correct repository

### Issue 5: OAuth Error in URL

**Cause:** GitHub OAuth failed

**Fix:**
1. Check if you denied authorization
2. Try again and click "Authorize"
3. Check if your GitHub account has access to the repository

---

## 📝 Quick Checklist

Before asking for help, verify:

- [ ] Keystatic Cloud account created
- [ ] Project `miausairovi-cattery` exists on Keystatic Cloud
- [ ] Repository connected in Keystatic Cloud
- [ ] Repository permissions granted (read + write)
- [ ] Config file has correct `cloud.project` name
- [ ] AuthGuard credentials work (can get past login)
- [ ] Browser console shows no errors
- [ ] Tried clearing sessionStorage/cache
- [ ] Using latest version of @keystatic/core

---

## 🎯 Recommended Solution

**Use Keystatic Cloud** (what you're currently configured for):

### Pros:
- ✅ No OAuth app setup needed
- ✅ No API routes needed
- ✅ Works with static sites
- ✅ Free tier available
- ✅ Handles all GitHub auth complexity

### Setup Time: ~5 minutes

1. Go to https://keystatic.cloud
2. Sign in with GitHub
3. Create project: `miausairovi-cattery`
4. Connect repository: `Maxwell-Software-Solutions/miausairovi-cattery-site`
5. Done! GitHub login will now work

---

## 🆘 Still Not Working?

### Get More Info:

1. **Check Keystatic Cloud Status:**
   - Visit: https://status.keystatic.cloud
   - Check for any outages

2. **Enable Debug Mode:**
   ```tsx
   // In keystatic.config.tsx
   export default config({
     // ... your config
     ui: {
       // @ts-expect-error
       debug: true,
     },
   });
   ```

3. **Check Keystatic Logs:**
   - Open browser DevTools
   - Go to Console tab
   - Look for messages starting with `[Keystatic]`

4. **Try Different Browser:**
   - Sometimes cookies/cache cause issues
   - Try in incognito mode

5. **Check GitHub App Authorizations:**
   - Go to: https://github.com/settings/apps/authorizations
   - Look for "Keystatic Cloud"
   - Revoke and re-authorize if needed

---

## 📞 Getting Help

### Keystatic Support:

- **Docs:** https://keystatic.com/docs
- **Discord:** https://discord.gg/keystatic
- **GitHub Issues:** https://github.com/Thinkmill/keystatic/issues

### When Asking for Help, Include:

1. Error message from browser console
2. Network tab screenshot showing failed requests
3. Your config (remove sensitive data)
4. Steps you've already tried
5. Whether Keystatic Cloud project exists

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ AuthGuard login works
2. ✅ "Sign in with GitHub" button appears
3. ✅ Clicking button redirects to GitHub
4. ✅ GitHub authorization page appears
5. ✅ After authorizing, redirects back to Keystatic
6. ✅ Keystatic admin shows your content
7. ✅ You can edit and commit changes

---

**Most likely solution: Create the project on Keystatic Cloud!**

Go to: **https://keystatic.cloud** and set up your project `miausairovi-cattery` connected to repository `Maxwell-Software-Solutions/miausairovi-cattery-site`

That should fix the GitHub login issue! 🎉
