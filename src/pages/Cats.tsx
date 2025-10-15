import { PageHeader } from '@/components/common/PageHeader';
import { SEO } from '@/components/common/SEO';
import { BreadcrumbSchema } from '@/components/common/StructuredData';
import { CatCard } from '@/components/features/cats/CatCard';
import { PAGE_CONTENT } from '@/config/constants';

// Static cat data
const cats = [
  {
    name: 'Pukis',
    breed: 'British Longhair',
    color: 'Golden Shaded',
    titles: 'Grand Champion Pukis',
    images: [
      {
        src: '/assets/cats/Pukis/TICATSJAN25-3798-Edit.jpg',
        alt: 'Pukis - British Longhair',
      },
      {
        src: '/assets/cats/Pukis/TICATSJAN25-3796-Edit.jpg',
        alt: 'Pukis - British Longhair',
      },
      {
        src: '/assets/cats/Pukis/TICATSJAN25-3791-Edit.jpg',
        alt: 'Pukis - British Longhair',
      },
    ],
    featured: true,
    order: 1,
    slug: 'pukis',
    description: 'Our boy Grand Champion Diamondglow Pukis of Miausairovi.',
  },
  {
    name: 'Afina',
    breed: 'Scottish Fold',
    color: 'Marble',
    titles: 'RW QGC Magic Marble',
    images: [
      {
        src: '/assets/cats/Afina/thumbnail_DSC_7997.jpg',
        alt: 'Afina - Scottish Fold',
      },
      {
        src: '/assets/cats/Afina/thumbnail_DSC_7546.jpg',
        alt: 'Afina - Scottish Fold',
      },
      {
        src: '/assets/cats/Afina/aUntitled-1.png',
        alt: 'Afina - Scottish Fold',
      },
    ],
    featured: true,
    order: 2,
    slug: 'afina',
    description: 'RW QGC Magic Marble Afina. Scottish fold girl.',
  },
  {
    name: 'Esmy',
    breed: 'British Shorthair',
    color: 'Blue',
    titles: 'Champion Esmy',
    images: [
      {
        src: '/assets/cats/Esmy/thumbnail_DSC_7997.jpg',
        alt: 'Esmy - British Shorthair',
      },
    ],
    featured: true,
    order: 3,
    slug: 'esmy',
    description: 'Champion Esmy, our beautiful British Shorthair queen.',
  },
];

const Cats = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://miausairovi.com/' },
    { name: 'Our Breeding Cats', url: 'https://miausairovi.com/cats' },
  ];

  // Sort cats by order
  const sortedCats = [...cats].sort((a, b) => a.order - b.order);

  return (
    <>
      <SEO
        title="Our Breeding Cats - British Shorthair Champions"
        description="Meet our exceptional British Shorthair breeding cats. Award-winning champions with outstanding pedigrees, health tested for HCM and PKD. All GCCF & TICA registered with excellent temperament. Worldwide delivery available."
        keywords={[
          'British Shorthair breeding cats',
          'champion British Shorthair',
          'pedigree breeding cats',
          'British Shorthair queens and studs',
          'GCCF TICA registered cats',
          'health tested breeding cats',
        ]}
        canonicalUrl="https://miausairovi.com/cats"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <PageHeader title={PAGE_CONTENT.cats.title} subtitle={PAGE_CONTENT.cats.subtitle} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {sortedCats.map((cat, index) => (
              <CatCard key={cat.slug} cat={cat} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-4">
              Interested in kittens from our breeding cats?{' '}
              <a href="/gallery" className="text-primary hover:underline font-semibold">
                View our available kittens
              </a>{' '}
              or{' '}
              <a href="/contact" className="text-primary hover:underline font-semibold">
                contact us
              </a>{' '}
              to learn more about our breeding program.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cats;
