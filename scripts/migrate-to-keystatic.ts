import fs from 'fs/promises';
import { catsData } from '../src/data/cats.data';
import { kittensData } from '../src/data/kittens.data';
import { reviewsData } from '../src/data/reviews.data';
import { faqData } from '../src/data/faq.data';
import { featuresData } from '../src/data/content.data';

async function migrateContent() {
  console.log('Starting content migration to Keystatic...\n');

  // Create content directories (already exist, but ensure)
  await fs.mkdir('content/cats', { recursive: true });
  await fs.mkdir('content/kittens', { recursive: true });
  await fs.mkdir('content/reviews', { recursive: true });
  await fs.mkdir('content/faqs', { recursive: true });

  // Migrate cats
  console.log('Migrating cats...');
  for (const cat of catsData) {
    const slug = cat.name.toLowerCase().replace(/\s+/g, '-');
    const content = `---
name: ${cat.name}
breed: ${cat.breed}
color: ${cat.color}
titles: ${cat.titles}
images:
${cat.images
  .map(
    (img: string) => `  - image: ${img}
    alt: ${cat.name} - ${cat.breed}`
  )
  .join('\n')}
featured: true
order: ${cat.id}
---

${cat.description}
`;
    await fs.writeFile(`content/cats/${slug}.md`, content);
    console.log(`  ✓ Migrated cat: ${cat.name}`);
  }

  // Migrate kittens
  console.log('\nMigrating kittens...');
  for (const kitten of kittensData) {
    const slug = kitten.name.toLowerCase().replace(/\s+/g, '-');
    const status = kitten.status.toLowerCase().replace('available', 'available');
    const content = `---
name: ${kitten.name}
age: ${kitten.age}
status: ${status}
image: ${kitten.image}
---

Available ${kitten.age} old kitten.
`;
    await fs.writeFile(`content/kittens/${slug}.md`, content);
    console.log(`  ✓ Migrated kitten: ${kitten.name}`);
  }

  // Migrate reviews
  console.log('\nMigrating reviews...');
  for (const review of reviewsData) {
    const slug = review.name.toLowerCase().replace(/\s+/g, '-');
    const content = `---
name: ${review.name}
rating: ${review.rating}
date: ${review.date}
platform: ${review.platform.toLowerCase()}
featured: ${review.id <= 3}
---

${review.comment}
`;
    await fs.writeFile(`content/reviews/${slug}.md`, content);
    console.log(`  ✓ Migrated review: ${review.name}`);
  }

  // Migrate FAQs
  console.log('\nMigrating FAQs...');
  for (const faq of faqData) {
    const slug = faq.question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const content = `---
question: ${faq.question}
category: ${faq.category}
order: ${faq.id}
---

${faq.answer}
`;
    await fs.writeFile(`content/faqs/${slug}.md`, content);
    console.log(`  ✓ Migrated FAQ: ${faq.question.substring(0, 50)}...`);
  }

  // Create homepage singleton
  console.log('\nCreating homepage content...');

  // Map icon components to string names
  const iconMapping: { [key: string]: string } = {
    Award: 'award',
    Stethoscope: 'stethoscope',
    Users: 'users',
  };

  const homepageContent = `heroTitle: Welcome to Miausairovi Cattery
heroSubtitle: >-
  GCCF Registered British Shorthair Breeder in Peterborough. Ethical breeding,
  health-tested cats, and exceptional care.
features:
${featuresData
  .map((feature, index) => {
    const iconName = iconMapping[feature.icon.name] || 'award';
    return `  - title: ${feature.title}
    description: >-
      ${feature.description.replace(/\n/g, '\n      ')}
    icon: ${iconName}`;
  })
  .join('\n')}
`;
  await fs.writeFile('content/homepage.yaml', homepageContent);
  console.log('  ✓ Created homepage content');

  // Create site settings singleton
  console.log('\nCreating site settings...');
  const settingsContent = `siteName: Miausairovi Cattery
siteDescription: >-
  GCCF Registered British Shorthair and Scottish Fold breeder based in
  Peterborough, UK. Ethical breeding practices, health-tested cats, and
  exceptional care for all our kittens.
contactEmail: info@miausairovi.com
contactPhone: ''
address: >-
  Peterborough, Cambridgeshire, UK
socialMedia:
  facebook: https://facebook.com/miausairovi
  instagram: https://instagram.com/miausairovi
  youtube: ''
`;
  await fs.writeFile('content/settings.yaml', settingsContent);
  console.log('  ✓ Created site settings');

  console.log('\n✅ Migration complete!');
  console.log('\nMigrated content:');
  console.log(`  - ${catsData.length} cats`);
  console.log(`  - ${kittensData.length} kittens`);
  console.log(`  - ${reviewsData.length} reviews`);
  console.log(`  - ${faqData.length} FAQs`);
  console.log('  - Homepage content');
  console.log('  - Site settings');
}

migrateContent().catch((error) => {
  console.error('\n❌ Migration failed:', error);
  process.exit(1);
});
