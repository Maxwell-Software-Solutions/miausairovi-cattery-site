import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Shield, Home as HomeIcon } from "lucide-react";

const Home = () => {
  const hero = useScrollAnimation();
  const features = useScrollAnimation();
  const cta = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={hero.ref}
        className={`pt-32 pb-20 px-4 bg-gradient-hero ${hero.isVisible ? "fade-in" : ""}`}
      >
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Welcome to Miausairovi Cattery
          </h1>
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

      {/* Features Section */}
      <section
        ref={features.ref}
        className={`py-20 px-4 ${features.isVisible ? "fade-in" : ""}`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center shadow-soft hover:shadow-hover transition-all bg-gradient-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Loving Care</h3>
              <p className="text-muted-foreground">
                Each cat is raised with love and attention in a family environment
              </p>
            </Card>

            <Card className="p-6 text-center shadow-soft hover:shadow-hover transition-all bg-gradient-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health First</h3>
              <p className="text-muted-foreground">
                All our cats are regularly checked by veterinarians and fully vaccinated
              </p>
            </Card>

            <Card className="p-6 text-center shadow-soft hover:shadow-hover transition-all bg-gradient-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Home Raised</h3>
              <p className="text-muted-foreground">
                Our kittens are socialized from birth, making perfect family companions
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={cta.ref}
        className={`py-20 px-4 bg-secondary/30 ${cta.isVisible ? "fade-in" : ""}`}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Looking for Your Perfect Companion?
          </h2>
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
