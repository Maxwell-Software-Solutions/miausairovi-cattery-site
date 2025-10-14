import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { AnimatedSection } from '@/components/common/AnimatedSection';
import { reviewsData, getAverageRating, getTotalReviewCount } from '@/data/reviews.data';
import { ReviewsProps, Review } from '@/types/review.types';

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <AnimatedSection>
      <Card className="p-6 h-full shadow-soft hover:shadow-hover transition-all bg-gradient-card">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-lg">{review.name}</h4>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-muted-foreground mb-3">{review.comment}</p>
        <p className="text-xs text-muted-foreground">via {review.platform}</p>
      </Card>
    </AnimatedSection>
  );
};

export const Reviews = ({ title = 'What Our Clients Say', showAllReviews = false }: ReviewsProps) => {
  const displayReviews = showAllReviews ? reviewsData : reviewsData.slice(0, 3);
  const averageRating = getAverageRating();
  const totalCount = getTotalReviewCount();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-muted-foreground">({totalCount} reviews)</span>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
