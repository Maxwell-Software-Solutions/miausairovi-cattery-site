import { PageHeader } from '@/components/common/PageHeader';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { SEO } from '@/components/common/SEO';
import { BreadcrumbSchema } from '@/components/common/StructuredData';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { ContactInfo } from '@/components/features/contact/ContactInfo';
import { Reviews } from '@/components/features/reviews/Reviews';
import { PAGE_CONTENT } from '@/config/constants';

const Contact = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://miausairovi.com/' },
    { name: 'Contact Us', url: 'https://miausairovi.com/contact' },
  ];

  return (
    <>
      <SEO
        title="Contact Us - British Shorthair Kitten Inquiries"
        description="Contact Miausairovi Cattery in Peterborough for inquiries about British Shorthair kittens. We're happy to answer questions about availability, pricing, visiting our cattery, and our breeding program. Located in Peterborough, UK."
        keywords={[
          'contact cat breeder',
          'British Shorthair inquiry',
          'kitten adoption inquiry Peterborough',
          'cat breeder contact',
          'visit cattery Peterborough',
        ]}
        canonicalUrl="https://miausairovi.com/contact"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <PageHeader title={PAGE_CONTENT.contact.title} subtitle={PAGE_CONTENT.contact.subtitle} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <AnimatedSection className="lg:col-span-2">
              <ContactForm />
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={1}>
              <ContactInfo />
            </AnimatedSection>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <Reviews title="Hear from Our Happy Clients" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
