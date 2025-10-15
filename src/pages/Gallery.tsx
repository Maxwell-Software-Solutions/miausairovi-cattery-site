import { PageHeader } from '@/components/common/PageHeader';
import { SEO } from '@/components/common/SEO';
import { BreadcrumbSchema } from '@/components/common/StructuredData';
import { KittenCard } from '@/components/features/kittens/KittenCard';
import { kittensData } from '@/data/kittens.data';
import { PAGE_CONTENT } from '@/config/constants';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://miausairovi.com/' },
    { name: 'Kittens Gallery', url: 'https://miausairovi.com/gallery' },
  ];

  return (
    <>
      <SEO
        title="Available Kittens - British Shorthair Kittens for Sale"
        description="View adorable British Shorthair kittens available for adoption. All kittens are health checked, vaccinated, GCCF & TICA registered, and raised in a loving home environment. Worldwide shipping available."
        keywords={[
          'British Shorthair kittens for sale',
          'kittens available',
          'buy British Shorthair kitten',
          'British Shorthair kittens',
          'pedigree kittens for sale',
          'GCCF TICA registered kittens',
        ]}
        canonicalUrl="https://miausairovi.com/gallery"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <PageHeader title={PAGE_CONTENT.gallery.title} subtitle={PAGE_CONTENT.gallery.subtitle} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {kittensData.map((kitten, index) => (
              <KittenCard key={kitten.id} kitten={kitten} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-4">
              {PAGE_CONTENT.gallery.footer} Visit our{' '}
              <Link to="/contact" className="text-primary hover:underline font-semibold">
                contact page
              </Link>{' '}
              or check our{' '}
              <Link to="/faq" className="text-primary hover:underline font-semibold">
                FAQ
              </Link>{' '}
              for more information about the adoption process.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
