import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Heart, Shield, Home as HomeIcon, Award, Stethoscope, Users } from 'lucide-react';

const Home = () => {
  const hero = useScrollAnimation();
  const features = useScrollAnimation();
  const details = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={hero.ref} className={`pt-32 pb-20 px-4 bg-gradient-hero ${hero.isVisible ? 'fade-in' : ''}`}>
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Welcome to Miausairovi Cattery</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Where passion meets excellence in feline breeding
          </p>
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
      </section>

      {/* Detailed About Section */}
      <section ref={details.ref} className={`py-20 px-4 bg-secondary/30 ${details.isVisible ? 'fade-in' : ''}`}>
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Commitment to Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 shadow-soft hover:shadow-hover transition-all bg-gradient-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ethical Breeding Program</h3>
              <p className="text-muted-foreground">
                At Miausairovi, we are passionate, ethical breeders dedicated to raising healthy, well-socialised, and
                beautiful purebred cats. Our breeding program focuses on exceptional temperament, conformation, and
                genetic health. We carefully select our breeding lines to ensure we produce kittens that meet breed
                standards while prioritising health and personality.
              </p>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-hover transition-all bg-gradient-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health & Care Guarantee</h3>
              <p className="text-muted-foreground">
                Each of our cats is part of our family, raised in a clean, loving home environment with plenty of social
                interaction, enrichment, and veterinary care. All kittens are vaccinated, dewormed, and come with a
                health guarantee and pedigree documentation to ensure your peace of mind.
              </p>
            </Card>

            <Card className="p-6 shadow-soft hover:shadow-hover transition-all bg-gradient-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Your Perfect Match</h3>
              <p className="text-muted-foreground">
                Whether you're looking for a loving companion or a show-quality kitten, we are committed to helping you
                find the perfect feline addition to your family. We take the time to understand your needs and match you
                with a kitten that suits your lifestyle and expectations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={cta.ref} className={`py-20 px-4 ${cta.isVisible ? 'fade-in' : ''}`}>
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking for Your Perfect Companion?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Visit our gallery to see our adorable kittens or contact us to learn more about our breeding program.
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
      </section>
    </div>
  );
};

export default Home;
