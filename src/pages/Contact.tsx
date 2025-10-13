import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Reviews } from '@/components/Reviews';

const Contact = () => {
  const header = useScrollAnimation();
  const form = useScrollAnimation();
  const info = useScrollAnimation();

  const [formData, setFormData] = useState({
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
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
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
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
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div ref={header.ref} className={header.isVisible ? 'fade-in' : ''}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Get in Touch</h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Have questions about our cats or kittens? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div ref={form.ref} className={`lg:col-span-2 ${form.isVisible ? 'fade-in' : ''}`}>
            <Card className="p-6 md:p-8 shadow-soft bg-gradient-card">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
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
                      <SelectItem value="morning-9-12">Morning (9am - 12pm)</SelectItem>
                      <SelectItem value="afternoon-12-3">Afternoon (12pm - 3pm)</SelectItem>
                      <SelectItem value="afternoon-3-6">Late Afternoon (3pm - 6pm)</SelectItem>
                      <SelectItem value="weekend-morning">Weekend Morning (10am - 12pm)</SelectItem>
                      <SelectItem value="weekend-afternoon">Weekend Afternoon (12pm - 4pm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div ref={info.ref} className={info.isVisible ? 'fade-in-delay-1' : ''}>
            <Card className="p-6 shadow-soft bg-gradient-card h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">info@miausairovi.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Peterborough, UK
                      <br />
                      Available by appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-semibold mb-2">Office Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday: 10am - 4pm
                  <br />
                  Sunday: By appointment
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <Reviews title="Hear from Our Happy Clients" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
