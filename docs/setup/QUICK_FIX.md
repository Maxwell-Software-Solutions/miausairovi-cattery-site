# Keystatic OAuth Fix - Quick Reference

## ⚡ Quick Fix Checklist

### 1. Vercel Environment Variables (CRITICAL)
Add these in Vercel Dashboard → Settings → Environment Variables:
- `GITHUB_CLIENT_ID` (without VITE_ prefix)
- `GITHUB_CLIENT_SECRET` (without VITE_ prefix)

### 2. GitHub OAuth App Settings
Set callback URL to:
```
https://miausairovi.com/api/keystatic/github/oauth/callback
```

### 3. Deploy Changes
The following files were fixed:
- `api/keystatic/[...params].ts`
- `vercel.json`

Deploy with:
```bash
git add .
git commit -m "Fix Keystatic GitHub OAuth"
git push
```

## 🔍 Testing

1. Visit: `https://miausairovi.com/keystatic`
2. Click "Sign in with GitHub"
3. Authorize
4. Should redirect back (not 404)

## 📊 View Logs

Vercel Dashboard → Deployments → Functions → `api/keystatic/[...params]`

## 🛠️ What Was Fixed

1. **Environment variables**: Changed from `VITE_GITHUB_*` to `GITHUB_*`
2. **URL construction**: Fixed to use full URL with protocol and host
3. **Vercel routing**: Added explicit route for `/api/keystatic/:path*`
4. **Error handling**: Added comprehensive logging

## 📖 Full Documentation

See: `docs/setup/KEYSTATIC_GITHUB_OAUTH_FIX.md`
