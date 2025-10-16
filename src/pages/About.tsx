import { PageHeader } from '@/components/common/PageHeader';
import { SEO } from '@/components/common/SEO';
import { BreadcrumbSchema } from '@/components/common/StructuredData';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { Link } from 'react-router-dom';

const About = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://miausairovi.com/' },
    { name: 'About Us', url: 'https://miausairovi.com/about' },
  ];

  return (
    <>
      <SEO
        title="About Us - Miausairovi Ethical Cat Breeder"
        description="Learn about Miausairovi Cattery's ethical breeding philosophy, GCCF & TICA registration, health testing protocols, and commitment to animal welfare. Meet the breeders behind the exceptional British Shorthair, British Longhair, Scottish Fold, and Scottish Straight cats."
        keywords={[
          'ethical cat breeder',
          'GCCF registered breeder',
          'TICA registered breeder',
          'British cat breeder philosophy',
          'health tested breeding cats',
          'cat breeder ethics',
        ]}
        canonicalUrl="https://miausairovi.com/about"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <PageHeader
            title="About Miausairovi Cattery"
            subtitle="Ethical breeding, health-tested cats, and exceptional care for animals and families"
          />

          {/* Our Story Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              <p>
                Miausairovi Cattery was founded on the belief that beautiful, healthy cats should come from responsible,
                ethical breeding practices. We are passionate about preserving the integrity of British Shorthair,
                British Longhair, Scottish Fold, and Scottish Straight breeds while prioritising the welfare of our
                animals above all else.
              </p>
              <p>
                Our journey began with a deep love for cats and a commitment to continuous learning about feline
                genetics, health, and welfare. Every decision we make is guided by our core values: transparency,
                ethical treatment, and accountability to both our breeding cats and the families who welcome our kittens
                into their homes.
              </p>
            </div>
          </AnimatedSection>

          {/* Breeding Philosophy Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Breeding Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-secondary/30 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Health First</h3>
                <p className="text-muted-foreground">
                  Every breeding cat undergoes comprehensive health testing including HCM (heart disease) and PKD
                  (kidney disease) screening. We maintain detailed health records and work closely with veterinarians to
                  ensure genetic diversity and healthy bloodlines.
                </p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Temperament Matters</h3>
                <p className="text-muted-foreground">
                  We breed for stable, affectionate temperaments that match breed standards. Our cats are raised in our
                  home as beloved family members, ensuring they are well-socialised and comfortable with human
                  interaction from birth.
                </p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Breed Standards</h3>
                <p className="text-muted-foreground">
                  We follow GCCF and TICA breed standards closely, selecting breeding cats with exceptional
                  conformation, coat quality, and type. Continuous improvement through careful selection is our goal.
                </p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Ethical Responsibility</h3>
                <p className="text-muted-foreground">
                  We limit the number of litters per queen, retire breeding cats at appropriate ages, and provide
                  support to adopters throughout their kitten's life. Our commitment extends beyond the sale.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Registrations & Certifications Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Registrations & Certifications</h2>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className="text-primary mr-2">✓</span> GCCF Registration
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    All our breeding cats and kittens are registered with the Governing Council of the Cat Fancy (GCCF),
                    ensuring adherence to strict breed standards and ethical guidelines.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className="text-primary mr-2">✓</span> TICA Registration
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We are also registered with The International Cat Association (TICA), providing international
                    recognition and additional health and safety standards.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className="text-primary mr-2">✓</span> Health Testing
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    All breeding cats are tested for HCM and PKD with results available upon request. We maintain
                    transparent health records for complete traceability.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <span className="text-primary mr-2">✓</span> Codes of Ethics
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We adhere to both GCCF and TICA codes of ethics, committing to responsible breeding and lifelong
                    support for our kittens and their families.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Health Testing Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Health Testing Protocol</h2>
            <div className="bg-secondary/20 rounded-lg p-8 border-l-4 border-primary">
              <div className="space-y-4 text-muted-foreground">
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-lg">1</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Pre-Breeding Screening</h4>
                    <p className="text-sm">
                      All breeding cats undergo HCM (echocardiography) and PKD screening before inclusion in our
                      breeding program.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-lg">2</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Regular Re-Testing</h4>
                    <p className="text-sm">
                      Breeding cats are re-tested annually to ensure continued health and early detection of any
                      developing conditions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-lg">3</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Kitten Health Checks</h4>
                    <p className="text-sm">
                      All kittens receive veterinary health checks, vaccinations, and deworming before going to their
                      new homes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-primary font-bold text-lg">4</div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Health Guarantee</h4>
                    <p className="text-sm">
                      We provide a comprehensive health guarantee covering genetic and hereditary conditions for the
                      first 12 months.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Kitten Care Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Kitten Care Standards</h2>
            <p className="text-muted-foreground mb-6">
              Every kitten born at Miausairovi receives exceptional care and socialisation from day one:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Early Socialisation</strong> - Handled regularly from birth with
                  exposure to household sounds, activities, and family members
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Nutrition</strong> - Fed premium quality kitten food with gradual
                  transition recommendations for new families
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Enrichment</strong> - Provided with toys, climbing structures, and
                  varied play environments to develop natural behaviours
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Veterinary Care</strong> - Complete with first and second
                  vaccinations, deworming, and flea treatment
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">Documentation</strong> - Pedigree paperwork, health records, and
                  care guides provided with each kitten
                </span>
              </li>
            </ul>
          </AnimatedSection>

          {/* After-Adoption Support Section */}
          <AnimatedSection className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Lifelong Support</h2>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <p className="text-muted-foreground mb-6">
                Our commitment to your family doesn't end when your kitten goes home. We provide comprehensive
                after-adoption support including:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Nutrition & Care Guidance</h4>
                  <p className="text-sm text-muted-foreground">
                    Expert advice on feeding, litter training, behaviour, and general care throughout your cat's life.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Behaviour Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Help with any behavioural questions or concerns as your kitten adjusts to their new home.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Health Questions</h4>
                  <p className="text-sm text-muted-foreground">
                    Open communication channel for health concerns or questions about breed-specific conditions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Join our community of Miausairovi cat owners to share experiences and connect with other families.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Call to Action Section */}
          <AnimatedSection className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Learn More?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our{' '}
              <Link to="/cats" className="text-primary hover:underline font-semibold">
                breeding cats
              </Link>
              , view our{' '}
              <Link to="/gallery" className="text-primary hover:underline font-semibold">
                available kittens
              </Link>
              , or{' '}
              <Link to="/contact" className="text-primary hover:underline font-semibold">
                contact us
              </Link>{' '}
              with any questions about our breeding program.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default About;
