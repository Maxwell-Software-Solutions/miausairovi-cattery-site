/**
 * FAQ Page
 * Frequently Asked Questions about British Shorthair kittens and breeding
 */

import { SEO } from '../components/common/SEO';
import { PageHeader } from '../components/common/PageHeader';
import { AnimatedSection } from '../components/common/AnimatedSection';
import { FAQSchema, BreadcrumbSchema } from '../components/common/StructuredData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { faqData, getFAQsByCategory, getCategoryName, getFAQCategories } from '../data/faq.data';
import type { FAQ as FAQType } from '../data/faq.data';
import { Link } from 'react-router-dom';
import { GAEvents } from '../config/analytics';

export default function FAQ() {
  const categories = getFAQCategories();

  return (
    <>
      <SEO
        title="FAQ - British Shorthair Questions | Miausairovi Cattery"
        description="Frequently asked questions about British Shorthair kittens, breeding, adoption process, health testing, and care. Find answers about our GCCF & TICA registered cattery with worldwide shipping."
        keywords={[
          'British Shorthair FAQ',
          'kitten questions',
          'British Shorthair breeding questions',
          'cat breeder FAQ',
          'kitten adoption questions',
          'British Shorthair health questions',
          'GCCF TICA registration questions',
          'kitten care guide',
        ]}
        canonicalUrl="https://miausairovi.com/faq"
      />
      <FAQSchema faqs={faqData} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://miausairovi.com' },
          { name: 'FAQ', url: 'https://miausairovi.com/faq' },
        ]}
      />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <PageHeader
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about British Shorthair kittens, our breeding program, adoption process, and caring for your new companion."
          />

          {/* FAQ Categories */}
          {categories.map((category) => {
            const categoryFAQs = getFAQsByCategory(category);
            if (categoryFAQs.length === 0) return null;

            return (
              <AnimatedSection key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2">
                  {getCategoryName(category)}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {categoryFAQs.map((faq: FAQType) => (
                    <AccordionItem
                      key={faq.id}
                      value={`faq-${faq.id}`}
                      className="bg-card rounded-lg shadow-soft border border-border overflow-hidden"
                    >
                      <AccordionTrigger
                        className="px-6 py-4 text-left hover:bg-secondary/50 transition-colors"
                        onClick={() => GAEvents.faqExpand(faq.question)}
                      >
                        <span className="text-lg font-semibold text-foreground pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AnimatedSection>
            );
          })}

          {/* Contact CTA */}
          <AnimatedSection className="mt-16">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-primary-foreground shadow-soft">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg mb-6 opacity-90">
                We are here to help! Contact us directly and we will be happy to answer any questions about our British
                Shorthair kittens, breeding program, or adoption process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  onClick={() => GAEvents.ctaClick('FAQ Contact CTA', '/contact')}
                  className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
                <Link
                  to="/gallery"
                  onClick={() => GAEvents.ctaClick('FAQ Gallery CTA', '/gallery')}
                  className="bg-primary-foreground/20 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/30 transition-colors border-2 border-primary-foreground/30"
                >
                  View Available Kittens
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Explore more about our cattery:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/cats" className="text-primary hover:text-accent font-medium transition-colors">
                Our Breeding Cats
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/gallery" className="text-primary hover:text-accent font-medium transition-colors">
                Available Kittens
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/" className="text-primary hover:text-accent font-medium transition-colors">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
