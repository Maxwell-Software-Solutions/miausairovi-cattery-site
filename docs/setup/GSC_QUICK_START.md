# Quick Start: Connect Google Search Console

## ⚡ 5-Minute Setup (Easiest Method)

### Step 1: Get Verification Code

1. Go to: https://search.google.com/search-console
2. Click **"Add property"**
3. Choose **"URL prefix"**
4. Enter: `https://miausairovi.com`
5. Select **"HTML tag"** verification method
6. Copy the meta tag (looks like this):

```html
<meta name="google-site-verification" content="abc123xyz..." />
```

---

### Step 2: Add to Your Website

Open `index.html` and add the meta tag inside `<head>`:

**File:** `c:\Projects\miausairovi-cattery-site\index.html`

```html
<head>
  <meta charset="UTF-8" />
  <meta name="google-site-verification" content="YOUR_CODE_HERE" />
  <!-- Paste your code from Google above this line -->
  <link rel="icon" href="/favicon.png" type="image/png" />
  <!-- rest of head content -->
```

---

### Step 3: Deploy

```powershell
git add index.html
git commit -m "Add Google Search Console verification"
git push
```

Wait 2-3 minutes for Vercel to deploy.

---

### Step 4: Verify

1. Go back to Google Search Console
2. Click **"Verify"**
3. ✅ Success!

---

### Step 5: Submit Sitemap

1. In Google Search Console, click **"Sitemaps"** (left menu)
2. Enter: `sitemap.xml`
3. Click **"Submit"**

---

## ✅ Done!

Your website is now connected to Google Search Console.

**What happens next:**

- Google starts indexing your pages (1-3 days)
- Performance data appears (2-3 days)
- You can monitor search traffic and rankings

---

## 📊 What to Check Weekly

- **Performance:** See which keywords bring traffic
- **Coverage:** Ensure all pages are indexed
- **Issues:** Fix any crawl errors

---

## 🆘 Troubleshooting

**"Verification failed"**
- Wait 5 minutes after deploying
- Clear browser cache
- Check the meta tag is in `<head>` section

**"Sitemap not found"**
- Visit: https://miausairovi.com/sitemap.xml
- Should see XML content
- If not, check `public/sitemap.xml` exists

---

**📖 Full Guide:** See `GOOGLE_SEARCH_CONSOLE_SETUP.md` for detailed instructions.

---

*Setup Time: 5-10 minutes*  
*Indexing Time: 1-3 days*
