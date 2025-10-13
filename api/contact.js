const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message, callSchedule } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Initialize MailerSend
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    // Email to cattery owner
    const emailParams = new EmailParams()
      .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, 'Miausairovi Contact Form'))
      .setTo([new Recipient(process.env.MAILERSEND_TO_EMAIL, 'Miausairovi Cattery')])
      .setSubject(`New Inquiry from ${name}`).setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .content { background-color: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 5px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: #212529;">New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Preferred Call Time:</div>
                <div class="value">${callSchedule || 'Not specified'}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Miausairovi Cattery contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `).setText(`
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Preferred Call Time: ${callSchedule || 'Not specified'}

Message:
${message}

---
This email was sent from the Miausairovi Cattery contact form.
      `);

    await mailerSend.email.send(emailParams);

    // Optional: Send confirmation email to customer
    const confirmationParams = new EmailParams()
      .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, 'Miausairovi Cattery'))
      .setTo([new Recipient(email, name)])
      .setSubject('Thank you for contacting Miausairovi Cattery').setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
            .content { background-color: #ffffff; padding: 20px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #6c757d; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; color: #212529;">🐱 Miausairovi Cattery</h1>
            </div>
            <div class="content">
              <h2>Thank you for your inquiry!</h2>
              <p>Dear ${name},</p>
              <p>We've received your message and truly appreciate you taking the time to contact us.</p>
              <p>We'll get back to you as soon as possible, usually within 24-48 hours.</p>
              <p>In the meantime, feel free to explore our website to learn more about our beautiful cats and breeding program.</p>
              <p>Best regards,<br>
              <strong>Miausairovi Cattery Team</strong></p>
            </div>
            <div class="footer">
              <p>Miausairovi Cattery - Where passion meets excellence in feline breeding</p>
            </div>
          </div>
        </body>
        </html>
      `).setText(`
Thank you for your inquiry!

Dear ${name},

We've received your message and truly appreciate you taking the time to contact us.

We'll get back to you as soon as possible, usually within 24-48 hours.

In the meantime, feel free to explore our website to learn more about our beautiful cats and breeding program.

Best regards,
Miausairovi Cattery Team

---
Miausairovi Cattery - Where passion meets excellence in feline breeding
      `);

    await mailerSend.email.send(confirmationParams);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
