# Quick Start: MailerSend Integration

## Fastest Way to Get Started (Vercel Serverless)

### 1. MailerSend Setup (5 minutes)
```bash
# 1. Go to mailersend.com and sign up
# 2. Verify your domain (add DNS records)
# 3. Get API key from Settings → API Tokens
# 4. Save this somewhere safe!
```

### 2. Install MailerSend Package
```bash
npm install @mailersend/mailersend
```

### 3. Create Serverless Function

Create file: `api/contact.js`

```javascript
const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, phone, message, callSchedule } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    // Email to you
    const emailParams = new EmailParams()
      .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, 'Miausairovi Contact Form'))
      .setTo([new Recipient(process.env.MAILERSEND_TO_EMAIL)])
      .setSubject(`New Inquiry from ${name}`)
      .setHtml(`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Call Time:</strong> ${callSchedule || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `);

    await mailerSend.email.send(emailParams);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};
```

### 4. Create Environment File

Create `.env.local`:
```
MAILERSEND_API_KEY=your_api_key_here
MAILERSEND_FROM_EMAIL=info@miausairovi.com
MAILERSEND_TO_EMAIL=info@miausairovi.com
VITE_API_URL=/api
```

Add to `.gitignore`:
```
.env.local
.env
```

### 5. Update Contact Form

In `src/pages/Contact.tsx`, replace handleSubmit:

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.name || !formData.email || !formData.message) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Failed to send');

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", phone: "", message: "", callSchedule: "" });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

Update submit button:
```tsx
<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Send Message'}
</Button>
```

### 6. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - MAILERSEND_API_KEY
# - MAILERSEND_FROM_EMAIL
# - MAILERSEND_TO_EMAIL
```

### 7. Test!

Visit your deployed site and submit the contact form.

---

## Troubleshooting

**Emails not arriving?**
- Check MailerSend dashboard for delivery status
- Verify domain DNS records
- Check spam folder
- Confirm API key is correct

**CORS errors?**
- Check CORS headers in serverless function
- Ensure API endpoint is correct

**Function timeout?**
- MailerSend usually responds quickly
- Check for connection issues

---

## Want me to implement this?

Just say "Yes, implement MailerSend with Vercel" and I'll create all the files for you!
