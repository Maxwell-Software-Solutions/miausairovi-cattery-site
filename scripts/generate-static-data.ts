import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Cat {
  slug: string;
  name: string;
  breed: string;
  color: string;
  titles: string[];
  description: string;
  images: Array<{ src: string; alt: string }>;
  featured: boolean;
  order: number;
}

interface Kitten {
  slug: string;
  name: string;
  gender: 'male' | 'female';
  birthDate: string;
  color: string;
  status: 'available' | 'reserved' | 'sold';
  price?: number;
  description: string;
  images: Array<{ src: string; alt: string }>;
  parents?: { mother?: string; father?: string };
  order: number;
}

interface Review {
  slug: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  platform: string;
  featured: boolean;
  order: number;
}

interface FAQ {
  slug: string;
  question: string;
  answer: string;
  category: 'breeding' | 'care' | 'pricing' | 'general';
  order: number;
}

interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  features: Array<{ icon: string; title: string; description: string }>;
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: { facebook?: string; instagram?: string; youtube?: string };
}

interface KeystaticData {
  cats: Cat[];
  kittens: Kitten[];
  reviews: Review[];
  faqs: FAQ[];
  homepage: HomepageContent;
  settings: SiteSettings;
}
function normalizeImages(
  images: Array<{ image?: string; src?: string; alt: string }>
): Array<{ src: string; alt: string }> {
  if (!Array.isArray(images)) return [];
  return images.map((img) => ({
    src: img.image || img.src || '',
    alt: img.alt || '',
  }));
}

function readMarkdownCollection<T>(collectionDir: string): T[] {
  const fullPath = path.join(process.cwd(), 'content', collectionDir);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Directory not found: ${fullPath}`);
    return [];
  }

  const files = fs.readdirSync(fullPath).filter((file) => file.endsWith('.md'));

  return files.map((file) => {
    const filePath = path.join(fullPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = path.basename(file, '.md');

    const normalizedData = { ...data };
    if (normalizedData.images) {
      normalizedData.images = normalizeImages(normalizedData.images);
    }

    return {
      ...normalizedData,
      slug,
      description: content.trim(),
    } as T;
  });
}

function readYAMLSingleton<T>(singletonName: string): T | null {
  const possiblePaths = [
    path.join(process.cwd(), 'content', `${singletonName}.yaml`),
    path.join(process.cwd(), 'content', singletonName, 'index.yaml'),
  ];

  for (const fullPath of possiblePaths) {
    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(fileContent);
      return data as T;
    }
  }

  console.warn(`Singleton not found: ${singletonName}`);
  return null;
}

async function generateStaticData() {
  console.log('Generating static data from Keystatic content...');

  const cats = readMarkdownCollection<Cat>('cats');
  const kittens = readMarkdownCollection<Kitten>('kittens');
  const reviews = readMarkdownCollection<Review>('reviews');
  const faqs = readMarkdownCollection<FAQ>('faqs');

  const homepage = readYAMLSingleton<HomepageContent>('homepage') || {
    heroTitle: 'Default Title',
    heroSubtitle: 'Default Subtitle',
    features: [],
  };

  const settings = readYAMLSingleton<SiteSettings>('settings') || {
    siteName: 'Miausairovi Cattery',
    siteDescription: 'British Shorthair Cattery',
    contactEmail: '',
    contactPhone: '',
    socialMedia: {},
  };

  cats.sort((a, b) => a.order - b.order);
  kittens.sort((a, b) => a.order - b.order);
  reviews.sort((a, b) => a.order - b.order);
  faqs.sort((a, b) => a.order - b.order);

  const data: KeystaticData = {
    cats,
    kittens,
    reviews,
    faqs,
    homepage,
    settings,
  };

  const outputDir = path.join(process.cwd(), 'src', 'generated');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'keystatic-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(
    `Generated static data: ${cats.length} cats, ${kittens.length} kittens, ${reviews.length} reviews, ${faqs.length} FAQs`
  );
  console.log(`Data written to: ${outputPath}`);
}

generateStaticData().catch((error) => {
  console.error('Error generating static data:', error);
  process.exit(1);
});
