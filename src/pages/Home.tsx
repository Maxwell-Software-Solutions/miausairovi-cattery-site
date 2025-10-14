import { AnimatedSection } from '@/components/common/AnimatedSection';
import { FeatureCard } from '@/components/common/FeatureCard';
import { SEO } from '@/components/common/SEO';
import { LocalBusinessSchema, ReviewSchema } from '@/components/common/StructuredData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Reviews } from '@/components/features/reviews/Reviews';
import { featuresData } from '@/data/content.data';
import { PAGE_CONTENT } from '@/config/constants';
import { GAEvents } from '@/config/analytics';

const Home = () => {
  return (
    <>
      <SEO
        title="Home - British Shorthair Breeder"
        description="Welcome to Miausairovi Cattery - Professional British Shorthair breeding in Peterborough, UK. Registered breeder offering healthy, pedigree kittens with excellent temperament. GCCF registered cats."
        keywords={[
          'British Shorthair breeder Peterborough',
          'cat breeder Peterborough',
          'British Shorthair cattery UK',
          'registered cat breeder',
          'pedigree kittens UK',
          'GCCF registered breeder',
        ]}
      />
      <LocalBusinessSchema />
      <ReviewSchema rating={5} reviewCount={24} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-gradient-hero">
          <AnimatedSection>
            <div className="container mx-auto text-center max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">{PAGE_CONTENT.home.hero.title}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">{PAGE_CONTENT.home.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cats" onClick={() => GAEvents.ctaClick('Hero - Meet Our Cats', '/cats')}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Meet Our Cats
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => GAEvents.ctaClick('Hero - Get in Touch', '/contact')}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Detailed About Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{PAGE_CONTENT.home.commitment.title}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featuresData.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <Reviews />

        {/* Location & Service Areas Section */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Serving Peterborough & Surrounding Areas
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Based in Peterborough, Cambridgeshire, we welcome families from across the East of England and
                throughout the UK to visit our cattery and meet our beautiful British Shorthair cats and kittens.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection delay={1}>
                <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-xl p-8 shadow-soft border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Local Areas We Serve</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>
                        <strong className="text-foreground">Peterborough</strong> - Our home base
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>
                        <strong className="text-foreground">Cambridge</strong> - 40 minutes south
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>
                        <strong className="text-foreground">Huntingdon</strong> - Easy access
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>
                        <strong className="text-foreground">Stamford</strong> - Quick journey
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>
                        <strong className="text-foreground">Corby, Kettering, Spalding</strong> - Welcome visitors
                      </span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={2}>
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-8 shadow-soft border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Why Visit Us?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">🏡</span>
                      <span>
                        <strong className="text-foreground">Home Environment:</strong> See our cats living as family
                        members
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">👨‍👩‍👧</span>
                      <span>
                        <strong className="text-foreground">Meet the Parents:</strong> View pedigree certificates and
                        health records
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">💙</span>
                      <span>
                        <strong className="text-foreground">Socialized Kittens:</strong> Well-adjusted and
                        people-friendly
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">📋</span>
                      <span>
                        <strong className="text-foreground">Full Documentation:</strong> GCCF registration, health
                        guarantees
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">🚗</span>
                      <span>
                        <strong className="text-foreground">Transport Available:</strong> Safe delivery throughout the
                        UK
                      </span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={3}>
              <div className="mt-8 text-center bg-muted rounded-xl p-6 border border-border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Traveling from further away?</strong> We can arrange safe,
                  professional pet transport to London, Birmingham, Manchester, Leeds, and throughout England, Scotland,
                  and Wales. All our kittens are raised in Peterborough with love and care.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <AnimatedSection>
            <div className="container mx-auto text-center max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{PAGE_CONTENT.home.cta.title}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {PAGE_CONTENT.home.cta.subtitle} Visit our{' '}
                <Link to="/gallery" className="text-primary hover:underline font-semibold">
                  gallery
                </Link>{' '}
                to see available kittens or{' '}
                <Link to="/contact" className="text-primary hover:underline font-semibold">
                  contact us
                </Link>{' '}
                for more information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/gallery">
                  <Button size="lg" className="w-full sm:w-auto">
                    View Kittens
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </>
  );
};

export default Home;
