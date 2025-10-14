/**
 * FAQ Page
 * Frequently Asked Questions about British Shorthair kittens and breeding
 */

import { SEO } from '../components/common/SEO';
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
        description="Frequently asked questions about British Shorthair kittens, breeding, adoption process, health testing, and care. Find answers about our GCCF registered cattery in Peterborough, UK."
        keywords={[
          'British Shorthair FAQ',
          'kitten questions',
          'British Shorthair breeding questions',
          'cat breeder FAQ Peterborough',
          'kitten adoption questions UK',
          'British Shorthair health questions',
          'GCCF registration questions',
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

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about British Shorthair kittens, our breeding program, adoption process,
              and caring for your new companion.
            </p>
          </div>

          {/* FAQ Categories */}
          {categories.map((category) => {
            const categoryFAQs = getFAQsByCategory(category);
            if (categoryFAQs.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-blue-600 pb-2">
                  {getCategoryName(category)}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {categoryFAQs.map((faq: FAQType) => (
                    <AccordionItem
                      key={faq.id}
                      value={`faq-${faq.id}`}
                      className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
                    >
                      <AccordionTrigger
                        className="px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                        onClick={() => GAEvents.faqExpand(faq.question)}
                      >
                        <span className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-slate-700 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 text-blue-50">
              We are here to help! Contact us directly and we will be happy to answer any questions about our British
              Shorthair kittens, breeding program, or adoption process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                onClick={() => GAEvents.ctaClick('FAQ Contact CTA', '/contact')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                to="/gallery"
                onClick={() => GAEvents.ctaClick('FAQ Gallery CTA', '/gallery')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white"
              >
                View Available Kittens
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Explore more about our cattery:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/cats" className="text-blue-600 hover:text-blue-800 font-medium">
                Our Breeding Cats
              </Link>
              <span className="text-slate-400">•</span>
              <Link to="/gallery" className="text-blue-600 hover:text-blue-800 font-medium">
                Available Kittens
              </Link>
              <span className="text-slate-400">•</span>
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
