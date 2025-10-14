import { PageHeader } from '@/components/common/PageHeader';
import { SEO } from '@/components/common/SEO';
import { BreadcrumbSchema } from '@/components/common/StructuredData';
import { CatCard } from '@/components/features/cats/CatCard';
import { catsData } from '@/data/cats.data';
import { PAGE_CONTENT } from '@/config/constants';

const Cats = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://miausairovi.com/' },
    { name: 'Our Breeding Cats', url: 'https://miausairovi.com/cats' },
  ];

  return (
    <>
      <SEO
        title="Our Breeding Cats - British Shorthair Champions"
        description="Meet our exceptional British Shorthair breeding cats in Peterborough. Award-winning champions with outstanding pedigrees, health tested for HCM and PKD. All GCCF registered with excellent temperament."
        keywords={[
          'British Shorthair breeding cats',
          'champion British Shorthair',
          'pedigree breeding cats UK',
          'British Shorthair queens and studs',
          'GCCF registered cats',
          'health tested breeding cats',
        ]}
        canonicalUrl="https://miausairovi.com/cats"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <PageHeader title={PAGE_CONTENT.cats.title} subtitle={PAGE_CONTENT.cats.subtitle} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {catsData.map((cat, index) => (
              <CatCard key={cat.id} cat={cat} index={index} />
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
