import fs from 'fs';import fs from 'fs';

import path from 'path';import path from 'path';

import matter from 'gray-matter';import matter from 'gray-matter';

interface Cat {

interface Cat {  slug: string  const homepage = readYAMLSingleton<HomepageContent>('homepage') || {

  slug: string;    heroTitle: 'Default Title',

  name: string;    heroSubtitle: 'Default Subtitle',

  breed: string;    features: []

  color: string;  };me: string;

  titles: string[];  breed: string;

  description: string;  color: string;

  images: Array<{ src: string; alt: string }>;  titles: string[];

  featured: boolean;  description: string;

  order: number;  images: Array<{ src: string; alt: string }>;

}  featured: boolean;

  order: number;

interface Kitten {}

  slug: string;interface Kitten {

  name: string;  slug: string;

  gender: 'male' | 'female';  name: string;

  birthDate: string;  gender: 'male' | 'female';

  color: string;  birthDate: string;

  status: 'available' | 'reserved' | 'sold';  color: string;

  price?: number;  status: 'available' | 'reserved' | 'sold';

  description: string;  price?: number;

  images: Array<{ src: string; alt: string }>;  description: string;

  parents?: { mother?: string; father?: string };  images: Array<{ src: string; alt: string }>;

  order: number;  parents?: { mother?: string; father?: string };

}  order: number;

}

interface Review {interface Review {

  slug: string;  slug: string;

  author: string;  author: string;

  date: string;  date: string;

  rating: number;  rating: number;

  text: string;  text: string;

  platform: string;  platform: string;

  featured: boolean;  featured: boolean;

  order: number;  order: number;

}}

interface FAQ {

interface FAQ {  slug: string;

  slug: string;  question: string;

  question: string;  answer: string;

  answer: string;  category: 'breeding' | 'care' | 'pricing' | 'general';

  category: 'breeding' | 'care' | 'pricing' | 'general';  order: number;

