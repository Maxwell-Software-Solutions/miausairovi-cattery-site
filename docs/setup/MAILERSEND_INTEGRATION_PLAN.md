# MailerSend Integration Plan for Miausairovi Cattery

## Overview
This document outlines the steps to integrate MailerSend.com with your contact form to receive customer inquiries via email.

---

## Prerequisites

### 1. MailerSend Account Setup
1. **Sign up** at [mailersend.com](https://www.mailersend.com)
2. **Verify your domain** (e.g., miausairovi.com)
   - Add DNS records (TXT, MX, CNAME) to your domain registrar
   - This ensures emails won't go to spam
3. **Get your API Key**
   - Go to Settings → API Tokens
   - Create a new token with "Email" permissions
   - Save it securely (you'll only see it once)

### 2. Environment Variables
Create a `.env` file in your project root:
```
VITE_API_URL=http://localhost:3001/api  # Development
# VITE_API_URL=https://your-domain.com/api  # Production

MAILERSEND_API_KEY=your_api_key_here  # Backend only - never in VITE_
MAILERSEND_FROM_EMAIL=info@miausairovi.com
MAILERSEND_TO_EMAIL=info@miausairovi.com  # Where to receive inquiries
```

**Important:** Never expose API keys in frontend code!

---

## Implementation Options

### Option A: Simple Backend with Express (Recommended)

**Pros:**
- Simple to set up
- Can host on Vercel, Netlify, or any Node.js host
- Full control over email logic

**Structure:**
```
project/
├── src/                    # Frontend (Vite/React)
├── server/                 # Backend API
│   ├── index.js           # Express server
│   └── routes/
│       └── contact.js     # Email sending route
└── package.json
```

### Option B: Serverless Function (Vercel/Netlify)

**Pros:**
- No server management
- Auto-scales
- Free tier available

**Structure:**
```
project/
├── src/                    # Frontend
├── api/                    # Serverless functions
│   └── contact.js         # Email sending function
└── vercel.json or netlify.toml
```

### Option C: Third-party Service (Formspree, FormSubmit)

**Pros:**
- Zero backend code
- Quick setup

**Cons:**
- Less control
- May have limitations

---

## Recommended Implementation: Express Backend

### Step 1: Install Dependencies

```bash
# In your project root
npm install express cors dotenv @mailersend/mailersend
npm install --save-dev nodemon
```

### Step 2: Create Backend Server

**File: `server/index.js`**
```javascript
const express = require('express');
const cors = require('cors');
const contactRoute = require('./routes/contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**File: `server/routes/contact.js`**
```javascript
const express = require('express');
const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');
const router = express.Router();

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, callSchedule } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    // Email to you (cattery owner)
    const emailParams = new EmailParams()
      .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, 'Miausairovi Contact Form'))
      .setTo([new Recipient(process.env.MAILERSEND_TO_EMAIL, 'Miausairovi Cattery')])
      .setSubject(`New Contact Form Submission from ${name}`)
      .setHtml(`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Preferred Call Time:</strong> ${callSchedule || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `)
      .setText(`
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Preferred Call Time: ${callSchedule || 'Not specified'}
        
        Message:
        ${message}
      `);

    await mailerSend.email.send(emailParams);

    // Optional: Send confirmation email to customer
    const confirmationParams = new EmailParams()
      .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, 'Miausairovi Cattery'))
      .setTo([new Recipient(email, name)])
      .setSubject('Thank you for contacting Miausairovi Cattery')
      .setHtml(`
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Miausairovi Cattery</p>
      `)
      .setText(`
        Thank you for your inquiry!
        
        Dear ${name},
        
        We've received your message and will get back to you as soon as possible.
        
        Best regards,
        Miausairovi Cattery
      `);

    await mailerSend.email.send(confirmationParams);

    res.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

module.exports = router;
```

### Step 3: Update Frontend Contact Form

**File: `src/pages/Contact.tsx`**
```typescript
// Add this to the handleSubmit function:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validation
  if (!formData.name || !formData.email || !formData.message) {
    toast({
      title: "Missing Information",
      description: "Please fill in all required fields.",
      variant: "destructive",
    });
    return;
  }

  // Show loading state
  setIsSubmitting(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message');
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      callSchedule: "",
    });

  } catch (error) {
    console.error('Form submission error:', error);
    toast({
      title: "Error",
      description: error.message || "Failed to send message. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 4: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "server": "nodemon server/index.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build"
  }
}
```

Install concurrently for running both:
```bash
npm install --save-dev concurrently
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Frontend + Serverless API**
1. Create `api/contact.js` instead of `server/` folder
2. Add environment variables in Vercel dashboard
3. Deploy with `vercel`

**File: `api/contact.js`**
```javascript
const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Same email sending logic as above...
};
```

### Option 2: Netlify Functions

Similar to Vercel but place in `netlify/functions/contact.js`

### Option 3: Traditional Hosting (DigitalOcean, Heroku, Railway)

Deploy the Express server separately and point frontend to the API URL.

---

## Security Best Practices

1. **Never expose API keys** in frontend code
2. **Rate limiting** - Prevent spam (use express-rate-limit)
3. **Input validation** - Sanitize user input
4. **CORS** - Only allow requests from your domain
5. **HTTPS** - Always use SSL in production
6. **Honeypot field** - Add hidden field to catch bots

---

## Testing

### Development Testing
```bash
# Terminal 1: Start backend
npm run server

# Terminal 2: Start frontend
npm run dev

# Or both at once:
npm run dev:all
```

### Production Testing
1. Test with your own email
2. Check spam folder
3. Verify confirmation emails work
4. Test error handling (invalid emails, etc.)

---

## Monitoring

- **MailerSend Dashboard**: Track email delivery, opens, clicks
- **Server Logs**: Monitor API errors
- **Email Alerts**: Set up alerts for failed deliveries

---

## Cost Estimate

**MailerSend Free Tier:**
- 3,000 emails/month
- 1 verified domain
- Email analytics

**Hosting:**
- Vercel: Free for hobby projects
- Netlify: Free tier includes functions
- Railway: $5/month for backend

---

## Next Steps

1. ✅ Create MailerSend account and verify domain
2. ✅ Choose deployment option (Vercel recommended)
3. ✅ Set up backend/serverless function
4. ✅ Update Contact form with API call
5. ✅ Add loading states and error handling
6. ✅ Test thoroughly
7. ✅ Deploy to production
8. ✅ Monitor first few submissions

---

## Questions?

If you'd like me to implement any of these options, let me know which approach you prefer:
- Express backend with traditional hosting
- Vercel serverless functions
- Netlify functions
- Something else

I can create all the necessary files and guide you through the setup!
