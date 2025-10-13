// Test script for MailerSend email functionality
// Run with: node test-email.js

import dotenv from 'dotenv';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

dotenv.config({ path: '.env.local' });

async function testEmail() {
  console.log('🧪 Testing MailerSend email functionality...\n');

  // Check environment variables
  console.log('📋 Checking environment variables:');
  console.log('   API Key:', process.env.MAILERSEND_API_KEY ? '✅ Found' : '❌ Missing');
  console.log('   From Email:', process.env.MAILERSEND_FROM_EMAIL || '❌ Missing');
  console.log('   To Email:', process.env.MAILERSEND_TO_EMAIL || '❌ Missing');
  console.log('');

  if (!process.env.MAILERSEND_API_KEY) {
    console.error('❌ MAILERSEND_API_KEY not found in .env.local');
    process.exit(1);
  }

  try {
    console.log('📧 Initializing MailerSend...');
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    console.log('📨 Sending test email...');

    // Test email to cattery owner
    const emailParams = new EmailParams()
      .setFrom(new Sender(process.env.MAILERSEND_FROM_EMAIL, 'Miausairovi Test'))
      .setTo([new Recipient(process.env.MAILERSEND_TO_EMAIL, 'Test Recipient')])
      .setSubject('✅ Test Email - MailerSend Integration Working!').setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; border-radius: 5px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 5px; }
            .success { color: #4CAF50; font-size: 48px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Success!</h1>
            </div>
            <div class="content">
              <div class="success">🎉</div>
              <h2>Your MailerSend Integration is Working!</h2>
              <p>This is a test email from your Miausairovi Cattery contact form.</p>
              <p><strong>What this means:</strong></p>
              <ul>
                <li>✅ API credentials are configured correctly</li>
                <li>✅ Email sending is functional</li>
                <li>✅ Your contact form is ready to receive inquiries</li>
              </ul>
              <p>You can now deploy your website and start receiving customer inquiries via email!</p>
              <hr>
              <p style="font-size: 12px; color: #666;">
                Test sent at: ${new Date().toLocaleString()}<br>
                From: ${process.env.MAILERSEND_FROM_EMAIL}<br>
                To: ${process.env.MAILERSEND_TO_EMAIL}
              </p>
            </div>
          </div>
        </body>
        </html>
      `).setText(`
✅ Success! Your MailerSend Integration is Working!

This is a test email from your Miausairovi Cattery contact form.

What this means:
- API credentials are configured correctly
- Email sending is functional
- Your contact form is ready to receive inquiries

You can now deploy your website and start receiving customer inquiries via email!

---
Test sent at: ${new Date().toLocaleString()}
From: ${process.env.MAILERSEND_FROM_EMAIL}
To: ${process.env.MAILERSEND_TO_EMAIL}
      `);

    const response = await mailerSend.email.send(emailParams);

    console.log('✅ Email sent successfully!');
    console.log('📬 Check your inbox at:', process.env.MAILERSEND_TO_EMAIL);
    console.log('');
    console.log('Response:', response);
    console.log('');
    console.log('🎉 Test completed successfully!');
    console.log('Your contact form is ready to use.');
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('   Message:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', JSON.stringify(error.response.data, null, 2));
    }
    console.log('');
    console.log('💡 Troubleshooting tips:');
    console.log('   1. Verify your API key is correct');
    console.log('   2. Check that your domain is verified in MailerSend');
    console.log('   3. Ensure FROM_EMAIL is from your verified domain');
    process.exit(1);
  }
}

testEmail();