  order: number;}

}interface HomepageContent {

  heroTitle: string;

interface HomepageContent {  heroSubtitle: string;

  heroTitle: string;  features: Array<{ icon: string; title: string; description: string }>;

  heroSubtitle: string;}

  features: Array<{ icon: string; title: string; description: string }>;interface SiteSettings {

}  siteName: string;

  siteDescription: string;

interface SiteSettings {  contactEmail: string;

  siteName: string;  contactPhone: string;

  siteDescription: string;  socialMedia: { facebook?: string; instagram?: string; youtube?: string };

  contactEmail: string;}

  contactPhone: string;interface KeystaticData {

  socialMedia: { facebook?: string; instagram?: string; youtube?: string };  cats: Cat[];

}  kittens: Kitten[];

  reviews: Review[];

interface KeystaticData {  faqs: FAQ[];

  cats: Cat[];  homepage: HomepageContent;

  kittens: Kitten[];  settings: SiteSettings;

  reviews: Review[];}

  faqs: FAQ[];function normalizeImages(

  homepage: HomepageContent;  images: Array<{ image?: string; src?: string; alt: string }>

  settings: SiteSettings;): Array<{ src: string; alt: string }> {

}  if (!Array.isArray(images)) return [];

  return images.map((img) => ({ src: img.image || img.src || '', alt: img.alt || '' }));

function normalizeImages(images: Array<{ image?: string; src?: string; alt: string }>): Array<{ src: string; alt: string }> {}

  if (!Array.isArray(images)) return [];function readMarkdownCollection<T>(collectionDir: string): T[] {

  return images.map(img => ({ src: img.image || img.src || '', alt: img.alt || '' }));  const fullPath = path.join(process.cwd(), 'content', collectionDir);

}  if (!fs.existsSync(fullPath)) {

    console.warn(`Directory not found: ${fullPath}`);

function readMarkdownCollection<T>(collectionDir: string): T[] {    return [];

  const fullPath = path.join(process.cwd(), 'content', collectionDir);  }

  if (!fs.existsSync(fullPath)) {  const files = fs.readdirSync(fullPath).filter((file) => file.endsWith('.md'));

    console.warn(`Directory not found: ${fullPath}`);  return files.map((file) => {

    return [];    const filePath = path.join(fullPath, file);

  }    const fileContent = fs.readFileSync(filePath, 'utf-8');

  const files = fs.readdirSync(fullPath).filter(file => file.endsWith('.md'));    const { data, content } = matter(fileContent);

  return files.map(file => {    const slug = path.basename(file, '.md');

    const filePath = path.join(fullPath, file);    const normalizedData = { ...data };

    const fileContent = fs.readFileSync(filePath, 'utf-8');    if (normalizedData.images) {

    const { data, content } = matter(fileContent);      normalizedData.images = normalizeImages(normalizedData.images);

    const slug = path.basename(file, '.md');    }

    const normalizedData = { ...data };    return { ...normalizedData, slug, description: content.trim() } as T;

    if (normalizedData.images) {  });

      normalizedData.images = normalizeImages(normalizedData.images);}

    }function readYAMLSingleton<T>(singletonName: string): T | null {

    return { ...normalizedData, slug, description: content.trim() } as T;  const possiblePaths = [

  });    path.join(process.cwd(), 'content', `${singletonName}.yaml`),

}    path.join(process.cwd(), 'content', singletonName, 'index.yaml'),

  ];

function readYAMLSingleton<T>(singletonName: string): T | null {  for (const fullPath of possiblePaths) {

  const possiblePaths = [    if (fs.existsSync(fullPath)) {

    path.join(process.cwd(), 'content', `${singletonName}.yaml`),      const fileContent = fs.readFileSync(fullPath, 'utf-8');

    path.join(process.cwd(), 'content', singletonName, 'index.yaml')      const { data } = matter(fileContent);

  ];      return data as T;

  for (const fullPath of possiblePaths) {    }

    if (fs.existsSync(fullPath)) {  }

      const fileContent = fs.readFileSync(fullPath, 'utf-8');  console.warn(`Singleton not found: ${singletonName}`);

      const { data } = matter(fileContent);  return null;

      return data as T;}

    }async function generateStaticData() {

  }  console.log('Generating static data from Keystatic content...\n');

  console.warn(`Singleton not found: ${singletonName}`);  const cats = readMarkdownCollection<Cat>('cats');

  return null;  const kittens = readMarkdownCollection<Kitten>('kittens');

}  const reviews = readMarkdownCollection<Review>('reviews');

  const faqs = readMarkdownCollection<FAQ>('faqs');

async function generateStaticData() {  const homepage = readYAMLSingleton<HomepageContent>('homepage') || {

  console.log('Generating static data from Keystatic content...\n');    title: 'Default Title',

  const cats = readMarkdownCollection<Cat>('cats');    subtitle: 'Default Subtitle',

  const kittens = readMarkdownCollection<Kitten>('kittens');    heroImage: '',

  const reviews = readMarkdownCollection<Review>('reviews');    features: [],

  const faqs = readMarkdownCollection<FAQ>('faqs');  };

  const homepage = readYAMLSingleton<HomepageContent>('homepage') || {  const settings = readYAMLSingleton<SiteSettings>('settings') || {

    heroTitle: 'Default Title',    siteName: 'Miausairovi Cattery',

    heroSubtitle: 'Default Subtitle',    siteDescription: 'British Shorthair Cattery',

    features: []    contactEmail: '',

  };    contactPhone: '',

  const settings = readYAMLSingleton<SiteSettings>('settings') || {    socialMedia: {},

    siteName: 'Miausairovi Cattery',  };

    siteDescription: 'British Shorthair Cattery',  cats.sort((a, b) => a.order - b.order);

    contactEmail: '',  kittens.sort((a, b) => a.order - b.order);

    contactPhone: '',  reviews.sort((a, b) => a.order - b.order);

    socialMedia: {}  faqs.sort((a, b) => a.order - b.order);

  };  const data: KeystaticData = { cats, kittens, reviews, faqs, homepage, settings };

  cats.sort((a, b) => a.order - b.order);  const outputDir = path.join(process.cwd(), 'src', 'generated');

  kittens.sort((a, b) => a.order - b.order);  if (!fs.existsSync(outputDir)) {

  reviews.sort((a, b) => a.order - b.order);    fs.mkdirSync(outputDir, { recursive: true });

  faqs.sort((a, b) => a.order - b.order);  }

  const data: KeystaticData = { cats, kittens, reviews, faqs, homepage, settings };  const outputPath = path.join(outputDir, 'keystatic-data.json');

  const outputDir = path.join(process.cwd(), 'src', 'generated');  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  if (!fs.existsSync(outputDir)) {  console.log('Generated static data:');

    fs.mkdirSync(outputDir, { recursive: true });  console.log(`  - ${cats.length} cats`);

  }  console.log(`  - ${kittens.length} kittens`);

  const outputPath = path.join(outputDir, 'keystatic-data.json');  console.log(`  - ${reviews.length} reviews`);

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));  console.log(`  - ${faqs.length} FAQs`);

  console.log('Generated static data:');  console.log(`  - Homepage content`);

  console.log(`  - ${cats.length} cats`);  console.log(`  - Site settings`);

  console.log(`  - ${kittens.length} kittens`);  console.log(`\nData written to: ${outputPath}`);

  console.log(`  - ${reviews.length} reviews`);}

  console.log(`  - ${faqs.length} FAQs`);generateStaticData().catch((error) => {

  console.log(`  - Homepage content`);  console.error('Error generating static data:', error);

  console.log(`  - Site settings`);  process.exit(1);

  console.log(`\nData written to: ${outputPath}`);});

}

generateStaticData().catch(error => {
  console.error('Error generating static data:', error);
  process.exit(1);
});
