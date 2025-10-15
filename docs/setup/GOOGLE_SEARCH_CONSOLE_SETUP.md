# Google Search Console Setup Guide

## 📋 Overview

This guide will walk you through connecting your website (miausairovi.com) to Google Search Console. This is a **critical step** for SEO as it allows Google to:
- Discover and index your pages
- Monitor your site's search performance
- Alert you to technical issues
- Show you which keywords drive traffic

---

## ✅ Prerequisites

Before you begin:
- Your website must be deployed and live at `https://miausairovi.com`
- You need a Google account
- You should have access to your domain registrar or Vercel deployment settings

---

## 🚀 Step-by-Step Setup

### Step 1: Access Google Search Console

1. Go to: **https://search.google.com/search-console**
2. Sign in with your Google account
3. Click **"Add property"** or **"Start now"**

---

### Step 2: Choose Verification Method

You'll see two options:

#### **Option A: Domain Property** (Recommended - Covers all subdomains)
- Enter: `miausairovi.com`
- This verifies ALL versions: www, https, http, subdomains

#### **Option B: URL Prefix** (Easier but less comprehensive)
- Enter: `https://miausairovi.com`
- This only verifies the exact URL entered

**💡 Recommendation:** Choose **Domain Property** for comprehensive coverage.

---

### Step 3: Verify Ownership

Google offers multiple verification methods. Choose the one that works best for you:

---

#### **Method 1: HTML Meta Tag** (Easiest for Vercel/React)

1. Google will give you a meta tag that looks like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
   ```

2. **Add this tag to your `index.html` file:**

   Open `c:\Projects\miausairovi-cattery-site\index.html` and add the meta tag in the `<head>` section:

   ```html
   <head>
     <meta charset="UTF-8" />
     <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
     <!-- Rest of your meta tags -->
   ```

3. **Commit and deploy to Vercel:**
   ```powershell
   git add index.html
   git commit -m "Add Google Search Console verification meta tag"
   git push
   ```

4. **Wait 2-3 minutes** for Vercel to deploy

5. **Return to Google Search Console** and click **"Verify"**

✅ **Done!** This is the simplest method for your setup.

---

#### **Method 2: HTML File Upload** (Alternative)

1. Google provides a file like `google1234567890abcdef.html`
2. Download this file
3. Place it in: `c:\Projects\miausairovi-cattery-site\public\`
4. Commit and deploy:
   ```powershell
   git add public/google*.html
   git commit -m "Add Google Search Console verification file"
   git push
   ```
5. After deployment, click **"Verify"** in Google Search Console

---

#### **Method 3: DNS Verification** (Most Reliable, but requires domain access)

1. Google provides a TXT record like:
   ```
   google-site-verification=1234567890abcdef
   ```

2. **Add this to your domain DNS settings:**
   - Log in to your domain registrar (where you bought miausairovi.com)
   - Go to DNS settings
   - Add a new **TXT record**:
     - **Name/Host:** `@` or leave blank
     - **Value:** `google-site-verification=YOUR_CODE`
     - **TTL:** 3600 (or default)

3. **Save changes** (DNS propagation can take 24-48 hours)

4. Return to Google Search Console and click **"Verify"**

💡 **This method remains valid even if you change hosting providers.**

---

#### **Method 4: Google Analytics** (If you already have GA)

If you already have Google Analytics set up on your site:
1. Ensure you're signed in with the same Google account
2. Select **"Google Analytics"** verification method
3. Click **"Verify"**

---

### Step 4: Submit Your Sitemap

Once verified, immediately submit your sitemap:

1. In Google Search Console, click **"Sitemaps"** in the left menu
2. Enter: `sitemap.xml`
3. Click **"Submit"**

Google will now start crawling and indexing your pages!

---

## 🔍 What to Monitor in Search Console

After setup, regularly check:

### 1. **Coverage Report**
- Shows which pages are indexed
- Alerts you to crawl errors
- Path: **Index → Pages**

### 2. **Performance Report**
- See which keywords drive traffic
- Monitor click-through rates (CTR)
- Path: **Performance → Search Results**

### 3. **Mobile Usability**
- Ensures your site works on mobile devices
- Path: **Experience → Mobile Usability**

### 4. **Core Web Vitals**
- Measures page speed and user experience
- Path: **Experience → Core Web Vitals**

### 5. **Manual Actions**
- Shows if Google penalized your site
- Path: **Security & Manual Actions → Manual Actions**

---

## ⏱️ Timeline Expectations

| Event | Timeframe |
|-------|-----------|
| Verification | Immediate |
| Sitemap processing | 1-2 hours |
| First pages indexed | 1-3 days |
| Performance data appears | 2-3 days |
| Full indexing complete | 1-2 weeks |

---

## 🛠️ Troubleshooting

### Issue: "Verification failed"
**Solutions:**
- Ensure the meta tag is in the `<head>` section
- Check that Vercel deployed successfully
- Clear your browser cache and try again
- Wait 5-10 minutes after deployment

### Issue: "Sitemap not found"
**Solutions:**
- Visit `https://miausairovi.com/sitemap.xml` in your browser
- Ensure the file exists in `public/sitemap.xml`
- Check Vercel deployment logs
- Verify the sitemap is accessible (not blocked by robots.txt)

### Issue: "Pages not indexing"
**Solutions:**
- Wait 1-2 weeks for Google to crawl your site
- Use **"Request Indexing"** for important pages
- Check for crawl errors in Coverage report
- Ensure your site has no `noindex` meta tags

---

## 📊 Quick Verification Checklist

After setup, verify everything works:

- [ ] Property verified successfully
- [ ] Sitemap submitted
- [ ] No verification errors
- [ ] At least 1 page indexed within 3 days
- [ ] No crawl errors in Coverage report
- [ ] Mobile usability shows no issues
- [ ] robots.txt allows Googlebot
- [ ] All important pages discoverable

---

## 🎯 Next Steps After Setup

1. **Set up Google Analytics** (if not done already)
   - See: `docs/analytics/GA_QUICK_START.md`

2. **Create Google Business Profile**
   - Critical for local SEO in Peterborough
   - Free listing on Google Maps

3. **Monitor Weekly**
   - Check for new indexed pages
   - Review search performance
   - Fix any crawl errors

4. **Request Reviews**
   - Ask happy customers to leave Google reviews
   - Boosts local search rankings

---

## 📖 Additional Resources

- **Google Search Console Help:** https://support.google.com/webmasters
- **Beginner's Guide:** https://developers.google.com/search/docs/beginner/get-started
- **Search Console Training:** https://developers.google.com/search/docs/beginner/search-console

---

## 💡 Pro Tips

1. **Add All Team Members:** In Search Console settings, add other team members with appropriate permissions

2. **Set Up Email Alerts:** Enable notifications for critical issues (crawl errors, security issues)

3. **Check Weekly:** Make it a habit to check Search Console every Monday

4. **Use "Request Indexing":** For new important pages (kittens, blog posts), manually request indexing

5. **Compare with Competitors:** Use the Performance report to see how you rank vs. competitors

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Coverage report shows indexed pages
- ✅ Performance data starts appearing (clicks, impressions)
- ✅ No errors in mobile usability
- ✅ Sitemap shows "Success" status
- ✅ Search queries start showing your site

---

*Last Updated: October 15, 2025*  
*Status: Ready to Implement*  
*Estimated Setup Time: 15-30 minutes*
