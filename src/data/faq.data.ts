/**
 * FAQ Data
 * Frequently asked questions about British Shorthair kittens and breeding
 */

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'health' | 'adoption' | 'care';
}

export const faqData: FAQ[] = [
  {
    id: 1,
    question: 'How much does a British Shorthair kitten cost?',
    answer:
      'Our British Shorthair kittens are priced between £800-£1,500 depending on color, pedigree, and show quality. The price includes first vaccinations, health check, microchip, GCCF registration, and a kitten starter pack with food and toys.',
    category: 'adoption',
  },
  {
    id: 2,
    question: 'Where is Miausairovi Cattery located?',
    answer:
      'We are based in Peterborough, Cambridgeshire, UK. We welcome visitors by appointment to meet our cats and kittens. We serve clients throughout the UK and can arrange safe transport if needed.',
    category: 'general',
  },
  {
    id: 3,
    question: 'Are your kittens and breeding cats health tested?',
    answer:
      'Yes, absolutely. All our breeding cats are health tested for HCM (heart disease), PKD (kidney disease), and FeLV/FIV. Kittens are vet checked, vaccinated, microchipped, and come with health certificates. We prioritize the health and wellbeing of our cats above all else.',
    category: 'health',
  },
  {
    id: 4,
    question: 'What vaccinations do kittens receive?',
    answer:
      'All kittens receive their first vaccination (covering feline herpesvirus, calicivirus, and panleukopenia) before leaving at 13 weeks. We provide a vaccination card and recommend the second vaccination at 16 weeks from your local vet.',
    category: 'health',
  },
  {
    id: 5,
    question: 'When can kittens go to their new homes?',
    answer:
      'Our kittens are ready to go to their new homes at 13 weeks of age. This ensures they are fully weaned, litter trained, socialized, and have received their first vaccination. Early socialization is crucial for developing confident, well-adjusted cats.',
    category: 'adoption',
  },
  {
    id: 6,
    question: 'Are your cats GCCF registered?',
    answer:
      'Yes, all our breeding cats are registered with the Governing Council of the Cat Fancy (GCCF), the UK premier cat registry. All kittens are also registered and come with GCCF pedigree certificates showing their lineage.',
    category: 'general',
  },
  {
    id: 7,
    question: 'Can I visit the cattery before reserving a kitten?',
    answer:
      'Absolutely! We encourage potential owners to visit and meet our cats and kittens. This helps you understand our breeding philosophy and ensures our kittens are a good fit for your family. Please contact us to schedule an appointment.',
    category: 'adoption',
  },
  {
    id: 8,
    question: 'What is your breeding philosophy?',
    answer:
      'We breed for health, temperament, and breed standard. Our cats are raised as part of our family in a home environment. We focus on producing well-socialized, healthy kittens with excellent temperaments. We limit the number of litters to ensure each cat and kitten receives individual attention and care.',
    category: 'general',
  },
  {
    id: 9,
    question: 'How do I reserve a kitten?',
    answer:
      'To reserve a kitten, please contact us to discuss availability. We require a non-refundable deposit to secure your reservation. We will keep you updated with photos and videos as your kitten grows. Final payment is due when you collect your kitten at 13 weeks.',
    category: 'adoption',
  },
  {
    id: 10,
    question: 'Do you ship kittens?',
    answer:
      'We prefer kittens to be collected in person so new owners can meet the parents and see where the kitten was raised. However, we can arrange safe, professional pet transport within the UK for an additional fee if you cannot collect in person.',
    category: 'adoption',
  },
  {
    id: 11,
    question: 'What colors do you breed?',
    answer:
      'We specialize in British Shorthair cats and currently breed blue, lilac, and cream colors. Each color has its own unique charm. Check our breeding cats and available kittens pages to see our current colors.',
    category: 'general',
  },
  {
    id: 12,
    question: 'What is included when I purchase a kitten?',
    answer:
      "Your kitten comes with: GCCF registration certificate, 5-generation pedigree, vaccination record, microchip, health check certificate, food sample, toy with familiar scent, care guide, and lifetime breeder support. We're always here to answer questions!",
    category: 'adoption',
  },
  {
    id: 13,
    question: 'What should I prepare before bringing my kitten home?',
    answer:
      "You'll need: a litter tray and litter, food and water bowls, kitten food (we provide recommendations), scratching post, safe toys, cozy bed, and a cat carrier. We provide a detailed care guide with all recommendations for a smooth transition.",
    category: 'care',
  },
  {
    id: 14,
    question: 'Are British Shorthair cats good with children and other pets?',
    answer:
      'Yes! British Shorthairs are known for their gentle, patient temperament. They typically get along well with children and other pets when properly introduced. Our kittens are socialized with people and other cats from birth, making them confident and adaptable.',
    category: 'care',
  },
  {
    id: 15,
    question: 'Do you offer any guarantees?',
    answer:
      'Yes, all kittens come with a health guarantee. If any genetic health issues arise within the first year, we will work with you to resolve the situation. We stand behind the health and quality of our kittens and provide lifetime support.',
    category: 'health',
  },
];

/**
 * Get FAQs by category
 */
export const getFAQsByCategory = (category: FAQ['category']): FAQ[] => {
  return faqData.filter((faq) => faq.category === category);
};

/**
 * Get all FAQ categories
 */
export const getFAQCategories = (): FAQ['category'][] => {
  return ['general', 'health', 'adoption', 'care'];
};

/**
 * Get category display name
 */
export const getCategoryName = (category: FAQ['category']): string => {
  const names: Record<FAQ['category'], string> = {
    general: 'General Information',
    health: 'Health & Veterinary',
    adoption: 'Adoption Process',
    care: 'Kitten Care',
  };
  return names[category];
};
