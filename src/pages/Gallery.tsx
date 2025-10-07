import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";

const kittens = [
  { id: 1, name: "Blue Kitten 1", age: "8 weeks", status: "Available" },
  { id: 2, name: "Golden Kitten 1", age: "6 weeks", status: "Reserved" },
  { id: 3, name: "Lilac Kitten 1", age: "10 weeks", status: "Available" },
  { id: 4, name: "Tabby Kitten 1", age: "7 weeks", status: "Available" },
  { id: 5, name: "Blue Kitten 2", age: "9 weeks", status: "Available" },
  { id: 6, name: "Golden Kitten 2", age: "5 weeks", status: "Not Ready" },
  { id: 7, name: "Lilac Kitten 2", age: "11 weeks", status: "Available" },
  { id: 8, name: "Tabby Kitten 2", age: "8 weeks", status: "Reserved" },
];

const GalleryPage = () => {
  const header = useScrollAnimation();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div ref={header.ref} className={header.isVisible ? "fade-in" : ""}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Kittens Gallery
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Browse our adorable kittens currently available or coming soon. Each kitten is raised with love and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {kittens.map((kitten, index) => {
            const cardAnimation = useScrollAnimation();
            return (
              <div
                key={kitten.id}
                ref={cardAnimation.ref}
                className={cardAnimation.isVisible ? `fade-in-delay-${Math.min(index % 4, 3)}` : ""}
              >
                <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all bg-gradient-card">
                  <div className="aspect-square bg-secondary/20 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <p className="text-5xl mb-2">🐱</p>
                      <p className="text-xs">Photo coming soon</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{kitten.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Age: {kitten.age}</p>
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full ${
                        kitten.status === "Available"
                          ? "bg-primary/10 text-primary"
                          : kitten.status === "Reserved"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {kitten.status}
                    </span>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">
            Interested in one of our kittens? Contact us to learn more about availability, pricing, and our adoption process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
