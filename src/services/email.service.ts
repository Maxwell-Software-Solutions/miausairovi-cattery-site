/**
 * Email Service
 * Handles form submissions and email sending
 */

import { FORM_CONFIG } from '@/config/constants';
import { ContactFormData, EmailResponse } from '@/types/form.types';

export class EmailService {
  /**
   * Send a contact form submission via FormSubmit.co
   */
  static async sendContactEmail(formData: ContactFormData): Promise<EmailResponse> {
    try {
      const response = await fetch(FORM_CONFIG.formSubmitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          message: formData.message,
          callSchedule: formData.callSchedule || 'Not specified',
          _subject: `New Inquiry from ${formData.name}`,
          _template: 'table',
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error('Failed to send message');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
