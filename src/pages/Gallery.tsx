import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/card';

type Kitten = {
  id: number;
  name: string;
  age: string;
  status: 'Available' | 'Reserved' | 'Not Ready';
  image: string;
};

const kittens: Kitten[] = [
  {
    id: 1,
    name: 'Kitten 1',
    age: '8 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_0020.jpg',
  },
  {
    id: 2,
    name: 'Kitten 2',
    age: '6 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_0099.jpg',
  },
  {
    id: 3,
    name: 'Kitten 3',
    age: '10 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_1422.jpg',
  },
  {
    id: 4,
    name: 'Kitten 4',
    age: '7 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_2533.jpg',
  },
  {
    id: 5,
    name: 'Kitten 5',
    age: '9 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_2787.jpg',
  },
  {
    id: 6,
    name: 'Kitten 6',
    age: '5 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_9882.jpg',
  },
  {
    id: 7,
    name: 'Kitten 7',
    age: '11 weeks',
    status: 'Available',
    image: '/assets/cats/Kittens/thumbnail_DSC_9909.jpg',
  },
];

const KittenCard = ({ kitten, index }: { kitten: Kitten; index: number }) => {
  const cardAnimation = useScrollAnimation();
  return (
    <div ref={cardAnimation.ref} className={cardAnimation.isVisible ? `fade-in-delay-${Math.min(index % 4, 3)}` : ''}>
      <Card className="overflow-hidden shadow-soft hover:shadow-hover transition-all bg-gradient-card">
        <div className="aspect-square bg-secondary/20 flex items-center justify-center">
          <img src={kitten.image} alt={kitten.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-1">{kitten.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">Age: {kitten.age}</p>
          <span
            className={`inline-block text-xs px-2 py-1 rounded-full ${
              kitten.status === 'Available'
                ? 'bg-primary/10 text-primary'
                : kitten.status === 'Reserved'
                ? 'bg-accent/10 text-accent'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {kitten.status}
          </span>
        </div>
      </Card>
    </div>
  );
};

const Gallery = () => {
  const header = useScrollAnimation();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <div ref={header.ref} className={header.isVisible ? 'fade-in' : ''}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Kittens Gallery</h1>
          <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Browse our adorable kittens currently available or coming soon. Each kitten is raised with love and care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {kittens.map((kitten, index) => (
            <KittenCard key={kitten.id} kitten={kitten} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">
            Interested in one of our kittens? Contact us to learn more about availability, pricing, and our adoption
            process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
