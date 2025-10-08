import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Card } from "@/components/ui/card";

const cats = [
  {
    id: 1,
    name: "Luna",
    breed: "British Shorthair",
    color: "Blue",
    description: "Luna is our gentle queen with an exceptional temperament and stunning blue coat. She has produced many champions.",
    titles: "Champion, Grand Champion",
  },
  {
    id: 2,
    name: "Oliver",
    breed: "British Shorthair",
    color: "Golden",
    description: "Oliver is our magnificent stud with perfect conformation and a loving personality. His golden coat is truly breathtaking.",
    titles: "Grand Champion, Supreme Grand Champion",
  },
  {
    id: 3,
    name: "Bella",
    breed: "British Shorthair",
    color: "Lilac",
    description: "Bella is known for her sweet nature and beautiful lilac coloring. She's an exemplary mother and produces stunning kittens.",
    titles: "Champion",
  },
  {
    id: 4,
    name: "Max",
    breed: "British Shorthair",
    color: "Black Silver Tabby",
    description: "Max has an impressive pedigree and striking markings. His offspring consistently show excellent type and temperament.",
    titles: "Grand Champion",
  },
];

interface CatCardProps {
  cat: typeof cats[0];
  index: number;
}

const CatCard = ({ cat, index }: CatCardProps) => {
  const cardAnimation = useScrollAnimation();
  return (
    <div
      ref={cardAnimation.ref}
      className={cardAnimation.isVisible ? `fade-in-delay-${Math.min(index % 4, 3)}` : ""}
    >
      <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all bg-gradient-card h-full">
        <div className="aspect-square bg-secondary/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-6xl mb-2">🐱</p>
            <p className="text-sm">Photo coming soon</p>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
          <p className="text-primary font-semibold mb-1">{cat.breed}</p>
          <p className="text-sm text-muted-foreground mb-3">Color: {cat.color}</p>
          <p className="text-sm mb-4">{cat.description}</p>
          <div className="pt-4 border-t border-border">
            <p className="text-xs font-semibold text-primary">{cat.titles}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Cats = () => {
  const header = useScrollAnimation();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div ref={header.ref} className={header.isVisible ? "fade-in" : ""}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Breeding Cats
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Meet our exceptional breeding cats, each carefully selected for their outstanding qualities, health, and temperament.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cats.map((cat, index) => (
            <CatCard key={cat.id} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cats;
