# MailerSend Setup Instructions

## ✅ Implementation Complete!

The MailerSend integration has been implemented. Follow these steps to complete the setup:

---

## Step 1: Get Your MailerSend API Key

1. **Sign up** at [mailersend.com](https://www.mailersend.com)
2. **Verify your domain**:
   - Go to Settings → Domains
   - Add your domain (e.g., miausairovi.com)
   - Add the DNS records to your domain registrar:
     - TXT record for verification
     - MX, CNAME, and TXT records for email delivery
   - Wait for verification (can take a few minutes)

3. **Create an API token**:
   - Go to Settings → API Tokens
   - Click "Create Token"
   - Give it a name (e.g., "Cattery Contact Form")
   - Select "Full Access" or at minimum "Email" permission
   - **Copy and save the token** (you'll only see it once!)

---

## Step 2: Configure Environment Variables

1. **Copy the example file**:
   ```bash
   copy .env.local.example .env.local
   ```

2. **Edit `.env.local`** and add your details:
   ```env
   MAILERSEND_API_KEY=mlsn.your_actual_api_key_here
   MAILERSEND_FROM_EMAIL=info@miausairovi.com
   MAILERSEND_TO_EMAIL=info@miausairovi.com
   VITE_API_URL=/api
   ```

   **Important Notes:**
   - Replace `mlsn.your_actual_api_key_here` with your real API key
   - `MAILERSEND_FROM_EMAIL` must be an email from your verified domain
   - `MAILERSEND_TO_EMAIL` is where you want to receive contact form submissions

---

## Step 3: Test Locally (Optional)

To test the contact form locally with a serverless function simulator:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Run development server with Vercel**:
   ```bash
   vercel dev
   ```

3. **Open your browser** to the URL shown (usually `http://localhost:3000`)

4. **Test the contact form** - Fill it out and submit

5. **Check your email** - You should receive:
   - One email to `MAILERSEND_TO_EMAIL` (the inquiry)
   - One confirmation email to the customer's email

---

## Step 4: Deploy to Vercel

1. **Install Vercel CLI** (if not done in Step 3):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy your site**:
   ```bash
   vercel --prod
   ```

4. **Add environment variables** in Vercel dashboard:
   - Go to your project on vercel.com
   - Click Settings → Environment Variables
   - Add these variables:
     - `MAILERSEND_API_KEY` → Your API key
     - `MAILERSEND_FROM_EMAIL` → info@miausairovi.com
     - `MAILERSEND_TO_EMAIL` → info@miausairovi.com
   - Make sure to select "Production", "Preview", and "Development"

5. **Redeploy** to apply environment variables:
   ```bash
   vercel --prod
   ```

---

## Step 5: Test Production

1. Visit your deployed site
2. Go to the Contact page
3. Fill out and submit the form
4. Check your email!

---

## What's Included

### 📁 Files Created:

1. **`api/contact.js`** - Serverless function that handles email sending
2. **`.env.local.example`** - Template for environment variables
3. **Updated `src/pages/Contact.tsx`** - Form now sends to API endpoint
4. **`mailersend` package** - Installed and ready to use

### ✨ Features:

- ✅ Email sent to cattery owner with inquiry details
- ✅ Auto-reply confirmation email sent to customer
- ✅ Beautiful HTML email templates
- ✅ Loading states on submit button ("Sending...")
- ✅ Error handling with user-friendly messages
- ✅ Email validation
- ✅ Form reset after successful submission
- ✅ CORS configured for security

---

## Troubleshooting

### Emails not arriving?

1. **Check MailerSend dashboard**:
   - Go to Analytics → Activity
   - See if emails were sent successfully

2. **Check spam folder**:
   - Confirmation emails might be in spam initially

3. **Verify DNS records**:
   - Make sure all DNS records are properly configured
   - Use MailerSend's verification tool

4. **Check API key**:
   - Make sure it's copied correctly
   - Ensure it has "Email" permissions

### Form submission errors?

1. **Check browser console** (F12) for error messages

2. **Check environment variables**:
   - Make sure `.env.local` exists
   - Verify all variables are set correctly

3. **Check Vercel logs**:
   - Go to vercel.com → Your project → Deployments
   - Click on latest deployment → Functions tab
   - Check logs for errors

### API endpoint not found (404)?

1. **Make sure `api/contact.js` exists** in project root
2. **Redeploy** to Vercel
3. **Clear browser cache**

---

## Email Customization

To customize the email templates, edit `api/contact.js`:

- **Owner notification email**: Lines 47-87
- **Customer confirmation email**: Lines 119-159

You can change:
- Email styling (CSS in `<style>` tags)
- Email content and layout
- Subject lines
- Footer text

---

## Cost & Limits

**MailerSend Free Tier:**
- ✅ 3,000 emails/month
- ✅ 1 verified domain
- ✅ Email analytics
- ✅ Templates

This is more than enough for a cattery contact form!

**Vercel Free Tier:**
- ✅ Unlimited serverless function invocations
- ✅ 100 GB bandwidth/month
- ✅ Custom domains

---

## Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review MailerSend documentation: https://developers.mailersend.com/
3. Check Vercel documentation: https://vercel.com/docs

---

## Next Steps

Once emails are working:
- ✅ Test the form thoroughly
- ✅ Share your contact page with customers
- ✅ Monitor MailerSend dashboard for delivery stats
- ✅ Consider adding more form fields if needed

🎉 Your contact form is ready to receive inquiries!
