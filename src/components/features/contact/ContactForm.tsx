/**
 * ContactForm Component
 * Contact form with validation and submission handling
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ContactFormData } from '@/types/form.types';
import { EmailService } from '@/services/email.service';
import { FORM_CONFIG, PAGE_CONTENT } from '@/config/constants';
import { callScheduleOptions } from '@/data/content.data';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    callSchedule: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    if (!FORM_CONFIG.emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await EmailService.sendContactEmail(formData);

      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: "Thank you for your inquiry. We'll get back to you soon.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          callSchedule: '',
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="p-6 md:p-8 shadow-soft bg-gradient-card">
      <h2 className="text-2xl font-bold mb-6">{PAGE_CONTENT.contact.formTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your inquiry..."
            rows={6}
            required
          />
        </div>

        <div>
          <Label htmlFor="callSchedule">Schedule a Call (Optional)</Label>
          <Select
            value={formData.callSchedule}
            onValueChange={(value) => setFormData({ ...formData, callSchedule: value })}
          >
            <SelectTrigger id="callSchedule" className="w-full">
              <SelectValue placeholder="Select a preferred time slot" />
            </SelectTrigger>
            <SelectContent className="bg-background z-50">
              {callScheduleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Card>
  );
};
