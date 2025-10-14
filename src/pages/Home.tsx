import { AnimatedSection } from '@/components/common/AnimatedSection';
import { FeatureCard } from '@/components/common/FeatureCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Reviews } from '@/components/features/reviews/Reviews';
import { featuresData } from '@/data/content.data';
import { PAGE_CONTENT } from '@/config/constants';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-hero">
        <AnimatedSection>
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">{PAGE_CONTENT.home.hero.title}</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">{PAGE_CONTENT.home.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cats">
                <Button size="lg" className="w-full sm:w-auto">
                  Meet Our Cats
                </Button>
              </Link>
              <Link to="/contact">
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <AnimatedSection>
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{PAGE_CONTENT.home.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">{PAGE_CONTENT.home.cta.subtitle}</p>
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
  );
};

export default Home;
