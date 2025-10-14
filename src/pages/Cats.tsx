import { PageHeader } from '@/components/common/PageHeader';
import { CatCard } from '@/components/features/cats/CatCard';
import { catsData } from '@/data/cats.data';
import { PAGE_CONTENT } from '@/config/constants';

const Cats = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto">
        <PageHeader title={PAGE_CONTENT.cats.title} subtitle={PAGE_CONTENT.cats.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {catsData.map((cat, index) => (
            <CatCard key={cat.id} cat={cat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cats;
