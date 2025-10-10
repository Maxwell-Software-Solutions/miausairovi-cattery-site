import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  platform: string;
};

// Sample reviews - Replace with Facebook API data or manually update from your Facebook reviews
const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: 'September 2024',
    comment:
      "We got our beautiful British Shorthair kitten from Miausairovi and couldn't be happier! The breeder was so knowledgeable and caring. Our kitten came home healthy, well-socialized, and with all the documentation. Highly recommend!",
    platform: 'Facebook',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: 'August 2024',
    comment:
      'Exceptional cattery! The attention to detail and care for their cats is evident in every aspect. Our Persian kitten is absolutely gorgeous and has the sweetest temperament. Thank you for our perfect companion!',
    platform: 'Facebook',
  },
  {
    id: 3,
    name: 'Emma Williams',
    rating: 5,
    date: 'July 2024',
    comment:
      'Professional, ethical, and passionate breeders. They took time to answer all our questions and made sure we were the right fit for their kitten. The follow-up support has been amazing. Our kitten is thriving!',
    platform: 'Facebook',
  },
];

const ReviewCard = ({ review }: { review: Review }) => {
  const cardAnimation = useScrollAnimation();

  return (
    <div ref={cardAnimation.ref} className={cardAnimation.isVisible ? 'fade-in' : ''}>
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
    </div>
  );
};

type ReviewsProps = {
  title?: string;
  showAllReviews?: boolean;
};

export const Reviews = ({ title = 'What Our Clients Say', showAllReviews = false }: ReviewsProps) => {
  const headerAnimation = useScrollAnimation();
  const displayReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '0.0';

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div ref={headerAnimation.ref} className={headerAnimation.isVisible ? 'fade-in' : ''}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>

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
