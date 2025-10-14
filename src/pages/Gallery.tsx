import { PageHeader } from '@/components/common/PageHeader';
import { KittenCard } from '@/components/features/kittens/KittenCard';
import { kittensData } from '@/data/kittens.data';
import { PAGE_CONTENT } from '@/config/constants';

const Gallery = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <PageHeader title={PAGE_CONTENT.gallery.title} subtitle={PAGE_CONTENT.gallery.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {kittensData.map((kitten, index) => (
            <KittenCard key={kitten.id} kitten={kitten} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">{PAGE_CONTENT.gallery.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
