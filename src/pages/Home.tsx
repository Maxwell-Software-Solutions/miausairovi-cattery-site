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
        description="Welcome to Miausairovi Cattery - Professional British Shorthair breeder based in Peterborough, UK with worldwide shipping. Registered breeder offering healthy, pedigree kittens with excellent temperament. GCCF registered cats."
        keywords={[
          'British Shorthair breeder',
          'British Shorthair cattery',
          'registered cat breeder',
          'pedigree kittens',
          'GCCF registered breeder',
          'British Shorthair worldwide',
        ]}
      />
      <LocalBusinessSchema />
      <ReviewSchema rating={5} reviewCount={24} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-40 pb-32 px-4 bg-gradient-hero">
          <AnimatedSection>
            <div className="container mx-auto text-center max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight">{PAGE_CONTENT.home.hero.title}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">{PAGE_CONTENT.home.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/cats" onClick={() => GAEvents.ctaClick('Hero - Meet Our Cats', '/cats')}>
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    Meet Our Cats
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => GAEvents.ctaClick('Hero - Get in Touch', '/contact')}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Detailed About Section */}
        <section className="py-32 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{PAGE_CONTENT.home.commitment.title}</h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {featuresData.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <Reviews />

        {/* Location & Service Areas Section */}
        <section className="py-32 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Worldwide Delivery & Support</h2>
              <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
                Based in Peterborough, UK, we welcome families from around the world to experience our exceptional
                British Shorthair cats. We arrange safe, professional international shipping to bring your new companion
                home.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <AnimatedSection delay={1}>
                <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-xl p-10 shadow-soft border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Global Shipping</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">🌍</span>
                      <span>
                        <strong className="text-foreground">Worldwide Delivery:</strong> Safe shipping to your country
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✈️</span>
                      <span>
                        <strong className="text-foreground">Professional Transport:</strong> IATA-compliant pet travel
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">📋</span>
                      <span>
                        <strong className="text-foreground">Documentation:</strong> All export papers and health
                        certificates
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">🏥</span>
                      <span>
                        <strong className="text-foreground">Pre-Flight Care:</strong> Full vet check and travel
                        preparation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">💼</span>
                      <span>
                        <strong className="text-foreground">Door-to-Door:</strong> Coordinated delivery to your home
                      </span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={2}>
                <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-10 shadow-soft border border-border">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Why Choose Us?</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">🏡</span>
                      <span>
                        <strong className="text-foreground">Home Environment:</strong> Cats raised as family members
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">👨‍👩‍👧</span>
                      <span>
                        <strong className="text-foreground">Champion Bloodlines:</strong> GCCF registered with excellent
                        pedigrees
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
                      <span className="text-accent mr-2">🌟</span>
                      <span>
                        <strong className="text-foreground">Health Guarantee:</strong> HCM & PKD tested parents
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">🤝</span>
                      <span>
                        <strong className="text-foreground">Lifetime Support:</strong> We're here for you and your cat
                      </span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={3}>
              <div className="mt-12 text-center bg-muted rounded-xl p-8 border border-border">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <strong className="text-foreground">Located in Peterborough, UK.</strong> We welcome visitors by
                  appointment to meet our cats and kittens in person. Can't visit? We provide regular video calls and
                  updates throughout your kitten's development.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 bg-secondary/30">
          <AnimatedSection>
            <div className="container mx-auto text-center max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">{PAGE_CONTENT.home.cta.title}</h2>
              <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
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
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/gallery">
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    View Kittens
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
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
