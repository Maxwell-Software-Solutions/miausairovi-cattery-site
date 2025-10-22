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
        title="Available Kittens - British Shorthair, British Longhair, Scottish Fold & Scottish Straight Kittens for Sale"
        description="View adorable British Shorthair, British Longhair, Scottish Fold and Scottish Straight kittens available for adoption. All kittens are health checked, vaccinated, GCCF & TICA registered, and raised in a loving home environment. Worldwide shipping available."
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

          {/* Breed Information Card */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-xl p-8 shadow-soft border border-border">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Our Kittens Include</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">📋 What's Included</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• 5-generation pedigree certificate</li>
                    <li>• GCCF registration & breeder slip</li>
                    <li>• Two vaccinations (8 & 12 weeks)</li>
                    <li>• Microchip & health certificate</li>
                    <li>• Kitten starter pack & lifetime support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">🏠 Ready to Leave</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• At 16 weeks (4 months) of age</li>
                    <li>• Both male & female available</li>
                    <li>• Pricing: £800-£1,500</li>
                    <li>• Worldwide shipping available</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">🎨 Colors & Breeds</h3>
                <p className="text-sm text-muted-foreground">
                  British Shorthair, British Longhair, Scottish Fold & Scottish Straight in blue, lilac, cream, blue
                  cream, blue cream tabby, blue shaded, chocolate golden shaded, silver tabby, and more.
                </p>
              </div>
            </div>
          </div>

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
